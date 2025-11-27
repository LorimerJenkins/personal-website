"use client";
import { useRef, useMemo, useLayoutEffect, useState } from "react";
import styles from "./TimelineWavyLine.module.css";
import { TimelineYear } from "../timelineData";

interface TimelineWavyLineProps {
  totalHeight: number;
  targetY: number;
  heightPerSection: number;
  heroHeight: number;
  yearsCount: number;
  currentMilestone: string;
  timelineData: TimelineYear[];
}

// Catmull-Rom spline function for smooth organic curves
function getCurvePoints(
  points: number[][],
  tension: number = 0.3,
  numOfSegments: number = 25,
): string {
  if (points.length < 2) return "";

  let result: number[] = [];

  // Add extra points at start and end for smooth curve
  const pts = [
    [points[0][0], points[0][1]], // duplicate first
    ...points,
    [points[points.length - 1][0], points[points.length - 1][1]], // duplicate last
  ];

  // For each segment
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];

    for (let t = 0; t < numOfSegments; t++) {
      const t1 = t / numOfSegments;
      const t2 = t1 * t1;
      const t3 = t2 * t1;

      const tension1 = 1 - tension;

      // Catmull-Rom formula
      const x =
        tension1 *
        (2 * p1[0] +
          (-p0[0] + p2[0]) * t1 +
          (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
          (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

      const y =
        tension1 *
        (2 * p1[1] +
          (-p0[1] + p2[1]) * t1 +
          (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
          (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

      result.push(x, y);
    }
  }

  // Convert to SVG path
  let pathData = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < result.length; i += 2) {
    pathData += ` L ${result[i]} ${result[i + 1]}`;
  }

  return pathData;
}

function TimelineWavyLine({
  totalHeight,
  targetY,
  heightPerSection,
  heroHeight,
  currentMilestone,
  timelineData,
}: TimelineWavyLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [indicatorPos, setIndicatorPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Calculate the actual end point of the timeline content
  const timelineEndY = heroHeight + timelineData.length * heightPerSection;

  const controlPoints = useMemo(() => {
    const points: number[][] = [];
    const leftLineX = 250;
    const rightLineX = 550;

    // First year (index 0) content is on left, so line is on right
    const firstYearY = heroHeight + heightPerSection * 0.5;
    points.push([rightLineX, firstYearY]);

    // Process each section
    for (let index = 1; index < timelineData.length; index++) {
      const contentIsLeft = index % 2 === 0;
      const lineX = contentIsLeft ? rightLineX : leftLineX;
      const sectionMidY = heroHeight + (index + 0.5) * heightPerSection;

      if (sectionMidY <= timelineEndY) {
        points.push([lineX, sectionMidY]);
      }
    }

    return points;
  }, [heroHeight, heightPerSection, timelineData.length, timelineEndY]);

  const smoothPath = useMemo(
    () => getCurvePoints(controlPoints, 0.4, 30),
    [controlPoints],
  );

  // Use layoutEffect to synchronously update indicator position
  // This ensures the indicator is always exactly at the clip boundary
  useLayoutEffect(() => {
    if (!pathRef.current) {
      setIndicatorPos({ x: 550, y: heroHeight + heightPerSection * 0.5 });
      return;
    }

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Binary search to find the exact point where y = targetY
    // This is more precise and faster than sampling
    let low = 0;
    let high = pathLength;
    let bestPoint = path.getPointAtLength(0);

    // First, check if targetY is beyond the path
    const endPoint = path.getPointAtLength(pathLength);
    const startPoint = path.getPointAtLength(0);

    if (targetY <= startPoint.y) {
      setIndicatorPos({ x: startPoint.x, y: startPoint.y });
      return;
    }

    if (targetY >= endPoint.y) {
      setIndicatorPos({ x: endPoint.x, y: endPoint.y });
      return;
    }

    // Binary search for the exact position
    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      const point = path.getPointAtLength(mid);

      if (Math.abs(point.y - targetY) < 0.5) {
        bestPoint = point;
        break;
      }

      if (point.y < targetY) {
        low = mid;
      } else {
        high = mid;
      }
      bestPoint = point;
    }

    setIndicatorPos({ x: bestPoint.x, y: bestPoint.y });
  }, [targetY, smoothPath, heroHeight, heightPerSection]);

  // Only show indicator when scrolled past the hero section
  const shouldShowIndicator = targetY >= heroHeight && indicatorPos !== null;

  // Size of the milestone image
  const imageSize = 48;

  return (
    <div
      className={styles.container}
      style={{
        height: timelineEndY,
        maxHeight: timelineEndY,
        overflow: "hidden",
      }}
    >
      <svg
        width="800"
        height={timelineEndY}
        viewBox={`0 0 800 ${timelineEndY}`}
        className={styles.svg}
        style={{
          height: timelineEndY,
          maxHeight: timelineEndY,
        }}
      >
        <defs>
          <clipPath id="progressClip">
            <rect x="-100" y="0" width="1000" height={targetY} />
          </clipPath>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* White base line (organic river path) */}
        <path
          ref={pathRef}
          d={smoothPath}
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
        />

        {/* Blue progress line */}
        <path
          d={smoothPath}
          stroke="url(#lineGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#progressClip)"
        />

        {/* Indicator at end of blue line - exactly where the clip ends */}
        {shouldShowIndicator && indicatorPos && (
          <g transform={`translate(${indicatorPos.x}, ${indicatorPos.y})`}>
            {/* Outer glow */}
            <circle r="50" fill="#3B82F6" opacity="0.15" />

            {/* White border circle */}
            <circle r="40" fill="white" stroke="#3B82F6" strokeWidth="4" />

            {/* Milestone image */}
            <image
              href={currentMilestone}
              x={-imageSize / 2}
              y={-imageSize / 2}
              width={imageSize}
              height={imageSize}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Pulsing ring animation */}
            <circle
              r="40"
              fill="none"
              stroke="#60A5FA"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                values="40;52;40"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
}

export default TimelineWavyLine;

"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./TimelineWavyLine.module.css";
import { TimelineYear } from "../timelineData";

interface TimelineWavyLineProps {
  totalHeight: number;
  targetY: number;
  heightPerSection: number;
  heroHeight: number;
  yearsCount: number;
  currentEmoji: string;
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
  currentEmoji,
  timelineData,
}: TimelineWavyLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [smoothIndicatorPos, setSmoothIndicatorPos] = useState({
    x: 550,
    y: heroHeight + heightPerSection * 0.5,
  });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const generateControlPoints = () => {
    const points: number[][] = [];

    const leftLineX = 250;
    const rightLineX = 550;

    // START - Begin from the first year section (index 0)
    // First year (index 0) content is on left, so line is on right
    const firstYearY = heroHeight + heightPerSection * 0.5;
    points.push([rightLineX, firstYearY]);

    // Process each section - line goes through the middle of each year
    for (let index = 1; index < timelineData.length; index++) {
      const contentIsLeft = index % 2 === 0;
      // Line is on the opposite side of content
      const lineX = contentIsLeft ? rightLineX : leftLineX;

      // Point in middle of each section
      const sectionMidY = heroHeight + (index + 0.5) * heightPerSection;
      points.push([lineX, sectionMidY]);
    }

    return points;
  };

  const controlPoints = generateControlPoints();
  const smoothPath = getCurvePoints(controlPoints, 0.4, 30);

  // Calculate indicator position on smooth curve
  const getPointOnSmoothCurve = () => {
    if (!pathRef.current)
      return { x: 550, y: heroHeight + heightPerSection * 0.5 };

    try {
      const pathLength = pathRef.current.getTotalLength();

      // Find the point on the path that's closest to our target Y position
      let bestPoint = { x: 550, y: heroHeight };
      let closestDistance = Infinity;

      // Sample the path to find the point closest to targetY
      const samples = 200;
      for (let i = 0; i <= samples; i++) {
        const length = (i / samples) * pathLength;
        const point = pathRef.current.getPointAtLength(length);
        const distance = Math.abs(point.y - targetY);

        if (distance < closestDistance) {
          closestDistance = distance;
          bestPoint = { x: point.x, y: point.y };
        }

        if (point.y > targetY + 50) break;
      }

      return bestPoint;
    } catch {
      return { x: 550, y: targetY };
    }
  };

  // Smooth animation using lerp (linear interpolation)
  useEffect(() => {
    const targetPos = getPointOnSmoothCurve();

    const animate = () => {
      setSmoothIndicatorPos((current) => {
        const lerpFactor = 0.15; // Lower value = faster tracking

        const newX = current.x + (targetPos.x - current.x) * lerpFactor;
        const newY = current.y + (targetPos.y - current.y) * lerpFactor;

        const distanceX = Math.abs(targetPos.x - newX);
        const distanceY = Math.abs(targetPos.y - newY);

        if (distanceX < 0.5 && distanceY < 0.5) {
          return targetPos;
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetY, totalHeight]);

  const indicatorPos = smoothIndicatorPos;

  // Only show indicator when scrolled past the hero section
  const shouldShowIndicator = targetY >= heroHeight;

  return (
    <div className={styles.container}>
      <svg
        width="800"
        height={totalHeight}
        viewBox={`0 0 800 ${totalHeight}`}
        className={styles.svg}
        style={{ minHeight: totalHeight }}
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

          <clipPath id="circleClip">
            <circle cx="0" cy="0" r="32" />
          </clipPath>
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

        {/* Indicator at end of blue line - only show after hero section */}
        {shouldShowIndicator && (
          <g transform={`translate(${indicatorPos.x}, ${indicatorPos.y})`}>
            {/* Outer glow */}
            <circle r="50" fill="#3B82F6" opacity="0.15" filter="blur(12px)" />

            {/* White border circle */}
            <circle r="40" fill="white" stroke="#3B82F6" strokeWidth="4" />

            {/* Emoji */}
            <text textAnchor="middle" dominantBaseline="central" fontSize="32">
              {currentEmoji}
            </text>

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

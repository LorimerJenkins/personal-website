"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import styles from "./TimelineWavyLine.module.css";
import { TimelineYear } from "../timelineData";

interface TimelineWavyLineProps {
  totalHeight: number;
  heightPerSection: number;
  heroHeight: number;
  yearsCount: number;
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

  const pts = [
    [points[0][0], points[0][1]],
    ...points,
    [points[points.length - 1][0], points[points.length - 1][1]],
  ];

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

  let pathData = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < result.length; i += 2) {
    pathData += ` L ${result[i]} ${result[i + 1]}`;
  }

  return pathData;
}

// Hook to get CSS variable values
function useThemeColors() {
  const [colors, setColors] = useState({
    accentPrimary: "#00a8e8",
    accentSecondary: "#007ea7",
    accentDark: "#003459",
    textPrimary: "#ffffff",
    surface: "#003459",
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);

      setColors({
        accentPrimary:
          styles.getPropertyValue("--accent-primary").trim() || "#00a8e8",
        accentSecondary:
          styles.getPropertyValue("--accent-secondary").trim() || "#007ea7",
        accentDark:
          styles.getPropertyValue("--accent-dark").trim() || "#003459",
        textPrimary:
          styles.getPropertyValue("--text-primary").trim() || "#ffffff",
        surface: styles.getPropertyValue("--surface").trim() || "#003459",
      });
    };

    updateColors();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "data-theme" ||
          mutation.attributeName === "style"
        ) {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return colors;
}

function TimelineWavyLine({
  totalHeight,
  heightPerSection,
  heroHeight,
  timelineData,
}: TimelineWavyLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const indicatorRef = useRef<SVGGElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const milestoneImageRef = useRef<SVGImageElement>(null);
  const colors = useThemeColors();

  // Store scroll-related values in refs to avoid re-renders
  const scrollStateRef = useRef({
    targetY: heroHeight + heightPerSection * 0.5,
    currentMilestoneIndex: 0,
  });

  const timelineEndY =
    heroHeight + timelineData.length * heightPerSection + 350; // Buffer for line extension + indicator
  const firstSectionY = heroHeight + heightPerSection * 0.5;

  const controlPoints = useMemo(() => {
    const points: number[][] = [];
    const leftLineX = 250;
    const rightLineX = 550;

    // Generate a control point for each timeline section
    for (let index = 0; index < timelineData.length; index++) {
      const contentIsLeft = index % 2 === 0;
      const lineX = contentIsLeft ? rightLineX : leftLineX;
      const sectionMidY = heroHeight + (index + 0.5) * heightPerSection;
      points.push([lineX, sectionMidY]);
    }

    // Add one extra point at the end to extend the line to 2017
    const lastIsLeft = (timelineData.length - 1) % 2 === 0;
    const lastLineX = lastIsLeft ? rightLineX : leftLineX;
    const extraPointY =
      heroHeight + timelineData.length * heightPerSection + 250;
    points.push([lastLineX, extraPointY]);

    return points;
  }, [heroHeight, heightPerSection, timelineData.length]);

  const smoothPath = useMemo(
    () => getCurvePoints(controlPoints, 0.5, 40),
    [controlPoints],
  );

  // Binary search to find point on path at given Y
  const findPointAtY = (path: SVGPathElement, targetY: number) => {
    const pathLength = path.getTotalLength();
    const startPoint = path.getPointAtLength(0);
    const endPoint = path.getPointAtLength(pathLength);

    if (targetY <= startPoint.y) {
      return { x: startPoint.x, y: startPoint.y };
    }

    if (targetY >= endPoint.y) {
      return { x: endPoint.x, y: endPoint.y };
    }

    let low = 0;
    let high = pathLength;
    let bestPoint = startPoint;

    for (let i = 0; i < 25; i++) {
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

    return { x: bestPoint.x, y: bestPoint.y };
  };

  // Direct DOM manipulation for smooth scrolling - no React state updates
  useEffect(() => {
    const path = pathRef.current;
    const indicator = indicatorRef.current;
    const clipRect = clipRectRef.current;
    const milestoneImage = milestoneImageRef.current;

    if (!path || !indicator || !clipRect) return;

    let rafId: number;
    let lastTargetY = scrollStateRef.current.targetY;

    const updateIndicator = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const newTargetY = scrollY + viewportHeight * 0.5;

      // Clamp targetY to the extended timeline end
      const clampedTargetY = Math.min(
        Math.max(newTargetY, heroHeight + heightPerSection * 0.5),
        timelineEndY,
      );

      // Only update DOM if position changed significantly
      if (Math.abs(clampedTargetY - lastTargetY) > 0.5) {
        lastTargetY = clampedTargetY;
        scrollStateRef.current.targetY = clampedTargetY;

        // Update clip rect height directly
        clipRect.setAttribute("height", String(clampedTargetY));

        // Calculate which milestone we're on
        const positionInTimeline = clampedTargetY - heroHeight;
        const newMilestoneIndex = Math.max(
          0,
          Math.min(
            Math.floor(positionInTimeline / heightPerSection),
            timelineData.length - 1,
          ),
        );

        // Update milestone image if changed
        if (
          newMilestoneIndex !== scrollStateRef.current.currentMilestoneIndex
        ) {
          scrollStateRef.current.currentMilestoneIndex = newMilestoneIndex;
          if (milestoneImage) {
            milestoneImage.setAttribute(
              "href",
              timelineData[newMilestoneIndex].milestone,
            );
          }
        }

        // Find position on path and update indicator
        const pos = findPointAtY(path, clampedTargetY);

        // Show/hide indicator based on scroll position
        if (clampedTargetY >= firstSectionY) {
          indicator.style.opacity = "1";
          indicator.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);
        } else {
          indicator.style.opacity = "0";
        }
      }

      rafId = requestAnimationFrame(updateIndicator);
    };

    // Start the animation loop
    rafId = requestAnimationFrame(updateIndicator);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [heroHeight, heightPerSection, timelineEndY, firstSectionY, timelineData]);

  const imageSize = 48;

  return (
    <div
      className={styles.container}
      style={{
        height: timelineEndY,
        overflow: "hidden",
      }}
    >
      <svg
        width="800"
        height={timelineEndY}
        viewBox={`0 0 800 ${timelineEndY}`}
        className={styles.svg}
      >
        <defs>
          <clipPath id="progressClip">
            <rect
              ref={clipRectRef}
              x="-100"
              y="0"
              width="1000"
              height={heroHeight + heightPerSection * 0.5}
            />
          </clipPath>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.accentPrimary} />
            <stop offset="50%" stopColor={colors.accentSecondary} />
            <stop offset="100%" stopColor={colors.accentDark} />
          </linearGradient>
          {/* Circular clip path for milestone image */}
          <clipPath id="circleClip">
            <circle cx="0" cy="0" r={imageSize / 2} />
          </clipPath>
        </defs>

        {/* Base line */}
        <path
          ref={pathRef}
          d={smoothPath}
          stroke={colors.textPrimary}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.12"
        />

        {/* Gradient progress line */}
        <path
          d={smoothPath}
          stroke="url(#lineGradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#progressClip)"
        />

        {/* Indicator group - positioned via direct DOM manipulation */}
        <g
          ref={indicatorRef}
          transform={`translate(550, ${heroHeight + heightPerSection * 0.5})`}
          style={{ willChange: "transform", opacity: 0 }}
        >
          {/* Outer glow */}
          <circle r="50" fill={colors.accentSecondary} opacity="0.15" />

          {/* Border circle */}
          <circle
            r="40"
            fill={colors.textPrimary}
            stroke={colors.accentSecondary}
            strokeWidth="4"
          />

          {/* Milestone image with circular clip */}
          <g clipPath="url(#circleClip)">
            <image
              ref={milestoneImageRef}
              href={timelineData[0]?.milestone || ""}
              x={-imageSize / 2}
              y={-imageSize / 2}
              width={imageSize}
              height={imageSize}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>

          {/* Pulsing ring animation */}
          <circle
            r="40"
            fill="none"
            stroke={colors.accentPrimary}
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
      </svg>
    </div>
  );
}

export default TimelineWavyLine;

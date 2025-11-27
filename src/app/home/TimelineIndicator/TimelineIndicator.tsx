"use client";
import { TimelineYear } from "../timelineData";

interface TimelineIndicatorProps {
  currentData: TimelineYear;
  indicatorProgress: number;
  heightPerSection: number;
  heroHeight: number;
  yearsCount: number;
}

function TimelineIndicator({
  currentData,
  indicatorProgress,
  heightPerSection,
  heroHeight,
  yearsCount,
}: TimelineIndicatorProps) {
  // Calculate exact position on the wavy line
  const getPointOnPath = (progress: number) => {
    const centerX = 400;
    const leftX = 180;
    const rightX = 620;
    const totalHeight = heroHeight + (yearsCount - 1) * heightPerSection;

    // Determine which section we're in
    const currentY = progress * totalHeight;
    let sectionIndex = 0;
    let cumulativeHeight = 0;

    // Find which section we're in
    for (let i = 0; i < yearsCount; i++) {
      const sectionHeight = i === 0 ? heroHeight : heightPerSection;
      if (
        currentY >= cumulativeHeight &&
        currentY < cumulativeHeight + sectionHeight
      ) {
        sectionIndex = i;
        break;
      }
      cumulativeHeight += sectionHeight;
      if (i === yearsCount - 1) sectionIndex = i;
    }

    // Calculate progress within current section
    const sectionStartY =
      sectionIndex === 0
        ? 0
        : heroHeight + (sectionIndex - 1) * heightPerSection;
    const sectionHeight = sectionIndex === 0 ? heroHeight : heightPerSection;
    const sectionProgress = (currentY - sectionStartY) / sectionHeight;

    // Determine positions
    const isContentLeft = sectionIndex % 2 === 0;
    const targetX = isContentLeft ? rightX : leftX;

    const prevIsContentLeft = (sectionIndex - 1) % 2 === 0;
    const prevX =
      sectionIndex === 0 ? centerX : prevIsContentLeft ? rightX : leftX;

    // Use cubic bezier interpolation
    const t = Math.min(Math.max(sectionProgress, 0), 1);
    const cp1X = prevX + (targetX - prevX) * 0.1;
    const cp2X = prevX + (targetX - prevX) * 0.9;

    // Cubic bezier formula
    const mt = 1 - t;
    const x =
      mt * mt * mt * prevX +
      3 * mt * mt * t * cp1X +
      3 * mt * t * t * cp2X +
      t * t * t * targetX;

    return { x, y: currentY };
  };

  const indicatorPos = getPointOnPath(indicatorProgress);

  // This component returns null - the indicator is now rendered in the SVG itself
  // We just export the position data for the parent to use
  return null;
}

export default TimelineIndicator;
export { TimelineIndicator };

import React from 'react';
import { ChartSegment } from '../sample-data';

interface DonutChartProps {
  segments: ChartSegment[];
  total: number | string;
  totalLabel?: string;
}

export const DonutChart = ({
  segments,
  total,
  totalLabel = 'Total',
}: DonutChartProps) => {
  const radius = 54;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0);

  let accumulatedOffset = 0;

  return (
    <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-py-2">
      {/* SVG Donut */}
      <div className="ax-relative ax-flex ax-items-center ax-justify-center">
        <svg width="170" height="170" viewBox="0 0 170 170" className="ax-transform -ax-rotate-90">
          {segments.map((segment, idx) => {
            const fraction = totalValue > 0 ? segment.value / totalValue : 0;
            const strokeLength = Math.max(0, fraction * circumference - (segments.length > 1 ? 4 : 0));
            const gapLength = circumference - strokeLength;
            const strokeOffset = -accumulatedOffset;

            accumulatedOffset += fraction * circumference;

            return (
              <circle
                key={idx}
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeLength} ${gapLength}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="ax-transition-all ax-duration-500"
              />
            );
          })}
        </svg>

        {/* Centered Total Text */}
        <div className="ax-absolute ax-flex ax-flex-col ax-items-center ax-justify-center ax-text-center">
          <span className="ax-text-xs ax-font-medium ax-text-gray-400 ax-tracking-wider">{totalLabel}</span>
          <span className="ax-text-2xl ax-font-black ax-text-gray-900 ax-leading-tight">{total}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="ax-mt-4 ax-flex ax-flex-wrap ax-items-center ax-justify-center ax-gap-x-3 ax-gap-y-1.5 ax-text-xs">
        {segments.map((seg, idx) => (
          <div key={idx} className="ax-flex ax-items-center ax-gap-1-5 ax-text-2xs ax-font-medium ax-text-gray-700">
            <span className="ax-h-2.5 ax-w-2.5 ax-rounded-full ax-shrink-0" style={{ backgroundColor: seg.color }} />
            <span>
              {seg.label} <span className="ax-font-bold">({seg.countLabel})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;

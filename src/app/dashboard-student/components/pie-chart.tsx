import React from 'react';
import { ChartSegment } from '../sample-data';

interface PieChartProps {
  segments: ChartSegment[];
}

export const PieChart = ({ segments }: PieChartProps) => {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);
  const size = 160;
  const center = size / 2;
  const radius = 62;

  let currentAngle = -Math.PI / 2;

  const paths = segments.map((seg) => {
    const angle = (seg.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return {
      d,
      color: seg.color,
      label: seg.label,
      count: seg.countLabel,
    };
  });

  return (
    <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-py-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map((path, idx) => (
          <path
            key={idx}
            d={path.d}
            fill={path.color}
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="ax-transition-all ax-duration-300 hover:ax-opacity-90"
          />
        ))}
      </svg>

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

export default PieChart;

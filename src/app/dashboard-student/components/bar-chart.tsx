import React from 'react';
import { BarDataPoint } from '../sample-data';

interface BarChartProps {
  data: BarDataPoint[];
  color: string;
  yAxisLabel?: string;
  maxValue?: number;
}

export const BarChart = ({
  data,
  color,
  yAxisLabel = 'Requirements',
  maxValue = 80,
}: BarChartProps) => {
  const chartHeight = 140;
  const chartWidth = 240;
  const yTicks = [80, 60, 40, 20, 0];

  return (
    <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-py-2 ax-w-full">
      <div className="ax-flex ax-items-center ax-w-full ax-max-w-xs ax-justify-center">
        {/* Y Axis Title */}
        {yAxisLabel && (
          <div className="ax-text-2xs ax-font-medium ax-text-gray-400 -ax-rotate-90 ax-transform ax-origin-center ax-whitespace-nowrap ax-mr-1">
            {yAxisLabel}
          </div>
        )}

        {/* SVG Chart Area */}
        <svg viewBox="0 0 280 180" className="ax-w-full ax-h-auto" style={{ maxHeight: '180px' }}>
          {/* Y Axis Grid Lines & Labels */}
          {yTicks.map((tick) => {
            const yPos = 20 + ((maxValue - tick) / maxValue) * chartHeight;
            return (
              <g key={tick}>
                <text x="22" y={yPos + 3} textAnchor="end" className="ax-text-3xs ax-fill-gray-400" fontSize="9">
                  {tick}
                </text>
                <line
                  x1="28"
                  y1={yPos}
                  x2={28 + chartWidth}
                  y2={yPos}
                  stroke="#E5E7EB"
                  strokeWidth="0.8"
                  strokeDasharray={tick === 0 ? undefined : '2,2'}
                />
              </g>
            );
          })}

          {/* Vertical Bars */}
          {data.map((item, idx) => {
            const barWidth = 20;
            const gap = chartWidth / data.length;
            const xPos = 28 + idx * gap + (gap - barWidth) / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const yPos = 20 + chartHeight - barHeight;

            return (
              <g key={idx}>
                {/* Bar */}
                <rect
                  x={xPos}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  ry="6"
                  fill={color}
                  className="ax-transition-all ax-duration-300 hover:ax-opacity-80"
                />

                {/* X Axis Label */}
                <text
                  x={xPos + barWidth / 2}
                  y={20 + chartHeight + 14}
                  textAnchor="middle"
                  className="ax-text-3xs ax-fill-gray-600 ax-font-medium"
                  fontSize="9"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default BarChart;

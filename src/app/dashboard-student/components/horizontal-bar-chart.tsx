import React from 'react';
import { BarDataPoint } from '../sample-data';

interface HorizontalBarChartProps {
  data: BarDataPoint[];
  color?: string;
  maxValue?: number;
}

export const HorizontalBarChart = ({
  data,
  color = '#009E20',
  maxValue = 100,
}: HorizontalBarChartProps) => {
  const chartWidth = 200;
  const chartHeight = 140;
  const xTicks = [0, 20, 40, 60, 80, 100];
  const startX = 75;

  return (
    <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-py-2 ax-w-full">
      <svg viewBox="0 0 300 180" className="ax-w-full ax-h-auto" style={{ maxHeight: '180px' }}>
        {/* Horizontal Bars & Y Labels */}
        {data.map((item, idx) => {
          const barHeight = 14;
          const rowGap = chartHeight / data.length;
          const yPos = 12 + idx * rowGap + (rowGap - barHeight) / 2;
          const barWidth = (item.value / maxValue) * chartWidth;

          return (
            <g key={idx}>
              {/* Y Label */}
              <text
                x={startX - 6}
                y={yPos + barHeight / 2 + 3}
                textAnchor="end"
                className="ax-text-3xs ax-fill-gray-700 ax-font-medium"
                fontSize="9"
              >
                {item.label}
              </text>

              {/* Bar */}
              <rect
                x={startX}
                y={yPos}
                width={barWidth}
                height={barHeight}
                rx="7"
                ry="7"
                fill={color}
                className="ax-transition-all ax-duration-300 hover:ax-opacity-80"
              />
            </g>
          );
        })}

        {/* X Axis Baseline */}
        <line
          x1={startX}
          y1={12 + chartHeight}
          x2={startX + chartWidth}
          y2={12 + chartHeight}
          stroke="#9CA3AF"
          strokeWidth="0.8"
        />

        {/* X Axis Ticks & Labels */}
        {xTicks.map((tick) => {
          const xPos = startX + (tick / maxValue) * chartWidth;
          return (
            <g key={tick}>
              <line x1={xPos} y1={12 + chartHeight} x2={xPos} y2={12 + chartHeight + 4} stroke="#9CA3AF" strokeWidth="0.8" />
              <text
                x={xPos}
                y={12 + chartHeight + 14}
                textAnchor="middle"
                className="ax-text-3xs ax-fill-gray-500"
                fontSize="8.5"
              >
                {tick}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default HorizontalBarChart;

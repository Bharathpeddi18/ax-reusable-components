'use client'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import AXCard from '@/ax-reusable-components/ax-card/ax-card'
import AXBadge from '@/ax-reusable-components/ax-mini-components/ax-badge/ax-badge'
import { DASHBOARD_COLORS } from '../../../../../global-config';

const studentsByClass = [
  { id: 'pre-kg', class: 'Class Pre-KG', A: 42 },
  { id: 'lkg', class: 'Class LKG', A: 58 },
  { id: 'ukg', class: 'Class UKG', A: 32, B: 32 },

  { id: 'first-class', class: 'Class 1st', A: 26, B: 27, C: 25 },
  { id: 'second-class', class: 'Class 2nd', A: 36, B: 36, C: 32, D: 30, E: 27 },
  { id: 'third-class', class: 'Class 3rd', A: 27, B: 28, C: 26, D: 24, E: 20, F: 17, G: 15, H: 13, I: 11, J: 9 },
  { id: 'fourth-class', class: 'Class 4th', A: 76 },
  { id: 'fifth-class', class: 'Class 5th', A: 22, B: 22, C: 23, D: 21 },
  { id: 'sixth-class', class: 'Class 6th', A: 42, B: 41 },
  { id: 'seventh-class', class: 'Class 7th', A: 31, B: 30, C: 31 },
  { id: 'eighth-class', class: 'Class 8th', A: 44, B: 43, C: 41, D: 39, E: 37 },
  { id: 'ninth-class', class: 'Class 9th', A: 40, B: 39 },
  { id: 'tenth-class', class: 'Class 10th', A: 74 },
];

const totalStudents = studentsByClass.reduce(
  (total, item) =>
    total +
    (item.A ?? 0) +
    (item.B ?? 0) +
    (item.C ?? 0) +
    (item.D ?? 0),
  0
);

const calculateWidth = (count: number) => count * 75;

export const ChartStudentsByClass = () => {
  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-flex ax-items-center"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h3
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
            By Class
          </h3>

          <AXBadge
            propsLabel={totalStudents.toString()}
            propsRadius="full"
            propsClassName="ax-ml-1"
          />
        </div>
      }
      propsBody={
        <div className="ax-w-full ax-h-300 ax-overflow-auto">
          <ResponsiveContainer
            width={calculateWidth(studentsByClass.length)}
            height="100%"
          >
            <BarChart
              data={studentsByClass}
              margin={{
                top: 10,
                right: 10,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="class"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fontWeight: 500,
                  fill: '#64748B',
                }}
                label={{
                  value: 'Class',
                  position: 'insideBottom',
                  offset: -15,
                  style: {
                    fill: '#64748B',
                    fontSize: 14,
                    fontWeight: 600,
                  },
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fontWeight: 600,
                  fill: '#64748B',
                }}
                label={{
                  value: 'Students',
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    fill: '#64748B',
                    fontSize: 14,
                    fontWeight: 600,
                  },
                }}
              />

              <Tooltip
                cursor={{ fill: 'transparent' }}
                formatter={(value, name) => [
                  `${value}`,
                  `Sec ${name}`,
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                }}
              />

              <Bar
                dataKey="J"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionJ}
                maxBarSize={24}
              />
              <Bar
                dataKey="I"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionI}
                maxBarSize={24}
              />
              <Bar
                dataKey="H"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionH}
                maxBarSize={24}
              />
              <Bar
                dataKey="G"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionG}
                maxBarSize={24}
              />
              <Bar
                dataKey="F"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionF}
                maxBarSize={24}
              />
              <Bar
                dataKey="E"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionE}
                maxBarSize={24}
              />

              <Bar
                dataKey="D"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionD}
                maxBarSize={24}
              />

              <Bar
                dataKey="C"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionC}
                maxBarSize={24}
              />

              <Bar
                dataKey="B"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionB}
                maxBarSize={24}
              />

              <Bar
                dataKey="A"
                stackId="sections"
                fill={DASHBOARD_COLORS.sectionA}
                maxBarSize={24}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      }
    />
  )
}

export default ChartStudentsByClass;
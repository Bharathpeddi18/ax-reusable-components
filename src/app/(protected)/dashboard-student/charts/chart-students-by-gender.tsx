'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

import AXCard from "@/ax-reusable-components/ax-card/ax-card"
import AXBadge from "@/ax-reusable-components/ax-mini-components/ax-badge/ax-badge"
import { DASHBOARD_COLORS } from '../../../../../global-config';

const studentsByGender = [
  { gender: 'Boys', students: 420, color: DASHBOARD_COLORS.boys },
  { gender: 'Girls', students: 280, color: DASHBOARD_COLORS.girls },
];

const totalStudents = studentsByGender.reduce(
  (total, item) => total + item.students,
  0
);

const renderCenterLabel = ({ viewBox }: any) => {
  const { cx, cy } = viewBox;

  return (
    <>
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: 22,
          fontWeight: 700,
          fill: '#24364B',
        }}
      >
        {totalStudents}
      </text>

      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: 11,
          fontWeight: 500,
          fill: '#64748B',
        }}
      >
        Students
      </text>
    </>
  );
};

export const ChartStudentsByGender = () => {
  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName='ax-flex ax-items-center'
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h3
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
            By Gender
          </h3>

          <AXBadge
            propsLabel={totalStudents.toString()}
            propsRadius="full"
            propsClassName="ax-ml-1"
          />
        </div>
      }
      propsBody={
        <div className="ax-flex ax-flex-col ax-items-center ax-justify-between ax-w-full">
          <div className="ax-w-full ax-h-200">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentsByGender}
                  dataKey="students"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  cornerRadius={8}
                  stroke="none"
                >
                  {studentsByGender.map((item) => (
                    <Cell
                      key={item.gender}
                      fill={item.color}
                    />
                  ))}
                  <Label
                    content={renderCenterLabel}
                  />
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="ax-flex ax-items-center ax-justify-center ax-gap-4">
            <span
              className="ax-relative ax-ps-3 ax-legend ax-legend-md"
              style={{
                '--ax-legend-color': DASHBOARD_COLORS.boys,
              } as React.CSSProperties}
            >
              Boys
            </span>
            <span
              className="ax-relative ax-ps-3 ax-legend ax-legend-md"
              style={{
                '--ax-legend-color': DASHBOARD_COLORS.girls,
              } as React.CSSProperties}
            >
              Girls
            </span>
          </div>
        </div>
      }
    />
  )
}

export default ChartStudentsByGender;
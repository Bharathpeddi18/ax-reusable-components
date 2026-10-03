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

const studentsByGrade = [
  { grade: 'Grade A', students: 180, color: DASHBOARD_COLORS.gradeA },
  { grade: 'Grade B', students: 150, color: DASHBOARD_COLORS.gradeB },
  { grade: 'Grade C', students: 120, color: DASHBOARD_COLORS.gradeC },
  { grade: 'Grade D', students: 90, color: DASHBOARD_COLORS.gradeD },
  { grade: 'Grade E', students: 60, color: DASHBOARD_COLORS.gradeE },
  { grade: 'Grade F', students: 30, color: DASHBOARD_COLORS.gradeF },
];

const totalStudents = studentsByGrade.reduce(
  (total, item) => total + item.students,
  0
);

export const ChartStudentsByGrade = () => {
  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName='ax-flex ax-items-center'
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
            By Grade
          </h1>

          <AXBadge
            propsLabel={totalStudents.toString()}
            propsRadius="full"
            propsClassName="ax-ml-1"
          />
        </div>
      }
      propsBody={
        <>
        <div className="ax-flex ax-flex-col ax-items-center ax-justify-between">
          <div className="ax-w-full ax-h-200">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentsByGrade}
                  dataKey="students"
                  nameKey="grade"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  paddingAngle={0}
                  cornerRadius={6}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {studentsByGrade.map((item) => (
                    <Cell
                      key={item.grade}
                      fill={item.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: any, grade: any) => [`${value}`, `${grade}`]}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="ax-flex ax-items-center ax-justify-center ax-flex-wrap ax-gap-3 ax-mt-2">
            {studentsByGrade.map((item) => (
              <span
                key={item.grade}
                className="ax-relative ax-ps-3 ax-legend ax-legend-md"
                style={{
                  '--ax-legend-color': item.color,
                } as React.CSSProperties}
              >
                {item.grade}
              </span>
            ))}
          </div>
        </div>
        </>
      }
    />
  )
}

export default ChartStudentsByGrade;
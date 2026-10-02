'use client'

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AXCard from "@/ax-reusable-components/ax-card/ax-card"
import AXBadge from "@/ax-reusable-components/ax-mini-components/ax-badge/ax-badge"

const studentsByClass = [
  { className: 'Pre-KG', students: 42 },
  { className: 'LKG', students: 58 },
  { className: 'UKG', students: 64 },
  { className: '1st', students: 78 },
  { className: '2nd', students: 72 },
  { className: '3rd', students: 81 },
  { className: '4th', students: 76 },
  { className: '5th', students: 88 },
  { className: '6th', students: 83 },
  { className: '7th', students: 92 },
  { className: '8th', students: 87 },
  { className: '9th', students: 79 },
  { className: '10th', students: 74 },
];

const calculateWidth = (num: number) => {
  return num * 70;
};

export const ChartStudentsByClass = () => {
  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1 className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary" tabIndex={0}>By Class</h1>
          <AXBadge
            propsLabel={'20'}
            propsRadius='full'
            propsClassName='ax-ml-1'
          />
        </div>
      }
      propsBody={
        <>
          <div className="ax-w-full ax-h-200 ax-overflow-auto">
            <ResponsiveContainer width={calculateWidth(studentsByClass.length)} height="100%">
              <BarChart
                data={studentsByClass}
                margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={false}
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="className"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12,fontWeight: 500, fill: '#64748B' }}
                  label={{
                    value: 'Class',
                    angle: 0,
                    position: 'insideBottom',
                    style: {
                      fill: '#64748B',
                      fontSize: 12,
                      fontWeight: 600,
                      margin: 40
                    },
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12,fontWeight: 600, fill: '#64748B' }}
                  label={{
                    value: 'Students',
                    angle: -90,
                    position: 'insideLeft',
                    style: {
                      fill: '#64748B',
                      fontSize: 12,
                      fontWeight: 600,
                    },
                  }}
                />

                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgb(0 0 0 / 0.08)',
                  }}
                />

                <Bar
                  dataKey="students"
                  fill="#0194de"
                  radius={[12, 12, 0, 0]}
                  maxBarSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    >
    </AXCard>
  )
}

export default ChartStudentsByClass;
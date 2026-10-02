'use client';

import Icon from '@/assets/icons';

export interface KpiItem {
  label: string;
  value: string;
  icon: string;
  colorCode: string
}

const studentKpis: KpiItem[] = [
  {
    label: 'Total Students',
    value: '1,240',
    icon: 'people-fill',
    colorCode: '1'
  },
  {
    label: "Today's Attendance",
    value: '92%',
    icon: 'calendar2-check-fill',
    colorCode: '2'
  },
  {
    label: 'Students Present',
    value: '1,148',
    icon: 'person-check-fill',
    colorCode: '3'
  },
  {
    label: 'Students on Leave',
    value: '26',
    icon: 'person-dash-fill',
    colorCode: '4'
  },
];

// region Main Component
export const Kpis = ({ items = studentKpis }: { items?: KpiItem[] }) => {
  return (
    <div className="ax-grid ax-grid-cols-1 sm:ax-grid-cols-2 lg:ax-grid-cols-4 ax-gap-4">
      {items.map(({ label, value, icon, colorCode }) => (
        <div key={label} status-kpis={colorCode} className="ax-kpi ax-flex ax-items-center ax-justify-between ax-gap-2 ax-p-4 ax-shadow-sm">
          <div className="ax-flex ax-items-center ax-gap-3">
            <span className={`ax-kpi-bg-light ax-kpi-color ax-flex ax-items-center ax-justify-center ax-rounded-lg ax-h-11 ax-w-11 ax-p-2`}>
              <Icon name={icon} size={20} />
            </span>
            <span className="ax-text-md ax-font-semibold ax-text-gray-700 ax-text-break-all ax-line-clamp-1">
              {label}
            </span>
          </div>
          <span className="ax-text-xl ax-kpi-color ax-font-black ax-text-gray-900">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Kpis;
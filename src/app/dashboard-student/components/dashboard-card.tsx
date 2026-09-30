import React, { ReactNode } from 'react';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';

interface DashboardCardProps {
  title: string;
  count?: number | string;
  children: ReactNode;
  onViewAll?: () => void;
  onResetFilter?: () => void;
}

export const DashboardCard = ({
  title,
  count = 48,
  children,
  onViewAll,
  onResetFilter,
}: DashboardCardProps) => {
  return (
    <AXCard
      propsSize="md"
      propsClassName="ax-shadow-xs hover:ax-shadow-sm ax-transition-shadow"
      propsHeader={
        <div className="ax-flex ax-items-center ax-justify-between">
          <h2 className="ax-text-sm ax-font-bold ax-text-gray-900">
            {title} <span className="ax-font-bold ax-text-primary">({count})</span>
          </h2>

          <div className="ax-flex ax-items-center ax-gap-2">
            <button
              type="button"
              onClick={onViewAll}
              className="ax-rounded-full ax-border ax-border-blue-600 ax-bg-white ax-px-2.5 ax-py-0.5 ax-text-2xs ax-font-semibold ax-text-primary ax-transition-colors hover:ax-bg-blue-50"
            >
              View All
            </button>
            <button
              type="button"
              onClick={onResetFilter}
              className="ax-rounded-full ax-border ax-border-blue-600 ax-bg-white ax-px-2.5 ax-py-0.5 ax-text-2xs ax-font-semibold ax-text-primary ax-transition-colors hover:ax-bg-blue-50"
            >
              Reset Filter
            </button>
          </div>
        </div>
      }
      propsBody={children}
    />
  );
};

export default DashboardCard;

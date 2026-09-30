'use client';

import Icon from '@/assets/icons';
import { AXPageHeader } from '@/ax-reusable-components/ax-page-header/ax-page-header';
import DashboardFilters from './filters/filters';
import DashboardCard from './components/dashboard-card';
import DonutChart from './components/donut-chart';
import BarChart from './components/bar-chart';
import HorizontalBarChart from './components/horizontal-bar-chart';
import PieChart from './components/pie-chart';
import {
  kpiMetrics,
  priorityChartData,
  categoryChartData,
  eeicChartData,
  baChartData,
  sagChartData,
  pecChartData,
  amountChartData,
  statusChartData,
  fundStatusChartData,
} from './sample-data';

// region Main Component
export default function DashboardStudentPage() {
  return (
    <>
      {/* Top Page Header with Filters */}
      <AXPageHeader
        propsPageTitle="Dashboard"
        propsLeftContent={
          <div className="ax-flex ax-items-center ax-gap-2.5">
            <Icon name="bar-chart-line-fill" size={20} className="ax-text-primary" />
            <h1 className="ax-text-base ax-font-bold ax-text-gray-900" tabIndex={0}>
              Dashboard
            </h1>
          </div>
        }
        propsRightContent={<DashboardFilters />}
      />

      <main className="ax-p-4 md:ax-p-6">
        <div className="ax-container ax-flex ax-flex-col ax-gap-5">
          {/* Top 4 KPI Summary Cards */}
          <div className="ax-grid ax-grid-cols-1 sm:ax-grid-cols-2 lg:ax-grid-cols-4 ax-gap-4">
            {kpiMetrics.map((kpi) => (
              <div
                key={kpi.id}
                className="ax-flex ax-items-center ax-justify-between ax-rounded-xl ax-border ax-border-gray-200 ax-bg-white ax-p-4 ax-shadow-xs"
              >
                <div className="ax-flex ax-items-center ax-gap-3">
                  <span
                    className={`ax-flex ax-h-10 ax-w-10 ax-items-center ax-justify-center ax-rounded-lg ${kpi.iconBg}`}
                  >
                    <Icon name={kpi.icon} size={20} className={kpi.iconColor} />
                  </span>
                  <span className="ax-text-xs ax-font-semibold ax-text-gray-700">{kpi.title}</span>
                </div>

                <span className="ax-text-2xl ax-font-black ax-text-gray-900">{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* 3x3 Grid of 9 Analysis Chart Cards */}
          <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 lg:ax-grid-cols-3 ax-gap-5">
            {/* Row 1: By Priority */}
            <DashboardCard title="By Priority" count={48}>
              <DonutChart segments={priorityChartData} total="23" />
            </DashboardCard>

            {/* Row 1: By Category */}
            <DashboardCard title="By Category" count={48}>
              <DonutChart segments={categoryChartData} total="48" />
            </DashboardCard>

            {/* Row 1: By EEIC */}
            <DashboardCard title="By EEIC" count={48}>
              <BarChart data={eeicChartData} color="#C28B00" />
            </DashboardCard>

            {/* Row 2: By BA */}
            <DashboardCard title="By BA" count={48}>
              <BarChart data={baChartData} color="#0047D1" />
            </DashboardCard>

            {/* Row 2: By SAG */}
            <DashboardCard title="By SAG" count={48}>
              <BarChart data={sagChartData} color="#00B080" />
            </DashboardCard>

            {/* Row 2: By PEC */}
            <DashboardCard title="By PEC" count={48}>
              <BarChart data={pecChartData} color="#7A00CC" />
            </DashboardCard>

            {/* Row 3: By Requirement Amount */}
            <DashboardCard title="By Requirement Amount" count={48}>
              <HorizontalBarChart data={amountChartData} color="#009E20" />
            </DashboardCard>

            {/* Row 3: By Status */}
            <DashboardCard title="By Status" count={48}>
              <DonutChart segments={statusChartData} total="48" />
            </DashboardCard>

            {/* Row 3: By Fund Status */}
            <DashboardCard title="By Fund Status" count={48}>
              <PieChart segments={fundStatusChartData} />
            </DashboardCard>
          </div>
        </div>
      </main>
    </>
  );
}

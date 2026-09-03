'use client';

import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import ApplicationLogo from '@/assets/images/application-logo.png';

const Dashboard = () => {
  return (
    <>
      <AXPageHeader title="Dashboard" actions={<span className="text-xs text-muted">Overview</span>} />
      <div className="p-6 flex flex-col gap-6 max-w-7xl">
        <div className="p-8 bg-surface rounded-2xl border border-default shadow-sm flex flex-col items-center justify-center gap-4 text-center">
          <img src={ApplicationLogo.src} alt="AstraX" className="max-w-xs h-auto object-contain" />
          <h2 className="text-2xl font-bold text-primary">AstraX Design System</h2>
          <p className="text-secondary max-w-lg text-sm leading-relaxed">
            A utility-first, token-driven, composable CSS architecture and component library designed for high-performance enterprise applications.
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

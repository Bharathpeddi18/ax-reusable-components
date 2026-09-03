'use client';

import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import ApplicationLogo from '@/assets/images/application-logo.png'

const Dashboard = () => {
  return (
    <>
      <AXPageHeader />
      <div className="ax-page-content ax-p-3">
        <img src={ApplicationLogo.src} alt="AstraX" />
      </div>
    </>
  );
};

export default Dashboard;

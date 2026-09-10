'use client';

import React from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  AXPopover,
  AXPopoverTrigger,
  AXPopoverContent,
  AXPopoverHeader,
  AXPopoverBody,
  AXPopoverFooter,
} from '@/components/ax-popover/ax-popover';

const Dashboard = () => {
  return (
    <>
      <AXPageHeader
        title="Dashboard"
        actions={<span className="ax-text-xs ax-text-muted">v1.0.0 Production Ready</span>}
      />
    </>
  );
};

export default Dashboard;

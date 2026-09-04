'use client';

import React from 'react';
import { AXPageHeader } from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';

import { DownloadIcon, PlusIcon, FilterIcon } from '@/assets/icons';

export const PageHeaderSamples: React.FC = () => {
  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. Standard CRUD Action Headers */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2 ax-py-0.5 ax-bg-surface-secondary ax-rounded ax-text-xs ax-font-medium ax-text-primary ax-mb-1">
            CRUD & Workflow Actions
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            1. Standard Action Header Configurations
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Sticky surface headers equipped with export, filter, and primary creation CTA buttons.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            title="User Management & RBAC Permissions"
            actions={
              <div className="ax-flex ax-items-center ax-gap-2">
                <AXButton size="xs" variant="outlined" color="secondary" startIcon={<DownloadIcon />} label="Export CSV" />
                <AXButton size="xs" variant="soft" color="accent" startIcon={<FilterIcon />} label="Filters" />
                <AXButton size="xs" color="primary" startIcon={<PlusIcon />} label="Invite User" />
              </div>
            }
          />
        </div>
      </div>

      {/* 2. Header with Status Indicators & Badges */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            2. Header with Live Status Badges & Telemetry
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Incorporating real-time status indicators, environment tags, and system telemetry pills.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            title="Cluster Telemetry & Health"
            actions={
              <div className="ax-flex ax-items-center ax-gap-3">
                <div className="ax-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-1 ax-bg-surface-secondary ax-rounded-full ax-text-xs">
                  <span className="ax-w-2 ax-h-2 ax-rounded-full ax-bg-success" />
                  <span className="ax-font-semibold ax-text-success">Operational</span>
                  <span className="ax-text-muted">| 99.99% Uptime</span>
                </div>
                <AXButton size="xs" variant="soft" color="primary" label="Restart Services" />
                <AXButton size="xs" color="danger" label="Purge Cache" />
              </div>
            }
          />
        </div>
      </div>

      {/* 3. Header with Breadcrumb-Style Context */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            3. Deep Hierarchy & Contextual Headers
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Path breadcrumb titles paired with workflow state transitions.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            title="Projects / Defense-Grid / Satellite Telemetry"
            actions={
              <div className="ax-flex ax-items-center ax-gap-2">
                <span className="ax-text-xs ax-text-muted">Last synced: 2 mins ago</span>
                <AXButton size="xs" variant="outlined" color="primary" label="Sync Now" />
                <AXButton size="xs" variant="contained" color="accent" label="Deploy Model" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeaderSamples;

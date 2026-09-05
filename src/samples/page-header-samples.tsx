'use client';

import React from 'react';
import {
  AXPageHeader,
  AXPageHeaderLeft,
  AXPageHeaderRight,
} from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  DownloadIcon,
  PlusIcon,
  FilterIcon,
  SettingsIcon,
  CubeIcon,
  SparklesIcon,
} from '@/assets/icons';

export const PageHeaderSamples: React.FC = () => {
  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. Standard Title on Left + Action Buttons on Right */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Pattern 1
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Standard Page Title & Action Buttons
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Consistent page title on the left with primary action buttons on the right.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            title="User & Team Management"
            actions={
              <div className="ax-flex ax-items-center ax-gap-2">
                <AXButton size="xs" variant="outlined" color="secondary" startIcon={<DownloadIcon size={14} />} label="Export CSV" />
                <AXButton size="xs" color="primary" startIcon={<PlusIcon size={14} />} label="Add Member" />
              </div>
            }
          />
        </div>
      </div>

      {/* 2. Page Title with Status Badge + Search Input on Right */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Pattern 2
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Title with Status Pill + Search & Filters
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Rich left-side title with status pill paired with search inputs and filter buttons.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            left={
              <div className="ax-flex ax-items-center ax-gap-3">
                <h1 className="ax-page-header-title">Cluster Telemetry & Health</h1>
                <span className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-text-success ax-rounded-full ax-text-xs ax-font-semibold">
                  <span className="ax-w-1.5 ax-h-1.5 ax-rounded-full ax-bg-success" /> Live
                </span>
              </div>
            }
            right={
              <div className="ax-flex ax-items-center ax-gap-2">
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  className="ax-py-1.5 ax-px-3 ax-text-xs ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-primary ax-outline-none focus:ax-border-primary ax-w-40"
                />
                <AXButton size="xs" variant="outlined" startIcon={<FilterIcon size={14} />} label="Filter" />
                <AXButton size="xs" color="primary" label="Restart Services" />
              </div>
            }
          />
        </div>
      </div>

      {/* 3. Entity Avatar Prefix on Left + Settings Controls on Right */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Pattern 3
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Entity Icon Prefix on Left + Multi-Action Toolbar on Right
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Custom left section with icon and subtitle, paired with settings controls on the right.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-overflow-hidden">
          <AXPageHeader
            left={
              <div className="ax-flex ax-items-center ax-gap-3">
                <div className="ax-w-9 ax-height-9 ax-rounded-lg ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center ax-font-bold">
                  <CubeIcon size={18} />
                </div>
                <div className="ax-flex ax-flex-col">
                  <h1 className="ax-page-header-title">Satellite Mesh v2.4</h1>
                  <span className="ax-text-xs ax-text-secondary">us-east-1 production gateway</span>
                </div>
              </div>
            }
            right={
              <div className="ax-flex ax-items-center ax-gap-2">
                <span className="ax-text-xs ax-text-muted">Updated: 2m ago</span>
                <AXButton size="xs" variant="outlined" startIcon={<SettingsIcon size={14} />} label="Configure" />
                <AXButton size="xs" color="primary" startIcon={<SparklesIcon size={14} />} label="Deploy" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PageHeaderSamples;

'use client';

import React, { useState } from 'react';
import {
  AXTabs,
  AXTabsList,
  AXTab,
  AXTabPanel,
  AXTabsVariant,
  AXTabsSize,
  AXTabItem,
} from '@/components/ax-tabs/ax-tabs';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  SquaresIcon,
  DocumentIcon,
  SettingsIcon,
  ShareIcon,
  BellIcon,
  CubeIcon,
  SparklesIcon,
  CheckIcon,
  PlusIcon,
} from '@/assets/icons';

export const TabsSamples: React.FC = () => {
  // Size level state
  const [selectedSize, setSelectedSize] = useState<AXTabsSize>('md');

  // Dynamic closable tabs state
  const [dynamicTabs, setDynamicTabs] = useState<string[]>([
    'Dashboard.tsx',
    'AuthService.ts',
    'Schema.prisma',
  ]);
  const [activeFile, setActiveFile] = useState('Dashboard.tsx');

  const handleCloseFile = (file: string) => {
    const nextTabs = dynamicTabs.filter((t) => t !== file);
    setDynamicTabs(nextTabs);
    if (activeFile === file && nextTabs.length > 0) {
      setActiveFile(nextTabs[0]);
    }
  };

  const handleAddFile = () => {
    const newName = `Component_${dynamicTabs.length + 1}.tsx`;
    setDynamicTabs((prev) => [...prev, newName]);
    setActiveFile(newName);
  };

  // Reusable Items Array with JSX titles & JSX contents
  const verticalItems: AXTabItem[] = [
    {
      id: 'general',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <SettingsIcon size={16} />
          <span>General Settings</span>
        </div>
      ),
      content: (
        <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
          <div className="ax-flex ax-items-center ax-justify-between">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Workspace Configuration</h4>
            <span className="ax-px-2 ax-py-0.5 ax-bg-success-soft ax-text-success ax-rounded-full ax-text-2xs ax-font-semibold">
              Live
            </span>
          </div>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Configure your application workspace title, default timezone, domain routing, and organization URL.
          </p>
          <div className="ax-flex ax-items-center ax-gap-2 ax-pt-2">
            <AXButton size="xs" color="primary" label="Save Changes" />
            <AXButton size="xs" variant="outlined" color="secondary" label="Reset" />
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <SquaresIcon size={16} />
          <span>User Profile</span>
          <span className="ax-px-1.5 ax-py-0.5 ax-bg-primary-soft ax-text-primary ax-rounded-full ax-text-2xs ax-font-bold">
            PRO
          </span>
        </div>
      ),
      content: (
        <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
          <div className="ax-flex ax-items-center ax-gap-3">
            <div className="ax-w-10 ax-h-10 ax-rounded-full ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center ax-font-bold">
              BP
            </div>
            <div>
              <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Bharath Peddi</h4>
              <span className="ax-text-xs ax-text-secondary">Lead Design Systems Engineer</span>
            </div>
          </div>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Manage your personal profile information, security credentials, and public developer identity.
          </p>
        </div>
      ),
    },
    {
      id: 'security',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <DocumentIcon size={16} />
          <span>Security & Auth</span>
          <span className="ax-px-1.5 ax-py-0.5 ax-bg-warning-soft ax-text-warning ax-rounded-full ax-text-2xs ax-font-bold">
            2FA
          </span>
        </div>
      ),
      content: (
        <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
          <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Authentication & Access Control</h4>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Hardware security keys (FIDO2 / WebAuthn) and TOTP authenticator application enabled for all admin operations.
          </p>
          <div className="ax-flex ax-items-center ax-gap-2">
            <CheckIcon size={14} className="ax-text-success" />
            <span className="ax-text-xs ax-text-success ax-font-semibold">SOC-2 Type II Compliant</span>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <BellIcon size={16} />
          <span>Notifications</span>
          <span className="ax-px-1.5 ax-py-0.5 ax-bg-danger ax-text-white ax-rounded-full ax-text-2xs ax-font-bold">
            4
          </span>
        </div>
      ),
      content: (
        <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
          <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Alert Streams & Webhooks</h4>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            You have 4 unread priority notifications waiting for review in your alert dispatch queue.
          </p>
        </div>
      ),
    },
  ];

  const horizontalItems: AXTabItem[] = [
    {
      id: 'metrics',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <SquaresIcon size={14} />
          <span>Performance Metrics</span>
          <span className="ax-px-1.5 ax-py-0.2 ax-bg-success-soft ax-text-success ax-rounded-full ax-text-2xs">99.9%</span>
        </div>
      ),
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          ⚡ Latency: <strong>14ms</strong> | Uptime: <strong>99.99%</strong> | Throughput: <strong>12.4k req/sec</strong>
        </div>
      ),
    },
    {
      id: 'security',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <DocumentIcon size={14} />
          <span>Security Audit</span>
        </div>
      ),
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          🛡️ Zero Trust Architecture | OAuth2 & OIDC Configured | Session TTL: 24h
        </div>
      ),
    },
    {
      id: 'integrations',
      title: (
        <div className="ax-flex ax-items-center ax-gap-2">
          <ShareIcon size={14} />
          <span>Cloud Integrations</span>
        </div>
      ),
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          ☁️ AWS S3 Connected | GitHub Actions CI Active | Cloudflare CDN Operational
        </div>
      ),
    },
  ];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* ====================================================================
          1. Vertical Tabs (Left Tab List -> Right Content)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Vertical Layout
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Vertical Tabs: Left Tab Title Click ➔ Right Content Display
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Clicking any tab on the left immediately switches the corresponding panel content on the right. Titles and contents accept custom JSX elements.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-xl ax-p-6 ax-bg-surface">
          <AXTabs
            orientation="vertical"
            size="md"
            variant="line"
            color="primary"
            items={verticalItems}
          />
        </div>
      </div>

      {/* ====================================================================
          2. Horizontal Tabs with Rich JSX Titles & Content
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Horizontal Layout
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Horizontal Tabs: Top Tab Strip ➔ Content Below
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Standard horizontal tabs supporting custom JSX elements for tab titles and panel contents.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-xl ax-p-6 ax-bg-surface">
          <AXTabs
            orientation="horizontal"
            size="md"
            variant="pill"
            color="primary"
            items={horizontalItems}
          />
        </div>
      </div>

      {/* ====================================================================
          3. Sizing Presets (XS to XL)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div className="ax-flex ax-items-center ax-justify-between ax-flex-wrap ax-gap-3">
          <div>
            <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-accent-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-accent ax-mb-1">
              Size Hierarchy
            </div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
              Size-Driven Token Spacing (XS to XL)
            </h3>
            <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
              Heights, paddings, gaps, and font sizes scale cleanly via CSS tokens.
            </p>
          </div>

          <div className="ax-flex ax-items-center ax-gap-2">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as AXTabsSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`ax-px-3 ax-py-1 ax-text-xs ax-font-semibold ax-rounded-md ax-transition-all ${
                  selectedSize === sz
                    ? 'ax-bg-primary ax-text-white ax-shadow-sm'
                    : 'ax-bg-surface ax-text-primary ax-border ax-border-default hover:ax-border-primary'
                }`}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="ax-border ax-border-default ax-rounded-xl ax-p-6 ax-bg-surface">
          <AXTabs defaultValue="tab1" size={selectedSize} variant="line">
            <AXTabsList>
              <AXTab value="tab1" startIcon={<SparklesIcon size={14} />}>
                Active ({selectedSize.toUpperCase()})
              </AXTab>
              <AXTab value="tab2">Analytics</AXTab>
              <AXTab value="tab3" badge="New">Activity</AXTab>
            </AXTabsList>
            <AXTabPanel value="tab1">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Rendered with size token preset: <strong>{selectedSize.toUpperCase()}</strong>
              </div>
            </AXTabPanel>
            <AXTabPanel value="tab2">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Analytics data panel.
              </div>
            </AXTabPanel>
            <AXTabPanel value="tab3">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Activity log panel.
              </div>
            </AXTabPanel>
          </AXTabs>
        </div>
      </div>

      {/* ====================================================================
          4. Compound Subcomponents Pattern
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Compound API
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Compound Subcomponents: Full Markup Control
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Build custom tab hierarchies using AXTabs, AXTabsList, AXTab, and AXTabPanel.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-xl ax-p-6 ax-bg-surface">
          <AXTabs defaultValue="overview" variant="card">
            <AXTabsList>
              <AXTab value="overview" startIcon={<CubeIcon size={16} />}>Overview</AXTab>
              <AXTab value="specs" startIcon={<DocumentIcon size={16} />} badge="3">Specs</AXTab>
              <AXTab value="settings" startIcon={<SettingsIcon size={16} />}>Config</AXTab>
            </AXTabsList>

            <AXTabPanel value="overview">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Overview panel content with seamless tab transitions.
              </div>
            </AXTabPanel>
            <AXTabPanel value="specs">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Detailed technical specifications and hardware parameters.
              </div>
            </AXTabPanel>
            <AXTabPanel value="settings">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Settings and configuration preferences.
              </div>
            </AXTabPanel>
          </AXTabs>
        </div>
      </div>
    </div>
  );
};

export default TabsSamples;

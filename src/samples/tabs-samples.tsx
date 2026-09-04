'use client';

import React, { useState } from 'react';
import {
  AXTabs,
  AXTabsList,
  AXTab,
  AXTabPanel,
  AXTabsVariant,
  AXTabsSize,
  AXTabsColor,
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
  const [controlledTab, setControlledTab] = useState('overview');

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

  const variants: { variant: AXTabsVariant; label: string; desc: string }[] = [
    { variant: 'line', label: '1. Line Variant (Underline Indicator)', desc: 'Clean border with sliding active underline indicator. Ideal for dashboards and settings.' },
    { variant: 'pill', label: '2. Pill / Segmented Control', desc: 'Capsule surface with hardware-accelerated floating card indicator. Apple / macOS style.' },
    { variant: 'card', label: '3. Card / Boxed Variant', desc: 'Individual tab enclosures with connected active card border. Ant Design style.' },
    { variant: 'soft', label: '4. Soft Tint Variant', desc: 'Subtle tinted pill highlight without heavy borders. Modern SaaS look.' },
  ];

  const sizes: AXTabsSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const colors: AXTabsColor[] = ['primary', 'accent', 'success', 'dark'];

  // Shorthand data items
  const shorthandItems: AXTabItem[] = [
    {
      key: 'metrics',
      label: 'Performance Metrics',
      icon: <SquaresIcon size={16} />,
      badge: '99.9%',
      badgeColor: 'success',
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          ⚡ Latency: <strong>14ms</strong> | Uptime: <strong>99.99%</strong> | Throughput: <strong>12.4k req/sec</strong>
        </div>
      ),
    },
    {
      key: 'security',
      label: 'Security & RBAC',
      icon: <DocumentIcon size={16} />,
      badge: 'Audit',
      badgeColor: 'accent',
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          🛡️ Zero Trust Architecture | OAuth2 & OIDC Configured | Session TTL: 24h
        </div>
      ),
    },
    {
      key: 'integrations',
      label: 'Cloud Integrations',
      icon: <ShareIcon size={16} />,
      content: (
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
          ☁️ AWS S3 Connected | GitHub Actions CI Active | Cloudflare CDN Operational
        </div>
      ),
    },
  ];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. All 4 Visual Variants */}
      {variants.map(({ variant, label, desc }) => (
        <div
          key={variant}
          className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4"
        >
          <div>
            <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2 ax-py-0.5 ax-bg-surface-secondary ax-rounded ax-text-xs ax-font-medium ax-text-primary ax-mb-1">
              Variant: {variant.toUpperCase()}
            </div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">{label}</h3>
            <p className="ax-text-xs ax-text-secondary ax-mt-1">{desc}</p>
          </div>

          <AXTabs defaultValue="tab1" variant={variant}>
            <AXTabsList>
              <AXTab value="tab1" startIcon={<CubeIcon size={16} />}>Overview</AXTab>
              <AXTab value="tab2" startIcon={<DocumentIcon size={16} />} badge="3">Specifications</AXTab>
              <AXTab value="tab3" startIcon={<SettingsIcon size={16} />}>Preferences</AXTab>
              <AXTab value="tab4" disabled>Disabled Tab</AXTab>
            </AXTabsList>

            <AXTabPanel value="tab1">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Displaying <strong>Overview</strong> panel contents with smooth entrance transition.
              </div>
            </AXTabPanel>
            <AXTabPanel value="tab2">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Displaying <strong>Specifications</strong> panel with active badge counter.
              </div>
            </AXTabPanel>
            <AXTabPanel value="tab3">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                Displaying <strong>Preferences</strong> configuration panel.
              </div>
            </AXTabPanel>
          </AXTabs>
        </div>
      ))}

      {/* 2. Size Hierarchy Progression */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            5. Size Presets Hierarchy (XS to XL)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Five standardized size presets adapting heights, padding, font scaling, and icon dimensions.
          </p>
        </div>

        <div className="ax-flex ax-flex-col ax-gap-4">
          {sizes.map((sz) => (
            <div key={sz} className="ax-flex ax-flex-col ax-gap-1">
              <span className="ax-text-xs ax-font-semibold ax-text-secondary">
                Size: <code className="ax-text-primary">{sz.toUpperCase()}</code>
              </span>
              <AXTabs defaultValue="active" size={sz} variant="pill">
                <AXTabsList>
                  <AXTab value="active" startIcon={<SparklesIcon size={sz === 'xs' ? 12 : sz === 'sm' ? 14 : 16} />}>
                    Active Size ({sz})
                  </AXTab>
                  <AXTab value="tab2">Secondary Tab</AXTab>
                  <AXTab value="tab3" badge="New">Badge</AXTab>
                </AXTabsList>
              </AXTabs>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Color Themes */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            6. Color Theme Presets
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Coordinated color highlights for sliding indicators, active text, and badges.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-4">
          {colors.map((c) => (
            <div key={c} className="ax-p-3 ax-border ax-border-default ax-rounded-lg">
              <span className="ax-text-xs ax-font-semibold ax-text-secondary ax-mb-2 ax-block">
                Color: <code className="ax-text-primary">{c.toUpperCase()}</code>
              </span>
              <AXTabs defaultValue="one" color={c} variant="line">
                <AXTabsList>
                  <AXTab value="one" badge="Live">Selected</AXTab>
                  <AXTab value="two">Inactive</AXTab>
                  <AXTab value="three">Settings</AXTab>
                </AXTabsList>
              </AXTabs>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Vertical Left-Rail Navigation */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            7. Vertical Left-Rail Navigation Layout
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Side navigation layout with vertical sliding indicator and synchronized content panels.
          </p>
        </div>

        <div className="ax-border ax-border-default ax-rounded-lg ax-p-4">
          <AXTabs defaultValue="general" orientation="vertical" variant="line">
            <AXTabsList style={{ width: '220px' }}>
              <AXTab value="general" startIcon={<SettingsIcon size={16} />}>General Settings</AXTab>
              <AXTab value="profile" startIcon={<SquaresIcon size={16} />}>User Profile</AXTab>
              <AXTab value="security" startIcon={<DocumentIcon size={16} />} badge="2FA">Security & Auth</AXTab>
              <AXTab value="notifications" startIcon={<BellIcon size={16} />} badge="4" badgeColor="danger">
                Notifications
              </AXTab>
            </AXTabsList>

            <AXTabPanel value="general">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0 ax-mb-2">General Workspace Settings</h4>
                <p className="ax-m-0">Configure your application workspace title, default timezone, and organization URL.</p>
              </div>
            </AXTabPanel>
            <AXTabPanel value="profile">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0 ax-mb-2">User Profile & Identity</h4>
                <p className="ax-m-0">Signed in as <strong>Alex Cross (Chief Architect)</strong> with full administrative privileges.</p>
              </div>
            </AXTabPanel>
            <AXTabPanel value="security">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0 ax-mb-2">Multi-Factor Authentication (2FA)</h4>
                <p className="ax-m-0">Hardware security keys (FIDO2 / WebAuthn) and TOTP authenticator app enabled.</p>
              </div>
            </AXTabPanel>
            <AXTabPanel value="notifications">
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-text-secondary">
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0 ax-mb-2">Notification Streams</h4>
                <p className="ax-m-0">4 unread priority alerts waiting for review in system queue.</p>
              </div>
            </AXTabPanel>
          </AXTabs>
        </div>
      </div>

      {/* 5. Full-Width Segmented Control */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            8. Full-Width Equalized Segmented Tabs
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Equal width distribution across the entire container (<code className="ax-text-primary">fullWidth=true</code>), ideal for mobile or segmented toggle cards.
          </p>
        </div>

        <AXTabs defaultValue="monthly" variant="pill" fullWidth color="accent">
          <AXTabsList>
            <AXTab value="monthly">Monthly Billing ($29/mo)</AXTab>
            <AXTab value="annual" badge="Save 20%" badgeColor="accent">Annual Billing ($279/yr)</AXTab>
            <AXTab value="enterprise">Custom Enterprise</AXTab>
          </AXTabsList>
        </AXTabs>
      </div>

      {/* 6. Dynamic Closable Tabs (IDE File Editor Style) */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div className="ax-flex ax-items-center ax-justify-between">
          <div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
              9. Dynamic Closable File Tabs (IDE Style)
            </h3>
            <p className="ax-text-xs ax-text-secondary ax-mt-1">
              Interactive dismissible tab buttons with add/close lifecycle handlers.
            </p>
          </div>
          <AXButton
            size="xs"
            color="primary"
            variant="soft"
            startIcon={<PlusIcon size={14} />}
            onClick={handleAddFile}
            label="New File"
          />
        </div>

        <AXTabs
          value={activeFile}
          onChange={setActiveFile}
          variant="card"
          onTabClose={handleCloseFile}
        >
          <AXTabsList>
            {dynamicTabs.map((file) => (
              <AXTab key={file} value={file} closable startIcon={<DocumentIcon size={14} />}>
                {file}
              </AXTab>
            ))}
          </AXTabsList>

          {dynamicTabs.map((file) => (
            <AXTabPanel key={file} value={file}>
              <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-font-mono">
                // Active file buffer: {file}
                <br />
                export default function {file.replace(/\.[^/.]+$/, '')}() &#123; return &lt;div&gt;Active Buffer Content&lt;/div&gt;; &#125;
              </div>
            </AXTabPanel>
          ))}
        </AXTabs>
      </div>

      {/* 7. Concise Data-Driven Shorthand API */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            10. Concise Data-Driven Shorthand API
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Declarative setup via <code className="ax-text-primary">items=&#123;[...]&#125;</code> for rapid development without manually managing compound JSX trees.
          </p>
        </div>

        <AXTabs items={shorthandItems} variant="soft" color="primary" />
      </div>
    </div>
  );
};

export default TabsSamples;

'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { TabsSamples } from '@/samples/tabs-samples';

const TabsPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import {
  AXTabs,
  AXTabsList,
  AXTab,
  AXTabPanel,
} from '@/components/ax-tabs/ax-tabs';
import { CubeIcon, SettingsIcon } from '@/assets/icons';

<AXTabs defaultValue="overview" variant="line" color="primary">
  <AXTabsList>
    <AXTab value="overview" startIcon={<CubeIcon size={16} />}>Overview</AXTab>
    <AXTab value="settings" startIcon={<SettingsIcon size={16} />} badge="3">Settings</AXTab>
  </AXTabsList>
  <AXTabPanel value="overview">Overview content here...</AXTabPanel>
  <AXTabPanel value="settings">Settings form here...</AXTabPanel>
</AXTabs>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AXPageHeader
        title="AXTabs Component Documentation & Interactive Showcase"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Accessible Tabs</span>
            <AXButton
              size="xs"
              variant="outlined"
              color="primary"
              onClick={copyCode}
              label={copied ? '✓ Copied!' : 'Copy Code Snippet'}
            />
          </div>
        }
      />

      <div className="ax-p-6 ax-flex ax-flex-col ax-gap-8 ax-max-w-7xl">
        {/* Hero Card */}
        <div className="ax-p-8 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-items-center ax-justify-center ax-gap-3 ax-text-center">
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-3 ax-py-1 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-medium ax-text-primary">
            <span>📑</span> Component: <code>&lt;AXTabs /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Enterprise Tabs & Segmented Navigation System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Engineered with hardware-accelerated gliding indicators, 4 visual variants (Line, Pill, Card, Soft), horizontal/vertical orientations, dual Compound & Shorthand APIs, and Section 508 / WAI-ARIA keyboard navigation.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Live Interactive Examples</h2>
          <TabsSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXTabs Props Reference</h3>
          <div className="ax-overflow-x-auto">
            <table className="ax-w-full ax-text-left ax-text-sm ax-border-collapse">
              <thead>
                <tr className="ax-border-b ax-border-default ax-text-xs ax-text-secondary ax-font-semibold">
                  <th className="ax-py-2 ax-px-3">Prop</th>
                  <th className="ax-py-2 ax-px-3">Type</th>
                  <th className="ax-py-2 ax-px-3">Default</th>
                  <th className="ax-py-2 ax-px-3">Description</th>
                </tr>
              </thead>
              <tbody className="ax-divide-y ax-divide-default">
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">variant</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'line' | 'pill' | 'card' | 'soft'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'line'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Visual style preset of the tabs list and indicator.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">size</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'md'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Height, padding, and font scaling presets.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">color</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'dark'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'primary'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Color theme applied to indicator, active labels, and badges.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">orientation</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'horizontal' | 'vertical'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'horizontal'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Horizontal strip or vertical left-rail layout.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">fullWidth</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">boolean</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">false</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Stretches tabs equally across the container.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">items</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">AXTabItem[]</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">undefined</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Data-driven configuration array (shorthand API).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ready-to-copy code block */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-3">
          <div className="ax-flex ax-items-center ax-justify-between">
            <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">Usage Code Snippet</h3>
            <AXButton size="xs" variant="outlined" color="primary" onClick={copyCode} label={copied ? '✓ Copied!' : 'Copy Code'} />
          </div>
          <pre className="ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-font-mono ax-overflow-x-auto ax-m-0">
            <code>{sampleCode}</code>
          </pre>
        </section>
      </div>
    </>
  );
};

export default TabsPage;

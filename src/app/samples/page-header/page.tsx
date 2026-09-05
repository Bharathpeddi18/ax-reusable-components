'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { PageHeaderSamples } from '@/samples/page-header-samples';

const PageHeaderPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import { AXPageHeader } from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';

// Pattern 1: Title on left + Actions on right
<AXPageHeader
  title="User & Team Management"
  actions={
    <div className="ax-flex ax-items-center ax-gap-2">
      <AXButton size="xs" variant="outlined" label="Export CSV" />
      <AXButton size="xs" color="primary" label="Add Member" />
    </div>
  }
/>

// Pattern 2: Custom left & right slots
<AXPageHeader
  left={
    <div className="ax-flex ax-items-center ax-gap-3">
      <h1 className="ax-page-header-title">Analytics Hub</h1>
      <span className="ax-badge">Live</span>
    </div>
  }
  right={
    <div className="ax-flex ax-items-center ax-gap-2">
      <input type="text" placeholder="Search..." />
      <AXButton size="xs" color="primary" label="Refresh" />
    </div>
  }
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const propsList = [
    {
      prop: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Title text or element rendered on the left side with consistent styling.',
    },
    {
      prop: 'left',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Custom node for the entire left section (alias / override for title).',
    },
    {
      prop: 'actions',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Action buttons, search inputs, or controls rendered on the right side.',
    },
    {
      prop: 'right',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Custom node for the entire right section (alias / override for actions).',
    },
    {
      prop: 'sticky',
      type: 'boolean',
      default: 'true',
      desc: 'Enables sticky top positioning with backdrop blur when scrolling.',
    },
    {
      prop: 'divider',
      type: 'boolean',
      default: 'true',
      desc: 'Renders the subtle border bottom divider.',
    },
  ];

  return (
    <>
      <AXPageHeader
        title="AXPageHeader Component Documentation & Samples"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Minimal 2-Section Header</span>
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
        {/* Banner Card */}
        <div className="ax-p-8 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-items-center ax-justify-center ax-gap-3 ax-text-center">
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-3 ax-py-1 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-medium ax-text-primary">
            <span>📋</span> Component: <code>&lt;AXPageHeader /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Minimal Page Header System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            A clean, minimal, reusable header providing consistent left (page title / content) and right (action buttons / inputs / controls) sections across all application pages.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <PageHeaderSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXPageHeader Props Reference</h3>
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
                {propsList.map(({ prop, type, default: def, desc }) => (
                  <tr key={prop}>
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-primary ax-font-bold ax-text-xs">
                      {prop}
                    </td>
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">
                      {type}
                    </td>
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-xs ax-text-muted">{def}</td>
                    <td className="ax-py-2.5 ax-px-3 ax-text-secondary ax-text-xs">{desc}</td>
                  </tr>
                ))}
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

export default PageHeaderPage;

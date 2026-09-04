'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { PageHeaderSamples } from '@/samples/page-header-samples';

const PageHeaderPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import { AXPageHeader } from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';

<AXPageHeader
  title="Analytics Dashboard"
  actions={
    <div className="ax-flex ax-items-center ax-gap-2">
      <span className="ax-text-xs ax-text-muted">v2.0.0</span>
      <AXButton size="xs" variant="outlined" color="primary" label="Export" />
    </div>
  }
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AXPageHeader
        title="AXPageHeader Component Documentation & Samples"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Standard Header</span>
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
            Page Title & Sticky Action Header
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Standard header bar providing unified page titles, breadcrumbs, status indicators, and contextual action buttons.
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
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">title</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">string</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'Page Header Left'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Primary header heading text.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">actions</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">React.ReactNode</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'Page Header Right'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Action elements or status indicators rendered on the right side.</td>
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

export default PageHeaderPage;

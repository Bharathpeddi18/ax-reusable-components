'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { CardSamples } from '@/samples/card-samples';

const CardPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import {
  AXCard,
  AXCardHeader,
  AXCardHeaderLeft,
  AXCardHeaderRight,
  AXCardBody,
  AXCardFooter,
  AXCardFooterLeft,
  AXCardFooterRight,
} from '@/components/ax-card';
import { AXButton } from '@/components/ax-button/ax-button';

// Pattern 1: Minimal Shorthand Props
<AXCard
  size="md"
  variant="elevated"
  headerLeft={<h3>Project Status</h3>}
  headerRight={<AXButton size="xs" label="Edit" />}
  body={<p>Main content passed from outside...</p>}
  footerLeft={<span>Updated 5m ago</span>}
  footerRight={<AXButton size="xs" color="primary" label="Save" />}
/>

// Pattern 2: Compound Subcomponents
<AXCard size="lg" variant="outlined">
  <AXCardHeader>
    <AXCardHeaderLeft>
      <h3 className="ax-font-bold">Team Workspace</h3>
    </AXCardHeaderLeft>
    <AXCardHeaderRight>
      <span className="ax-badge">Active</span>
    </AXCardHeaderRight>
  </AXCardHeader>

  <AXCardBody>
    <p>Custom body elements...</p>
  </AXCardBody>

  <AXCardFooter>
    <AXCardFooterLeft>
      <span>Region: us-east-1</span>
    </AXCardFooterLeft>
    <AXCardFooterRight>
      <AXButton size="xs" color="primary" label="Configure" />
    </AXCardFooterRight>
  </AXCardFooter>
</AXCard>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const propsList = [
    {
      prop: 'headerLeft',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Content rendered on the header left side (e.g. title, icon, subtitle).',
    },
    {
      prop: 'headerRight',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Content rendered on the header right side (e.g. action buttons, controls).',
    },
    {
      prop: 'header',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Complete custom header node (overrides headerLeft & headerRight).',
    },
    {
      prop: 'headerDivider',
      type: 'boolean',
      default: 'true',
      desc: 'Renders the subtle divider border below the header.',
    },
    {
      prop: 'body / children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Main content container passed from the outside.',
    },
    {
      prop: 'footerLeft',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Content rendered on the footer left side (e.g. metadata, timestamps, tags).',
    },
    {
      prop: 'footerRight',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Content rendered on the footer right side (e.g. CTA buttons, links).',
    },
    {
      prop: 'footer',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Complete custom footer node (overrides footerLeft & footerRight).',
    },
    {
      prop: 'footerDivider',
      type: 'boolean',
      default: 'true',
      desc: 'Renders the subtle divider border above the footer.',
    },
    {
      prop: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto'",
      default: "'md'",
      desc: 'Card size token preset automatically driving padding, gaps, and font size.',
    },
    {
      prop: 'variant',
      type: "'default' | 'elevated' | 'outlined' | 'subtle' | 'glass'",
      default: "'default'",
      desc: 'Visual surface aesthetic variant.',
    },
  ];

  return (
    <>
      <AXPageHeader
        title="AXCard Component Documentation & Samples"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Size-Driven Display Container</span>
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
            <span>🎴</span> Component: <code>&lt;AXCard /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Minimal Size-Driven Card Component
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            A clean, minimal, reusable UI display container. Features structured Header (Left & Right), Body, and Footer (Left & Right) sections with internal paddings, gaps, and typography automatically scaled via CSS size tokens.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <CardSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXCard Props Reference</h3>
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

export default CardPage;

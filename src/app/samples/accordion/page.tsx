'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { AccordionSamples } from '@/samples/accordion-samples';

const AccordionPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import {
  AXAccordion,
  AXAccordionItem,
  AXAccordionTrigger,
  AXAccordionContent,
} from '@/components/ax-accordion/ax-accordion';
import { SettingsIcon } from '@/assets/icons';

<AXAccordion type="single" collapsible variant="contained">
  <AXAccordionItem value="item-1">
    <AXAccordionTrigger
      startIcon={<SettingsIcon size={18} />}
      subtitle="Configure workspace and security options"
      badge="Active"
      badgeColor="success"
    >
      Security & Permissions
    </AXAccordionTrigger>
    <AXAccordionContent>
      Multi-factor authentication (2FA) and OAuth2 settings...
    </AXAccordionContent>
  </AXAccordionItem>
</AXAccordion>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AXPageHeader
        title="AXAccordion Component Documentation & Interactive Lab"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">CSS Grid Animated</span>
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
            <span>🪗</span> Component: <code>&lt;AXAccordion /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Hardware-Accelerated Accordion & Collapse System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Engineered with modern CSS Grid row fraction interpolation (0fr ➔ 1fr) for zero-JavaScript layout reflow, 4 visual variants (Contained, Flush, Bordered, Filled), single/multiple expansion modes, and WAI-ARIA 1.2 keyboard navigation.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Live Interactive Examples</h2>
          <AccordionSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXAccordion Props Reference</h3>
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
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">type</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'single' | 'multiple'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'single'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Single item expansion or multiple concurrent expansion.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">variant</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'contained' | 'flush' | 'bordered' | 'filled'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'contained'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Visual style variant for cards, dividers, or filled headers.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">collapsible</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">boolean</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">true</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">When type="single", allows collapsing the open item.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">size</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'sm' | 'md' | 'lg'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'md'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Padding and font scale presets.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">chevronPosition</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'right' | 'left' | 'none'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'right'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Alignment anchor for the rotating chevron indicator.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">items</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">AXAccordionItemData[]</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">undefined</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Declarative items configuration array (shorthand API).</td>
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

export default AccordionPage;

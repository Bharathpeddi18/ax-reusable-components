'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { PopoverSamples } from '@/samples/popover-samples';

const PopoverPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import {
  AXPopover,
  AXPopoverTrigger,
  AXPopoverContent,
  AXPopoverHeader,
  AXPopoverBody,
  AXPopoverFooter,
} from '@/components/ax-popover/ax-popover';
import { AXButton } from '@/components/ax-button/ax-button';

<AXPopover size="md" placement="bottom">
  <AXPopoverTrigger>
    <AXButton color="primary" label="Open Menu" />
  </AXPopoverTrigger>
  <AXPopoverContent>
    <AXPopoverHeader title="User Profile" />
    <AXPopoverBody>
      <p>Signed in as engineer@astrax.mil</p>
    </AXPopoverBody>
    <AXPopoverFooter>
      <AXButton size="xs" variant="text" label="Cancel" />
      <AXButton size="xs" color="primary" label="Save" />
    </AXPopoverFooter>
  </AXPopoverContent>
</AXPopover>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AXPageHeader
        title="AXPopover Component Documentation & Samples"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">React Portals</span>
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
            <span>💬</span> Component: <code>&lt;AXPopover /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Portal-Driven Popover & Floating Panel System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Engineered with React Portals for absolute zero-collision z-index hierarchy, smart boundary collision flipping, multi-theme aesthetics, and 5 size progressions.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <PopoverSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXPopover Props Reference</h3>
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
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">placement</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'top' | 'bottom' | 'left' | 'right' | 'auto'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'bottom'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Anchor direction relative to trigger element.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">size</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'md'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Width preset for the popover surface container.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">theme</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'surface' | 'dark' | 'primary' | 'glass'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'surface'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Visual surface styling and glassmorphism.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">trigger</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'click' | 'hover' | 'focus' | 'manual'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'click'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Event trigger for opening/closing.</td>
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

export default PopoverPage;

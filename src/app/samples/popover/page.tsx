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

  const propsList = [
    {
      prop: 'placement',
      type: "'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' | 'auto'",
      default: "'bottom'",
      desc: 'Anchor placement direction relative to the trigger element with smart viewport flipping.',
    },
    {
      prop: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full'",
      default: "'md'",
      desc: 'Width preset hierarchy for the floating surface container.',
    },
    {
      prop: 'theme',
      type: "'surface' | 'dark' | 'primary' | 'glass'",
      default: "'surface'",
      desc: 'Visual surface aesthetic styling, border illumination, and glassmorphism blur.',
    },
    {
      prop: 'trigger',
      type: "'click' | 'hover' | 'focus' | 'manual'",
      default: "'click'",
      desc: 'Interaction mode to open and dismiss the popover.',
    },
    {
      prop: 'showArrow',
      type: 'boolean',
      default: 'true',
      desc: 'Displays dynamic directional pointer arrow aligned with the trigger center.',
    },
    {
      prop: 'offset',
      type: 'number',
      default: '8',
      desc: 'Distance in pixels between trigger and popover panel.',
    },
    {
      prop: 'openDelay',
      type: 'number',
      default: '80',
      desc: 'Delay in milliseconds before opening when trigger is set to hover.',
    },
    {
      prop: 'closeDelay',
      type: 'number',
      default: '150',
      desc: 'Delay in milliseconds before closing when trigger is set to hover (zero-flicker bridge).',
    },
    {
      prop: 'closeOnOutsideClick',
      type: 'boolean',
      default: 'true',
      desc: 'Automatically closes popover when clicking anywhere outside.',
    },
    {
      prop: 'closeOnEsc',
      type: 'boolean',
      default: 'true',
      desc: 'Closes popover and returns keyboard focus to the trigger on Escape key.',
    },
    {
      prop: 'trapFocus',
      type: 'boolean',
      default: 'false',
      desc: 'Traps keyboard Tab cycle within the popover container for modal dialogs.',
    },
    {
      prop: 'autoFocus',
      type: 'boolean',
      default: 'false',
      desc: 'Automatically focuses the first interactive element when opened.',
    },
    {
      prop: 'open',
      type: 'boolean',
      default: 'undefined',
      desc: 'Controlled open state for external state orchestration.',
    },
    {
      prop: 'onOpenChange',
      type: '(open: boolean) => void',
      default: 'undefined',
      desc: 'Callback fired whenever the popover open state transitions.',
    },
    {
      prop: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Shorthand prop to render header with title automatically.',
    },
    {
      prop: 'content',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Shorthand prop to render popover body content directly.',
    },
    {
      prop: 'footer',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Shorthand prop to render popover footer actions directly.',
    },
    {
      prop: 'boundary',
      type: "'viewport' | 'clipping-parents' | HTMLElement | RefObject",
      default: "'clipping-parents'",
      desc: 'Container boundary for collision detection and auto-flip clipping calculations.',
    },
    {
      prop: 'collisionPadding',
      type: 'number',
      default: '10',
      desc: 'Minimum safety distance in pixels from the boundary edge to prevent clipping.',
    },
    {
      prop: 'modal / preventScroll',
      type: 'boolean',
      default: 'false',
      desc: 'Locks background body scrolling while the popover is active, preventing layout shift.',
    },
    {
      prop: 'portalContainer',
      type: 'HTMLElement | RefObject | null',
      default: 'document.body',
      desc: 'Target DOM node for portal rendering, supporting modals, shadow DOM, and iframes.',
    },
    {
      prop: 'asChild (AXPopoverTrigger)',
      type: 'boolean',
      default: 'false',
      desc: 'Enables polymorphic slot triggering directly on child elements without extra wrapper divs.',
    },
  ];

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
            Engineered with React Portals for absolute zero-collision z-index hierarchy, smart boundary collision flipping, multi-theme aesthetics, and 7 size progressions.
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

export default PopoverPage;

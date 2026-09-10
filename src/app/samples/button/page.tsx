'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { ButtonSamples } from '@/samples/button-samples';

const ButtonPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import { AXButton } from '@/components/ax-button/ax-button';

// 1. Contained Primary Button
<AXButton color="primary" label="Save Changes" onClick={handleSave} />

// 2. Soft Accent Button with Start Icon
<AXButton variant="soft" color="accent" startIcon={<PlusIcon />} label="Create Project" />

// 3. Zero-CLS Async Loading State
<AXButton loading={isLoading} loadingText="Saving..." color="primary" label="Save" />

// 4. Icon-Only Circle Button
<AXButton shape="circle" variant="outlined" color="danger" startIcon={<TrashIcon />} iconOnly />

// 5. Polymorphic Link
<AXButton href="/dashboard" variant="outlined" label="Go to Dashboard" />`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <AXPageHeader
        title="AXButton Component Documentation & Samples"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Zero Runtime CSS</span>
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
            <span>🔘</span> Component: <code>&lt;AXButton /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            Enterprise Button System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Engineered with scoped CSS custom properties for 75% less code, 5 variants, 9 design-token color palettes, 5 sizes, 4 shapes, and zero cumulative layout shift (CLS) during async states.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <ButtonSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">Props API Reference</h3>
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
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'contained' | 'outlined' | 'soft' | 'text' | 'link'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'contained'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Visual style variant.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">color</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'dark' | 'light'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'primary'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Design token theme color.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">size</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'md'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Button dimensions (28px to 56px min-height).</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">shape</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">'rounded' | 'square' | 'circle' | 'pill'</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">'rounded'</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Corner geometry.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">label</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">React.ReactNode</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">undefined</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Visible button content (also supports children).</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">loading</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">boolean</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">false</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Enables Zero-CLS spinner state.</td>
                </tr>
                <tr>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-primary">href</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs ax-text-secondary">string</td>
                  <td className="ax-py-2 ax-px-3 ax-font-mono ax-text-xs">undefined</td>
                  <td className="ax-py-2 ax-px-3 ax-text-secondary">Polymorphically renders as an accessible &lt;a&gt; anchor tag.</td>
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

export default ButtonPage;

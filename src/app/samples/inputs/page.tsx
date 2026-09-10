'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { InputSamples } from '@/samples/input-samples';

const InputsPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import {
  AXInput,
  AXTextarea,
  AXCheckbox,
  AXRadio,
  AXRadioGroup,
  AXSwitch,
  AXTagsInput,
  AXSelect,
  AXInputGroup,
} from '@/components/ax-inputs';

// 1. Text Input with Password Toggle & Clear Button
<AXInput
  type="password"
  label="Password"
  showPasswordToggle
  required
  helperText="Enter your secure passphrase"
/>

// 2. Textarea with Character Counter
<AXTextarea
  label="Project Description"
  maxLength={200}
  showCount
  rows={4}
/>

// 3. Interactive Chip Tags Input
<AXTagsInput
  label="Keywords"
  defaultValue={['React', 'TypeScript']}
  maxTags={5}
/>

// 4. Checkbox & Radio Cards
<AXCheckbox label="Subscribe to alerts" defaultChecked />
<AXRadioGroup defaultValue="pro" variant="card">
  <AXRadio value="starter" label="Starter Plan" />
  <AXRadio value="pro" label="Pro Plan" />
</AXRadioGroup>

// 5. Toggle Switch
<AXSwitch label="Enable 2FA" color="success" defaultChecked />`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const propsList = [
    {
      component: 'AXInput',
      prop: 'type',
      type: "'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel'",
      default: "'text'",
      desc: 'Native HTML input type with automated password toggle and search clear buttons.',
    },
    {
      component: 'AXInput',
      prop: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      desc: 'Size preset scaling height (28px - 50px), padding, and typography.',
    },
    {
      component: 'AXInput',
      prop: 'startIcon / endIcon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Leading or trailing icon rendered inside the input field.',
    },
    {
      component: 'AXInput',
      prop: 'prefixAddon / suffixAddon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'External addon connected to the input boundary (e.g. https:// or .com).',
    },
    {
      component: 'AXTextarea',
      prop: 'showCount',
      type: 'boolean',
      default: 'false',
      desc: 'Displays real-time character count with maxLength constraint.',
    },
    {
      component: 'AXCheckbox',
      prop: 'indeterminate',
      type: 'boolean',
      default: 'false',
      desc: 'Renders the horizontal minus bar indicator for partial table selection.',
    },
    {
      component: 'AXRadioGroup',
      prop: 'variant',
      type: "'default' | 'card'",
      default: "'default'",
      desc: 'Visual card style with rounded border and selected background highlight.',
    },
    {
      component: 'AXSwitch',
      prop: 'color',
      type: "'primary' | 'accent' | 'success' | 'danger' | 'dark'",
      default: "'primary'",
      desc: 'Color theme token for the active track background.',
    },
    {
      component: 'AXTagsInput',
      prop: 'maxTags',
      type: 'number',
      default: 'undefined',
      desc: 'Limits the maximum number of tags that can be created.',
    },
  ];

  return (
    <>
      <AXPageHeader
        title="AXInputs Suite Documentation & Interactive Showcase"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Enterprise Inputs Suite</span>
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
            <span>⌨️</span> Component Suite: <code>&lt;AXInputs /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            World-Class Enterprise Form Controls Suite
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            A complete suite of modular input controls: AXInput, AXTextarea, AXCheckbox, AXRadio, AXSwitch, AXTagsInput, AXSelect, and AXInputGroup with separate files, size-driven CSS tokens, and WCAG 2.1 AAA accessibility.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <InputSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXInputs Key Props Reference</h3>
          <div className="ax-overflow-x-auto">
            <table className="ax-w-full ax-text-left ax-text-sm ax-border-collapse">
              <thead>
                <tr className="ax-border-b ax-border-default ax-text-xs ax-text-secondary ax-font-semibold">
                  <th className="ax-py-2 ax-px-3">Component</th>
                  <th className="ax-py-2 ax-px-3">Prop</th>
                  <th className="ax-py-2 ax-px-3">Type</th>
                  <th className="ax-py-2 ax-px-3">Default</th>
                  <th className="ax-py-2 ax-px-3">Description</th>
                </tr>
              </thead>
              <tbody className="ax-divide-y ax-divide-default">
                {propsList.map(({ component, prop, type, default: def, desc }) => (
                  <tr key={`${component}-${prop}`}>
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-xs ax-font-bold ax-text-primary">
                      {component}
                    </td>
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-xs ax-text-primary">
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

export default InputsPage;

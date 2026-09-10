'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { DatePickerSamples } from '@/samples/date-picker-samples';

const DatePickerPage = () => {
  const [copied, setCopied] = useState(false);

  const sampleCode = `import { AXDatePicker } from '@/components/ax-date-picker';

// 1. Single Date Picker (Popover)
<AXDatePicker
  label="Select Appointment Date"
  size="md"
  clearable
  helperText="Click to open popover calendar with fast month/year jump"
/>

// 2. Dual-Range Date Picker with Quick Presets
<AXDatePicker
  mode="range"
  label="Analytics Reporting Range"
  presets
  dualCalendar
  helperText="Supports Today, Last 7 Days, Last 30 Days, This Month presets"
/>

// 3. Date + Time Picker Integration
<AXDatePicker
  showTime
  label="Scheduled Server Deployment"
  format="YYYY-MM-DD HH:mm"
  helperText="Select day + integrated hour/minute time picker"
/>

// 4. Embedded Inline Calendar Widget
<AXDatePicker
  variant="inline"
  onChange={(date) => console.log('Selected date:', date)}
/>`;

  const copyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const propsList = [
    {
      prop: 'mode',
      type: "'single' | 'range'",
      default: "'single'",
      desc: 'Selection mode: single day picker or dual-range date selector with connecting tracks.',
    },
    {
      prop: 'variant',
      type: "'popover' | 'inline'",
      default: "'popover'",
      desc: 'Presentation style: floating anchored popover with smart collision flip or embedded inline widget.',
    },
    {
      prop: 'presets',
      type: 'AXDatePreset[] | boolean',
      default: 'false',
      desc: 'Quick range shortcuts (Today, Yesterday, Last 7/30 Days, This Month) rendered on left sidebar.',
    },
    {
      prop: 'showTime',
      type: 'boolean',
      default: 'false',
      desc: 'Integrates hour and minute dropdown pickers into the calendar footer.',
    },
    {
      prop: 'dualCalendar',
      type: 'boolean',
      default: 'true',
      desc: 'Displays two consecutive calendar months side-by-side in range mode.',
    },
    {
      prop: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      desc: 'Size preset scaling height, day cell size, padding, and font sizes.',
    },
    {
      prop: 'minDate / maxDate',
      type: 'Date',
      default: 'undefined',
      desc: 'Earliest and latest selectable date boundaries.',
    },
    {
      prop: 'isDateDisabled',
      type: '(date: Date) => boolean',
      default: 'undefined',
      desc: 'Custom predicate to disable specific dates (e.g. weekends or company holidays).',
    },
  ];

  return (
    <>
      <AXPageHeader
        title="AXDatePicker & Calendar Documentation & Showcase"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">Futuristic Date Suite</span>
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
            <span>📅</span> Component: <code>&lt;AXDatePicker /&gt;</code>
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            10/10 Futuristic Enterprise Date Picker & Calendar Suite
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Engineered with single and dual-range modes, quick shortcut presets, integrated time picking, 12-month and 12-year fast jump matrix selectors, smart collision flip positioning, and zero-runtime CSS tokens.
          </p>
        </div>

        {/* Live Interactive Samples */}
        <section className="ax-flex ax-flex-col ax-gap-4">
          <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">Interactive Examples</h2>
          <DatePickerSamples />
        </section>

        {/* Props Reference Table */}
        <section className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">AXDatePicker Props Reference</h3>
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
                    <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-xs ax-font-bold ax-text-primary">
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

export default DatePickerPage;

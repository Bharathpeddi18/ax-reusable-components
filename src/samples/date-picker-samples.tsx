'use client';

import React, { useState } from 'react';
import {
  AXDatePicker,
  AXDatePickerSize,
  AXDateValue,
  AXDateRangeValue,
} from '@/components/ax-date-picker';
import { AXButton } from '@/components/ax-button/ax-button';
import { SparklesIcon, FilterIcon, BellIcon } from '@/assets/icons';

export const DatePickerSamples: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<AXDatePickerSize>('md');

  // Single date states
  const [singleDate, setSingleDate] = useState<AXDateValue>(new Date());
  const [dateTimeVal, setDateTimeVal] = useState<AXDateValue>(new Date());

  // Range date state
  const [rangeDates, setRangeDates] = useState<AXDateRangeValue>(() => {
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 7);
    return [start, end];
  });

  // Inline calendar state
  const [inlineDate, setInlineDate] = useState<AXDateValue>(new Date());

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* ====================================================================
          1. Size Scaling Playground
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Size Tokens
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Unified Token Spacing Playground (XS to XL)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Trigger heights, day cell sizes, paddings, and font sizes adjust dynamically across 5 preset tokens.
          </p>
        </div>

        {/* Size Selector Toolbar */}
        <div className="ax-flex ax-items-center ax-gap-2 ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-border ax-border-default">
          <span className="ax-text-xs ax-font-semibold ax-text-secondary">Scale DatePicker Preset:</span>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as AXDatePickerSize[]).map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => setSelectedSize(sz)}
              className={`ax-px-3 ax-py-1 ax-text-xs ax-font-semibold ax-rounded-md ax-transition-all ${
                selectedSize === sz
                  ? 'ax-bg-primary ax-text-white ax-shadow-sm'
                  : 'ax-bg-surface ax-text-primary ax-border ax-border-default hover:ax-border-primary'
              }`}
            >
              {sz.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dynamic Size Preview Grid */}
        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6 ax-p-6 ax-bg-surface-subtle ax-rounded-xl ax-border ax-border-dashed ax-border-default">
          <AXDatePicker
            size={selectedSize}
            label={`Single Date Picker (${selectedSize.toUpperCase()})`}
            value={singleDate}
            onChange={(val) => setSingleDate(val as AXDateValue)}
            helperText="Click to open popover calendar with fast month/year jump"
          />

          <AXDatePicker
            size={selectedSize}
            mode="range"
            label={`Dual-Range Date Picker (${selectedSize.toUpperCase()})`}
            value={rangeDates}
            onChange={(val) => setRangeDates(val as AXDateRangeValue)}
            presets
            helperText="Includes quick range presets and continuous connecting track"
          />
        </div>
      </div>

      {/* ====================================================================
          2. Dual-Calendar Range Picker with Presets
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-accent-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-accent ax-mb-1">
            Enterprise Range Mode
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Dual-Calendar Date Range Picker with Quick Presets
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Engineered for high-volume enterprise analytics dashboards, booking portals, and audit log query filters.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          <AXDatePicker
            mode="range"
            label="Analytics Reporting Range"
            value={rangeDates}
            onChange={(val) => setRangeDates(val as AXDateRangeValue)}
            presets
            dualCalendar
            helperText="Select start and end dates or click a quick preset on the left sidebar"
          />

          <div className="ax-p-4 ax-border ax-border-default ax-rounded-xl ax-bg-surface-subtle ax-flex ax-flex-col ax-gap-2 ax-justify-center">
            <span className="ax-text-xs ax-font-bold ax-text-primary">Active Selection State</span>
            <div className="ax-p-3 ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-xs ax-font-mono ax-text-secondary">
              Start Date: {rangeDates[0]?.toLocaleDateString() || 'None'}
              <br />
              End Date: {rangeDates[1]?.toLocaleDateString() || 'None'}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3. Date & Time Picker Integration
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Date + Time
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Integrated Date & Time Picker
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Combines calendar day selection with integrated hour and minute dropdown pickers.
          </p>
        </div>

        <div className="ax-max-w-md">
          <AXDatePicker
            showTime
            label="Production Scheduled Deployment Time"
            value={dateTimeVal}
            onChange={(val) => setDateTimeVal(val as AXDateValue)}
            helperText="Formats full timestamp (YYYY-MM-DD HH:mm)"
          />
        </div>
      </div>

      {/* ====================================================================
          4. Embedded Inline Calendar Widget
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Inline Surface
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Embedded Inline Calendar Surface (`variant="inline"`)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Persistent embedded calendar widget for event scheduling, task calendar sidebars, and booking widgets.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          <AXDatePicker
            variant="inline"
            value={inlineDate}
            onChange={(val) => setInlineDate(val as AXDateValue)}
          />

          <div className="ax-p-6 ax-border ax-border-default ax-rounded-xl ax-bg-surface-subtle ax-flex ax-flex-col ax-gap-4">
            <span className="ax-text-sm ax-font-bold ax-text-primary">Selected Calendar Day</span>
            <div className="ax-text-2xl ax-font-extrabold ax-text-primary">
              {inlineDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Click month/year header above to test fast 12-month and 12-year grid selector matrixes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerSamples;

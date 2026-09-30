'use client';

import { useState } from 'react';
import { AXInputSelect } from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';

// region Options Constants
const FISCAL_YEAR_OPTIONS = [
  { label: '2026', value: '2026' },
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
];

const ALL_OPTION = [
  { label: 'All', value: 'all' },
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];
// endregion

// region Main Component
export const DashboardFilters = () => {
  const [fiscalYear, setFiscalYear] = useState('2026');
  const [ctfStaff, setCtfStaff] = useState('all');
  const [priority, setPriority] = useState('all');
  const [category, setCategory] = useState('all');
  const [eeic, setEeic] = useState('all');
  const [ba, setBa] = useState('all');
  const [sag, setSag] = useState('all');
  const [pec, setPec] = useState('all');
  const [fundsNeedByDate, setFundsNeedByDate] = useState('all');

  const handleClearAll = () => {
    setFiscalYear('2026');
    setCtfStaff('all');
    setPriority('all');
    setCategory('all');
    setEeic('all');
    setBa('all');
    setSag('all');
    setPec('all');
    setFundsNeedByDate('all');
  };

  return (
    <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-2.5">
      {/* Fiscal Year */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">Fiscal Year</span>
        <div className="ax-w-24">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={FISCAL_YEAR_OPTIONS}
            propsValue={fiscalYear}
            propsOnChange={(v) => setFiscalYear(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* CTF/Staff */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">CTF/Staff</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={ctfStaff}
            propsOnChange={(v) => setCtfStaff(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* Priority */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">Priority</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={priority}
            propsOnChange={(v) => setPriority(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* Category */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">Category</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={category}
            propsOnChange={(v) => setCategory(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* EEIC */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">EEIC</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={eeic}
            propsOnChange={(v) => setEeic(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* BA */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">BA</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={ba}
            propsOnChange={(v) => setBa(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* SAG */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">SAG</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={sag}
            propsOnChange={(v) => setSag(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* PEC */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">PEC</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={pec}
            propsOnChange={(v) => setPec(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* Funds Need by Date */}
      <div className="ax-flex ax-items-center ax-gap-1.5">
        <span className="ax-text-xs ax-font-medium ax-text-gray-700 ax-whitespace-nowrap">Funds Need by Date</span>
        <div className="ax-w-20">
          <AXInputSelect
            propsInputSize="xs"
            propsInputRadius="lg"
            propsOptions={ALL_OPTION}
            propsValue={fundsNeedByDate}
            propsOnChange={(v) => setFundsNeedByDate(v)}
            propsClearable={false}
          />
        </div>
      </div>

      {/* Clear All */}
      <button
        type="button"
        onClick={handleClearAll}
        className="ax-text-xs ax-font-bold ax-text-primary ax-underline ax-cursor-pointer hover:ax-text-primary-hover ax-whitespace-nowrap ax-px-1"
      >
        Clear All
      </button>
    </div>
  );
};

export default DashboardFilters;
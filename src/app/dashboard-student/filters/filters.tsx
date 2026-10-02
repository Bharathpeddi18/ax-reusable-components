'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import { InputSelectOption } from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import { useEffect, useState } from 'react';
import { ACADEMIC_YEAR_OPTIONS, CLASS_OPTIONS, GENDER_OPTIONS, GRADE_OPTIONS, SECTION_OPTIONS_BY_CLASS } from './sample-data';

// region Main Component
export const Filters = () => {
  const [valueAcademicYear, setValueAcademicYear] = useState(ACADEMIC_YEAR_OPTIONS[0].value);
  const [valueClass, setValueClass] = useState(CLASS_OPTIONS[0].value);
  const [valueSection, setValueSection] = useState(SECTION_OPTIONS_BY_CLASS[valueClass][0].value);
  const [valueGender, setValueGender] = useState(GENDER_OPTIONS[0].value);
  const [valueGrade, setValueGrade] = useState(GRADE_OPTIONS[0].value);

  const [optionsSection, setOptionsSection] = useState<InputSelectOption[]>(SECTION_OPTIONS_BY_CLASS[valueClass]);

  useEffect(() => {
    setOptionsSection(SECTION_OPTIONS_BY_CLASS[valueClass]);
    setValueSection(SECTION_OPTIONS_BY_CLASS[valueClass][0].value);
  }, [valueClass]);

  function handleClearAll() {
    const defaultClass = CLASS_OPTIONS[0].value;

    setValueAcademicYear(ACADEMIC_YEAR_OPTIONS[0].value);
    setValueClass(defaultClass);
    setValueSection(SECTION_OPTIONS_BY_CLASS[defaultClass][0].value);
    setValueGender(GENDER_OPTIONS[0].value);
    setValueGrade(GRADE_OPTIONS[0].value);
  }

  return (
    <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-2.5">
      {/* Fiscal Year */}
      <div className="ax-flex ax-items-center ax-gap-1-5">
        <AXInputSelect
          propsLabel='Academic Year'
          propsClassName="ax-input-horizontal"
          propsInputClassName='ax-w-20'
          propsLabelClassName="ax-text-nowrap"
          propsInputSize="xs"
          propsInputRadius="3xl"
          propsOptions={ACADEMIC_YEAR_OPTIONS}
          propsValue={valueAcademicYear}
          propsOnChange={(v) => setValueAcademicYear(v)}
          propsClearable={false}
        />
        <AXInputSelect
          propsLabel='Class'
          propsClassName="ax-input-horizontal"
          propsLabelClassName="ax-text-nowrap"
          propsInputClassName='ax-w-20'
          propsInputSize="xs"
          propsInputRadius="3xl"
          propsOptions={CLASS_OPTIONS}
          propsValue={valueClass}
          propsOnChange={(v) => setValueClass(v)}
          propsClearable={false}
        />
        <AXInputSelect
          propsLabel='Section'
          propsClassName="ax-input-horizontal"
          propsLabelClassName="ax-text-nowrap"
          propsInputClassName='ax-w-20'
          propsInputSize="xs"
          propsInputRadius="3xl"
          propsOptions={optionsSection}
          propsValue={valueSection}
          propsOnChange={(v) => setValueSection(v)}
          propsClearable={false}
        />
        <AXInputSelect
          propsLabel="Gender"
          propsClassName="ax-input-horizontal"
          propsLabelClassName="ax-text-nowrap"
          propsInputClassName="ax-w-20"
          propsInputSize="xs"
          propsInputRadius="3xl"
          propsOptions={GENDER_OPTIONS}
          propsValue={valueGender}
          propsOnChange={(v) => setValueGender(v)}
          propsClearable={false}
        />

        <AXInputSelect
          propsLabel="Grade"
          propsClassName="ax-input-horizontal"
          propsLabelClassName="ax-text-nowrap"
          propsInputClassName="ax-w-20"
          propsInputSize="xs"
          propsInputRadius="3xl"
          propsOptions={GRADE_OPTIONS}
          propsValue={valueGrade}
          propsOnChange={(v) => setValueGrade(v)}
          propsClearable={false}
        />
        {/* Clear All */}
        <AXButton
          propsLabel="Clear All"
          propsSize="sm"
          className="ax-text-xs ax-font-semibold ax-text-primary ax-underline ax-whitespace-nowrap ax-cursor-pointer"
          onClick={handleClearAll}
        />
      </div>
    </div>
  );
};

export default Filters;
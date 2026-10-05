'use client';

import React from 'react';
import Select, { SingleValue } from 'react-select';

import './ax-input-select.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export type InputSelectRadius =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type InputSelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface InputSelectOption {
  label: string;
  value: string;
}
// endregion

// region Interfaces
export interface InputSelectProps {
  propsLabel: string;
  propsOptions: InputSelectOption[];
  propsValue?: string;
  propsSearchable?: boolean;
  propsClearable?: boolean;
  propsPlaceholder?: string;
  propsReadOnly?: boolean;
  propsMandatory?: boolean;
  propsInputRadius?: InputSelectRadius;
  propsInputSize?: InputSelectSize;
  propsClassName?: string;
  propsInputClassName?: string;
  propsLabelClassName?: string;
  propsOnChange?: (value: string) => void;
}
// endregion

// region Main Component
export const AXInputSelect = ({
  propsLabel,
  propsOptions,
  propsValue,
  propsSearchable = true,
  propsClearable = true,
  propsPlaceholder = 'Select',
  propsReadOnly = false,
  propsMandatory = false,
  propsInputRadius = 'md',
  propsInputSize = 'md',
  propsClassName = '',
  propsInputClassName = '',
  propsLabelClassName = '',
  propsOnChange,
}: InputSelectProps) => {
  // region Selected Value
  const selectedValue =
    propsOptions.find((option) => option.value === propsValue) ?? null;
  // endregion

  // region Change
  const handleChange = (value: SingleValue<InputSelectOption>) => {
    propsOnChange?.(value?.value ?? '');
  };
  // endregion

  // region Main Return
  return (
    <>
    <div className={`${propsClassName}`}>
    {propsLabel && (
        <AXInputLabel
          propsClassName={propsLabelClassName}
          propsLabel={propsLabel}
          propsMandatory={propsMandatory}
        />
      )}
    <div
      className={[
        'ax-select',
        `ax-select-radius-${propsInputRadius}`,
        `ax-select-size-${propsInputSize}`,
        propsInputClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Select<InputSelectOption, false>
        options={propsOptions}
        value={selectedValue}
        onChange={handleChange}
        isMulti={false}
        isSearchable={propsSearchable}
        isClearable={propsClearable}
        isDisabled={propsReadOnly}
        placeholder={propsPlaceholder}
        closeMenuOnSelect={true}
        menuPosition="fixed"
        menuPlacement="auto"
        className={propsInputClassName}
        classNamePrefix="ax-react-select"
      />
    </div>
    </div>
    </>
  );
};
// endregion

export default AXInputSelect;
'use client';

import React from 'react';
import Select, { SingleValue } from 'react-select';

import './ax-input-select.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export type AXInputSelectRadius =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type AXInputSelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AXInputSelectOption {
  label: string;
  value: string;
}
// endregion

// region Interfaces
export interface AXInputSelectProps {
  propsLabel?: string;
  propsOptions: AXInputSelectOption[];
  propsValue?: string;
  propsSearchable?: boolean;
  propsClearable?: boolean;
  propsPlaceholder?: string;
  propsDisabled?: boolean;
  propsMandatory?: boolean;
  propsInputRadius?: AXInputSelectRadius;
  propsInputSize?: AXInputSelectSize;
  propsClassName?: string;
  propsInputClassName?: string;
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
  propsDisabled = false,
  propsMandatory = false,
  propsInputRadius = 'md',
  propsInputSize = 'md',
  propsClassName = '',
  propsInputClassName = '',
  propsOnChange,
}: AXInputSelectProps) => {
  // region Selected Value
  const selectedValue =
    propsOptions.find((option) => option.value === propsValue) ?? null;
  // endregion

  // region Change
  const handleChange = (value: SingleValue<AXInputSelectOption>) => {
    propsOnChange?.(value?.value ?? '');
  };
  // endregion

  // region Main Return
  return (
    <div
      className={[
        'ax-select',
        `ax-select-radius-${propsInputRadius}`,
        `ax-select-size-${propsInputSize}`,
        propsClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsMandatory={propsMandatory}
          propsDisabled={propsDisabled}
        />
      )}

      <Select<AXInputSelectOption, false>
        options={propsOptions}
        value={selectedValue}
        onChange={handleChange}
        isMulti={false}
        isSearchable={propsSearchable}
        isClearable={propsClearable}
        isDisabled={propsDisabled}
        placeholder={propsPlaceholder}
        closeMenuOnSelect={true}
        menuPosition="fixed"
        menuPlacement="auto"
        className={propsInputClassName}
        classNamePrefix="ax-react-select"
      />
    </div>
  );
};
// endregion

export default AXInputSelect;
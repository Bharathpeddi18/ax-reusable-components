'use client';

import Select, {
  components,
  MultiValue,
  SingleValue,
} from 'react-select';

import './ax-input-select.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Types
export interface AXSelectOption {
  label: string;
  value: string;
}
// endregion


// region Interfaces
export interface AXSelectProps {
  propsLabel?: string;
  propsOptions: AXSelectOption[];

  propsValue?: string | string[];

  propsMultiSelect?: boolean;
  propsSearchable?: boolean;
  propsClearable?: boolean;

  propsShowCheckbox?: boolean;
  propsShowCount?: boolean;

  propsPlaceholder?: string;

  propsDisabled?: boolean;
  propsMandatory?: boolean;

  propsClassName?: string;

  propsOnChange?: (
    value: string | string[]
  ) => void;
}
// endregion


// region Main Component
export const AXSelect = ({
  propsLabel,
  propsOptions,

  propsValue,

  propsMultiSelect = false,
  propsSearchable = true,
  propsClearable = true,

  propsShowCheckbox = true,
  propsShowCount = true,

  propsPlaceholder = 'Select',

  propsDisabled = false,
  propsMandatory = false,

  propsClassName = '',

  propsOnChange,
}: AXSelectProps) => {

  // region Selected Value
  const selectedValue = propsMultiSelect
    ? propsOptions.filter((option) =>
        Array.isArray(propsValue)
          ? propsValue.includes(option.value)
          : false
      )
    : propsOptions.find(
        (option) => option.value === propsValue
      ) ?? null;
  // endregion


  // region Change
  const handleChange = (
    value:
      | MultiValue<AXSelectOption>
      | SingleValue<AXSelectOption>
  ) => {

    if (propsMultiSelect) {
      const values = (
        value as MultiValue<AXSelectOption>
      ).map((item) => item.value);

      propsOnChange?.(values);

      return;
    }

    const selected =
      value as SingleValue<AXSelectOption>;

    propsOnChange?.(
      selected?.value ?? ''
    );
  };
  // endregion


  // region Option
  const Option = (props: any) => (
    <components.Option {...props}>

      <div className="ax-select-option">

        {propsMultiSelect &&
          propsShowCheckbox && (
            <input
              type="checkbox"
              checked={props.isSelected}
              readOnly
            />
          )}

        {props.label}

      </div>

    </components.Option>
  );
  // endregion


  // region Value Container
  const ValueContainer = (props: any) => {

    const selected = props.getValue();

    if (
      propsMultiSelect &&
      propsShowCount &&
      selected.length
    ) {
      return (
        <components.ValueContainer {...props}>

          <span>
            {selected.length} selected
          </span>

          {props.children?.[1]}

        </components.ValueContainer>
      );
    }

    return (
      <components.ValueContainer {...props}>
        {props.children}
      </components.ValueContainer>
    );
  };
  // endregion


  // region Main Return
  return (
    <div
      className={[
        'ax-select',
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

      <Select
        options={propsOptions}

        value={selectedValue}

        onChange={handleChange}

        isMulti={propsMultiSelect}

        isSearchable={propsSearchable}

        isClearable={propsClearable}

        isDisabled={propsDisabled}

        placeholder={propsPlaceholder}

        closeMenuOnSelect={!propsMultiSelect}

        hideSelectedOptions={false}

        menuPosition="fixed"

        menuPlacement="auto"

        components={{
            Option,
            ValueContainer,
        }}

        classNamePrefix="ax-react-select"
      />

    </div>
  );
};
// endregion

export default AXSelect;
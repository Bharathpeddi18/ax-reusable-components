'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  useMemo,
} from 'react';

/* ==========================================================================
   AstraX (AX) Select Component - 10/10 Enterprise Combobox Engine
   ========================================================================== */

export type AXSelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXSelectVariant = 'outlined' | 'subtle';

export interface AXSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  description?: string;
}

export interface AXSelectGroup {
  label: string;
  options: AXSelectOption[];
}

export type AXSelectOptionsType = (AXSelectOption | AXSelectGroup)[];

export interface AXSelectProps {
  id?: string;
  name?: string;
  /** Select label */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Search input placeholder inside dropdown or trigger */
  searchPlaceholder?: string;
  /** Flat array of options or grouped options */
  options?: AXSelectOptionsType;
  /** Selected value (single: string, multi: string[]) */
  value?: string | string[];
  /** Default value (uncontrolled) */
  defaultValue?: string | string[];
  /** Callback fired when selection changes */
  onChange?: (value: string | string[], selectedOption?: AXSelectOption | AXSelectOption[]) => void;
  /** Enable multi-select with tag chips inside trigger */
  isMulti?: boolean;
  /** Enable live search / filtering */
  isSearchable?: boolean;
  /** Enable clear selection button */
  isClearable?: boolean;
  /** Enable creating new custom options on the fly */
  isCreatable?: boolean;
  /** Callback when a new option is created via isCreatable */
  onCreateOption?: (inputValue: string) => void;
  /** Loading state flag with spinner */
  isLoading?: boolean;
  /** Size preset scaling height, paddings, and font sizes. @default 'md' */
  size?: AXSelectSize;
  /** Visual surface variant. @default 'outlined' */
  variant?: AXSelectVariant;
  /** Full container width expansion. @default true */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field indicator */
  required?: boolean;
  /** Custom message when no options match the search filter */
  noOptionsMessage?: string;
  /** Custom formatter for option labels */
  formatOptionLabel?: (option: AXSelectOption) => React.ReactNode;
  /** Leading icon inside the select trigger */
  startIcon?: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
}

function isGroup(item: AXSelectOption | AXSelectGroup): item is AXSelectGroup {
  return 'options' in item && Array.isArray((item as AXSelectGroup).options);
}

/** ReDoS-safe search matcher */
function safeSearchMatch(text: string, query: string): boolean {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase().trim());
}

export const AXSelect = forwardRef<HTMLDivElement, AXSelectProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      errorMessage,
      error = false,
      placeholder = 'Select an option...',
      searchPlaceholder = 'Search options...',
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      isMulti = false,
      isSearchable = true,
      isClearable = true,
      isCreatable = false,
      onCreateOption,
      isLoading = false,
      size = 'md',
      variant = 'outlined',
      fullWidth = true,
      disabled = false,
      readOnly = false,
      required = false,
      noOptionsMessage = 'No options found',
      formatOptionLabel,
      startIcon,
      className = '',
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    // Track dynamic custom options created via isCreatable
    const [createdOptions, setCreatedOptions] = useState<AXSelectOption[]>([]);

    // Merge static options and dynamically created options
    const combinedOptions = useMemo(() => {
      if (createdOptions.length === 0) return options;
      return [...options, ...createdOptions];
    }, [options, createdOptions]);

    // Flatten options for easy index searching & lookups
    const flatOptions = useMemo(() => {
      const result: AXSelectOption[] = [];
      for (const item of combinedOptions) {
        if (isGroup(item)) {
          for (const opt of item.options) {
            result.push(opt);
          }
        } else {
          result.push(item);
        }
      }
      return result;
    }, [combinedOptions]);

    // Selection State
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return isMulti ? [] : '';
    });

    // Sync internal state with controlled prop if updated programmatically
    useEffect(() => {
      if (isControlled) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue, isControlled]);

    const currentValue = isControlled ? controlledValue : internalValue;

    // Selected options lookup
    const selectedValues = useMemo(() => {
      if (isMulti) {
        return Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
      }
      return typeof currentValue === 'string' && currentValue ? [currentValue] : [];
    }, [currentValue, isMulti]);

    const selectedOptions = useMemo(() => {
      return flatOptions.filter((opt) => selectedValues.includes(opt.value));
    }, [flatOptions, selectedValues]);

    // Dropdown open, search query, and viewport placement state
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [dropdownPlacement, setDropdownPlacement] = useState<'bottom' | 'top'>('bottom');

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    // Smart Viewport Collision Detection (Flips dropdown upward if near screen bottom)
    const updateDropdownPosition = useCallback(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownEstimatedHeight = 280;

      if (spaceBelow < dropdownEstimatedHeight && spaceAbove > spaceBelow) {
        setDropdownPlacement('top');
      } else {
        setDropdownPlacement('bottom');
      }
    }, []);

    // Filtered options based on search query
    const filteredGroupedOptions = useMemo(() => {
      const query = searchQuery.trim();
      if (!query) return combinedOptions;

      const result: AXSelectOptionsType = [];
      for (const item of combinedOptions) {
        if (isGroup(item)) {
          const matchingChildOptions = item.options.filter(
            (opt) =>
              safeSearchMatch(opt.label, query) ||
              safeSearchMatch(opt.value, query) ||
              (opt.description ? safeSearchMatch(opt.description, query) : false)
          );
          if (matchingChildOptions.length > 0) {
            result.push({
              label: item.label,
              options: matchingChildOptions,
            });
          }
        } else {
          if (
            safeSearchMatch(item.label, query) ||
            safeSearchMatch(item.value, query) ||
            (item.description ? safeSearchMatch(item.description, query) : false)
          ) {
            result.push(item);
          }
        }
      }
      return result;
    }, [combinedOptions, searchQuery]);

    const filteredFlatOptions = useMemo(() => {
      const result: AXSelectOption[] = [];
      for (const item of filteredGroupedOptions) {
        if (isGroup(item)) {
          result.push(...item.options);
        } else {
          result.push(item);
        }
      }
      return result;
    }, [filteredGroupedOptions]);

    // Check if search query matches an existing option exactly
    const exactMatchExists = useMemo(() => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      return flatOptions.some((opt) => opt.label.toLowerCase() === query || opt.value.toLowerCase() === query);
    }, [searchQuery, flatOptions]);

    // Update selection helper
    const updateSelection = useCallback(
      (newValue: string | string[]) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (isMulti && Array.isArray(newValue)) {
          const matchingOpts = flatOptions.filter((opt) => newValue.includes(opt.value));
          onChange?.(newValue, matchingOpts);
        } else if (typeof newValue === 'string') {
          const matchingOpt = flatOptions.find((opt) => opt.value === newValue);
          onChange?.(newValue, matchingOpt);
        }
      },
      [isControlled, isMulti, flatOptions, onChange]
    );

    // Handle Option Selection
    const handleSelectOption = useCallback(
      (opt: AXSelectOption) => {
        if (opt.disabled || disabled || readOnly) return;

        if (isMulti) {
          const isSelected = selectedValues.includes(opt.value);
          const newVals = isSelected
            ? selectedValues.filter((v) => v !== opt.value)
            : [...selectedValues, opt.value];
          updateSelection(newVals);
          setSearchQuery('');
          searchInputRef.current?.focus();
        } else {
          updateSelection(opt.value);
          setIsOpen(false);
          setSearchQuery('');
          triggerRef.current?.focus();
        }
      },
      [disabled, readOnly, isMulti, selectedValues, updateSelection]
    );

    // Create New Custom Option (isCreatable)
    const handleCreateOption = useCallback(() => {
      const trimmed = searchQuery.trim();
      if (!trimmed || disabled || readOnly) return;

      const newOpt: AXSelectOption = {
        value: trimmed.toLowerCase().replace(/\s+/g, '-'),
        label: trimmed,
        badge: 'New',
      };

      setCreatedOptions((prev) => [...prev, newOpt]);
      onCreateOption?.(trimmed);

      if (isMulti) {
        updateSelection([...selectedValues, newOpt.value]);
      } else {
        updateSelection(newOpt.value);
        setIsOpen(false);
      }
      setSearchQuery('');
    }, [searchQuery, disabled, readOnly, isMulti, selectedValues, updateSelection, onCreateOption]);

    // Remove Tag Chip in Multi-Select
    const handleRemoveChip = (valToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      const newVals = selectedValues.filter((v) => v !== valToRemove);
      updateSelection(newVals);
    };

    // Clear All Selection
    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      updateSelection(isMulti ? [] : '');
      setSearchQuery('');
    };

    // Toggle All (Select All / Deselect All in Multi-Select)
    const handleToggleAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      if (selectedValues.length === flatOptions.length) {
        updateSelection([]);
      } else {
        updateSelection(flatOptions.map((o) => o.value));
      }
    };

    // Outside Click Listener & Scroll Positioning
    useEffect(() => {
      if (!isOpen) return;
      updateDropdownPosition();

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };

      const handleScroll = () => {
        updateDropdownPosition();
      };

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }, [isOpen, updateDropdownPosition]);

    // Keyboard Navigation (Full ARIA Combobox Spec)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || readOnly) return;

      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          updateDropdownPosition();
          setIsOpen(true);
          setHighlightedIndex(0);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev + 1;
            return next < filteredFlatOptions.length ? next : 0;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const next = prev - 1;
            return next >= 0 ? next : filteredFlatOptions.length - 1;
          });
          break;
        }
        case 'Home': {
          e.preventDefault();
          setHighlightedIndex(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          setHighlightedIndex(filteredFlatOptions.length - 1);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredFlatOptions.length) {
            handleSelectOption(filteredFlatOptions[highlightedIndex]);
          } else if (isCreatable && searchQuery.trim() && !exactMatchExists) {
            handleCreateOption();
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery('');
          triggerRef.current?.focus();
          break;
        }
        case 'Backspace': {
          if (isMulti && searchQuery === '' && selectedValues.length > 0) {
            const lastVal = selectedValues[selectedValues.length - 1];
            updateSelection(selectedValues.filter((v) => v !== lastVal));
          }
          break;
        }
        case 'Tab': {
          setIsOpen(false);
          setSearchQuery('');
          break;
        }
      }
    };

    // Auto-focus search input when opened
    useEffect(() => {
      if (isOpen && isSearchable) {
        searchInputRef.current?.focus();
      }
    }, [isOpen, isSearchable]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
        const highlightedEl = listboxRef.current.querySelector(
          `[data-option-index="${highlightedIndex}"]`
        ) as HTMLElement | null;
        if (highlightedEl) {
          highlightedEl.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [highlightedIndex, isOpen]);

    let optionCounter = -1;

    return (
      <div
        ref={ref}
        className={`ax-select-wrapper ax-select-size-${size} ax-select-variant-${variant} ${
          fullWidth ? 'ax-select-full-width' : ''
        } ${disabled ? 'ax-select-disabled' : ''} ${
          readOnly ? 'ax-select-readonly' : ''
        } ${isInvalid ? 'ax-select-invalid' : ''} ${isOpen ? 'ax-select-open' : ''} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={selectId} className="ax-select-label">
            {label}
            {required && <span className="ax-select-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div ref={containerRef} className="ax-select-root" onKeyDown={handleKeyDown}>
          {/* Main Trigger Box */}
          <div
            ref={triggerRef}
            id={selectId}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={`${selectId}-listbox`}
            aria-invalid={isInvalid || undefined}
            tabIndex={disabled ? -1 : 0}
            onClick={() => {
              if (!disabled && !readOnly) {
                updateDropdownPosition();
                setIsOpen((prev) => !prev);
              }
            }}
            className="ax-select-trigger"
          >
            {startIcon && <span className="ax-select-start-icon">{startIcon}</span>}

            <div className="ax-select-value-container">
              {isMulti ? (
                selectedOptions.length > 0 ? (
                  <div className="ax-select-chips-container">
                    {selectedOptions.map((opt) => (
                      <span key={opt.value} className="ax-select-chip">
                        {opt.icon && <span className="ax-select-chip-icon">{opt.icon}</span>}
                        <span className="ax-select-chip-label">{opt.label}</span>
                        {!disabled && !readOnly && (
                          <button
                            type="button"
                            className="ax-select-chip-remove"
                            onClick={(e) => handleRemoveChip(opt.value, e)}
                            aria-label={`Remove ${opt.label}`}
                            tabIndex={-1}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="ax-select-placeholder">{placeholder}</span>
                )
              ) : selectedOptions.length > 0 ? (
                <div className="ax-select-single-value">
                  {selectedOptions[0].icon && (
                    <span className="ax-select-option-icon">{selectedOptions[0].icon}</span>
                  )}
                  <span className="ax-select-single-label">
                    {formatOptionLabel ? formatOptionLabel(selectedOptions[0]) : selectedOptions[0].label}
                  </span>
                  {selectedOptions[0].badge && (
                    <span className="ax-select-option-badge">{selectedOptions[0].badge}</span>
                  )}
                </div>
              ) : (
                <span className="ax-select-placeholder">{placeholder}</span>
              )}
            </div>

            {/* Actions Indicator */}
            <div className="ax-select-indicators">
              {isLoading && (
                <span className="ax-select-spinner" aria-label="Loading options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                </span>
              )}

              {isClearable && selectedValues.length > 0 && !disabled && !readOnly && (
                <button
                  type="button"
                  className="ax-select-clear-btn"
                  onClick={handleClearAll}
                  aria-label="Clear selection"
                  tabIndex={-1}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}

              <span className="ax-select-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Hidden native input for form submissions */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue}
            />
          )}

          {/* Dropdown Menu (Smart Collision Placement) */}
          {isOpen && (
            <div
              className={`ax-select-dropdown ${
                dropdownPlacement === 'top' ? 'ax-select-dropdown-top' : 'ax-select-dropdown-bottom'
              }`}
              role="presentation"
            >
              {/* Search Box */}
              {isSearchable && (
                <div className="ax-select-search-box">
                  <span className="ax-select-search-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHighlightedIndex(0);
                    }}
                    placeholder={searchPlaceholder}
                    className="ax-select-search-input"
                    aria-label="Search options"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="ax-select-search-clear"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Multi-Select Toolbar (Select All / Clear All) */}
              {isMulti && flatOptions.length > 0 && (
                <div className="ax-select-multi-toolbar">
                  <span className="ax-select-count-text">
                    {selectedValues.length} of {flatOptions.length} selected
                  </span>
                  <button
                    type="button"
                    className="ax-select-toggle-all-btn"
                    onClick={handleToggleAll}
                  >
                    {selectedValues.length === flatOptions.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              )}

              {/* Listbox */}
              <div
                ref={listboxRef}
                id={`${selectId}-listbox`}
                role="listbox"
                aria-multiselectable={isMulti}
                className="ax-select-listbox"
              >
                {/* Creatable Prompt if query does not match existing option */}
                {isCreatable && searchQuery.trim() && !exactMatchExists && (
                  <div
                    role="option"
                    aria-selected={false}
                    className="ax-select-option ax-select-create-option"
                    onClick={handleCreateOption}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>
                      Create "<strong>{searchQuery.trim()}</strong>"
                    </span>
                  </div>
                )}

                {filteredGroupedOptions.length === 0 && (!isCreatable || !searchQuery.trim()) ? (
                  <div className="ax-select-no-options">{noOptionsMessage}</div>
                ) : (
                  filteredGroupedOptions.map((item, groupIdx) => {
                    if (isGroup(item)) {
                      return (
                        <div key={`group-${groupIdx}`} className="ax-select-group" role="group">
                          <div className="ax-select-group-header">{item.label}</div>
                          <div className="ax-select-group-options">
                            {item.options.map((opt) => {
                              optionCounter++;
                              const currentIndex = optionCounter;
                              const isSelected = selectedValues.includes(opt.value);
                              const isHighlighted = highlightedIndex === currentIndex;

                              return (
                                <div
                                  key={opt.value}
                                  data-option-index={currentIndex}
                                  role="option"
                                  aria-selected={isSelected}
                                  aria-disabled={opt.disabled}
                                  onClick={() => handleSelectOption(opt)}
                                  onMouseEnter={() => setHighlightedIndex(currentIndex)}
                                  className={`ax-select-option ${
                                    isSelected ? 'ax-select-option-selected' : ''
                                  } ${isHighlighted ? 'ax-select-option-highlighted' : ''} ${
                                    opt.disabled ? 'ax-select-option-disabled' : ''
                                  }`.trim()}
                                >
                                  {isMulti && (
                                    <span className="ax-select-option-checkbox">
                                      {isSelected && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                      )}
                                    </span>
                                  )}

                                  {opt.icon && <span className="ax-select-option-icon">{opt.icon}</span>}

                                  <div className="ax-select-option-text">
                                    <span className="ax-select-option-label">
                                      {formatOptionLabel ? formatOptionLabel(opt) : opt.label}
                                    </span>
                                    {opt.description && (
                                      <span className="ax-select-option-description">{opt.description}</span>
                                    )}
                                  </div>

                                  {opt.badge && (
                                    <span className="ax-select-option-badge">{opt.badge}</span>
                                  )}

                                  {!isMulti && isSelected && (
                                    <span className="ax-select-check-icon">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else {
                      optionCounter++;
                      const currentIndex = optionCounter;
                      const isSelected = selectedValues.includes(item.value);
                      const isHighlighted = highlightedIndex === currentIndex;

                      return (
                        <div
                          key={item.value}
                          data-option-index={currentIndex}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={item.disabled}
                          onClick={() => handleSelectOption(item)}
                          onMouseEnter={() => setHighlightedIndex(currentIndex)}
                          className={`ax-select-option ${
                            isSelected ? 'ax-select-option-selected' : ''
                          } ${isHighlighted ? 'ax-select-option-highlighted' : ''} ${
                            item.disabled ? 'ax-select-option-disabled' : ''
                          }`.trim()}
                        >
                          {isMulti && (
                            <span className="ax-select-option-checkbox">
                              {isSelected && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </span>
                          )}

                          {item.icon && <span className="ax-select-option-icon">{item.icon}</span>}

                          <div className="ax-select-option-text">
                            <span className="ax-select-option-label">
                              {formatOptionLabel ? formatOptionLabel(item) : item.label}
                            </span>
                            {item.description && (
                              <span className="ax-select-option-description">{item.description}</span>
                            )}
                          </div>

                          {item.badge && (
                            <span className="ax-select-option-badge">{item.badge}</span>
                          )}

                          {!isMulti && isSelected && (
                            <span className="ax-select-check-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                          )}
                        </div>
                      );
                    }
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Message slot */}
        {errorMessage ? (
          <p className="ax-select-message ax-select-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-select-message ax-select-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXSelect.displayName = 'AXSelect';
export default AXSelect;

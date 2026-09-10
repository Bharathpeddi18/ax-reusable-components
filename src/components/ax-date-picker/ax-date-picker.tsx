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
   AstraX (AX) Date Picker & Calendar Component - 10/10 Futuristic Suite
   ========================================================================== */

export type AXDatePickerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXDatePickerMode = 'single' | 'range';
export type AXDatePickerVariant = 'popover' | 'inline';
export type AXCalendarView = 'days' | 'months' | 'years';

export interface AXDatePreset {
  label: string;
  getValue: () => [Date, Date] | Date;
}

export type AXDateValue = Date | null;
export type AXDateRangeValue = [Date | null, Date | null];

export interface AXDatePickerProps {
  id?: string;
  name?: string;
  /** Selection mode: 'single' day or 'range' dual-dates. @default 'single' */
  mode?: AXDatePickerMode;
  /** Presentation style: floating 'popover' or embedded 'inline'. @default 'popover' */
  variant?: AXDatePickerVariant;
  /** Controlled value (single: Date | null, range: [Date | null, Date | null]) */
  value?: AXDateValue | AXDateRangeValue;
  /** Default value (uncontrolled) */
  defaultValue?: AXDateValue | AXDateRangeValue;
  /** Callback fired when selected date/range changes */
  onChange?: (date: AXDateValue | AXDateRangeValue, formattedText: string) => void;
  /** Enable integrated Time picker (hours, minutes) */
  showTime?: boolean;
  /** Use 12-hour format with AM/PM selector. @default false */
  use12Hours?: boolean;
  /** Date display format string. @default 'YYYY-MM-DD' (or 'YYYY-MM-DD HH:mm') */
  format?: string;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  /** Custom function to disable specific dates */
  isDateDisabled?: (date: Date) => boolean;
  /** Quick range selection presets or boolean to show default presets */
  presets?: AXDatePreset[] | boolean;
  /** Show two calendar months side-by-side in range mode. @default true */
  dualCalendar?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Enable clear selection button. @default true */
  clearable?: boolean;
  /** Label text displayed above input */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Size preset scaling dimensions. @default 'md' */
  size?: AXDatePickerSize;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field flag */
  required?: boolean;
  /** Full container width expansion. @default true */
  fullWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/* ==========================================================================
   Zero-Dependency Pure Native Date Utilities
   ========================================================================== */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const WEEKDAY_NAMES_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(d1: Date | null, d2: Date | null): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isDateInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return t > s && t < e;
}

function formatDate(date: Date | null, formatStr: string, showTime: boolean = false): string {
  if (!date) return '';
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  let result = formatStr
    .replace('YYYY', String(yyyy))
    .replace('MM', mm)
    .replace('DD', dd);

  if (showTime) {
    result = `${result} ${hh}:${min}`;
  }
  return result;
}

const DEFAULT_RANGE_PRESETS: AXDatePreset[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = new Date();
      return [today, today];
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return [yesterday, yesterday];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return [start, end];
    },
  },
  {
    label: 'Last 30 Days',
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return [start, end];
    },
  },
  {
    label: 'This Month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return [start, end];
    },
  },
  {
    label: 'Last Month',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return [start, end];
    },
  },
];

/* ==========================================================================
   Single Month Grid Component
   ========================================================================== */

interface MonthGridProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (date: Date) => void;
  onHoverDay?: (date: Date | null) => void;
  selectedSingleDate: Date | null;
  selectedRange: [Date | null, Date | null];
  hoveredDate: Date | null;
  mode: AXDatePickerMode;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  onOpenMonthView: () => void;
  onOpenYearView: () => void;
}

const MonthGrid: React.FC<MonthGridProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onHoverDay,
  selectedSingleDate,
  selectedRange,
  hoveredDate,
  mode,
  minDate,
  maxDate,
  isDateDisabled,
  onOpenMonthView,
  onOpenYearView,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Days calculations
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const daysArray: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month overflow days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    daysArray.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month overflow days (up to 42 cells total for consistent 6 rows)
  const remainingCells = 42 - daysArray.length;
  for (let i = 1; i <= remainingCells; i++) {
    daysArray.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const today = new Date();
  const [rangeStart, rangeEnd] = selectedRange;
  const effectiveEnd = rangeEnd || (rangeStart && hoveredDate && hoveredDate > rangeStart ? hoveredDate : null);

  return (
    <div className="ax-calendar-month-container">
      {/* Calendar Header */}
      <div className="ax-calendar-header">
        <button
          type="button"
          onClick={onPrevMonth}
          className="ax-calendar-nav-btn"
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="ax-calendar-header-titles">
          <button
            type="button"
            onClick={onOpenMonthView}
            className="ax-calendar-header-btn"
          >
            {MONTH_NAMES[month]}
          </button>
          <button
            type="button"
            onClick={onOpenYearView}
            className="ax-calendar-header-btn"
          >
            {year}
          </button>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          className="ax-calendar-nav-btn"
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="ax-calendar-weekdays" role="row">
        {WEEKDAY_NAMES_SHORT.map((day) => (
          <span key={day} className="ax-calendar-weekday-label" role="columnheader">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="ax-calendar-days-grid" role="grid">
        {daysArray.map(({ date, isCurrentMonth }, idx) => {
          const isToday = isSameDay(date, today);
          const isSelectedSingle = mode === 'single' && isSameDay(date, selectedSingleDate);
          const isStart = Boolean(rangeStart && isSameDay(date, rangeStart));
          const isEnd = Boolean(effectiveEnd && isSameDay(date, effectiveEnd));
          const isInRange = isDateInRange(date, rangeStart, effectiveEnd);

          // Constraints
          let isDisabled = false;
          if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
            isDisabled = true;
          }
          if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
            isDisabled = true;
          }
          if (isDateDisabled && isDateDisabled(date)) {
            isDisabled = true;
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDay(date)}
              onMouseEnter={() => onHoverDay?.(date)}
              onMouseLeave={() => onHoverDay?.(null)}
              className={`ax-calendar-day-btn ${
                !isCurrentMonth ? 'ax-calendar-day-outside' : ''
              } ${isToday ? 'ax-calendar-day-today' : ''} ${
                isSelectedSingle ? 'ax-calendar-day-selected' : ''
              } ${isStart ? 'ax-calendar-day-range-start' : ''} ${
                isEnd ? 'ax-calendar-day-range-end' : ''
              } ${isInRange ? 'ax-calendar-day-in-range' : ''} ${
                isDisabled ? 'ax-calendar-day-disabled' : ''
              }`.trim()}
              tabIndex={isDisabled ? -1 : 0}
            >
              <span className="ax-calendar-day-text">{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   Main AXDatePicker Component
   ========================================================================== */

export const AXDatePicker = forwardRef<HTMLDivElement, AXDatePickerProps>(
  (
    {
      id,
      name,
      mode = 'single',
      variant = 'popover',
      value: controlledValue,
      defaultValue,
      onChange,
      showTime = false,
      use12Hours = false,
      format: customFormat,
      minDate,
      maxDate,
      isDateDisabled,
      presets,
      dualCalendar = true,
      placeholder,
      clearable = true,
      label,
      helperText,
      errorMessage,
      error = false,
      size = 'md',
      disabled = false,
      readOnly = false,
      required = false,
      fullWidth = true,
      className = '',
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    const defaultFormat = showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD';
    const activeFormat = customFormat || defaultFormat;

    // Selection state
    const isControlled = controlledValue !== undefined;
    const [internalSingle, setInternalSingle] = useState<Date | null>(() => {
      if (mode === 'single') {
        if (defaultValue instanceof Date) return defaultValue;
      }
      return null;
    });

    const [internalRange, setInternalRange] = useState<[Date | null, Date | null]>(() => {
      if (mode === 'range') {
        if (Array.isArray(defaultValue)) return defaultValue;
      }
      return [null, null];
    });

    // Time State
    const [selectedHours, setSelectedHours] = useState<number>(12);
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);

    // Sync controlled
    useEffect(() => {
      if (isControlled) {
        if (mode === 'single') {
          setInternalSingle((controlledValue as Date) || null);
          if (controlledValue instanceof Date) {
            setSelectedHours(controlledValue.getHours());
            setSelectedMinutes(controlledValue.getMinutes());
          }
        } else if (mode === 'range' && Array.isArray(controlledValue)) {
          setInternalRange(controlledValue);
        }
      }
    }, [controlledValue, isControlled, mode]);

    const singleDate = isControlled && mode === 'single' ? (controlledValue as Date | null) : internalSingle;
    const rangeDate = isControlled && mode === 'range' ? (controlledValue as [Date | null, Date | null]) : internalRange;

    // Navigation Months
    const [currentMonth, setCurrentMonth] = useState<Date>(() => {
      if (singleDate) return new Date(singleDate);
      if (rangeDate[0]) return new Date(rangeDate[0]);
      return new Date();
    });

    // Calendar Matrix View: 'days' | 'months' | 'years'
    const [calendarView, setCalendarView] = useState<AXCalendarView>('days');
    const [yearMatrixBase, setYearMatrixBase] = useState<number>(() => currentMonth.getFullYear());

    // Dropdown open & hover range states
    const [isOpen, setIsOpen] = useState(variant === 'inline');
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const [dropdownPlacement, setDropdownPlacement] = useState<'bottom' | 'top'>('bottom');

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Formatted display text
    const displayValueText = useMemo(() => {
      if (mode === 'single') {
        return singleDate ? formatDate(singleDate, activeFormat, showTime) : '';
      } else {
        const [start, end] = rangeDate;
        if (start && end) {
          return `${formatDate(start, activeFormat, showTime)}  →  ${formatDate(end, activeFormat, showTime)}`;
        }
        if (start) {
          return `${formatDate(start, activeFormat, showTime)}  →  Select end date`;
        }
        return '';
      }
    }, [mode, singleDate, rangeDate, activeFormat, showTime]);

    // Viewport position checker
    const updatePosition = useCallback(() => {
      if (!triggerRef.current || variant === 'inline') return;
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 360;

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPlacement('top');
      } else {
        setDropdownPlacement('bottom');
      }
    }, [variant]);

    // Outside Click Listener
    useEffect(() => {
      if (variant === 'inline' || !isOpen) return;
      updatePosition();

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setCalendarView('days');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen, variant, updatePosition]);

    // Handle Day Selection
    const handleSelectDay = (date: Date) => {
      if (disabled || readOnly) return;

      const dateWithTime = new Date(date);
      if (showTime) {
        dateWithTime.setHours(selectedHours, selectedMinutes, 0, 0);
      }

      if (mode === 'single') {
        if (!isControlled) {
          setInternalSingle(dateWithTime);
        }
        const formatted = formatDate(dateWithTime, activeFormat, showTime);
        onChange?.(dateWithTime, formatted);

        if (variant === 'popover') {
          setIsOpen(false);
        }
      } else {
        // Range Mode
        const [start, end] = rangeDate;
        if (!start || (start && end)) {
          // New Range selection starts
          const newRange: [Date, null] = [dateWithTime, null];
          if (!isControlled) {
            setInternalRange(newRange);
          }
          onChange?.(newRange, `${formatDate(dateWithTime, activeFormat, showTime)} → ...`);
        } else {
          // Range selection completes
          let finalStart = start;
          let finalEnd = dateWithTime;
          if (finalEnd < finalStart) {
            const temp = finalStart;
            finalStart = finalEnd;
            finalEnd = temp;
          }
          const finalRange: [Date, Date] = [finalStart, finalEnd];
          if (!isControlled) {
            setInternalRange(finalRange);
          }
          const formatted = `${formatDate(finalStart, activeFormat, showTime)} → ${formatDate(finalEnd, activeFormat, showTime)}`;
          onChange?.(finalRange, formatted);

          if (variant === 'popover') {
            setIsOpen(false);
          }
        }
      }
    };

    // Apply Preset
    const handleApplyPreset = (preset: AXDatePreset) => {
      const result = preset.getValue();
      if (Array.isArray(result)) {
        if (!isControlled) {
          setInternalRange(result);
        }
        setCurrentMonth(new Date(result[0]));
        onChange?.(result, `${formatDate(result[0], activeFormat, showTime)} → ${formatDate(result[1], activeFormat, showTime)}`);
      } else {
        if (!isControlled) {
          setInternalSingle(result);
        }
        setCurrentMonth(new Date(result));
        onChange?.(result, formatDate(result, activeFormat, showTime));
      }
      if (variant === 'popover') {
        setIsOpen(false);
      }
    };

    // Clear Selection
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      if (mode === 'single') {
        if (!isControlled) setInternalSingle(null);
        onChange?.(null, '');
      } else {
        if (!isControlled) setInternalRange([null, null]);
        onChange?.([null, null], '');
      }
    };

    // Year Matrix Fast Selector (12 years grid)
    const yearsArray = useMemo(() => {
      const start = yearMatrixBase - 6;
      const res: number[] = [];
      for (let i = 0; i < 12; i++) {
        res.push(start + i);
      }
      return res;
    }, [yearMatrixBase]);

    const activePresets = useMemo(() => {
      if (presets === true) return DEFAULT_RANGE_PRESETS;
      if (Array.isArray(presets)) return presets;
      return null;
    }, [presets]);

    return (
      <div
        ref={ref}
        className={`ax-date-picker-wrapper ax-date-picker-size-${size} ${
          fullWidth ? 'ax-date-picker-full-width' : ''
        } ${disabled ? 'ax-date-picker-disabled' : ''} ${
          readOnly ? 'ax-date-picker-readonly' : ''
        } ${isInvalid ? 'ax-date-picker-invalid' : ''} ${
          isOpen ? 'ax-date-picker-open' : ''
        } ax-date-picker-variant-${variant} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={inputId} className="ax-date-picker-label">
            {label}
            {required && <span className="ax-date-picker-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div ref={containerRef} className="ax-date-picker-root">
          {/* Popover Input Trigger */}
          {variant === 'popover' && (
            <div
              ref={triggerRef}
              id={inputId}
              role="button"
              tabIndex={disabled ? -1 : 0}
              onClick={() => {
                if (!disabled && !readOnly) {
                  updatePosition();
                  setIsOpen((prev) => !prev);
                  setCalendarView('days');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  updatePosition();
                  setIsOpen((prev) => !prev);
                }
              }}
              className="ax-date-picker-trigger"
            >
              <span className="ax-date-picker-start-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>

              <span className={`ax-date-picker-value-text ${!displayValueText ? 'ax-date-picker-placeholder' : ''}`}>
                {displayValueText || placeholder || (mode === 'range' ? 'Select date range...' : 'Select date...')}
              </span>

              <div className="ax-date-picker-actions">
                {clearable && displayValueText && !disabled && !readOnly && (
                  <button
                    type="button"
                    className="ax-date-picker-clear-btn"
                    onClick={handleClear}
                    aria-label="Clear date"
                    tabIndex={-1}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Calendar Surface (Floating Popover or Embedded Inline) */}
          {(isOpen || variant === 'inline') && (
            <div
              className={`ax-calendar-surface ${
                variant === 'popover'
                  ? dropdownPlacement === 'top'
                    ? 'ax-calendar-popover-top'
                    : 'ax-calendar-popover-bottom'
                  : 'ax-calendar-inline-surface'
              }`}
            >
              <div className="ax-calendar-main-layout">
                {/* Optional Presets Sidebar */}
                {activePresets && (
                  <div className="ax-calendar-presets-sidebar">
                    <span className="ax-calendar-presets-title">Quick Presets</span>
                    <div className="ax-calendar-presets-list">
                      {activePresets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="ax-calendar-preset-btn"
                          onClick={() => handleApplyPreset(preset)}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Calendar Body */}
                <div className="ax-calendar-content-wrapper">
                  {/* View: Days */}
                  {calendarView === 'days' && (
                    <div className="ax-calendar-grids-container">
                      <MonthGrid
                        currentMonth={currentMonth}
                        onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                        onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                        onSelectDay={handleSelectDay}
                        onHoverDay={setHoveredDate}
                        selectedSingleDate={singleDate}
                        selectedRange={rangeDate}
                        hoveredDate={hoveredDate}
                        mode={mode}
                        minDate={minDate}
                        maxDate={maxDate}
                        isDateDisabled={isDateDisabled}
                        onOpenMonthView={() => setCalendarView('months')}
                        onOpenYearView={() => {
                          setYearMatrixBase(currentMonth.getFullYear());
                          setCalendarView('years');
                        }}
                      />

                      {/* Dual Calendar for Range mode */}
                      {mode === 'range' && dualCalendar && (
                        <div className="ax-calendar-dual-separator">
                          <MonthGrid
                            currentMonth={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)}
                            onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                            onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                            onSelectDay={handleSelectDay}
                            onHoverDay={setHoveredDate}
                            selectedSingleDate={singleDate}
                            selectedRange={rangeDate}
                            hoveredDate={hoveredDate}
                            mode={mode}
                            minDate={minDate}
                            maxDate={maxDate}
                            isDateDisabled={isDateDisabled}
                            onOpenMonthView={() => setCalendarView('months')}
                            onOpenYearView={() => {
                              setYearMatrixBase(currentMonth.getFullYear());
                              setCalendarView('years');
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* View: 12-Month Matrix Selector */}
                  {calendarView === 'months' && (
                    <div className="ax-calendar-matrix-container">
                      <div className="ax-calendar-header">
                        <span className="ax-calendar-matrix-title">{currentMonth.getFullYear()}</span>
                        <button
                          type="button"
                          className="ax-calendar-matrix-close"
                          onClick={() => setCalendarView('days')}
                        >
                          Back to Days
                        </button>
                      </div>
                      <div className="ax-calendar-matrix-grid">
                        {MONTH_NAMES_SHORT.map((mName, mIdx) => (
                          <button
                            key={mName}
                            type="button"
                            onClick={() => {
                              setCurrentMonth(new Date(currentMonth.getFullYear(), mIdx, 1));
                              setCalendarView('days');
                            }}
                            className={`ax-calendar-matrix-btn ${
                              currentMonth.getMonth() === mIdx ? 'ax-calendar-matrix-btn-selected' : ''
                            }`}
                          >
                            {mName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View: 12-Year Matrix Selector */}
                  {calendarView === 'years' && (
                    <div className="ax-calendar-matrix-container">
                      <div className="ax-calendar-header">
                        <button
                          type="button"
                          onClick={() => setYearMatrixBase((prev) => prev - 12)}
                          className="ax-calendar-nav-btn"
                          aria-label="Previous 12 years"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>

                        <span className="ax-calendar-matrix-title">
                          {yearsArray[0]} – {yearsArray[yearsArray.length - 1]}
                        </span>

                        <button
                          type="button"
                          onClick={() => setYearMatrixBase((prev) => prev + 12)}
                          className="ax-calendar-nav-btn"
                          aria-label="Next 12 years"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>

                      <div className="ax-calendar-matrix-grid">
                        {yearsArray.map((yVal) => (
                          <button
                            key={yVal}
                            type="button"
                            onClick={() => {
                              setCurrentMonth(new Date(yVal, currentMonth.getMonth(), 1));
                              setCalendarView('months');
                            }}
                            className={`ax-calendar-matrix-btn ${
                              currentMonth.getFullYear() === yVal ? 'ax-calendar-matrix-btn-selected' : ''
                            }`}
                          >
                            {yVal}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Integrated Time Picker */}
                  {showTime && (
                    <div className="ax-calendar-time-picker-bar">
                      <span className="ax-calendar-time-label">Time:</span>
                      <div className="ax-calendar-time-inputs">
                        <select
                          value={selectedHours}
                          onChange={(e) => setSelectedHours(Number(e.target.value))}
                          className="ax-calendar-time-select"
                        >
                          {Array.from({ length: 24 }).map((_, h) => (
                            <option key={h} value={h}>
                              {String(h).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <span className="ax-calendar-time-separator">:</span>
                        <select
                          value={selectedMinutes}
                          onChange={(e) => setSelectedMinutes(Number(e.target.value))}
                          className="ax-calendar-time-select"
                        >
                          {Array.from({ length: 12 }).map((_, m) => {
                            const minVal = m * 5;
                            return (
                              <option key={minVal} value={minVal}>
                                {String(minVal).padStart(2, '0')}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        {errorMessage ? (
          <p className="ax-date-picker-message ax-date-picker-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-date-picker-message ax-date-picker-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXDatePicker.displayName = 'AXDatePicker';
export default AXDatePicker;

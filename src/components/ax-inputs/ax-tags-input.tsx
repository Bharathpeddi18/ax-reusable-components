'use client';

import React, { forwardRef, useState, useRef, useId, useEffect } from 'react';

/* ==========================================================================
   AstraX (AX) Tags Input Component - 10/10 Enterprise Chip Creation
   ========================================================================== */

export type AXTagsInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AXTagsInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled tags array */
  value?: string[];
  /** Default tags array (uncontrolled) */
  defaultValue?: string[];
  /** Callback fired when tags change */
  onChange?: (tags: string[]) => void;
  /** Input label */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Placeholder text for inner input */
  placeholder?: string;
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Disallows duplicate tags. @default true */
  allowDuplicates?: boolean;
  /** Custom tag validation function. Return false or error string to reject. */
  validateTag?: (tag: string) => boolean | string;
  /** Delimiter keys or characters for splitting pasted text. @default [',', '\n', '\t'] */
  delimiters?: string[];
  /** Size preset. @default 'md' */
  size?: AXTagsInputSize;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field indicator */
  required?: boolean;
}

/** Sanitize tag string to prevent XSS / injection */
function sanitizeTag(text: string): string {
  return text.replace(/[<>'"\x00-\x1F]/g, '').trim();
}

export const AXTagsInput = forwardRef<HTMLDivElement, AXTagsInputProps>(
  (
    {
      id,
      value: controlledValue,
      defaultValue = [],
      onChange,
      label,
      helperText,
      errorMessage,
      error = false,
      placeholder = 'Type tag and press Enter...',
      maxTags,
      allowDuplicates = false,
      validateTag,
      delimiters = [',', '\n', '\t'],
      size = 'md',
      disabled = false,
      readOnly = false,
      required = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    const isControlled = controlledValue !== undefined;
    const [internalTags, setInternalTags] = useState<string[]>(defaultValue);
    const tags = isControlled ? controlledValue : internalTags;

    // Sync controlled updates
    useEffect(() => {
      if (isControlled) {
        setInternalTags(controlledValue);
      }
    }, [controlledValue, isControlled]);

    const [inputValue, setInputValue] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [tagValidationError, setTagValidationError] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const editInputRef = useRef<HTMLInputElement | null>(null);

    const updateTags = (newTags: string[]) => {
      if (!isControlled) {
        setInternalTags(newTags);
      }
      onChange?.(newTags);
    };

    const addTag = (text: string) => {
      const clean = sanitizeTag(text);
      if (!clean) return;

      if (maxTags && tags.length >= maxTags) {
        setTagValidationError(`Maximum of ${maxTags} tags reached.`);
        return;
      }

      if (!allowDuplicates && tags.some((t) => t.toLowerCase() === clean.toLowerCase())) {
        setTagValidationError(`Tag "${clean}" is already added.`);
        return;
      }

      if (validateTag) {
        const validationResult = validateTag(clean);
        if (validationResult === false) {
          setTagValidationError(`Tag "${clean}" is invalid.`);
          return;
        } else if (typeof validationResult === 'string') {
          setTagValidationError(validationResult);
          return;
        }
      }

      setTagValidationError(null);
      updateTags([...tags, clean]);
      setInputValue('');
    };

    const removeTag = (indexToRemove: number) => {
      if (disabled || readOnly) return;
      setTagValidationError(null);
      updateTags(tags.filter((_, idx) => idx !== indexToRemove));
    };

    // Paste Delimiter Parser (e.g. paste "React, Vue, Svelte, Angular")
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = e.clipboardData.getData('text');
      const delimiterRegex = new RegExp(`[${delimiters.map((d) => `\\${d}`).join('')}]`);

      if (delimiterRegex.test(pasted)) {
        e.preventDefault();
        const splitTokens = pasted.split(delimiterRegex).map((t) => sanitizeTag(t)).filter(Boolean);
        const newTags = [...tags];

        for (const token of splitTokens) {
          if (maxTags && newTags.length >= maxTags) break;
          if (!allowDuplicates && newTags.some((t) => t.toLowerCase() === token.toLowerCase())) continue;
          if (validateTag && validateTag(token) !== true) continue;
          newTags.push(token);
        }

        updateTags(newTags);
        setInputValue('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        e.preventDefault();
        removeTag(tags.length - 1);
      }
    };

    // Double click to edit tag
    const handleTagDoubleClick = (idx: number) => {
      if (disabled || readOnly) return;
      setEditingIndex(idx);
      setEditValue(tags[idx]);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const clean = sanitizeTag(editValue);
        if (clean) {
          const updated = [...tags];
          updated[idx] = clean;
          updateTags(updated);
        }
        setEditingIndex(null);
      } else if (e.key === 'Escape') {
        setEditingIndex(null);
      }
    };

    useEffect(() => {
      if (editingIndex !== null) {
        editInputRef.current?.focus();
      }
    }, [editingIndex]);

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    return (
      <div
        ref={ref}
        className={`ax-tags-input-wrapper ax-tags-input-size-${size} ${
          disabled ? 'ax-tags-input-disabled' : ''
        } ${isInvalid || tagValidationError ? 'ax-tags-input-invalid' : ''} ${
          readOnly ? 'ax-tags-input-readonly' : ''
        } ${className}`.trim()}
        {...rest}
      >
        {label && (
          <label htmlFor={inputId} className="ax-tags-input-label">
            {label}
            {required && <span className="ax-tags-input-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="ax-tags-input-container" onClick={handleContainerClick}>
          {tags.map((tag, idx) => (
            editingIndex === idx ? (
              <input
                key={idx}
                ref={editInputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, idx)}
                onBlur={() => setEditingIndex(null)}
                className="ax-tag-chip-edit-input"
              />
            ) : (
              <span
                key={idx}
                className="ax-tag-chip"
                onDoubleClick={() => handleTagDoubleClick(idx)}
                title="Double click to edit tag"
              >
                <span className="ax-tag-chip-label">{tag}</span>
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    className="ax-tag-chip-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(idx);
                    }}
                    aria-label={`Remove tag ${tag}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </span>
            )
          ))}

          {(!maxTags || tags.length < maxTags) && !disabled && !readOnly && (
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setTagValidationError(null);
              }}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={tags.length === 0 ? placeholder : ''}
              className="ax-tags-input-field"
            />
          )}
        </div>

        {/* Message / Validation error */}
        {tagValidationError ? (
          <p className="ax-tags-input-message ax-tags-input-error-message" role="alert">
            {tagValidationError}
          </p>
        ) : errorMessage ? (
          <p className="ax-tags-input-message ax-tags-input-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-tags-input-message ax-tags-input-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXTagsInput.displayName = 'AXTagsInput';
export default AXTagsInput;

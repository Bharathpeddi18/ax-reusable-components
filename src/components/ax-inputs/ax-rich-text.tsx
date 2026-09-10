'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
} from 'react';

/* ==========================================================================
   AstraX (AX) Rich Text Component - 10/10 Secure WYSIWYG Content Engine
   ========================================================================== */

export type AXRichTextSize = 'sm' | 'md' | 'lg';

export interface AXRichTextProps {
  id?: string;
  name?: string;
  /** Rich text input label */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Initial or controlled HTML content */
  value?: string;
  /** Default HTML content (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when HTML content changes */
  onChange?: (html: string, text: string) => void;
  /** Placeholder text displayed when empty */
  placeholder?: string;
  /** Size preset scaling editor height, font size, and toolbar. @default 'md' */
  size?: AXRichTextSize;
  /** Minimum height of the editor area (e.g. '150px'). @default '180px' */
  minHeight?: string;
  /** Maximum character limit */
  maxLength?: number;
  /** Show live character and word counters. @default true */
  showCounters?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field flag */
  required?: boolean;
  /** Full width expansion. @default true */
  fullWidth?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/** Sanitize link URL against javascript: XSS attacks and reverse tabnabbing */
function sanitizeUrl(url: string): string | null {
  const trimmed = url.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) {
    return trimmed;
  }
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return null;
}

/** Sanitize HTML string to eliminate script injection & iframe exploits */
function sanitizeHtmlString(rawHtml: string): string {
  if (typeof document === 'undefined') return rawHtml;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawHtml;

  // Remove dangerous tags
  const dangerousTags = tempDiv.querySelectorAll('script, iframe, object, embed, form, input, button');
  dangerousTags.forEach((el) => el.remove());

  // Remove inline on* attributes (onclick, onerror, onload, etc.)
  const allElements = tempDiv.querySelectorAll('*');
  allElements.forEach((el) => {
    const attributes = Array.from(el.attributes);
    for (const attr of attributes) {
      if (attr.name.startsWith('on') || attr.value.toLowerCase().includes('javascript:')) {
        el.removeAttribute(attr.name);
      }
    }
    // Force rel="noopener noreferrer" on all links
    if (el.tagName.toLowerCase() === 'a') {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    }
  });

  return tempDiv.innerHTML;
}

export const AXRichText = forwardRef<HTMLDivElement, AXRichTextProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      errorMessage,
      error = false,
      value: controlledValue,
      defaultValue = '',
      onChange,
      placeholder = 'Type your rich content here...',
      size = 'md',
      minHeight = '180px',
      maxLength,
      showCounters = true,
      disabled = false,
      readOnly = false,
      required = false,
      fullWidth = true,
      className = '',
    },
    ref
  ) => {
    const generatedId = useId();
    const editorId = id ?? generatedId;
    const isInvalid = Boolean(error || errorMessage);

    const editorRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledValue !== undefined;
    const [internalHtml, setInternalHtml] = useState(defaultValue);
    const htmlContent = isControlled ? controlledValue : internalHtml;

    // Active formatting states
    const [activeFormats, setActiveFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
      unorderedList: false,
      orderedList: false,
      blockquote: false,
    });

    // Link modal / prompt state
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const savedSelectionRef = useRef<Range | null>(null);

    // Counters
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);

    // Sync initial HTML securely
    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
        editorRef.current.innerHTML = sanitizeHtmlString(htmlContent || '');
        updateStats();
      }
    }, [htmlContent]);

    // Update stats
    const updateStats = useCallback(() => {
      if (!editorRef.current) return;
      const text = editorRef.current.innerText || '';
      const cleanText = text.replace(/\r?\n|\r/g, ' ').trim();
      setCharCount(text.length);
      setWordCount(cleanText ? cleanText.split(/\s+/).length : 0);
    }, []);

    // Check active formatting queryCommandState
    const checkActiveFormats = useCallback(() => {
      if (typeof document === 'undefined') return;
      try {
        setActiveFormats({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strikeThrough: document.queryCommandState('strikeThrough'),
          unorderedList: document.queryCommandState('insertUnorderedList'),
          orderedList: document.queryCommandState('insertOrderedList'),
          blockquote: document.queryCommandValue('formatBlock') === 'blockquote',
        });
      } catch {
        // queryCommandState may fail if editor not focused
      }
    }, []);

    const handleInput = () => {
      if (!editorRef.current) return;
      const rawHtml = editorRef.current.innerHTML;
      const cleanHtml = sanitizeHtmlString(rawHtml);
      const cleanText = editorRef.current.innerText || '';

      if (!isControlled) {
        setInternalHtml(cleanHtml);
      }
      updateStats();
      checkActiveFormats();
      onChange?.(cleanHtml, cleanText);
    };

    // Execute Formatting Command
    const execCmd = (command: string, value: string | undefined = undefined) => {
      if (disabled || readOnly) return;
      editorRef.current?.focus();
      document.execCommand(command, false, value);
      handleInput();
    };

    // Link insertion with security validation & noopener/noreferrer
    const handleOpenLinkModal = () => {
      if (disabled || readOnly) return;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
      }
      setLinkUrl('');
      setLinkModalOpen(true);
    };

    const handleApplyLink = (e: React.FormEvent) => {
      e.preventDefault();
      setLinkModalOpen(false);

      const validUrl = sanitizeUrl(linkUrl);
      if (!validUrl) return;

      editorRef.current?.focus();
      if (savedSelectionRef.current) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(savedSelectionRef.current);
      }

      document.execCommand('createLink', false, validUrl);
      handleInput();
    };

    // Markdown Shortcut Handler (e.g. typing '# ' or '* ' or '1. ' or '> ')
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;

      // Keyboard formatting shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          execCmd('bold');
          return;
        }
        if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          execCmd('italic');
          return;
        }
        if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          execCmd('underline');
          return;
        }
        if (e.key === 'k' || e.key === 'K') {
          e.preventDefault();
          handleOpenLinkModal();
          return;
        }
      }

      // Space Trigger for Markdown Auto-Formatting
      if (e.key === ' ') {
        const selection = window.getSelection();
        if (selection && selection.focusNode) {
          const textNode = selection.focusNode;
          const text = textNode.textContent || '';
          const offset = selection.focusOffset;
          const prefix = text.substring(0, offset);

          if (prefix === '#') {
            e.preventDefault();
            textNode.textContent = text.substring(offset);
            execCmd('formatBlock', '<h1>');
          } else if (prefix === '##') {
            e.preventDefault();
            textNode.textContent = text.substring(offset);
            execCmd('formatBlock', '<h2>');
          } else if (prefix === '*' || prefix === '-') {
            e.preventDefault();
            textNode.textContent = text.substring(offset);
            execCmd('insertUnorderedList');
          } else if (prefix === '1.') {
            e.preventDefault();
            textNode.textContent = text.substring(offset);
            execCmd('insertOrderedList');
          } else if (prefix === '>') {
            e.preventDefault();
            textNode.textContent = text.substring(offset);
            execCmd('formatBlock', '<blockquote>');
          }
        }
      }
    };

    return (
      <div
        ref={ref}
        className={`ax-rich-text-wrapper ax-rich-text-size-${size} ${
          fullWidth ? 'ax-rich-text-full-width' : ''
        } ${disabled ? 'ax-rich-text-disabled' : ''} ${
          readOnly ? 'ax-rich-text-readonly' : ''
        } ${isInvalid ? 'ax-rich-text-invalid' : ''} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={editorId} className="ax-rich-text-label">
            {label}
            {required && <span className="ax-rich-text-required" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="ax-rich-text-container">
          {/* Toolbar */}
          {!readOnly && (
            <div className="ax-rich-text-toolbar" role="toolbar" aria-label="Editor Toolbar">
              {/* Text Style Group */}
              <div className="ax-rich-text-btn-group">
                <button
                  type="button"
                  onClick={() => execCmd('bold')}
                  className={`ax-rich-text-btn ${activeFormats.bold ? 'ax-rich-text-btn-active' : ''}`}
                  title="Bold (Ctrl+B)"
                  aria-label="Bold"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('italic')}
                  className={`ax-rich-text-btn ${activeFormats.italic ? 'ax-rich-text-btn-active' : ''}`}
                  title="Italic (Ctrl+I)"
                  aria-label="Italic"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="4" x2="10" y2="4" />
                    <line x1="14" y1="20" x2="5" y2="20" />
                    <line x1="15" y1="4" x2="9" y2="20" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('underline')}
                  className={`ax-rich-text-btn ${activeFormats.underline ? 'ax-rich-text-btn-active' : ''}`}
                  title="Underline (Ctrl+U)"
                  aria-label="Underline"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
                    <line x1="4" y1="21" x2="20" y2="21" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('strikeThrough')}
                  className={`ax-rich-text-btn ${activeFormats.strikeThrough ? 'ax-rich-text-btn-active' : ''}`}
                  title="Strikethrough"
                  aria-label="Strikethrough"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                    <path d="M14 12a4 4 0 0 1 0 8H6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                  </svg>
                </button>
              </div>

              <span className="ax-rich-text-divider" />

              {/* Headings & Blocks */}
              <div className="ax-rich-text-btn-group">
                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<h1>')}
                  className="ax-rich-text-btn"
                  title="Heading 1 (# + Space)"
                  aria-label="Heading 1"
                  disabled={disabled}
                >
                  <span className="ax-rich-text-btn-text">H1</span>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<h2>')}
                  className="ax-rich-text-btn"
                  title="Heading 2 (## + Space)"
                  aria-label="Heading 2"
                  disabled={disabled}
                >
                  <span className="ax-rich-text-btn-text">H2</span>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<p>')}
                  className="ax-rich-text-btn"
                  title="Normal Paragraph"
                  aria-label="Paragraph"
                  disabled={disabled}
                >
                  <span className="ax-rich-text-btn-text">P</span>
                </button>
              </div>

              <span className="ax-rich-text-divider" />

              {/* Lists & Quotes */}
              <div className="ax-rich-text-btn-group">
                <button
                  type="button"
                  onClick={() => execCmd('insertUnorderedList')}
                  className={`ax-rich-text-btn ${activeFormats.unorderedList ? 'ax-rich-text-btn-active' : ''}`}
                  title="Bullet List (* + Space)"
                  aria-label="Bullet List"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('insertOrderedList')}
                  className={`ax-rich-text-btn ${activeFormats.orderedList ? 'ax-rich-text-btn-active' : ''}`}
                  title="Numbered List (1. + Space)"
                  aria-label="Numbered List"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="10" y1="6" x2="21" y2="6" />
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <line x1="10" y1="18" x2="21" y2="18" />
                    <path d="M4 6h1v4M4 10h2" />
                    <path d="M4 14h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4v1h3" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('formatBlock', '<blockquote>')}
                  className={`ax-rich-text-btn ${activeFormats.blockquote ? 'ax-rich-text-btn-active' : ''}`}
                  title="Blockquote (> + Space)"
                  aria-label="Blockquote"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  </svg>
                </button>
              </div>

              <span className="ax-rich-text-divider" />

              {/* Link & Clear Format */}
              <div className="ax-rich-text-btn-group">
                <button
                  type="button"
                  onClick={handleOpenLinkModal}
                  className="ax-rich-text-btn"
                  title="Insert Link (Ctrl+K)"
                  aria-label="Insert Link"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('unlink')}
                  className="ax-rich-text-btn"
                  title="Remove Link"
                  aria-label="Remove Link"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18.84 12.25l1.72-1.71a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M5.16 11.75l-1.72 1.71a5 5 0 0 0 7.07 7.07l1.72-1.71" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('removeFormat')}
                  className="ax-rich-text-btn"
                  title="Clear Formatting"
                  aria-label="Clear Formatting"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7V4h16v3" />
                    <path d="M9 20h6" />
                    <path d="M12 4v16" />
                    <line x1="18" y1="15" x2="22" y2="19" />
                    <line x1="22" y1="15" x2="18" y2="19" />
                  </svg>
                </button>
              </div>

              <span className="ax-rich-text-divider" />

              {/* History */}
              <div className="ax-rich-text-btn-group">
                <button
                  type="button"
                  onClick={() => execCmd('undo')}
                  className="ax-rich-text-btn"
                  title="Undo (Ctrl+Z)"
                  aria-label="Undo"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 7v6h6" />
                    <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => execCmd('redo')}
                  className="ax-rich-text-btn"
                  title="Redo (Ctrl+Y)"
                  aria-label="Redo"
                  disabled={disabled}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 7v6h-6" />
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Secure Link Input Overlay */}
          {linkModalOpen && (
            <form onSubmit={handleApplyLink} className="ax-rich-text-link-modal">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL (e.g. https://example.com)..."
                autoFocus
                className="ax-rich-text-link-input"
              />
              <button type="submit" className="ax-rich-text-link-apply-btn">
                Apply
              </button>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="ax-rich-text-link-cancel-btn"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Editable Content Area */}
          <div
            ref={editorRef}
            id={editorId}
            contentEditable={!disabled && !readOnly}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onKeyUp={checkActiveFormats}
            onMouseUp={checkActiveFormats}
            data-placeholder={placeholder}
            style={{ minHeight }}
            className="ax-rich-text-content"
          />

          {/* Footer Status & Counters */}
          {showCounters && (
            <div className="ax-rich-text-footer">
              <div className="ax-rich-text-stats">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>
                  {charCount}
                  {maxLength ? ` / ${maxLength}` : ''} characters
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Hidden input for standard form POST submission */}
        {name && <input type="hidden" name={name} value={htmlContent} />}

        {/* Messages */}
        {errorMessage ? (
          <p className="ax-rich-text-message ax-rich-text-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-rich-text-message ax-rich-text-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXRichText.displayName = 'AXRichText';
export default AXRichText;

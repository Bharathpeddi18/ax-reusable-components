'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
} from 'react';

/* ==========================================================================
   AstraX (AX) File Upload Component - 10/10 Enterprise File Uploader
   ========================================================================== */

export type AXFileUploadSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AXFileUploadVariant = 'dropzone' | 'compact' | 'button';

export interface AXFileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  file?: File;
  previewUrl?: string;
  progress?: number;
  status?: 'idle' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export interface AXFileRejection {
  file: File;
  reason: 'size' | 'type' | 'max_count' | 'executable_blocked';
  message: string;
}

export interface AXFileUploadProps {
  id?: string;
  name?: string;
  /** Label displayed above upload area */
  label?: React.ReactNode;
  /** Helper text displayed below */
  helperText?: React.ReactNode;
  /** Error message displayed below (sets invalid state) */
  errorMessage?: React.ReactNode;
  /** Error state flag */
  error?: boolean;
  /** Allow multiple files selection */
  multiple?: boolean;
  /** Accepted MIME types or extensions (e.g. 'image/*,application/pdf,.zip') */
  accept?: string;
  /** Maximum file size in bytes (e.g. 5 * 1024 * 1024 for 5MB). @default 10MB */
  maxSize?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Security Guard: Automatically blocks dangerous executable formats (.exe, .bat, .cmd, .sh, .msi, .ps1). @default true */
  disallowExecutables?: boolean;
  /** Controlled list of uploaded files */
  value?: AXFileItem[];
  /** Default uncontrolled list of uploaded files */
  defaultValue?: AXFileItem[];
  /** Callback fired when files change */
  onChange?: (files: AXFileItem[]) => void;
  /** Callback fired when a file is rejected by client validation */
  onReject?: (rejections: AXFileRejection[]) => void;
  /** Custom drag & drop prompt text */
  dragDropText?: React.ReactNode;
  /** Subtitle / hint text inside dropzone (e.g. max size, allowed formats) */
  hintText?: React.ReactNode;
  /** Visual presentation mode. @default 'dropzone' */
  variant?: AXFileUploadVariant;
  /** Size preset scaling dimensions and paddings. @default 'md' */
  size?: AXFileUploadSize;
  /** Display uploaded files list. @default true */
  showFileList?: boolean;
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

/** Sanitize file name for safe UI rendering against XSS / injection */
function sanitizeFileName(name: string): string {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').trim();
}

/** Format byte size into human readable string */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const BLOCKED_EXECUTABLE_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.sh',
  '.vbs',
  '.msi',
  '.ps1',
  '.com',
  '.scr',
  '.pif',
  '.wsf',
];

export const AXFileUpload = forwardRef<HTMLDivElement, AXFileUploadProps>(
  (
    {
      id,
      name,
      label,
      helperText,
      errorMessage,
      error = false,
      multiple = true,
      accept,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles,
      disallowExecutables = true,
      value: controlledValue,
      defaultValue = [],
      onChange,
      onReject,
      dragDropText = 'Drag & drop files here, or click to browse',
      hintText,
      variant = 'dropzone',
      size = 'md',
      showFileList = true,
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

    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Lightbox modal preview for image inspection
    const [previewModalImg, setPreviewModalImg] = useState<{ url: string; name: string } | null>(null);

    // Files state
    const isControlled = controlledValue !== undefined;
    const [internalFiles, setInternalFiles] = useState<AXFileItem[]>(defaultValue);
    const files = isControlled ? controlledValue : internalFiles;

    const updateFiles = useCallback(
      (newFiles: AXFileItem[]) => {
        if (!isControlled) {
          setInternalFiles(newFiles);
        }
        onChange?.(newFiles);
      },
      [isControlled, onChange]
    );

    // Memory Leak Guard: Revoke object URLs on component unmount
    useEffect(() => {
      return () => {
        files.forEach((f) => {
          if (f.previewUrl && f.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(f.previewUrl);
          }
        });
      };
    }, [files]);

    // Validate and process selected files
    const processFiles = useCallback(
      (incomingFileList: FileList | File[]) => {
        const fileArray = Array.from(incomingFileList);
        const validNewItems: AXFileItem[] = [];
        const rejections: AXFileRejection[] = [];

        // Check max files limit
        const currentCount = multiple ? files.length : 0;
        const availableSlots = maxFiles ? maxFiles - currentCount : Infinity;

        if (availableSlots <= 0) {
          rejections.push({
            file: fileArray[0],
            reason: 'max_count',
            message: `Maximum limit of ${maxFiles} files reached.`,
          });
          onReject?.(rejections);
          return;
        }

        const filesToValidate = fileArray.slice(0, availableSlots);
        if (fileArray.length > availableSlots) {
          for (let i = availableSlots; i < fileArray.length; i++) {
            rejections.push({
              file: fileArray[i],
              reason: 'max_count',
              message: `Maximum limit of ${maxFiles} files exceeded.`,
            });
          }
        }

        // Accept extensions matcher
        const acceptedExtensions = accept
          ? accept.split(',').map((item) => item.trim().toLowerCase())
          : null;

        for (const file of filesToValidate) {
          const fileNameLower = file.name.toLowerCase();

          // 1. Security Check: Executable Blocker
          if (disallowExecutables) {
            const isBlocked = BLOCKED_EXECUTABLE_EXTENSIONS.some((ext) => fileNameLower.endsWith(ext));
            if (isBlocked) {
              rejections.push({
                file,
                reason: 'executable_blocked',
                message: `Executable files (${file.name}) are blocked for system security.`,
              });
              continue;
            }
          }

          // 2. Size Validation
          if (maxSize && file.size > maxSize) {
            rejections.push({
              file,
              reason: 'size',
              message: `File size (${formatFileSize(file.size)}) exceeds maximum allowed ${formatFileSize(maxSize)}.`,
            });
            continue;
          }

          // 3. MIME / Type Validation
          if (acceptedExtensions && acceptedExtensions.length > 0) {
            const fileType = file.type.toLowerCase();
            const isMatch = acceptedExtensions.some((acc) => {
              if (acc.startsWith('.')) {
                return fileNameLower.endsWith(acc);
              }
              if (acc.endsWith('/*')) {
                const prefix = acc.replace('/*', '');
                return fileType.startsWith(prefix);
              }
              return fileType === acc;
            });

            if (!isMatch) {
              rejections.push({
                file,
                reason: 'type',
                message: `File type "${file.type || 'unknown'}" is not allowed.`,
              });
              continue;
            }
          }

          // Valid File Item with safe thumbnail
          const previewUrl = file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined;

          validNewItems.push({
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name: sanitizeFileName(file.name),
            size: file.size,
            type: file.type,
            file,
            previewUrl,
            status: 'completed',
            progress: 100,
          });
        }

        if (rejections.length > 0) {
          onReject?.(rejections);
        }

        if (validNewItems.length > 0) {
          const combined = multiple ? [...files, ...validNewItems] : validNewItems;
          updateFiles(combined);
        }

        // Reset native file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      [files, multiple, maxFiles, maxSize, accept, disallowExecutables, updateFiles, onReject]
    );

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || readOnly) return;
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled || readOnly) return;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    };

    // Remove uploaded file item with URL revocation
    const handleRemoveFile = (idToRemove: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readOnly) return;
      const fileToRevoke = files.find((f) => f.id === idToRemove);
      if (fileToRevoke?.previewUrl && fileToRevoke.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(fileToRevoke.previewUrl);
      }
      const updated = files.filter((f) => f.id !== idToRemove);
      updateFiles(updated);
    };

    const handleBrowseClick = () => {
      if (!disabled && !readOnly) {
        fileInputRef.current?.click();
      }
    };

    return (
      <div
        ref={ref}
        className={`ax-file-upload-wrapper ax-file-upload-size-${size} ax-file-upload-variant-${variant} ${
          fullWidth ? 'ax-file-upload-full-width' : ''
        } ${disabled ? 'ax-file-upload-disabled' : ''} ${
          readOnly ? 'ax-file-upload-readonly' : ''
        } ${isInvalid ? 'ax-file-upload-invalid' : ''} ${className}`.trim()}
      >
        {label && (
          <label htmlFor={inputId} className="ax-file-upload-label">
            {label}
            {required && <span className="ax-file-upload-required" aria-hidden="true">*</span>}
          </label>
        )}

        {/* Hidden Native File Input */}
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          disabled={disabled || readOnly}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFiles(e.target.files);
            }
          }}
          className="ax-file-upload-hidden-input"
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Upload Zone / Button Trigger */}
        {variant === 'button' ? (
          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled || readOnly}
            className="ax-file-upload-btn-trigger"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>Upload File{multiple ? 's' : ''}</span>
          </button>
        ) : (
          <div
            className={`ax-file-upload-dropzone ${
              isDragOver ? 'ax-file-upload-dropzone-active' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
            role="button"
            tabIndex={disabled || readOnly ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBrowseClick();
              }
            }}
          >
            <div className="ax-file-upload-icon-container">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M12 12v9" />
                <path d="m16 16-4-4-4 4" />
              </svg>
            </div>

            <div className="ax-file-upload-content">
              <span className="ax-file-upload-title">{dragDropText}</span>
              {hintText ? (
                <span className="ax-file-upload-hint">{hintText}</span>
              ) : (
                <span className="ax-file-upload-hint">
                  {accept ? `Allowed: ${accept}` : 'All formats'} • Max {formatFileSize(maxSize)}
                  {disallowExecutables && ' • Executables blocked'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Uploaded Files List */}
        {showFileList && files.length > 0 && (
          <div className="ax-file-upload-list" role="list">
            {files.map((item) => (
              <div key={item.id} className="ax-file-item" role="listitem">
                {/* Preview Thumbnail or Document Icon */}
                <div
                  className={`ax-file-item-thumbnail ${item.previewUrl ? 'ax-file-item-thumbnail-clickable' : ''}`}
                  onClick={() => {
                    if (item.previewUrl) {
                      setPreviewModalImg({ url: item.previewUrl, name: item.name });
                    }
                  }}
                  title={item.previewUrl ? 'Click to inspect preview' : undefined}
                >
                  {item.previewUrl ? (
                    <img src={item.previewUrl} alt={item.name} className="ax-file-preview-img" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  )}
                </div>

                {/* File Details */}
                <div className="ax-file-item-info">
                  <div className="ax-file-item-header">
                    <span className="ax-file-item-name" title={item.name}>
                      {item.name}
                    </span>
                    <span className="ax-file-item-size">{formatFileSize(item.size)}</span>
                  </div>

                  {/* Progress bar if uploading */}
                  {item.status === 'uploading' && item.progress !== undefined && (
                    <div className="ax-file-item-progress-bar">
                      <div
                        className="ax-file-item-progress-fill"
                        style={{ width: `${Math.min(100, Math.max(0, item.progress))}%` }}
                      />
                    </div>
                  )}

                  {item.errorMessage && (
                    <span className="ax-file-item-error">{item.errorMessage}</span>
                  )}
                </div>

                {/* Remove Action */}
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    className="ax-file-item-remove-btn"
                    onClick={(e) => handleRemoveFile(item.id, e)}
                    aria-label={`Remove file ${item.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Preview Lightbox Modal */}
        {previewModalImg && (
          <div
            className="ax-file-lightbox-backdrop"
            onClick={() => setPreviewModalImg(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="ax-file-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="ax-file-lightbox-header">
                <span className="ax-file-lightbox-title">{previewModalImg.name}</span>
                <button
                  type="button"
                  className="ax-file-lightbox-close"
                  onClick={() => setPreviewModalImg(null)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <img src={previewModalImg.url} alt={previewModalImg.name} className="ax-file-lightbox-img" />
            </div>
          </div>
        )}

        {/* Message slot */}
        {errorMessage ? (
          <p className="ax-file-upload-message ax-file-upload-error-message" role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="ax-file-upload-message ax-file-upload-helper-message">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AXFileUpload.displayName = 'AXFileUpload';
export default AXFileUpload;

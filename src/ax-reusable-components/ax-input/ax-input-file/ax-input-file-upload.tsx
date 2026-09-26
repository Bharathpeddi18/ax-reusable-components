'use client';

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from 'react';

import './ax-input-file-upload.css';

import AXInputLabel from '../ax-input-label/ax-input-label';

// region Interfaces
export interface AXInputFileUploadProps {
  propsLabel?: string;

  propsAccept?: string[];

  propsMaxFiles?: number;

  propsMaxFileSizeMB?: number;

  propsMandatory?: boolean;

  propsDisabled?: boolean;

  propsClassName?: string;

  propsOnChange?: (
    files: File[]
  ) => void;
}
// endregion


// region Main Component
export const AXInputFileUpload = ({
  propsLabel = 'Attachments',

  propsAccept = [
    '.png',
    '.jpg',
    '.jpeg',
    '.xlsx',
    '.txt',
    '.docx',
    '.pdf',
  ],

  propsMaxFiles = 10,

  propsMaxFileSizeMB = 25,

  propsMandatory = false,

  propsDisabled = false,

  propsClassName = '',

  propsOnChange,
}: AXInputFileUploadProps) => {

  // region Refs
  const inputRef =
    useRef<HTMLInputElement | null>(null);

  const replaceIndexRef =
    useRef<number | null>(null);
  // endregion


  // region States
  const [files, setFiles] =
    useState<File[]>([]);

  const [error, setError] =
    useState('');

  const [isDragging, setIsDragging] =
    useState(false);
  // endregion


  // region Validate File
  const validateFile = (
    file: File
  ) => {

    const extension =
      `.${file.name
        .split('.')
        .pop()
        ?.toLowerCase()}`;

    const allowedTypes =
      propsAccept.map(
        (item) =>
          item.toLowerCase()
      );

    if (
      !allowedTypes.includes(
        extension
      )
    ) {
      return `${file.name} is not an allowed file type.`;
    }


    const maxSize =
      propsMaxFileSizeMB *
      1024 *
      1024;

    if (
      file.size > maxSize
    ) {
      return `${file.name} exceeds ${propsMaxFileSizeMB}MB.`;
    }


    return '';
  };
  // endregion


  // region Update Files
  const updateFiles = (
    updatedFiles: File[]
  ) => {

    setFiles(updatedFiles);

    propsOnChange?.(
      updatedFiles
    );
  };
  // endregion


  // region Add Files
  const addFiles = (
    newFiles: File[]
  ) => {

    if (
      files.length +
        newFiles.length >
      propsMaxFiles
    ) {
      setError(
        `Maximum ${propsMaxFiles} files allowed.`
      );

      return;
    }


    for (
      const file of newFiles
    ) {

      const validationError =
        validateFile(file);

      if (validationError) {
        setError(
          validationError
        );

        return;
      }
    }


    const updatedFiles = [
      ...files,
      ...newFiles,
    ];

    setError('');

    updateFiles(
      updatedFiles
    );
  };
  // endregion


  // region Replace File
  const replaceFile = (
    file: File,
    index: number
  ) => {

    const validationError =
      validateFile(file);

    if (validationError) {
      setError(
        validationError
      );

      return;
    }


    const updatedFiles = [
      ...files,
    ];

    updatedFiles[index] =
      file;

    setError('');

    updateFiles(
      updatedFiles
    );
  };
  // endregion


  // region Input Change
  const handleFileChange = (
    event:
      ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFiles =
      Array.from(
        event.target.files ?? []
      );


    if (
      replaceIndexRef.current !==
        null &&
      selectedFiles.length > 0
    ) {

      replaceFile(
        selectedFiles[0],
        replaceIndexRef.current
      );

      replaceIndexRef.current =
        null;

      event.target.value = '';

      return;
    }


    addFiles(
      selectedFiles
    );

    event.target.value = '';
  };
  // endregion


  // region Remove File
  const handleRemove = (
    index: number
  ) => {

    const updatedFiles =
      files.filter(
        (_, fileIndex) =>
          fileIndex !== index
      );

    setError('');

    updateFiles(
      updatedFiles
    );
  };
  // endregion


  // region Replace Trigger
  const handleReplace = (
    index: number
  ) => {

    if (propsDisabled) {
      return;
    }

    replaceIndexRef.current =
      index;

    inputRef.current?.click();
  };
  // endregion


  // region Drop
  const handleDrop = (
    event:
      DragEvent<HTMLDivElement>
  ) => {

    event.preventDefault();

    setIsDragging(false);


    if (propsDisabled) {
      return;
    }


    const droppedFiles =
      Array.from(
        event.dataTransfer.files
      );

    addFiles(
      droppedFiles
    );
  };
  // endregion


  // region Classes
  const rootClassName = [
    'ax-input-file-upload',

    propsDisabled
      ? 'ax-input-file-upload-disabled'
      : '',

    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');


  const dropZoneClassName = [
    'ax-file-drop-zone',

    isDragging
      ? 'ax-file-drop-zone-active'
      : '',
  ]
    .filter(Boolean)
    .join(' ');
  // endregion


  // region Main Return
  return (
    <div className={rootClassName}>

      {/* Label */}
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsMandatory={propsMandatory}
          propsDisabled={propsDisabled}
        />
      )}


      {/* Drop Zone */}
      <div
        className={
          dropZoneClassName
        }

        onClick={() => {
          if (!propsDisabled) {
            inputRef.current?.click();
          }
        }}

        onDragOver={(event) => {
          event.preventDefault();

          if (!propsDisabled) {
            setIsDragging(true);
          }
        }}

        onDragLeave={() =>
          setIsDragging(false)
        }

        onDrop={
          handleDrop
        }
      >

        <div className="ax-file-upload-icon">
          ↑
        </div>


        <div className="ax-file-upload-text">

          Drag & drop or{' '}

          <span>
            choose file
          </span>

          {' '}to upload

        </div>

      </div>


      {/* Hidden Input */}
      <input
        ref={inputRef}

        type="file"

        hidden

        multiple

        disabled={
          propsDisabled
        }

        accept={
          propsAccept.join(',')
        }

        onChange={
          handleFileChange
        }
      />


      {/* Error */}
      {error && (
        <div className="ax-file-error">
          {error}
        </div>
      )}


      {/* Selected Count */}
      {files.length > 0 && (
        <div className="ax-file-count">
          {files.length} of{' '}
          {propsMaxFiles}
          {' '}files selected
        </div>
      )}


      {/* File List */}
      {files.length > 0 && (
        <div className="ax-file-list">

          {files.map(
            (file, index) => (

              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="ax-file-item"
              >

                <div className="ax-file-info">

                  <span className="ax-file-name">
                    {file.name}
                  </span>

                  <span className="ax-file-size">
                    {(
                      file.size /
                      1024 /
                      1024
                    ).toFixed(2)}
                    {' '}MB
                  </span>

                </div>


                <div className="ax-file-actions">

                  <button
                    type="button"

                    onClick={() =>
                      handleReplace(
                        index
                      )
                    }

                    disabled={
                      propsDisabled
                    }
                  >
                    Replace
                  </button>


                  <button
                    type="button"

                    aria-label="Remove file"

                    onClick={() =>
                      handleRemove(
                        index
                      )
                    }

                    disabled={
                      propsDisabled
                    }
                  >
                    ✕
                  </button>

                </div>

              </div>

            )
          )}

        </div>
      )}


      {/* Hint */}
      <div className="ax-file-hint">

        <strong>
          Hint:
        </strong>

        {' '}Allowed files:
        {' '}
        {propsAccept.join(', ')}

        . Maximum file size:
        {' '}
        {propsMaxFileSizeMB}MB.

        Maximum
        {' '}
        {propsMaxFiles}
        {' '}files.

      </div>

    </div>
  );
  // endregion
};

export default AXInputFileUpload;
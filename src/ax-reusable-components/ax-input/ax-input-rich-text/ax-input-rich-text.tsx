'use client';

import dynamic from 'next/dynamic';

import './ax-input-rich-text.css';
import 'react-quill-new/dist/quill.snow.css';

import AXInputLabel from '../ax-input-label/ax-input-label';

// region Dynamic Import
const ReactQuill = dynamic(
  () => import('react-quill-new'),
  {
    ssr: false,
  }
);
// endregion


// region Interfaces
export interface AXInputRichTextProps {

  /** Label */
  propsLabel?: string;

  /** Current HTML value */
  propsValue?: string;

  /** Placeholder */
  propsPlaceholder?: string;

  /** Mandatory */
  propsMandatory?: boolean;

  /** Disabled */
  propsDisabled?: boolean;

  /** Error */
  propsHasError?: boolean;

  /** Custom root class */
  propsClassName?: string;

  /** Change handler */
  propsOnChange?: (
    value: string
  ) => void;
}
// endregion


// region Main Component
export const AXInputRichText = ({
  propsLabel,

  propsValue = '',

  propsPlaceholder = 'Start typing...',

  propsMandatory = false,

  propsDisabled = false,

  propsHasError = false,

  propsClassName = '',

  propsOnChange,
}: AXInputRichTextProps) => {

  // region Toolbar
  const modules = {
    toolbar: [

      // Undo-style formatting groups
      [
        'bold',
        'italic',
        'underline',
        'strike',
      ],

      // Headings
      [
        {
          header: [
            1,
            2,
            3,
            false,
          ],
        },
      ],

      // Lists
      [
        {
          list: 'ordered',
        },
        {
          list: 'bullet',
        },
      ],

      // Indent
      [
        {
          indent: '-1',
        },
        {
          indent: '+1',
        },
      ],

      // Alignment
      [
        {
          align: [],
        },
      ],

      // Text Colors
      [
        {
          color: [],
        },
        {
          background: [],
        },
      ],

      // Quote / Code
      [
        'blockquote',
        'code-block',
      ],

      // Link / Image
      [
        'link',
        'image',
      ],

      // Clear Formatting
      [
        'clean',
      ],
    ],
  };
  // endregion


  // region Formats
  const formats = [
    'header',

    'bold',
    'italic',
    'underline',
    'strike',

    'list',

    'indent',

    'align',

    'color',
    'background',

    'blockquote',
    'code-block',

    'link',
    'image',
  ];
  // endregion


  // region Classes
  const rootClassName = [
    'ax-input-rich-text',

    propsDisabled
      ? 'ax-input-rich-text-disabled'
      : '',

    propsHasError
      ? 'ax-input-rich-text-error'
      : '',

    propsClassName,
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


      {/* Rich Text Editor */}
      <ReactQuill
        theme="snow"

        value={propsValue}

        onChange={propsOnChange}

        placeholder={propsPlaceholder}

        readOnly={propsDisabled}

        modules={modules}

        formats={formats}
      />

    </div>
  );
};
// endregion

export default AXInputRichText;
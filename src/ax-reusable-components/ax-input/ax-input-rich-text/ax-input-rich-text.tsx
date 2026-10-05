'use client';

import dynamic from 'next/dynamic';
import './ax-input-rich-text.css';
import 'react-quill-new/dist/quill.snow.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

// region Dynamic Import
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

// region Interfaces
export interface InputRichTextProps {
  /** Label */
  propsLabel?: string;
  /** Current HTML value */
  propsValue?: string;
  /** Placeholder */
  propsPlaceholder?: string;
  /** Mandatory */
  propsMandatory?: boolean;
  /** Error */
  propsHasError?: boolean;
  /** Error message */
  propsErrorMessage?: string;
  /** Custom root class */
  propsClassName?: string;
  /** Change handler */
  propsOnChange?: (value: string) => void;
  /** Read only */
  propsReadOnly?: boolean;
}

// region Main Component
export const AXInputRichText = ({
  propsLabel,
  propsValue = '',
  propsPlaceholder = 'Start typing...',
  propsMandatory = false,
  propsReadOnly = false,
  propsHasError = false,
  propsErrorMessage = '',
  propsClassName = '',
  propsOnChange,
}: InputRichTextProps) => {
  // region Toolbar
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

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

  const rootClassName = [
    'ax-input-rich-text',
    propsReadOnly ? 'ax-input-rich-text-readonly' : '',
    propsHasError ? 'ax-input-rich-text-error' : '',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
    <div className={rootClassName}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsMandatory={propsMandatory}
        />
      )}

      <ReactQuill
        theme="snow"
        value={propsValue}
        onChange={propsOnChange}
        placeholder={propsPlaceholder}
        modules={modules}
        formats={formats}
      />
    </div>
    {propsHasError && <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">{propsErrorMessage}</span>}
    </>
  );
};

export default AXInputRichText;
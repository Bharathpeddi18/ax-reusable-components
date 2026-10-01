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
  /** Disabled */
  propsDisabled?: boolean;
  /** Error */
  propsHasError?: boolean;
  /** Custom root class */
  propsClassName?: string;
  /** Change handler */
  propsOnChange?: (value: string) => void;
}

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
    propsDisabled ? 'ax-input-rich-text-disabled' : '',
    propsHasError ? 'ax-input-rich-text-error' : '',
    propsClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      {propsLabel && (
        <AXInputLabel
          propsLabel={propsLabel}
          propsMandatory={propsMandatory}
          propsDisabled={propsDisabled}
        />
      )}

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

export default AXInputRichText;
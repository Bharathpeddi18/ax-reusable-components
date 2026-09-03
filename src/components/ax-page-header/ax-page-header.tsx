'use client';

import './ax-page-header.css';

export const AXPageHeader = () => {
  return (
    <header className='ax-page-header ax-flex ax-items-center ax-justify-between ax-p-3'>
      <div className='ax-flex ax-items-center'>Page Header Left</div>
      <div className='ax-flex ax-items-center'>Page Header Right</div>
    </header>
  );
};

export default AXPageHeader;
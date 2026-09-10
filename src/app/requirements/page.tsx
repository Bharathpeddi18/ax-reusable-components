'use client';

import React from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';

const Requirements = () => {
  return (
    <>
      <AXPageHeader
        title="System Requirements"
        actions={<span className="ax-text-xs ax-text-muted">v1.0.0</span>}
      />
      <div className="ax-p-6 ax-flex ax-flex-col ax-gap-6 ax-max-w-5xl">
        <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-3">
          <h2 className="ax-text-xl ax-font-semibold ax-text-primary">Architecture Specifications</h2>
          <p className="ax-text-secondary ax-text-sm ax-leading-relaxed">
            All reusable components adhere to the token-driven design system with responsive layouts, accessible focus states, and zero runtime overhead.
          </p>
        </div>
      </div>
    </>
  );
};

export default Requirements;

'use client';

import React from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';

const Requirements = () => {
  return (
    <>
      <AXPageHeader title="System Requirements" actions={<span className="text-xs text-muted">v1.0.0</span>} />
      <div className="p-6 flex flex-col gap-6 max-w-5xl">
        <div className="p-6 bg-surface rounded-xl border border-default shadow-sm flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-primary">Architecture Specifications</h2>
          <p className="text-secondary text-sm leading-relaxed">
            All reusable components adhere to the token-driven design system with responsive layouts, accessible focus states, and zero runtime overhead.
          </p>
        </div>
      </div>
    </>
  );
};

export default Requirements;

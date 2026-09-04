'use client';

import React from 'react';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  AXPopover,
  AXPopoverTrigger,
  AXPopoverContent,
  AXPopoverHeader,
  AXPopoverBody,
  AXPopoverFooter,
  AXPopoverPlacement,
  AXPopoverSize,
  AXPopoverTheme,
  AXPopoverTriggerMode,
} from '@/components/ax-popover/ax-popover';

export const PopoverSamples: React.FC = () => {
  const sizes: { size: AXPopoverSize; label: string; desc: string }[] = [
    { size: 'xs', label: 'Size XS (220px)', desc: 'Micro container for tags and status summaries.' },
    { size: 'sm', label: 'Size SM (280px)', desc: 'Compact helper for notifications and inline tips.' },
    { size: 'md', label: 'Size MD (340px Standard)', desc: 'Standard width for forms, user menus, and controls.' },
    { size: 'lg', label: 'Size LG (440px)', desc: 'Spacious panel for multi-column filters and wizards.' },
    { size: 'xl', label: 'Size XL (560px)', desc: 'Extra-large container for telemetry and data tables.' },
  ];

  const themes: { theme: AXPopoverTheme; title: string; color: 'primary' | 'dark' | 'secondary' | 'accent' }[] = [
    { theme: 'surface', title: 'Surface (Clean Light)', color: 'secondary' },
    { theme: 'dark', title: 'Dark (Deep Navy Slate)', color: 'dark' },
    { theme: 'primary', title: 'Primary (Air Force Blue)', color: 'primary' },
    { theme: 'glass', title: 'Glass (Backdrop Blur)', color: 'accent' },
  ];

  const placements: { placement: AXPopoverPlacement; label: string }[] = [
    { placement: 'top', label: 'Top' },
    { placement: 'top-start', label: 'Top-Start' },
    { placement: 'top-end', label: 'Top-End' },
    { placement: 'bottom', label: 'Bottom' },
    { placement: 'bottom-start', label: 'Bottom-Start' },
    { placement: 'bottom-end', label: 'Bottom-End' },
    { placement: 'left', label: 'Left' },
    { placement: 'left-start', label: 'Left-Start' },
    { placement: 'left-end', label: 'Left-End' },
    { placement: 'right', label: 'Right' },
    { placement: 'right-start', label: 'Right-Start' },
    { placement: 'right-end', label: 'Right-End' },
    { placement: 'auto', label: 'Auto (Smart Collision)' },
  ];

  const triggerModes: AXPopoverTriggerMode[] = ['click', 'hover', 'focus'];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. All Sizes Progression */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2 ax-py-0.5 ax-bg-surface-secondary ax-rounded ax-text-xs ax-font-medium ax-text-primary ax-mb-1">
            Size Progression
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            1. Popover Width Hierarchy (5 Standard Presets)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Standardized container widths from <code className="ax-text-primary ax-font-mono">xs</code> (220px) to <code className="ax-text-primary ax-font-mono">xl</code> (560px), rendered into zero-collision React Portals.
          </p>
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
          {sizes.map(({ size, label, desc }) => (
            <AXPopover key={size} size={size} placement="bottom">
              <AXPopoverTrigger>
                <AXButton
                  size="sm"
                  variant={size === 'md' ? 'contained' : 'outlined'}
                  color="primary"
                  label={label}
                />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title={`Popover ${size.toUpperCase()}`} />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-text-secondary ax-m-0">{desc}</p>
                </AXPopoverBody>
                <AXPopoverFooter>
                  <AXButton size="xs" variant="text" label="Close" />
                  <AXButton size="xs" color="primary" label="Select" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          ))}
        </div>
      </div>

      {/* 2. All 4 Theme Variations */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            2. Popover Theme Aesthetics (4 Surface Themes)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Visual finishes: <code className="ax-text-primary ax-font-mono">surface</code>, <code className="ax-text-primary ax-font-mono">dark</code>, <code className="ax-text-primary ax-font-mono">primary</code>, and <code className="ax-text-primary ax-font-mono">glass</code>.
          </p>
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
          {themes.map(({ theme, title, color }) => (
            <AXPopover key={theme} theme={theme} size="md" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="md" variant="contained" color={color} label={`Theme: ${theme.toUpperCase()}`} />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title={title} />
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-2">
                    <p className="ax-text-xs ax-m-0">
                      Demonstrating the <strong>{theme}</strong> visual theme with coordinated borders, typography contrast, and box shadows.
                    </p>
                    <div className="ax-p-2 ax-rounded ax-text-xs" style={{ background: 'rgba(128, 128, 128, 0.15)' }}>
                      Active Theme Token: <code>--ax-popover-theme-{theme}</code>
                    </div>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter>
                  <AXButton size="xs" variant="text" label="Dismiss" />
                  <AXButton size="xs" color="primary" label="Apply Theme" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          ))}
        </div>
      </div>

      {/* 3. Comprehensive 13-Position Placement Grid */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            3. Dynamic Placements & Smart Collision Detection (13 Positions)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Every cardinal anchor direction with start/center/end alignments, plus smart boundary flipping.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-2 sm:ax-grid-cols-3 md:ax-grid-cols-4 lg:ax-grid-cols-5 ax-gap-3">
          {placements.map(({ placement, label }) => (
            <AXPopover key={placement} placement={placement} size="xs">
              <AXPopoverTrigger>
                <AXButton
                  fullWidth
                  size="xs"
                  variant="outlined"
                  color="primary"
                  label={label}
                />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title={`Anchor: ${placement}`} />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-text-secondary ax-m-0">
                    Anchored via <code>placement="{placement}"</code> with boundary flipping.
                  </p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>
          ))}
        </div>
      </div>

      {/* 4. Trigger Modes & Arrow Controls */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            4. Trigger Modes & Directional Arrows
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Interactive triggers (<code className="ax-text-primary ax-font-mono">click</code>, <code className="ax-text-primary ax-font-mono">hover</code>, <code className="ax-text-primary ax-font-mono">focus</code>) and arrow toggle.
          </p>
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
          {triggerModes.map((mode) => (
            <AXPopover key={mode} trigger={mode} size="sm" placement="bottom">
              <AXPopoverTrigger>
                <AXButton
                  size="sm"
                  variant="soft"
                  color={mode === 'hover' ? 'accent' : 'primary'}
                  label={`Trigger: ${mode.toUpperCase()}`}
                />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title={`Trigger Mode: ${mode}`} />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-text-secondary ax-m-0">
                    This popover is controlled via <code>trigger="{mode}"</code> events.
                  </p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>
          ))}

          <div className="ax-h-6 ax-w-px ax-bg-border ax-mx-2" />

          {/* With Arrow */}
          <AXPopover showArrow={true} size="xs" placement="bottom">
            <AXPopoverTrigger>
              <AXButton size="sm" variant="outlined" color="success" label="With Arrow (showArrow=true)" />
            </AXPopoverTrigger>
            <AXPopoverContent>
              <AXPopoverHeader title="Directional Arrow" />
              <AXPopoverBody>
                <p className="ax-text-xs ax-text-secondary ax-m-0">Arrow dynamically points directly to anchor.</p>
              </AXPopoverBody>
            </AXPopoverContent>
          </AXPopover>

          {/* Without Arrow */}
          <AXPopover showArrow={false} size="xs" placement="bottom">
            <AXPopoverTrigger>
              <AXButton size="sm" variant="outlined" color="secondary" label="Clean (showArrow=false)" />
            </AXPopoverTrigger>
            <AXPopoverContent>
              <AXPopoverHeader title="Clean Edge" />
              <AXPopoverBody>
                <p className="ax-text-xs ax-text-secondary ax-m-0">Rendered without arrow pointer.</p>
              </AXPopoverBody>
            </AXPopoverContent>
          </AXPopover>
        </div>
      </div>
    </div>
  );
};

export default PopoverSamples;

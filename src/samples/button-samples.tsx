'use client';

import React, { useState } from 'react';
import {
  AXButton,
  AXButtonVariant,
  AXButtonColor,
  AXButtonSize,
  AXButtonShape,
} from '@/components/ax-button/ax-button';

import {
  CheckIcon,
  ArrowRightIcon,
  HeartIcon,
  DownloadIcon,
  EditIcon,
} from '@/assets/icons';

export const ButtonSamples: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  const variants: AXButtonVariant[] = ['contained', 'outlined', 'soft', 'text', 'link'];
  const colors: AXButtonColor[] = ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info', 'dark', 'light'];
  const sizes: AXButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const shapes: AXButtonShape[] = ['rounded', 'pill', 'square', 'circle'];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. Complete 5x9 Variant × Color Matrix Table */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2 ax-py-0.5 ax-bg-surface-secondary ax-rounded ax-text-xs ax-font-medium ax-text-primary ax-mb-1">
            Exhaustive Matrix
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            1. Complete Variant × Color Matrix (45 Combinations)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Every style variant (<code className="ax-text-primary ax-font-mono">contained</code>, <code className="ax-text-primary ax-font-mono">outlined</code>, <code className="ax-text-primary ax-font-mono">soft</code>, <code className="ax-text-primary ax-font-mono">text</code>, <code className="ax-text-primary ax-font-mono">link</code>) paired with all 9 design tokens.
          </p>
        </div>

        <div className="ax-overflow-x-auto">
          <table className="ax-w-full ax-border-collapse ax-text-left">
            <thead>
              <tr className="ax-border-b ax-border-default ax-text-xs ax-text-secondary">
                <th className="ax-py-3 ax-px-3 ax-font-semibold">Variant \ Color</th>
                {colors.map((c) => (
                  <th key={c} className="ax-py-3 ax-px-2 ax-font-semibold ax-capitalize ax-text-center">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ax-divide-y ax-divide-default">
              {variants.map((v) => (
                <tr key={v}>
                  <td className="ax-py-3 ax-px-3 ax-font-semibold ax-text-primary ax-text-xs ax-capitalize">
                    {v}
                  </td>
                  {colors.map((c) => (
                    <td key={`${v}-${c}`} className="ax-py-3 ax-px-2 ax-text-center">
                      <AXButton size="sm" variant={v} color={c} label="Action" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. All 5 Sizes Matrix */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            2. Size Presets Matrix (5 Sizes)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            From micro badges (<code className="ax-text-primary ax-font-mono">xs</code> 28px) up to hero calls-to-action (<code className="ax-text-primary ax-font-mono">xl</code> 56px).
          </p>
        </div>

        <div className="ax-flex ax-flex-col ax-gap-4">
          {sizes.map((s) => (
            <div key={s} className="ax-flex ax-flex-wrap ax-items-center ax-gap-3 ax-p-3 ax-bg-surface-secondary ax-rounded-lg">
              <span className="ax-text-xs ax-font-mono ax-font-bold ax-text-primary ax-w-16">
                Size {s.toUpperCase()}
              </span>
              <AXButton size={s} variant="contained" color="primary" label={`Contained ${s.toUpperCase()}`} />
              <AXButton size={s} variant="outlined" color="primary" startIcon={<CheckIcon />} label={`Outlined ${s.toUpperCase()}`} />
              <AXButton size={s} variant="soft" color="accent" startIcon={<EditIcon />} label={`Soft ${s.toUpperCase()}`} />
              <AXButton size={s} variant="text" color="primary" endIcon={<ArrowRightIcon />} label={`Text ${s.toUpperCase()}`} />
              <AXButton size={s} shape="circle" color="primary" startIcon={<HeartIcon />} iconOnly title={`Circle ${s}`} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Shapes & Geometries */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            3. Shape Geometries (4 Shapes)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Corner radius geometry variations: <code className="ax-text-primary ax-font-mono">rounded</code>, <code className="ax-text-primary ax-font-mono">pill</code>, <code className="ax-text-primary ax-font-mono">circle</code>, and <code className="ax-text-primary ax-font-mono">square</code>.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 lg:ax-grid-cols-4 ax-gap-4">
          {shapes.map((shape) => (
            <div key={shape} className="ax-p-4 ax-bg-surface-secondary ax-rounded-xl ax-flex ax-flex-col ax-items-center ax-gap-3 ax-text-center">
              <span className="ax-text-xs ax-font-bold ax-text-primary ax-capitalize">
                Shape: {shape}
              </span>
              {shape === 'circle' ? (
                <div className="ax-flex ax-items-center ax-gap-2">
                  <AXButton size="sm" shape="circle" color="primary" startIcon={<HeartIcon />} iconOnly />
                  <AXButton size="md" shape="circle" variant="soft" color="accent" startIcon={<DownloadIcon />} iconOnly />
                  <AXButton size="lg" shape="circle" variant="outlined" color="danger" startIcon={<CheckIcon />} iconOnly />
                </div>
              ) : (
                <div className="ax-flex ax-flex-col ax-gap-2 ax-w-full">
                  <AXButton shape={shape} color="primary" label={`Contained ${shape}`} />
                  <AXButton shape={shape} variant="outlined" color="primary" label={`Outlined ${shape}`} />
                  <AXButton shape={shape} variant="soft" color="accent" label={`Soft ${shape}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Icon Configurations */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            4. Icon Layout Configurations
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Prefix icons, suffix icons, dual icons, custom icon color tinting, and 1:1 aspect-ratio icon buttons.
          </p>
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
          <AXButton startIcon={<CheckIcon />} color="success" label="Start Icon Only" />
          <AXButton endIcon={<ArrowRightIcon />} color="primary" label="End Icon Only" />
          <AXButton startIcon={<CheckIcon />} endIcon={<ArrowRightIcon />} variant="soft" color="primary" label="Dual Icons (Start & End)" />
          <AXButton startIcon={<HeartIcon />} iconColor="#ef4444" variant="outlined" color="primary" label="Custom Icon Color Tint" />
          
          <div className="ax-h-8 ax-w-px ax-bg-border ax-mx-2" />

          <AXButton size="sm" color="secondary" startIcon={<DownloadIcon />} iconOnly title="Download (SM)" />
          <AXButton size="md" variant="soft" color="primary" startIcon={<EditIcon />} iconOnly title="Edit (MD)" />
          <AXButton size="lg" shape="circle" color="accent" startIcon={<HeartIcon />} iconOnly title="Favorite (LG)" />
        </div>
      </div>

      {/* 5. Interactive Zero-CLS Loading Playground */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div className="ax-flex ax-items-center ax-justify-between">
          <div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
              5. Zero-CLS Async Loading State
            </h3>
            <p className="ax-text-xs ax-text-secondary ax-mt-1">
              Click the trigger button below to test a live 2.5-second async operation. Notice the width never shifts 1 pixel!
            </p>
          </div>
          <AXButton
            variant="outlined"
            size="sm"
            color="primary"
            onClick={toggleLoading}
            label={loading ? 'Async Running (2.5s)...' : '▶ Test Live Loading'}
          />
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4 ax-p-4 ax-bg-surface-secondary ax-rounded-lg">
          <AXButton
            loading={loading}
            color="primary"
            startIcon={<CheckIcon />}
            label="Save Changes"
          />
          <AXButton
            loading={loading}
            loadingText="Processing Payment..."
            variant="soft"
            color="accent"
            label="Checkout"
          />
          <AXButton
            loading={loading}
            variant="outlined"
            color="success"
            endIcon={<ArrowRightIcon />}
            label="Deploy App"
          />
          <AXButton
            loading={loading}
            shape="circle"
            color="danger"
            startIcon={<DownloadIcon />}
            iconOnly
          />
          <AXButton
            loading={loading}
            variant="text"
            color="primary"
            label="Text Loader"
          />
        </div>
      </div>

      {/* 6. Interaction States, Full-Width & Links */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            6. Interactive States, Full-Width & Polymorphic Links
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Native disabled states, full container width layout, and polymorphic anchor link navigation.
          </p>
        </div>

        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-3">
          <AXButton disabled color="primary" label="Disabled Contained" />
          <AXButton disabled variant="outlined" color="primary" label="Disabled Outlined" />
          <AXButton disabled variant="soft" color="accent" label="Disabled Soft" />
          <AXButton href="#top" variant="outlined" color="primary" endIcon={<ArrowRightIcon />} label="Anchor Link (href='#top')" />
          <AXButton href="https://google.com" target="_blank" variant="soft" color="primary" endIcon={<ArrowRightIcon />} label="External Link (_blank)" />
        </div>

        <div className="ax-w-full ax-pt-2">
          <span className="ax-text-xs ax-font-semibold ax-text-secondary ax-block ax-mb-2">Full Width Preset:</span>
          <AXButton fullWidth color="primary" startIcon={<CheckIcon />} label="Full Width Container Button (fullWidth={true})" />
        </div>
      </div>
    </div>
  );
};

export default ButtonSamples;

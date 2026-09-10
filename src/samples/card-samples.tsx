'use client';

import React, { useState } from 'react';
import {
  AXCard,
  AXCardHeader,
  AXCardHeaderLeft,
  AXCardHeaderRight,
  AXCardBody,
  AXCardFooter,
  AXCardFooterLeft,
  AXCardFooterRight,
  AXCardSize,
  AXCardVariant,
} from '@/components/ax-card/ax-card';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  SparklesIcon,
  SettingsIcon,
  DownloadIcon,
  CubeIcon,
  CheckIcon,
} from '@/assets/icons';

export const CardSamples: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<AXCardSize>('md');
  const [selectedVariant, setSelectedVariant] = useState<AXCardVariant>('default');
  const [headerDivider, setHeaderDivider] = useState(true);
  const [footerDivider, setFooterDivider] = useState(true);

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* ====================================================================
          1. Interactive Size & Spacing Scaler
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Size Tokens
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Size-Driven Padding & Spacing Playground
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Paddings, gaps, and typography automatically scale based on the selected card size.
          </p>
        </div>

        {/* Controls */}
        <div className="ax-flex ax-items-center ax-gap-4 ax-p-4 ax-bg-surface-secondary ax-rounded-lg ax-border ax-border-default ax-flex-wrap">
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-font-semibold ax-text-secondary">Card Size:</span>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as AXCardSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setSelectedSize(sz)}
                className={`ax-px-3 ax-py-1 ax-text-xs ax-font-semibold ax-rounded-md ax-transition-all ${
                  selectedSize === sz
                    ? 'ax-bg-primary ax-text-white ax-shadow-sm'
                    : 'ax-bg-surface ax-text-primary ax-border ax-border-default hover:ax-border-primary'
                }`}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-font-semibold ax-text-secondary">Variant:</span>
            {(['default', 'elevated', 'outlined', 'subtle', 'glass'] as AXCardVariant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`ax-px-2.5 ax-py-1 ax-text-xs ax-font-medium ax-rounded-md ax-transition-all ${
                  selectedVariant === v
                    ? 'ax-bg-primary ax-text-white'
                    : 'ax-bg-surface ax-text-secondary ax-border ax-border-default'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="ax-flex ax-items-center ax-gap-3 ax-ml-auto">
            <label className="ax-flex ax-items-center ax-gap-1.5 ax-text-xs ax-text-primary ax-cursor-pointer">
              <input
                type="checkbox"
                checked={headerDivider}
                onChange={(e) => setHeaderDivider(e.target.checked)}
              />
              Header Divider
            </label>
            <label className="ax-flex ax-items-center ax-gap-1.5 ax-text-xs ax-text-primary ax-cursor-pointer">
              <input
                type="checkbox"
                checked={footerDivider}
                onChange={(e) => setFooterDivider(e.target.checked)}
              />
              Footer Divider
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="ax-p-8 ax-bg-surface-subtle ax-rounded-xl ax-border ax-border-dashed ax-border-default ax-flex ax-items-center ax-justify-center">
          <div className="ax-w-full ax-max-w-xl">
            <AXCard
              size={selectedSize}
              variant={selectedVariant}
              headerDivider={headerDivider}
              footerDivider={footerDivider}
              headerLeft={
                <div className="ax-flex ax-items-center ax-gap-2.5">
                  <div className="ax-w-7 ax-h-7 ax-rounded-md ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center">
                    <CubeIcon size={16} />
                  </div>
                  <div>
                    <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">
                      Cloud Instance {selectedSize.toUpperCase()}
                    </h4>
                    <span className="ax-text-2xs ax-text-secondary">us-east-1 production</span>
                  </div>
                </div>
              }
              headerRight={
                <AXButton size="xs" variant="outlined" color="secondary" startIcon={<SettingsIcon size={12} />} label="Config" />
              }
              body={
                <div className="ax-flex ax-flex-col ax-gap-2">
                  <p className="ax-text-xs ax-text-secondary ax-m-0">
                    Content passed from the outside. Padding and gaps automatically adjust based on the card size token preset ({selectedSize}).
                  </p>
                  <div className="ax-flex ax-items-center ax-justify-between ax-p-2.5 ax-bg-surface-secondary ax-rounded-md ax-text-xs">
                    <span className="ax-text-secondary">Allocated Cores</span>
                    <span className="ax-font-bold ax-text-primary">8 vCPU / 32 GB</span>
                  </div>
                </div>
              }
              footerLeft={
                <span className="ax-text-2xs ax-text-secondary">Status: <strong>Healthy (99.9%)</strong></span>
              }
              footerRight={
                <div className="ax-flex ax-items-center ax-gap-2">
                  <AXButton size="xs" variant="outlined" color="secondary" label="Logs" />
                  <AXButton size="xs" color="primary" startIcon={<SparklesIcon size={12} />} label="Restart" />
                </div>
              }
            />
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. Standard Cards (Header Left/Right, Body, Footer Left/Right)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Pattern 1
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Standard Layout: Header (L/R), Body, Footer (L/R)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Clean and minimal layout where all contents are passed from the outside.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-3 ax-gap-4">
          {/* Card 1 */}
          <AXCard
            size="md"
            variant="elevated"
            headerLeft={
              <div className="ax-flex ax-flex-col">
                <span className="ax-text-sm ax-font-bold ax-text-primary">Monthly Revenue</span>
                <span className="ax-text-2xs ax-text-secondary">Gross billings</span>
              </div>
            }
            headerRight={
              <span className="ax-px-2 ax-py-0.5 ax-bg-success-soft ax-text-success ax-rounded-full ax-text-2xs ax-font-bold">
                +14.2%
              </span>
            }
            body={
              <div className="ax-flex ax-flex-col ax-gap-1">
                <span className="ax-text-2xl ax-font-bold ax-text-primary">$124,500</span>
                <span className="ax-text-xs ax-text-secondary">Target: $150k by end of quarter</span>
              </div>
            }
            footerLeft={<span className="ax-text-2xs ax-text-secondary">Updated 5m ago</span>}
            footerRight={<AXButton size="xs" color="primary" label="Details" />}
          />

          {/* Card 2 */}
          <AXCard
            size="md"
            variant="elevated"
            headerLeft={
              <div className="ax-flex ax-flex-col">
                <span className="ax-text-sm ax-font-bold ax-text-primary">Active Workers</span>
                <span className="ax-text-2xs ax-text-secondary">Distributed fleet</span>
              </div>
            }
            headerRight={
              <AXButton size="xs" variant="text" color="secondary" startIcon={<DownloadIcon size={14} />} />
            }
            body={
              <div className="ax-flex ax-flex-col ax-gap-1">
                <span className="ax-text-2xl ax-font-bold ax-text-primary">1,428 Nodes</span>
                <span className="ax-text-xs ax-text-success">All clusters synced</span>
              </div>
            }
            footerLeft={<span className="ax-text-2xs ax-text-secondary">Region: Global</span>}
            footerRight={<AXButton size="xs" variant="outlined" color="secondary" label="Scale" />}
          />

          {/* Card 3 */}
          <AXCard
            size="md"
            variant="elevated"
            headerLeft={
              <div className="ax-flex ax-flex-col">
                <span className="ax-text-sm ax-font-bold ax-text-primary">Security Audits</span>
                <span className="ax-text-2xs ax-text-secondary">Compliance review</span>
              </div>
            }
            headerRight={
              <span className="ax-px-2 ax-py-0.5 ax-bg-warning-soft ax-text-warning ax-rounded-full ax-text-2xs ax-font-bold">
                2 Pending
              </span>
            }
            body={
              <div className="ax-flex ax-flex-col ax-gap-1">
                <span className="ax-text-2xl ax-font-bold ax-text-primary">98.4% Score</span>
                <span className="ax-text-xs ax-text-secondary">SOC-2 Type II Verified</span>
              </div>
            }
            footerLeft={<span className="ax-text-2xs ax-text-secondary">Last scan: Today</span>}
            footerRight={<AXButton size="xs" color="primary" label="Review" />}
          />
        </div>
      </div>

      {/* ====================================================================
          3. Compound Subcomponents Pattern
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-accent-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-accent ax-mb-1">
            Pattern 2
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Compound Subcomponents Usage
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Use AXCardHeader, AXCardHeaderLeft, AXCardHeaderRight, AXCardBody, AXCardFooter, AXCardFooterLeft, and AXCardFooterRight for complete structural flexibility.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          <AXCard size="lg" variant="outlined">
            <AXCardHeader>
              <AXCardHeaderLeft>
                <div className="ax-flex ax-items-center ax-gap-3">
                  <div className="ax-w-8 ax-h-8 ax-rounded-full ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center ax-font-bold ax-text-xs">
                    BP
                  </div>
                  <div>
                    <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Bharath Peddi</h4>
                    <span className="ax-text-2xs ax-text-secondary">Design Systems Lead</span>
                  </div>
                </div>
              </AXCardHeaderLeft>
              <AXCardHeaderRight>
                <span className="ax-px-2 ax-py-0.5 ax-bg-primary-soft ax-text-primary ax-rounded-full ax-text-2xs ax-font-bold">
                  PRO
                </span>
              </AXCardHeaderRight>
            </AXCardHeader>

            <AXCardBody>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Minimal reusable card layout component maintaining consistent internal padding and spacing based on size tokens. Everything is passed from the outside.
              </p>
            </AXCardBody>

            <AXCardFooter>
              <AXCardFooterLeft>
                <span className="ax-flex ax-items-center ax-gap-1.5 ax-text-2xs ax-text-secondary">
                  <CheckIcon size={12} className="ax-text-success" /> Verified Account
                </span>
              </AXCardFooterLeft>
              <AXCardFooterRight>
                <AXButton size="xs" variant="outlined" color="secondary" label="Profile" />
                <AXButton size="xs" color="primary" label="Message" />
              </AXCardFooterRight>
            </AXCardFooter>
          </AXCard>

          <AXCard size="lg" variant="subtle">
            <AXCardHeader>
              <AXCardHeaderLeft>
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Deployment Pipeline</h4>
              </AXCardHeaderLeft>
              <AXCardHeaderRight>
                <span className="ax-text-2xs ax-text-secondary">v2.4.1</span>
              </AXCardHeaderRight>
            </AXCardHeader>

            <AXCardBody>
              <div className="ax-flex ax-flex-col ax-gap-2">
                <div className="ax-flex ax-items-center ax-justify-between ax-text-xs">
                  <span className="ax-text-secondary">Build Status</span>
                  <span className="ax-text-success ax-font-semibold">Passed</span>
                </div>
                <div className="ax-flex ax-items-center ax-justify-between ax-text-xs">
                  <span className="ax-text-secondary">Bundle Size</span>
                  <span className="ax-text-primary ax-font-semibold">42.8 KB</span>
                </div>
              </div>
            </AXCardBody>

            <AXCardFooter>
              <AXCardFooterLeft>
                <span className="ax-text-2xs ax-text-secondary">Ran in 1.4s</span>
              </AXCardFooterLeft>
              <AXCardFooterRight>
                <AXButton size="xs" color="primary" label="Deploy to Staging" />
              </AXCardFooterRight>
            </AXCardFooter>
          </AXCard>
        </div>
      </div>
    </div>
  );
};

export default CardSamples;

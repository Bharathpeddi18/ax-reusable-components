'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { AXTabs, AXTabsList, AXTab } from '@/components/ax-tabs/ax-tabs';
import {
  ButtonSamples,
  PopoverSamples,
  PageHeaderSamples,
  TabsSamples,
  AccordionSamples,
} from '@/samples';

type TabKey = 'all' | 'accordion' | 'tabs' | 'button' | 'popover' | 'header';

const SamplesPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  return (
    <>
      <AXPageHeader
        title="Reusable Component Samples & Interactive Showcase"
        actions={
          <div className="ax-flex ax-items-center ax-gap-2">
            <span className="ax-text-xs ax-text-muted">v2.0.0 Production Ready</span>
            <AXButton
              size="xs"
              variant="outlined"
              color="primary"
              label="Interactive Lab"
            />
          </div>
        }
      />

      <div className="ax-p-6 ax-flex ax-flex-col ax-gap-8 ax-max-w-7xl">
        {/* Banner Card */}
        <div className="ax-p-8 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-items-center ax-justify-center ax-gap-3 ax-text-center">
          <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-3 ax-py-1 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-medium ax-text-primary">
            <span>✨</span> Enterprise Design System
          </div>
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary ax-m-0">
            AstraX Component Library Samples
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed ax-m-0">
            Live interactive documentation showcasing all component variations, responsive behaviors, accessibility features, and scoped token theming.
          </p>

          {/* Navigation Filter Tabs Powered by AXTabs */}
          <div className="ax-w-full ax-max-w-3xl ax-mt-2">
            <AXTabs
              value={activeTab}
              onChange={(val) => setActiveTab(val as TabKey)}
              variant="pill"
              color="primary"
              fullWidth
            >
              <AXTabsList>
                <AXTab value="all">All</AXTab>
                <AXTab value="accordion" badge="New" badgeColor="accent">AXAccordion</AXTab>
                <AXTab value="tabs">AXTabs</AXTab>
                <AXTab value="button">AXButton</AXTab>
                <AXTab value="popover">AXPopover</AXTab>
                <AXTab value="header">AXPageHeader</AXTab>
              </AXTabsList>
            </AXTabs>
          </div>
        </div>

        {/* Section: AXAccordion */}
        {(activeTab === 'all' || activeTab === 'accordion') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <div>
                <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                  AXAccordion Component
                </h2>
                <p className="ax-text-xs ax-text-secondary ax-m-0">
                  Hardware-accelerated CSS Grid row fraction interpolation (0fr ➔ 1fr), 4 variants, single/multiple expansion, and WAI-ARIA keyboard navigation.
                </p>
              </div>
            </div>
            <AccordionSamples />
          </section>
        )}

        {/* Section: AXTabs */}
        {(activeTab === 'all' || activeTab === 'tabs') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <div>
                <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                  AXTabs Component
                </h2>
                <p className="ax-text-xs ax-text-secondary ax-m-0">
                  Sliding active indicator, 4 visual variants (Line, Pill, Card, Soft), vertical/horizontal orientations, and WAI-ARIA keyboard navigation.
                </p>
              </div>
            </div>
            <TabsSamples />
          </section>
        )}

        {/* Section: AXButton */}
        {(activeTab === 'all' || activeTab === 'button') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <div>
                <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                  AXButton Component
                </h2>
                <p className="ax-text-xs ax-text-secondary ax-m-0">
                  Zero runtime overhead, scoped CSS variables, 5 sizes, 5 variants, 9 themes, and zero-CLS loading.
                </p>
              </div>
            </div>
            <ButtonSamples />
          </section>
        )}

        {/* Section: AXPopover */}
        {(activeTab === 'all' || activeTab === 'popover') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <div>
                <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                  AXPopover Component
                </h2>
                <p className="ax-text-xs ax-text-secondary ax-m-0">
                  React Portals with absolute zero-collision z-index hierarchy and smart boundary collision flipping.
                </p>
              </div>
            </div>
            <PopoverSamples />
          </section>
        )}

        {/* Section: AXPageHeader */}
        {(activeTab === 'all' || activeTab === 'header') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <div>
                <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                  AXPageHeader Component
                </h2>
                <p className="ax-text-xs ax-text-secondary ax-m-0">
                  Clean header surface with breadcrumbs, status indicators, and action slots.
                </p>
              </div>
            </div>
            <PageHeaderSamples />
          </section>
        )}
      </div>
    </>
  );
};

export default SamplesPage;

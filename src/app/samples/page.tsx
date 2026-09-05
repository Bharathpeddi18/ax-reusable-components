'use client';

import React, { useState } from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import { AXTabs, AXTabsList, AXTab } from '@/components/ax-tabs/ax-tabs';
import {
  ButtonSamples,
  InputSamples,
  CardSamples,
  PopoverSamples,
  PageHeaderSamples,
  TabsSamples,
  AccordionSamples,
  DatePickerSamples,
  TypographyLayoutSamples,
  OverlaySamples,
  DataDisplaySamples,
  FeedbackSamples,
} from '@/samples';

type TabKey =
  | 'all'
  | 'inputs'
  | 'date-picker'
  | 'data-display'
  | 'overlays'
  | 'feedback'
  | 'typography'
  | 'card'
  | 'accordion'
  | 'tabs'
  | 'button'
  | 'popover'
  | 'header';

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
            Live interactive documentation showcasing all 24+ components with token-based scaling, high-performance zero-runtime styles, and WAI-ARIA accessibility.
          </p>

          {/* Navigation Filter Tabs Powered by AXTabs */}
          <div className="ax-w-full ax-max-w-4xl ax-mt-2">
            <AXTabs
              value={activeTab}
              onChange={(val) => setActiveTab(val as TabKey)}
              variant="pill"
              color="primary"
              fullWidth
            >
              <AXTabsList>
                <AXTab value="all">All (24+)</AXTab>
                <AXTab value="inputs" badge="Suite" badgeColor="accent">AXInputs</AXTab>
                <AXTab value="date-picker" badge="10/10" badgeColor="accent">AXDatePicker</AXTab>
                <AXTab value="data-display" badge="Table/Badge" badgeColor="accent">Data Display</AXTab>
                <AXTab value="overlays" badge="Modal/Drawer" badgeColor="accent">Overlays</AXTab>
                <AXTab value="feedback" badge="Toast/Alert" badgeColor="accent">Feedback</AXTab>
                <AXTab value="typography">Typography & Layout</AXTab>
                <AXTab value="card">AXCard</AXTab>
                <AXTab value="accordion">AXAccordion</AXTab>
                <AXTab value="tabs">AXTabs</AXTab>
                <AXTab value="button">AXButton</AXTab>
              </AXTabsList>
            </AXTabs>
          </div>
        </div>

        {/* Section: Typography & Layout */}
        {(activeTab === 'all' || activeTab === 'typography') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                Typography & Layout Primitives
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Semantic Headings (h1-h6), versatile Text scales, interactive Links, Containers, Flex, Stack, and Grid primitives.
              </p>
            </div>
            <TypographyLayoutSamples />
          </section>
        )}

        {/* Section: AXInputs */}
        {(activeTab === 'all' || activeTab === 'inputs') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXInputs Form Controls Suite
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Modular text inputs, textarea with counter, custom checkboxes, radio cards, toggle switches, tags input, selects, and connected input groups.
              </p>
            </div>
            <InputSamples />
          </section>
        )}

        {/* Section: AXDatePicker */}
        {(activeTab === 'all' || activeTab === 'date-picker') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXDatePicker & Calendar Suite
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Single and dual-range picker with quick presets, integrated time picker, and fast 12-month / 12-year jump matrix selectors.
              </p>
            </div>
            <DatePickerSamples />
          </section>
        )}

        {/* Section: Data Display */}
        {(activeTab === 'all' || activeTab === 'data-display') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                Data Display & Surfaces
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Interactive AXDataTable with sort & selection, AXPagination, AXBadge status tags, and AXAvatar / AvatarGroups.
              </p>
            </div>
            <DataDisplaySamples />
          </section>
        )}

        {/* Section: Overlays */}
        {(activeTab === 'all' || activeTab === 'overlays') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                Overlays, Disclosures & Dialogs
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                AXDialog modal windows, AXDrawer slide-over sheets, AXDropdown menus, AXTooltip, and AXPopover flyouts.
              </p>
            </div>
            <OverlaySamples />
          </section>
        )}

        {/* Section: Feedback */}
        {(activeTab === 'all' || activeTab === 'feedback') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                Feedback & Status Components
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                AXAlert notification banners, global AXToast system with useToast hook, AXSpinner, AXProgress, AXSkeleton, and AXEmptyState.
              </p>
            </div>
            <FeedbackSamples />
          </section>
        )}

        {/* Section: AXCard */}
        {(activeTab === 'all' || activeTab === 'card') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXCard Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Standardized Header (Left/Right), Body, Footer (Left/Right), 7 sizes, 6 surface variants, and skeleton loading shimmer.
              </p>
            </div>
            <CardSamples />
          </section>
        )}

        {/* Section: AXAccordion */}
        {(activeTab === 'all' || activeTab === 'accordion') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXAccordion Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Hardware-accelerated CSS Grid row fraction interpolation (0fr to 1fr), 4 variants, single/multiple expansion, and WAI-ARIA keyboard navigation.
              </p>
            </div>
            <AccordionSamples />
          </section>
        )}

        {/* Section: AXTabs */}
        {(activeTab === 'all' || activeTab === 'tabs') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXTabs Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Sliding active indicator, 4 visual variants (Line, Pill, Card, Soft), vertical/horizontal orientations, and WAI-ARIA keyboard navigation.
              </p>
            </div>
            <TabsSamples />
          </section>
        )}

        {/* Section: AXButton */}
        {(activeTab === 'all' || activeTab === 'button') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXButton Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Zero runtime overhead, scoped CSS variables, 5 sizes, 5 variants, 9 themes, and zero-CLS loading.
              </p>
            </div>
            <ButtonSamples />
          </section>
        )}

        {/* Section: AXPopover */}
        {(activeTab === 'all' || activeTab === 'popover') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXPopover Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                React Portals with absolute zero-collision z-index hierarchy and smart boundary collision flipping.
              </p>
            </div>
            <PopoverSamples />
          </section>
        )}

        {/* Section: AXPageHeader */}
        {(activeTab === 'all' || activeTab === 'header') && (
          <section className="ax-flex ax-flex-col ax-gap-4">
            <div>
              <h2 className="ax-text-xl ax-font-bold ax-text-primary ax-m-0">
                AXPageHeader Component
              </h2>
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Clean header surface with breadcrumbs, status indicators, and action slots.
              </p>
            </div>
            <PageHeaderSamples />
          </section>
        )}
      </div>
    </>
  );
};

export default SamplesPage;

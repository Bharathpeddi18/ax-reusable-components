'use client';

import React, { useState } from 'react';
import {
  AXAccordion,
  AXAccordionItem,
  AXAccordionTrigger,
  AXAccordionContent,
  AXAccordionVariant,
  AXAccordionSize,
  AXAccordionItemData,
} from '@/components/ax-accordion/ax-accordion';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  SettingsIcon,
  DocumentIcon,
  ShareIcon,
  BellIcon,
  CubeIcon,
  SparklesIcon,
  CheckIcon,
  PlusIcon,
} from '@/assets/icons';

export const AccordionSamples: React.FC = () => {
  const [controlledValue, setControlledValue] = useState<string | string[]>('item-1');

  const variants: { variant: AXAccordionVariant; label: string; desc: string }[] = [
    {
      variant: 'contained',
      label: '1. Contained / Card Variant (Default)',
      desc: 'Independent card blocks with rounded borders, hover highlights, and elevated shadow on expand. Catalyst/Stripe style.',
    },
    {
      variant: 'flush',
      label: '2. Flush Variant (Minimal Dividers)',
      desc: 'Clean horizontal divider lines without outer box frames. GitHub & Linear style.',
    },
    {
      variant: 'bordered',
      label: '3. Bordered Variant (Enclosed Box)',
      desc: 'Single unified outer rounded frame with interior divider borders. Ant Design style.',
    },
    {
      variant: 'filled',
      label: '4. Filled / Soft Variant (Surface Tinted)',
      desc: 'Soft tinted header surfaces with clean collapsible body container.',
    },
  ];

  const sizes: AXAccordionSize[] = ['sm', 'md', 'lg'];

  // Shorthand items data
  const faqItems: AXAccordionItemData[] = [
    {
      key: 'faq-1',
      title: 'How does zero-runtime CSS styling work?',
      subtitle: 'Performance architecture & CSS variables',
      icon: <SparklesIcon size={18} />,
      badge: 'Architecture',
      badgeColor: 'accent',
      content:
        'AstraX components compile to static CSS variables without injecting styles at runtime. This eliminates style recalculation jank and achieves instantaneous First Contentful Paint (FCP).',
    },
    {
      key: 'faq-2',
      title: 'Is this component WCAG 2.1 AA and Section 508 compliant?',
      subtitle: 'Accessibility & Keyboard navigation specifications',
      icon: <CheckIcon size={18} />,
      badge: 'WCAG AAA',
      badgeColor: 'success',
      content:
        'Yes! Every accordion item integrates semantic heading structures (h1-h6), aria-expanded, aria-controls, and full roving keyboard navigation (ArrowUp, ArrowDown, Home, End).',
    },
    {
      key: 'faq-3',
      title: 'Can multiple sections stay open simultaneously?',
      subtitle: 'Multi-expansion configuration mode',
      icon: <DocumentIcon size={18} />,
      badge: 'Feature',
      content:
        'Set type="multiple" on the root <AXAccordion /> component to allow users to keep any number of panels expanded concurrently.',
    },
    {
      key: 'faq-4',
      title: 'How are vector icons rendered?',
      subtitle: 'Unified SVG Sprite caching system',
      icon: <CubeIcon size={18} />,
      disabled: true,
      content:
        'All icons are pulled directly from /sprite.svg with SVG <use>, consuming 0 JavaScript bundle size and caching in the browser.',
    },
  ];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* 1. All 4 Visual Variants */}
      {variants.map(({ variant, label, desc }) => (
        <div
          key={variant}
          className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4"
        >
          <div>
            <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2 ax-py-0.5 ax-bg-surface-secondary ax-rounded ax-text-xs ax-font-medium ax-text-primary ax-mb-1">
              Variant: {variant.toUpperCase()}
            </div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">{label}</h3>
            <p className="ax-text-xs ax-text-secondary ax-mt-1">{desc}</p>
          </div>

          <AXAccordion defaultValue="sec-1" variant={variant}>
            <AXAccordionItem value="sec-1">
              <AXAccordionTrigger
                startIcon={<SettingsIcon size={18} />}
                subtitle="Organization workspace settings and preferences"
                badge="Active"
                badgeColor="success"
              >
                Workspace Configuration
              </AXAccordionTrigger>
              <AXAccordionContent>
                <div className="ax-flex ax-flex-col ax-gap-2">
                  <p className="ax-m-0">
                    Manage your team members, workspace vanity URLs, default timezones, and audit log retentions.
                  </p>
                  <div className="ax-flex ax-items-center ax-gap-2 ax-pt-2">
                    <AXButton size="xs" color="primary" label="Save Changes" />
                    <AXButton size="xs" variant="text" label="Cancel" />
                  </div>
                </div>
              </AXAccordionContent>
            </AXAccordionItem>

            <AXAccordionItem value="sec-2">
              <AXAccordionTrigger
                startIcon={<DocumentIcon size={18} />}
                subtitle="API keys, webhooks, and third-party integrations"
                badge="3 Keys"
              >
                API Tokens & Webhooks
              </AXAccordionTrigger>
              <AXAccordionContent>
                <p className="ax-m-0">
                  Generate secure personal access tokens with custom scopes and configure HTTPS webhook endpoints.
                </p>
              </AXAccordionContent>
            </AXAccordionItem>

            <AXAccordionItem value="sec-3">
              <AXAccordionTrigger
                startIcon={<ShareIcon size={18} />}
                subtitle="Cloud telemetry, database mirrors, and uptime"
              >
                Telemetry & Infrastructure
              </AXAccordionTrigger>
              <AXAccordionContent>
                <p className="ax-m-0">
                  Live metrics streaming from distributed edge nodes across 35 regions.
                </p>
              </AXAccordionContent>
            </AXAccordionItem>
          </AXAccordion>
        </div>
      ))}

      {/* 2. Expansion Mode Comparison: Single vs Multiple */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            5. Multiple Simultaneous Expansion Mode (`type="multiple"`)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Allows users to keep multiple sections open at the same time without auto-collapsing previous sections.
          </p>
        </div>

        <AXAccordion type="multiple" defaultValue={['multi-1', 'multi-2']} variant="contained">
          <AXAccordionItem value="multi-1">
            <AXAccordionTrigger startIcon={<CubeIcon size={18} />}>
              Section A: Database Clusters
            </AXAccordionTrigger>
            <AXAccordionContent>
              Primary PostgreSQL instance with automatic failover replicas in us-east-1 and eu-west-1.
            </AXAccordionContent>
          </AXAccordionItem>

          <AXAccordionItem value="multi-2">
            <AXAccordionTrigger startIcon={<BellIcon size={18} />} badge="Alert" badgeColor="danger">
              Section B: Priority Alerts
            </AXAccordionTrigger>
            <AXAccordionContent>
              High memory utilization warning detected on Redis caching layer.
            </AXAccordionContent>
          </AXAccordionItem>

          <AXAccordionItem value="multi-3">
            <AXAccordionTrigger startIcon={<SettingsIcon size={18} />}>
              Section C: System Upgrades
            </AXAccordionTrigger>
            <AXAccordionContent>
              Zero-downtime rolling updates scheduled for tonight at 02:00 UTC.
            </AXAccordionContent>
          </AXAccordionItem>
        </AXAccordion>
      </div>

      {/* 3. Size Progression: SM, MD, LG */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            6. Size Presets (SM, MD, LG)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Standardized size presets adapting header padding, font scale, and body line heights.
          </p>
        </div>

        <div className="ax-flex ax-flex-col ax-gap-4">
          {sizes.map((sz) => (
            <div key={sz} className="ax-flex ax-flex-col ax-gap-1">
              <span className="ax-text-xs ax-font-semibold ax-text-secondary">
                Size Preset: <code className="ax-text-primary">{sz.toUpperCase()}</code>
              </span>
              <AXAccordion defaultValue="item" size={sz} variant="bordered">
                <AXAccordionItem value="item">
                  <AXAccordionTrigger startIcon={<SparklesIcon size={sz === 'sm' ? 14 : sz === 'md' ? 16 : 18} />}>
                    Accordion Header ({sz.toUpperCase()})
                  </AXAccordionTrigger>
                  <AXAccordionContent>
                    Content body padding and typography automatically scaled to {sz} specifications.
                  </AXAccordionContent>
                </AXAccordionItem>
              </AXAccordion>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Chevron Positioning Options */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            7. Chevron Indicator Positioning (`left`, `right`, `none`)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Configure the indicator alignment to the left side or right edge, or remove it entirely.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-4">
          <div className="ax-p-3 ax-border ax-border-default ax-rounded-lg">
            <span className="ax-text-xs ax-font-semibold ax-text-secondary ax-mb-2 ax-block">
              Left Chevron (`chevronPosition="left"`):
            </span>
            <AXAccordion defaultValue="left" chevronPosition="left" variant="contained">
              <AXAccordionItem value="left">
                <AXAccordionTrigger>Left Aligned Indicator</AXAccordionTrigger>
                <AXAccordionContent>Chevron arrow is anchored before the text label.</AXAccordionContent>
              </AXAccordionItem>
            </AXAccordion>
          </div>

          <div className="ax-p-3 ax-border ax-border-default ax-rounded-lg">
            <span className="ax-text-xs ax-font-semibold ax-text-secondary ax-mb-2 ax-block">
              Right Chevron (`chevronPosition="right"`):
            </span>
            <AXAccordion defaultValue="right" chevronPosition="right" variant="contained">
              <AXAccordionItem value="right">
                <AXAccordionTrigger>Right Aligned Indicator</AXAccordionTrigger>
                <AXAccordionContent>Chevron arrow is anchored at the far right edge.</AXAccordionContent>
              </AXAccordionItem>
            </AXAccordion>
          </div>
        </div>
      </div>

      {/* 5. Concise Data-Driven Shorthand API */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            8. Concise Data-Driven Shorthand API (`items=&#123;[...]&#125;`)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1">
            Declarative setup for FAQs, help centers, and documentation without writing manual JSX trees.
          </p>
        </div>

        <AXAccordion items={faqItems} variant="contained" type="single" defaultValue="faq-1" />
      </div>
    </div>
  );
};

export default AccordionSamples;

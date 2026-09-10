'use client';

import React from 'react';
import { AXHeading, AXText, AXLink } from '../components/ax-typography';
import { AXFlex, AXStack, AXGrid } from '../components/ax-layout';
import { AXCard } from '../components/ax-card';
import { AXBadge } from '../components/ax-badge';

export const TypographyLayoutSamples: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Typography Section */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Typography Components</AXHeading>
            <AXText color="secondary" size="sm">
              Semantic headings, versatile body text, and interactive links with fluid scale.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="lg">
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                Heading Scale (h1 to h6)
              </AXHeading>
              <AXStack gap="sm">
                <AXHeading as="h1">Heading 1 - Display Title (36px)</AXHeading>
                <AXHeading as="h2">Heading 2 - Section Header (30px)</AXHeading>
                <AXHeading as="h3">Heading 3 - Subsection Header (24px)</AXHeading>
                <AXHeading as="h4">Heading 4 - Card Header (20px)</AXHeading>
                <AXHeading as="h5">Heading 5 - Subtitle (18px)</AXHeading>
                <AXHeading as="h6">Heading 6 - Caption Title (16px)</AXHeading>
              </AXStack>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle, #e2e8f0)', paddingTop: '1.5rem' }}>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                Body Text Variants & Colors
              </AXHeading>
              <AXStack gap="xs">
                <AXText size="xl" weight="bold">XL Text - Bold (20px)</AXText>
                <AXText size="lg" weight="semibold">LG Text - Semibold (18px)</AXText>
                <AXText size="md" color="primary">MD Text - Primary Default (16px)</AXText>
                <AXText size="sm" color="secondary">SM Text - Secondary Muted (14px)</AXText>
                <AXText size="xs" color="muted">XS Text - Muted Meta (12px)</AXText>
                <AXText color="success">Success colored message body</AXText>
                <AXText color="danger">Danger colored warning message</AXText>
              </AXStack>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle, #e2e8f0)', paddingTop: '1.5rem' }}>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                Interactive Links
              </AXHeading>
              <AXFlex gap="lg" align="center">
                <AXLink href="#default">Standard Link</AXLink>
                <AXLink href="#subtle" variant="subtle">Subtle Link</AXLink>
                <AXLink href="#hover" variant="hover-underline">Hover Underline Link</AXLink>
                <AXLink href="https://example.com" external>
                  External Link
                </AXLink>
              </AXFlex>
            </div>
          </AXStack>
        }
      />

      {/* Layout Section */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Layout Primitives</AXHeading>
            <AXText color="secondary" size="sm">
              Container, Flex, Stack, and responsive Grid components.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="xl">
            {/* Flex */}
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXFlex (Justify Between & Align Center)
              </AXHeading>
              <AXFlex
                justify="between"
                align="center"
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-secondary, #f8fafc)',
                  borderRadius: '8px'
                }}
              >
                <AXText weight="semibold">Flex Left Item</AXText>
                <AXFlex gap="sm">
                  <AXBadge variant="primary">Badge 1</AXBadge>
                  <AXBadge variant="success">Badge 2</AXBadge>
                  <AXBadge variant="warning">Badge 3</AXBadge>
                </AXFlex>
              </AXFlex>
            </div>

            {/* Grid */}
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXGrid (Responsive 4-Column Layout)
              </AXHeading>
              <AXGrid cols="4" gap="md">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--color-bg-secondary, #f8fafc)',
                      border: '1px solid var(--color-border-subtle, #e2e8f0)',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    <AXText weight="bold">Column {item}</AXText>
                    <AXText size="xs" color="secondary">Grid Child Span 1</AXText>
                  </div>
                ))}
              </AXGrid>
            </div>

            {/* Stack with Dividers */}
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXStack (Vertical with Dividers)
              </AXHeading>
              <AXStack
                gap="md"
                divider
                style={{
                  padding: '1rem',
                  border: '1px solid var(--color-border-subtle, #e2e8f0)',
                  borderRadius: '8px'
                }}
              >
                <div>
                  <AXText weight="semibold">Stack Item 1</AXText>
                  <AXText size="xs" color="secondary">Description for item 1</AXText>
                </div>
                <div>
                  <AXText weight="semibold">Stack Item 2</AXText>
                  <AXText size="xs" color="secondary">Description for item 2</AXText>
                </div>
                <div>
                  <AXText weight="semibold">Stack Item 3</AXText>
                  <AXText size="xs" color="secondary">Description for item 3</AXText>
                </div>
              </AXStack>
            </div>
          </AXStack>
        }
      />
    </div>
  );
};

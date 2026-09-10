'use client';

import React, { useState } from 'react';
import { AXAlert } from '../components/ax-alert';
import { ToastProvider, useToast } from '../components/ax-toast';
import { AXSpinner } from '../components/ax-spinner';
import { AXSkeleton, AXSkeletonText } from '../components/ax-skeleton';
import { AXProgress, AXProgressCircle } from '../components/ax-progress';
import { AXEmptyState } from '../components/ax-empty-state';
import { AXCard } from '../components/ax-card';
import { AXHeading, AXText } from '../components/ax-typography';
import { AXFlex, AXStack, AXGrid } from '../components/ax-layout';
import { AXButton } from '../components/ax-button';
import { AXIcon } from '../assets/icons';

const ToastTriggers: React.FC = () => {
  const toast = useToast();

  return (
    <AXFlex gap="md" wrap="wrap">
      <AXButton
        variant="contained"
        color="primary"
        onClick={() => toast.success('Changes Saved!', 'Your workspace settings have been synchronized.')}
      >
        Success Toast
      </AXButton>
      <AXButton
        variant="contained"
        color="danger"
        onClick={() => toast.error('Connection Failed', 'Unable to reach the cluster database.')}
      >
        Error Toast
      </AXButton>
      <AXButton
        variant="contained"
        color="warning"
        onClick={() => toast.warning('Storage Low', '92% of your cluster disk quota is currently used.')}
      >
        Warning Toast
      </AXButton>
      <AXButton
        variant="soft"
        color="primary"
        onClick={() => toast.info('New Update Available', 'Version 3.4 is ready for deployment.')}
      >
        Info Toast
      </AXButton>
    </AXFlex>
  );
};

export const FeedbackSamples: React.FC = () => {
  const [progressVal] = useState(68);

  return (
    <ToastProvider defaultPosition="top-right">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Alerts */}
        <AXCard
          header={
            <div>
              <AXHeading as="h3">Alert Banners</AXHeading>
              <AXText color="secondary" size="sm">
                Contextual feedback banners with titles, descriptions, and actions.
              </AXText>
            </div>
          }
          body={
            <AXStack gap="md">
              <AXAlert
                variant="info"
                title="System Maintenance"
                description="Routine database indexing is scheduled for Sunday at 02:00 UTC."
                dismissible
              />
              <AXAlert
                variant="success"
                title="Deployment Successful"
                description="All 14 microservices have passed automated verification tests."
                dismissible
              />
              <AXAlert
                variant="warning"
                title="API Rate Limit Warning"
                description="You have consumed 85% of your hourly request quota."
                dismissible
              />
              <AXAlert
                variant="danger"
                title="Critical Security Patch Available"
                description="Immediate update required to patch vulnerability CVE-2026-9041."
                action={
                  <AXButton variant="contained" color="danger" size="xs">
                    Apply Patch Now
                  </AXButton>
                }
              />
            </AXStack>
          }
        />

        {/* Toasts */}
        <AXCard
          header={
            <div>
              <AXHeading as="h3">Toast Notifications</AXHeading>
              <AXText color="secondary" size="sm">
                Global non-disruptive notifications triggered via custom hook `useToast()`.
              </AXText>
            </div>
          }
          body={
            <AXStack gap="lg">
              <ToastTriggers />
            </AXStack>
          }
        />

        {/* Progress & Spinners */}
        <AXCard
          header={
            <div>
              <AXHeading as="h3">Progress & Loaders</AXHeading>
              <AXText color="secondary" size="sm">
                Linear progress bars, circular meters, and hardware-accelerated spinners.
              </AXText>
            </div>
          }
          body={
            <AXStack gap="xl">
              <div>
                <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                  Linear Progress
                </AXHeading>
                <AXStack gap="md">
                  <AXProgress value={progressVal} label="Deployment Progress" showLabel variant="primary" />
                  <AXProgress value={85} variant="success" striped animated />
                  <AXProgress value={45} variant="warning" />
                  <AXProgress indeterminate variant="info" label="Indeterminate Sync" />
                </AXStack>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle, #e2e8f0)', paddingTop: '1.5rem' }}>
                <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                  Circular Progress & Spinners
                </AXHeading>
                <AXFlex gap="xl" align="center" wrap="wrap">
                  <AXProgressCircle value={progressVal} size={84} variant="primary" />
                  <AXProgressCircle value={92} size={84} variant="success" />
                  <AXProgressCircle value={35} size={84} variant="danger" />
                  <AXSpinner size="sm" variant="primary" label="Loading SM" />
                  <AXSpinner size="md" variant="success" label="Processing MD" />
                  <AXSpinner size="lg" variant="primary" />
                </AXFlex>
              </div>
            </AXStack>
          }
        />

        {/* Skeleton Placeholders */}
        <AXCard
          header={
            <div>
              <AXHeading as="h3">Skeleton Loaders</AXHeading>
              <AXText color="secondary" size="sm">
                Shimmering placeholders matching real layout components.
              </AXText>
            </div>
          }
          body={
            <AXGrid cols="2" gap="lg">
              <AXStack gap="md">
                <AXFlex gap="md" align="center">
                  <AXSkeleton variant="circular" width={48} height={48} />
                  <div style={{ flex: 1 }}>
                    <AXSkeleton variant="text" width="60%" height={16} />
                    <AXSkeleton variant="text" width="40%" height={12} />
                  </div>
                </AXFlex>
                <AXSkeletonText lines={3} />
              </AXStack>

              <AXStack gap="md">
                <AXSkeleton variant="rounded" width="100%" height={120} />
                <AXSkeleton variant="text" width="80%" height={16} />
              </AXStack>
            </AXGrid>
          }
        />

        {/* Empty States */}
        <AXCard
          header={
            <div>
              <AXHeading as="h3">Empty State</AXHeading>
              <AXText color="secondary" size="sm">
                Illustrated fallback placeholder for initial or zero-data screens.
              </AXText>
            </div>
          }
          body={
            <AXEmptyState
              icon={<AXIcon name="inbox" size={36} />}
              title="No active deploy pipelines"
              description="Create a new workflow configuration to start continuous delivery for your repositories."
              action={<AXButton variant="contained" color="primary">Create First Pipeline</AXButton>}
              secondaryAction={<AXButton variant="outlined" color="secondary">Import YAML</AXButton>}
            />
          }
        />
      </div>
    </ToastProvider>
  );
};

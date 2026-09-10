'use client';

import React, { useState } from 'react';
import { AXTooltip } from '../components/ax-tooltip';
import { AXPopover } from '../components/ax-popover';
import { AXDropdown, AXDropdownItem, AXDropdownDivider, AXDropdownHeader } from '../components/ax-dropdown';
import { AXDialog } from '../components/ax-dialog';
import { AXDrawer } from '../components/ax-drawer';
import { AXButton } from '../components/ax-button';
import { AXCard } from '../components/ax-card';
import { AXHeading, AXText } from '../components/ax-typography';
import { AXFlex, AXStack } from '../components/ax-layout';
import { AXIcon } from '../assets/icons';

export const OverlaySamples: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSize, setDialogSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<'right' | 'left' | 'top' | 'bottom'>('right');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Tooltips & Popovers */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Tooltips & Popovers</AXHeading>
            <AXText color="secondary" size="sm">
              Non-blocking floating overlays with smart arrow positioning.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="lg">
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXTooltip Placements & Themes
              </AXHeading>
              <AXFlex gap="md" wrap="wrap">
                <AXTooltip content="Helpful tooltip on Top" placement="top">
                  <AXButton variant="outlined" color="secondary">Top Tooltip</AXButton>
                </AXTooltip>
                <AXTooltip content="Helpful tooltip on Bottom" placement="bottom">
                  <AXButton variant="outlined" color="secondary">Bottom Tooltip</AXButton>
                </AXTooltip>
                <AXTooltip content="Helpful tooltip on Left" placement="left">
                  <AXButton variant="outlined" color="secondary">Left Tooltip</AXButton>
                </AXTooltip>
                <AXTooltip content="Helpful tooltip on Right" placement="right">
                  <AXButton variant="outlined" color="secondary">Right Tooltip</AXButton>
                </AXTooltip>
                <AXTooltip content="Light theme tooltip" theme="light" placement="top">
                  <AXButton variant="soft" color="primary">Light Tooltip</AXButton>
                </AXTooltip>
              </AXFlex>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle, #e2e8f0)', paddingTop: '1.5rem' }}>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXPopover (Rich Content Flyouts)
              </AXHeading>
              <AXFlex gap="md" wrap="wrap">
                <AXPopover
                  title="Quick Settings"
                  placement="bottom"
                  content={
                    <AXStack gap="sm" style={{ width: '220px' }}>
                      <AXText size="xs" color="secondary">Manage your quick preferences</AXText>
                      <AXFlex justify="between" align="center">
                        <AXText size="sm">Notifications</AXText>
                        <AXText size="xs" color="accent" weight="semibold">Enabled</AXText>
                      </AXFlex>
                      <AXFlex justify="between" align="center">
                        <AXText size="sm">Dark Mode</AXText>
                        <AXText size="xs" color="secondary">Auto</AXText>
                      </AXFlex>
                    </AXStack>
                  }
                >
                  <AXButton variant="contained" color="primary" startIcon={<AXIcon name="settings" size={16} />}>
                    Open Popover
                  </AXButton>
                </AXPopover>
              </AXFlex>
            </div>
          </AXStack>
        }
      />

      {/* Dropdown Menus */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Action Dropdowns</AXHeading>
            <AXText color="secondary" size="sm">
              Context menus with icons, headers, dividers, and disabled states.
            </AXText>
          </div>
        }
        body={
          <AXFlex gap="lg" wrap="wrap">
            <AXDropdown
              trigger={
                <AXButton variant="contained" color="primary" endIcon={<AXIcon name="chevron-down" size={16} />}>
                  User Actions
                </AXButton>
              }
            >
              <AXDropdownHeader>Signed in as dev@astrax.com</AXDropdownHeader>
              <AXDropdownItem icon={<AXIcon name="user" size={16} />}>Profile</AXDropdownItem>
              <AXDropdownItem icon={<AXIcon name="settings" size={16} />}>Settings</AXDropdownItem>
              <AXDropdownItem icon={<AXIcon name="calendar" size={16} />}>Schedules</AXDropdownItem>
              <AXDropdownDivider />
              <AXDropdownItem icon={<AXIcon name="external-link" size={16} />}>Help & Docs</AXDropdownItem>
              <AXDropdownDivider />
              <AXDropdownItem danger icon={<AXIcon name="trash-2" size={16} />}>
                Delete Account
              </AXDropdownItem>
            </AXDropdown>

            <AXDropdown
              trigger={
                <AXButton variant="outlined" color="secondary" startIcon={<AXIcon name="more-horizontal" size={18} />} />
              }
            >
              <AXDropdownItem>Duplicate Record</AXDropdownItem>
              <AXDropdownItem>Export to CSV</AXDropdownItem>
              <AXDropdownItem disabled>Archive (Locked)</AXDropdownItem>
            </AXDropdown>
          </AXFlex>
        }
      />

      {/* Dialogs & Drawers */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Modals & Drawers</AXHeading>
            <AXText color="secondary" size="sm">
              Accessible dialog windows with backdrop blur and slide-out sheets.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="lg">
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXDialog / AXModal
              </AXHeading>
              <AXFlex gap="md" wrap="wrap">
                <AXButton
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setDialogSize('sm');
                    setDialogOpen(true);
                  }}
                >
                  Open Small Dialog
                </AXButton>
                <AXButton
                  variant="soft"
                  color="primary"
                  onClick={() => {
                    setDialogSize('md');
                    setDialogOpen(true);
                  }}
                >
                  Open Standard Dialog
                </AXButton>
                <AXButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDialogSize('lg');
                    setDialogOpen(true);
                  }}
                >
                  Open Large Dialog
                </AXButton>
              </AXFlex>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle, #e2e8f0)', paddingTop: '1.5rem' }}>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>
                AXDrawer / Slide Sheet
              </AXHeading>
              <AXFlex gap="md" wrap="wrap">
                <AXButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDrawerPlacement('right');
                    setDrawerOpen(true);
                  }}
                >
                  Slide from Right
                </AXButton>
                <AXButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDrawerPlacement('left');
                    setDrawerOpen(true);
                  }}
                >
                  Slide from Left
                </AXButton>
                <AXButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setDrawerPlacement('bottom');
                    setDrawerOpen(true);
                  }}
                >
                  Slide from Bottom
                </AXButton>
              </AXFlex>
            </div>
          </AXStack>
        }
      />

      {/* Interactive Dialog Instance */}
      <AXDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        size={dialogSize}
        title="Confirm System Upgrade"
        description="Please review the changes before applying this operation."
        footer={
          <>
            <AXButton variant="outlined" color="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </AXButton>
            <AXButton variant="contained" color="primary" onClick={() => setDialogOpen(false)}>
              Confirm & Save
            </AXButton>
          </>
        }
      >
        <AXStack gap="md">
          <AXText size="sm">
            This action will synchronize all data tables across production microservices.
            The operation takes less than a second and does not cause downtime.
          </AXText>
          <div
            style={{
              padding: '0.875rem',
              backgroundColor: 'var(--color-bg-secondary, #f8fafc)',
              borderRadius: '6px',
              border: '1px solid var(--color-border-subtle, #e2e8f0)'
            }}
          >
            <AXText size="xs" weight="semibold" color="primary">
              All active sessions will remain uninterrupted.
            </AXText>
          </div>
        </AXStack>
      </AXDialog>

      {/* Interactive Drawer Instance */}
      <AXDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement={drawerPlacement}
        title="Configuration Drawer"
        description="Customize contextual parameters and live properties."
        footer={
          <AXFlex justify="end" gap="sm">
            <AXButton variant="outlined" color="secondary" onClick={() => setDrawerOpen(false)}>
              Close
            </AXButton>
            <AXButton variant="contained" color="primary" onClick={() => setDrawerOpen(false)}>
              Apply Changes
            </AXButton>
          </AXFlex>
        }
      >
        <AXStack gap="lg">
          <AXText size="sm">
            Drawer sliding from the <strong>{drawerPlacement.toUpperCase()}</strong> of the viewport.
          </AXText>
          <AXText size="sm" color="secondary">
            Equipped with backdrop blur, focus lock, and escape key dismiss listener.
          </AXText>
        </AXStack>
      </AXDrawer>
    </div>
  );
};

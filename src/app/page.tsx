'use client';

import React from 'react';
import AXPageHeader from '@/components/ax-page-header/ax-page-header';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  AXPopover,
  AXPopoverTrigger,
  AXPopoverContent,
  AXPopoverHeader,
  AXPopoverBody,
  AXPopoverFooter,
} from '@/components/ax-popover/ax-popover';

const Dashboard = () => {
  return (
    <>
      <AXPageHeader
        title="Dashboard"
        actions={<span className="ax-text-xs ax-text-muted">v1.0.0 Production Ready</span>}
      />
      <div className="ax-p-6 ax-flex ax-flex-col ax-gap-8 ax-max-w-7xl">
        {/* Banner Card */}
        <div className="ax-p-8 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-items-center ax-justify-center ax-gap-3 ax-text-center">
          <h2 className="ax-text-2xl ax-font-bold ax-text-primary">
            AstraX World-Class Component System
          </h2>
          <p className="ax-text-secondary ax-max-w-2xl ax-text-sm ax-leading-relaxed">
            Engineered with React Portals for absolute zero-collision z-index hierarchy, smart viewport collision detection, multi-theme aesthetics, and complete size progressions.
          </p>
        </div>

        {/* 1. Popover Sizes Section */}
        <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <div className="ax-flex ax-flex-col ax-gap-1">
            <h3 className="ax-text-lg ax-font-semibold ax-text-primary">Popover Size Variants</h3>
            <p className="ax-text-xs ax-text-secondary">
              Available in <code className="ax-text-primary ax-font-mono">xs</code>, <code className="ax-text-primary ax-font-mono">sm</code>, <code className="ax-text-primary ax-font-mono">md</code>, <code className="ax-text-primary ax-font-mono">lg</code>, and <code className="ax-text-primary ax-font-mono">xl</code>.
            </p>
          </div>

          <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
            {/* XS Size */}
            <AXPopover size="xs" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" color="primary" label="Size XS (220px)" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Status XS" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Compact popover for micro-badges and quick info tags.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            {/* SM Size */}
            <AXPopover size="sm" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" color="secondary" label="Size SM (280px)" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Quick Actions (SM)" />
                <AXPopoverBody>
                  <p className="ax-text-sm ax-m-0">Ideal for notification summaries and quick inline helpers.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            {/* MD Size (Standard) */}
            <AXPopover size="md" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="md" variant="contained" color="primary" label="Size MD (340px Standard)" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="User Profile Settings" />
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-2">
                    <p className="ax-text-sm ax-text-secondary ax-m-0">
                      Standard size for forms, interactive user menus, and detailed filters.
                    </p>
                    <div className="ax-p-2 ax-bg-surface-secondary ax-rounded-lg ax-text-xs ax-font-medium">
                      Signed in as: <span className="ax-text-primary">alex@astrax.io</span>
                    </div>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter>
                  <AXButton size="xs" variant="text" label="Cancel" />
                  <AXButton size="xs" variant="contained" color="primary" label="Save Changes" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>

            {/* LG Size */}
            <AXPopover size="lg" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="md" variant="outlined" color="accent" label="Size LG (440px)" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Advanced Filter Options" />
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-3">
                    <p className="ax-text-sm ax-text-secondary ax-m-0">
                      Spacious multi-row panel with plenty of room for complex controls.
                    </p>
                    <div className="ax-grid ax-grid-cols-2 ax-gap-2">
                      <div className="ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-text-xs">
                        <span className="ax-font-semibold">Date Range:</span> Last 30 Days
                      </div>
                      <div className="ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-text-xs">
                        <span className="ax-font-semibold">Region:</span> US-East (Virginia)
                      </div>
                    </div>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter>
                  <AXButton size="sm" variant="outlined" label="Reset" />
                  <AXButton size="sm" variant="contained" color="primary" label="Apply Filters" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>

            {/* XL Size */}
            <AXPopover size="xl" placement="bottom">
              <AXPopoverTrigger>
                <AXButton size="md" variant="contained" color="dark" label="Size XL (560px)" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Workspace Analytics & Telemetry" />
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-3">
                    <p className="ax-text-sm ax-text-secondary ax-m-0">
                      Extra large rich container for data tables, metrics cards, or multi-step wizard flows.
                    </p>
                    <div className="ax-grid ax-grid-cols-3 ax-gap-3">
                      <div className="ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-text-center">
                        <div className="ax-text-xs ax-text-muted">Requests</div>
                        <div className="ax-text-xl ax-font-bold ax-text-primary">1.2M</div>
                      </div>
                      <div className="ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-text-center">
                        <div className="ax-text-xs ax-text-muted">Latency</div>
                        <div className="ax-text-xl ax-font-bold ax-text-success">24ms</div>
                      </div>
                      <div className="ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-text-center">
                        <div className="ax-text-xs ax-text-muted">Uptime</div>
                        <div className="ax-text-xl ax-font-bold ax-text-primary">99.99%</div>
                      </div>
                    </div>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter>
                  <AXButton size="sm" variant="contained" color="primary" label="Export Report" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          </div>
        </div>

        {/* 2. Placements & Smart Collision Section */}
        <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <div className="ax-flex ax-flex-col ax-gap-1">
            <h3 className="ax-text-lg ax-font-semibold ax-text-primary">Dynamic Placements & Collision Detection</h3>
            <p className="ax-text-xs ax-text-secondary">
              Automatically flips and clamps to remain 100% visible inside the viewport on scroll and resize.
            </p>
          </div>

          <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
            <AXPopover placement="top" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" label="Placement: Top" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Top Placement" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Flips to bottom if reaching top viewport boundary.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover placement="bottom" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" label="Placement: Bottom" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Bottom Placement" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Flips to top if reaching bottom viewport boundary.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover placement="left" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" label="Placement: Left" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Left Placement" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Anchored to the left of the trigger element.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover placement="right" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" label="Placement: Right" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Right Placement" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Anchored to the right of the trigger element.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            {/* Hover Trigger */}
            <AXPopover trigger="hover" placement="top" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="soft" color="info" label="Trigger: Hover Me" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Opens instantly on hover with smooth bridge tracking.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>
          </div>
        </div>

        {/* 3. Theme Variants Section */}
        <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
          <div className="ax-flex ax-flex-col ax-gap-1">
            <h3 className="ax-text-lg ax-font-semibold ax-text-primary">Theme & Aesthetic Variants</h3>
            <p className="ax-text-xs ax-text-secondary">
              Supports <code className="ax-text-primary ax-font-mono">surface</code>, <code className="ax-text-primary ax-font-mono">dark</code>, <code className="ax-text-primary ax-font-mono">primary</code>, and <code className="ax-text-primary ax-font-mono">glass</code>.
            </p>
          </div>

          <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4">
            <AXPopover theme="surface" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" label="Theme: Surface" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Surface Theme" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Standard crisp enterprise white card.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover theme="dark" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="contained" color="dark" label="Theme: Dark" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Dark Charcoal Theme" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Sleek high-contrast dark popover with ambient shadow.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover theme="primary" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="contained" color="primary" label="Theme: Primary" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Primary Brand" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Deep sapphire brand popover.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>

            <AXPopover theme="glass" size="sm">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="outlined" color="accent" label="Theme: Glass" />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Frosted Glass" />
                <AXPopoverBody>
                  <p className="ax-text-xs ax-m-0">Modern glassmorphic panel with backdrop blur.</p>
                </AXPopoverBody>
              </AXPopoverContent>
            </AXPopover>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

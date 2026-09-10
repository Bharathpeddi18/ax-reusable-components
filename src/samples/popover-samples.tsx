'use client';

import React, { useState } from 'react';
import {
  AXPopover,
  AXPopoverTrigger,
  AXPopoverContent,
  AXPopoverHeader,
  AXPopoverTitle,
  AXPopoverBody,
  AXPopoverFooter,
  AXPopoverClose,
  AXPopoverPlacement,
  AXPopoverSize,
  AXPopoverTheme,
  AXPopoverTriggerMode,
} from '@/components/ax-popover/ax-popover';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  SparklesIcon,
  SettingsIcon,
  ShareIcon,
  BellIcon,
  CheckIcon,
  HeartIcon,
  EditIcon,
  FilterIcon,
  CloseIcon,
  ChevronDownIcon,
  CubeIcon,
  DocumentIcon,
  DownloadIcon,
} from '@/assets/icons';

interface ServerAsset {
  id: string;
  name: string;
  region: string;
  ip: string;
  cpu: string;
  memory: string;
  status: 'Healthy' | 'Warning' | 'Critical';
}

const SAMPLE_SERVER_DATA: ServerAsset[] = [
  { id: 'srv-01', name: 'us-east-cluster-primary', region: 'us-east-1', ip: '10.0.12.4', cpu: '24%', memory: '16.4 GB', status: 'Healthy' },
  { id: 'srv-02', name: 'us-east-cluster-backup', region: 'us-east-1', ip: '10.0.12.5', cpu: '12%', memory: '8.2 GB', status: 'Healthy' },
  { id: 'srv-03', name: 'eu-central-ingress-01', region: 'eu-central-1', ip: '10.2.44.18', cpu: '88%', memory: '31.2 GB', status: 'Warning' },
  { id: 'srv-04', name: 'eu-central-worker-pool', region: 'eu-central-1', ip: '10.2.44.19', cpu: '45%', memory: '24.0 GB', status: 'Healthy' },
  { id: 'srv-05', name: 'ap-south-gateway-01', region: 'ap-south-1', ip: '10.4.88.92', cpu: '96%', memory: '61.5 GB', status: 'Critical' },
  { id: 'srv-06', name: 'ap-south-cache-redis', region: 'ap-south-1', ip: '10.4.88.93', cpu: '38%', memory: '12.8 GB', status: 'Healthy' },
  { id: 'srv-07', name: 'ap-northeast-proxy-01', region: 'ap-northeast-1', ip: '10.6.14.3', cpu: '19%', memory: '4.1 GB', status: 'Healthy' },
  { id: 'srv-08', name: 'sa-east-database-replica', region: 'sa-east-1', ip: '10.8.21.7', cpu: '74%', memory: '48.0 GB', status: 'Warning' },
  { id: 'srv-09', name: 'us-west-gpu-training-01', region: 'us-west-2', ip: '10.1.99.11', cpu: '99%', memory: '124.0 GB', status: 'Healthy' },
  { id: 'srv-10', name: 'us-west-analytics-node', region: 'us-west-2', ip: '10.1.99.12', cpu: '52%', memory: '32.0 GB', status: 'Healthy' },
];

export const PopoverSamples: React.FC = () => {
  // Playground State
  const [playPlacement, setPlayPlacement] = useState<AXPopoverPlacement>('bottom');
  const [playTheme, setPlayTheme] = useState<AXPopoverTheme>('surface');
  const [playSize, setPlaySize] = useState<AXPopoverSize>('md');
  const [playTrigger, setPlayTrigger] = useState<AXPopoverTriggerMode>('click');
  const [playShowArrow, setPlayShowArrow] = useState(true);
  const [playOffset, setPlayOffset] = useState(8);

  // Controlled Demo State
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  // Filter Sample State
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['Active', 'Pending']);
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const placements: AXPopoverPlacement[] = [
    'top-start',
    'top',
    'top-end',
    'bottom-start',
    'bottom',
    'bottom-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
  ];

  const themes: { theme: AXPopoverTheme; label: string; desc: string }[] = [
    { theme: 'surface', label: 'Surface (Light)', desc: 'Clean white surface with ambient elevation shadow.' },
    { theme: 'dark', label: 'Dark Slate', desc: 'Ultra-sleek zinc/slate surface with crisp illuminated borders.' },
    { theme: 'primary', label: 'AstraX Navy', desc: 'Bold brand blue surface with high-contrast typography.' },
    { theme: 'glass', label: 'Glassmorphism', desc: '20px backdrop blur with specular light reflection.' },
  ];

  const sizes: AXPopoverSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'auto', 'full'];

  return (
    <div className="ax-flex ax-flex-col ax-gap-10 ax-w-full">
      {/* ====================================================================
          1. Interactive Live Playground & Configurator
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div className="ax-flex ax-items-center ax-justify-between ax-flex-wrap ax-gap-4">
          <div>
            <div className="ax-inline-flex ax-items-center ax-gap-2 ax-px-2.5 ax-py-1 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-semibold ax-text-primary ax-mb-1.5">
              <SparklesIcon size={14} /> Interactive Configurator
            </div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
              Live Popover Playground
            </h3>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Customize placement, theme, dimensions, and trigger interactions in real-time.
            </p>
          </div>
        </div>

        {/* Controls Grid */}
        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 lg:ax-grid-cols-4 ax-gap-4 ax-p-4 ax-bg-surface-secondary ax-rounded-xl">
          {/* Placement */}
          <div className="ax-flex ax-flex-col ax-gap-1.5">
            <label className="ax-text-xs ax-font-bold ax-text-primary">Placement</label>
            <select
              value={playPlacement}
              onChange={(e) => setPlayPlacement(e.target.value as AXPopoverPlacement)}
              className="ax-p-2 ax-text-xs ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-primary ax-outline-none"
            >
              {placements.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
              <option value="auto">auto (intelligent vertical)</option>
            </select>
          </div>

          {/* Theme */}
          <div className="ax-flex ax-flex-col ax-gap-1.5">
            <label className="ax-text-xs ax-font-bold ax-text-primary">Theme</label>
            <select
              value={playTheme}
              onChange={(e) => setPlayTheme(e.target.value as AXPopoverTheme)}
              className="ax-p-2 ax-text-xs ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-primary ax-outline-none"
            >
              <option value="surface">surface (light)</option>
              <option value="dark">dark (slate)</option>
              <option value="primary">primary (navy)</option>
              <option value="glass">glass (acrylic blur)</option>
            </select>
          </div>

          {/* Size */}
          <div className="ax-flex ax-flex-col ax-gap-1.5">
            <label className="ax-text-xs ax-font-bold ax-text-primary">Size Preset</label>
            <select
              value={playSize}
              onChange={(e) => setPlaySize(e.target.value as AXPopoverSize)}
              className="ax-p-2 ax-text-xs ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-primary ax-outline-none"
            >
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Trigger Mode */}
          <div className="ax-flex ax-flex-col ax-gap-1.5">
            <label className="ax-text-xs ax-font-bold ax-text-primary">Trigger Mode</label>
            <select
              value={playTrigger}
              onChange={(e) => setPlayTrigger(e.target.value as AXPopoverTriggerMode)}
              className="ax-p-2 ax-text-xs ax-bg-surface ax-border ax-border-default ax-rounded-lg ax-text-primary ax-outline-none"
            >
              <option value="click">click</option>
              <option value="hover">hover (zero-flicker bridge)</option>
              <option value="focus">focus</option>
            </select>
          </div>

          {/* Arrow Toggle & Offset */}
          <div className="ax-flex ax-items-center ax-gap-4 md:ax-col-span-2 lg:ax-col-span-4 ax-pt-2 ax-border-t ax-border-default">
            <label className="ax-inline-flex ax-items-center ax-gap-2 ax-text-xs ax-font-medium ax-text-primary ax-cursor-pointer">
              <input
                type="checkbox"
                checked={playShowArrow}
                onChange={(e) => setPlayShowArrow(e.target.checked)}
                className="ax-rounded"
              />
              <span>Show Directional Arrow</span>
            </label>

            <div className="ax-flex ax-items-center ax-gap-2">
              <span className="ax-text-xs ax-text-secondary">Offset:</span>
              <input
                type="range"
                min="0"
                max="24"
                value={playOffset}
                onChange={(e) => setPlayOffset(Number(e.target.value))}
                className="ax-w-28"
              />
              <span className="ax-text-xs ax-font-mono ax-text-primary">{playOffset}px</span>
            </div>
          </div>
        </div>

        {/* Live Canvas */}
        <div className="ax-p-16 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-dashed ax-border-default ax-flex ax-items-center ax-justify-center">
          <AXPopover
            placement={playPlacement}
            theme={playTheme}
            size={playSize}
            trigger={playTrigger}
            showArrow={playShowArrow}
            offset={playOffset}
          >
            <AXPopoverTrigger asChild>
              <AXButton
                variant="contained"
                color="primary"
                size="md"
                label={`Trigger Popover (${playTrigger})`}
                startIcon={<SparklesIcon size={16} />}
              />
            </AXPopoverTrigger>
            <AXPopoverContent>
              <AXPopoverHeader title="Playground Popover" />
              <AXPopoverBody>
                <p className="ax-m-0 ax-text-sm">
                  This popover is configured with:
                </p>
                <div className="ax-mt-2 ax-p-2.5 ax-bg-black/5 ax-rounded-lg ax-text-xs ax-font-mono ax-flex ax-flex-col ax-gap-1">
                  <div>placement: <b>{playPlacement}</b></div>
                  <div>theme: <b>{playTheme}</b></div>
                  <div>size: <b>{playSize}</b></div>
                  <div>trigger: <b>{playTrigger}</b></div>
                </div>
              </AXPopoverBody>
              <AXPopoverFooter align="between">
                <span className="ax-text-xs ax-opacity-70">AstraX System</span>
                <AXButton size="xs" variant="soft" label="Dismiss" />
              </AXPopoverFooter>
            </AXPopoverContent>
          </AXPopover>
        </div>
      </div>

      {/* ====================================================================
          2. Large Data Table Popover (Responsive Mobile & Desktop Scroll)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div className="ax-flex ax-items-center ax-justify-between ax-flex-wrap ax-gap-3">
          <div>
            <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-1 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
              📱 Mobile & Desktop Viewport Scroll
            </div>
            <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
              Large Data Table Popover with Sticky Header & Scroll
            </h3>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Handles multi-column tables with horizontal and vertical touch inertia scrolling, pinned headers, and fixed footer actions without breaking mobile screens.
            </p>
          </div>
        </div>

        <div className="ax-p-8 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-items-center ax-justify-center">
          <AXPopover size="xl" placement="bottom" maxHeight={380}>
            <AXPopoverTrigger>
              <AXButton
                size="md"
                variant="contained"
                color="primary"
                startIcon={<CubeIcon size={16} />}
                label="Open Cloud Cluster Inventory (10 Servers)"
              />
            </AXPopoverTrigger>
            <AXPopoverContent>
              <AXPopoverHeader title="Cloud Cluster Inventory" />
              <AXPopoverBody>
                <div className="ax-w-full ax-overflow-x-auto">
                  <table className="ax-w-full ax-text-left ax-text-xs ax-border-collapse ax-min-w-[520px]">
                    <thead>
                      <tr className="ax-border-b ax-border-default ax-text-secondary ax-font-semibold ax-bg-surface-secondary ax-sticky ax-top-0 ax-z-1">
                        <th className="ax-py-2 ax-px-3">Node Name</th>
                        <th className="ax-py-2 ax-px-3">Region</th>
                        <th className="ax-py-2 ax-px-3">IP Address</th>
                        <th className="ax-py-2 ax-px-3">CPU</th>
                        <th className="ax-py-2 ax-px-3">RAM</th>
                        <th className="ax-py-2 ax-px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="ax-divide-y ax-divide-default">
                      {SAMPLE_SERVER_DATA.map((srv) => (
                        <tr key={srv.id} className="hover:ax-bg-surface-secondary ax-transition-colors">
                          <td className="ax-py-2.5 ax-px-3 ax-font-medium ax-text-primary">
                            {srv.name}
                          </td>
                          <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-secondary">
                            {srv.region}
                          </td>
                          <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-muted">
                            {srv.ip}
                          </td>
                          <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-primary">
                            {srv.cpu}
                          </td>
                          <td className="ax-py-2.5 ax-px-3 ax-font-mono ax-text-secondary">
                            {srv.memory}
                          </td>
                          <td className="ax-py-2.5 ax-px-3">
                            <span
                              className={`ax-inline-flex ax-items-center ax-gap-1 ax-px-2 ax-py-0.5 ax-rounded-full ax-text-2xs ax-font-semibold ${
                                srv.status === 'Healthy'
                                  ? 'ax-bg-success-soft ax-text-success'
                                  : srv.status === 'Warning'
                                  ? 'ax-bg-warning-soft ax-text-warning'
                                  : 'ax-bg-danger-soft ax-text-danger'
                              }`}
                            >
                              <span
                                className={`ax-w-1.5 ax-h-1.5 ax-rounded-full ${
                                  srv.status === 'Healthy'
                                    ? 'ax-bg-success'
                                    : srv.status === 'Warning'
                                    ? 'ax-bg-warning'
                                    : 'ax-bg-danger'
                                }`}
                              />
                              {srv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AXPopoverBody>
              <AXPopoverFooter align="between">
                <span className="ax-text-xs ax-text-muted">Showing 10 of 10 clusters</span>
                <div className="ax-flex ax-items-center ax-gap-2">
                  <AXButton size="xs" variant="outlined" startIcon={<DownloadIcon size={12} />} label="Export CSV" />
                  <AXPopoverClose>
                    <AXButton size="xs" color="primary" label="Done" />
                  </AXPopoverClose>
                </div>
              </AXPopoverFooter>
            </AXPopoverContent>
          </AXPopover>
        </div>
      </div>

      {/* ====================================================================
          3. All 12 Spatial Cardinal Placements
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            12 Spatial Placements Matrix
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Test precision placement anchors across Top, Bottom, Left, and Right axes.
          </p>
        </div>

        <div className="ax-p-8 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-items-center ax-gap-6">
          {/* Top Row */}
          <div className="ax-flex ax-items-center ax-justify-center ax-gap-3 ax-flex-wrap">
            <AXPopover placement="top-start" size="sm" title="Placement: top-start" content="Aligned to the left start edge of the trigger.">
              <AXButton size="sm" variant="outlined" label="top-start" />
            </AXPopover>
            <AXPopover placement="top" size="sm" title="Placement: top" content="Centered directly above the trigger element.">
              <AXButton size="sm" variant="outlined" label="top" />
            </AXPopover>
            <AXPopover placement="top-end" size="sm" title="Placement: top-end" content="Aligned to the right end edge of the trigger.">
              <AXButton size="sm" variant="outlined" label="top-end" />
            </AXPopover>
          </div>

          {/* Middle Row (Left & Right) */}
          <div className="ax-flex ax-items-center ax-justify-between ax-w-full ax-max-w-xl ax-gap-4">
            <div className="ax-flex ax-flex-col ax-gap-3">
              <AXPopover placement="left-start" size="sm" title="Placement: left-start" content="Placed to the left, aligned to trigger top.">
                <AXButton size="sm" variant="outlined" label="left-start" />
              </AXPopover>
              <AXPopover placement="left" size="sm" title="Placement: left" content="Placed to the left, vertically centered.">
                <AXButton size="sm" variant="outlined" label="left" />
              </AXPopover>
              <AXPopover placement="left-end" size="sm" title="Placement: left-end" content="Placed to the left, aligned to trigger bottom.">
                <AXButton size="sm" variant="outlined" label="left-end" />
              </AXPopover>
            </div>

            <div className="ax-p-4 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-text-center ax-shadow-xs">
              <div className="ax-text-xs ax-font-bold ax-text-primary">Anchor Origin</div>
              <div className="ax-text-2xs ax-text-muted">Interactive Center</div>
            </div>

            <div className="ax-flex ax-flex-col ax-gap-3">
              <AXPopover placement="right-start" size="sm" title="Placement: right-start" content="Placed to the right, aligned to trigger top.">
                <AXButton size="sm" variant="outlined" label="right-start" />
              </AXPopover>
              <AXPopover placement="right" size="sm" title="Placement: right" content="Placed to the right, vertically centered.">
                <AXButton size="sm" variant="outlined" label="right" />
              </AXPopover>
              <AXPopover placement="right-end" size="sm" title="Placement: right-end" content="Placed to the right, aligned to trigger bottom.">
                <AXButton size="sm" variant="outlined" label="right-end" />
              </AXPopover>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="ax-flex ax-items-center ax-justify-center ax-gap-3 ax-flex-wrap">
            <AXPopover placement="bottom-start" size="sm" title="Placement: bottom-start" content="Aligned to the left start edge below the trigger.">
              <AXButton size="sm" variant="outlined" label="bottom-start" />
            </AXPopover>
            <AXPopover placement="bottom" size="sm" title="Placement: bottom" content="Centered directly below the trigger element.">
              <AXButton size="sm" variant="outlined" label="bottom" />
            </AXPopover>
            <AXPopover placement="bottom-end" size="sm" title="Placement: bottom-end" content="Aligned to the right end edge below the trigger.">
              <AXButton size="sm" variant="outlined" label="bottom-end" />
            </AXPopover>
          </div>
        </div>
      </div>

      {/* ====================================================================
          4. Visual Surface Themes Gallery
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Surface Aesthetic Themes
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Tailored visual themes with matching arrows, divider borders, and glassmorphism.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 lg:ax-grid-cols-4 ax-gap-4">
          {themes.map(({ theme, label, desc }) => (
            <div
              key={theme}
              className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-justify-between ax-gap-4"
            >
              <div>
                <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">{label}</h4>
                <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">{desc}</p>
              </div>

              <AXPopover theme={theme} size="sm" placement="top">
                <AXPopoverTrigger>
                  <AXButton
                    size="sm"
                    variant={theme === 'primary' ? 'contained' : 'outlined'}
                    color={theme === 'primary' ? 'primary' : 'secondary'}
                    label={`Preview ${theme}`}
                  />
                </AXPopoverTrigger>
                <AXPopoverContent>
                  <AXPopoverHeader title={`${label} Theme`} />
                  <AXPopoverBody>
                    <p className="ax-m-0 ax-text-xs">
                      Rendered using <code>theme="{theme}"</code> with synchronized borders & shadows.
                    </p>
                  </AXPopoverBody>
                  <AXPopoverFooter align="end">
                    <AXButton size="xs" variant="text" label="Action" />
                  </AXPopoverFooter>
                </AXPopoverContent>
              </AXPopover>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================
          5. Real-World Production Use-Cases
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-2xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Production-Ready Scenarios
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-m-0">
            Practical patterns for profile cards, interactive filter panels, hover cards, and confirmation alerts.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 lg:ax-grid-cols-3 ax-gap-5">
          {/* Scenario A: User Profile Card */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">User Profile Card</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Rich profile widget with status badge, stats, and navigation actions.
            </p>

            <AXPopover size="md" placement="bottom-start">
              <AXPopoverTrigger>
                <div className="ax-flex ax-items-center ax-gap-2.5 ax-p-2 ax-bg-surface ax-rounded-xl ax-border ax-border-default hover:ax-border-primary ax-transition-all">
                  <div className="ax-w-8 ax-height-8 ax-rounded-full ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center ax-text-xs ax-font-bold">
                    BP
                  </div>
                  <div className="ax-flex ax-flex-col ax-text-left">
                    <span className="ax-text-xs ax-font-bold ax-text-primary">Bharath Peddi</span>
                    <span className="ax-text-2xs ax-text-muted">Staff Architect</span>
                  </div>
                  <ChevronDownIcon size={14} className="ax-text-muted ax-ml-auto" />
                </div>
              </AXPopoverTrigger>
              <AXPopoverContent>
                <div className="ax-p-4 ax-flex ax-items-center ax-gap-3 ax-border-b ax-border-default">
                  <div className="ax-w-10 ax-height-10 ax-rounded-full ax-bg-primary ax-text-white ax-flex ax-items-center ax-justify-center ax-font-bold ax-text-sm">
                    BP
                  </div>
                  <div className="ax-flex ax-flex-col">
                    <span className="ax-text-sm ax-font-bold ax-text-primary">Bharath Peddi</span>
                    <span className="ax-text-xs ax-text-secondary">bharath@astrax.io</span>
                    <span className="ax-inline-flex ax-items-center ax-gap-1 ax-text-2xs ax-text-success ax-mt-0.5">
                      <span className="ax-w-1.5 ax-h-1.5 ax-rounded-full ax-bg-success" /> Active Session
                    </span>
                  </div>
                </div>
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-1.5">
                    <button className="ax-flex ax-items-center ax-gap-2.5 ax-w-full ax-p-2 ax-text-xs ax-text-primary ax-rounded-lg hover:ax-bg-surface-secondary ax-text-left ax-border-0 ax-bg-transparent ax-cursor-pointer">
                      <SettingsIcon size={14} /> Account Settings
                    </button>
                    <button className="ax-flex ax-items-center ax-gap-2.5 ax-w-full ax-p-2 ax-text-xs ax-text-primary ax-rounded-lg hover:ax-bg-surface-secondary ax-text-left ax-border-0 ax-bg-transparent ax-cursor-pointer">
                      <BellIcon size={14} /> Notification Preferences
                    </button>
                    <button className="ax-flex ax-items-center ax-gap-2.5 ax-w-full ax-p-2 ax-text-xs ax-text-primary ax-rounded-lg hover:ax-bg-surface-secondary ax-text-left ax-border-0 ax-bg-transparent ax-cursor-pointer">
                      <ShareIcon size={14} /> Team & Permissions
                    </button>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter align="between">
                  <span className="ax-text-2xs ax-text-muted">v2.4.0</span>
                  <AXButton size="xs" variant="text" color="danger" label="Sign Out" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          </div>

          {/* Scenario B: Filter & Multi-Select Dropdown */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Interactive Filter Panel</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Multi-checkbox filter list with instant state feedback and Apply buttons.
            </p>

            <AXPopover size="sm" placement="bottom">
              <AXPopoverTrigger>
                <AXButton
                  size="sm"
                  variant="outlined"
                  startIcon={<FilterIcon size={14} />}
                  label={`Filter (${selectedStatus.length})`}
                />
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="Filter Records" />
                <AXPopoverBody>
                  <div className="ax-flex ax-flex-col ax-gap-2">
                    {['Active', 'Pending', 'Archived', 'Suspended'].map((status) => (
                      <label
                        key={status}
                        className="ax-flex ax-items-center ax-gap-2 ax-text-xs ax-text-primary ax-cursor-pointer hover:ax-text-primary-active"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="ax-rounded"
                        />
                        <span>{status} Status</span>
                      </label>
                    ))}
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter align="between">
                  <AXButton
                    size="xs"
                    variant="text"
                    label="Reset"
                    onClick={() => setSelectedStatus([])}
                  />
                  <AXButton size="xs" color="primary" label="Apply Filters" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          </div>

          {/* Scenario C: Zero-Flicker Hover Card */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Hover-Bridge Card</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Smooth hover preview with zero flickering when moving between trigger and card.
            </p>

            <AXPopover trigger="hover" theme="glass" size="md" placement="top" openDelay={60} closeDelay={180}>
              <AXPopoverTrigger>
                <span className="ax-inline-flex ax-items-center ax-gap-1.5 ax-text-xs ax-font-bold ax-text-primary ax-underline ax-cursor-pointer">
                  <CubeIcon size={14} /> Hover over @astrax-core
                </span>
              </AXPopoverTrigger>
              <AXPopoverContent>
                <AXPopoverHeader title="@astrax/core library" />
                <AXPopoverBody>
                  <p className="ax-m-0 ax-text-xs ax-text-secondary ax-leading-relaxed">
                    Zero-runtime design system tokens, accessible headless hooks, and unified SVG sprite architecture.
                  </p>
                  <div className="ax-flex ax-items-center ax-gap-4 ax-mt-3 ax-text-2xs ax-text-muted">
                    <span>⭐ 2.4k stars</span>
                    <span>📦 12.8k downloads/wk</span>
                  </div>
                </AXPopoverBody>
                <AXPopoverFooter align="end">
                  <AXButton size="xs" color="primary" label="View Repository" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          </div>

          {/* Scenario D: Destructive Action Confirm Dialog */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Confirmation Dialog</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Modal popover requiring explicit confirmation before executing destructive tasks.
            </p>

            <AXPopover size="sm" placement="top">
              <AXPopoverTrigger>
                <AXButton size="sm" variant="contained" color="danger" label="Delete Resource" />
              </AXPopoverTrigger>
              <AXPopoverContent trapFocus={true}>
                <AXPopoverHeader title="Confirm Deletion" />
                <AXPopoverBody>
                  <p className="ax-m-0 ax-text-xs ax-text-secondary">
                    Are you sure you want to permanently delete this repository? This operation cannot be undone.
                  </p>
                </AXPopoverBody>
                <AXPopoverFooter align="end">
                  <AXPopoverClose>
                    <AXButton size="xs" variant="text" label="Cancel" />
                  </AXPopoverClose>
                  <AXButton size="xs" color="danger" label="Yes, Delete" />
                </AXPopoverFooter>
              </AXPopoverContent>
            </AXPopover>
          </div>

          {/* Scenario E: Controlled External Trigger */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Controlled Popover</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              Controlled via external React state with synchronized open indicators.
            </p>

            <div className="ax-flex ax-items-center ax-gap-3">
              <AXButton
                size="sm"
                variant="outlined"
                color={isControlledOpen ? 'primary' : 'secondary'}
                label={isControlledOpen ? 'Close Popover' : 'Open via State'}
                onClick={() => setIsControlledOpen((prev) => !prev)}
              />

              <AXPopover
                open={isControlledOpen}
                onOpenChange={setIsControlledOpen}
                placement="bottom"
                size="sm"
              >
                <AXPopoverTrigger>
                  <div className="ax-text-xs ax-font-mono ax-text-secondary ax-p-2 ax-bg-surface ax-rounded-lg ax-border ax-border-default">
                    Target Element
                  </div>
                </AXPopoverTrigger>
                <AXPopoverContent>
                  <AXPopoverHeader title="Controlled State" />
                  <AXPopoverBody>
                    <p className="ax-m-0 ax-text-xs">
                      This popover is driven by <code>open={'{' + String(isControlledOpen) + '}'}</code>.
                    </p>
                  </AXPopoverBody>
                </AXPopoverContent>
              </AXPopover>
            </div>
          </div>

          {/* Scenario F: Shorthand Self-Contained API */}
          <div className="ax-p-5 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col ax-gap-3">
            <h4 className="ax-text-sm ax-font-bold ax-text-primary ax-m-0">Shorthand Quick API</h4>
            <p className="ax-text-xs ax-text-secondary ax-m-0">
              One-liner syntax using <code>title</code>, <code>content</code>, and <code>footer</code> props.
            </p>

            <AXPopover
              title="Shorthand Tooltip"
              content="Configured entirely in a single JSX tag without compound children."
              placement="top"
              size="sm"
              footer={<AXButton size="xs" label="Got it" />}
            >
              <AXButton size="sm" variant="soft" label="Hover or Click Me" />
            </AXPopover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopoverSamples;

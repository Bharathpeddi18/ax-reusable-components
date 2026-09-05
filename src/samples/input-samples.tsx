'use client';

import React, { useState } from 'react';
import {
  AXInput,
  AXTextarea,
  AXCheckbox,
  AXCheckboxGroup,
  AXRadio,
  AXRadioGroup,
  AXSwitch,
  AXTagsInput,
  AXSelect,
  AXFileUpload,
  AXFileItem,
  AXRichText,
  AXInputGroup,
  AXInputSize,
  AXSelectOptionsType,
} from '@/components/ax-inputs';
import { AXButton } from '@/components/ax-button/ax-button';
import {
  SettingsIcon,
  DocumentIcon,
  SparklesIcon,
  FilterIcon,
  CubeIcon,
  DownloadIcon,
  BellIcon,
} from '@/assets/icons';

export const InputSamples: React.FC = () => {
  // Global size controller
  const [selectedSize, setSelectedSize] = useState<AXInputSize>('md');

  // Input states
  const [searchValue, setSearchValue] = useState('Production Cluster');
  const [passwordValue, setPasswordValue] = useState('SuperSecretPassword123!');
  const [usernameCountValue, setUsernameCountValue] = useState('alex_morgan');
  const [tags, setTags] = useState<string[]>(['React 19', 'TypeScript', 'WCAG AAA', 'Zero Runtime']);
  const [textareaValue, setTextareaValue] = useState(
    'AstraX enterprise UI design system featuring zero-runtime CSS tokens, full security sanitization, and 10/10 accessibility.'
  );

  // React-Select Tier Dropdown States
  const [singleSelectVal, setSingleSelectVal] = useState<string>('turbopack');
  const [multiSelectVal, setMultiSelectVal] = useState<string[]>(['react', 'typescript', 'tailwind']);
  const [isLoadingSelect, setIsLoadingSelect] = useState(false);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<AXFileItem[]>([
    {
      id: 'demo-1',
      name: 'system-architecture-diagram.png',
      size: 2.4 * 1024 * 1024,
      type: 'image/png',
      status: 'completed',
      progress: 100,
    },
    {
      id: 'demo-2',
      name: 'security-audit-report-2026.pdf',
      size: 840 * 1024,
      type: 'application/pdf',
      status: 'completed',
      progress: 100,
    },
  ]);

  // Rich Text Editor State
  const [richTextContent, setRichTextContent] = useState<string>(
    '<h2>Welcome to AstraX Enterprise Editor</h2><p>Experience <strong>zero-dependency</strong>, ultra-fast WYSIWYG editing with <em>complete XSS protocol protection</em>.</p><ul><li>Hardware-accelerated rendering</li><li>Markdown-compliant document formatting</li><li>Instant live word & character stats</li></ul>'
  );

  // Checkbox states
  const [tableSelectAll, setTableSelectAll] = useState<boolean | 'indeterminate'>('indeterminate');

  // Radio states
  const [selectedPlan, setSelectedPlan] = useState('pro');

  // Switch states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [switchLoading, setSwitchLoading] = useState(false);

  // Grouped options for AXSelect
  const groupedFrameworkOptions: AXSelectOptionsType = [
    {
      label: 'Core Frameworks',
      options: [
        { value: 'react', label: 'React 19', description: 'Modern UI library with Server Actions', badge: 'v19.0' },
        { value: 'nextjs', label: 'Next.js App Router', description: 'Fullstack React framework with Turbopack', badge: 'v16.3' },
        { value: 'vue', label: 'Vue 3', description: 'Progressive JavaScript Framework' },
      ],
    },
    {
      label: 'Tooling & Languages',
      options: [
        { value: 'typescript', label: 'TypeScript', description: 'Strict typed superset of JavaScript', badge: 'v5.7' },
        { value: 'turbopack', label: 'Turbopack', description: 'Incremental rust-based bundler' },
        { value: 'tailwind', label: 'Tailwind CSS', description: 'Utility-first styling framework' },
        { value: 'vitest', label: 'Vitest', description: 'Blazing fast unit test engine' },
      ],
    },
    {
      label: 'Cloud & Infrastructure',
      options: [
        { value: 'aws', label: 'Amazon Web Services', description: 'Global cloud infrastructure' },
        { value: 'gcp', label: 'Google Cloud Platform', description: 'AI & Data Cloud' },
        { value: 'azure', label: 'Microsoft Azure', description: 'Enterprise cloud services' },
      ],
    },
  ];

  return (
    <div className="ax-flex ax-flex-col ax-gap-8">
      {/* ====================================================================
          1. Global Size Preset Scaler
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Size Tokens
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Unified Token Spacing Playground (XS to XL)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Heights, paddings, fonts, and border radii scale harmoniously across all form controls.
          </p>
        </div>

        {/* Size Selector Toolbar */}
        <div className="ax-flex ax-items-center ax-gap-2 ax-p-3 ax-bg-surface-secondary ax-rounded-lg ax-border ax-border-default">
          <span className="ax-text-xs ax-font-semibold ax-text-secondary">Scale Input Preset:</span>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as AXInputSize[]).map((sz) => (
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

        {/* Dynamic Size Preview Grid */}
        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-4 ax-p-6 ax-bg-surface-subtle ax-rounded-xl ax-border ax-border-dashed ax-border-default">
          <AXInput
            size={selectedSize}
            label={`Text Input (${selectedSize.toUpperCase()})`}
            placeholder="Type your username..."
            defaultValue="bharath_peddi"
            helperText="Username must be unique"
          />

          <AXSelect
            size={selectedSize}
            label={`React-Select Combobox (${selectedSize.toUpperCase()})`}
            options={groupedFrameworkOptions}
            value={singleSelectVal}
            onChange={(val) => setSingleSelectVal(val as string)}
            helperText="Supports live searching, keyboard arrows, and option groups"
          />
        </div>
      </div>

      {/* ====================================================================
          2. React-Select Tier AXSelect Showcase (Single, Multi & Creatable)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-accent-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-accent ax-mb-1">
            React-Select Tier 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            `AXSelect` - Advanced Searchable, Multi-Select & Creatable Combobox
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Engineered with option groups, live keyword filtering, removable chip tags, select-all toolbars, creatable options, loading spinner, clearable button, and smart viewport collision flip detection.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          {/* Multi-Select with Tag Chips & Select-All Toolbar */}
          <div className="ax-flex ax-flex-col ax-gap-2">
            <AXSelect
              isMulti
              isCreatable
              label="Multi-Select Stack (with Removable Chips & Creatable)"
              options={groupedFrameworkOptions}
              value={multiSelectVal}
              onChange={(val) => setMultiSelectVal(val as string[])}
              placeholder="Search or type custom technology..."
              helperText="Click chips to remove, press Backspace, or type new tech name & press Enter to create"
              isClearable
            />
          </div>

          {/* Single Select with Search & Badges */}
          <div className="ax-flex ax-flex-col ax-gap-2">
            <AXSelect
              isCreatable
              label="Single Select with Live Filter, Badges & Creatable"
              options={groupedFrameworkOptions}
              value={singleSelectVal}
              onChange={(val) => setSingleSelectVal(val as string)}
              placeholder="Search or create architecture component..."
              helperText="Press ArrowUp / ArrowDown and Enter to navigate"
              isClearable
            />
          </div>
        </div>

        {/* Loading & Async Simulation */}
        <div className="ax-p-4 ax-bg-surface-secondary ax-rounded-xl ax-border ax-border-default ax-flex ax-flex-col sm:ax-flex-row ax-items-center ax-justify-between ax-gap-4">
          <div className="ax-flex ax-flex-col">
            <span className="ax-text-xs ax-font-bold ax-text-primary">Simulate Async / Loading State</span>
            <span className="ax-text-xs ax-text-secondary">Toggle async fetching spinner inside the select trigger</span>
          </div>

          <div className="ax-flex ax-items-center ax-gap-3">
            <AXButton
              size="sm"
              variant="outlined"
              label={isLoadingSelect ? 'Stop Loading' : 'Simulate Loading'}
              onClick={() => setIsLoadingSelect((prev) => !prev)}
            />
            <div className="ax-w-64">
              <AXSelect
                isLoading={isLoadingSelect}
                placeholder="Async data feed..."
                options={[
                  { value: 'feed-1', label: 'Kafka Production Partition 1' },
                  { value: 'feed-2', label: 'RabbitMQ Analytics Stream' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          3. Enterprise File Uploader (AXFileUpload)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Enterprise File Uploader 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            `AXFileUpload` - Drag & Drop File Upload Zone with Lightbox Previews
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Automatic executable blocker security guard (.exe, .bat, .cmd, .sh), drag & drop active states, file name sanitization, formatted byte counters, and click-to-preview lightbox modals.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          {/* Dropzone Mode */}
          <div className="ax-flex ax-flex-col ax-gap-3">
            <AXFileUpload
              label="Dropzone Upload Area"
              multiple
              accept="image/*,application/pdf,.zip,.csv"
              maxSize={10 * 1024 * 1024}
              value={uploadedFiles}
              onChange={setUploadedFiles}
              hintText="PNG, JPG, PDF, ZIP up to 10MB • Executables blocked"
              helperText="Try dragging files or click image thumbnail to open full inspection lightbox"
            />
          </div>

          {/* Button Trigger Variant */}
          <div className="ax-flex ax-flex-col ax-gap-3">
            <span className="ax-text-xs ax-font-bold ax-text-primary">Button Trigger Variant</span>
            <div className="ax-p-6 ax-border ax-border-default ax-rounded-xl ax-bg-surface-subtle ax-flex ax-flex-col ax-gap-4">
              <p className="ax-text-xs ax-text-secondary ax-m-0">
                Compact trigger button suitable for data tables, modal dialogs, and profile avatar uploaders.
              </p>
              <AXFileUpload
                variant="button"
                accept="image/*"
                maxSize={5 * 1024 * 1024}
                helperText="Allowed image types: PNG, JPG, WEBP"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          4. Secure Zero-Dependency Rich Text Editor (AXRichText)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            WYSIWYG Editor 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            `AXRichText` - Secure Zero-Dependency WYSIWYG Content Editor
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Ultra-fast rich text editor featuring Markdown shortcuts (type `# `, `## `, `* `, `1. `, `&gt; ` + Space), script-stripping HTML sanitizer, protocol-whitelisted link safety (`target="_blank"` + `rel="noopener noreferrer"`), and live word/character statistics.
          </p>
        </div>

        <div className="ax-flex ax-flex-col ax-gap-4">
          <AXRichText
            label="Product Specification Document"
            value={richTextContent}
            onChange={(html) => setRichTextContent(html)}
            minHeight="200px"
            maxLength={1000}
            showCounters
            helperText="Supports keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K) and Markdown auto-conversions"
          />
        </div>
      </div>

      {/* ====================================================================
          5. Advanced Text Inputs (Character Counters, Clear Button, Password Toggle)
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Text Controls 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Specialized Text Inputs & Micro-Interactions
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Features integrated search clear button, show/hide password toggle, live character counter, and icon slots.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-3 ax-gap-4">
          {/* Search Input with Clear Button */}
          <AXInput
            label="Search Filter"
            placeholder="Search resources..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            clearable
            onClear={() => setSearchValue('')}
            startIcon={<FilterIcon size={16} />}
            helperText="Click '×' icon to clear search query"
          />

          {/* Password with Show/Hide Toggle */}
          <AXInput
            type="password"
            label="Account Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            showPasswordToggle
            required
            helperText="Toggle eye icon to inspect password securely"
          />

          {/* Text Input with Live Character Counter */}
          <AXInput
            label="Account Handle"
            value={usernameCountValue}
            onChange={(e) => setUsernameCountValue(e.target.value)}
            maxLength={20}
            showCount
            startIcon={<span className="ax-text-xs ax-font-bold">@</span>}
            helperText="Max 20 alphanumeric characters"
          />
        </div>
      </div>

      {/* ====================================================================
          6. Connected Input Groups & Addons
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-accent-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-accent ax-mb-1">
            Layout Patterns
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Connected Input Groups & Addons
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Seamless border merging between text addons, input fields, select dropdowns, and action buttons.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          {/* Domain Prefix & Suffix */}
          <AXInput
            label="Custom Organization URL"
            prefixAddon="https://"
            suffixAddon=".astrax.io"
            defaultValue="acme-corp"
            helperText="Your subdomain will be deployed automatically"
          />

          {/* Connected Group with Action Button */}
          <AXInputGroup label="Deploy Cluster Repository">
            <AXInput placeholder="github.com/organization/repo" defaultValue="facebook/react" />
            <AXButton color="primary" label="Deploy" startIcon={<SparklesIcon size={14} />} />
          </AXInputGroup>
        </div>
      </div>

      {/* ====================================================================
          7. Textarea with Auto-Resize & Character Counter
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-surface-secondary ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Textarea 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            `AXTextarea` with Smooth Auto-Resize & Clear Action
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Multi-line input with smooth automatic height growth (`autoResize`), character counter, and quick clear button.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-2 ax-gap-6">
          <AXTextarea
            label="Project Description (Auto-Expanding)"
            autoResize
            clearable
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            maxLength={200}
            showCount
            rows={3}
            helperText="Smoothly auto-grows as you type without layout jumping"
          />

          <AXTextarea
            label="System Release Notes (Subtle Variant)"
            variant="subtle"
            defaultValue="- Upgraded AXSelect to React-Select tier&#10;- Added AXFileUpload with Drag & Drop&#10;- Added AXRichText WYSIWYG editor"
            rows={4}
            resize="vertical"
            helperText="Supports vertical manual resizing"
          />
        </div>
      </div>

      {/* ====================================================================
          8. Chip Tags Input with Paste Parsing & Inline Edit
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-4">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-primary-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-primary ax-mb-1">
            Chip Tags 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Interactive Chip Tags Input (`AXTagsInput`)
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Supports pasting comma/newline lists (e.g. paste "React, Vue, Svelte"), double-clicking any tag to edit in-place, custom regex validation, and backspace deletion.
          </p>
        </div>

        <div className="ax-max-w-2xl">
          <AXTagsInput
            label="Technology Keywords (Try pasting comma-separated list or double-clicking tags)"
            value={tags}
            onChange={setTags}
            maxTags={10}
            placeholder="Type tag or paste multiple keywords..."
            helperText="Double click any tag to edit inline • Try pasting 'Kafka, Redis, Postgres'"
          />
        </div>
      </div>

      {/* ====================================================================
          9. Selection Controls: Checkboxes, Radio Cards & Loading Switches
          ==================================================================== */}
      <div className="ax-p-6 ax-bg-surface ax-rounded-xl ax-border ax-border-default ax-shadow-sm ax-flex ax-flex-col ax-gap-6">
        <div>
          <div className="ax-inline-flex ax-items-center ax-gap-1.5 ax-px-2.5 ax-py-0.5 ax-bg-success-soft ax-rounded-full ax-text-xs ax-font-bold ax-text-success ax-mb-1">
            Selection Suite 10/10
          </div>
          <h3 className="ax-text-lg ax-font-bold ax-text-primary ax-m-0">
            Checkboxes, Radio Cards & Switches
          </h3>
          <p className="ax-text-xs ax-text-secondary ax-mt-1 ax-mb-0">
            Accessible stateful selection components supporting indeterminate states, card modes, and loading switch states.
          </p>
        </div>

        <div className="ax-grid ax-grid-cols-1 md:ax-grid-cols-3 ax-gap-6">
          {/* Checkboxes with Indeterminate State */}
          <div className="ax-p-4 ax-border ax-border-default ax-rounded-xl ax-flex ax-flex-col ax-gap-3">
            <span className="ax-text-xs ax-font-bold ax-text-primary">Checkboxes</span>
            
            <AXCheckbox
              label="Select All Workspace Clusters"
              description="Indeterminate master toggle"
              indeterminate={tableSelectAll === 'indeterminate'}
              checked={tableSelectAll === true}
              onChange={(e) => setTableSelectAll(e.target.checked)}
            />

            <div className="ax-pl-6 ax-flex ax-flex-col ax-gap-2">
              <AXCheckbox label="us-east-1 (Primary)" defaultChecked />
              <AXCheckbox label="eu-central-1 (Replica)" defaultChecked />
              <AXCheckbox label="ap-south-1 (Standby)" />
            </div>
          </div>

          {/* Radio Group in Card Mode */}
          <div className="ax-p-4 ax-border ax-border-default ax-rounded-xl ax-flex ax-flex-col ax-gap-3">
            <span className="ax-text-xs ax-font-bold ax-text-primary">Radio Group (Card Variant)</span>

            <AXRadioGroup
              value={selectedPlan}
              onChange={setSelectedPlan}
              variant="card"
              orientation="vertical"
            >
              <AXRadio
                value="starter"
                label="Starter Plan"
                description="$19/mo • Up to 5 team members"
              />
              <AXRadio
                value="pro"
                label="Pro Plan"
                description="$79/mo • Unlimited clusters & 24/7 SLA"
              />
            </AXRadioGroup>
          </div>

          {/* Switches with Loading Simulation */}
          <div className="ax-p-4 ax-border ax-border-default ax-rounded-xl ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-items-center ax-justify-between">
              <span className="ax-text-xs ax-font-bold ax-text-primary">Toggle Switches</span>
              <button
                type="button"
                onClick={() => setSwitchLoading((prev) => !prev)}
                className="ax-text-xs ax-text-primary ax-underline ax-bg-transparent ax-border-none ax-cursor-pointer"
              >
                {switchLoading ? 'Stop Loading' : 'Simulate Loading'}
              </button>
            </div>

            <AXSwitch
              label="Real-time Alert Webhooks"
              description="Dispatch alerts to PagerDuty"
              checked={emailAlerts}
              loading={switchLoading}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              color="primary"
            />

            <AXSwitch
              label="Two-Factor Authentication (2FA)"
              description="Enforce WebAuthn for all team members"
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
              color="success"
            />

            <AXSwitch
              label="Maintenance Mode"
              description="Temporarily pause ingress traffic"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSamples;

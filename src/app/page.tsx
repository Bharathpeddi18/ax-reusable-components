'use client';

import React, { useState } from 'react';
import Menu from '../layout/menu/menu';
import AXButton from '../components/ax-button/ax-button';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const menuItems = [
    { id: '1', label: 'Dashboard', path: '/' },
    { id: '2', label: 'Analytics', path: '/analytics' },
    { id: '3', label: 'Components', path: '/components' },
    { id: '4', label: 'Settings', path: '/settings' },
  ];

  const handleSimulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setClickCount((prev) => prev + 1);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Side Menu Component */}
      <Menu brandTitle="AstraX" items={menuItems} />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px', marginLeft: '270px', maxWidth: '1200px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
            AstraX Design System
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>
            Production-grade, highly reusable UI components inspired by Material-UI, Radix UI & Modern Design Systems.
          </p>
        </div>

        {/* ==================================================================
            1. BUTTON VARIANTS SHOWCASE
            ================================================================== */}
        <section
          style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
            1. Button Variants
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '18px' }}>
            Contained (Solid), Outlined, Text (Ghost), Soft (Tonal), and Elevated.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <AXButton variant="contained" color="primary">Contained</AXButton>
            <AXButton variant="outlined" color="primary">Outlined</AXButton>
            <AXButton variant="text" color="primary">Text / Ghost</AXButton>
            <AXButton variant="soft" color="primary">Soft / Tonal</AXButton>
            <AXButton variant="elevated" color="primary">Elevated</AXButton>
          </div>
        </section>

        {/* ==================================================================
            2. SEMANTIC COLOR THEMES
            ================================================================== */}
        <section
          style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
            2. Semantic Colors
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '18px' }}>
            Primary, Secondary, Success, Warning, Danger, Dark, and Light.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
            <AXButton color="primary">Primary</AXButton>
            <AXButton color="secondary">Secondary</AXButton>
            <AXButton color="success">Success</AXButton>
            <AXButton color="warning">Warning</AXButton>
            <AXButton color="danger">Danger</AXButton>
            <AXButton color="dark">Dark</AXButton>
            <AXButton color="light">Light</AXButton>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <AXButton variant="outlined" color="primary">Primary</AXButton>
            <AXButton variant="outlined" color="secondary">Secondary</AXButton>
            <AXButton variant="outlined" color="success">Success</AXButton>
            <AXButton variant="outlined" color="warning">Warning</AXButton>
            <AXButton variant="outlined" color="danger">Danger</AXButton>
            <AXButton variant="outlined" color="dark">Dark</AXButton>
          </div>
        </section>

        {/* ==================================================================
            3. BUTTON SIZES & SHAPES
            ================================================================== */}
        <section
          style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
            3. Sizes & Shapes
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '18px' }}>
            Sizes: xs (28px), sm (34px), md (40px), lg (48px), xl (56px) | Shapes: rounded, pill, square, circle.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
            <AXButton size="xs">Extra Small</AXButton>
            <AXButton size="sm">Small</AXButton>
            <AXButton size="md">Medium (Default)</AXButton>
            <AXButton size="lg">Large</AXButton>
            <AXButton size="xl">Extra Large</AXButton>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <AXButton shape="rounded" color="primary">Rounded</AXButton>
            <AXButton shape="pill" color="primary">Pill Capsule</AXButton>
            <AXButton shape="square" color="primary">Square Corners</AXButton>
            <AXButton shape="circle" color="primary" icon="★" aria-label="Favorite" />
          </div>
        </section>

        {/* ==================================================================
            4. ICONS & LOADING SPINNER
            ================================================================== */}
        <section
          style={{
            background: '#ffffff',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '32px',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px', color: '#0f172a' }}>
            4. Icons, Loading State & Disabled
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '18px' }}>
            Prefix icons, suffix icons, standalone icon buttons, async loading spinner, and disabled protection.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <AXButton
              startIcon={<span style={{ fontSize: '1.1rem' }}>+</span>}
              color="primary"
            >
              Create Project
            </AXButton>

            <AXButton
              endIcon={<span style={{ fontSize: '1rem' }}>→</span>}
              variant="outlined"
              color="primary"
            >
              Next Step
            </AXButton>

            <AXButton
              iconOnly
              shape="pill"
              color="secondary"
              variant="soft"
              aria-label="Settings"
            >
              ⚙
            </AXButton>

            <AXButton
              loading={isLoading}
              loadingText="Submitting..."
              color="success"
              onClick={handleSimulateLoad}
            >
              Click to Simulate Loading
            </AXButton>

            <AXButton disabled color="danger">
              Disabled Button
            </AXButton>

            <AXButton href="https://nextjs.org" target="_blank" variant="outlined" color="primary">
              Polymorphic Link ↗
            </AXButton>
          </div>

          {clickCount > 0 && (
            <div style={{ marginTop: '14px', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
              ✓ Async action completed successfully {clickCount} time(s)!
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

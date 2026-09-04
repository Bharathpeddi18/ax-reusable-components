'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menusConfig } from './menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { AXButton } from '@/components/ax-button/ax-button';
import { Icon, IconMenu } from '@/assets/icons';

const BREAKPOINT_XL = 1280;

/* ==========================================================================
   Main Navigation Component
   ========================================================================== */

/**
 * `AppNavigation` is an enterprise sidebar navigation component supporting
 * responsive collapse, nested submenus, section dividers, and active route sync.
 * Uses high-performance vector icons from the unified SVG Sprite system.
 */
export const AppNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    '/create-requirement': true,
  });
  const pathname = usePathname();

  // Handle responsive layout bounds
  useEffect(() => {
    const checkViewport = () => setIsExpanded(window.innerWidth >= BREAKPOINT_XL);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const isRouteActive = (path: string, activePaths?: string[]) => {
    if (pathname === path) return true;
    return Boolean(activePaths?.some((p) => pathname === p || (p !== '/' && pathname.startsWith(p))));
  };

  const toggleSubmenu = (path: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <nav
      className={`ax-menu ${isExpanded ? 'ax-menu-expanded' : 'ax-menu-collapsed'}`}
      aria-label="Main Navigation"
    >
      {/* 1. Header & Brand Logo */}
      <div className="ax-menu-header">
        <Link href="/" className="ax-flex ax-items-center">
          <img
            src={ApplicationLogo.src}
            alt="AstraX"
            width={isExpanded ? 100 : 36}
            height={40}
            className="ax-object-contain ax-transition-all"
          />
        </Link>
        <AXButton
          size="sm"
          className={`ax-menu-toggle ${isExpanded ? 'ax-text-white' : 'ax-text-primary'}`}
          onClick={toggleSidebar}
          title={isExpanded ? 'Collapse Menu' : 'Expand Menu'}
          aria-expanded={isExpanded}
          startIcon={<IconMenu />}
          iconOnly
        />
      </div>

      {/* 2. Menu Navigation Body */}
      <ul className="ax-menu-body">
        {menusConfig.map((item) => {
          const active = isRouteActive(item.path, item.ActivePath);
          const hasSubmenus = Boolean(item.subMenus?.length);
          const isSubmenuOpen = Boolean(openSubmenus[item.path]);

          return (
            <React.Fragment key={item.path}>
              {/* Category Section Header */}
              {item.section && (
                <li className="ax-menu-section-title">
                  {isExpanded ? item.section : '•••'}
                </li>
              )}

              {/* Navigation Link / Submenu Accordion */}
              <li className={`ax-menu-item ${active ? 'ax-menu-item-active' : ''}`}>
                {hasSubmenus ? (
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.path)}
                    className={`ax-menu-link ax-menu-button ${active ? 'ax-menu-link-active' : ''}`}
                    title={item.label}
                    aria-expanded={isSubmenuOpen}
                    aria-haspopup="true"
                    aria-controls={`submenu-${item.path.replace(/^\//, '')}`}
                  >
                    <span className="ax-menu-icon">
                      <Icon name={item.Icon ?? 'cube'} size={18} />
                    </span>
                    {isExpanded && (
                      <>
                        <span className="ax-menu-label">{item.label}</span>
                        <Icon
                          name="chevron-right"
                          size={14}
                          className={`ax-menu-chevron ${isSubmenuOpen ? 'ax-menu-chevron-expanded' : ''}`}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`ax-menu-link ${active ? 'ax-menu-link-active' : ''}`}
                    title={item.label}
                  >
                    <span className="ax-menu-icon">
                      <Icon name={item.Icon ?? 'cube'} size={18} />
                    </span>
                    {isExpanded && (
                      <>
                        <span className="ax-menu-label">{item.label}</span>
                        {item.badge && (
                          <span className={`ax-menu-badge ax-menu-badge-${item.badgeColor ?? 'info'}`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )}

                {/* Floating Tooltip in Collapsed Mode */}
                {!isExpanded && (
                  <span className="ax-menu-tooltip" role="tooltip">
                    {item.label}
                  </span>
                )}

                {/* Nested Submenu Tree with Smooth Animation */}
                {hasSubmenus && isExpanded && (
                  <div
                    id={`submenu-${item.path.replace(/^\//, '')}`}
                    className={`ax-menu-submenu-container ${isSubmenuOpen ? 'ax-menu-submenu-open' : ''}`}
                    aria-hidden={!isSubmenuOpen}
                  >
                    <ul className="ax-menu-submenu-list" aria-label={`${item.label} Submenu`}>
                      {item.subMenus!.map((subItem) => {
                        const subActive = isRouteActive(subItem.path, subItem.ActivePath);
                        return (
                          <li key={subItem.path}>
                            <Link
                              href={subItem.path}
                              className={`ax-menu-submenu-link ${subActive ? 'ax-menu-submenu-link-active' : ''}`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>

      {/* 3. User Profile Footer */}
      <div className="ax-menu-footer">
        <div className="ax-menu-profile" title="Signed in as Alex Cross (Chief Architect)">
          <div className="ax-menu-avatar">
            AC
            <span className="ax-menu-status-dot" title="Operational" />
          </div>
          {isExpanded && (
            <div className="ax-menu-user-info">
              <span className="ax-menu-user-name">Alex Cross</span>
              <span className="ax-menu-user-role">USAF AstraX Chief</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavigation;
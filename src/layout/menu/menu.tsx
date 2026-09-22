'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem, menusConfig } from './menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { Icon, IconMenu } from '@/assets/icons';

const BREAKPOINT_XL = 1280;

export interface MenuProps {
  items?: MenuItem[];
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * `AppNavigation` / `Menu` is a self-contained, enterprise sidebar navigation component
 * supporting responsive collapse, nested accordion submenus, section dividers,
 * active route sync, badge indicators, and accessible keyboard navigation.
 */
export const AppNavigation: React.FC<MenuProps> = ({
  items = menusConfig,
  defaultExpanded = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Helper to test if a route or its activePaths match the current pathname
  const isRouteActive = (path: string, activePaths?: string[]): boolean => {
    if (pathname === path) return true;
    if (activePaths && activePaths.length > 0) {
      return activePaths.some((p) => pathname === p || (p !== '/' && pathname.startsWith(p)));
    }
    return path !== '/' && pathname.startsWith(path);
  };

  // Auto-expand any submenu parent if current pathname is inside it
  useEffect(() => {
    const activeSubmenuKeys: Record<string, boolean> = {};
    items.forEach((item) => {
      if (item.subMenus?.some((sub) => isRouteActive(sub.path, sub.ActivePath))) {
        activeSubmenuKeys[item.path] = true;
      }
    });
    if (Object.keys(activeSubmenuKeys).length > 0) {
      setOpenSubmenus((prev) => ({ ...prev, ...activeSubmenuKeys }));
    }
  }, [pathname, items]);

  // Handle responsive layout bounds on initial load & resize
  useEffect(() => {
    const checkViewport = () => {
      setIsExpanded(window.innerWidth >= BREAKPOINT_XL);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleSubmenu = (path: string) => {
    // If sidebar is collapsed, expanding a submenu should also expand the sidebar
    if (!isExpanded) {
      setIsExpanded(true);
      setOpenSubmenus((prev) => ({ ...prev, [path]: true }));
      return;
    }
    setOpenSubmenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <nav
      className={`ax-menu ${isExpanded ? 'ax-menu-expanded' : 'ax-menu-collapsed'} ${className}`.trim()}
      aria-label="Main Navigation"
    >
      {/* 1. Header & Brand Logo */}
      <div className="ax-menu-header">
        <Link href="/" className="ax-menu-brand" title="AstraX Home">
          <img
            src={ApplicationLogo.src}
            alt="AstraX Logo"
            width={isExpanded ? 100 : 32}
            height={36}
            className="ax-menu-logo"
          />
        </Link>
        <button
          type="button"
          className="ax-menu-toggle"
          onClick={toggleSidebar}
          title={isExpanded ? 'Collapse Navigation' : 'Expand Navigation'}
          aria-label={isExpanded ? 'Collapse Navigation' : 'Expand Navigation'}
          aria-expanded={isExpanded}
        >
          <IconMenu size={18} />
        </button>
      </div>

      {/* 2. Menu Navigation Body */}
      <ul className="ax-menu-body">
        {items.map((item) => {
          const hasSubmenus = Boolean(item.subMenus?.length);
          const active = isRouteActive(
            item.path,
            item.ActivePath || (hasSubmenus ? item.subMenus?.flatMap((s) => [s.path, ...(s.ActivePath || [])]) : undefined)
          );
          const isSubmenuOpen = Boolean(openSubmenus[item.path]);
          const submenuId = `submenu-${item.path.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

          return (
            <React.Fragment key={item.path}>
              {/* Category Section Header */}
              {item.section && (
                <li className="ax-menu-section-title" title={item.section}>
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
                    aria-controls={submenuId}
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

                {/* Nested Submenu Tree */}
                {hasSubmenus && isExpanded && (
                  <div
                    id={submenuId}
                    className={`ax-menu-submenu-container ${isSubmenuOpen ? 'ax-menu-submenu-open' : ''}`}
                    aria-hidden={!isSubmenuOpen}
                  >
                    <ul className="ax-menu-submenu-list" aria-label={`${item.label} Submenu`}>
                      {item.subMenus!.map((subItem) => {
                        const subActive = isRouteActive(subItem.path, subItem.ActivePath);
                        return (
                          <li key={subItem.path} className="ax-menu-submenu-item">
                            <Link
                              href={subItem.path}
                              className={`ax-menu-submenu-link ${subActive ? 'ax-menu-submenu-link-active' : ''}`}
                              title={subItem.label}
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
    </nav>
  );
};

export const Menu = AppNavigation;
export default AppNavigation;
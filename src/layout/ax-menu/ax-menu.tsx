'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem, menusConfig } from './ax-menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { Icon } from '@/assets/icons';

// region Interfaces
export interface MenuProps {
  items?: MenuItem[];
  className?: string;
}

// region Main Component
export const AXMenu: React.FC<MenuProps> = ({
  items = menusConfig,
  className = '',
}) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`ax-menu ${className} ${isCollapsed ? 'ax-menu-collapsed' : 'ax-menu-expanded'}`.trim()}
      aria-label="Main Navigation"
    >
      {/* Menu Header */}
      <div className="ax-menu-header">
        <Link href="/" className="ax-menu-brand" title="AstraX Home">
          <img
            src={ApplicationLogo.src}
            alt="AstraX Logo"
            width={isCollapsed ? 32 : 100}
            height={36}
            className="ax-menu-logo"
          />
        </Link>
        <button
          type="button"
          className={`ax-menu-toggle ${isCollapsed ? 'ax-text-primary' : 'ax-text-white'}`}
          onClick={handleToggle}
          title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          aria-label={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          aria-expanded={!isCollapsed}
        >
          <Icon name="sidebar" width={16} height={16} />
        </button>
      </div>

      {/* Menu Body */}
      <ul className="ax-menu-body">
        {items.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li
              key={item.path}
              className={`ax-menu-item ${isActive ? 'ax-menu-item-active' : ''}`}
            >
              <Link
                href={item.path}
                tabIndex={0}
                aria-label={item.label}
                className={`ax-menu-link ${isActive ? 'ax-menu-link-active' : ''}`}
                title={item.label}
              >
                <span className="ax-menu-icon">
                  <Icon name={item.Icon} />
                </span>
                <span className="ax-menu-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AXMenu;
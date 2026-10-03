'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem, menusConfig } from './ax-menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { Icon } from '@/assets/icons';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';

// region Interfaces
export interface MenuProps {
  items?: MenuItem[];
  className?: string;
}

// region Main Component
export const Menu: React.FC<MenuProps> = ({
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
      <div className="ax-menu-header ax-relative ax-px-4 ax-py-2 ax-border-b ax-border-gray-500 ax-flex ax-items-center">
        <Link href="/" className="ax-flex ax-align-items-center ax-gap-2" title="AstraX - Student Management Portal">
          <img
            src={ApplicationLogo.src}
            alt="AstraX Logo"
            width={42}
            height={42}
            className="ax-menu-logo"
          />
          <div className={`${isCollapsed ? 'ax-hidden' : ''} ax-flex ax-flex-col ax-gap-1 ax-items-start ax-text-white ax-divide-y ax-divide-gray-300 ax-pe-6`}>
            <span className="ax-text-sm ax-font-medium ax-line-clamp-1">AstraX</span>
            <span className="ax-text-xs ax-font-normal ax-break-all ax-line-clamp-1">Student Management Portal</span>
          </div>
        </Link>
        <AXButton
          propsSize="xs"
          propsStartIcon={<Icon name="sidebar" width={16} height={16} />}
          propsLabel={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          propsLabelClassName="ax-hidden"
          propsClassName={`ax-menu-toggle ${isCollapsed ? 'ax-text-primary' : 'ax-text-white'}`}
          onClick={handleToggle}
        />
      </div>

      {/* Menu Body */}
      <ul className="ax-menu-body">
        {items.map((item) => {
          const isActive = item.activePath?.includes(pathname);

          return (
            <li key={item.path} className={`ax-menu-item ${isActive ? 'ax-menu-item-active' : ''}`}>
              <Link
                href={item.path}
                tabIndex={0}
                aria-label={item.label}
                className={`ax-menu-link ${isActive ? 'ax-menu-link-active' : ''}`}
                title={item.label}
              >
                <span className="ax-menu-icon">
                  <Icon name={item.icon} />
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

export default Menu;
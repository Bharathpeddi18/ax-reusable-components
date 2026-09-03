'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import './menu.css';
import { menusConfig, MenuItem } from './menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { IconMenu } from '@/assets/icons';


const AppNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menusConfig);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <nav
      className={`ax-menu ${isExpanded ? 'ax-menu-expanded' : 'ax-menu-collapsed'}`}
      aria-label="Main Navigation"
    >
      <div className="ax-menu-header ax-d-flex ax-justify-content-between ax-align-items-center ax-position-relative">
        <Link href="/">
          <img src={ApplicationLogo.src} alt="AstraX" width={100} height={50} />
        </Link>
        <button
          type="button"
          className="ax-menu-toggle"
          onClick={handleToggle}
          title={isExpanded ? 'Collapse Menu' : 'Expand Menu'}
        >
          <IconMenu className={`${isExpanded ? 'ax-text-white' : 'ax-text-primary'}`} />
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="ax-menu-body ax-p-2">
        {menuItems.map((menuItem) => (
          <li key={menuItem.path} className="ax-menu-item">
            <Link
              href={menuItem.path}
              className="ax-menu-link ax-flex ax-flex-row ax-text-decoration-none ax-gap-2 ax-p-2 ax-rounded-lg ax-text-white hover:ax-bg-primary hover:ax-shadow-lg"
              title={menuItem.label}
            >
              {menuItem.Icon && (
                <span className="ax-d-flex ax-align-items-center">
                  A
                </span>
              )}
              {isExpanded && (
                <span className="ax-line-clamp-1">{menuItem.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ax-menu-footer ax-d-flex ax-justify-content-between ax-align-items-center" />
    </nav>
  );
};

export default AppNavigation;
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import './menu.css';
import { menusConfig, MenuItem } from './menu-config';
import ApplicationLogo from '../../assets/images/application-logo.png';
import { IconMenu } from '@/assets/icons';

const BREAKPOINT_XL = 1280;

const AppNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuItems] = useState<MenuItem[]>(menusConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= BREAKPOINT_XL);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <nav
      className={`ax-menu ${isExpanded ? 'ax-menu-expanded' : 'ax-menu-collapsed'}`}
      aria-label="Main Navigation"
    >
      <div className="ax-menu-header ax-flex ax-justify-between ax-items-center ax-relative ax-px-3">
          <Link href="/" className="ax-flex ax-items-center">
            <img
              src={ApplicationLogo.src}
              alt="AstraX"
              width={100}
            height={50}
              className="ax-object-contain"
            />
          </Link>
        <button
          type="button"
          className={`ax-menu-toggle ax-flex ax-items-center ax-justify-center ax-cursor-pointer`}
          onClick={handleToggle}
          title={isExpanded ? 'Collapse Menu' : 'Expand Menu'}
          aria-expanded={isExpanded}
        >
          <IconMenu className={isExpanded ? 'ax-text-white' : 'ax-text-primary'} />
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="ax-menu-body ax-p-2 ax-space-y-1">
        {menuItems.map((menuItem) => (
          <li key={menuItem.path} className="ax-menu-item">
            <Link
              href={menuItem.path}
              className="ax-flex ax-flex-row ax-items-center ax-gap-2 ax-p-2 ax-rounded-lg ax-text-white hover:ax-bg-primary-hover hover:ax-shadow-md ax-transition-all ax-duration-150 ax-no-underline"
              title={menuItem.label}
            >
              {menuItem.Icon && (
                <span className="ax-flex ax-items-center ax-justify-center ax-w-6 ax-h-6 ax-shrink-0 ax-font-bold">
                  A
                </span>
              )}
              {isExpanded && (
                <span className="ax-line-clamp-1 ax-text-sm ax-font-medium">{menuItem.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ax-menu-footer ax-flex ax-justify-between ax-items-center" />
    </nav>
  );
};

export default AppNavigation;
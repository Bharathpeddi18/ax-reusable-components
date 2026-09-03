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
      <div className="ax-menu-header flex justify-between items-center relative px-3">
        <Link href="/" className="flex items-center">
          <img
            src={ApplicationLogo.src}
            alt="AstraX"
            width={100}
            height={50}
            className="object-contain"
          />
        </Link>
        <button
          type="button"
          className="ax-menu-toggle flex items-center justify-center cursor-pointer"
          onClick={handleToggle}
          title={isExpanded ? 'Collapse Menu' : 'Expand Menu'}
          aria-expanded={isExpanded}
        >
          <IconMenu className={isExpanded ? 'text-white' : 'text-primary'} />
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="ax-menu-body p-2 space-y-1">
        {menuItems.map((menuItem) => (
          <li key={menuItem.path} className="ax-menu-item">
            <Link
              href={menuItem.path}
              className="flex flex-row items-center gap-2 p-2 rounded-lg text-white hover:bg-primary-hover hover:shadow-md transition-all duration-150 no-underline"
              title={menuItem.label}
            >
              {menuItem.Icon && (
                <span className="flex items-center justify-center w-6 h-6 shrink-0 font-bold">
                  A
                </span>
              )}
              {isExpanded && (
                <span className="line-clamp-1 text-sm font-medium">{menuItem.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ax-menu-footer flex justify-between items-center" />
    </nav>
  );
};

export default AppNavigation;
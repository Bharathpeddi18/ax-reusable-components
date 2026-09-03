'use client';

import './menu.css';

import Link from 'next/link';
import { useState } from 'react';

import { menusConfig } from './menu-config';

import ApplicationLogo from '../../assets/images/application-logo.png';
import { IconMenu } from '@/assets/icons';

const AppNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState(menusConfig);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <nav
      className={`ax-menu ${isExpanded ? 'ax-menu-expanded' : 'ax-menu-collapsed'}`} aria-label="Main Navigation">
      <div className="ax-menu-header ax-d-flex ax-justify-content-between ax-align-items-center ax-position-relative">
        <Link href="/">
          <img src={ApplicationLogo.src} alt="AstraX" width={100} height={50} />
        </Link>
        <button className={`ax-menu-toggle`} onClick={handleToggle}>
          <IconMenu className={`${isExpanded ? 'ax-text-white' : 'ax-text-primary'}`}/>
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="ax-menu-list">
        {menuItems.map((menuItem) => (
          <li key={menuItem.path} className="ax-menu-item">
            <Link href={menuItem.path} className="ax-menu-link">
              
              {menuItem.label}
            </Link>
          </li>
        ))}
      </ul>
      
    </nav>
  );
};

export default AppNavigation;
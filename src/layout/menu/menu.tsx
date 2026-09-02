'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './menu.css';
import AXButton from '../../components/ax-button/ax-button';

export interface MenuItem {
  id?: string;
  label?: string;
  path?: string;
  icon?: React.ReactNode;
}

export interface MenuProps {
  logo?: string;
  brandTitle?: string;
  brandHref?: string;
  defaultExpanded?: boolean;
  navToggle?: boolean;
  onToggle?: (expanded: boolean) => void;
  items?: MenuItem[];
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  logo,
  brandTitle = 'AstraX',
  brandHref = '/',
  defaultExpanded = true,
  items,
  children,
}) => {
  const [navToggle, setNavToggle] = useState<boolean>(defaultExpanded);

  const runToggleAppNav = () => {
    setNavToggle(!navToggle);
  };

  return (
    <>
      <nav
        className={`ax-menu ${navToggle ? 'ax-menu-expanded' : 'ax-menu-collapsed'}`}
        aria-label="Main Navigation"
      >
        <div className="ax-menu-brand">
          <Link href={brandHref} className="ax-menu-brand-link" title={brandTitle}>
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={brandTitle} height={50} width={150} />
            ) : (
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', paddingLeft: '16px' }}>
                {brandTitle}
              </span>
            )}
          </Link>
          <AXButton
            id="btn-app-nav-toggle"
            label="O"
            className="ax-menu-toggle"
            onClick={runToggleAppNav}
            aria-label={navToggle ? 'Collapse Navigation' : 'Expand Navigation'}
          />
        </div>

        <ul className="ax-menu-list">
          {items?.map((item, idx) => (
            <li key={item.id || idx} className="ax-menu-item">
              <Link href={item.path || '#'} className="ax-menu-item-link">
                {item.icon && <span className="ax-menu-item-icon">{item.icon}</span>}
                <span className="ax-menu-item-label">{item.label}</span>
              </Link>
            </li>
          ))}
          {children}
        </ul>
      </nav>
    </>
  );
};

export const AppNavigation = Menu;
export default Menu;
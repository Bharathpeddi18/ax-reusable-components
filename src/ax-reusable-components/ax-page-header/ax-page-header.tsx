'use client';

import { ReactNode, useEffect } from "react";

// region Interfaces
export interface AXPageHeaderProps {
  propsLeftContent: ReactNode;
  propsRightContent?: ReactNode;
  propsPageTitle: string;
}

// region Main Component
export const AXPageHeader = (props: AXPageHeaderProps) => {
  const { propsLeftContent, propsRightContent, propsPageTitle } = props;

  useEffect(() => {
    document.title = propsPageTitle;
  }, [propsPageTitle])

  // region Main Return
  return (
    <div className="ax-page-header">
      {propsLeftContent &&
        <div className="ax-page-header-left">
          {propsLeftContent}
        </div>
      }

      {propsRightContent &&
        <div className="ax-page-header-right">
          {propsRightContent}
        </div>
      }
    </div>
  );
};

export default AXPageHeader;
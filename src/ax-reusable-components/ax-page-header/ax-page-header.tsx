'use client';

import { ReactNode, useEffect } from "react";

// region Interfaces
export interface AXPageHeaderProps {
  propsHasLeftContent?: boolean;
  propsLeftContent: ReactNode;
  propsHasRightContent?: boolean;
  propsRightContent?: ReactNode;
  propsPageTitle: string;
  }

// region Main Component
export const AXPageHeader = (props: AXPageHeaderProps) => {
  const { propsHasLeftContent, propsLeftContent, propsHasRightContent, propsRightContent, propsPageTitle} = props;

  useEffect(() => {
    document.title=propsPageTitle;
  }, [propsPageTitle])

  // region Main Return
  return (
    <div className="ax-page-header">
      {propsHasLeftContent && 
        <div className="ax-page-header-left">
          {propsLeftContent}
        </div>
      }

      {propsHasRightContent && 
        <div className="ax-page-header-right">
          {propsRightContent}
        </div>
      }
    </div>
  );
};

export default AXPageHeader;
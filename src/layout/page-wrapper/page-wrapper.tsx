'use client';

import { Children } from 'react';
import './page-wrapper.css';

export const PageWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <main className='ax-page-wrapper'>
            {children}
        </main>
    );
};

export default PageWrapper;
'use client';

import './page-wrapper.css';

export const PageWrapper = () => {
    return (
        <main className='ax-page-wrapper'>
            <div className='ax-page-header'>Page Header</div>
            <div className='ax-page-content'>Page Content</div>
        </main>
    );
};

export default PageWrapper;
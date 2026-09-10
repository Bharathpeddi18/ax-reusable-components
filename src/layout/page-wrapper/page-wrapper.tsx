'use client';

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
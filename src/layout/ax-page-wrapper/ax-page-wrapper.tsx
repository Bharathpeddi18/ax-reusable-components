'use client';

// region Main Component
export const AXPageWrapper = ({
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

export default AXPageWrapper;
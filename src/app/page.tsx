import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXTabsHorizontal from '@/ax-reusable-components/ax-tabs-horizontal/ax-tabs-horizontal';

export default function Home() {
  return (
    <>
      <AXPageHeader
        propsPageTitle="Testing"
        propsLeftContent={
          <h1 className="ax-text-base ax-font-semibold" tabIndex={0}>
            Testing
          </h1>
        }
      />
      <main className="container">
        <AXTabsHorizontal
          propsDefaultTab="students"
          propsSize="md"
          propsTabs={[
            {
              id: 'students',
              label: 'Students',
              content: <div>Students content</div>,
            },
            {
              id: 'teachers',
              label: 'Teachers',
              content: <div>Teachers content</div>,
            },
            {
              id: 'attendance',
              label: 'Attendance',
              content: <div>Attendance content</div>,
            },
          ]}
        />
      </main>
    </>
  );
}

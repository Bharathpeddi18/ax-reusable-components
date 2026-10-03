'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import { useRouter } from 'next/navigation';
import { ROUTERS_PATHS } from '../../../global-config';

const announcements = [
  {
    id: 1,
    title: 'Annual Sports Day',
    description:
      'The annual sports day will be conducted on 15 October. Students participating in events should report to their respective class teachers before the scheduled event time.',
    updatedBy: 'School Admin',
    updatedAt: '2026-10-03T10:30:00',
    isArchived: false,
  },
  {
    id: 2,
    title: 'Parent Teacher Meeting',
    description:
      'The parent teacher meeting for all classes is scheduled for this Saturday. Parents are requested to attend and discuss student academic progress with the respective teachers.',
    updatedBy: 'Principal',
    updatedAt: '2026-10-02T14:20:00',
    isArchived: false,
  },
  {
    id: 3,
    title: 'School Holiday Notice',
    description:
      'The school will remain closed on Monday due to the public holiday. Regular classes and other academic activities will resume from Tuesday as per the normal schedule.',
    updatedBy: 'School Admin',
    updatedAt: '2026-10-01T09:15:00',
    isArchived: false,
  },
  {
    id: 4,
    title: 'Old Announcement',
    description: 'This announcement has been archived.',
    updatedBy: 'Admin',
    updatedAt: '2026-09-10T09:00:00',
    isArchived: true,
  },
];

export const CardAnnouncements = () => {
  const router = useRouter();

  const items = announcements
    .filter((item) => !item.isArchived)
    .slice(0, 3);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-py-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
            Announcements
          </h1>

          <div className="ax-flex ax-items-center ax-ms-auto">
            <AXButton
              propsLabel="View All"
              propsSize="sm"
              className="ax-text-xs ax-font-semibold ax-text-primary hover:ax-underline ax-whitespace-nowrap"
              onClick={() => router.push(ROUTERS_PATHS.announcements)}
            />
          </div>
        </div>
      }
      propsBody={
        <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-300">
          {items.map((item) => (
            <div key={item.id} className="ax-py-3">
              <h2 className="ax-text-sm ax-font-semibold ax-text-primary ax-mb-1">
                {item.title}
              </h2>

              <p className="ax-line-clamp-2 ax-text-sm ax-font-normal ax-text-base ax-m-0">
                {item.description}
              </p>

              <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-1 ax-mt-1 ax-text-xs ax-text-gray-500">
                <span>
                  Updated by{' '}
                  <span className="ax-font-medium ax-text-gray-700">
                    {item.updatedBy}
                  </span>
                </span>

                <span>|</span>
                <span>{formatDate(item.updatedAt)}</span>
                <span>|</span>
                <span>{formatTime(item.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default CardAnnouncements;
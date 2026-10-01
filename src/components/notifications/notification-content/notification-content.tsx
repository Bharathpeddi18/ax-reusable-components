'use client';

import { ReactNode } from 'react';
import Icon from '@/assets/icons';
import AXTabsHorizontal from '@/ax-reusable-components/ax-tabs-horizontal/ax-tabs-horizontal';
import AXBadge from '@/ax-reusable-components/ax-mini-components/ax-badge/ax-badge';
import { NOTIFICATION_TYPE } from '../../../../global-config';
import './notification-content.css';

export interface NotificationItem {
  id: number | string;
  type: string;
  referenceCode?: string;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
  referenceId: string | number | null;
}

const NOTIFICATION_TABS = [
  { id: NOTIFICATION_TYPE.action, label: 'Actions' },
  { id: NOTIFICATION_TYPE.alert, label: 'Alerts' },
  { id: NOTIFICATION_TYPE.general, label: 'General' },
];

const getNotificationDotClass = (type: string) => {
  switch (type) {
    case NOTIFICATION_TYPE.action:
      return 'ax-notification-dot-action';
    case NOTIFICATION_TYPE.alert:
      return 'ax-notification-dot-alert';
    case NOTIFICATION_TYPE.general:
      return 'ax-notification-dot-general';
    default:
      return 'ax-notification-dot-default';
  }
};

const formatNotificationTime = (value: string) =>
  new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export function NotificationContent({
  onClose,
}: {
  onClose?: () => void;
}) {
  const renderNotifications = (items: NotificationItem[]): ReactNode => {
    if (!items.length) {
      return (
        <div className="ax-py-9 ax-text-center ax-text-xs ax-text-gray-400">
          No notifications
        </div>
      );
    }

    return (
      <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className={`ax-flex ax-gap-2-5 ax-px-4 ax-py-3`}
          >
            <span
              className={`ax-notification-dot ${getNotificationDotClass(item.type)}`}
            />

            <div className="ax-flex ax-flex-col ax-min-w-0">
              <div
                className={`ax-text-sm ax-font-semibold ax-leading-snug ax-mb-1 ax-cursor-pointer ${
                  item.isRead ? 'ax-text-gray-500' : 'ax-text-primary'
                }`}
              >
                {item.referenceCode && `${item.referenceCode} - `}
                {item.title}
              </div>

              <div className="ax-text-xs ax-text-gray-600 ax-leading-relaxed ax-mb-1.5">
                {item.description}
              </div>

              <div className="ax-text-xs ax-text-gray-400">
                {formatNotificationTime(item.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = NOTIFICATION_TABS.map(({ id, label }) => {
    const items = SampleNotifications.filter(
      (item) => item.type === id
    );

    return {
      id,
      label: (
        <span className="ax-flex ax-items-center ax-gap-1-5">
          {label}

          {!!items.length && (
            <AXBadge
              propsLabel={items.length}
              propsSize="sm"
              propsRadius="full"
              propsClassName="ax-notification-badge"
            />
          )}
        </span>
      ),
      content: renderNotifications(items),
    };
  });

  return (
    <div className="ax-flex ax-flex-col">
      <div className="ax-flex ax-items-center ax-justify-between ax-px-4 ax-py-3 ax-bg-gray-50 ax-border-b ax-border-gray-200">
        <div className="ax-flex ax-items-center ax-gap-2 ax-text-sm ax-font-semibold ax-text-gray-900">
          <Icon name="bell" size={16} />
          <span>Notifications</span>
        </div>

        {onClose && (
          <button
            type="button"
            className="ax-flex ax-items-center ax-justify-center ax-w-6 ax-h-6 ax-border-0 ax-bg-transparent ax-text-gray-500 ax-cursor-pointer ax-p-0"
            onClick={onClose}
            aria-label="Close notifications"
          >
            <Icon name="x" size={16} />
          </button>
        )}
      </div>

      <AXTabsHorizontal
        propsSize="sm"
        propsDefaultTab={NOTIFICATION_TYPE.action}
        propsClassName="ax-flex ax-flex-col ax-flex-1"
        propsContentClassName="ax-p-0 ax-max-h-80 ax-overflow-y-auto"
        propsTabs={tabs}
      />
    </div>
  );
}

export default NotificationContent;

const SampleNotifications: NotificationItem[] = [
  {
    id: 1,
    type: 'action',
    referenceCode: 'LFS000271',
    title: 'Leave approval required.',
    description: 'Rahul requested leave for tomorrow.',
    isRead: false,
    createdAt: '2026-10-01T10:30:00',
    readAt: null,
    referenceId: 101,
  },
  {
    id: 2,
    type: 'action',
    referenceCode: 'FCS000124',
    title: 'Fee concession review required.',
    description: 'Fee concession request submitted by Priya.',
    isRead: false,
    createdAt: '2026-09-30T15:15:00',
    readAt: null,
    referenceId: 201,
  },
  {
    id: 3,
    type: 'alert',
    referenceCode: 'LFS000270',
    title: 'Your leave request has been approved.',
    description: 'Your leave request for tomorrow has been approved.',
    isRead: false,
    createdAt: '2026-10-01T09:45:00',
    readAt: null,
    referenceId: 102,
  },
  {
    id: 4,
    type: 'alert',
    referenceCode: 'ATT000301',
    title: 'Monthly attendance updated.',
    description: 'Your attendance report for September is now available.',
    isRead: true,
    createdAt: '2026-09-30T16:00:00',
    readAt: '2026-09-30T17:10:00',
    referenceId: 301,
  },
  {
    id: 5,
    type: 'general',
    referenceCode: 'EVT000401',
    title: 'Sports Day Tomorrow.',
    description: 'Sports Day starts tomorrow at 9:00 AM.',
    isRead: false,
    createdAt: '2026-10-01T08:00:00',
    readAt: null,
    referenceId: 401,
  },
  {
    id: 6,
    type: 'general',
    referenceCode: 'EVT000402',
    title: 'Annual Day.',
    description: 'Annual Day will be held on 10 October.',
    isRead: true,
    createdAt: '2026-09-30T16:30:00',
    readAt: '2026-09-30T18:00:00',
    referenceId: 402,
  },
];
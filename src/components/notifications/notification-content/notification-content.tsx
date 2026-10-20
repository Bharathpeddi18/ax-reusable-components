'use client';

import { useMemo } from 'react';
import Icon from '@/assets/icons';
import AXTabsHorizontal from '@/ax-reusable-components/ax-tabs-horizontal/ax-tabs-horizontal';
import AXBadge from '@/ax-reusable-components/ax-mini-components/ax-badge/ax-badge';
import { NOTIFICATION_TYPE } from '@/../global-config';
import { SAMPLE_NOTIFICATIONS, type NotificationItem } from '../sample-data';
import './notification-content.css';

export type { NotificationItem };

export interface NotificationContentProps {
  notifications?: NotificationItem[];
  onClose?: () => void;
}

const TABS = [
  { id: NOTIFICATION_TYPE.action, label: 'Actions' },
  { id: NOTIFICATION_TYPE.alert, label: 'Alerts' },
  { id: NOTIFICATION_TYPE.general, label: 'General' },
] as const;

const DOT_CLASSES: Record<string, string> = {
  [NOTIFICATION_TYPE.action]: 'ax-notification-dot-action',
  [NOTIFICATION_TYPE.alert]: 'ax-notification-dot-alert',
  [NOTIFICATION_TYPE.general]: 'ax-notification-dot-general',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <div className="ax-flex ax-gap-2-5 ax-px-4 ax-py-3">
      <span className={`ax-w-2 ax-h-2 ax-mt-2 ax-rounded-full ${DOT_CLASSES[item.type] || 'ax-bg-gray-400'}`} />
      <div className="ax-flex ax-flex-col ax-min-w-0">
        <div className={`ax-text-sm ax-font-semibold ax-leading-snug ax-mb-1 ax-cursor-pointer ${item.isRead ? 'ax-text-gray-500' : 'ax-text-primary'}`}>
          {item.referenceCode && `${item.referenceCode} - `}{item.title}
        </div>
        <div className="ax-text-xs ax-text-gray-600 ax-leading-relaxed ax-mb-1.5">{item.description}</div>
        <div className="ax-text-xs ax-text-gray-400">{formatDate(item.createdAt)}</div>
      </div>
    </div>
  );
}

function NotificationList({ items }: { items: NotificationItem[] }) {
  if (!items.length) {
    return <div className="ax-py-9 ax-text-center ax-text-xs ax-text-gray-400">No notifications</div>;
  }
  return (
    <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-300">
      {items.map((item) => (
        <NotificationRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export function NotificationContent({ notifications = SAMPLE_NOTIFICATIONS, onClose }: NotificationContentProps) {
  const tabs = useMemo(
    () =>
      TABS.map(({ id, label }) => {
        const items = notifications.filter((item) => item.type === id);
        return {
          id,
          label: (
            <span className="ax-flex ax-items-center ax-gap-1-5">
              {label}
              {items.length > 0 && (
                <AXBadge propsLabel={items.length} propsSize="sm" propsRadius="full" propsClassName="ax-notification-badge" />
              )}
            </span>
          ),
          content: <NotificationList items={items} />,
        };
      }),
    [notifications]
  );

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
        propsSize="md"
        propsDefaultTab={NOTIFICATION_TYPE.action}
        propsContentClassName="ax-p-0 ax-max-h-80 ax-overflow-y-auto"
        propsTabs={tabs}
      />
    </div>
  );
}

export default NotificationContent;
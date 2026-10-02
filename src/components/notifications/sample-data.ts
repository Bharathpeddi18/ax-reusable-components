import { NOTIFICATION_TYPE } from '@/../global-config';

export interface NotificationItem {
  id: number | string;
  type: NOTIFICATION_TYPE | string;
  referenceCode?: string;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
  referenceId: string | number | null;
}

export const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: NOTIFICATION_TYPE.action,
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
    type: NOTIFICATION_TYPE.action,
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
    type: NOTIFICATION_TYPE.alert,
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
    type: NOTIFICATION_TYPE.alert,
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
    type: NOTIFICATION_TYPE.general,
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
    type: NOTIFICATION_TYPE.general,
    referenceCode: 'EVT000402',
    title: 'Annual Day.',
    description: 'Annual Day will be held on 10 October.',
    isRead: true,
    createdAt: '2026-09-30T16:30:00',
    readAt: '2026-09-30T18:00:00',
    referenceId: 402,
  },
];

export const SampleNotifications = SAMPLE_NOTIFICATIONS;
export default SAMPLE_NOTIFICATIONS;

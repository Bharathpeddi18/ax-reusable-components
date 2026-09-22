export interface MenuItem {
  label: string;
  Icon: string;
  path: string;
}

export const menusConfig: MenuItem[] = [
  {
    label: 'Dashboard',
    Icon: 'squares-2x2',
    path: '/',
  },
  {
    label: 'All Components',
    Icon: 'cube',
    path: '/samples',
  },
  {
    label: 'Requirements',
    Icon: 'document-text',
    path: '/requirements',
  },
  {
    label: 'Create Requirement',
    Icon: 'plus-circle',
    path: '/create-requirement',
  },
  {
    label: 'Knowledge Graph',
    Icon: 'share',
    path: '/knowledge-graph',
  },
  {
    label: 'Announcements',
    Icon: 'bell',
    path: '/announcements',
  },
  {
    label: 'Settings',
    Icon: 'cog-6-tooth',
    path: '/settings',
  },
  {
    label: 'Site Feedback',
    Icon: 'chat-bubble-left-right',
    path: '/site-feedback',
  },
  {
    label: 'Release Notes',
    Icon: 'sparkles',
    path: '/release-notes',
  },
];

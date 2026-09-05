export interface MenuItem {
  label: string;
  Icon?: string;
  path: string;
  ActivePath?: string[];
  badge?: string;
  badgeColor?: 'accent' | 'success' | 'info';
  section?: string;
  subMenus?: MenuItem[];
}

export const menusConfig: MenuItem[] = [
  // 1. OVERVIEW
  {
    label: 'Dashboard',
    Icon: 'squares-2x2',
    path: '/',
    ActivePath: ['/', '/dashboard'],
    section: 'Main',
  },
  {
    label: 'All Components',
    Icon: 'cube',
    path: '/samples',
    ActivePath: ['/samples'],
    badge: 'Overview',
    badgeColor: 'info',
  },

  // 2. REUSABLE COMPONENTS
  {
    label: 'AXButton',
    Icon: 'cursor-arrow-rays',
    path: '/samples/button',
    ActivePath: ['/samples/button'],
    section: 'Components',
    badge: 'v2.0',
    badgeColor: 'accent',
  },
  {
    label: 'AXInputs',
    Icon: 'pencil-square',
    path: '/samples/inputs',
    ActivePath: ['/samples/inputs'],
    badge: 'Suite',
    badgeColor: 'accent',
  },
  {
    label: 'AXCard',
    Icon: 'squares-2x2',
    path: '/samples/card',
    ActivePath: ['/samples/card'],
    badge: '10/10',
    badgeColor: 'accent',
  },
  {
    label: 'AXPopover',
    Icon: 'chat-bubble-bottom-center-text',
    path: '/samples/popover',
    ActivePath: ['/samples/popover'],
    badge: 'Portals',
    badgeColor: 'info',
  },
  {
    label: 'AXPageHeader',
    Icon: 'rectangle-stack',
    path: '/samples/page-header',
    ActivePath: ['/samples/page-header'],
  },
  {
    label: 'AXTabs',
    Icon: 'queue-list',
    path: '/samples/tabs',
    ActivePath: ['/samples/tabs'],
    badge: 'v2.0',
    badgeColor: 'accent',
  },
  {
    label: 'AXAccordion',
    Icon: 'chevron-up-down',
    path: '/samples/accordion',
    ActivePath: ['/samples/accordion'],
    badge: '10/10',
    badgeColor: 'accent',
  },
  {
    label: 'AXDatePicker',
    Icon: 'calendar',
    path: '/samples/date-picker',
    ActivePath: ['/samples/date-picker'],
    badge: '10/10',
    badgeColor: 'accent',
  },

  // 3. WORKFLOW & SYSTEM
  {
    label: 'Create',
    Icon: 'plus-circle',
    path: '/create-requirement',
    ActivePath: ['/create-requirement', '/create-enhancement'],
    section: 'Workspace',
    subMenus: [
      {
        label: 'New Requirement',
        path: '/create-requirement',
        ActivePath: ['/create-requirement'],
      },
      {
        label: 'New Enhancement',
        path: '/create-enhancement',
        ActivePath: ['/create-enhancement'],
      },
    ],
  },
  {
    label: 'Requirements',
    Icon: 'document-text',
    path: '/requirements',
    ActivePath: ['/requirements', '/requirement-details'],
    badge: 'Active',
    badgeColor: 'success',
  },
  {
    label: 'Knowledge Graph',
    Icon: 'share',
    path: '/knowledge-graph',
    ActivePath: ['/knowledge-graph'],
  },
  {
    label: 'Announcements',
    Icon: 'bell',
    path: '/announcements',
    ActivePath: ['/announcements'],
  },

  // 4. MANAGEMENT & SUPPORT
  {
    label: 'Settings',
    Icon: 'cog-6-tooth',
    path: '/settings',
    ActivePath: ['/settings'],
    section: 'Preferences',
  },
  {
    label: 'Site Feedback',
    Icon: 'chat-bubble-left-right',
    path: '/site-feedback',
    ActivePath: ['/site-feedback'],
  },
  {
    label: 'Release Notes',
    Icon: 'sparkles',
    path: '/release-notes',
    ActivePath: ['/release-notes'],
    badge: 'v2.0.0',
    badgeColor: 'accent',
  },
];

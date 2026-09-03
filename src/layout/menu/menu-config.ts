export interface MenuItem {
  label: string;
  Icon?: string;
  path: string;
  ActivePath?: string[];
  subMenus?: MenuItem[];
}

export const menusConfig: MenuItem[] = [
  {
    label: 'Dashboard',
    Icon: 'A',
    path: '/dashboard',
    ActivePath: ['/dashboard'],
    subMenus: []
  },
  {
    label: 'Create',
    Icon: 'A',
    path: '/create-requirement',
    ActivePath: ['/create-requirement', '/create-enhancement'],
    subMenus: [
      {
        label: 'Requirement',
        Icon: 'A',
        path: '/create-requirement',
        ActivePath: ['/create-requirement'],
      },
      {
        label: 'Enhancement',
        Icon: 'A',
        path: '/create-enhancement',
        ActivePath: ['/create-enhancement'],
      },
    ],
  },
  {
    label: 'Requirements',
    Icon: 'A',
    path: '/requirements',
    ActivePath: ['/requirements', '/requirement-details'],
    subMenus: []
  },
  {
    label: 'Knowledge Graph',
    Icon: 'A',
    path: '/knowledge-graph',
    ActivePath: ['/knowledge-graph'],
    subMenus: []
  },
  {
    label: 'Announcements',
    Icon: 'A',
    path: '/announcements',
    ActivePath: ['/announcements'],
    subMenus: []
  },
  {
    label: 'Quick Links',
    Icon: 'A',
    path: '/quick-links',
    ActivePath: ['/quick-links'],
    subMenus: []
  },
  {
    label: 'Points of Contact Points of Contact',
    Icon: 'A',
    path: '/points-of-contact',
    ActivePath: ['/points-of-contact'],
    subMenus: []
  },
  {
    label: 'AAMO',
    Icon: 'A',
    path: '/aamo',
    ActivePath: ['/aamo'],
    subMenus: []
  },
  {
    label: 'Memo & Guidance',
    Icon: 'A',
    path: '/memo-guidance',
    ActivePath: ['/memo-guidance'],
    subMenus: []
  },
  {
    label: 'Settings',
    Icon: 'A',
    path: '/settings',
    ActivePath: ['/settings'],
    subMenus: []
  },
  {
    label: 'Site Feedback',
    Icon: 'A',
    path: '/site-feedback',
    ActivePath: ['/site-feedback'],
    subMenus: []
  },
  {
    label: 'Release Notes',
    Icon: 'A',
    path: '/release-notes',
    ActivePath: ['/release-notes'],
    subMenus: []
  },
];

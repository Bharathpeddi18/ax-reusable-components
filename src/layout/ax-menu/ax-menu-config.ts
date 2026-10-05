import { ROUTERS_PATHS, USER_ROLES } from "@/../global-config";

export type UserRole = (typeof USER_ROLES)[number];

export interface MenuItem {
  label: string;
  icon: string;
  path: string;
  roles: UserRole[];
  activePath?: string[];
}

export const menusConfig: MenuItem[] = [
  // {
  //   label: 'Home',
  //   icon: 'house',
  //   path: ROUTERS_PATHS.homeStudent,
  //   activePath: [ROUTERS_PATHS.homeStudent],
  //   roles: ['student'],
  // },
  {
    label: 'Dashboard',
    icon: 'grid',
    path: ROUTERS_PATHS.dashboardStudent,
    activePath: [ROUTERS_PATHS.dashboardStudent],
    roles: ['owner'],
  },
  {
    label: 'Create Student',
    icon: 'person-plus',
    path: ROUTERS_PATHS.createStudent,
    activePath: [ROUTERS_PATHS.createStudent],
    roles: ['owner'],
  },
  {
    label: 'Students',
    icon: 'people',
    path: ROUTERS_PATHS.listStudent,
    activePath: [ROUTERS_PATHS.listStudent, ROUTERS_PATHS.detailsStudent],
    roles: ['owner'],
  },

  // Shared
  {
    label: 'Announcements',
    icon: 'megaphone',
    path: ROUTERS_PATHS.announcements,
    activePath: [ROUTERS_PATHS.announcements],
    roles: ['owner', 'student'],
  },
  {
    label: 'Calendar',
    icon: 'calendar-event',
    path: ROUTERS_PATHS.calendar,
    activePath: [ROUTERS_PATHS.calendar],
    roles: ['owner', 'student'],
  },
  {
    label: 'Knowledge Articles',
    icon: 'book',
    path: ROUTERS_PATHS.knowledgeArticles,
    activePath: [ROUTERS_PATHS.knowledgeArticles],
    roles: ['owner', 'student'],
  },
  {
    label: 'Policy Memos & Guidelines',
    icon: 'folder2',
    path: ROUTERS_PATHS.policyGuidelines,
    activePath: [ROUTERS_PATHS.policyGuidelines],
    roles: ['owner', 'student'],
  },
  {
    label: 'Point of Contacts',
    icon: 'people',
    path: ROUTERS_PATHS.pointOfContacts,
    activePath: [ROUTERS_PATHS.pointOfContacts],
    roles: ['owner', 'student'],
  },
  {
    label: 'Quick Links',
    icon: 'link-45deg',
    path: ROUTERS_PATHS.quickLinks,
    activePath: [ROUTERS_PATHS.quickLinks],
    roles: ['owner', 'student'],
  },

  // Owner only
  {
    label: 'Settings',
    icon: 'gear',
    path: ROUTERS_PATHS.settings,
    activePath: [ROUTERS_PATHS.settings],
    roles: ['owner'],
  },
];
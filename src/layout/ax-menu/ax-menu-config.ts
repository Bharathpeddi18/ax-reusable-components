import { ROUTERS_PATHS, USER_ROLES } from "@/../global-config";

export type UserRole = typeof USER_ROLES.student | typeof USER_ROLES.owner;

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
  //   roles: [USER_ROLES.student],
  // },
  {
    label: 'Dashboard',
    icon: 'grid',
    path: ROUTERS_PATHS.dashboardStudent,
    activePath: [ROUTERS_PATHS.dashboardStudent],
    roles: [USER_ROLES.owner],
  },
  {
    label: 'Create Student',
    icon: 'person-plus',
    path: ROUTERS_PATHS.createStudent,
    activePath: [ROUTERS_PATHS.createStudent],
    roles: [USER_ROLES.owner],
  },
  {
    label: 'Students',
    icon: 'people',
    path: ROUTERS_PATHS.listStudent,
    activePath: [ROUTERS_PATHS.listStudent, ROUTERS_PATHS.detailsStudent],
    roles: [USER_ROLES.owner],
  },

  // Shared
  {
    label: 'Announcements',
    icon: 'megaphone',
    path: ROUTERS_PATHS.announcements,
    activePath: [ROUTERS_PATHS.announcements],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },
  {
    label: 'Calendar',
    icon: 'calendar-event',
    path: ROUTERS_PATHS.calendar,
    activePath: [ROUTERS_PATHS.calendar],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },
  {
    label: 'Knowledge Graph',
    icon: 'book',
    path: ROUTERS_PATHS.knowledgeGraph,
    activePath: [ROUTERS_PATHS.knowledgeGraph],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },
  {
    label: 'Policy Memos & Guidelines',
    icon: 'folder2',
    path: ROUTERS_PATHS.policyGuidelines,
    activePath: [ROUTERS_PATHS.policyGuidelines],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },
  {
    label: 'Point of Contacts',
    icon: 'people',
    path: ROUTERS_PATHS.pointOfContacts,
    activePath: [ROUTERS_PATHS.pointOfContacts],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },
  {
    label: 'Quick Links',
    icon: 'link-45deg',
    path: ROUTERS_PATHS.quickLinks,
    activePath: [ROUTERS_PATHS.quickLinks],
    roles: [USER_ROLES.owner, USER_ROLES.student],
  },

  // Owner only
  {
    label: 'Settings',
    icon: 'gear',
    path: ROUTERS_PATHS.settings,
    activePath: [ROUTERS_PATHS.settings],
    roles: [USER_ROLES.owner],
  },
];
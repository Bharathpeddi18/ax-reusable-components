// Initialize roles
export const USER_ROLES = { student: 'student', owner: 'owner' } as const;
export const currentUserRole = USER_ROLES.owner;

export const ROUTERS_PATHS = {
  homeStudent: '/home-student',
  dashboardStudent: '/dashboard-student',

  createStudent: '/create-student',
  listStudent: '/list-student',
  detailsStudent: '/details-student',

  announcements: '/announcements',
  calendar: '/calendar',

  knowledgeGraph: '/knowledge-graph',
  policyGuidelines: '/policy-guidelines',
  pointOfContacts: '/point-of-contacts',
  quickLinks: '/quick-links',
  settings: '/settings',
}


// region Enums
export enum NOTIFICATION_TYPE {
  general = 'general',
  alert = 'alert',
  action = 'action'
} 
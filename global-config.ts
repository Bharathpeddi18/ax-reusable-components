// Initialize roles
export const USER_ROLES = { STUDENT: 'student', OWNER: 'owner' } as const;
export const currentUserRole = USER_ROLES.OWNER;

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
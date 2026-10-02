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

export const DASHBOARD_COLORS = {
  // Boys and Girls colors - light blue and pink
  boys: '#1E88E5',        // Blue 600
  girls: '#EC407A',       // Pink 400

  // Grade colors - from green to red, with brown for F/Fail
  gradeA: '#8B5CF6',
gradeB: '#22C55E',
gradeC: '#38BDF8',
gradeD: '#FBBF24',
gradeE: '#F43F5E',
gradeF: '#E11D48',
};

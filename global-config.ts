// Initialize roles
export const USER_ROLES = {
  owner: 'owner',
  management: 'management',
  administrator: 'administrator',
  teacher: 'teacher',
  student: 'student',
} as const;

export const currentUserRole = USER_ROLES.administrator;

// region Enums

// Notification Types
export enum NOTIFICATION_TYPE {
  general = 'general',
  alert = 'alert',
  action = 'action'
}

// Notification Status
export enum NOTIFICATION_STATUS {
  read = 'read',
  unread = 'unread'
}

// Calendar Categories
export enum CALENDAR_CATEGORIES {
  general = 'general',
  events = 'events',
  meetings = 'meetings',
  trainings = 'trainings',
  exams = 'exams',
}

// region Colors
export const DASHBOARD_COLORS = {
  // Boys and Girls colors
  boys: '#1E88E5',        // 
  girls: '#ff65d3ff',

  // Grade colors
  gradeA: '#8B5CF6',
  gradeB: '#22C55E',
  gradeC: '#38BDF8',
  gradeD: '#FBBF24',
  gradeE: '#F43F5E',
  gradeF: '#E11D48',

  // Class Colors
  sectionA: '#7A2FD0',
  sectionB: '#8742D5',
  sectionC: '#9455DA',
  sectionD: '#A168DF',
  sectionE: '#AE7BE4',
  sectionF: '#BA8EE8',
  sectionG: '#C6A1EC',
  sectionH: '#D2B4F0',
  sectionI: '#DEC7F4',
  sectionJ: '#EADAF8',
};

// region Paths
export const ROUTERS_PATHS = {
  homeStudent: '/home-student',
  dashboardStudent: '/dashboard-student',

  createStudent: '/create-student',
  listStudent: '/list-student',
  detailsStudent: '/details-student',

  announcements: '/announcements',
  calendar: '/calendar',

  knowledgeArticles: '/knowledge-articles',
  policyGuidelines: '/policy-guidelines',
  pointOfContacts: '/point-of-contacts',
  quickLinks: '/quick-links',
  settings: '/settings',
}
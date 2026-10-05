// Initialize roles
export const USER_ROLES = ['owner', 'management', 'administrator', 'teacher', 'student'] as const;

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

  // Class
  sectionA: '#5964D8',
  sectionB: '#6671DF',
  sectionC: '#747FE5',
  sectionD: '#828DEB',
  sectionE: '#909BF0',
  sectionF: '#9EA9F4',
  sectionG: '#ACB7F7',
  sectionH: '#BBC5F9',
  sectionI: '#CAD3FB',
  sectionJ: '#D9E0FC',
};

export const AX_CHART_COLORS = [
  '#0088FF', // Blue
  '#34C759', // Green
  '#FF8D28', // Orange
  '#6155F5', // Indigo
  '#00C3D0', // Teal
  '#CB30E0', // Purple
  '#FF2D55', // Pink
  '#00C8B3', // Mint
  '#FFCC00', // Yellow
  '#4970FA', // Cobalt
  '#21C88A', // Emerald
  '#FF6935', // Coral
  '#00A5F4', // Sky
  '#9A4BEB', // Violet
  '#E43CA0', // Magenta
  '#D5874B', // Bronze
];

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
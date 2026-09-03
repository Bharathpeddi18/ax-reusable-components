import { IconMenu } from "@/assets/icons";

export const menusConfig = [
  {
    label: 'Dashboard',
    Icon: IconMenu,
    path: '/dashboard',
    ActivePath: ['/dashboard'],
    subMenus: []
  },
  {
    label: 'Create Requirement',
    Icon: IconMenu,
    path: '/create-requirement',
    ActivePath: ['/create-requirement'],
    subMenus: []
  },
  {
    label: 'Requirements',
    Icon: IconMenu,
    path: '/requirements',
    ActivePath: ['/requirements', '/requirement-details'],
    subMenus: []
  },
  {
    label: 'Knowledge Graph',
    Icon: IconMenu,
    path: '/knowledge-graph',
    ActivePath: ['/knowledge-graph'],
    subMenus: []
  },
  {
    label: 'Announcements',
    Icon: IconMenu,
    path: '/announcements',
    ActivePath: ['/announcements'],
    subMenus: []
  },
  {
    label: 'Quick Links',
    Icon: IconMenu,
    path: '/quick-links',
    ActivePath: ['/quick-links'],
    subMenus: []
  },
  {
    label: 'Points of Contact',
    Icon: IconMenu,
    path: '/points-of-contact',
    ActivePath: ['/points-of-contact'],
    subMenus: []
  },
  {
    label: 'AAMO',
    Icon: IconMenu,
    path: '/aamo',
    ActivePath: ['/aamo'],
    subMenus: []
  },
  {
    label: 'Memo & Guidance',
    Icon: IconMenu,
    path: '/memo-guidance',
    ActivePath: ['/memo-guidance'],
    subMenus: []
  },
  {
    label: 'Settings',
    Icon: IconMenu,
    path: '/settings',
    ActivePath: ['/settings'],
    subMenus: []
  },
  {
    label: 'Site Feedback',
    Icon: IconMenu,
    path: '/site-feedback',
    ActivePath: ['/site-feedback'],
    subMenus: []
  },
  {
    label: 'Release Notes',
    Icon: IconMenu,
    path: '/release-notes',
    ActivePath: ['/release-notes'],
    subMenus: []
  },
];
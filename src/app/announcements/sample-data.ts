// region Interfaces
export interface Announcement {
  id: string;
  title: string;
  contentHtml: string;
  category: 'Academic' | 'Examination' | 'Event' | 'Holiday' | 'General';
  priority: 'urgent' | 'high' | 'normal';
  isPinned?: boolean;
  createdBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string; // ISO date or formatted string
  targetAudience: string;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}
// endregion

// region Static Data (Chronological Order - Newest First)
export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-101',
    title: 'Mid-Term Examination Schedule & Guidelines Released (Fall 2026)',
    category: 'Examination',
    priority: 'urgent',
    isPinned: true,
    createdBy: {
      name: 'Dr. Robert Vance',
      role: 'Dean of Academic Affairs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: '2026-09-30T09:30:00Z',
    targetAudience: 'All High School Students & Faculty',
    contentHtml: `
      <p>The <strong>Mid-Term Examination Schedule</strong> for the Fall 2026 Semester is officially published. All students are requested to review the dates, time slots, and assigned examination halls carefully.</p>
      <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 20px; list-style-type: disc;">
        <li><strong>Exam Commencement Date:</strong> October 12, 2026</li>
        <li><strong>Reporting Time:</strong> 08:45 AM (Strict entry cutoff: 09:00 AM)</li>
        <li><strong>Required Materials:</strong> Valid Student ID Badge, Non-programmable scientific calculators for STEM subjects.</li>
        <li><strong>Prohibited Items:</strong> Smartwatches, smartphones, and unauthorized notes.</li>
      </ul>
      <p>For any clash in elective timetables, submit an academic grievance form to the Examination Cell before <em>October 5, 2026</em>.</p>
    `,
    attachments: [
      { name: 'Fall_2026_Exam_Timetable_Official.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Exam_Hall_Seat_Allocations.xlsx', size: '1.1 MB', type: 'excel' },
    ],
  },
  {
    id: 'ann-102',
    title: 'Annual STEM & Innovation Hackathon 2026 - Registration Open',
    category: 'Event',
    priority: 'high',
    isPinned: true,
    createdBy: {
      name: 'Dr. Michael Chang',
      role: 'Head of Computer Science Dept.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: '2026-09-29T14:15:00Z',
    targetAudience: 'Grades 9 - 12 (Teams of 2 to 4 members)',
    contentHtml: `
      <p>We are thrilled to announce the <strong>Astrax Annual STEM & Robotics Hackathon 2026</strong>! This 36-hour hackathon brings together young creators to solve real-world problems in <em>Artificial Intelligence, Clean Energy, and Assistive Technologies</em>.</p>
      <p style="margin-top: 6px;"><strong>Key Highlights & Awards:</strong></p>
      <ul style="margin-top: 4px; margin-bottom: 8px; padding-left: 20px; list-style-type: disc;">
        <li>Grand Prize: $5,000 Research Grant + Incubation Mentorship</li>
        <li>Runner Up: $2,500 Innovation Grant + Hardware Prototyping Kits</li>
        <li>Special Category: Best Green Technology Solution</li>
      </ul>
      <p>Early bird registrations close on <strong>October 15, 2026</strong>. Mentors and lab hardware access will be provided during workshop sessions.</p>
    `,
    attachments: [
      { name: 'Hackathon_Rules_and_Problem_Statements.pdf', size: '1.8 MB', type: 'pdf' },
    ],
  },
  {
    id: 'ann-103',
    title: 'Extended Central Library & Digital Research Lab Hours',
    category: 'Academic',
    priority: 'normal',
    createdBy: {
      name: 'Mrs. Clara Evans',
      role: 'Chief Librarian',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: '2026-09-28T11:00:00Z',
    targetAudience: 'All Enrolled Students',
    contentHtml: `
      <p>In order to support students during the upcoming midterm preparation period, the <strong>Central Library</strong> and <strong>Digital Research Wing</strong> will operate with extended hours starting next Monday.</p>
      <ul style="margin-top: 6px; margin-bottom: 6px; padding-left: 20px; list-style-type: disc;">
        <li><strong>Monday to Friday:</strong> 07:30 AM – 11:00 PM</li>
        <li><strong>Saturday & Sunday:</strong> 09:00 AM – 08:00 PM</li>
        <li><strong>Quiet Study Zones:</strong> 2nd Floor Reference Section & Group Study Pods 1–6</li>
      </ul>
      <p>Digital subscriptions to IEEE Xplore, JSTOR, and Springer are accessible via campus WiFi and the student portal.</p>
    `,
  },
  {
    id: 'ann-104',
    title: 'Fall Semester Sports Gala & Inter-House Athletics Qualifiers',
    category: 'Event',
    priority: 'normal',
    createdBy: {
      name: 'Coach Marcus Vance',
      role: 'Director of Physical Education',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    },
    createdAt: '2026-09-26T16:45:00Z',
    targetAudience: 'All House Members & Athletes',
    contentHtml: `
      <p>House Athletics Qualifiers for the <strong>Fall 2026 Sports Meet</strong> will take place this weekend at the Main Track & Stadium Grounds.</p>
      <p style="margin-top: 6px;">Events include: <em>100m Sprint, 400m Relay, High Jump, Basketball 3v3, and Table Tennis Singles</em>. Please wear official house jerseys and athletic footwear.</p>
    `,
    attachments: [
      { name: 'Sports_Meet_Events_Schedule.pdf', size: '850 KB', type: 'pdf' },
    ],
  },
  {
    id: 'ann-105',
    title: 'Campus Network Maintenance & Portal Upgrade Notification',
    category: 'General',
    priority: 'high',
    createdBy: {
      name: 'IT Services Directorate',
      role: 'Infrastructure & Security Team',
    },
    createdAt: '2026-09-24T18:00:00Z',
    targetAudience: 'Entire Campus Community',
    contentHtml: `
      <p>Routine maintenance and security patch deployment will be performed on the primary campus server cluster on <strong>Saturday, October 3, between 02:00 AM and 06:00 AM EST</strong>.</p>
      <p style="margin-top: 6px;">During this maintenance window, the <em>Student Portal, LMS, and Virtual Lab remote access</em> will experience intermittent downtime. Please save and submit any pending online assignments beforehand.</p>
    `,
  },
  {
    id: 'ann-106',
    title: 'National Day Holiday Notice & Campus Closure',
    category: 'Holiday',
    priority: 'normal',
    createdBy: {
      name: 'Office of the Principal',
      role: 'General Administration',
    },
    createdAt: '2026-09-20T10:00:00Z',
    targetAudience: 'All Students, Faculty & Staff',
    contentHtml: `
      <p>All students and staff are hereby notified that the school and administrative offices will remain closed on <strong>Monday, October 5, 2026</strong> in observance of the <strong>National Day</strong> holiday.</p>
      <p style="margin-top: 6px;">Regular academic classes and administrative services will resume on <em>Tuesday, October 6, 2026 at 08:00 AM</em>.</p>
    `,
  },
];
// endregion

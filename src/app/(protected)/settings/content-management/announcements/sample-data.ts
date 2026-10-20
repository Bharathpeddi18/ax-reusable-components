import { Announcement } from './announcements';

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to the New Intranet Portal',
    description: '<p>We are thrilled to announce the launch of our updated company intranet portal. Here you will find all the <strong>latest resources, tools, and company news</strong> in one centralized location. Please take a moment to <a href="/settings/profile" rel="noopener noreferrer" target="_blank">update your profile</a> and explore the new features.</p><ul><li>New robust search functionality</li><li>Streamlined navigation</li><li>Enhanced security protocols</li></ul>',
    expiryDate: '2026-12-31T23:59:59.000Z',
    isArchived: 'No'
  },
  {
    id: '2',
    title: 'Annual Benefit Enrollment Period',
    description: '<p>The open enrollment period for our annual employee benefits will begin on <em>November 1st</em> and close on <em>November 15th</em>. During this time, you can make changes to your health insurance, dental, vision, and retirement plans.</p><p><br></p><p>Please review the updated benefits guide located in the Knowledge Articles section before making your selections.</p>',
    expiryDate: '2026-11-16T00:00:00.000Z',
    isArchived: 'No'
  },
  {
    id: '3',
    title: 'Urgent: IT Scheduled Maintenance',
    description: '<p><strong style="color: red;">URGENT NOTIFICATION</strong></p><p>The IT department will be performing critical server upgrades this weekend. All internal network drives and the VPN will be unavailable from <strong>Friday at 10:00 PM EST</strong> until <strong>Sunday at 8:00 AM EST</strong>.</p><blockquote>Please ensure all active work is saved to your local machine prior to the downtime.</blockquote>',
    expiryDate: '2026-10-31T00:00:00.000Z',
    isArchived: 'Yes'
  },
  {
    id: '4',
    title: 'Q3 Town Hall Meeting',
    description: '<p>Join us for the <strong>Q3 Global Town Hall Meeting</strong> next Wednesday. Our executive team will be discussing our Q3 performance, celebrating recent wins, and laying out the strategic roadmap for Q4.</p><ul><li><strong>Date:</strong> Next Wednesday</li><li><strong>Time:</strong> 1:00 PM - 2:30 PM EST</li><li><strong>Location:</strong> Main Auditorium &amp; Virtual Link</li></ul><p>We look forward to seeing everyone there!</p>',
    expiryDate: '2026-10-25T00:00:00.000Z',
    isArchived: 'No'
  }
];

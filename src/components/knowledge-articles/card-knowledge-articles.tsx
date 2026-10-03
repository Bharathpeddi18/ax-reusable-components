'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import { useRouter } from 'next/navigation';
import { ROUTERS_PATHS } from '../../../global-config';

const knowledgeArticles = [
  { id: 1, title: 'Student Attendance Guidelines', description: '<p>Student attendance should be recorded accurately during every morning and afternoon session. Teachers should verify attendance before completing the session and ensure students on approved leave are properly marked. Any incorrect attendance information should be reported and corrected through the appropriate school administration process.</p>', updatedBy: 'Harsha', updatedAt: '2026-10-03T10:30:00', isArchived: false },
  { id: 2, title: 'Academic Year Configuration', description: '<p>The academic year configuration determines the currently active academic period throughout the application. Student classes, sections, teachers, attendance and other academic information are associated with the active academic year to maintain historical information correctly.</p>', updatedBy: 'Bharath', updatedAt: '2026-10-02T15:45:00', isArchived: false },
  { id: 3, title: 'Student Profile Management', description: '<p>Student profiles contain personal information, parent details, academic information, documents and school-related information. Administrators should ensure all required details are completed and verified during admission before the student\'s profile becomes active.</p>', updatedBy: 'Admin', updatedAt: '2026-10-01T09:15:00', isArchived: false },
  { id: 4, title: 'Previous Admission Guidelines', description: '<p>Archived article.</p>', updatedBy: 'Admin', updatedAt: '2026-09-15T09:00:00', isArchived: true },
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

export const CardKnowledgeArticles = () => {
  const router = useRouter();
  const articles = knowledgeArticles.filter((a) => !a.isArchived).slice(0, 3);

  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-py-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1 className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary" tabIndex={0}>
            Knowledge Articles
          </h1>
          <div className="ax-flex ax-items-center ax-ms-auto">
            <AXButton
              propsLabel="View All"
              propsSize="sm"
              className="ax-text-xs ax-font-semibold ax-text-primary hover:ax-underline ax-whitespace-nowrap ax-cursor-pointer"
              onClick={() => router.push(ROUTERS_PATHS.knowledgeArticles)}
            />
          </div>
        </div>
      }
      propsBody={
        <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-300">
          {articles.map(({ id, title, description, updatedBy, updatedAt }) => (
            <div key={id} className="ax-py-3 ax-line-clamp-2">
              <h2 className="ax-text-sm ax-font-semibold ax-text-primary ax-mb-1">{title}</h2>
              <div
                className="ax-line-clamp-2 ax-text-sm ax-font-normal ax-text-base"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-1 ax-mt-1 ax-text-xs ax-text-gray-500 ax-line-clamp-1">
                <span>Updated by <span className="ax-font-medium ax-text-gray-700">{updatedBy}</span></span>
                <span>|</span>
                <span>{formatDate(updatedAt)}</span>
                <span>|</span>
                <span>{formatTime(updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default CardKnowledgeArticles;
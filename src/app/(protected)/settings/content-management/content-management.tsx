'use client';

import { AXTabsVertical } from '../../../../ax-reusable-components/ax-tabs-vertical/ax-tabs-vertical';

import Announcements from './announcements/announcements';
import KnowledgeArticles from './knowledge-articles/knowledge-articles';
import QuickLinks from './quick-links/quick-links';
import PointsOfContacts from './points-of-contacts/points-of-contacts';
import QuestionAndAnswers from './question-and-answers/question-and-answers';
import PolicyMemosGuidelines from './policy-memos-guidelines/policy-memos-guidelines';
import CalendarComponents from './calendar/calendar';

export default function ContentManagement() {
  const contentTabs = [
    { id: 'announcements', label: 'Announcements', content: <Announcements /> },
    { id: 'knowledge-articles', label: 'Knowledge Articles', content: <KnowledgeArticles /> },
    { id: 'quick-links', label: 'Quick Links', content: <QuickLinks /> },
    { id: 'points-of-contacts', label: 'Points of Contacts', content: <PointsOfContacts /> },
    { id: 'question-and-answers', label: 'Question and Answers', content: <QuestionAndAnswers /> },
    { id: 'policy-memos-guidelines', label: 'Policy Memos Guidelines', content: <PolicyMemosGuidelines /> },
    { id: 'calendar', label: 'Calendar', content: <CalendarComponents /> },
  ];

  return (
    <AXTabsVertical
      propsTabs={contentTabs}
      propsSize="md"
      propsTabClassName='ax-py-3 ax-rounded-lg'
      propsTabsListClassName="ax-p-3 ax-bg-white ax-rounded-xl ax-shadow-md"
      propsContentClassName="ax-ms-3 ax-p-4 ax-bg-white ax-rounded-xl ax-shadow-md"
    />
  );
}

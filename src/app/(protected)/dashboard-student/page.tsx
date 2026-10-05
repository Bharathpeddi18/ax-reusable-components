'use client';

import Icon from '@/assets/icons';
import AXPageHeader from '@/ax-reusable-components/ax-page-header/ax-page-header';
import Kpis from './kpis/kpis';
import Charts, { ChartStudentsByClass } from './charts/chart-students-by-class';
import ChartStudentsByGender from './charts/chart-students-by-gender';
import ChartStudentsByGrade from './charts/chart-students-by-grade';
import Filters from './filters/filters';
import CardKnowledgeArticles from '@/components/knowledge-articles/card-knowledge-articles';
import CardAnnouncements from '@/components/announcements/card-announcements';
import CardQuickLinks from '@/components/quick-links/card-quick-links';
import CardCalendar from '@/components/calendar/card-calendar';
import CardPointsOfContact from '@/components/points-of-contacts/card-points-of-contacts';
import AuthGuard from '@/components/auth/auth-guard';
import { USER_ROLES } from '../../../../global-config';

// region Main Component
export default function DashboardStudentPage() {
  return (
    <>
      <AuthGuard allowedRoles={['owner']}>
        <AXPageHeader
          propsPageTitle="Dashboard"
          propsLeftContent={
            <div className="ax-flex ax-items-center ax-gap-1">
              <Icon name="grid-fill" size={20} className="ax-text-primary" />
              <h1 className="ax-text-lg ax-font-semibold" tabIndex={0}>
                Dashboard
              </h1>
            </div>
          }
          propsRightContent={
            <>
              <Filters />
            </>
          }
        />

        <main className='ax-container'>
          <Kpis />
          <div className="ax-grid ax-grid-cols-12 ax-gap-4 ax-mt-4">
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <ChartStudentsByClass />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <ChartStudentsByGender />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <ChartStudentsByGrade />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <CardKnowledgeArticles />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <CardAnnouncements />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <CardQuickLinks />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <CardCalendar />
            </div>
            <div className="ax-col-span-12 md:ax-col-span-6 xl:ax-col-span-4">
              <CardPointsOfContact />
            </div>
          </div>
        </main>
      </AuthGuard>
    </>
  );
}

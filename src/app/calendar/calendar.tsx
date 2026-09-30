'use client';

import { AXPageHeader } from '@/ax-reusable-components/ax-page-header/ax-page-header';
import AXCalendar, { AXCalendarEvent } from './ax-calendar/ax-calendar';

export default function CalendarPage() {

  const events: AXCalendarEvent[] = [
    {
      id: '1',
      title: 'School Holiday',
      start: '2026-10-02',
      allDay: true,
    },

    {
      id: '2',
      title: 'Parent Meeting',
      start: '2026-10-08T10:00:00',
      end: '2026-10-08T12:00:00',
    },

    {
      id: '3',
      title: 'Science Examination',
      start: '2026-10-15T09:30:00',
      end: '2026-10-15T11:30:00',
    },

    {
      id: '4',
      title: 'Sports Day',
      start: '2026-10-22',
      allDay: true,
    },
  ];


  return (
    <>

      <AXPageHeader
        propsPageTitle="Calendar"

        propsLeftContent={
          <h1
            className="
              ax-text-base
              ax-font-semibold
            "
          >
            Calendar
          </h1>
        }
      />


      <main
        className="
          ax-p-4
          md:ax-p-6
        "
      >

        <div className="ax-container">

          <AXCalendar
            propsEvents={
              events
            }

            propsOnDateClick={(
              date
            ) => {
              console.log(
                'Date:',
                date
              );
            }}

            propsOnEventClick={(
              event
            ) => {
              console.log(
                'Event:',
                event
              );
            }}
          />

        </div>

      </main>

    </>
  );
}
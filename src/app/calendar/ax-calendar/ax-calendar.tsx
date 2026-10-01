'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import type {
  DateClickInfo,
  EventClickInfo,
  EventInput,
} from '@fullcalendar/react';
import '@fullcalendar/react/skeleton.css';
import './ax-calendar.css';

// region Types
export interface CalendarEvent extends EventInput {
  id?: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

// region Interfaces
export interface CalendarProps {
  propsEvents?: CalendarEvent[];
  propsInitialView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
  propsHeight?: number | string;
  propsEditable?: boolean;
  propsSelectable?: boolean;
  propsClassName?: string;
  propsOnDateClick?: (date: string) => void;
  propsOnEventClick?: (event: CalendarEvent) => void;
}

// region Main Component
export const Calendar = ({
  propsEvents = [],
  propsInitialView = 'dayGridMonth',
  propsHeight = 'auto',
  propsEditable = false,
  propsSelectable = true,
  propsClassName = '',
  propsOnDateClick,
  propsOnEventClick,
}: CalendarProps) => {
  // region Date Click
  const handleDateClick = (arg: DateClickInfo) => {
    propsOnDateClick?.(arg.dateStr);
  };

  // region Event Click
  const handleEventClick = (arg: EventClickInfo) => {
    const matchedEvent = propsEvents.find(
      (event) => event.id === arg.event.id
    );

    if (matchedEvent) {
      propsOnEventClick?.(matchedEvent);
    }
  };

  return (
    <div className={`ax-calendar ${propsClassName}`.trim()}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={propsInitialView}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={propsEvents}
        editable={propsEditable}
        selectable={propsSelectable}
        dayMaxEvents
        weekends
        nowIndicator
        height={propsHeight}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
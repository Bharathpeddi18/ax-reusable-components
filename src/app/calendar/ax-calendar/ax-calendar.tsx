'use client';
import './ax-calendar.css'

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

export interface AXCalendarEvent
  extends EventInput {

  id?: string;

  title: string;

  start: string;

  end?: string;

  allDay?: boolean;
}

// endregion


// region Interfaces

export interface AXCalendarProps {

  propsEvents?: AXCalendarEvent[];

  propsInitialView?:
    | 'dayGridMonth'
    | 'timeGridWeek'
    | 'timeGridDay';

  propsHeight?:
    | number
    | string;

  propsEditable?: boolean;

  propsSelectable?: boolean;

  propsClassName?: string;

  propsOnDateClick?: (
    date: string
  ) => void;

  propsOnEventClick?: (
    event: AXCalendarEvent
  ) => void;
}

// endregion


// region Main Component

export const AXCalendar = ({
  propsEvents = [],

  propsInitialView =
    'dayGridMonth',

  propsHeight =
    'auto',

  propsEditable =
    false,

  propsSelectable =
    true,

  propsClassName =
    '',

  propsOnDateClick,

  propsOnEventClick,
}: AXCalendarProps) => {


  // region Date Click

  const handleDateClick = (
    info: DateClickInfo
  ) => {

    propsOnDateClick?.(
      info.dateStr
    );

  };

  // endregion


  // region Event Click

  const handleEventClick = (
    info: EventClickInfo
  ) => {

    propsOnEventClick?.({

      id:
        info.event.id,

      title:
        info.event.title,

      start:
        info.event.startStr,

      end:
        info.event.endStr ||
        undefined,

      allDay:
        info.event.allDay,

      ...info.event.extendedProps,

    });

  };

  // endregion


  // region Main Return

  return (
    <div
      className={[
        'ax-calendar',
        propsClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >

      <FullCalendar

        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}

        initialView={
          propsInitialView
        }

        headerToolbar={{
          left:
            'prev,next today',

          center:
            'title',

          right:
            'dayGridMonth,timeGridWeek,timeGridDay',
        }}

        buttons={{
          today: {
            text: 'Today',
          },

          month: {
            text: 'Month',
          },

          week: {
            text: 'Week',
          },

          day: {
            text: 'Day',
          },
        }}

        events={
          propsEvents
        }

        editable={
          propsEditable
        }

        selectable={
          propsSelectable
        }

        dayMaxEvents

        weekends

        nowIndicator

        height={
          propsHeight
        }

        dateClick={
          handleDateClick
        }

        eventClick={
          handleEventClick
        }

      />

    </div>
  );

};

// endregion


export default AXCalendar;
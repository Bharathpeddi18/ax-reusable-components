'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import { useRouter } from 'next/navigation';
import { ROUTERS_PATHS } from '../../../global-config';

export enum CALENDAR_CATEGORIES {
    general = 'general',
    events = 'events',
    meetings = 'meetings',
    trainings = 'trainings',
    exams = 'exams',
}

export interface CalendarEvent {
    id: number;
    eventTitle: string;
    eventDescription: string;
    eventLocation: string;
    eventStartDate: string;
    eventEndDate: string;
    eventTimings: string;
    eventCategory: CALENDAR_CATEGORIES;
}

const calendarEvents: CalendarEvent[] = [
    {
        id: 1,
        eventTitle: 'Parent-Teacher Meeting',
        eventDescription: 'Discussion regarding student academic progress and performance.',
        eventLocation: 'School Auditorium',
        eventStartDate: '2026-10-05',
        eventEndDate: '2026-10-05',
        eventTimings: '09:00 AM - 12:00 PM',
        eventCategory: CALENDAR_CATEGORIES.meetings,
    },
    {
        id: 2,
        eventTitle: 'Mathematics Mid-Term Examination',
        eventDescription: 'Mid-term examination for students from Classes 8 to 10.',
        eventLocation: 'Respective Classrooms',
        eventStartDate: '2026-10-07',
        eventEndDate: '2026-10-07',
        eventTimings: '09:30 AM - 12:30 PM',
        eventCategory: CALENDAR_CATEGORIES.exams,
    },
    {
        id: 3,
        eventTitle: 'Annual Sports Day',
        eventDescription: 'Annual inter-house sports competitions and student activities.',
        eventLocation: 'School Playground',
        eventStartDate: '2026-10-10',
        eventEndDate: '2026-10-10',
        eventTimings: '08:00 AM - 04:00 PM',
        eventCategory: CALENDAR_CATEGORIES.events,
    },
    {
        id: 4,
        eventTitle: 'Teacher Development Workshop',
        eventDescription: 'Training session on modern classroom teaching methodologies.',
        eventLocation: 'Conference Hall',
        eventStartDate: '2026-10-12',
        eventEndDate: '2026-10-12',
        eventTimings: '10:00 AM - 01:00 PM',
        eventCategory: CALENDAR_CATEGORIES.trainings,
    },
];

const categoryConfig = {
    [CALENDAR_CATEGORIES.general]: {
        label: 'General',
        color: 'ax-bg-gray-500',
    },
    [CALENDAR_CATEGORIES.events]: {
        label: 'Events',
        color: 'ax-bg-warning',
    },
    [CALENDAR_CATEGORIES.meetings]: {
        label: 'Meetings',
        color: 'ax-bg-info',
    },
    [CALENDAR_CATEGORIES.trainings]: {
        label: 'Trainings',
        color: 'ax-bg-purple',
    },
    [CALENDAR_CATEGORIES.exams]: {
        label: 'Exams',
        color: 'ax-bg-danger',
    },
};

const getDate = (date: string) => {
    const d = new Date(`${date}T00:00:00`);

    return {
        day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
        month: d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
    };
};

export const CardCalendar = () => {
    const router = useRouter();
    const events = calendarEvents.slice(0, 3);

    const categories = [
        ...new Set(events.map((event) => event.eventCategory)),
    ];

    return (
        <AXCard
            propsSize="lg"
            propsHeaderClassName="ax-pt-2 ax-pb-0"
            propsBodyClassName="ax-pt-0"
            propsHeader={
                <div className="ax-flex ax-items-center ax-gap-1">
                    <h1
                        className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
                        tabIndex={0}
                    >
                        Upcoming Events
                    </h1>

                    <div className="ax-flex ax-items-center ax-ms-auto">
                        <AXButton
                            propsLabel="View All"
                            propsSize="sm"
                            className="ax-text-xs ax-font-semibold ax-text-primary hover:ax-underline ax-whitespace-nowrap ax-cursor-pointer"
                            onClick={() => router.push(ROUTERS_PATHS.calendar)}
                        />
                    </div>
                </div>
            }
            propsBody={
                <>
                    {/* Categories */}
                    <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-4 ax-py-3">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="ax-flex ax-items-center ax-gap-1 ax-text-xs ax-font-medium ax-text-gray-600"
                            >
                                <span
                                    className={`ax-w-2 ax-h-2 ax-rounded-full ${categoryConfig[category].color}`}
                                />

                                <span>{categoryConfig[category].label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Events */}
                    <div className="ax-flex ax-flex-col ax-gap-2">
                        {events.map((event) => {
                            const date = getDate(event.eventStartDate);
                            const category = categoryConfig[event.eventCategory];

                            return (
                                <div
                                    key={event.id}
                                    className="ax-flex ax-items-center ax-gap-3 ax-p-2 ax-border-2 ax-rounded-xl"
                                >
                                    {/* Date */}
                                    <div className="ax-flex ax-flex-col ax-items-center ax-justify-center ax-w-12 ax-h-12 ax-rounded-lg ax-bg-primary-light ax-flex-shrink-0">
                                        <span className="ax-text-md ax-font-bold ax-text-primary">
                                            {date.day}
                                        </span>

                                        <span className="ax-text-xs ax-font-semibold ax-text-gray-500">
                                            {date.month}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="ax-flex-1 ax-min-w-0">
                                        <h2 className="ax-text-sm ax-font-semibold ax-text-primary ax-mb-1 ax-truncate">
                                            {event.eventTitle}
                                        </h2>

                                        <p className="ax-m-0 ax-line-clamp-1 ax-text-xs ax-font-normal ax-text-gray-500">
                                            {event.eventDescription}
                                        </p>

                                        <div className="ax-flex ax-flex-wrap ax-items-center ax-gap-1 ax-mt-1 ax-text-xs ax-text-gray-500 ax-line-clamp-1">
                                            <span>{event.eventLocation}</span>
                                            <span>|</span>
                                            <span>{event.eventTimings}</span>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <span
                                        title={category.label}
                                        className={`ax-w-2 ax-h-2 ax-rounded-full ax-flex-shrink-0 ${category.color}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </>
            }
        />
    );
};

export default CardCalendar;
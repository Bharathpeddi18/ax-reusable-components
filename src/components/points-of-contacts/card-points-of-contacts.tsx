'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import Icon from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { ROUTERS_PATHS } from '../../../global-config';

const pointsOfContact = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    designation: 'Principal',
    email: 'principal@school.edu.in',
    isActive: true,
  },
  {
    id: 2,
    name: 'Anitha Reddy',
    designation: 'Academic Coordinator',
    email: 'academics@school.edu.in',
    isActive: true,
  },
  {
    id: 3,
    name: 'Suresh Babu',
    designation: 'Administration Officer',
    email: 'admin@school.edu.in',
    isActive: true,
  },
  {
    id: 4,
    name: 'Priya Sharma',
    designation: 'Student Welfare Coordinator',
    email: 'studentwelfare@school.edu.in',
    isActive: true,
  },
  {
    id: 5,
    name: 'Arun Kumar',
    designation: 'Examination Coordinator',
    email: 'exams@school.edu.in',
    isActive: true,
  },
  {
    id: 6,
    name: 'Lakshmi Devi',
    designation: 'Parent Relations Coordinator',
    email: 'parents@school.edu.in',
    isActive: true,
  },
];

export const CardPointsOfContact = () => {
  const router = useRouter();

  const contacts = pointsOfContact
    .filter((contact) => contact.isActive)
    .slice(0, 4);

  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-py-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h3
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
            Points of Contact
          </h3>

          <div className="ax-flex ax-items-center ax-ms-auto">
            <AXButton
              propsLabel="View All"
              propsSize="sm"
              className="ax-text-xs ax-font-semibold ax-text-primary hover:ax-underline ax-whitespace-nowrap ax-cursor-pointer"
              onClick={() => router.push(ROUTERS_PATHS.pointOfContacts)}
            />
          </div>
        </div>
      }
      propsBody={
        <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-300">
          {contacts.map(({ id, name, designation, email }) => (
            <div
              key={id}
              className="ax-flex ax-items-center ax-gap-4 ax-py-3"
            >
              {/* Avatar */}
              <div className="ax-flex ax-items-center ax-justify-center ax-w-12 ax-h-12 ax-rounded-full ax-bg-primary-light ax-flex-shrink-0">
                <Icon
                  name="person"
                  size={22}
                  className="ax-text-primary"
                />
              </div>

              {/* Contact Details */}
              <div className="ax-flex ax-flex-col ax-min-w-0 ax-gap-0.5">
                <h2 className="ax-m-0 ax-text-sm ax-font-semibold ax-text-base ax-truncate">
                  {name}
                </h2>

                <div className="ax-flex ax-items-center ax-gap-1-5">
                  <Icon name="briefcase" size={12} className="ax-text-gray-500 ax-flex-shrink-0" />
                  <span className="ax-text-xs ax-font-medium ax-text-gray-500 ax-truncate">
                    {designation}
                  </span>
                </div>

                <div className="ax-flex ax-items-center ax-gap-1-5">
                  <Icon name="envelope" size={12} className="ax-text-primary ax-flex-shrink-0" />
                  <a
                    href={`mailto:${email}`}
                    className="ax-text-xs ax-font-medium ax-text-primary ax-no-underline hover:ax-underline ax-truncate"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default CardPointsOfContact;
'use client';

import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import { useRouter } from 'next/navigation';
import { ROUTERS_PATHS } from '../../../global-config';

const quickLinks = [
  {
    id: 1,
    title: 'CBSE Results',
    description: 'Check CBSE examination results and related updates.',
    url: 'https://results.cbse.nic.in',
    isActive: true,
  },
  {
    id: 2,
    title: 'National Scholarship Portal',
    description: 'Access scholarship applications, status and eligibility details.',
    url: 'https://scholarships.gov.in',
    isActive: true,
  },
  {
    id: 3,
    title: 'Education News',
    description: 'View the latest education news, exams and academic updates.',
    url: 'https://www.thehindu.com/education/',
    isActive: true,
  },
  {
    id: 4,
    title: 'Previous Results Portal',
    description: 'Access previous examination results.',
    url: 'https://example.com',
    isActive: true,
  },
  {
    id: 5,
    title: 'CBSE Academic',
    description: 'Access CBSE curriculum, circulars, academic resources and updates.',
    url: 'https://cbseacademic.nic.in',
    isActive: true,
  },
  {
    id: 6,
    title: 'NCERT',
    description: 'Access NCERT textbooks, publications and educational resources.',
    url: 'https://ncert.nic.in',
    isActive: true,
  },
  {
    id: 7,
    title: 'DIKSHA',
    description: 'Explore digital learning resources for students and teachers.',
    url: 'https://diksha.gov.in',
    isActive: true,
  },
  {
    id: 8,
    title: 'National Testing Agency',
    description: 'View examination notifications, registrations and results.',
    url: 'https://nta.ac.in',
    isActive: true,
  },
  {
    id: 9,
    title: 'DigiLocker',
    description: 'Access digital academic certificates, marksheets and documents.',
    url: 'https://www.digilocker.gov.in',
    isActive: true,
  },
  {
    id: 10,
    title: 'SWAYAM',
    description: 'Access online courses and learning resources across subjects.',
    url: 'https://swayam.gov.in',
    isActive: true,
  },
];

export const CardQuickLinks = () => {
  const router = useRouter();
  const items = quickLinks.filter((i) => i.isActive).slice(0, 10);

  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-py-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1 className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary" tabIndex={0}>
            Quick Links
          </h1>
          <div className="ax-flex ax-items-center ax-ms-auto">
            <AXButton
              propsLabel="View All"
              propsSize="sm"
              className="ax-text-xs ax-font-semibold ax-text-primary hover:ax-underline ax-whitespace-nowrap"
              onClick={() => router.push(ROUTERS_PATHS.quickLinks)}
            />
          </div>
        </div>
      }
      propsBody={
        <div className="ax-flex ax-flex-col">
          {items.map(({ id, url, title, description }) => (
            <div key={id} className="ax-py-1">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-inline-block ax-text-sm ax-font-semibold ax-text-primary ax-no-underline hover:ax-underline"
              >
                {title}
              </a>
            </div>
          ))}
        </div>
      }
    />
  );
};

export default CardQuickLinks;
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
];

export const CardQuickLinks = () => {
  const router = useRouter();

  const items = quickLinks
    .filter((item) => item.isActive)
    .slice(0, 4);

  return (
    <AXCard
      propsSize="lg"
      propsHeaderClassName="ax-pt-2 ax-pb-0"
      propsBodyClassName="ax-py-0"
      propsHeader={
        <div className="ax-flex ax-items-center ax-gap-1">
          <h1
            className="ax-text-md ax-font-semibold ax-title-border ax-title-border-primary"
            tabIndex={0}
          >
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
        <div className="ax-flex ax-flex-col ax-divide-y ax-divide-gray-300">
  {items.map((item) => (
    <div key={item.id} className="ax-py-3">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="ax-inline-block ax-text-sm ax-font-semibold ax-text-primary ax-no-underline hover:ax-underline"
      >
        {item.title}
      </a>

      <p className="ax-mt-1 ax-mb-0 ax-line-clamp-2 ax-text-sm ax-font-normal ax-text-base">
        {item.description}
      </p>
    </div>
  ))}
</div>
      }
    />
  );
};

export default CardQuickLinks;
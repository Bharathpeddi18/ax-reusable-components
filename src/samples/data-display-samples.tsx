'use client';

import React, { useState } from 'react';
import { AXBadge } from '../components/ax-badge';
import { AXAvatar, AXAvatarGroup } from '../components/ax-avatar';
import { AXDataTable, AXColumnDef } from '../components/ax-table';
import { AXPagination } from '../components/ax-pagination';
import { AXCard } from '../components/ax-card';
import { AXHeading, AXText } from '../components/ax-typography';
import { AXFlex, AXStack } from '../components/ax-layout';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Offline';
  rating: number;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@astrax.com', role: 'Staff Engineer', status: 'Active', rating: 98 },
  { id: '2', name: 'Sarah Chen', email: 'sarah.c@astrax.com', role: 'Principal Architect', status: 'Active', rating: 99 },
  { id: '3', name: 'Marcus Vance', email: 'marcus@astrax.com', role: 'Product Lead', status: 'Pending', rating: 92 },
  { id: '4', name: 'Elena Rostova', email: 'elena@astrax.com', role: 'Security Ops', status: 'Active', rating: 95 },
  { id: '5', name: 'Liam Davies', email: 'liam.d@astrax.com', role: 'Frontend Specialist', status: 'Offline', rating: 89 },
];

export const DataDisplaySamples: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(['1']);
  const [currentPage, setCurrentPage] = useState(1);

  const columns: AXColumnDef<UserData>[] = [
    {
      key: 'name',
      header: 'Member',
      sortable: true,
      render: (user) => (
        <AXFlex align="center" gap="sm">
          <AXAvatar name={user.name} size="sm" status={user.status === 'Active' ? 'online' : 'offline'} />
          <div>
            <AXText weight="semibold" size="sm">{user.name}</AXText>
            <AXText size="xs" color="secondary">{user.email}</AXText>
          </div>
        </AXFlex>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => <AXText size="sm">{user.role}</AXText>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => (
        <AXBadge
          variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'warning' : 'neutral'}
          dot
        >
          {user.status}
        </AXBadge>
      )
    },
    {
      key: 'rating',
      header: 'Quality Score',
      sortable: true,
      align: 'right',
      render: (user) => (
        <AXBadge variant="primary" solid>
          {user.rating}%
        </AXBadge>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Badges & Chips */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Badges & Status Indicators</AXHeading>
            <AXText color="secondary" size="sm">
              Subtle & solid status badges, pill tags, and notification counters.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="lg">
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>Subtle Variants</AXHeading>
              <AXFlex gap="sm" wrap="wrap">
                <AXBadge variant="primary">Primary</AXBadge>
                <AXBadge variant="success">Success</AXBadge>
                <AXBadge variant="warning">Warning</AXBadge>
                <AXBadge variant="danger">Danger</AXBadge>
                <AXBadge variant="info">Info</AXBadge>
                <AXBadge variant="secondary">Secondary</AXBadge>
                <AXBadge variant="outline">Outline</AXBadge>
              </AXFlex>
            </div>

            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>Solid Badges & Dots</AXHeading>
              <AXFlex gap="sm" wrap="wrap">
                <AXBadge variant="primary" solid>Solid Primary</AXBadge>
                <AXBadge variant="success" solid>Solid Success</AXBadge>
                <AXBadge variant="danger" solid>Solid Danger</AXBadge>
                <AXBadge variant="success" dot>Live System</AXBadge>
                <AXBadge variant="danger" count={128} maxCount={99} />
              </AXFlex>
            </div>
          </AXStack>
        }
      />

      {/* Avatars & Groups */}
      <AXCard
        header={
          <div>
            <AXHeading as="h3">Avatars & Groups</AXHeading>
            <AXText color="secondary" size="sm">
              Initials fallback, active status indicators, and stacked avatar groups.
            </AXText>
          </div>
        }
        body={
          <AXStack gap="lg">
            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>Avatar Sizes & Status</AXHeading>
              <AXFlex gap="md" align="center">
                <AXAvatar name="Astra X" size="xs" status="online" />
                <AXAvatar name="John Doe" size="sm" status="away" />
                <AXAvatar name="Sarah Chen" size="md" status="busy" />
                <AXAvatar name="Marcus Vance" size="lg" status="offline" />
                <AXAvatar name="Elena Rostova" size="xl" status="online" />
              </AXFlex>
            </div>

            <div>
              <AXHeading as="h5" style={{ marginBottom: '0.75rem' }}>Avatar Groups (+N Overflow)</AXHeading>
              <AXAvatarGroup max={3} size="md">
                <AXAvatar name="Alex Johnson" />
                <AXAvatar name="Sarah Chen" />
                <AXAvatar name="Marcus Vance" />
                <AXAvatar name="Elena Rostova" />
                <AXAvatar name="Liam Davies" />
              </AXAvatarGroup>
            </div>
          </AXStack>
        }
      />

      {/* Enterprise Data Table */}
      <AXCard
        header={
          <AXFlex justify="between" align="center">
            <div>
              <AXHeading as="h3">AXDataTable</AXHeading>
              <AXText color="secondary" size="sm">
                High-performance grid with sorting, row selection checkboxes, and custom cell renders.
              </AXText>
            </div>
            <AXBadge variant="primary">{selectedKeys.length} Selected</AXBadge>
          </AXFlex>
        }
        body={
          <AXStack gap="lg">
            <AXDataTable
              columns={columns}
              data={mockUsers}
              rowKey={(item) => item.id}
              selectable
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => setSelectedKeys(keys)}
              hoverable
              striped
            />

            <AXFlex justify="between" align="center" wrap="wrap">
              <AXText size="xs" color="secondary">Showing 1 to 5 of 24 records</AXText>
              <AXPagination
                currentPage={currentPage}
                totalPages={5}
                totalItems={24}
                onPageChange={(page) => setCurrentPage(page)}
                showQuickJumper
              />
            </AXFlex>
          </AXStack>
        }
      />
    </div>
  );
};

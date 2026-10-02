'use client';

import { useState } from 'react';
import Icon from '@/assets/icons';
import AXPopover from '@/ax-reusable-components/ax-popover/ax-popover';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import NotificationContent from './notification-content/notification-content';

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AXPopover
      propsSize="md"
      propsIsControlled
      propsIsOpen={isOpen}
      propsOnOpenChange={setIsOpen}
      propsContentClassName="ax-p-0 ax-shadow-xl"
      propsTrigger={
        <AXButton
          propsLabel="Notifications"
          propsLabelClassName="ax-hidden"
          propsStartIcon={<Icon name="bell" size={18} />}
          propsSize="sm"
          propsClassName="ax-text-primary ax-rounded-full"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      }
      propsContent={<NotificationContent onClose={() => setIsOpen(false)} />}
    />
  );
}
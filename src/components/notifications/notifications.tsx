'use client';

import { useState } from 'react';
import Icon from '@/assets/icons';
import AXPopover from '@/ax-reusable-components/ax-popover/ax-popover';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import NotificationContent from './notification-content/notification-content';

export default function Notifications() {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  return (
    <AXPopover
      propsSize='md'
      propsIsControlled={true}
      propsIsOpen={isOpenPopover}
      propsOnOpenChange={setIsOpenPopover}
      propsContentClassName="ax-p-0 ax-shadow-xl"
      propsTrigger={
        <AXButton
          propsLabel="Notifications"
          propsLabelClassName="ax-hidden"
          propsStartIcon={<Icon name="bell" size={18} />}
          propsSize="sm"
          propsClassName="ax-text-primary ax-rounded-full"
          onClick={() => { setIsOpenPopover(!isOpenPopover); }}
        />
      }
      propsContent={
        <NotificationContent onClose={() => setIsOpenPopover(false)} />
      }
    />
  );
}
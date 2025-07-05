'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Map, Calendar, ChatBubbleCheck } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Tabs value={pathname} onValueChange={(val) => router.push(val)}>
      <TabItem value="/home" icon={<Calendar />} label="Events" />
      <TabItem value="/map" icon={<Map />} label="Map" />
      <TabItem value="/report" icon={<ChatBubbleCheck />} label="Reports" />
    </Tabs>
  );
};
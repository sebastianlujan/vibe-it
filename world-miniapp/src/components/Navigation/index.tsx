'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Map, Calendar, ChatBubbleCheck } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: 'white',
        borderTop: '1px solid #eee',
        zIndex: 100,
        padding: '10px'
      }}
    >
    <Tabs value={pathname} onValueChange={(val) => router.push(val)}>
      <TabItem value="/home" icon={<Calendar />} label="Events" />
      <TabItem value="/map" icon={<Map />} label="Map" />
    </Tabs>
    </div>
  );
};
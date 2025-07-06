'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Map, Calendar, ChatBubbleCheck } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50" />
      
      {/* Navigation content */}
      <div className="relative px-6 py-3 safe-area-pb">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-2">
          <Tabs 
            value={pathname} 
            onValueChange={(val) => router.push(val)}
            className="w-full"
          >
            <div className="flex items-center justify-around gap-2">
              <div className="flex flex-col items-center gap-1 p-2 flex-1">
                <TabItem 
                  value="/home"
                  icon={
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      pathname === '/home' 
                        ? 'bg-indigo-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                  }
                  label="Events"
                />
              </div>
              <div className="flex flex-col items-center gap-1 p-2 flex-1">
                <TabItem 
                  value="/map"
                  icon={
                    <div className={`p-2 rounded-xl transition-all duration-200 ${
                      pathname === '/map' 
                        ? 'bg-indigo-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}>
                      <Map className="w-5 h-5" />
                    </div>
                  }
                  label="Map"
                />
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      
      {/* Bottom safe area for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white/80 backdrop-blur-lg" />
    </div>
  );
};
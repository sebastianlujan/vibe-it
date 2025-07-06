'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Map, Calendar, ChatBubbleCheck } from 'iconoir-react';
import { usePathname, useRouter } from 'next/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-lg border-t border-gray-200" />
      
      {/* Navigation content */}
      <div className="relative px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex items-center justify-center">
            <Tabs 
              value={pathname} 
              onValueChange={(val) => router.push(val)}
              className="w-full max-w-md"
            >
              <div className="flex items-center">
                {/* Events Tab */}
                <div className="flex-1">
                  <TabItem 
                    value="/home"
                    icon={<Calendar className="w-5 h-5" />}
                    label="Events"
                    className={`w-full flex flex-col items-center py-4 px-6 transition-all duration-200 relative ${
                      isActive('/home') 
                        ? 'text-indigo-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  />
                  {/* Active indicator */}
                  {isActive('/home') && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-indigo-600 rounded-full"></div>
                  )}
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-gray-200"></div>

                {/* Map Tab */}
                <div className="flex-1 relative">
                  <TabItem 
                    value="/map"
                    icon={<Map className="w-5 h-5" />}
                    label="Map"
                    className={`w-full flex flex-col items-center py-4 px-6 transition-all duration-200 ${
                      isActive('/map') 
                        ? 'text-indigo-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  />
                  {/* Active indicator */}
                  {isActive('/map') && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
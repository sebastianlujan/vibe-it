import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { EventList } from '@/components/EventList';
import { DaySelector } from '@/components/DaySelector/DaySelector';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Page.Header className="p-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <TopBar
          title="vibe-it"
          endAdornment={
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {session?.user.username}
                </p>
                <p className="text-xs text-gray-500">
                  Welcome back!
                </p>
              </div>
              <div className="relative">
                <Marble 
                  src={session?.user.profilePictureUrl} 
                  className="w-12 h-12 border-2 border-indigo-200 hover:border-indigo-300 transition-colors" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          }
        />
      </Page.Header>
      
      <Page.Main className="bg-gradient-to-br from-gray-50 to-white px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Discover Amazing Events
            </h1>
            <p className="text-gray-600">
              Find your next side event in Cannes
            </p>
          </div>

          {/* Day Selector */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <DaySelector />
          </div>

          {/* Events List */}
          <EventList />
        </div>
      </Page.Main>
    </>
  );
}

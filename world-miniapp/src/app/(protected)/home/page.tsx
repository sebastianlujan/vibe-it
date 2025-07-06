import { auth } from '@/auth';
import { NFCSigner } from '@/components/NFCSigner';
import { Page } from '@/components/PageLayout';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { EventList } from '@/components/EventList';
import { DaySelector } from '@/components/DaySelector/DaySelector';
import { User } from 'iconoir-react';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Page.Header className="p-0 text-black">
        <TopBar
          title="Home"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">
                {session?.user.username}
              </p>
              {session?.user.profilePictureUrl ? (
                <Marble src={session.user.profilePictureUrl} className="w-12" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col gap-4 px-4 py-4">
        <DaySelector />
        <EventList />
        <NFCSigner />
      </Page.Main>
    </>
  );
}

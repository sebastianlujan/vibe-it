
import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import { Pay } from '@/components/Pay';
import { Transaction } from '@/components/Transaction';
import { UserInfo } from '@/components/UserInfo';
import { Verify } from '@/components/Verify';
import { ViewPermissions } from '@/components/ViewPermissions';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';
import { events } from '@/utils/mockedEvents';
import { EventCard } from '@/components/EventCard';
import { useEvents } from '@/providers/EventsProvider';

export default async function Home() {
  const session = await auth();
  const { events:fetchedEvents } = useEvents();


  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Home"
          endAdornment={
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold capitalize">
                {session?.user.username}
              </p>
              <Marble src={session?.user.profilePictureUrl} className="w-12" />
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col gap-4 px-4 py-4">
        <DaySelector />
        <EventList />
      </Page.Main>
    </>
  );
}

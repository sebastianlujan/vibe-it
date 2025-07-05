import { events } from '@/utils/mockedEvents';
import { Page } from '@/components/PageLayout';
import { EventMap } from '@/components/EventMap';

export default function EventPage() {
  return (
    <>
      <Page.Header className="p-4">
        <h1 className="text-xl font-bold text-black">Eventos</h1>
      </Page.Header>

      <Page.Main className="flex flex-col gap-6 p-4">
        <EventMap events={events} />
      </Page.Main>
    </>
  );
}

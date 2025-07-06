import { Page } from '@/components/PageLayout';
import { EventMap } from '@/components/EventMap';
import { DaySelector } from '@/components/DaySelector/DaySelector';

export default function EventPage() {
  return (
    <>
      <Page.Header className="p-4">
        <h1 className="text-xl font-bold text-black bg-white">Map</h1>
      </Page.Header>

      <Page.Main className="flex flex-col gap-6 p-4 bg-white">
        <DaySelector />
        <EventMap />
      </Page.Main>
    </>
  );
}

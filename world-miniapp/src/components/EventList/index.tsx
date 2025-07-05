
'use client';
import { useDayFilter } from '@/context/DayFilterProvider';
import { events } from '@/utils/mockedEvents';
import { EventCard } from '@/components/EventCard';

export const EventList = () => {
  const { selectedDate } = useDayFilter();

  const filteredEvents = events.filter((event) => {
    if (!selectedDate) return true; // no hay filtro
    return event.date === selectedDate; // <-- asegurate que event.date tenga formato YYYY-MM-DD
  });

  if (filteredEvents.length === 0) {
    return <p className="text-white text-sm">No hay eventos para este día.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
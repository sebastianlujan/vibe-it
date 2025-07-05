
'use client';

import { useEvents } from '@/providers/EventsProvider';
import { EventCard } from '@/components/EventCard';
import { useDayFilter } from '@/context/DayFilterProvider';

export const EventList = () => {
  const { events, loading, error } = useEvents();
  const { selectedDate } = useDayFilter();

  if (loading) return <p className="text-white text-center">Loading events...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const filteredEvents = events.filter((eventEntry) => {
    if (!selectedDate) return true;
    const eventDate = new Date(eventEntry.event.start_at).toISOString().split('T')[0];
    return eventDate === selectedDate;
  });

  if (filteredEvents.length === 0) {
    return <p className="text-white text-sm text-center">No events found for this date.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredEvents.map((eventEntry) => (
        <EventCard 
          key={eventEntry.api_id}
          id={eventEntry.event.api_id}
          name={eventEntry.event.name}
          image={eventEntry.event.cover_url}
          date={new Date(eventEntry.event.start_at).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          hourStarts={new Date(eventEntry.event.start_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          hourEnds={new Date(eventEntry.event.end_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          lumaLink={`https://lu.ma/${eventEntry.event.url}`}
          score={Math.random() * 5} // Placeholder since Luma API doesn't provide scores
          attendees={eventEntry.guest_count}
        />
      ))}
    </div>
  );
};
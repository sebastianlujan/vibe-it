
'use client';

import { useEvents } from '@/providers/EventsProvider';
import { EventCard } from '@/components/EventCard';
import { useDayFilter } from '@/context/DayFilterProvider';
import { Calendar, Search } from 'iconoir-react';

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="rounded-xl bg-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-300" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded w-1/2" />
              <div className="h-3 bg-gray-300 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ selectedDate, searchTerm }: { selectedDate: string | null; searchTerm: string }) => {
  const getEmptyMessage = () => {
    if (searchTerm && selectedDate) {
      return {
        title: 'No events found',
        description: `No events match "${searchTerm}" for the selected date. Try different keywords or select another date.`
      };
    }
    if (searchTerm) {
      return {
        title: 'No events found',
        description: `No events match "${searchTerm}". Try different keywords or browse all events.`
      };
    }
    if (selectedDate) {
      return {
        title: 'No events for this date',
        description: 'Try selecting a different date to discover more events.'
      };
    }
    return {
      title: 'No events found',
      description: 'Events will appear here once they are available.'
    };
  };

  const { title, description } = getEmptyMessage();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <Calendar className="w-12 h-12 text-indigo-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center max-w-sm">
        {description}
      </p>
    </div>
  );
};

const ErrorState = ({ error }: { error: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <Search className="w-12 h-12 text-red-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-600 text-center max-w-sm mb-4">
      {error}
    </p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      Try again
    </button>
  </div>
);

interface EventListProps {
  searchTerm?: string;
}

export const EventList = ({ searchTerm = '' }: EventListProps) => {
  const { events, loading, error } = useEvents();
  const { selectedDate } = useDayFilter();

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;

  const filteredEvents = events.filter((eventEntry) => {
    // Filter by date
    if (selectedDate) {
      const eventDate = new Date(eventEntry.event.start_at).toISOString().split('T')[0];
      if (eventDate !== selectedDate) return false;
    }

    // Filter by search term
    if (searchTerm) {
      const eventName = eventEntry.event.name.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return eventName.includes(searchLower);
    }

    return true;
  });

  if (filteredEvents.length === 0) {
    return <EmptyState selectedDate={selectedDate} searchTerm={searchTerm} />;
  }

  const getHeaderText = () => {
    if (searchTerm && selectedDate) {
      return `Results for "${searchTerm}" on selected date`;
    }
    if (searchTerm) {
      return `Results for "${searchTerm}"`;
    }
    if (selectedDate) {
      return 'Events for selected date';
    }
    return 'All Events';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {getHeaderText()}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-4">
        {filteredEvents.map((eventEntry, index) => (
          <div 
            key={eventEntry.api_id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EventCard 
              id={eventEntry.event.api_id}
              name={eventEntry.event.name}
              image={eventEntry.event.cover_url}
              date={new Date(eventEntry.event.start_at).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
              hourStarts={new Date(eventEntry.event.start_at).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
              hourEnds={new Date(eventEntry.event.end_at).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
              lumaLink={`https://lu.ma/${eventEntry.event.url}`}
              score={0} // Placeholder since Luma API doesn't provide scores
              attendees={eventEntry.guest_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
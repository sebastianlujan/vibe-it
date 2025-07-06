'use client';

import { useEvents } from '@/providers/EventsProvider';
import { Page } from '@/components/PageLayout';
import { Star, User } from 'iconoir-react';
import { formatEventDate, formatEventTime, getEventLocation, getEventMapsLink, getEventLumaLink, getEventMainHost } from '@/utils/eventUtils';
import { notFound } from 'next/navigation';
import UserOpinionComponent from '../UserOpinionComponent/UserOpinionComponent';

type EventDetailProps = {
  id: string;
};

export const EventDetail = ({ id }: EventDetailProps) => {
  const { events, loading, error } = useEvents();

  if (loading) return <p className="text-white text-center">Loading event...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const eventEntry = events.find((entry) => entry.event.api_id === id);
  
  if (!eventEntry) {
    notFound();
    return null;
  }

  const event = eventEntry.event;
  const mainHost = getEventMainHost(eventEntry);
  const location = getEventLocation(eventEntry);
  const mapsLink = getEventMapsLink(eventEntry);
  const lumaLink = getEventLumaLink(eventEntry);

  return (
    <>
      <Page.Header className="p-4">
        <h1 className="text-xl font-bold text-black">{event.name}</h1>
      </Page.Header>

      <Page.Main className="flex flex-col gap-6 p-4">
        <img
          src={event.cover_url}
          alt={event.name}
          className="w-64 h-64 object-cover rounded-xl mx-auto"
        />
        <div className="space-y-2">
          {mainHost && (
            <p><strong>Organizer:</strong> {mainHost.name}</p>
          )}
          <p><strong>Date:</strong> {formatEventDate(event.start_at)}</p>
          <p><strong>Time:</strong> {formatEventTime(event.start_at)} - {formatEventTime(event.end_at)}</p>
          <p><strong>Address:</strong> {location}</p>
          {mapsLink && (
            <p>
              <strong>Map:</strong>{' '}
              <a
                href={mapsLink}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          )}
          <p>
            <strong>Luma:</strong>{' '}
            <a
              href={lumaLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Event Page
            </a>
          </p>
          <div className="flex items-center gap-1 text-sm mt-2 text-amber-400">
            <Star className="w-4 h-4" /> {(Math.random() * 5).toFixed(1)} / 5
          </div>
          <div className="flex items-center gap-1 text-sm">
            <User className="w-4 h-4 text-amber-300" />
            <p className='text-amber-300'>
              {eventEntry.guest_count} attendee{eventEntry.guest_count !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <UserOpinionComponent eventEntry={eventEntry} />
      </Page.Main>
    </>
  );
}; 
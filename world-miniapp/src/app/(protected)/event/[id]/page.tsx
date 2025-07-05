import { notFound } from 'next/navigation';
import { events } from '@/utils/mockedEvents';
import { Page } from '@/components/PageLayout';
import { Star, User } from 'iconoir-react';

type Props = {
  params: {
    id: string;
  };
};

export default function EventDetailPage({ params }: Props) {
  const event = events.find((e) => e.id === params.id);

  if (!event) return notFound();

  return (
    <>
      <Page.Header className="p-4">
        <h1 className="text-xl font-bold text-black">{event.name}</h1>
      </Page.Header>

      <Page.Main className="flex flex-col gap-6 p-4">
        <img
          src={event.image}
          alt={event.name}
          className="w-64 h-64 object-cover rounded-xl mx-auto"
        />
        <div className="text-white space-y-2">
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <p><strong>Date:</strong> {event.day}</p>
          <p><strong>Time:</strong> {event.hourStarts} - {event.hourEnds}</p>
          <p><strong>Address:</strong> {event.address}</p>
          <p>
            <strong>Map:</strong>{' '}
            <a
              href={event.mapsLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </p>
          <p>
            <strong>Luma:</strong>{' '}
            <a
              href={event.lumaLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Event Page
            </a>
          </p>
          <div className="flex items-center gap-1 text-sm mt-2 text-amber-400">
            <Star className="w-4 h-4" /> {event.score.toFixed(1)} / 5
          </div>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <User className="w-4 h-4 text-amber-300" />
            1 attendee
          </div>
        </div>

        <div className="mt-2 pb-28">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <ul className="space-y-4">
            {event.comments.map((comment, idx) => (
              <li key={idx} className="bg-gray-100 p-3 rounded-md text-black">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm flex items-center gap-1">
                    <Star className="w-4 h-4" /> {comment.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-800">{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </Page.Main>
    </>
  );
}
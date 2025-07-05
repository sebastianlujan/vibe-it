// src/components/EventCard/index.tsx

'use client';
import { Star, User } from 'iconoir-react';
import Link from 'next/link';

type EventCardProps = {
  id: string;
  name: string;
  image: string;
  hourStarts: string;
  hourEnds: string;
  lumaLink: string;
  score: number;
  attendees: number;
  date: string;
};

export const EventCard = ({
  id,
  name,
  image,
  date,
  hourStarts,
  hourEnds,
  lumaLink,
  score,
  attendees,
}: EventCardProps) => {
  return (
    <Link href={`/event/${id}`}>
      <div className="w-full flex items-start gap-4 p-4 rounded-xl border border-gray-200 shadow-md hover:bg-gray-50 hover:text-black transition-all cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <h3 className="text-md font-bold">{name}</h3>
          <p className="text-sm text-white hover:text-black">
            {date} · {hourStarts} - {hourEnds}
          </p>
          <div className="flex items-center mt-1 gap-1 text-sm text-amber-400">
            <Star className="w-4 h-4" /> {score.toFixed(1)} / 5
          </div>
          <div className="flex items-center gap-1 text-white/80 text-sm hover:text-black">
            <User className="w-4 h-4 text-amber-300" />
            {attendees} attendee{attendees !== 1 ? 's' : ''}
          </div>
          <a
            href={lumaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline mt-1 inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            View on luma →
          </a>
        </div>
      </div>
    </Link>
  );
};

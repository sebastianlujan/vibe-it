// src/components/EventCard/index.tsx

'use client';
import { Star, User, Calendar, Clock, ArrowRight } from 'iconoir-react';
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
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-yellow-500';
    if (score >= 2) return 'text-orange-500';
    if (score == 0) return 'text-gray-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 4) return 'bg-green-50 border-green-200';
    if (score >= 3) return 'bg-yellow-50 border-yellow-200';
    if (score >= 2) return 'bg-orange-50 border-orange-200';
    if (score == 0) return 'bg-gray-50 border-gray-200';
    return 'bg-red-50 border-red-200';
  };

  const getEventStatus = () => {
    const now = new Date();
    const eventDate = new Date(date);
    
    // Parse start and end times
    const [startHour, startMinute] = hourStarts.split(':').map(Number);
    const [endHour, endMinute] = hourEnds.split(':').map(Number);
    
    const startTime = new Date(eventDate);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(eventDate);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    // If end time is before start time, assume it's next day
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    
    if (now >= startTime && now <= endTime) {
      return 'live';
    } else if (now < startTime) {
      return 'upcoming';
    } else {
      return 'ended';
    }
  };

  const getStatusDisplay = () => {
    const status = getEventStatus();
    
    switch (status) {
      case 'live':
        return {
          dot: 'bg-green-400 animate-pulse',
          text: 'Live',
          textColor: 'text-green-600'
        };
      case 'upcoming':
        return {
          dot: 'bg-blue-400',
          text: 'Upcoming',
          textColor: 'text-blue-600'
        };
      case 'ended':
        return {
          dot: 'bg-gray-400',
          text: 'Ended',
          textColor: 'text-gray-500'
        };
      default:
        return {
          dot: 'bg-gray-400',
          text: 'Unknown',
          textColor: 'text-gray-500'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <Link href={`/event/${id}`} className="group block">

      <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-200 hover:-translate-y-1 animate-fade-in">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Score Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg border backdrop-blur-sm ${getScoreBgColor(score)}`}>
            <div className={`flex items-center gap-1 text-sm font-semibold ${getScoreColor(score)}`}>
              <Star className="w-4 h-4 fill-current" />
              {score.toFixed(1)}
            </div>
          </div>

          {/* Attendees Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm border border-white/50">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <User className="w-4 h-4" />
              {attendees}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {name}
          </h3>
          
          {/* Date and Time */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>{hourStarts} - {hourEnds}</span>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
              <span>View Details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${statusDisplay.dot}`}></div>
              <span className={`text-xs font-medium ${statusDisplay.textColor}`}>{statusDisplay.text}</span>
            </div>
          </div>
        </div>

        {/* Hover Effect Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Link>
  );
};

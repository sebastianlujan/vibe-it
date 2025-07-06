'use client';

import { useDayFilter } from '@/context/DayFilterProvider';
import { Calendar, X } from 'iconoir-react';

export const DaySelector = () => {
  const { selectedDate, setSelectedDate } = useDayFilter();

  const formatSelectedDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="date"
            value={selectedDate ?? ''}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 h-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white text-gray-900 text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <Calendar className="w-5 h-5 text-gray-400 mx-4" />
          </div>
        </div>
        
        {selectedDate && (
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              {formatSelectedDate(selectedDate)}
            </div>
            <button
              type="button"
              onClick={() => setSelectedDate('')}
              className="flex items-center gap-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        )}
      </div>
      
      {!selectedDate && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>💡</span>
          Select a date to filter events, or browse all available events
        </p>
      )}
    </div>
  );
};
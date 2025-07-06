'use client';

import { useDayFilter } from '@/context/DayFilterProvider';

export const DaySelector = () => {
  const { selectedDate, setSelectedDate } = useDayFilter();

  return (
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Select a date</label>
        <input
          type="date"
          value={selectedDate ?? ''}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-1/2 text-sm"
        />
        {selectedDate && (
        <button
          type="button"
          onClick={() => setSelectedDate('')}
          className="text-sm text-red-400 underline"
        >
          Clean
        </button>
      )}
      </div>
  );
};
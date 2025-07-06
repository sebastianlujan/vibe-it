'use client';

import { EventList } from '@/components/EventList';
import { DaySelector } from '@/components/DaySelector/DaySelector';
import { EventSearch } from '@/components/EventSearch';
import { useState } from 'react';

export const HomeContent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Discover Amazing Events
        </h1>
        <p className="text-gray-600">
          Find side event
        </p>
      </div>

      {/* Filters Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Day Selector */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
          <DaySelector />
        </div>
        
        {/* Search */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
          <EventSearch 
            onSearchChange={setSearchTerm}
            placeholder="Search events by name..."
          />
        </div>
      </div>

      {/* Events List */}
      <EventList searchTerm={searchTerm} />
    </div>
  );
}; 
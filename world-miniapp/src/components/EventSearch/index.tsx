'use client';

import { Search, X } from 'iconoir-react';
import { useState } from 'react';

interface EventSearchProps {
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export const EventSearch = ({ 
  onSearchChange, 
  placeholder = "Search events by name...", 
  className = "" 
}: EventSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Search Events</h3>
      </div>
      
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 h-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white text-gray-900 placeholder-gray-500 text-sm"
        />
        
        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Searching for:</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            "{searchTerm}"
          </span>
        </div>
      )}
    </div>
  );
}; 
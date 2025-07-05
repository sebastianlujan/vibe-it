// src/context/DayFilterProvider.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type DayFilterContextType = {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
};

const DayFilterContext = createContext<DayFilterContextType | undefined>(undefined);

export const DayFilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selected-date');
    if (stored) setSelectedDate(stored);
  }, []);

  const updateDate = (date: string) => {
    localStorage.setItem('selected-date', date);
    setSelectedDate(date);
  };

  return (
    <DayFilterContext.Provider value={{ selectedDate, setSelectedDate: updateDate }}>
      {children}
    </DayFilterContext.Provider>
  );
};

export const useDayFilter = () => {
  const ctx = useContext(DayFilterContext);
  if (!ctx) throw new Error('useDayFilter must be used within DayFilterProvider');
  return ctx;
};

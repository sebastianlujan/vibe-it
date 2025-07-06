"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { EventEntry, EventsResponse, EventsContextType } from '@/utils/types'

const EventsContext = createContext<EventsContextType | undefined>(undefined)

interface EventsProviderProps {
  children: ReactNode
}

export default function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<EventEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("Starting to fetch events...")
      
      const response = await fetch('/api/events')
      
      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: EventsResponse = await response.json()
      console.log("Events data received:", data)
      setEvents(data.entries)
    } catch (err) {
      console.error('Detailed error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const contextValue: EventsContextType = {
    events,
    loading,
    error,
    refetch: fetchEvents
  }

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  )
}

// Custom hook to use the events context
export const useEvents = () => {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider')
  }
  return context
}

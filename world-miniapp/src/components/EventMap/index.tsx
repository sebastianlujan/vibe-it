// src/components/EventMap/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useEvents } from '@/providers/EventsProvider';
import { useDayFilter } from '@/context/DayFilterProvider';


type MappedEvent = {
  id: string;
  name: string;
  image: string | null;
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '1rem',
};

export function EventMap() {
  const { events, loading } = useEvents();
  const { selectedDate } = useDayFilter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const [mappedEvents, setMappedEvents] = useState<MappedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MappedEvent | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                });
            },
            (error) => {
                console.warn("Geolocation error:", error);
            }
            );
        }
    }, []);



  useEffect(() => {
    if (!isLoaded || events.length === 0 || loading) return;

    const mapEvents = () => {
      const results: MappedEvent[] = [];

      // Filter events by selected date first (same logic as EventList)
      const filteredEvents = events.filter((eventEntry) => {
        if (!selectedDate) return true;
        const eventDate = new Date(eventEntry.event.start_at).toISOString().split('T')[0];
        return eventDate === selectedDate;
      });

      for (const eventEntry of filteredEvents) {
        const { coordinate } = eventEntry.event;
        if (coordinate && coordinate.latitude && coordinate.longitude) {
          results.push({
            id: eventEntry.event.api_id,
            name: eventEntry.event.name,
            image: eventEntry.event.cover_url,
            lat: coordinate.latitude,
            lng: coordinate.longitude,
          });
        }
      }

      setMappedEvents(results);
    };

    mapEvents();
  }, [isLoaded, events, loading, selectedDate]);

  const center = mappedEvents.length > 0
    ? { lat: mappedEvents[0].lat, lng: mappedEvents[0].lng }
    : { lat: 48.8566, lng: 2.3522 }; // fallback: París

  if (!isLoaded) return <p className="text-center text-gray-400">Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {userLocation && (
        <Marker
            position={userLocation}
            title="Your Location"
            onClick={() => setSelectedEvent({
                id: "0",
                name: "Your Location",
                image: null,
                lat: userLocation.lat,
                lng: userLocation.lng
            })}
            icon={{
                url: window.location.origin + "/maps-point.png",
                scaledSize: new google.maps.Size(20, 20),
            }}
        />
      )}

      {mappedEvents.map((event) => (
        <Marker
            key={event.id}
            position={{ lat: event.lat, lng: event.lng }}
            title={event.name}
            onClick={() => setSelectedEvent(event)}
        />
      ))}

      {selectedEvent && (
        <InfoWindow
            position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
            onCloseClick={() => setSelectedEvent(null)}
            >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'black' }}>
                {selectedEvent.image &&
                    <img
                    src={selectedEvent.image}
                    alt={selectedEvent.name}
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginRight: '2px'
                    }}
                    />
                }
                <div>
                <h3 style={{ fontWeight: 'bold', margin: 0 }}>{selectedEvent.name}</h3>
                {selectedEvent.image &&
                    <a
                        href={`/event/${selectedEvent.id}`}
                        style={{
                        color: 'blue',
                        textDecoration: 'underline',
                        fontSize: '0.9rem',
                        }}
                    >
                        View details
                    </a>
                }
              
                </div>
            </div>
        </InfoWindow>
        )}
    </GoogleMap>
  );
}

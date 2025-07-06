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
  height: '400px',
  borderRadius: '1.5rem',
};

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
];

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

  // Custom marker icons - only create when Google Maps API is loaded
  const getEventMarkerIcon = () => {
    if (!isLoaded || typeof google === 'undefined') return undefined;
    
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#EF4444" stroke="#FFFFFF" stroke-width="4"/>
          <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16),
    };
  };

  const getUserMarkerIcon = () => {
    if (!isLoaded || typeof google === 'undefined') return undefined;
    
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="#FFFFFF" stroke-width="4"/>
          <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16),
    };
  };

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
    : userLocation || { lat: 48.8566, lng: 2.3522 }; // fallback: París

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      <div className="relative">
        <GoogleMap 
          mapContainerStyle={containerStyle} 
          center={center} 
          zoom={13}
          options={{
            styles: mapStyles,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: 'greedy',
          }}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              title="Your Location"
              onClick={() => setSelectedEvent({
                id: "user-location",
                name: "Your Location",
                image: null,
                lat: userLocation.lat,
                lng: userLocation.lng
              })}
              icon={getUserMarkerIcon()}
            />
          )}

          {mappedEvents.map((event) => (
            <Marker
              key={event.id}
              position={{ lat: event.lat, lng: event.lng }}
              title={event.name}
              onClick={() => setSelectedEvent(event)}
              icon={getEventMarkerIcon()}
            />
          ))}

          {selectedEvent && isLoaded && typeof google !== 'undefined' && (
            <InfoWindow
              position={{ lat: selectedEvent.lat, lng: selectedEvent.lng }}
              onCloseClick={() => setSelectedEvent(null)}
              options={{
                pixelOffset: new google.maps.Size(0, -10),
                maxWidth: 300,
              }}
            >
              <div className="p-3 max-w-xs">
                <div className="flex gap-3 items-start">
                  {selectedEvent.image && (
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">
                      {selectedEvent.name}
                    </h3>
                    {selectedEvent.id !== "user-location" ? (
                      <a
                        href={`/event/${selectedEvent.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                      >
                        View details
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ) : (
                      <div className="flex items-center gap-1 text-blue-600 text-xs">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        You are here
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

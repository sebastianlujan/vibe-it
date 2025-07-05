// src/components/EventMap/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

type Event = {
  id: string;
  name: string;
  image: string;
  address: string;
};

type Props = {
  events: Event[];
};

type MappedEvent = {
  id: string;
  name: string;
  image: string;
  lat: number;
  lng: number;
};

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '1rem',
};

export function EventMap({ events }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places'],
  });

  const [mappedEvents, setMappedEvents] = useState<MappedEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MappedEvent | null>(null);

  useEffect(() => {
    if (!isLoaded || events.length === 0) return;

    const geocodeEvents = async () => {
      const geocoder = new window.google.maps.Geocoder();

      const results: MappedEvent[] = [];

      for (const event of events) {
        try {
          const res = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: event.address }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                resolve(results);
              } else {
                reject(status);
              }
            });
          });

          const { lat, lng } = res[0].geometry.location;
          console.log(lat, lng);
          results.push({ id: event.id, name: event.name, image: event.image, lat: lat(), lng: lng() });
        } catch (err) {
          console.warn(`Error geocoding address: ${event.address}`, err);
        }
      }

      setMappedEvents(results);
    };

    geocodeEvents();
  }, [isLoaded, events]);

  const center = mappedEvents.length > 0
    ? { lat: mappedEvents[0].lat, lng: mappedEvents[0].lng }
    : { lat: 48.8566, lng: 2.3522 }; // fallback: París

  if (!isLoaded) return <p className="text-center text-gray-400">Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
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
                <div>
                <h3 style={{ fontWeight: 'bold', margin: 0 }}>{selectedEvent.name}</h3>
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
                </div>
            </div>
        </InfoWindow>
        )}
    </GoogleMap>
  );
}

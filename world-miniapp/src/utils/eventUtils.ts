import { EventEntry } from '@/utils/types';

export const formatEventDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatEventTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getEventLocation = (eventEntry: EventEntry) => {
  const geoInfo = eventEntry.event.geo_address_info;
  if (geoInfo) {
    return geoInfo.full_address || geoInfo.address || geoInfo.city_state || 'Location not specified';
  }
  return 'Location not specified';
};

export const getEventMapsLink = (eventEntry: EventEntry) => {
  const coordinate = eventEntry.event.coordinate;
  if (coordinate) {
    return `https://www.google.com/maps/search/?api=1&query=${coordinate.latitude},${coordinate.longitude}`;
  }
  return null;
};

export const getEventLumaLink = (eventEntry: EventEntry) => {
  return `https://lu.ma/${eventEntry.event.url}`;
};

export const getEventMainHost = (eventEntry: EventEntry) => {
  return eventEntry.hosts.find(host => host.access_level === 'manager') || eventEntry.hosts[0] || null;
}; 
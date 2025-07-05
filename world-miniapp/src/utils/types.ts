// Types based on the Luma API response structure
export interface EventHost {
    api_id: string
    avatar_url: string
    bio_short: string | null
    name: string
    twitter_handle: string | null
    username: string | null
    website: string | null
    timezone: string
    access_level: string
    event_api_id: string
  }
  
export interface EventInfo {
    api_id: string
    calendar_api_id: string
    cover_url: string
    end_at: string
    start_at: string
    name: string
    location_type: string
    timezone: string
    url: string
    visibility: string
    geo_address_info: {
        mode: string
        city_state: string
    }
    coordinate: {
        latitude: number
        longitude: number
    }
}
  
export interface Calendar {
    api_id: string
    name: string
    description_short: string | null
    tint_color: string
    is_personal: boolean
}

export interface TicketInfo {
    price: number | null
    is_free: boolean
    max_price: number | null
    is_sold_out: boolean
    spots_remaining: number | null
    is_near_capacity: boolean
    require_approval: boolean
    currency_info: any | null
  }
  
export interface EventEntry {
    api_id: string
    event: EventInfo
    calendar: Calendar
    start_at: string
    hosts: EventHost[]
    guest_count: number
    ticket_count: number
    ticket_info: TicketInfo
    featured_guests: EventHost[]
    role: string | null
    calendar_api_id: string
    is_manager: boolean
    platform: string
    status: string
    coordinate: any | null
    tags: string[]
  }
  
export interface EventsResponse {
    entries: EventEntry[]
    has_more: boolean
    next_cursor: string | null
}

export interface EventsContextType {
    events: EventEntry[]
    loading: boolean
    error: string | null
    refetch: () => void
  }

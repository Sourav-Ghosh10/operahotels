const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const getPropertyBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${slug}`);
        if (!response.ok) {
            throw new Error(`Error fetching property data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};

export const getPageData = async (slug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${slug}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Error fetching page data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};

export const getOffersData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/offers`);
        if (!response.ok) {
            throw new Error(`Error fetching offers data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getAllOffersData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/offers?all=true`);
        if (!response.ok) {
            throw new Error(`Error fetching all offers data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getAllHotels = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/hotels`);
        if (!response.ok) {
            throw new Error(`Error fetching all hotels: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getOfferTypes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/offers/types`);
        if (!response.ok) {
            throw new Error(`Error fetching offer types: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getLocationsData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/our-locations`);
        if (!response.ok) {
            throw new Error(`Error fetching locations data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getComingSoonData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/coming-soon`);
        if (!response.ok) {
            throw new Error(`Error fetching coming soon data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getBrandsData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/brands`);
        if (!response.ok) {
            throw new Error(`Error fetching brands data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

export const getMeetingsEventsByProperty = async (hotelSlug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${hotelSlug}/meetings-events`);
        if (!response.ok) {
            throw new Error(`Error fetching meetings events data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};

export const getSingleMeetingEvent = async (hotelSlug: string, eventSlug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${hotelSlug}/meetings-events/${eventSlug}`);
        if (!response.ok) {
            throw new Error(`Error fetching single meeting & event space: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};


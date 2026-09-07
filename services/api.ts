const PRODUCTION_BACKEND_URL = 'https://crm.operahotels.com';

/**
 * Dynamically resolves the API base URL (protocol + host, without trailing slash or /api)
 * Works seamlessly in both local environment and deploy/production environment.
 */
export function getApiBaseUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || 
                   (process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/?$/, '') : '');

    // Running in browser
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';

        // If local browser, use local backend
        if (isLocal) {
            return (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1')))
                ? envUrl
                : 'http://127.0.0.1:8000';
        }

        // If in production/deploy browser:
        if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
            return envUrl;
        }

        // In production browser, backend is always CRM domain
        return PRODUCTION_BACKEND_URL;
    }

    // Running on server (SSR / SSG)
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
        return envUrl;
    }

    return process.env.NODE_ENV === 'production' 
        ? PRODUCTION_BACKEND_URL 
        : (envUrl || 'http://127.0.0.1:8000');
}

/**
 * Returns the full API endpoint URL (e.g. http://127.0.0.1:8000/api or https://crm.operahotels.com/api)
 */
export function getApiEndpoint(): string {
    const envEndpoint = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (envEndpoint && !envEndpoint.includes('localhost') && !envEndpoint.includes('127.0.0.1')) {
        return envEndpoint.replace(/\/+$/, '');
    }

    const base = getApiBaseUrl();
    return `${base}/api`;
}

/**
 * Dynamically resolves image URLs for both local and deployed environments.
 * Handles:
 * - Full URLs from local dev: automatically rewrites http://127.0.0.1:8000 to production domain when on production
 * - Full URLs from production/CDN: kept as-is
 * - Relative paths / filenames: prepends the dynamic API base + /uploads/
 */
export function resolveImageUrl(img: string | undefined | null): string {
    if (!img || typeof img !== 'string') return '';
    const trimmed = img.trim();
    if (!trimmed) return '';

    const apiBase = getApiBaseUrl();

    // Already an absolute URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        // If we are in production, but the URL points to localhost/127.0.0.1:
        // rewrite the host to apiBase so it loads from the server rather than visitor's localhost
        if (typeof window !== 'undefined') {
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (!isLocal && /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(trimmed)) {
                return trimmed.replace(/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, apiBase);
            }
        } else if (!apiBase.includes('localhost') && !apiBase.includes('127.0.0.1')) {
            if (/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(trimmed)) {
                return trimmed.replace(/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, apiBase);
            }
        }
        return trimmed;
    }

    if (trimmed.startsWith('//')) {
        return 'https:' + trimmed;
    }

    // Relative path or plain filename
    const clean = trimmed.replace(/^\/?(storage\/|uploads\/)?/, '');
    return `${apiBase}/uploads/${clean}`;
}

export const getPropertyBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${getApiEndpoint()}/properties/${slug}`);
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
        const response = await fetch(`${getApiEndpoint()}/pages/${slug}`, { cache: "no-store" });
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
        const response = await fetch(`${getApiEndpoint()}/offers`);
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
        const response = await fetch(`${getApiEndpoint()}/offers?all=true`);
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
        const response = await fetch(`${getApiEndpoint()}/properties/hotels`);
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
        const response = await fetch(`${getApiEndpoint()}/offers/types`);
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
        const response = await fetch(`${getApiEndpoint()}/our-locations`);
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
        const response = await fetch(`${getApiEndpoint()}/coming-soon`);
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
        const response = await fetch(`${getApiEndpoint()}/properties/brands`);
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
        const response = await fetch(`${getApiEndpoint()}/properties/${hotelSlug}/meetings-events`);
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
        const response = await fetch(`${getApiEndpoint()}/properties/${hotelSlug}/meetings-events/${eventSlug}`);
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

export const getDiningDetails = async (hotelSlug: string, diningSlug: string) => {
    try {
        const response = await fetch(`${getApiEndpoint()}/properties/${hotelSlug}/dining/${diningSlug}`);
        if (!response.ok) {
            throw new Error(`Error fetching dining details: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};


export const getOfferBySlug = async (slug: string) => {
    try {
        const response = await fetch(`${getApiEndpoint()}/offers/${slug}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Error fetching offer data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};

export const getDestinationsData = async () => {
    try {
        const response = await fetch(`${getApiEndpoint()}/destinations`);
        if (!response.ok) {
            throw new Error(`Error fetching destinations data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return [];
    }
};

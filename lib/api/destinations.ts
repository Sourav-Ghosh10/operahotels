/**
 * Destinations API Helper
 * ──────────────────────────────────────────────────────────────────────────
 * Fetches destination data from the Laravel backend.
 *
 * Set NEXT_PUBLIC_API_URL in your .env.local:
 *   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
 *
 * In production, change that value to your real server domain.
 */

import { getApiBaseUrl } from '@/services/api';

export const API_BASE = getApiBaseUrl();
export type Locale = 'en' | 'ar';

// ─── Types ────────────────────────────────────────────────────────────────

export interface CityData {
  id: number;
  slug: string;
  name?: string;
  name_en?: string;
  name_ar?: string;
  description?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  city_image_url: string | null;
  city_link: string | null;
  layout_type: string | null;
  hotel_labels: {
    hotel_name: string;
    x_position: number;
    y_position: number;
    hotel_url: string;
  }[];
  sort_order: number;
  latitude: number | null;
  longitude: number | null;
}

export interface SeoData {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
}

export interface DestinationHotelData {
  id: number;
  name: string;
  slug: string;
  cover_image?: string | null;
  banner_images?: string[];
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
  google_location?: string | null;
  star_rating?: number | null;
}

export interface DestinationData {
  id: number;
  slug: string;
  country: string | null;
  name?: string;
  name_en?: string;
  name_ar?: string;
  description?: string | null;
  description_en?: string | null;
  description_ar?: string | null;
  is_active: boolean;
  sort_order: number;
  banner_images: string[];
  map_embeds?: string[];
  cities: CityData[];
  hotels?: DestinationHotelData[];
  seo: SeoData | null;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────

/**
 * Fetch all active destinations from the CMS.
 * Usage: const destinations = await fetchDestinations();
 */
export async function fetchDestinations(): Promise<DestinationData[]> {
  const apiBase = getApiBaseUrl();
  try {
    const res = await fetch(`${apiBase}/api/destinations`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[fetchDestinations] Failed to fetch: ${res.status} ${res.statusText}`);
      throw new Error(`API returned ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    return (json.data || []) as DestinationData[];
  } catch (error) {
    console.error(`[fetchDestinations] Error connecting to API:`, error instanceof Error ? error.message : error);
    throw error;
  }
}

/**
 * Fetch a single destination by its slug from the CMS.
 * Usage: const destination = await fetchDestination('united-arab-emirates');
 */
export async function fetchDestination(slug: string, locale: Locale = 'en'): Promise<DestinationData | null> {
  const apiBase = getApiBaseUrl();
  try {
    const res = await fetch(`${apiBase}/api/destinations/${slug}`, {
      headers: {
        'X-Locale': locale,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[fetchDestination] "${slug}" not found: ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data as DestinationData;
  } catch (error) {
    console.error(`[fetchDestination] Error connecting to API:`, error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchDestinationByLocale(slug: string, locale: Locale): Promise<DestinationData | null> {
  const apiBase = getApiBaseUrl();
  try {
    const res = await fetch(`${apiBase}/api/destinations/${slug}`, {
      cache: 'no-store',
      headers: {
        'X-Locale': locale,
      },
    });

    if (!res.ok) {
      console.warn(`[fetchDestinationByLocale] "${slug}" not found: ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data as DestinationData;
  } catch (error) {
    console.error(`[fetchDestinationByLocale] Error connecting to API:`, error instanceof Error ? error.message : error);
    return null;
  }
}

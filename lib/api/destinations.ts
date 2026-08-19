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

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
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
  seo: SeoData | null;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────

/**
 * Fetch all active destinations from the CMS.
 * Usage: const destinations = await fetchDestinations();
 */
export async function fetchDestinations(): Promise<DestinationData[]> {
  try {
    const res = await fetch(`${API_BASE}/api/destinations`, {
      // Cache: revalidate every 60 seconds (Next.js ISR-style freshness)
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[fetchDestinations] Failed to fetch: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = await res.json();
    return json.data as DestinationData[];
  } catch (error) {
    console.error(`[fetchDestinations] Error connecting to API:`, error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Fetch a single destination by its slug from the CMS.
 * Usage: const destination = await fetchDestination('dubai');
 */
export async function fetchDestination(slug: string, locale: Locale = 'en'): Promise<DestinationData | null> {
  console.log("slug====>", slug)
  try {
    const res = await fetch(`${API_BASE}/api/destinations/${slug}`, {
      headers: {
        'X-Locale': locale,
      },
      next: { revalidate: 60 },
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
  console.log("slug====>", slug)
  try {
    const res = await fetch(`${API_BASE}/api/destinations/${slug}`, {
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

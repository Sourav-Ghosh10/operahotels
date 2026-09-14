const BRAND_NAMES_AR: Record<string, string> = {
  "bahi-hotels-resorts": "فنادق ومنتجعات باهي",
  "coral-hotels-resorts": "فنادق ومنتجعات كورال",
  "corp-hotels": "فنادق كورب",
  "ewa-hotel-apartments": "شقق فندقية إيوا",
  "ecos-hotels": "فنادق إيكوس",
};

const HOTEL_NAMES_AR: Record<string, string> = {
  "bahi-ajman-palace-hotel": "قصر باهي عجمان",
  "coral-beach-resort-sharjah": "منتجع كورال بيتش الشارقة",
  "coral-dubai-deira-hotel": "فندق كورال دبي ديرة",
  "coral-jubail-hotel": "فندق كورال الجبيل",
  "corp-amman-hotel": "فندق كورب عمّان",
  "corp-makkah-al-naseem-hotel": "فندق كورب مكة النسيم",
  "ewa-amman-hotel": "فندق إيوا عمّان",
  "ecos-coral-deira": "إيكوس كورال ديرة",
};

const DESTINATION_NAMES_AR: Record<string, string> = {
  dubai: "دبي",
  amman: "عمّان",
  sharjah: "الشارقة",
  jeddah: "جدة",
  makkah: "مكة المكرمة",
  jubail: "الجبيل",
};

export function getArabicBrandName(slug: string, fallback: string): string {
  return BRAND_NAMES_AR[slug] || fallback;
}

export function getArabicHotelName(slug: string, fallback: string): string {
  return HOTEL_NAMES_AR[slug] || fallback;
}

export function getArabicDestinationName(
  slug: string,
  nameAr?: string,
  fallback?: string,
): string {
  const cleanSlug = slug.replace(/^\/?(destinations\/)?/, "").toLowerCase();
  return nameAr || DESTINATION_NAMES_AR[cleanSlug] || fallback || "";
}

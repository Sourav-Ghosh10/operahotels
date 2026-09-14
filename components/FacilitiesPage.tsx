"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import HotelHeader from "@/components/HotelHeader";
import HotelFooter from "@/components/HotelFooter";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getPropertyBySlug, resolveImageUrl } from "@/services/api";

interface FacilityItem {
  name: string;
  description: string;
  icon?: string | null;
  image?: string | null;
}

interface AmenityData {
  id: number;
  title: string | { [lang: string]: string };
  subtitle?: string | null;
  description: string | null;
  read_more_label?: string | null;
  read_more_link?: string | null;
  call_us_no?: string | null;
  amenities_list: FacilityItem[];
}

interface HotelData {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  footer_logo: string | null;
  banner_images: string[];
  phone: string | null;
  address: string | null;
  email: string | null;
  amenities?: AmenityData[];
}

// Fallback high-res imagery for luxury resort facilities
const FALLBACK_FACILITY_IMAGES = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1600&auto=format&fit=crop"
];

// Helper: render tailored SVG icon for each amenity name
function renderFacilityIcon(name: string) {
  const lower = (name || "").toLowerCase();

  if (lower.includes("beach")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      </svg>
    );
  }

  if (lower.includes("pool") || lower.includes("swim")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        <path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
        <circle cx="16" cy="6" r="2.5" />
        <path d="m14 11 3-2 3 2" />
        <path d="M14 13h4" />
      </svg>
    );
  }

  if (lower.includes("fitness") || lower.includes("gym")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5v14" />
        <path d="M18 5v14" />
        <path d="M2 9v6" />
        <path d="M22 9v6" />
        <path d="M6 12h12" />
      </svg>
    );
  }

  if (lower.includes("spa") || lower.includes("wellness") || lower.includes("massage")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9z" />
        <path d="M12 7c-2 2-3 4.5-3 7" />
        <path d="M12 7c2 2 3 4.5 3 7" />
        <path d="M8 12c1.5 1 2.5 1.5 4 1.5s2.5-.5 4-1.5" />
      </svg>
    );
  }

  if (lower.includes("kid") || lower.includes("child") || lower.includes("club")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
      </svg>
    );
  }

  if (lower.includes("tennis") || lower.includes("court") || lower.includes("sport") || lower.includes("volley")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20" />
        <path d="M12 2a14.5 14.5 0 0 1 0 20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    );
  }

  // Default elegant star icon
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function FacilitiesPage({
  hotelSlug,
  initialData,
}: {
  hotelSlug: string;
  initialData?: any;
}) {
  const [hotelData, setHotelData] = useState<HotelData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  // Hero Slider states
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Carousel Rotator states
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [isMounted, setIsMounted] = useState(false);

  // Fetch hotel data
  useEffect(() => {
    if (!hotelData) {
      setLoading(true);
      getPropertyBySlug(hotelSlug)
        .then((data) => {
          if (data) setHotelData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("FacilitiesPage: Error fetching property data:", err);
          setLoading(false);
        });
    }
  }, [hotelSlug, hotelData]);

  // Window resize & mount listener
  useEffect(() => {
    setIsMounted(true);
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Primary Amenity record
  const primaryAmenity = useMemo(() => {
    return hotelData?.amenities?.[0] || null;
  }, [hotelData]);

  // Hotel name
  const hotelDisplayName = useMemo(() => {
    return hotelData?.name || "Coral Beach Resort Sharjah";
  }, [hotelData]);

  // Call Us number
  const callUsPhone = useMemo(() => {
    return primaryAmenity?.call_us_no || hotelData?.phone || "+971 6 522 9999";
  }, [primaryAmenity, hotelData]);

  // Facility Items
  const facilities: FacilityItem[] = useMemo(() => {
    const list = primaryAmenity?.amenities_list || [];
    if (list && list.length > 0) {
      return list;
    }

    // Default fallback items matching Coral Beach Resort Sharjah
    return [
      {
        name: "Private Beach Access",
        description: "Complimentary direct access to our pristine private sandy beach along the Arabian Gulf with sun loungers, umbrellas, and beachside towel service.",
        image: FALLBACK_FACILITY_IMAGES[0]
      },
      {
        name: "Infinity Swimming Pools",
        description: "Two expansive temperature-controlled outdoor pools, including dedicated water slides for children and an adults-only relaxation zone.",
        image: FALLBACK_FACILITY_IMAGES[1]
      },
      {
        name: "Fitness Centre",
        description: "Stay active in our fully-equipped modern gymnasium featuring state-of-the-art cardiovascular machines, free weights, and fitness instructors.",
        image: FALLBACK_FACILITY_IMAGES[2]
      },
      {
        name: "Spa & Wellness",
        description: "Relax and rejuvenate with our signature therapeutic massages, body treatments, sauna, steam rooms, and bubbling hot tubs.",
        image: FALLBACK_FACILITY_IMAGES[3]
      },
      {
        name: "Kids Club",
        description: "A vibrant, secure, and fun-filled environment offering interactive games, creative arts and crafts, and supervised activities for young guests.",
        image: FALLBACK_FACILITY_IMAGES[4]
      },
      {
        name: "Tennis & Sports Courts",
        description: "Enjoy floodlit tennis courts, badminton, beach volleyball, and table tennis facilities suited for friendly matches or family tournaments.",
        image: FALLBACK_FACILITY_IMAGES[5]
      }
    ];
  }, [primaryAmenity]);

  // Hero Slider Images: use facilities background images, or hotel banner images
  const heroImages = useMemo(() => {
    const listImgs = facilities.map(f => f.image || f.icon).filter(Boolean) as string[];
    if (listImgs.length > 0) return listImgs;

    const banners = (hotelData?.banner_images || []).map(b => resolveImageUrl(b)).filter(Boolean);
    if (banners.length > 0) return banners;

    return FALLBACK_FACILITY_IMAGES;
  }, [facilities, hotelData]);

  // Auto-play hero slider
  const nextHeroSlide = useCallback(() => {
    setActiveHeroIndex((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevHeroSlide = useCallback(() => {
    setActiveHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    if (!isPlaying || heroImages.length <= 1) return;
    const interval = setInterval(nextHeroSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, heroImages.length, nextHeroSlide]);

  // Facilities Carousel controls
  const nextCarouselSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % facilities.length);
  }, [facilities.length]);

  const prevCarouselSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
  }, [facilities.length]);

  // Carousel track offset calculation
  const trackTransform = useMemo(() => {
    const numSlides = facilities.length;
    if (numSlides === 0) return "translateX(0px)";

    let cardWidth = viewportWidth * 0.72;
    if (cardWidth > 1120) cardWidth = 1120;
    if (cardWidth < 320) cardWidth = 320;
    let cardMargin = 16;

    if (viewportWidth <= 767.98) {
      cardWidth = viewportWidth * 0.88;
      cardMargin = 8;
    } else if (viewportWidth <= 1199.98) {
      cardWidth = viewportWidth * 0.78;
      cardMargin = 12;
    }

    const totalCardSpace = cardWidth + cardMargin * 2;
    const centerOffset = (viewportWidth - totalCardSpace) / 2;
    const offset = centerOffset - activeSlideIndex * totalCardSpace;

    return `translateX(${offset}px)`;
  }, [facilities.length, viewportWidth, activeSlideIndex]);

  // Page Intro Text
  const introSubtitle = "FACILITIES";
  const introTitle = useMemo(() => {
    if (primaryAmenity?.title) {
      const t = primaryAmenity.title;
      return typeof t === "object" ? (t.en || Object.values(t)[0]) : t;
    }
    return `Make the most of ${hotelDisplayName} facilities`;
  }, [primaryAmenity, hotelDisplayName]);

  const introDescription = useMemo(() => {
    if (primaryAmenity?.description) {
      return primaryAmenity.description;
    }
    return "Make the most of your stay, with a wide range of five-star facilities and leisure amenities, combined with exceptional service and warm hospitality.";
  }, [primaryAmenity]);

  return (
    <>
      <Head>
        <title>{`Facilities | ${hotelDisplayName}`}</title>
        <meta name="description" content={`Discover the luxury facilities and leisure amenities at ${hotelDisplayName}.`} />
        <link rel="stylesheet" href="/css/facilities.css" />
      </Head>

      <link rel="stylesheet" href="/css/facilities.css" />
      <div className="facilities-page">
        {/* --- HEADER --- */}
        <HotelHeader
          logoUrl={hotelData?.logo || undefined}
          hotelName={hotelDisplayName}
          hotelSlug={hotelSlug}
          hotelPhone={hotelData?.phone || undefined}
        />

        {/* --- HERO SLIDER --- */}
        <section className="facilities-hero-slider" aria-label="Facilities Banner">
          {heroImages.map((imgUrl, idx) => {
            const resolved = resolveImageUrl(imgUrl);
            return (
              <div
                key={idx}
                className={`facilities-hero-slide ${idx === activeHeroIndex ? "active" : ""}`}
                style={{ backgroundImage: `url('${resolved}')` }}
              />
            );
          })}

          <div className="facilities-hero-caption">
            <h1 className="facilities-hero-title">Facilities</h1>
          </div>

          <div className="facilities-hero-controls">
            <div className="facilities-hero-arrows">
              <button
                className="facilities-hero-arrow"
                onClick={prevHeroSlide}
                aria-label="Previous Hero Slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="facilities-hero-arrow"
                onClick={nextHeroSlide}
                aria-label="Next Hero Slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              className="facilities-hero-playpause"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause Hero Slideshow" : "Play Hero Slideshow"}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>
        </section>

        {/* --- INTRO BLOCK --- */}
        <section className="facilities-intro-block" id="intro">
          <div className="facilities-intro-wrap">
            <span className="facilities-intro-subtitle">{introSubtitle}</span>
            <h2 className="facilities-intro-title">{introTitle}</h2>
            <div className="facilities-intro-content">
              <p>{introDescription}</p>
              <p>
                Our resort is renowned for its family-friendly atmosphere and exceptional recreation options, ensuring a seamless and memorable stay with engaging activities for adults and children alike.
              </p>
            </div>
          </div>
        </section>

        {/* --- FACILITIES ROTATOR (CAROUSEL) --- */}
        <section className="facilities-rotator-section" aria-label="Facilities Carousel">
          <div className="facilities-carousel-track-container">
            <div
              ref={trackRef}
              className="facilities-carousel-track"
              style={isMounted ? { transform: trackTransform } : undefined}
              suppressHydrationWarning
            >
              {facilities.map((item, idx) => {
                const isActive = idx === activeSlideIndex;
                const rawImg = item.image || item.icon || FALLBACK_FACILITY_IMAGES[idx % FALLBACK_FACILITY_IMAGES.length];
                const resolvedImg = resolveImageUrl(rawImg);

                return (
                  <div
                    key={idx}
                    className={`facility-card-slide ${isActive ? "is-active" : "is-inactive"}`}
                    onClick={() => {
                      if (!isActive) setActiveSlideIndex(idx);
                    }}
                  >
                    <div
                      className="facility-card-bg"
                      style={{ backgroundImage: `url('${resolvedImg}')` }}
                    />

                    <div className="facility-card-content">
                      <div className="facility-card-details">
                        <div className="facility-card-header">
                          <div className="facility-card-icon">
                            {renderFacilityIcon(item.name)}
                          </div>
                          <h3 className="facility-card-title">{item.name}</h3>
                        </div>
                        <p className="facility-card-description">{item.description}</p>
                      </div>

                      <div className="facility-card-cta">
                        <a
                          href={`tel:${callUsPhone.replace(/\s+/g, "")}`}
                          className="facility-call-btn"
                          aria-label={`Call Us at ${callUsPhone}`}
                        >
                          CALL US
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circular Navigation Buttons */}
          <div className="facilities-rotator-nav">
            <button
              className="facilities-rotator-btn prev"
              onClick={prevCarouselSlide}
              aria-label="Previous Facility"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="facilities-rotator-btn next"
              onClick={nextCarouselSlide}
              aria-label="Next Facility"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>

        {/* --- OUR BRANDS BAR --- */}
        <OurBrandsBar />

        {/* --- FOOTER --- */}
        <HotelFooter
          logoUrl={hotelData?.footer_logo || hotelData?.logo || undefined}
          hotelName={hotelDisplayName}
          hotelSlug={hotelSlug}
          hotelPhone={hotelData?.phone || undefined}
          hotelAddress={hotelData?.address || undefined}
          hotelEmail={hotelData?.email || undefined}
        />
      </div>
    </>
  );
}

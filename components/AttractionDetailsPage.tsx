"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import HotelHeader from "@/components/HotelHeader";
import HotelFooter from "@/components/HotelFooter";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getAttractionDetails, getPropertyBySlug, resolveImageUrl } from "@/services/api";

interface AttractionItem {
  id: number;
  name: string;
  slug: string;
  category?: string;
  distance_from_hotel?: string;
  description: string;
  address?: string;
  latitude?: number | null;
  longitude?: number | null;
  google_maps_url?: string;
  image?: string | null;
  gallery?: string[];
}

interface HotelInfo {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  footer_logo?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1600&auto=format&fit=crop"
];

export default function AttractionDetailsPage({
  hotelSlug,
  attractionSlug,
}: {
  hotelSlug: string;
  attractionSlug: string;
}) {
  const [hotel, setHotel] = useState<HotelInfo | null>(null);
  const [attraction, setAttraction] = useState<AttractionItem | null>(null);
  const [allAttractions, setAllAttractions] = useState<AttractionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Slider state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Map state
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapCardVisible, setIsMapCardVisible] = useState(true);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    getAttractionDetails(hotelSlug, attractionSlug)
      .then((data) => {
        if (data && data.attraction) {
          setHotel(data.hotel || null);
          setAttraction(data.attraction);
          setAllAttractions(data.all_attractions || []);
        } else {
          // Fallback to getPropertyBySlug
          getPropertyBySlug(hotelSlug).then((prop) => {
            if (prop) {
              setHotel({
                id: prop.id,
                name: prop.name,
                slug: prop.slug,
                logo: prop.logo,
                footer_logo: prop.footer_logo,
                phone: prop.phone,
                email: prop.email,
                address: prop.address,
              });
              const matched = (prop.attractions || []).find(
                (a: any) => a.slug === attractionSlug || String(a.id) === attractionSlug
              );
              if (matched) setAttraction(matched);
              setAllAttractions(prop.attractions || []);
            }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading attraction details:", err);
        setLoading(false);
      });
  }, [hotelSlug, attractionSlug]);

  // Gallery images
  const galleryImages = useMemo(() => {
    if (!attraction) return FALLBACK_IMAGES;
    const list = attraction.gallery && attraction.gallery.length > 0
      ? attraction.gallery
      : (attraction.image ? [attraction.image] : []);
    return list.length > 0 ? list : FALLBACK_IMAGES;
  }, [attraction]);

  // Slider controls
  const nextSlide = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevSlide = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    if (!isPlaying || galleryImages.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, galleryImages.length, nextSlide]);

  // Previous & Next Attraction computation
  const { prevAttraction, nextAttraction } = useMemo(() => {
    if (!attraction || allAttractions.length <= 1) {
      return { prevAttraction: null, nextAttraction: null };
    }
    const idx = allAttractions.findIndex((a) => a.slug === attraction.slug || a.id === attraction.id);
    if (idx === -1) return { prevAttraction: null, nextAttraction: null };

    const prev = allAttractions[(idx - 1 + allAttractions.length) % allAttractions.length];
    const next = allAttractions[(idx + 1) % allAttractions.length];
    return { prevAttraction: prev, nextAttraction: next };
  }, [attraction, allAttractions]);

  // Leaflet Map integration (Matches BrandHotelMap from hotel page)
  useEffect(() => {
    if (!mapContainerRef.current || !attraction) return;

    const lat = attraction.latitude || 25.33444;
    const lng = attraction.longitude || 55.38471;
    const pinName = attraction.name || 'Sharjah';

    let isMounted = true;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });
      mapInstanceRef.current = map;

      // 100% FREE, NO WATERMARK Esri World Light Gray Base & Reference
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
          maxZoom: 16,
        }
      ).addTo(map);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "",
          maxZoom: 16,
        }
      ).addTo(map);

      // Custom golden pin with dark badge matching hotel page exactly
      const svgHtml = `
        <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 24 30" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); transition: transform 0.25s ease;">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.627-5.373-12-12-12zm0 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" fill="#c59b4c" stroke="#ffffff" stroke-width="1.8"/>
          </svg>
          <span style="margin-top: -3px; background: #231f20; color: #c59b4c; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid #c59b4c; letter-spacing: 0.3px; font-family: sans-serif;">
            ${pinName}
          </span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "custom-hotel-pin",
        html: svgHtml,
        iconSize: [34, 62],
        iconAnchor: [17, 50],
        popupAnchor: [0, -50],
      });

      const marker = L.marker([lat, lng], {
        icon: customIcon,
        title: pinName,
      }).addTo(map);

      // Pan slightly left on desktop so the pin is positioned in the open area left of the card
      setTimeout(() => {
        if (!isMounted || !mapInstanceRef.current) return;
        map.invalidateSize();
        const isDesktop = window.innerWidth > 991;
        map.setView([lat, lng], 14);
        if (isDesktop) {
          map.panBy([-150, 0], { animate: false });
        }
      }, 200);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [attraction]);

  const hotelName = hotel?.name || "Coral Beach Resort Sharjah";
  const attractionTitle = attraction?.name || "Attraction";
  const attractionAddress = attraction?.address || "Sharjah, United Arab Emirates";

  return (
    <>
      <link rel="stylesheet" href="/css/local-attractions.css" />
      <link rel="stylesheet" href="/css/brand-map.css" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <Head>
        <title>{`${attractionTitle} | ${hotelName}`}</title>
        <meta
          name="description"
          content={attraction?.description || `Explore ${attractionTitle} near ${hotelName}.`}
        />
      </Head>

      <div className="attraction-detail-page">
        {/* --- HEADER --- */}
        <HotelHeader
          logoUrl={hotel?.logo || undefined}
          hotelName={hotelName}
          hotelSlug={hotelSlug}
          hotelPhone={hotel?.phone || undefined}
          isSolid={true}
        />

        {/* --- INTRO SECTION --- */}
        <section className="attraction-intro-section">
          <div className="attraction-intro-container">
            <h1 className="attraction-intro-title">{attractionTitle}</h1>

            <div className="attraction-intro-grid">
              {/* Left Column: Description */}
              <div className="attraction-intro-body">
                <div
                  className="attraction-description-content"
                  dangerouslySetInnerHTML={{ __html: attraction?.description || '' }}
                />
                {attraction?.distance_from_hotel && (
                  <p className="attraction-distance-badge">
                    Distance from hotel: {attraction.distance_from_hotel}
                  </p>
                )}
              </div>

              {/* Right Column: Address Card */}
              <div className="attraction-address-card">
                <span className="attraction-address-label">Address</span>
                <div className="attraction-address-row">
                  <div className="attraction-address-pin">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <p className="attraction-address-text">{attractionAddress}</p>
                </div>

                {attraction?.google_maps_url && (
                  <a
                    href={attraction.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attraction-maps-link"
                  >
                    View on Google Maps &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- IMAGES SLIDER --- */}
        <section className="attraction-slider-section" aria-label="Attraction Gallery">
          <div className="attraction-slider-box">
            {galleryImages.map((imgUrl, idx) => {
              const resolved = resolveImageUrl(imgUrl);
              return (
                <div
                  key={idx}
                  className={`attraction-slide-image ${idx === activeImageIndex ? "active" : ""}`}
                  style={{ backgroundImage: `url('${resolved}')` }}
                />
              );
            })}

            {/* Slider Navigation Arrows */}
            {galleryImages.length > 1 && (
              <div className="attraction-slider-nav">
                <button
                  className="attraction-slider-arrow"
                  onClick={prevSlide}
                  aria-label="Previous Image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231f20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  className="attraction-slider-arrow"
                  onClick={nextSlide}
                  aria-label="Next Image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231f20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Bottom Play/Pause and Dots */}
            {galleryImages.length > 1 && (
              <div className="attraction-slider-bottom-controls">
                <button
                  className="attraction-slider-playpause"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                >
                  {isPlaying ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  )}
                </button>

                <div className="attraction-slider-dots">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`attraction-slider-dot ${idx === activeImageIndex ? "active" : ""}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

                {/* --- OUR LOCATION MAP SECTION (Matching BrandHotelMap from Hotel Page) --- */}
        <section className="brand-map-plus-contact-details" aria-label="Attraction Location Map">
          {/* Intro Header */}
          <div className="brand-map-contact-intro">
            <div className="brand-map-contact-title">
              <h2 className="map-main-title">OUR LOCATION</h2>
            </div>
            <div className="brand-map-contact-link">
              <Link href={`/${hotelSlug}/contact`}>
                CONTACT US
              </Link>
            </div>
          </div>

          {/* Map and Floating Card Wrapper */}
          <div className="brand-map-container-wrapper">
            <div className="brand-map-inner-layout">
              {/* Interactive Leaflet Map */}
              <div ref={mapContainerRef} className="brand-map-element" />

              {/* Floating Hotel & Attraction Details Card */}
              <div className="brand-floating-card">
                <div className="floating-card-image-wrap">
                  <img
                    src={resolveImageUrl(attraction?.image || galleryImages[0])}
                    alt={attractionTitle}
                    className="floating-card-image"
                  />
                </div>
                <div className="floating-card-body">
                  <div>
                    <h3 className="floating-hotel-name">{attractionTitle}</h3>

                    {attractionAddress && (
                      <div className="floating-info-item">
                        <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{attractionAddress}</span>
                      </div>
                    )}

                    {hotel?.phone && (
                      <div className="floating-info-item">
                        <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <a href={`tel:${hotel.phone}`} className="floating-hotel-phone">
                          {hotel.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="floating-card-footer">
                    <Link href={`/${hotelSlug}`} className="floating-view-link">
                      VIEW HOTEL &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- BOTTOM NAVIGATION BAR (Prev / View All / Next) --- */}
        <section className="detail-nav-wrap default-margin module-nav__group--prev-next desktop-content-width">
          <div className="detail-nav-prev">
            {prevAttraction && (
              <Link
                href={`/${hotelSlug}/local-attractions/${prevAttraction.slug || prevAttraction.id}`}
                className="link cta-secondary detail-nav-link prev-link"
              >
                &lt; PREV ATTRACTION
              </Link>
            )}
          </div>

          <div className="detail-nav-grid">
            <Link href={`/${hotelSlug}#explore`} className="link cta-secondary item-link grid-link">
              VIEW ATTRACTIONS
            </Link>
          </div>

          <div className="detail-nav-next">
            {nextAttraction && (
              <Link
                href={`/${hotelSlug}/local-attractions/${nextAttraction.slug || nextAttraction.id}`}
                className="link cta-secondary detail-nav-link next-link"
              >
                NEXT ATTRACTION &gt;
              </Link>
            )}
          </div>
        </section>

        {/* --- BRANDS BAR --- */}
        <OurBrandsBar />

        {/* --- FOOTER --- */}
        <HotelFooter
          logoUrl={hotel?.footer_logo || hotel?.logo || undefined}
          hotelName={hotelName}
          hotelSlug={hotelSlug}
          hotelPhone={hotel?.phone || undefined}
          hotelAddress={hotel?.address || undefined}
          hotelEmail={hotel?.email || undefined}
        />
      </div>
    </>
  );
}

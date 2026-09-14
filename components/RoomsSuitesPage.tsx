"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import HotelHeader from "@/components/HotelHeader";
import HotelFooter from "@/components/HotelFooter";
import { getPropertyBySlug } from "@/services/api";

interface RoomType {
  id: number;
  name: string;
  slug: string;
  hotel_id?: number;
  hotel_name?: string;
  hotel_slug?: string;
  hotel_city?: string;
  hotel_country?: string;
  description: string | null;
  short_description: string | null;
  size_sqm: number | null;
  bed_type: string | null;
  image: string | null;
  gallery: string[];
  starting_price: string | null;
  read_more_label: string | null;
  read_more_link: string | null;
  book_now_label: string | null;
  book_now_link: string | null;
  special_features: any;
}

interface ChildHotel {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  cover_image?: string | null;
  banner_images?: string[];
  address?: string | null;
  city?: string | null;
  country?: string | null;
  room_types?: RoomType[];
}

interface HotelData {
  id: number;
  name: string;
  slug: string;
  type?: string;
  logo: string | null;
  footer_logo: string | null;
  banner_images: string[];
  banner_title: string | null;
  intro_title: string | null;
  intro_subtitle: string | null;
  intro_text: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  room_types: RoomType[];
  child_hotels?: ChildHotel[];
  cover_image: string | null;
}

interface RoomsSuitesPageProps {
  hotelSlug: string;
}

// Image slider sub-component
function RoomImageSlider({ room }: { room: RoomType }) {
  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image || "/img/amenity_pool.png"];
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i + 1) % images.length);
  };

  return (
    <div className="rsv2-slider">
      <div className="rsv2-slide-wrap" style={{ backgroundImage: `url('${images[current]}')` }}>
        {images.length > 1 && (
          <>
            <button className="rsv2-arrow rsv2-arrow--prev" onClick={prev} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="rsv2-arrow rsv2-arrow--next" onClick={next} aria-label="Next photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="rsv2-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`rsv2-dot ${i === current ? "rsv2-dot--active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setCurrent(i); }}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RoomsSuitesPage({ hotelSlug }: RoomsSuitesPageProps) {
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedHotelFilter, setSelectedHotelFilter] = useState<string>("all");

  useEffect(() => {
    getPropertyBySlug(hotelSlug).then((data) => {
      setHotelData(data);
      setLoading(false);
    });
  }, [hotelSlug]);

  const isBrand = hotelData?.type === "brand";

  // Group child hotels and their rooms
  const hotelGroups = useMemo(() => {
    if (!isBrand) return [];

    if (hotelData?.child_hotels && hotelData.child_hotels.length > 0) {
      return hotelData.child_hotels
        .map((hotel) => {
          const rooms =
            hotel.room_types && hotel.room_types.length > 0
              ? hotel.room_types
              : (hotelData.room_types || []).filter(
                  (r) => r.hotel_slug === hotel.slug || r.hotel_id === hotel.id
                );
          return {
            ...hotel,
            room_types: rooms,
          };
        })
        .filter((hotel) => hotel.room_types.length > 0);
    }

    // Fallback if child_hotels is missing: group top-level rooms by hotel_slug
    const groupsMap = new Map<string, { id: number; name: string; slug: string; city?: string | null; country?: string | null; room_types: RoomType[] }>();
    (hotelData?.room_types || []).forEach((room) => {
      const slug = room.hotel_slug || "hotel";
      if (!groupsMap.has(slug)) {
        groupsMap.set(slug, {
          id: room.hotel_id || 0,
          name: room.hotel_name || "Hotel",
          slug: slug,
          city: room.hotel_city || null,
          country: room.hotel_country || null,
          room_types: [],
        });
      }
      groupsMap.get(slug)!.room_types.push(room);
    });
    return Array.from(groupsMap.values());
  }, [isBrand, hotelData]);

  // Filtered hotel groups based on selected tab
  const displayedHotelGroups = useMemo(() => {
    if (selectedHotelFilter === "all") {
      return hotelGroups;
    }
    return hotelGroups.filter((g) => g.slug === selectedHotelFilter);
  }, [hotelGroups, selectedHotelFilter]);

  const totalBrandRooms = useMemo(() => {
    return hotelGroups.reduce((acc, g) => acc + g.room_types.length, 0);
  }, [hotelGroups]);

  const bannerImage =
    hotelData?.banner_images?.[0] ||
    hotelData?.cover_image ||
    "/img/explore_museum.png";

  const singleRoomTypes: RoomType[] = hotelData?.room_types || [];

  return (
    <div className="rsv2-page">

      {/* ── STICKY HEADER ─────────────────────────────────── */}
      <div className="rsv2-header-wrap">
        <HotelHeader
          logoUrl={hotelData?.logo || undefined}
          hotelSlug={hotelSlug}
          isSolid={true}
        />
      </div>

      {/* ── BANNER IMAGE ──────────────────────────────────── */}
      <div className="rsv2-banner" style={{ backgroundImage: `url('${bannerImage}')` }}>
        <div className="rsv2-banner-overlay" />
      </div>

      {/* ── PAGE TITLE ─────────────────────────────────────── */}
      <section className="rsv2-title-section">
        <div className="rsv2-container">
          <div className="rsv2-page-title-wrap">
            <h1 className="rsv2-page-title">ROOMS &amp; SUITES</h1>
            <div className="rsv2-title-line" />
            {isBrand && totalBrandRooms > 0 && (
              <p className="rsv2-brand-subtitle">
                Discover luxury accommodations across our {hotelGroups.length} hotel{hotelGroups.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── BRAND HOTEL FILTER TABS ───────────────────────── */}
      {isBrand && hotelGroups.length > 1 && (
        <section className="rsv2-filter-section">
          <div className="rsv2-container">
            <div className="rsv2-filter-bar">
              <div className="rsv2-filter-tabs">
                <button
                  className={`rsv2-filter-tab ${selectedHotelFilter === "all" ? "rsv2-filter-tab--active" : ""}`}
                  onClick={() => setSelectedHotelFilter("all")}
                >
                  All Hotels <span className="rsv2-tab-count">({totalBrandRooms})</span>
                </button>
                {hotelGroups.map((hotel) => (
                  <button
                    key={hotel.slug}
                    className={`rsv2-filter-tab ${selectedHotelFilter === hotel.slug ? "rsv2-filter-tab--active" : ""}`}
                    onClick={() => setSelectedHotelFilter(hotel.slug)}
                  >
                    {hotel.name} <span className="rsv2-tab-count">({hotel.room_types.length})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ROOMS SECTION ─────────────────────────────────── */}
      <section className="rsv2-rooms-section">
        <div className="rsv2-container">

          {loading && (
            <div className="rsv2-loading">
              <div className="rsv2-spinner" />
            </div>
          )}

          {/* EMPTY STATES */}
          {!loading && isBrand && displayedHotelGroups.length === 0 && (
            <p className="rsv2-empty">No rooms available across this brand&apos;s hotels at this time.</p>
          )}

          {!loading && !isBrand && singleRoomTypes.length === 0 && (
            <p className="rsv2-empty">No rooms available at this time.</p>
          )}

          {/* BRAND VIEW: GROUPED BY HOTEL */}
          {!loading && isBrand && displayedHotelGroups.length > 0 && (
            <div className="rsv2-hotel-groups-container">
              {displayedHotelGroups.map((group) => (
                <div key={group.slug} className="rsv2-hotel-group" id={`hotel-${group.slug}`}>
                  {/* Hotel Group Header */}
                  <div className="rsv2-hotel-group-header">
                    <div className="rsv2-hotel-group-info">
                      <div className="rsv2-hotel-eyebrow">
                        <span className="rsv2-hotel-tag-badge">HOTEL PROPERTY</span>
                        {(group.city || group.country) && (
                          <span className="rsv2-hotel-loc">
                            <svg className="rsv2-loc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {[group.city, group.country].filter(Boolean).join(", ")}
                          </span>
                        )}
                      </div>
                      <h2 className="rsv2-hotel-title">{group.name}</h2>
                    </div>

                    <Link href={`/${group.slug}`} className="rsv2-hotel-view-btn">
                      <span>View Hotel</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>

                  {/* Room Cards for this Hotel Group */}
                  <div className="rsv2-rooms-list">
                    {group.room_types.map((room, idx) => {
                      const isReversed = idx % 2 !== 0;
                      const roomDetailHref = `/${group.slug}/rooms-suites/${room.slug}`;

                      return (
                        <article
                          key={room.id}
                          className={`rsv2-room-card ${isReversed ? "rsv2-room-card--reversed" : ""}`}
                        >
                          {/* Image side */}
                          <div className="rsv2-room-img-side">
                            <RoomImageSlider room={room} />
                          </div>

                          {/* Content side */}
                          <div className="rsv2-room-content-side">
                            <div className="rsv2-room-inner">
                              <div className="rsv2-room-hotel-badge">
                                {group.name}
                              </div>

                              <h3 className="rsv2-room-name">{room.name}</h3>

                              {/* Specs */}
                              <div className="rsv2-room-specs">
                                {room.size_sqm && (
                                  <span className="rsv2-spec">
                                    <svg className="rsv2-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="15 3 21 3 21 9" />
                                      <polyline points="9 21 3 21 3 15" />
                                      <line x1="21" y1="3" x2="14" y2="10" />
                                      <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                    {room.size_sqm} m²
                                  </span>
                                )}
                                {room.bed_type && (
                                  <span className="rsv2-spec">
                                    <svg className="rsv2-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
                                      <path d="M2 13V20h20v-7" />
                                      <path d="M2 13h20" />
                                      <path d="M6 9v4M18 9v4" />
                                    </svg>
                                    {room.bed_type}
                                  </span>
                                )}
                              </div>

                              {/* Description */}
                              {(room.short_description || room.description) && (
                                <p className="rsv2-room-desc">
                                  {room.short_description || room.description}
                                </p>
                              )}

                              {/* CTA row */}
                              <div className="rsv2-room-ctas">
                                <Link
                                  href={room.read_more_link || roomDetailHref}
                                  className="rsv2-cta-link"
                                >
                                  {room.read_more_label || "DISCOVER MORE"}
                                  <svg className="rsv2-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </Link>

                                <button
                                  className="rsv2-cta-book"
                                  onClick={() => {
                                    if (room.book_now_link) {
                                      window.location.href = room.book_now_link;
                                    } else if (typeof window !== "undefined") {
                                      window.dispatchEvent(new CustomEvent("open-booking-sidebar"));
                                    }
                                  }}
                                >
                                  {room.book_now_label || "BOOK NOW"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SINGLE HOTEL VIEW: FLAT LIST */}
          {!loading && !isBrand && singleRoomTypes.length > 0 && (
            <div className="rsv2-rooms-list">
              {singleRoomTypes.map((room, idx) => {
                const isReversed = idx % 2 !== 0;
                const roomDetailHref = `/${hotelSlug}/rooms-suites/${room.slug}`;

                return (
                  <article
                    key={room.id}
                    className={`rsv2-room-card ${isReversed ? "rsv2-room-card--reversed" : ""}`}
                  >
                    {/* Image side */}
                    <div className="rsv2-room-img-side">
                      <RoomImageSlider room={room} />
                    </div>

                    {/* Content side */}
                    <div className="rsv2-room-content-side">
                      <div className="rsv2-room-inner">
                        <h2 className="rsv2-room-name">{room.name}</h2>

                        {/* Specs */}
                        <div className="rsv2-room-specs">
                          {room.size_sqm && (
                            <span className="rsv2-spec">
                              <svg className="rsv2-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 3 21 3 21 9" />
                                <polyline points="9 21 3 21 3 15" />
                                <line x1="21" y1="3" x2="14" y2="10" />
                                <line x1="3" y1="21" x2="10" y2="14" />
                              </svg>
                              {room.size_sqm} m²
                            </span>
                          )}
                          {room.bed_type && (
                            <span className="rsv2-spec">
                              <svg className="rsv2-spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
                                <path d="M2 13V20h20v-7" />
                                <path d="M2 13h20" />
                                <path d="M6 9v4M18 9v4" />
                              </svg>
                              {room.bed_type}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {(room.short_description || room.description) && (
                          <p className="rsv2-room-desc">
                            {room.short_description || room.description}
                          </p>
                        )}

                        {/* CTA row */}
                        <div className="rsv2-room-ctas">
                          <Link
                            href={room.read_more_link || roomDetailHref}
                            className="rsv2-cta-link"
                          >
                            {room.read_more_label || "DISCOVER MORE"}
                            <svg className="rsv2-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </Link>

                          <button
                            className="rsv2-cta-book"
                            onClick={() => {
                              if (room.book_now_link) {
                                window.location.href = room.book_now_link;
                              } else if (typeof window !== "undefined") {
                                window.dispatchEvent(new CustomEvent("open-booking-sidebar"));
                              }
                            }}
                          >
                            {room.book_now_label || "BOOK NOW"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <HotelFooter
        logoUrl={hotelData?.footer_logo || hotelData?.logo || undefined}
        hotelName={hotelData?.name || undefined}
        hotelSlug={hotelSlug}
        hotelPhone={hotelData?.phone || undefined}
        hotelAddress={hotelData?.address || undefined}
        hotelEmail={hotelData?.email || undefined}
      />
    </div>
  );
}

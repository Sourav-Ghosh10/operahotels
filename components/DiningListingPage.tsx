"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import HotelHeader from "@/components/HotelHeader";
import HotelFooter from "@/components/HotelFooter";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getPropertyBySlug } from "@/services/api";

interface DiningOutlet {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  cuisine_type: string | null;
  opening_hours: string | null;
  image: string | null;
  gallery: string[];
  read_more_label: string | null;
  read_more_link: string | null;
  contact_details: string | null;
  book_table_label: string | null;
  book_table_link: string | null;
  has_table_booking: boolean;
}

interface HotelData {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  footer_logo: string | null;
  cover_image: string | null;
  banner_images: string[];
  phone: string | null;
  address: string | null;
  email: string | null;
  dining_outlets: DiningOutlet[];
}

interface DiningListingPageProps {
  hotelSlug: string;
}

export default function DiningListingPage({ hotelSlug }: DiningListingPageProps) {
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPropertyBySlug(hotelSlug).then((data) => {
      setHotelData(data);
      setLoading(false);
    });
  }, [hotelSlug]);

  const outlets: DiningOutlet[] = hotelData?.dining_outlets || [];
  const bannerImage =
    hotelData?.banner_images?.[0] ||
    hotelData?.cover_image ||
    "/img/amenity_pool.png";

  const getOutletDetailUrl = (outlet: DiningOutlet) => {
    const slug = outlet.slug || outlet.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const targetHotelSlug = (outlet as any).hotel_slug || hotelSlug;
    return `/${targetHotelSlug}/dining/${slug}`;
  };

  return (
    <>
      <link rel="stylesheet" href="/css/dining-listing.css" />
      <div className="dlp-page">
        {/* STICKY HEADER */}
        <div className="dlp-header-wrap">
          <HotelHeader logoUrl={hotelData?.logo || undefined} hotelSlug={hotelSlug} isSolid={true} />
        </div>

        {/* HERO BANNER */}
        <div className="dlp-banner" style={{ backgroundImage: `url('${bannerImage}')` }}>
          <div className="dlp-banner-overlay" />
          <div className="dlp-banner-content">
            <p className="dlp-banner-label">CULINARY EXPERIENCES</p>
            <h1 className="dlp-banner-title">DINING</h1>
            <div className="dlp-banner-line" />
          </div>
        </div>

        

        {/* INTRO SECTION */}
        <section className="dlp-intro">
          <div className="dlp-container dlp-intro-inner">
            <p className="dlp-intro-sub">A WORLD OF FLAVOURS</p>
            <h2 className="dlp-intro-title">
              DELIGHT YOUR TASTE BUDS
            </h2>
            <p className="dlp-intro-text">
              Indulge in an exceptional culinary journey at {hotelData?.name || "our hotel"}, where every meal is a celebration of flavour, culture, and craftsmanship. From vibrant international buffets to casual poolside bites, our dining venues offer something extraordinary for every occasion.
            </p>
            <div className="dlp-gold-line" />
          </div>
        </section>

        {/* LOADING STATE */}
        {loading && (
          <div className="dlp-loading">
            <div className="dlp-loading-spinner" />
            <p>Loading dining options…</p>
          </div>
        )}

        {/* DINING OUTLETS */}
        {!loading && outlets.length === 0 && (
          <div className="dlp-empty">
            <p>Dining information coming soon.</p>
          </div>
        )}

        {!loading && outlets.length > 0 && (
          <section className="dlp-outlets">
            <div className="dlp-container">
              {outlets.map((outlet, index) => {
                const isEven = index % 2 === 0;
                const detailUrl = getOutletDetailUrl(outlet);
                const imgSrc = (Array.isArray(outlet.gallery) && outlet.gallery.length > 0)
                  ? outlet.gallery[0]
                  : (outlet.image || "/img/amenity_pool.png");

                return (
                  <div key={outlet.id} className={`dlp-outlet-row ${isEven ? "dlp-outlet-row--normal" : "dlp-outlet-row--reverse"}`}>
                    {/* Image Column */}
                    <div className="dlp-outlet-img-col">
                      <Link href={detailUrl} className="dlp-outlet-img-wrap">
                        <img
                          src={imgSrc}
                          alt={outlet.name}
                          className="dlp-outlet-img"
                        />
                        <div className="dlp-outlet-img-overlay" />
                      </Link>
                    </div>

                    {/* Content Column */}
                    <div className="dlp-outlet-content-col">
                      <div className="dlp-outlet-content">
                        {outlet.cuisine_type && (
                          <p className="dlp-outlet-cuisine">{outlet.cuisine_type.toUpperCase()}</p>
                        )}
                        <h2 className="dlp-outlet-name">{outlet.name}</h2>
                        <div className="dlp-outlet-divider" />
                        {outlet.opening_hours && (
                          <p className="dlp-outlet-hours">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {outlet.opening_hours}
                          </p>
                        )}
                        {outlet.description && (
                          <div className="dlp-outlet-desc" dangerouslySetInnerHTML={{ __html: outlet.description }} />
                        )}
                        <div className="dlp-outlet-actions">
                          <Link href={detailUrl} className="dlp-btn-readmore">
                            {outlet.read_more_label || "READ MORE"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 18.721 12.006">
                              <g transform="translate(1 1.414)">
                                <path d="M0,0,4.589,4.589,0,9.178" transform="translate(12.132)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                                <path d="M15.746,0H0" transform="translate(0 4.589)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                              </g>
                            </svg>
                          </Link>
                          {(outlet.has_table_booking || outlet.book_table_link) && (
                            <a
                              href={outlet.book_table_link || "#"}
                              className="dlp-btn-book"
                              target={outlet.book_table_link ? "_blank" : undefined}
                              rel="noopener noreferrer"
                            >
                              {outlet.book_table_label || "BOOK A TABLE"}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <OurBrandsBar />
        <HotelFooter
          logoUrl={hotelData?.footer_logo || hotelData?.logo || undefined}
          hotelName={hotelData?.name || undefined}
          hotelSlug={hotelSlug}
          hotelPhone={hotelData?.phone || undefined}
          hotelAddress={hotelData?.address || undefined}
          hotelEmail={hotelData?.email || undefined}
        />
      </div>
    </>
  );
}
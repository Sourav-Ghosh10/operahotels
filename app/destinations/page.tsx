/**
 * Destinations listing page — fetches live data from the Laravel CMS API.
 * Renders server-side (SSR) so data is always fresh from the database.
 */
import React from 'react';
import DestinationMap from '@/components/DestinationMap';

const allDestinationHotels = [
    {
        id: 29,
        name: 'Bahi Ajman Palace Hotel',
        slug: 'bahi-ajman-palace-hotel',
        latitude: 25.41682,
        longitude: 55.43877,
        address: 'Sheikh Humaid Bin Rashid Al Nuaimi Street, Ajman',
        city: 'Ajman',
        country: 'United Arab Emirates',
        phone: '+971 6 701 8888',
    },
    {
        id: 31,
        name: 'Coral Beach Resort Sharjah',
        slug: 'coral-beach-resort-sharjah',
        latitude: 25.4095,
        longitude: 55.4328,
        address: 'Corniche Street, Al Muntazah, Sharjah',
        city: 'Sharjah',
        country: 'United Arab Emirates',
        phone: '+971 6 522 9999',
    },
    {
        id: 32,
        name: 'Coral Dubai Deira Hotel',
        slug: 'coral-dubai-deira-hotel',
        latitude: 25.2631,
        longitude: 55.3217,
        address: 'Al Muraqqabat Street, Deira, Dubai',
        city: 'Dubai',
        country: 'United Arab Emirates',
        phone: '+971 4 224 8587',
    },
    {
        id: 35,
        name: 'ECOS Dubai Hotel Al Furjan',
        slug: 'ecos-hotels-dubai-alfurjan',
        latitude: 25.02038,
        longitude: 55.15353,
        address: 'Al Furjan, Jabal Ali First, Dubai',
        city: 'Dubai',
        country: 'United Arab Emirates',
        phone: '+971 4 510 0000',
    },
    {
        id: 33,
        name: 'Coral Jubail Hotel',
        slug: 'coral-jubail-hotel',
        latitude: 27.02286,
        longitude: 49.64201,
        address: 'Exit 8, King Faisal West, Al Jubail',
        city: 'Al Jubail',
        country: 'Saudi Arabia',
        phone: '+966 13 362 8800',
    },
    {
        id: 34,
        name: 'Corp Executive Hotel Amman',
        slug: 'corp-executive-hotel-amman',
        latitude: 31.97599,
        longitude: 35.90534,
        address: 'Queen Alia Street, Al Shmeisani, Amman',
        city: 'Amman',
        country: 'Jordan',
        phone: '+962 6 568 6666',
    },
];
import Link from 'next/link';
import Header from '@/components/ServerHeader';
import { fetchDestinations, DestinationData } from '@/lib/api/destinations';

function stripHtml(value: string | null | undefined) {
  return value?.replace(/<[^>]*>/g, '').trim() || '';
}

// ─── Page (Server Component — no "use client") ───────────────────────────

export const metadata = {
  title: 'Iconic Destinations | HMH Hotels',
  description:
    'Explore HMH Hotels across iconic destinations in the GCC region — UAE, Saudi Arabia, Jordan and beyond.',
};

export default async function DestinationsPage() {
  // Fetch live destinations from the Laravel API
  let destinations: DestinationData[] = [];
  let fetchError = false;

  try {
    destinations = await fetchDestinations();
  } catch (err) {
    console.error('[DestinationsPage] API error:', err);
    fetchError = true;
  }

  return (
    <main>
      <link rel="stylesheet" href="/css/destinations.css" />
      {/* ── Hero / Banner ─────────────────────────────────────────────── */}
      <header className="hero-section">

        {/* Background Slider */}
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
          data-bs-ride="carousel"
          data-bs-pause="false"
          style={{ zIndex: '0' }}
        >
          <div className="carousel-inner h-100">
            {/* Slide 1 — static fallback; banner images from CMS could replace these */}
            <div className="carousel-item h-100 active" data-bs-interval="5000">
              <div
                className="slider-image w-100 h-100"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            {/* Slide 2 */}
            <div className="carousel-item h-100" data-bs-interval="5000">
              <div
                className="slider-image w-100 h-100"
                style={{
                  backgroundImage: "url('/img/futuristic-dubai-landscape/ 1.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </div>
        </div>

        {/* Banner Overlay */}
        <div className="hero-overlay" />

        {/* Navigation */}
        <Header />

        {/* Banner Content */}
        <div className="hero-content position-relative" style={{ zIndex: '10' }}>
          <h1 className="main-title" style={{ fontSize: '3.5rem', letterSpacing: '4px' }}>
            ICONIC DESTINATIONS
          </h1>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev custom-carousel-control"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="12" x2="4" y2="12" />
            <polyline points="10 18 4 12 10 6" />
          </svg>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next custom-carousel-control"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </svg>
          <span className="visually-hidden">Next</span>
        </button>
      </header>

      {/* ── Intro Section ──────────────────────────────────────────────── */}
      <section className="destinations-intro">
        <div className="container">
          <h2 className="section-title">DISCOVER YOUR NEXT EXPERIENCE</h2>
          <p className="destinations-p">
            Our Hotels offer unparalleled hospitality services in some of the most desirable destinations across the
            GCC region. Whether you&apos;re traveling for business or leisure, you&apos;ll find hidden gems in popular
            landmark locations.
          </p>
          <p className="destinations-p mb-0">
            From Dubai&apos;s iconic skyline to the bustling centre of Jeddah and the ancient ruins of Amman, HMH has
            something to offer everyone.
          </p>
        </div>
      </section>

      {/* ── Destinations Grid — live from CMS API ─────────────────────── */}
      <section className="destinations-grid-section">
        <div className="container">

          {/* API error fallback */}
          {fetchError && (
            <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>
              Unable to load destinations at the moment. Please try again later.
            </p>
          )}

          {/* Loaded destinations from CMS */}
          {!fetchError && destinations.length > 0 && (
            <div className="destinations-grid-custom">
              {/* Group into rows of 2 */}
              {Array.from({ length: Math.ceil(destinations.length / 2) }, (_, rowIdx) => (
                <div className="destinations-row" key={rowIdx}>
                  {destinations.slice(rowIdx * 2, rowIdx * 2 + 2).map((destination) => (
                    <div className="destination-card" key={destination.id}>
                      {(() => {
                        const destinationName = destination.name || destination.name_en || '';
                        const destinationDescription = stripHtml(destination.description || destination.description_en);

                        return (
                          <>
                            <div className="destination-card-img-wrapper">
                              <img
                                src={
                                  destination.banner_images[0]
                                    ?? `/img/des-${destination.id}.png`
                                }
                                alt={`${destinationName} Destination`}
                                className="destination-card-img"
                              />
                            </div>
                            <h3 className="destination-card-title">{destinationName}</h3>
                            <p className="destination-card-text">{destinationDescription}</p>
                            <Link
                              href={`/destinations/${destination.slug.replace(/^\/?(destinations\/)?/, '')}`}
                              className="destination-card-link"
                            >
                              Read More
                            </Link>
                          </>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* No destinations in CMS yet — show static placeholders */}
          {!fetchError && destinations.length === 0 && (
            <div className="destinations-grid-custom">
              <div className="destinations-row">
                <div className="destination-card">
                  <div className="destination-card-img-wrapper">
                    <img src="/img/des-1.png" alt="UAE Destination" className="destination-card-img" />
                  </div>
                  <h3 className="destination-card-title">UAE</h3>
                  <p className="destination-card-text">
                    A destination where world-class hospitality blends seamlessly with unparalleled luxury, set
                    against stunning landscapes and vibrant culture.
                  </p>
                  <a href="/destinations/dubai" className="destination-card-link">Read More</a>
                </div>
                <div className="destination-card">
                  <div className="destination-card-img-wrapper">
                    <img src="/img/des-2.png" alt="Saudi Arabia Destination" className="destination-card-img" />
                  </div>
                  <h3 className="destination-card-title">Saudi Arabia</h3>
                  <p className="destination-card-text">
                    Saudi Arabia offers a fascinating blend of rich heritage and futuristic innovation.
                  </p>
                  <a href="/destinations/saudi-arabia" className="destination-card-link">Read More</a>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Our Location Section - Interactive Luxury Destinations Map ── */}
      <DestinationMap
        hotels={allDestinationHotels as any}
        brandName="Destinations"
        contactUrl="/contact"
        sectionTitle="OUR DESTINATIONS & HOTELS"
      />
    </main>
  );
}

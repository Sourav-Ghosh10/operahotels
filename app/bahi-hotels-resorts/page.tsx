import React from 'react';
import Header from '@/components/ServerHeader';
import Link from 'next/link';
import BahiHeroCarousel from './BahiHeroCarousel';
import BahiExperienceSlider from './BahiExperienceSlider';

export const metadata = {
  title: 'Bahi Hotels & Resorts | Opera Hotels',
  description: 'Discover Bahi Hotels & Resorts – a 5-star hotel brand in Ajman designed for discerning travellers who seek a luxury experience that is "Impeccable Plush".',
};

export default function BahiHotelsPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/bahi.css" />
      <main>

        {/* ══════════════════════════════════════════
            1. HERO / FULL-SCREEN SLIDER
        ══════════════════════════════════════════ */}
        <header className="bahi-hero">
          <BahiHeroCarousel />
          <div className="hero-overlay" />
          <Header />
          {/* Bottom-left title — no other content */}
          <div className="bahi-hero-content">
            <h1 className="bahi-hero-title">STAY AT BAHI HOTELS &amp; RESORTS</h1>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            2. WELCOME / INTRO — centred, light grey bg
            Label: "IMPECCABLE PLUSH"
            Title: "Welcome to Bahi Hotels & Resorts"
            Gold divider line
        ══════════════════════════════════════════ */}
        <section className="bahi-intro">
          <div className="container">
            <p className="bahi-gold-label">IMPECCABLE PLUSH</p>
            <h2 className="bahi-intro-title">Welcome to Bahi Hotels &amp; Resorts</h2>
            <p className="bahi-intro-body">
              Embark on a voyage of unforgettable experiences with Bahi Hotels &amp; Resorts,<br />
              a 5-star hotel brand in Ajman designed for discerning travellers who seek a luxury experience that is &lsquo;Impeccable Plush&rsquo;.
            </p>
            <div className="bahi-gold-divider" />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. EXPERIENCE BAHI HOTELS & RESORTS
            3-col card grid, light grey bg, left heading
            Card 1: image + bottom-left gradient overlay text + white card body
            Card 2 (Featured): badge top-right + dark overlay promo text + BOOK NOW
            Card 3: plain image + white card body
        ══════════════════════════════════════════ */}
        <section className="bahi-experience">
          <div className="bahi-experience-inner">
            <h2 className="bahi-section-heading">EXPERIENCE BAHI HOTELS &amp; RESORTS</h2>

            <BahiExperienceSlider />

            <div className="bahi-gold-rule" />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. OUR HOTELS
            Heading left + "Discover" link right
            Contained hotel image with dark info panel
            overlapping to the right of the image
        ══════════════════════════════════════════ */}
        <section className="bahi-our-hotels" id="our-hotels">
          <div className="bahi-experience-inner">
            <div className="bahi-section-header">
              <h2 className="bahi-section-heading mb-0">OUR HOTELS</h2>
              <a href="#" className="bahi-underline-link">DISCOVER MORE ABOUT BAHI HOTELS</a>
            </div>

            <div className="bahi-hotel-row">
              {/* Wide hotel image */}
              <div className="bahi-hotel-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop"
                  alt="Bahi Ajman Palace Hotel"
                  className="bahi-hotel-img"
                />
              </div>
              {/* Dark info panel — overlaps image on the right */}
              <div className="bahi-hotel-info">
                <h3 className="bahi-hotel-name">BAHI AJMAN PALACE HOTEL</h3>
                <p className="bahi-hotel-address">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0, marginTop:'3px'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Sheikh Humaid Bin Rashid Al Nuaimi Street, PO Box 7176, Ajman, United Arab Emirates
                </p>
                <p className="bahi-hotel-phone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+97167018888">+971 6 701 8888</a>
                </p>
                <div className="bahi-hotel-btns">
                  <a href="#" className="bahi-hotel-btn-outline">VISIT WEBSITE</a>
                  <a href="https://reservations.travelclick.com/115808" target="_blank" rel="noopener noreferrer" className="bahi-hotel-btn-gold">BOOK NOW</a>
                </div>
              </div>
            </div>

            <div className="bahi-gold-rule" />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. BAHI HOTELS LOCATIONS
            Heading + "Discover our destinations" link
            Full-bleed UAE destination image with "UAE" label
            Below: "WHERE WE ARE" section left + "CONTACT US" right
            Google map full-width + hotel photo card overlay
        ══════════════════════════════════════════ */}
        <section className="bahi-locations">
          <div className="bahi-experience-inner">
            <div className="bahi-section-header">
              <h2 className="bahi-section-heading mb-0">BAHI HOTELS LOCATIONS</h2>
              <a href="#" className="bahi-underline-link">DISCOVER OUR DESTINATIONS</a>
            </div>
          </div>

          {/* Full-bleed destination hero image */}
          <div className="bahi-location-hero">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
              alt="UAE – Ajman"
              className="bahi-location-hero-img"
            />
            <span className="bahi-location-uae-badge">UAE</span>
          </div>

          {/* Where We Are sub-section */}
          <div className="bahi-where-bar">
            <h3 className="bahi-where-title">WHERE WE ARE</h3>
            <a href="#" className="bahi-underline-link">CONTACT US</a>
          </div>

          {/* Map + hotel card */}
          <div className="bahi-map-row">
            <div className="bahi-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.5!2d55.4568!3d25.3981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f57d1e9c3a5c5%3A0xb9c26e72c9e5f67a!2sBahi%20Ajman%20Palace%20Hotel!5e0!3m2!1sen!2sae!4v1692000000000!5m2!1sen!2sae"
                title="Bahi Ajman Palace Hotel map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {/* Hotel photo + info card (overlaid top-right of map) */}
            <div className="bahi-map-hotel-card">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
                alt="Bahi Ajman Palace Hotel"
                className="bahi-map-hotel-img"
              />
              <div className="bahi-map-hotel-info">
                <h4 className="bahi-map-hotel-name">BAHI AJMAN PALACE HOTEL</h4>
                <p className="bahi-map-hotel-address">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0, marginTop:'3px'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Sheikh Humaid Bin Rashid Al Nuaimi Street, PO Box 7176, Ajman, United Arab Emirates
                </p>
                <p className="bahi-map-hotel-phone">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href="tel:+97167018888">+971 6 701 8888</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. OUR BRANDS
        ══════════════════════════════════════════ */}
        <section className="bahi-brands">
          <div className="container">
            <h2 className="bahi-section-heading text-center" style={{marginBottom:'40px'}}>OUR BRANDS</h2>
            <div className="bahi-brands-row">
              <Link href="/bahi-hotels-resorts" className="bahi-brand-logo bahi-brand-active">
                <span className="bahi-brand-text">BAHI HOTELS &amp; RESORTS</span>
              </Link>
              <a href="#" className="bahi-brand-logo">
                <span className="bahi-brand-text">CORAL HOTELS &amp; RESORTS</span>
              </a>
              <a href="#" className="bahi-brand-logo">
                <span className="bahi-brand-text">CORP HOTELS</span>
              </a>
              <a href="#" className="bahi-brand-logo">
                <span className="bahi-brand-text">EWA HOTELS</span>
              </a>
              <a href="#" className="bahi-brand-logo">
                <span className="bahi-brand-text">ECOS HOTELS</span>
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

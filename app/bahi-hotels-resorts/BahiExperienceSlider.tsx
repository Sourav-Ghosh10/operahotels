'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';


const offers = [
  {
    key: 'book-early',
    img: 'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=800&auto=format&fit=crop',
    imgAlt: 'Book Early And Save More',
    bottomOverlay: { line1: 'BOOK EARLY', line2: 'AND SAVE MORE' },
    badge: null,
    promoOverlay: null,
    title: 'BOOK EARLY AND SAVE MORE',
    showReadMore: true,
    showBookBtn: true,
  },
  {
    key: 'member-rates',
    img: 'https://images.unsplash.com/photo-1484910292437-025e5d13ce87?q=80&w=800&auto=format&fit=crop',
    imgAlt: 'Exclusive Member Rates',
    bottomOverlay: null,
    badge: 'AVAILABLE ON 6 HOTELS',
    promoOverlay: 'REGISTER NOW AND GET UP TO 25%\nOFF ON YOUR BOOKINGS',
    title: 'EXCLUSIVE MEMBER RATES',
    showReadMore: true,
    readMoreLink: '/bahi-hotels-resorts/offers/exclusive-member-rates-offers',
    showBookBtn: true,
  },
  {
    key: 'monthly-stay',
    img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    imgAlt: 'Monthly Stay Offer',
    bottomOverlay: null,
    badge: null,
    promoOverlay: null,
    title: 'MONTHLY STAY OFFER',
    showReadMore: true,
    showBookBtn: true,
  },
];

const N = offers.length;

export default function BahiExperienceSlider() {
  // `center` is the index of the currently featured (middle) card
  const [center, setCenter] = useState(1); // member-rates is featured by default
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => setCenter((c) => (c + 1) % N), []);
  const goPrev = useCallback(() => setCenter((c) => (c - 1 + N) % N), []);
  const togglePause = () => setPaused((p) => !p);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, goNext]);

  // Compute which offer goes in each position: [left, center, right]
  const leftIdx = (center - 1 + N) % N;
  const rightIdx = (center + 1) % N;
  const positions = [leftIdx, center, rightIdx];

  return (
    <>
      <div className="bahi-cards-grid">
        {positions.map((offerIdx, pos) => {
          const offer = offers[offerIdx];
          const isFeatured = pos === 1;
          return (
            <div
              key={offer.key}
              className={`bahi-card${isFeatured ? ' bahi-card--featured' : ''}`}
            >
              {/* ── Image wrapper ── */}
              <div className="bahi-card-img-wrap">
                <img src={offer.img} alt={offer.imgAlt} />

                {/* Bottom gradient text overlay (e.g. Book Early) */}
                {offer.bottomOverlay && (
                  <div className="bahi-card-bottom-overlay">
                    <span className="bahi-card-overlay-title">
                      {offer.bottomOverlay.line1}
                      <br />
                      {offer.bottomOverlay.line2}
                    </span>
                  </div>
                )}

                {/* Badge top-right (e.g. "AVAILABLE ON 6 HOTELS") */}
                {offer.badge && (
                  <span className="bahi-card-badge">{offer.badge}</span>
                )}

                {/* Promo overlay (full dark + centred text) */}
                {offer.promoOverlay && (
                  <div className="bahi-card-promo-overlay">
                    <p className="bahi-card-promo-text">
                      {offer.promoOverlay.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < offer.promoOverlay!.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>

              {/* ── Card body ── */}
              <div className="bahi-card-body">
                <h3 className="bahi-card-title">{offer.title}</h3>
                {offer.showReadMore && (
                  <Link href={offer.readMoreLink || "#"} className="bahi-read-more-link">READ MORE</Link>
                )}
                {offer.showBookBtn && (
                  <a href="#" className="bahi-book-now-btn">BOOK NOW</a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Slider nav ── */}
      <div className="bahi-slider-nav">
        <button className="bahi-slider-arrow" onClick={goPrev} aria-label="Previous offer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="bahi-slider-pause-btn"
          onClick={togglePause}
          aria-label={paused ? 'Resume' : 'Pause'}
          title={paused ? 'Resume' : 'Pause'}
        >
          {paused ? (
            /* Play icon */
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            /* Pause icon */
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </button>

        <button className="bahi-slider-arrow" onClick={goNext} aria-label="Next offer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="bahi-gold-rule" />
    </>
  );
}

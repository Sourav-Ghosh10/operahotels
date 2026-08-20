import React from 'react';
import Header from '@/components/ServerHeader';
import Link from 'next/link';

export const metadata = {
  title: 'Exclusive Member Rates | Bahi Hotels & Resorts | Opera Hotels',
  description: 'Members can save up to 25% off when booking at any of the participating Bahi Hotels.',
};

export default function ExclusiveMemberRatesPage() {
  return (
    <>
      <link rel="stylesheet" href="/css/bahi-offer-details.css" />
      <main>
        {/* Wrap the header in a dark background so the white text/logo is visible */}
        <div style={{ background: 'var(--dark-blue)' }}>
          <Header />
        </div>

        {/* 2. BREADCRUMBS */}
        <div className="offer-breadcrumbs">
          <Link href="/">HOME</Link>
          <span>/</span>
          <Link href="/bahi-hotels-resorts">BAHI HOTELS &amp; RESORTS</Link>
          <span>/</span>
          <Link href="/bahi-hotels-resorts/offers">OFFERS</Link>
          <span>/</span>
          <span>EXCLUSIVE MEMBER RATES</span>
        </div>

        {/* 3. MAIN CONTENT SECTION */}
        <section className="offer-content-section">
          <div className="offer-content-inner">
            <h2 className="offer-title">EXCLUSIVE MEMBER RATES</h2>
            <p className="offer-subtitle">AVAILABLE ON 6 HOTELS</p>

            <p className="offer-description">
              Members can save up to 25% off when booking at any of the following hotels. Experience travel the way it should be; personal and rewarding. Enjoy low member-exclusive rates and free wifi. Simply register or log in to your account when making your reservation to unlock a world of privileges.
            </p>

            <h3 className="offer-benefits-title">Members Benefits</h3>
            <ul className="offer-benefits-list">
              <li>Early Check-In &amp; Late Check-Out (Subject to availability)</li>
              <li>Complimentary Room Upgrade to the next category (Subject to availability)</li>
              <li>25% Discount at all Food &amp; Beverage Outlets</li>
              <li>25% Discount on Spa Services (At select hotels, where applicable)</li>
              <li>25% Discount on Beach &amp; Pool Day Pass (For &ldquo;Member Rate&rdquo; guests without room booking; at select hotels only)</li>
              <li>Kids Eat Free &ndash; up to two kids aged 11 and under (when booked with Members Rate including Breakfast)</li>
              <li>Access to Wellness Facilities (At select hotels, where applicable)</li>
            </ul>

            <p className="offer-terms">*Terms and Conditions Apply</p>

            <p className="offer-cta-text">
              Don&apos;t miss out on this incredible opportunity to enhance your stay. Book direct today and experience the difference.
            </p>

            {/* 4. PAGINATION */}
            <div className="offer-pagination">
              <Link href="/bahi-hotels-resorts/offers/book-early-save-more">&lt; PREV OFFER</Link>
              <Link href="/bahi-hotels-resorts/offers">VIEW ALL OFFERS</Link>
              <Link href="/bahi-hotels-resorts/offers/monthly-stay-offer-1">NEXT OFFER &gt;</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

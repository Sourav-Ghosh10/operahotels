"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';

interface EventCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    hotel: string;
    type: string;
    slug?: string;
}

const DEFAULT_HERO_IMAGES = [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop'
];

const DEFAULT_EVENT_CARDS: EventCard[] = [
    {
        id: '1',
        title: 'CORPORATE MEETINGS',
        subtitle: 'Bahi Ajman Palace Hotel',
        description: 'Spanning 1,200 m², accommodating up to 1,000 guests for cocktails, banquets, or theatre-style conventions. Features customizable stage lighting and high-speed Wi-Fi.',
        image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200&auto=format&fit=crop',
        hotel: 'Bahi Ajman Palace Hotel',
        type: 'Corporate Meetings',
        slug: 'corporate-meetings'
    },
    {
        id: '2',
        title: 'EVENTS',
        subtitle: 'Bahi Ajman Palace Hotel',
        description: 'A versatile 340 m² function hall, ideal for corporate conferences, product launches, and mid-sized banquets. Configurable into theatre, classroom, or banquet layouts.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
        hotel: 'Bahi Ajman Palace Hotel',
        type: 'Events',
        slug: 'events'
    },
    {
        id: '3',
        title: 'WEDDINGS',
        subtitle: 'Bahi Ajman Palace Hotel',
        description: 'An elegant and private space designed for executive board meetings, private consultations, and high-profile delegate hosting with plush seating.',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
        hotel: 'Bahi Ajman Palace Hotel',
        type: 'Weddings',
        slug: 'one-of-the-best-wedding-venues-in-ajman'
    },
    {
        id: '4',
        title: 'OUTDOOR VENUES',
        subtitle: 'Bahi Ajman Palace Hotel',
        description: 'Spectacular open-air venues featuring panoramic Arabian Gulf sea views. Perfect for sunset cocktail receptions, gala dinners, and beachfront weddings.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
        hotel: 'Bahi Ajman Palace Hotel',
        type: 'Outdoor Venues'
    }
];

export default function MeetingsEventsClient({
    brandName = "BAHI HOTELS & RESORTS",
    logo,
    footerLogo,
    heroImages = DEFAULT_HERO_IMAGES,
    cards,
    mainTitle,
    mainSubtitle,
    mainDescription,
    rfpUrl,
    hotelSlug = "bahi-hotels-resorts"
}: {
    brandName?: string;
    logo?: string;
    footerLogo?: string;
    heroImages?: string[];
    cards?: EventCard[];
    mainTitle?: string;
    mainSubtitle?: string;
    mainDescription?: string;
    rfpUrl?: string;
    hotelSlug?: string;
}) {
    const activeHeroImages = heroImages && heroImages.length > 0 ? heroImages : DEFAULT_HERO_IMAGES;
    const activeCards = cards ?? [];

    // Hero Slide state
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide(c => (c + 1) % activeHeroImages.length);
    }, [activeHeroImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide(c => (c - 1 + activeHeroImages.length) % activeHeroImages.length);
    }, [activeHeroImages.length]);

    useEffect(() => {
        if (activeHeroImages.length <= 1) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [activeHeroImages.length, nextSlide]);

    // Filter states
    const [selectedHotel, setSelectedHotel] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [activeHotel, setActiveHotel] = useState('all');
    const [activeType, setActiveType] = useState('all');
    const [showRfpModal, setShowRfpModal] = useState(false);
    const [rfpSuccess, setRfpSuccess] = useState(false);

    const hotelOptions = Array.from(new Set(activeCards.map(c => c.hotel).filter(Boolean)));
    const typeOptions = Array.from(new Set(activeCards.map(c => c.type).filter(Boolean)));

    const handleSearch = () => {
        setActiveHotel(selectedHotel);
        setActiveType(selectedType);
    };

    const handleClearFilter = () => {
        setSelectedHotel('all');
        setSelectedType('all');
        setActiveHotel('all');
        setActiveType('all');
    };

    const filteredCards = activeCards.filter((card) => {
        const matchesHotel = activeHotel === 'all' || card.hotel.toLowerCase() === activeHotel.toLowerCase();
        const matchesType = activeType === 'all' || card.type.toLowerCase() === activeType.toLowerCase();
        return matchesHotel && matchesType;
    });

    return (
        <main className="meetings-events-page" style={{ backgroundColor: '#ffffff', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            <style jsx global>{`
                .me-card-item:hover .me-card-img {
                    transform: scale(1.06);
                }
                .me-card-link:hover {
                    color: #b89855 !important;
                }
            `}</style>
            
            {/* ══════════════════════════════════════════
                1. TOP HERO SLIDE BANNER
            ══════════════════════════════════════════ */}
            <section className="position-relative overflow-hidden" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Background Slides */}
                {activeHeroImages.map((img, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%), url('${img}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: idx === currentSlide ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                            zIndex: 1
                        }}
                    />
                ))}

                {/* Header Navbar */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                    <HotelHeader logoUrl={logo} hotelSlug={hotelSlug} />
                </div>

                {/* Hero Slide Arrows */}
                {activeHeroImages.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            style={{
                                position: 'absolute',
                                left: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: '#ffffff',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200, 157, 82, 0.9)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            style={{
                                position: 'absolute',
                                right: '20px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: '#ffffff',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200, 157, 82, 0.9)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </>
                )}

                {/* Hero Center Overlay Content */}
                <div className="container text-center text-white py-5 my-auto position-relative" style={{ zIndex: 5 }}>
                    <p style={{ letterSpacing: '4px', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', color: '#e2be7d', marginBottom: '12px' }}>
                        {brandName}
                    </p>
                    <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                        MEETINGS &amp; EVENTS
                    </h1>
                    <div style={{ width: '70px', height: '3px', backgroundColor: '#e2be7d', margin: '20px auto 0' }} />
                </div>
            </section>

            {/* ══════════════════════════════════════════
                2. INTRO SECTION (Matching Reference Image)
            ══════════════════════════════════════════ */}
            <section className="py-5 text-center" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #f0f0f0' }}>
                <div className="container py-3" style={{ maxWidth: '950px' }}>
                    <p style={{ letterSpacing: '3px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#666', marginBottom: '16px' }}>
                        {mainSubtitle || "MEETINGS & EVENTS"}
                    </p>

                    <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.3', marginBottom: '28px' }}>
                        {mainTitle ? (
                            <span dangerouslySetInnerHTML={{ __html: mainTitle }} />
                        ) : activeCards.length > 0 ? (
                            <>HOST SUCCESSFUL MEETINGS AND EVENTS<br />AT OUR BUSINESS HOTEL</>
                        ) : (
                            <>MEETINGS &amp; EVENTS AT<br />{brandName.toUpperCase()}</>
                        )}
                    </h2>

                    <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#555', maxWidth: '850px', margin: '0 auto 35px' }}>
                        {mainDescription ? (
                            <div dangerouslySetInnerHTML={{ __html: mainDescription }} />
                        ) : activeCards.length > 0 ? (
                            <>
                                <p className="mb-3">
                                    We would welcome the opportunity to make your next event the success you deserve.
                                </p>
                                <p className="mb-3">
                                    From private meeting spaces to dining venues on the shores of stunning seas, our modern, high-tech conference and event facilities are complemented by exceptional culinary and technical services.
                                </p>
                                <p className="mb-0">
                                    Our dedicated account manager will work closely with you every step of the way to ensure every detail goes smoothly, helping to create a truly memorable event.
                                </p>
                            </>
                        ) : (
                            <p className="mb-0">
                                There are currently no meetings or event spaces available for {brandName} at the moment.
                            </p>
                        )}
                    </div>

                    {/* Request For Proposal Button (Border Style) */}
                    <div>
                        <button
                            onClick={() => {
                                if (rfpUrl) {
                                    window.open(rfpUrl, '_blank');
                                } else {
                                    setShowRfpModal(true);
                                }
                            }}
                            className="btn py-3 px-4 fw-bold"
                            style={{
                                border: '2px solid #b89855',
                                color: '#b89855',
                                backgroundColor: 'transparent',
                                letterSpacing: '2px',
                                fontSize: '0.85rem',
                                borderRadius: '0px',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#b89855';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#b89855';
                            }}
                        >
                            REQUEST FOR PROPOSAL
                        </button>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                3. FILTER BAR SECTION (Matching Reference Image)
            ══════════════════════════════════════════ */}
            <section className="py-4" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eaeaea' }}>
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                        {/* Left Controls: Hotel Select + Event Type Select + Search */}
                        <div className="d-flex flex-wrap align-items-center gap-3">
                            {/* All Hotels Select */}
                            <select
                                value={selectedHotel}
                                onChange={(e) => setSelectedHotel(e.target.value)}
                                className="form-select border-0 rounded-0"
                                style={{
                                    backgroundColor: '#f5f4f2',
                                    padding: '12px 20px',
                                    fontSize: '0.9rem',
                                    minWidth: '200px',
                                    color: '#333'
                                }}
                            >
                                <option value="all">All Hotels</option>
                                {hotelOptions.map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>

                            {/* All Type of Events Select */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="form-select border-0 rounded-0"
                                style={{
                                    backgroundColor: '#f5f4f2',
                                    padding: '12px 20px',
                                    fontSize: '0.9rem',
                                    minWidth: '220px',
                                    color: '#333'
                                }}
                            >
                                <option value="all">All type of events</option>
                                {typeOptions.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>

                            {/* SEARCH Button */}
                            <button
                                onClick={handleSearch}
                                className="btn border-0 rounded-0 px-4 py-2 text-white fw-bold"
                                style={{
                                    backgroundColor: '#b89855',
                                    letterSpacing: '2px',
                                    fontSize: '0.85rem',
                                    height: '46px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                SEARCH
                            </button>
                        </div>

                        {/* Right Control: Clear Filter */}
                        <div>
                            <button
                                onClick={handleClearFilter}
                                className="btn bg-white rounded-0 px-4 py-2 text-uppercase fw-bold"
                                style={{
                                    border: '1px solid #333',
                                    color: '#333',
                                    fontSize: '0.8rem',
                                    letterSpacing: '1.5px',
                                    height: '46px'
                                }}
                            >
                                X CLEAR FILTER
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                4. EVENT SPACES GRID (Matching Reference Card Styles)
            ══════════════════════════════════════════ */}
            <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
                <div className="container py-3">
                    {filteredCards.length === 0 ? (
                        <div className="text-center py-5">
                            <p style={{ fontSize: '1.2rem', color: '#666' }}>No event spaces found matching your search criteria.</p>
                            <button onClick={handleClearFilter} className="btn text-white mt-2 px-4 py-2 fw-bold" style={{ backgroundColor: '#b89855', borderRadius: 0 }}>
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredCards.map((card) => (
                                <div key={card.id} className="col-12 col-md-6">
                                    <div 
                                        className="me-card-item overflow-hidden position-relative" 
                                        style={{ 
                                            borderRadius: '0px', 
                                            backgroundColor: '#ffffff',
                                            border: 'none'
                                        }}
                                    >
                                        {/* Image Wrap with Badge & Zoom Transition */}
                                        <Link href={card.slug ? `/${hotelSlug}/meetings-events/${card.slug}` : `/${hotelSlug}/meetings-events`} className="d-block me-card-img-wrap position-relative overflow-hidden" style={{ height: '330px' }}>
                                            {/* Top-Right Black Hotel Badge */}
                                            <div 
                                                className="position-absolute px-3 py-2 text-white fw-bold text-uppercase"
                                                style={{ 
                                                    top: 0, 
                                                    right: 0, 
                                                    backgroundColor: '#111111', 
                                                    fontSize: '0.72rem', 
                                                    letterSpacing: '1.2px',
                                                    zIndex: 5
                                                }}
                                            >
                                                {card.hotel.toUpperCase()}
                                            </div>

                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className="me-card-img w-100 h-100"
                                                style={{ 
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease-in-out'
                                                }}
                                            />
                                        </Link>

                                        {/* Flat Off-White Bottom Bar (Title on Left, READ MORE on Right) */}
                                        <div 
                                            className="px-4 py-4 d-flex align-items-center justify-content-between gap-3" 
                                            style={{ backgroundColor: '#f5f4f2', minHeight: '85px' }}
                                        >
                                            <h3 
                                                className="m-0 text-uppercase flex-grow-1"
                                                style={{ 
                                                    fontFamily: 'Georgia, serif', 
                                                    fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)', 
                                                    fontWeight: 400, 
                                                    color: '#1a1a1a',
                                                    letterSpacing: '0.8px',
                                                    lineHeight: '1.3'
                                                }}
                                            >
                                                <Link href={card.slug ? `/${hotelSlug}/meetings-events/${card.slug}` : `/${hotelSlug}/meetings-events`} className="text-decoration-none text-dark">
                                                    {card.title}
                                                </Link>
                                            </h3>

                                            <Link
                                                href={card.slug ? `/${hotelSlug}/meetings-events/${card.slug}` : `/${hotelSlug}/meetings-events`}
                                                className="me-card-link text-uppercase fw-bold flex-shrink-0 text-nowrap"
                                                style={{ 
                                                    fontSize: '0.75rem', 
                                                    letterSpacing: '1.5px', 
                                                    color: '#1a1a1a',
                                                    textDecoration: 'underline',
                                                    transition: 'color 0.3s ease',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                READ MORE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════════════════════════════════════
                5. REQUEST FOR PROPOSAL MODAL
            ══════════════════════════════════════════ */}
            {showRfpModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 rounded-0" style={{ backgroundColor: '#ffffff' }}>
                            <div className="modal-header border-0 pb-0 pt-4 px-4 position-relative">
                                <h4 className="modal-title fw-bold text-uppercase" style={{ letterSpacing: '1px', fontSize: '1.3rem' }}>
                                    Request for Proposal
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => { setShowRfpModal(false); setRfpSuccess(false); }}
                                    aria-label="Close"
                                />
                            </div>

                            <div className="modal-body p-4">
                                {rfpSuccess ? (
                                    <div className="alert alert-success text-center py-4 rounded-0">
                                        <h5 className="fw-bold mb-2">Thank You!</h5>
                                        <p className="mb-0">Your proposal request has been received. Our event specialist will reach out to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={(e) => { e.preventDefault(); setRfpSuccess(true); }}>
                                        <p className="text-muted small mb-4">Fill out the details below to request a tailored event proposal from our team.</p>
                                        <div className="row g-3">
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-bold text-uppercase">Full Name *</label>
                                                <input type="text" className="form-control rounded-0" placeholder="Your Name" required />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-bold text-uppercase">Email Address *</label>
                                                <input type="email" className="form-control rounded-0" placeholder="name@company.com" required />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-bold text-uppercase">Phone Number *</label>
                                                <input type="tel" className="form-control rounded-0" placeholder="+971 50 000 0000" required />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-bold text-uppercase">Event Type *</label>
                                                <select className="form-select rounded-0" required>
                                                    <option value="">Select Event Type</option>
                                                    <option value="corporate">Corporate Meeting</option>
                                                    <option value="wedding">Wedding / Reception</option>
                                                    <option value="banquet">Banquet / Dinner</option>
                                                    <option value="outdoor">Outdoor Celebration</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold text-uppercase">Event Details &amp; Requirements</label>
                                                <textarea className="form-control rounded-0" rows={4} placeholder="Expected guest count, target date, room setup requirements..." required />
                                            </div>
                                            <div className="col-12 pt-2">
                                                <button
                                                    type="submit"
                                                    className="btn text-white w-100 py-3 rounded-0 fw-bold text-uppercase"
                                                    style={{ backgroundColor: '#b89855', letterSpacing: '2px', fontSize: '0.85rem' }}
                                                >
                                                    Submit Proposal Request
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footers */}
            <OurBrandsBar />
            <HotelFooter logoUrl={footerLogo || logo} />
        </main>
    );
}

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getAllMeetingsEvents, getAllHotels, resolveImageUrl } from '@/services/api';

interface MeetingEventItem {
    id: number | string;
    property_id?: number;
    hotel_name?: string;
    hotel_slug?: string;
    type?: string;
    slug?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    details_content?: string;
    capacity_details?: string;
    area_sqft?: string | number;
    area_sqm?: string | number;
    ceiling_height?: string | number;
    banner_slides?: any[];
    event_cards?: any[];
    gallery?: string[];
    image?: string;
    brand_name?: string;
    brand_slug?: string;
    rfp_url?: string;
    contact_details?: {
        phone?: string;
        email?: string;
    };
    seo?: {
        meta_title?: string;
        meta_description?: string;
    };
}

const defaultBanners = [
    {
        image: '/uploads/bahi_meeting_slide_1.jpg',
        title: 'Luxury Meeting Venues & Ballrooms',
        subtitle: 'Hospitality Management Holding'
    },
    {
        image: '/uploads/coral_sharjah_meeting_slide_1.jpg',
        title: 'State-of-the-Art Conference Facilities',
        subtitle: 'Hospitality Management Holding'
    },
    {
        image: '/uploads/coral_deira_meeting_slide_1.jpg',
        title: 'Bespoke Weddings & Grand Galas',
        subtitle: 'Hospitality Management Holding'
    },
    {
        image: '/uploads/bahi_meeting_slide_3.jpg',
        title: 'Corporate Events & Banqueting',
        subtitle: 'Hospitality Management Holding'
    }
];

function formatTypeLabel(type?: string): string {
    if (!type) return 'Events';
    if (type === 'main_page') return 'Overview';
    if (type === 'corporate') return 'Corporate Meetings';
    if (type === 'weddings') return 'Weddings';
    if (type === 'events') return 'Events & Banquets';
    if (type === 'outside_catering') return 'Outside Catering';
    if (type === 'conference_room') return 'Conference Rooms';
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function stripHtml(html?: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
}

function getEventDetailUrl(item: MeetingEventItem): string {
    if (item.brand_slug === 'bahi-hotels-resorts') {
        return `/bahi-hotels-resorts/meetings-events/${item.slug || ''}`;
    }
    const slugPrefix = item.hotel_slug || item.brand_slug || 'meetings-events';
    return `/${slugPrefix}/meetings-events/${item.slug || ''}`;
}

export default function MeetingsEventsPage() {
    const [eventsList, setEventsList] = useState<MeetingEventItem[]>([]);
    const [hotelsList, setHotelsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [selectedBrand, setSelectedBrand] = useState<string>('all');
    const [selectedHotel, setSelectedHotel] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Hero Slider
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Modals

    const [showRfpModal, setShowRfpModal] = useState(false);
    const [rfpPreselectedHotel, setRfpPreselectedHotel] = useState<string>('');
    const [rfpPreselectedType, setRfpPreselectedType] = useState<string>('');
    const [rfpSubmitted, setRfpSubmitted] = useState(false);
    const [rfpFormData, setRfpFormData] = useState({
        name: '',
        email: '',
        phone: '',
        hotel: '',
        eventType: '',
        date: '',
        guests: '',
        notes: '',
    });

    // Fetch dynamic data
    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            setLoading(true);
            try {
                const [eventsData, hotelsData] = await Promise.all([
                    getAllMeetingsEvents(),
                    getAllHotels()
                ]);

                if (isMounted) {
                    if (Array.isArray(eventsData) && eventsData.length > 0) {
                        setEventsList(eventsData);
                    }
                    if (Array.isArray(hotelsData) && hotelsData.length > 0) {
                        setHotelsList(hotelsData);
                    }
                }
            } catch (err) {
                console.error("Failed to load meetings & events data:", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        load();
        return () => { isMounted = false; };
    }, []);

    // Unique Hotels & Types list for filters
    const availableHotels = useMemo(() => {
        const hotelMap = new Map<string, string>();
        eventsList.forEach(item => {
            if (item.hotel_name) {
                hotelMap.set(item.hotel_name, item.hotel_name);
            }
        });
        if (hotelsList.length > 0) {
            hotelsList.forEach(h => {
                const name = typeof h.name === 'object' ? h.name.en : h.name;
                if (name) hotelMap.set(name, name);
            });
        }
        return Array.from(hotelMap.keys());
    }, [eventsList, hotelsList]);

    const availableBrands = useMemo(() => {
        const brandMap = new Map<string, { name: string; slug?: string }>();
        eventsList.forEach(item => {
            if (item.brand_name) {
                brandMap.set(item.brand_name, { name: item.brand_name, slug: item.brand_slug });
            }
        });
        return Array.from(brandMap.values());
    }, [eventsList]);

    const availableTypes = useMemo(() => {
        const typeSet = new Set<string>();
        eventsList.forEach(item => {
            if (item.type) typeSet.add(item.type);
        });
        return Array.from(typeSet);
    }, [eventsList]);

    // Banner slides from data or default
    const heroSlides = useMemo(() => {
        const slides: any[] = [];
        eventsList.forEach(item => {
            if (Array.isArray(item.banner_slides) && item.banner_slides.length > 0) {
                item.banner_slides.forEach(s => {
                    if (s && (s.image || s.background_image)) {
                        slides.push({
                            image: s.image || s.background_image,
                            title: s.title || s.banner_title || item.title || 'Luxury Meeting Venues',
                            subtitle: item.hotel_name || 'Hospitality Management Holding'
                        });
                    }
                });
            }
        });
        return slides.length > 0 ? slides : defaultBanners;
    }, [eventsList]);

    // Autoplay hero slider
    useEffect(() => {
        if (!isPlaying || heroSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % heroSlides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isPlaying, heroSlides.length]);

    const prevSlide = () => {
        setActiveSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveSlide(prev => (prev + 1) % heroSlides.length);
    };

    // Filter logic
    const filteredEvents = useMemo(() => {
        return eventsList.filter(item => {
            // Brand Filter
            if (selectedBrand !== 'all' && item.brand_name !== selectedBrand) {
                return false;
            }

            // Hotel Filter
            if (selectedHotel !== 'all' && item.hotel_name !== selectedHotel) {
                return false;
            }

            // Event Type Filter
            if (selectedType !== 'all' && item.type !== selectedType) {
                return false;
            }

            // Search Query
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                const titleMatch = (item.title || '').toLowerCase().includes(q);
                const subtitleMatch = (item.subtitle || '').toLowerCase().includes(q);
                const hotelMatch = (item.hotel_name || '').toLowerCase().includes(q);
                const descMatch = (item.description || '').toLowerCase().includes(q);
                const typeMatch = formatTypeLabel(item.type).toLowerCase().includes(q);

                if (!titleMatch && !subtitleMatch && !hotelMatch && !descMatch && !typeMatch) {
                    return false;
                }
            }

            return true;
        });
    }, [eventsList, selectedBrand, selectedHotel, selectedType, searchQuery]);

    const handleOpenRfp = (hotelName?: string, eventType?: string) => {
        setRfpPreselectedHotel(hotelName || '');
        setRfpPreselectedType(eventType || '');
        setRfpFormData({
            name: '',
            email: '',
            phone: '',
            hotel: hotelName || '',
            eventType: eventType || '',
            date: '',
            guests: '',
            notes: '',
        });
        setRfpSubmitted(false);
        setShowRfpModal(true);
    };

    const handleRfpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setRfpSubmitted(true);
        setTimeout(() => {
            setShowRfpModal(false);
            setRfpSubmitted(false);
        }, 3500);
    };

    const clearFilters = () => {
        setSelectedBrand('all');
        setSelectedHotel('all');
        setSelectedType('all');
        setSearchQuery('');
    };

    // Group filtered events by brand
    const groupedByBrand = useMemo(() => {
        const groups: { [brandName: string]: { brandName: string; brandSlug?: string; items: MeetingEventItem[] } } = {};
        filteredEvents.forEach(item => {
            const bName = item.brand_name || 'HMH Hotel Group';
            if (!groups[bName]) {
                groups[bName] = { brandName: bName, brandSlug: item.brand_slug, items: [] };
            }
            groups[bName].items.push(item);
        });
        return Object.values(groups);
    }, [filteredEvents]);

    return (
        <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", position: "relative" }}>
            <link rel="stylesheet" href="/css/meetings.css" />

            {/* ═══════════════════════════════════════════════════════════════
                1. HERO BANNER SLIDER WITH OVERLAID HEADER
            ═══════════════════════════════════════════════════════════════ */}
            <header className="me-hero-section" aria-label="Meetings and Events Banner">
                {heroSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`me-hero-slide ${idx === activeSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url('${slide.image ? resolveImageUrl(slide.image) : '/uploads/bahi_meeting_slide_1.jpg'}')` }}
                    />
                ))}

                {/* Dark Gradient Overlay */}
                <div className="me-hero-overlay" />

                {/* Overlaid Transparent Navigation Header */}
                <Header />

                {/* Hero Title & Subtitle */}
                <div className="me-hero-content">
                    <div className="me-hero-subtitle">
                        {heroSlides[activeSlide]?.subtitle || 'Hospitality Management Holding'}
                    </div>
                    <h1 className="me-hero-title">
                        {heroSlides[activeSlide]?.title || 'MEETINGS & EVENTS'}
                    </h1>
                </div>

                {/* Slider Navigation Arrows */}
                {heroSlides.length > 1 && (
                    <>
                        <button
                            type="button"
                            className="me-slider-ctrl me-slider-prev"
                            onClick={prevSlide}
                            aria-label="Previous Banner Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="me-slider-ctrl me-slider-next"
                            onClick={nextSlide}
                            aria-label="Next Banner Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </>
                )}
            </header>

            {/* ═══════════════════════════════════════════════════════════════
                2. INTRO SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="me-intro-section" id="intro">
                <div className="me-intro-container">
                    <div className="me-section-subtitle">Hospitality Management Holding</div>
                    <h2 className="me-section-title">Host Memorable Meetings &amp; Events</h2>
                    <div className="me-title-accent" />
                    <p className="me-intro-p">
                        From executive boardroom discussions and dynamic corporate summits to romantic beachfront weddings and grand galas, HMH offers versatile conference and event venues across the Middle East &amp; North Africa. Discover our collection of well-appointed spaces tailored to your vision.
                    </p>
                    <button
                        type="button"
                        className="me-rfp-cta-btn"
                        onClick={() => handleOpenRfp()}
                    >
                        <span>Request a Proposal</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                3. FILTERS BAR (HOTELS, EVENT TYPES, SEARCH)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="me-filter-section" id="venues">
                <div className="me-filter-container">
                    <div className="me-filter-bar">
                        <div className="me-filter-inputs">
                            {/* Brand Selector */}
                            <select
                                className="me-select"
                                value={selectedBrand}
                                onChange={(e) => { setSelectedBrand(e.target.value); setSelectedHotel('all'); }}
                                aria-label="Filter by Brand"
                            >
                                <option value="all">All Brands</option>
                                {availableBrands.map((brand, i) => (
                                    <option key={i} value={brand.name}>{brand.name}</option>
                                ))}
                            </select>

                            {/* Hotel Selector */}
                            <select
                                className="me-select"
                                value={selectedHotel}
                                onChange={(e) => setSelectedHotel(e.target.value)}
                                aria-label="Filter by Hotel"
                            >
                                <option value="all">All Hotels &amp; Resorts</option>
                                {availableHotels.map((hotelName, i) => (
                                    <option key={i} value={hotelName}>{hotelName}</option>
                                ))}
                            </select>

                            {/* Event Type Selector */}
                            <select
                                className="me-select"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                aria-label="Filter by Event Type"
                            >
                                <option value="all">All Event Types</option>
                                {availableTypes.map((t, i) => (
                                    <option key={i} value={t}>{formatTypeLabel(t)}</option>
                                ))}
                            </select>

                            {/* Search Input */}
                            <input
                                type="text"
                                className="me-search-input"
                                placeholder="Search by venue, keyword, capacity..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {/* Reset Button */}
                            {(selectedHotel !== 'all' || selectedType !== 'all' || searchQuery !== '') && (
                                <button
                                    type="button"
                                    className="me-clear-btn"
                                    onClick={clearFilters}
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className="me-results-count">
                            Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'venue' : 'venues'}
                        </div>
                    </div>

                    {/* Quick Filter Tabs */}
                    <div className="me-quick-tabs">
                        <button
                            type="button"
                            className={`me-tab-pill ${selectedType === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedType('all')}
                        >
                            All Categories
                        </button>
                        {availableTypes.map((t, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`me-tab-pill ${selectedType === t ? 'active' : ''}`}
                                onClick={() => setSelectedType(t)}
                            >
                                {formatTypeLabel(t)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                4. VENUES & EVENT SPACES GRID — GROUPED BY BRAND
            ═══════════════════════════════════════════════════════════════ */}
            <section className="me-grid-section">
                <div className="me-grid-container">
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888888" }}>
                            <div className="spinner-border text-warning mb-3" role="status" />
                            <p>Loading Meetings &amp; Event Spaces...</p>
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="me-brands-wrapper">
                            {groupedByBrand.map((group) => (
                                <div
                                    className="me-brand-group"
                                    key={group.brandName}
                                    id={`brand-${group.brandSlug || group.brandName.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                    {/* Brand Header */}
                                    <div className="me-brand-header">
                                        <div className="me-brand-title-wrap">
                                            <div className="me-brand-icon-line" />
                                            <h2 className="me-brand-name">{group.brandName}</h2>
                                            <span className="me-brand-badge">
                                                {group.items.length} {group.items.length === 1 ? 'Venue' : 'Venues'}
                                            </span>
                                        </div>
                                        {group.brandSlug && (
                                            <Link href={`/${group.brandSlug}`} className="me-brand-explore-link">
                                                Explore Brand
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Cards Grid for this brand */}
                                    <div className="me-grid">
                                        {group.items.map((item) => {
                                            const coverImg = item.image
                                                ? resolveImageUrl(item.image)
                                                : (item.gallery && item.gallery[0]
                                                    ? resolveImageUrl(item.gallery[0])
                                                    : (item.banner_slides && item.banner_slides[0]?.image
                                                        ? resolveImageUrl(item.banner_slides[0].image)
                                                        : '/uploads/bahi_meeting_slide_1.jpg'));

                                            const rawDesc = item.description || item.details_content || '';
                                            const plainDesc = stripHtml(rawDesc);

                                            return (
                                                <div className="me-card" key={item.id}>
                                                    {/* Card Image Wrap */}
                                                    <div className="me-card-image-wrap">
                                                        <img
                                                            src={coverImg}
                                                            alt={item.title || 'Meeting Venue'}
                                                            className="me-card-image"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.currentTarget.src = '/uploads/bahi_meeting_slide_1.jpg';
                                                            }}
                                                        />
                                                        {item.hotel_name && (
                                                            <div className="me-card-hotel-badge">
                                                                {item.hotel_name}
                                                            </div>
                                                        )}
                                                        <div className="me-card-type-badge">
                                                            {formatTypeLabel(item.type)}
                                                        </div>
                                                    </div>

                                                    {/* Card Content Body */}
                                                    <div className="me-card-body">
                                                        <div>
                                                            <Link href={getEventDetailUrl(item)} style={{ textDecoration: 'none', color: 'inherit' }}><h3 className="me-card-title">{item.title}</h3></Link>
                                                            {item.subtitle && (
                                                                <div className="me-card-subtitle">{item.subtitle}</div>
                                                            )}
                                                            <p className="me-card-desc">
                                                                {plainDesc || 'Experience exceptional meeting and conference facilities designed to inspire success and foster collaboration.'}
                                                            </p>
                                                        </div>

                                                        {/* Card Footer Actions */}
                                                        <div className="me-card-footer">
                                                            <Link
                                                                href={getEventDetailUrl(item)}
                                                                className="me-card-btn-link"
                                                            >
                                                                View Details &rarr;
                                                            </Link>
                                                            <button
                                                                type="button"
                                                                className="me-card-rfp-btn"
                                                                onClick={() => handleOpenRfp(item.hotel_name, formatTypeLabel(item.type))}
                                                            >
                                                                Plan Event
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="me-empty-state">
                            <h3 className="me-empty-title">No Venues Found</h3>
                            <p>No meeting or event venues matched your selected filters.</p>
                            <button
                                type="button"
                                className="me-rfp-cta-btn mt-3"
                                onClick={clearFilters}
                            >
                                Show All Venues
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                6. REQUEST FOR PROPOSAL (RFP) MODAL
            ═══════════════════════════════════════════════════════════════ */}
            {showRfpModal && (
                <div className="me-modal-backdrop" onClick={() => setShowRfpModal(false)}>
                    <div className="me-modal-box" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="me-modal-close-btn"
                            onClick={() => setShowRfpModal(false)}
                            aria-label="Close Proposal Modal"
                        >
                            &times;
                        </button>

                        <div className="me-modal-header">
                            <div className="me-modal-subtitle">Hospitality Management Holding</div>
                            <h3 className="me-modal-title">Request for Proposal</h3>
                        </div>

                        <div className="me-modal-body">
                            {rfpSubmitted ? (
                                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#eafaf1", color: "#27ae60", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px auto", fontSize: "28px" }}>
                                        &#10003;
                                    </div>
                                    <h4 style={{ fontSize: "22px", color: "#093266", fontWeight: 600, marginBottom: "10px" }}>
                                        Thank You!
                                    </h4>
                                    <p style={{ color: "#666666", fontSize: "14.5px", lineHeight: "1.6" }}>
                                        Your event proposal request has been received. Our dedicated event planning specialist will contact you with a tailored package shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleRfpSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Your Name *</label>
                                                <input
                                                    type="text"
                                                    className="me-form-input"
                                                    placeholder="John Doe"
                                                    required
                                                    value={rfpFormData.name}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Email Address *</label>
                                                <input
                                                    type="email"
                                                    className="me-form-input"
                                                    placeholder="name@company.com"
                                                    required
                                                    value={rfpFormData.email}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    className="me-form-input"
                                                    placeholder="+971 50 000 0000"
                                                    required
                                                    value={rfpFormData.phone}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Preferred Hotel</label>
                                                <select
                                                    className="me-form-input"
                                                    value={rfpFormData.hotel}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, hotel: e.target.value })}
                                                >
                                                    <option value="">Any Hotel / Flexible</option>
                                                    {availableHotels.map((h, i) => (
                                                        <option key={i} value={h}>{h}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Event Type</label>
                                                <select
                                                    className="me-form-input"
                                                    value={rfpFormData.eventType}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, eventType: e.target.value })}
                                                >
                                                    <option value="">Select Event Type</option>
                                                    <option value="Corporate Meetings">Corporate Meetings</option>
                                                    <option value="Weddings">Weddings &amp; Celebrations</option>
                                                    <option value="Events & Banquets">Events &amp; Banquets</option>
                                                    <option value="Outside Catering">Outside Catering</option>
                                                    <option value="Conference Facilities">Conference Facilities</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Estimated Guests</label>
                                                <input
                                                    type="number"
                                                    className="me-form-input"
                                                    placeholder="e.g. 50, 200"
                                                    value={rfpFormData.guests}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, guests: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="me-form-group">
                                                <label className="me-form-label">Event Requirements &amp; Notes</label>
                                                <textarea
                                                    className="me-form-input"
                                                    rows={3}
                                                    placeholder="Preferred dates, seating setup, catering preferences, audiovisual requirements..."
                                                    value={rfpFormData.notes}
                                                    onChange={(e) => setRfpFormData({ ...rfpFormData, notes: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="me-form-submit-btn">
                                                Submit Proposal Request
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════════════
                7. OUR BRANDS BAR
            ═══════════════════════════════════════════════════════════════ */}
            <OurBrandsBar />
        </main>
    );
}
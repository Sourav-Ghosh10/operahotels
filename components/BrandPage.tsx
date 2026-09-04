'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import CarouselNav from '@/components/CarouselNav';

import dynamic from 'next/dynamic';

const BrandHotelMap = dynamic(() => import('@/components/BrandHotelMap'), { ssr: false });

interface ChildHotel {
    id: number;
    name: string;
    slug: string;
    logo?: string;
    cover_image?: string;
    banner_images?: string[];
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
    travelclick_hotel_id?: string;
    website?: string;
    google_location?: string;
    star_rating?: number;
}

interface Offer {
    id: number;
    name: string;
    description?: string;
    badge?: string;
    image?: string;
    discount_percentage?: number;
}

interface BrandContent {
    experience_section_title?: string;
    our_hotels_section_title?: string;
    our_hotels_cta_link?: string;
    destinations_section_title?: string;
    destinations_cta_link?: string;
}

interface BrandData {
    id: number;
    name: string;
    slug: string;
    type: string;
    tagline?: string;
    intro_subtitle?: string;
    intro_title?: string;
    intro_text?: string;
    logo?: string;
    cover_image?: string;
    banner_images?: string[];
    banner_title?: string;
    latitude?: number | string | null;
    longitude?: number | string | null;
    address?: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
    google_location?: string;
    location_title?: string;
    contact_button_text?: string;
    contact_button_url?: string;
    brand_content?: BrandContent;
    child_hotels?: ChildHotel[];
    offers?: Offer[];
}

interface BrandPageProps {
    brandData: BrandData;
    brandsData: any[];
}

/* ─── PLACEHOLDER OFFERS shown when no real offers exist ─── */
const PLACEHOLDER_OFFERS: Offer[] = [
    {
        id: -1,
        name: 'Exclusive Stay Package',
        description: 'Enjoy our signature stay experience with complimentary breakfast and late checkout.',
        badge: 'FEATURED',
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80&fit=crop',
    },
    {
        id: -2,
        name: 'Leisure & Relaxation',
        description: 'Unwind with our curated wellness packages, spa access, and poolside dining.',
        badge: 'POPULAR',
        image: 'https://images.unsplash.com/photo-1540541338537-1220059d7b45?w=800&q=80&fit=crop',
    },
    {
        id: -3,
        name: 'Dining Excellence',
        description: 'Savour exquisite cuisine crafted by our award-winning chefs.',
        badge: 'OFFER',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop',
    },
    {
        id: -4,
        name: 'Book Early & Save',
        description: 'Secure your stay in advance and enjoy exclusive savings on our best available rates.',
        badge: 'SAVE MORE',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop',
    },
    {
        id: -5,
        name: 'Family Adventure',
        description: 'Create lasting memories with our specially curated family packages and activities.',
        badge: 'FAMILY',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c4fe1fa7?w=800&q=80&fit=crop',
    },
];


/* ─────────────────────────────────────────────────────────────
   BrandExperienceOffers
   Same card design, CSS classes, hover animation and Owl
   Carousel setup as ExclusiveOffers on the homepage.
───────────────────────────────────────────────────────────── */
function BrandExperienceOffers({ offers, brandSlug }: { offers: Offer[]; brandSlug: string }) {
    useEffect(() => {
        if (!offers || offers.length === 0) return;
        if (typeof window === 'undefined' || !(window as any).$) return;

        const timer = setTimeout(() => {
            const $ = (window as any).$;
            const $carousel = $('.brand-experience-wrapper .offers-carousel');

            const initCarousel = () => {
                return $carousel.owlCarousel({
                    loop: offers.length > 2,
                    margin: 30,
                    nav: false,
                    dots: false,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    autoplayHoverPause: true,
                    responsive: {
                        0: { items: 1, margin: 15 },
                        768: { items: 2, margin: 20 },
                        992: { items: 3, margin: 30 },
                    },
                });
            };

            let owl: any;
            if ($carousel.hasClass('owl-loaded')) {
                $carousel.trigger('destroy.owl.carousel');
                $carousel.find('.owl-stage-outer').children().unwrap();
                $carousel.removeClass('owl-center owl-loaded owl-text-select-on');
            }
            owl = initCarousel();

            $('.brand-experience-wrapper .offers-carousel-nav .next-btn')
                .off('click').on('click', () => owl.trigger('next.owl.carousel'));
            $('.brand-experience-wrapper .offers-carousel-nav .prev-btn')
                .off('click').on('click', () => owl.trigger('prev.owl.carousel'));
        }, 200);

        return () => clearTimeout(timer);
    }, [offers]);

    if (!offers || offers.length === 0) return null;

    return (
        <div className="brand-experience-wrapper exclusive-offers-wrapper">
            <div className="owl-carousel offers-carousel">
                {offers.map((offer, index) => {
                    const offerName = offer.name || '';
                    const rawDesc = offer.description || (offer.discount_percentage ? `${offer.discount_percentage}% OFF` : '');
                    const offerDesc = typeof rawDesc === 'string' ? rawDesc.replace(/<[^>]*>?/gm, '') : rawDesc;
                    const bannerImg = offer.image || (offer as any).banner_image || '';
                    const offerSlug = (offer as any).slug || (offer.name ? offer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
                    const detailUrl = offerSlug ? `/${(offer as any).hotel_slug || 'offers'}/special-offers/${offerSlug}` : '/offers';

                    return (
                        <div key={offer.id || index} className="offer-card-item">
                            <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: bannerImg ? `url('${bannerImg}')` : 'none' }}>
                                    {offer.badge && <span className="offer-badge">{offer.badge}</span>}
                                    <div className="offer-hover-overlay">
                                        <span className="offer-hover-badge">BOOK NOW</span>
                                        <span className="offer-hover-discount">{offerDesc}</span>
                                    </div>
                                </div>
                                <div className="offer-content">
                                    <h3 className="offer-title">{offerName}</h3>
                                    <div className="offer-hover-details">
                                        <a
                                            href={detailUrl}
                                            className="offer-readmore"
                                        >
                                            READ MORE
                                        </a>
                                        <a
                                            href={detailUrl}
                                            className="btn btn-offer-book"
                                        >
                                            BOOK NOW
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ← → navigation — same as ExclusiveOffers */}
            <CarouselNav className="offers-carousel-nav d-flex justify-content-center align-items-center mt-4 gap-5" />

            {/* Gold line separator */}
            <div className="gold-separator mx-auto mt-4"></div>
        </div>
    );
}

/* ─── HotelsSlider ─────────────────────────────
   One hotel visible at a time. Large ← → arrows
   sit on the far left/right edges of the slide,
   matching the Coral Hotels reference design.
─────────────────────────────────────────────── */
function HotelsSlider({ hotels }: { hotels: ChildHotel[] }) {
    const [current, setCurrent] = useState(0);
    const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const total = hotels.length;

    const go = useCallback((dir: 'left' | 'right') => {
        if (isAnimating || total <= 1) return;
        setAnimDir(dir);
        setIsAnimating(true);
        setTimeout(() => {
            setCurrent(c => dir === 'left' ? (c + 1) % total : (c - 1 + total) % total);
            setIsAnimating(false);
            setAnimDir(null);
        }, 400);
    }, [isAnimating, total]);

    const next = () => go('left');
    const prev = () => go('right');

    const hotel = hotels[current];
    const hotelImage = hotel.cover_image
        || (hotel.banner_images && hotel.banner_images[0])
        || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop';
    const bookingUrl = hotel.travelclick_hotel_id
        ? `https://reservations.travelclick.com/${hotel.travelclick_hotel_id}`
        : '#';
    const fullAddress = [hotel.address, hotel.city, hotel.country].filter(Boolean).join(', ');

    /* Slide-in animation class on the content wrapper */
    const slideClass = isAnimating
        ? (animDir === 'left' ? 'bdp-hs-slide-out-left' : 'bdp-hs-slide-out-right')
        : 'bdp-hs-slide-in';

    return (
        <div className="bdp-hs-wrap">
            <div className="bdp-inner" style={{ position: 'relative' }}>
                {/* Slide content */}
                <div className={`bdp-hs-slide ${slideClass}`}>
                    {/* Image */}
                    <div className="bdp-hs-img-wrap">
                        <img src={hotelImage} alt={hotel.name} className="bdp-hs-img" />
                    </div>

                    {/* Info panel overlapping bottom-right of image */}
                    <div className="bdp-hs-info">
                        <h3 className="bdp-hotel-name">{hotel.name.toUpperCase()}</h3>
                        {fullAddress && (
                            <p className="bdp-hotel-meta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {fullAddress}
                            </p>
                        )}
                        {hotel.phone && (
                            <p className="bdp-hotel-meta">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                            </p>
                        )}
                        <div className="bdp-hotel-btns">
                            <Link href={`/${hotel.slug}`} className="bdp-hotel-btn-outline">VISIT WEBSITE</Link>
                            <a
                                href={bookingUrl}
                                target={bookingUrl !== '#' ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="bdp-hotel-btn-gold"
                            >
                                BOOK NOW
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered navigation arrows */}
            {total > 1 && (
                <CarouselNav
                    className="offers-carousel-nav d-flex justify-content-center align-items-center mt-4 gap-5"
                    onPrev={prev}
                    onNext={next}
                />
            )}
        </div>
    );
}

/* ─── Hero carousel (simple auto-play) ─────── */
function BrandHeroCarousel({ images, title }: { images: string[]; title: string }) {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent(c => (c + 1) % images.length);
    }, [images.length]);

    const prev = useCallback(() => {
        setCurrent(c => (c - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [images.length, next]);

    return (
        <>
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`bdp-hero-slide${idx === current ? ' active' : ''}`}
                    style={{ backgroundImage: `url('${img}')` }}
                />
            ))}
            {images.length > 1 && (
                <>
                    <button className="bdp-hero-arrow bdp-hero-arrow--prev" onClick={prev} aria-label="Previous">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="20" y1="12" x2="4" y2="12" /><polyline points="10 18 4 12 10 6" />
                        </svg>
                    </button>
                    <button className="bdp-hero-arrow bdp-hero-arrow--next" onClick={next} aria-label="Next">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" />
                        </svg>
                    </button>
                </>
            )}
            <div className="bdp-hero-content">
                <h1 className="bdp-hero-title">{title}</h1>
            </div>
        </>
    );
}

/* ─── Map panel: hotel cards overlaid on map ─── */
function MapPanel({ hotels }: { hotels: ChildHotel[] }) {
    return (
        <div className="bdp-map-hotel-card">
            {hotels.map(hotel => (
                <div className="bdp-map-hotel-card-item" key={hotel.id}>
                    {hotel.cover_image && (
                        <img src={hotel.cover_image} alt={hotel.name} className="bdp-map-hotel-img" />
                    )}
                    <div className="bdp-map-hotel-info">
                        <h4 className="bdp-map-hotel-name">{hotel.name.toUpperCase()}</h4>
                        {hotel.address && (
                            <p className="bdp-map-hotel-addr">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                {[hotel.address, hotel.city, hotel.country].filter(Boolean).join(', ')}
                            </p>
                        )}
                        {hotel.phone && (
                            <p className="bdp-map-hotel-phone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Main BrandPage component ──────────────── */
export default function BrandPage({ brandData, brandsData }: BrandPageProps) {
    const bc = brandData.brand_content ?? {};

    const heroImages = (brandData.banner_images && brandData.banner_images.length > 0)
        ? brandData.banner_images
        : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'];

    const heroTitle = brandData.banner_title || `STAY AT ${brandData.name.toUpperCase()}`;
    const introLabel = brandData.intro_subtitle || brandData.tagline || '';
    const introTitle = brandData.intro_title || `Welcome to ${brandData.name}`;
    const introText = brandData.intro_text || '';

    const experienceTitle = bc.experience_section_title || `EXPERIENCE ${brandData.name.toUpperCase()}`;
    const ourHotelsTitle = bc.our_hotels_section_title || 'OUR HOTELS';
    const ourHotelsCtaLink = bc.our_hotels_cta_link;
    const destinationsTitle = bc.destinations_section_title || `${brandData.name.toUpperCase()} HOTELS LOCATIONS`;
    const destinationsCtaLink = bc.destinations_cta_link;

    const locationTitle = brandData.location_title || 'WHERE WE ARE';
    const contactBtnText = 'CONTACT US';
    const contactBtnUrl = brandData.contact_button_url || '/contact';

    const childHotels = brandData.child_hotels ?? [];
    const rawOffers = brandData.offers ?? [];

    // Use real offers from the brand directly. No placeholders, to reflect actual DB state.
    const offers = rawOffers;

    // Build mapHotels: prefer real child hotels; if none exist (e.g. EWA),
    // synthesise a single pin from the brand's own coordinates so ALL brand
    // pages show the interactive Leaflet map with the same luxury style.
    const mapHotels: any[] = childHotels.length > 0
        ? childHotels
        : (brandData.latitude && brandData.longitude)
            ? [{
                id: brandData.id,
                name: brandData.name,
                slug: brandData.slug,
                cover_image: brandData.cover_image ?? brandData.banner_images?.[0],
                banner_images: brandData.banner_images,
                latitude: brandData.latitude,
                longitude: brandData.longitude,
                address: brandData.address,
                city: brandData.city,
                country: brandData.country,
                phone: brandData.phone,
                email: brandData.email,
                google_location: brandData.google_location,
            }]
            : [];

    return (
        <main className="bdp-page">

            {/* ══ HERO ════════════════════════════════════ */}
            <header className="bdp-hero">
                <BrandHeroCarousel images={heroImages} title={heroTitle} />
                <div className="bdp-hero-overlay" />
                <div className="bdp-hero-header">
                    <HotelHeader logoUrl={brandData.logo} />
                </div>
            </header>

            {/* ══ INTRO ═══════════════════════════════════ */}
            <section className="bdp-intro">
                <div className="container">
                    {introLabel && (
                        <p className="bdp-gold-label">{introLabel.toUpperCase()}</p>
                    )}
                    <h2 className="bdp-intro-title">{introTitle}</h2>
                    {introText ? (
                        <div className="bdp-intro-body" dangerouslySetInnerHTML={{ __html: introText }} />
                    ) : (
                        <p className="bdp-intro-body">
                            Discover the essence of {brandData.name} — a collection of remarkable hotels
                            crafted for discerning travellers who seek authentic, exceptional experiences.
                        </p>
                    )}
                    <div className="bdp-gold-divider" />
                </div>
            </section>

            {/* ══ EXPERIENCE / OFFERS ══════════════════════ */}
            {/* Uses identical Owl Carousel card design as homepage ExclusiveOffers */}
            {offers.length > 0 && (
                <section className="exclusive-offers-section" style={{ paddingBottom: 60 }}>
                    <div className="container">
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-3">
                            <h2 className="offers-section-title mb-2 mb-sm-0">{experienceTitle}</h2>
                            <a href="/offers" className="discover-offers-link">
                                DISCOVER OUR SPECIAL OFFERS
                            </a>
                        </div>

                        <BrandExperienceOffers offers={offers} brandSlug={brandData.slug} />
                    </div>
                </section>
            )}

            {/* ══ OUR HOTELS ══════════════════════════════ */}
            <section className="bdp-our-hotels">
                <div className="bdp-inner">
                    <div className="bdp-section-header">
                        <h2 className="bdp-section-heading" style={{ marginBottom: 0 }}>{ourHotelsTitle}</h2>
                        {ourHotelsCtaLink && (
                            <a href={ourHotelsCtaLink} className="bdp-underline-link">
                                DISCOVER MORE ABOUT {brandData.name.toUpperCase()}
                            </a>
                        )}
                    </div>
                </div>

                {childHotels.length > 0 ? (
                    <HotelsSlider hotels={childHotels} />
                ) : (
                    <div className="bdp-inner">
                        <div className="bdp-no-hotels">No hotels listed yet under this brand.</div>
                    </div>
                )}

                {/* Gold line separator */}
                <div className="gold-separator mx-auto mt-4"></div>
            </section>


            {/* ══ WHERE WE ARE — Interactive Leaflet Map (all brand pages) ════════════════════ */}
            {mapHotels.length > 0 && (
                <BrandHotelMap
                    hotels={mapHotels}
                    brandName={brandData.name}
                    contactUrl={contactBtnUrl}
                    sectionTitle={locationTitle || 'WHERE WE ARE'}
                />
            )}


            <OurBrandsBar />
            <HotelFooter logoUrl={brandData.logo} />
        </main>
    );
}

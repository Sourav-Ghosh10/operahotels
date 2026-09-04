"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import { getPropertyBySlug, getAllHotels } from '@/services/api';

interface RoomDetailsProps {
    hotelSlug?: string;
    roomSlug: string;
}

function stripHtml(value: string | null | undefined): string {
    if (!value) return '';
    return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&rsquo;/gi, "’")
        .replace(/&lsquo;/gi, "‘")
        .replace(/&rdquo;/gi, "”")
        .replace(/&ldquo;/gi, "“")
        .replace(/\s+/g, ' ')
        .trim();
}

// Map feature name to SVG icon
function getFeatureIcon(name: string, iconKey?: string) {
    const lower = (name || '').toLowerCase();
    if (lower.includes('air condition') || lower.includes('ac') || lower.includes('climate')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="m20 16-4-4 4-4"></path>
                <path d="m4 8 4 4-4 4"></path>
                <path d="m16 4-4 4-4-4"></path>
                <path d="m8 20 4-4 4 4"></path>
            </svg>
        );
    }
    if (lower.includes('family') || lower.includes('people') || lower.includes('guest')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        );
    }
    if (lower.includes('wi-fi') || lower.includes('wifi') || lower.includes('internet')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="2.5"></line>
            </svg>
        );
    }
    if (lower.includes('minibar') || lower.includes('bar') || lower.includes('fridge') || lower.includes('drink')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                <line x1="5" y1="9" x2="19" y2="9"></line>
                <line x1="8" y1="5" x2="8.01" y2="5" strokeWidth="2.5"></line>
                <line x1="8" y1="13" x2="8.01" y2="13" strokeWidth="2.5"></line>
            </svg>
        );
    }
    if (lower.includes('safe') || lower.includes('lock') || lower.includes('security')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16" r="1"></circle>
            </svg>
        );
    }
    if (lower.includes('hairdryer') || lower.includes('dryer') || lower.includes('blower')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 13h10l6-4.5a3 3 0 0 0-3-5.2L7 7.5"></path>
                <path d="M7 13v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-6"></path>
                <circle cx="15" cy="5.5" r="1.5"></circle>
            </svg>
        );
    }
    if (lower.includes('tea') || lower.includes('coffee') || lower.includes('cup')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                <line x1="6" y1="2" x2="6" y2="4"></line>
                <line x1="10" y1="2" x2="10" y2="4"></line>
                <line x1="14" y1="2" x2="14" y2="4"></line>
            </svg>
        );
    }
    if (lower.includes('television') || lower.includes('tv') || lower.includes('screen')) {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="15" x="2" y="7" rx="2"></rect>
                <polyline points="17 2 12 7 7 2"></polyline>
            </svg>
        );
    }
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    );
}

export default function RoomDetailsPage({ hotelSlug, roomSlug }: RoomDetailsProps) {
    const [propertyData, setPropertyData] = useState<any>(null);
    const [resolvedHotelSlug, setResolvedHotelSlug] = useState<string>(hotelSlug || 'bahi-ajman-palace-hotel');
    const [currentRoom, setCurrentRoom] = useState<any>(null);
    const [otherRooms, setOtherRooms] = useState<any[]>([]);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadData() {
            try {
                let hSlug = hotelSlug;
                if (!hSlug) {
                    hSlug = 'bahi-ajman-palace-hotel';
                }
                setResolvedHotelSlug(hSlug);

                const data = await getPropertyBySlug(hSlug);
                setPropertyData(data);

                if (data && data.room_types) {
                    // find room matching roomSlug
                    const found = data.room_types.find((r: any) => 
                        (r.slug && r.slug.toLowerCase() === roomSlug.toLowerCase()) ||
                        (r.name && r.name.toLowerCase().replace(/\s+/g, '-') === roomSlug.toLowerCase())
                    ) || data.room_types[0];

                    setCurrentRoom(found);

                    // other rooms
                    const others = data.room_types.filter((r: any) => r.id !== found?.id);
                    setOtherRooms(others);
                }
            } catch (err) {
                console.error("Error loading room details:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [hotelSlug, roomSlug]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
                <div className="spinner-border" style={{ color: '#b89558' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!currentRoom) {
        return (
            <div className="container py-5 text-center">
                <h2>Room not found</h2>
                <Link href={resolvedHotelSlug ? `/${resolvedHotelSlug}` : '/'} className="btn btn-primary mt-3">
                    Return to Hotel
                </Link>
            </div>
        );
    }

    // Prepare gallery images
    const rawGallery: string[] = currentRoom.gallery && currentRoom.gallery.length > 0 
        ? currentRoom.gallery 
        : [currentRoom.image || '/img/room_standard_king.png'];
    
    // Remove duplicates
    const galleryImages = Array.from(new Set(rawGallery.filter(Boolean)));

    // Handle next/prev gallery image
    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    // Features list
    const features = currentRoom.special_features && currentRoom.special_features.length > 0
        ? currentRoom.special_features
        : [
            { feature_name: 'Air Condition' },
            { feature_name: 'Family Room' },
            { feature_name: 'Complimentary Wi-Fi' },
            { feature_name: 'Minibar' },
            { feature_name: 'In-room Safe' },
            { feature_name: 'Hairdryer' },
            { feature_name: 'Tea/Coffee Making Facilities' },
            { feature_name: 'Television' },
        ];

    // Room specs
    const priceDisplay = currentRoom.starting_price 
        ? currentRoom.starting_price.replace(/^from\s+/i, '')
        : 'AED 332.50';
    
    const sizeDisplay = currentRoom.size_sqm 
        ? `${currentRoom.size_sqm} M²`
        : '27 M²';

    // Next / Prev room navigation
    const allRooms = propertyData?.room_types || [];
    const currentIndex = allRooms.findIndex((r: any) => r.id === currentRoom.id);
    const prevRoom = currentIndex > 0 ? allRooms[currentIndex - 1] : allRooms[allRooms.length - 1];
    const nextRoom = currentIndex < allRooms.length - 1 ? allRooms[currentIndex + 1] : allRooms[0];

    return (
        <div className="room-details-page-wrapper" style={{ backgroundColor: '#fff', color: '#222', minHeight: '100vh' }}>
            <HotelHeader hotelSlug={resolvedHotelSlug} logoUrl={propertyData?.logo} isSolid={true} />

            {/* Top Room Presentation Section */}
            <section className="room-hero-section py-5">
                <div className="container" style={{ maxWidth: '1280px' }}>
                    
                    {/* Top back breadcrumb */}
                    <div className="mb-4">
                        <Link 
                            href={`/${resolvedHotelSlug}`}
                            style={{ 
                                color: '#888', 
                                textDecoration: 'none', 
                                fontSize: '13px', 
                                letterSpacing: '1px', 
                                textTransform: 'uppercase',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <span>&larr;</span> BACK TO ACCOMMODATION
                        </Link>
                    </div>

                    <div className="row gx-lg-5 align-items-start">
                        {/* Left Column: Title, Description, Actions & Specs */}
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <h1 
                                className="room-main-title mb-4" 
                                style={{ 
                                    fontFamily: "var(--font-serif, 'Alexandria', 'Playfair Display', Georgia, serif)", 
                                    fontSize: '2.5rem', 
                                    fontWeight: 400, 
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase',
                                    color: '#1a1a1a',
                                    lineHeight: 1.2
                                }}
                            >
                                {currentRoom.name}
                            </h1>

                            {/* Description */}
                            <div 
                                className="room-description-text mb-4" 
                                style={{ 
                                    fontSize: '15px', 
                                    lineHeight: 1.8, 
                                    color: '#444' 
                                }}
                            >
                                {currentRoom.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: currentRoom.description }} />
                                ) : (
                                    <>
                                        <p className="mb-3">
                                            Our luxurious king-sized bed guarantees an unparalleled night&rsquo;s sleep, ensuring you wake up refreshed and ready for the day ahead. Whether you&rsquo;re visiting for business or leisure, our Standard King Room combines comfort and convenience for an ideal stay.
                                        </p>
                                        <p className="mb-0">
                                            Additional Information: Two children under the age of 11 can stay free of charge when using existing beds. Extra beds are not permitted in this room type.
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Specs & Booking Row */}
                            <div className="d-flex flex-wrap align-items-center gap-4 pt-3 mt-4" style={{ borderTop: '1px solid #f0f0f0' }}>
                                {/* Book Now Button */}
                                <a 
                                    href={currentRoom.book_now_link || propertyData?.website || "#"} 
                                    target={currentRoom.book_now_link ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="btn-book-room-detail"
                                    style={{
                                        backgroundColor: '#b89558',
                                        color: '#fff',
                                        padding: '14px 34px',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        letterSpacing: '1.5px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        borderRadius: '0px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 2px 6px rgba(184, 149, 88, 0.25)'
                                    }}
                                >
                                    {currentRoom.book_now_label || 'BOOK NOW'}
                                </a>

                                {/* Starting Price */}
                                <div className="price-box ps-3 pe-4" style={{ borderRight: '1px solid #e5e5e5' }}>
                                    <div style={{ fontSize: '11px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                                        FROM
                                    </div>
                                    <div style={{ fontSize: '20px', color: '#111', fontWeight: 700, letterSpacing: '0.5px' }}>
                                        {priceDisplay}
                                    </div>
                                </div>

                                {/* Room Area */}
                                <div className="area-box d-flex align-items-center gap-2">
                                    <div style={{ color: '#222' }}>
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z"/>
                                            <path d="M3 7l9 4 9-4"/>
                                            <path d="M12 11v10"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                                            AREA
                                        </div>
                                        <div style={{ fontSize: '20px', color: '#111', fontWeight: 700, letterSpacing: '0.5px' }}>
                                            {sizeDisplay}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Special Features Card */}
                        <div className="col-lg-5">
                            <div 
                                className="special-features-card p-4" 
                                style={{ 
                                    backgroundColor: '#fff', 
                                    border: '1px solid #ebebeb', 
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)' 
                                }}
                            >
                                <h3 
                                    className="special-features-title mb-3" 
                                    style={{ 
                                        fontFamily: "var(--font-serif, 'Alexandria', 'Playfair Display', Georgia, serif)",
                                        fontSize: '15px', 
                                        letterSpacing: '2px', 
                                        textTransform: 'uppercase',
                                        color: '#1a1a1a',
                                        fontWeight: 700,
                                        borderBottom: '2px solid #b89558',
                                        paddingBottom: '12px'
                                    }}
                                >
                                    SPECIAL FEATURES
                                </h3>

                                <div className="features-list">
                                    {features.map((feat: any, idx: number) => (
                                        <div 
                                            key={idx} 
                                            className="feature-item d-flex align-items-center gap-3 py-3" 
                                            style={{ 
                                                borderBottom: idx < features.length - 1 ? '1px solid #f2f2f2' : 'none' 
                                            }}
                                        >
                                            <div style={{ color: '#b89558', minWidth: '24px', display: 'flex', justifyContent: 'center' }}>
                                                {getFeatureIcon(feat.feature_name, feat.icon)}
                                            </div>
                                            <div 
                                                style={{ 
                                                    fontSize: '13px', 
                                                    letterSpacing: '1px', 
                                                    textTransform: 'uppercase', 
                                                    fontWeight: 600,
                                                    color: '#222' 
                                                }}
                                            >
                                                {feat.feature_name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Room Image Gallery Carousel */}
            <section className="room-gallery-section position-relative mb-4">
                <div className="container-fluid px-0">
                    <div 
                        className="gallery-slider-container position-relative overflow-hidden" 
                        style={{ 
                            height: '620px', 
                            backgroundColor: '#111' 
                        }}
                    >
                        {/* Slide Image */}
                        <div 
                            className="gallery-slide w-100 h-100" 
                            style={{ 
                                backgroundImage: `url('${galleryImages[activeImageIndex]}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'background-image 0.5s ease-in-out'
                            }}
                        />

                        {/* Prev Button */}
                        <button 
                            type="button" 
                            onClick={handlePrevImage}
                            className="gallery-arrow-btn prev-arrow"
                            aria-label="Previous image"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '30px',
                                transform: 'translateY(-50%)',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        {/* Next Button */}
                        <button 
                            type="button" 
                            onClick={handleNextImage}
                            className="gallery-arrow-btn next-arrow"
                            aria-label="Next image"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '30px',
                                transform: 'translateY(-50%)',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                transition: 'all 0.2s ease',
                                zIndex: 10
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Dots Indicators */}
                        <div 
                            className="gallery-dots position-absolute bottom-0 start-50 translate-middle-x pb-4 d-flex gap-2"
                            style={{ zIndex: 10 }}
                        >
                            {galleryImages.map((_, idx: number) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActiveImageIndex(idx)}
                                    style={{
                                        width: idx === activeImageIndex ? '28px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: idx === activeImageIndex ? '#b89558' : 'rgba(255,255,255,0.6)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Bar Below Gallery */}
            <div className="container py-4 my-2" style={{ maxWidth: '1280px' }}>
                <div 
                    className="d-flex justify-content-between align-items-center py-3" 
                    style={{ 
                        borderTop: '1px solid #ebebeb', 
                        borderBottom: '1px solid #ebebeb',
                        fontSize: '12px',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontWeight: 600
                    }}
                >
                    {prevRoom ? (
                        <Link 
                            href={`/${resolvedHotelSlug}/rooms-suites/${prevRoom.slug}`}
                            style={{ color: '#222', textDecoration: 'none' }}
                        >
                            &lt; PREV ROOM
                        </Link>
                    ) : <span />}

                    <Link 
                        href={`/${resolvedHotelSlug}#accommodation`}
                        style={{ color: '#222', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                    >
                        VIEW ALL ROOMS &amp; SUITES
                    </Link>

                    {nextRoom ? (
                        <Link 
                            href={`/${resolvedHotelSlug}/rooms-suites/${nextRoom.slug}`}
                            style={{ color: '#222', textDecoration: 'none' }}
                        >
                            NEXT ROOM &gt;
                        </Link>
                    ) : <span />}
                </div>
            </div>

            {/* Other Accommodations Section */}
            {otherRooms.length > 0 && (
                <section className="other-accommodations-section py-5" style={{ backgroundColor: '#faf9f8' }}>
                    <div className="container py-3" style={{ maxWidth: '1280px' }}>
                        <h2 
                            className="mb-5 text-center" 
                            style={{ 
                                fontFamily: "var(--font-serif, 'Alexandria', 'Playfair Display', Georgia, serif)",
                                fontSize: '28px', 
                                letterSpacing: '2px', 
                                textTransform: 'uppercase',
                                color: '#1a1a1a',
                                fontWeight: 400
                            }}
                        >
                            OTHER ACCOMMODATIONS
                        </h2>

                        <div className="row g-4">
                            {otherRooms.slice(0, 3).map((room: any, idx: number) => (
                                <div key={idx} className="col-lg-4 col-md-6">
                                    <div 
                                        className="other-room-card h-100 bg-white d-flex flex-column" 
                                        style={{ 
                                            border: '1px solid #ebebeb',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                                        }}
                                    >
                                        <div 
                                            className="room-card-img" 
                                            style={{ 
                                                height: '240px', 
                                                backgroundImage: `url('${room.image || '/img/room_standard_king.png'}')`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        />
                                        <div className="p-4 d-flex flex-column flex-grow-1">
                                            <h3 
                                                style={{ 
                                                    fontFamily: "var(--font-serif, 'Alexandria', 'Playfair Display', Georgia, serif)",
                                                    fontSize: '18px', 
                                                    letterSpacing: '1px', 
                                                    textTransform: 'uppercase',
                                                    color: '#1a1a1a',
                                                    marginBottom: '12px'
                                                }}
                                            >
                                                {room.name}
                                            </h3>
                                            <p 
                                                style={{ 
                                                    fontSize: '14px', 
                                                    color: '#666', 
                                                    lineHeight: 1.6, 
                                                    flexGrow: 1,
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {stripHtml(room.short_description || room.description).slice(0, 120)}...
                                            </p>
                                            
                                            <div className="d-flex justify-content-between align-items-center pt-3" style={{ borderTop: '1px solid #f2f2f2' }}>
                                                <Link 
                                                    href={`/${resolvedHotelSlug}/rooms-suites/${room.slug}`}
                                                    style={{ 
                                                        color: '#222', 
                                                        fontSize: '12px', 
                                                        letterSpacing: '1px', 
                                                        textTransform: 'uppercase', 
                                                        fontWeight: 600,
                                                        textDecoration: 'underline',
                                                        textUnderlineOffset: '3px'
                                                    }}
                                                >
                                                    READ MORE
                                                </Link>

                                                <a 
                                                    href={room.book_now_link || propertyData?.website || "#"} 
                                                    style={{ 
                                                        backgroundColor: '#b89558', 
                                                        color: '#fff', 
                                                        fontSize: '11px', 
                                                        fontWeight: 600, 
                                                        letterSpacing: '1px', 
                                                        textTransform: 'uppercase', 
                                                        padding: '8px 18px',
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    BOOK NOW
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <HotelFooter 
                logoUrl={propertyData?.footer_logo || propertyData?.logo}
                hotelName={propertyData?.name}
                hotelSlug={resolvedHotelSlug}
                hotelPhone={propertyData?.phone}
                hotelAddress={propertyData?.address}
                hotelEmail={propertyData?.email}
            />
        </div>
    );
}

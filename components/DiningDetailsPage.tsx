"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import { getPropertyBySlug, getDiningDetails } from '@/services/api';

interface DiningDetailsProps {
    hotelSlug?: string;
    diningSlug: string;
}

export default function DiningDetailsPage({ hotelSlug = 'bahi-ajman-palace-hotel', diningSlug }: DiningDetailsProps) {
    const [propertyData, setPropertyData] = useState<any>(null);
    const [currentDining, setCurrentDining] = useState<any>(null);
    const [allOutlets, setAllOutlets] = useState<any[]>([]);
    const [prevOutlet, setPrevOutlet] = useState<any>(null);
    const [nextOutlet, setNextOutlet] = useState<any>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const targetHotelSlug = hotelSlug || 'bahi-ajman-palace-hotel';

                // Try both dedicated endpoint and full property endpoint
                const [directRes, propRes] = await Promise.all([
                    getDiningDetails(targetHotelSlug, diningSlug).catch(() => null),
                    getPropertyBySlug(targetHotelSlug).catch(() => null)
                ]);

                if (propRes) {
                    setPropertyData(propRes);
                }

                let dining = null;
                let outletsList: any[] = [];

                if (propRes && propRes.dining_outlets && Array.isArray(propRes.dining_outlets)) {
                    outletsList = propRes.dining_outlets;
                }

                if (directRes && directRes.dining) {
                    dining = directRes.dining;
                    if (directRes.other_outlets && outletsList.length === 0) {
                        outletsList = [directRes.dining, ...directRes.other_outlets];
                    }
                } else if (outletsList.length > 0) {
                    dining = outletsList.find((d: any) => 
                        (d.slug && d.slug.toLowerCase() === diningSlug.toLowerCase()) ||
                        (d.name && d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === diningSlug.toLowerCase()) ||
                        String(d.id) === String(diningSlug)
                    ) || outletsList[0];
                }

                if (dining) {
                    setCurrentDining(dining);
                    setAllOutlets(outletsList);

                    // Find previous and next outlets for navigation
                    const curIndex = outletsList.findIndex((d: any) => d.id === dining.id || d.slug === dining.slug);
                    if (curIndex !== -1 && outletsList.length > 1) {
                        const prevIdx = (curIndex - 1 + outletsList.length) % outletsList.length;
                        const nextIdx = (curIndex + 1) % outletsList.length;
                        setPrevOutlet(outletsList[prevIdx]);
                        setNextOutlet(outletsList[nextIdx]);
                    }
                }
            } catch (err) {
                console.error("Error loading dining details:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [hotelSlug, diningSlug]);

    // Slider images resolution
    const galleryImages: string[] = React.useMemo(() => {
        if (!currentDining) return [];
        if (currentDining.gallery && Array.isArray(currentDining.gallery) && currentDining.gallery.length > 0) {
            return currentDining.gallery;
        }
        if (currentDining.image) {
            return [currentDining.image];
        }
        return ['/img/dining_al_nafoora.png'];
    }, [currentDining]);

    // Autoplay for carousel
    useEffect(() => {
        if (!isPlaying || galleryImages.length <= 1) return;
        autoplayTimerRef.current = setInterval(() => {
            setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 5000);

        return () => {
            if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        };
    }, [isPlaying, galleryImages.length]);

    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#fcfaf7" }}>
                <div className="spinner-border" style={{ color: '#b89558' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!currentDining) {
        return (
            <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#fcfaf7" }}>
                <HotelHeader 
                    hotelSlug={hotelSlug} 
                    isSolid={true} 
                    logoUrl={propertyData?.logo} 
                />
                <div className="container py-5 my-auto text-center">
                    <h2 className="mb-4" style={{ fontFamily: "var(--font-alexandria, 'Alexandria', serif)", color: "#0b1a26" }}>Restaurant Not Found</h2>
                    <p className="text-muted mb-4">We could not find the dining venue you were looking for.</p>
                    <Link href={`/${hotelSlug}`} className="btn" style={{ backgroundColor: "#b89558", color: "#fff", padding: "12px 28px", fontWeight: 600 }}>
                        Return to Hotel
                    </Link>
                </div>
                <HotelFooter 
                    hotelName={propertyData?.name || "Bahi Ajman Palace Hotel"}
                    hotelPhone={propertyData?.phone || "+971 6 701 8888"}
                    hotelSlug={hotelSlug}
                    logoUrl={propertyData?.footer_logo || propertyData?.logo} hotelEmail={propertyData?.email}
                />
            </div>
        );
    }

    // Extract contact details and metadata
    const contactDetailsList = Array.isArray(currentDining.contact_details) ? currentDining.contact_details : [];
    
    // Direct phone
    const phoneEntry = contactDetailsList.find((c: any) => 
        (c.icon && c.icon.includes('phone')) || 
        (c.contact_text && c.contact_text.match(/\+?\d[\d\s-]{7,}/))
    );
    const directPhone = phoneEntry?.contact_text || propertyData?.phone || '+971 50 634 2054';

    // Email
    const emailEntry = contactDetailsList.find((c: any) => 
        (c.icon && c.icon.includes('envelope')) || 
        (c.contact_text && c.contact_text.includes('@'))
    );
    const directEmail = emailEntry?.contact_text || propertyData?.email || 'reservations.bahiajman@hmhhotelgroup.com';

    // Hours
    const hoursEntry = contactDetailsList.find((c: any) => 
        (c.icon && c.icon.includes('clock')) || 
        (c.contact_text && c.contact_text.toLowerCase().includes('daily:'))
    );
    const openingHours = currentDining.opening_hours || hoursEntry?.contact_text || 'Daily: 1:00 PM - 11:00 PM';

    // Dress Code
    const dressCodeEntry = contactDetailsList.find((c: any) => 
        c.contact_text && c.contact_text.toLowerCase().includes('dress code')
    );
    const dressCode = dressCodeEntry ? dressCodeEntry.contact_text.replace(/^Dress Code:\s*/i, '') : 'Smart casual according to local customs and traditions';

    // Seating
    const seatingEntry = contactDetailsList.find((c: any) => 
        c.contact_text && c.contact_text.toLowerCase().includes('seating')
    );
    const seatingCapacity = seatingEntry ? seatingEntry.contact_text.replace(/^Seating:\s*/i, '') : '64 guests (indoor / outdoor)';

    // Menu Link
    const menuPdfLink = currentDining.read_more_link || 'https://document-tc.galaxy.tf/wdpdf-6m5k4ie8rzyl5qa7kwmamgm8/dragon-menu.pdf';

    // Book Table Link
    const bookTableLink = currentDining.book_table_link || 'https://www.hmhhotelgroup.com/bahi-hotels-resorts-bahi-ajman-palace/dining/book-a-table';

    return (
        <div className="dining-details-wrapper" style={{ backgroundColor: "#fcfaf7", minHeight: "100vh" }}>
            {/* Top Fixed / Sticky Navigation Header */}
            <HotelHeader 
                hotelSlug={hotelSlug} 
                isSolid={true} 
                logoUrl={propertyData?.logo} 
            />

            {/* Main Content Section */}
            <main className="py-5" style={{ minHeight: "calc(100vh - 120px)" }}>
                <div className="container" style={{ maxWidth: "1240px", paddingLeft: "20px", paddingRight: "20px" }}>
                    
                    {/* Restaurant Title */}
                    <div className="text-start mb-5 pt-3">
                        <h1 
                            className="dining-title"
                            style={{ 
                                fontFamily: "var(--font-alexandria, 'Alexandria', serif)", 
                                fontSize: "clamp(32px, 4vw, 44px)",
                                fontWeight: 500,
                                letterSpacing: "1.5px",
                                textTransform: "uppercase",
                                color: "#111827",
                                margin: 0
                            }}
                        >
                            {currentDining.name || "Dragon’s Place"}
                        </h1>
                    </div>

                    {/* Two Column Layout: Details & Overview */}
                    <div className="row g-4 g-lg-5 mb-5 align-items-start">
                        {/* Left Column: Description, Outlet Details, Cuisine, Actions */}
                        <div className="col-12 col-lg-7 pe-lg-4">
                            {/* Description */}
                            <div 
                                className="dining-description"
                                style={{ 
                                    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
                                    fontSize: "15.5px",
                                    lineHeight: "1.8",
                                    color: "#374151"
                                }}
                            >
                                {currentDining.description && currentDining.description.includes('<') ? (
                                    <div 
                                        dangerouslySetInnerHTML={{ __html: currentDining.description }} 
                                        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                                    />
                                ) : (
                                    <>
                                        <p style={{ marginBottom: "1.2rem" }}>
                                            If you’re a fan of Asian food and culture, this is the place to be! Dragon’s Place is an award-winning casual and contemporary restaurant, featuring a sushi bar, private Teppanyaki dining table, and two private washitsu rooms with low floor seating and amazing terrace to enjoy sunset overlooking the magnificent Arabian Gulf.
                                        </p>
                                        <p style={{ marginBottom: "1.2rem" }}>
                                            Enjoy the finest Asian fusion delicacies with highlights of the Japanese and Thai cuisines. And for a special twist, you can try the Japanese version of sushi infused with Middle Eastern flavours!
                                        </p>
                                    </>
                                )}
                            </div>

                            {/* Outlet Details */}
                            <div className="outlet-details-box mt-4 pt-2">
                                <h4 
                                    style={{ 
                                        fontSize: "15.5px", 
                                        fontWeight: 700, 
                                        color: "#111827", 
                                        marginBottom: "0.75rem",
                                        fontFamily: "'Outfit', sans-serif" 
                                    }}
                                >
                                    Outlet Details:
                                </h4>
                                <ul 
                                    style={{ 
                                        listStyleType: "disc", 
                                        paddingLeft: "1.25rem", 
                                        margin: 0,
                                        color: "#374151",
                                        fontSize: "15px",
                                        lineHeight: "1.75"
                                    }}
                                >
                                    <li style={{ marginBottom: "0.35rem" }}>
                                        <strong style={{ color: "#111827" }}>Dress Code:</strong> {dressCode}
                                    </li>
                                    <li>
                                        <strong style={{ color: "#111827" }}>Seating:</strong> {seatingCapacity}
                                    </li>
                                </ul>
                            </div>

                            {/* Style Cuisine & Menu CTA Row */}
                            <div 
                                className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mt-5 pt-3 pb-4"
                                style={{ borderBottom: "1px solid #e5e0d8" }}
                            >
                                {/* Cuisine Badge */}
                                <div className="d-flex align-items-center gap-3">
                                    <div 
                                        className="cuisine-icon-wrap d-flex align-items-center justify-content-center"
                                        style={{ 
                                            width: "48px", 
                                            height: "48px", 
                                            color: "#111827" 
                                        }}
                                    >
                                        {/* Cloche Food Cover SVG Icon */}
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 4V2"/>
                                            <path d="M4 14a8 8 0 0 1 16 0H4z"/>
                                            <path d="M2 18h20"/>
                                            <path d="M2 22h20"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#111827" }}>
                                            STYLE CUISINE
                                        </div>
                                        <div style={{ fontSize: "15px", color: "#4b5563", marginTop: "2px" }}>
                                            {currentDining.cuisine_type || "Asian Fusion"}
                                        </div>
                                    </div>
                                </div>

                                {/* Menu PDF Button */}
                                {menuPdfLink && (
                                    <div>
                                        <a 
                                            href={menuPdfLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn text-uppercase d-inline-flex align-items-center justify-content-center"
                                            style={{ 
                                                border: "1px solid #111827",
                                                borderRadius: "0",
                                                color: "#111827",
                                                backgroundColor: "transparent",
                                                padding: "11px 26px",
                                                fontSize: "13px",
                                                fontWeight: 600,
                                                letterSpacing: "1.5px",
                                                transition: "all 0.25s ease"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = "#111827";
                                                e.currentTarget.style.color = "#ffffff";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = "transparent";
                                                e.currentTarget.style.color = "#111827";
                                            }}
                                        >
                                            <span>DRAGON MENU</span>
                                            <svg className="ms-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <polyline points="19 12 12 19 5 12"></polyline>
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Book a Table Primary CTA Button */}
                            <div className="mt-4 pt-2">
                                <a 
                                    href={bookTableLink}
                                    target={bookTableLink.startsWith('http') ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="btn text-uppercase d-inline-block"
                                    style={{ 
                                        backgroundColor: "#b89558",
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "0",
                                        padding: "15px 38px",
                                        fontSize: "13.5px",
                                        fontWeight: 600,
                                        letterSpacing: "1.5px",
                                        boxShadow: "0 4px 15px rgba(184, 149, 88, 0.25)",
                                        transition: "all 0.25s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#9e7d44";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "#b89558";
                                    }}
                                >
                                    BOOK A TABLE
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Contact Details */}
                        <div className="col-12 col-lg-5 ps-lg-5">
                            <div 
                                className="contact-details-panel p-4 p-md-5"
                                style={{ 
                                    backgroundColor: "rgba(255, 255, 255, 0.7)", 
                                    border: "1px solid #efeae2",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)"
                                }}
                            >
                                <h3 
                                    style={{ 
                                        fontSize: "13px", 
                                        fontWeight: 700, 
                                        letterSpacing: "1.8px", 
                                        textTransform: "uppercase", 
                                        color: "#111827", 
                                        marginBottom: "1.5rem" 
                                    }}
                                >
                                    CONTACT DETAILS
                                </h3>

                                {/* Direct Telephone */}
                                <div className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #e5e0d8" }}>
                                    <div className="me-3" style={{ color: "#111827" }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                    </div>
                                    <a 
                                        href={`tel:${directPhone.replace(/\s+/g, '')}`} 
                                        className="text-decoration-none"
                                        style={{ 
                                            fontSize: "15px", 
                                            fontWeight: 600, 
                                            color: "#111827", 
                                            letterSpacing: "0.5px" 
                                        }}
                                    >
                                        {directPhone}
                                    </a>
                                </div>

                                {/* Email */}
                                {directEmail && (
                                    <div className="d-flex align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #e5e0d8" }}>
                                        <div className="me-3" style={{ color: "#111827" }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="16" x="2" y="4" rx="2"/>
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                            </svg>
                                        </div>
                                        <a 
                                            href={`mailto:${directEmail}`} 
                                            className="text-decoration-none text-truncate"
                                            style={{ 
                                                fontSize: "14px", 
                                                color: "#4b5563" 
                                            }}
                                            title={directEmail}
                                        >
                                            {directEmail}
                                        </a>
                                    </div>
                                )}

                                {/* Opening Hours */}
                                <div className="d-flex align-items-center">
                                    <div className="me-3" style={{ color: "#111827" }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                    </div>
                                    <span style={{ fontSize: "14px", color: "#4b5563" }}>
                                        {openingHours}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Slider / Image Carousel */}
                    <div className="dining-carousel-container position-relative mb-5" style={{ overflow: "hidden", backgroundColor: "#000" }}>
                        <div 
                            className="carousel-slides-track" 
                            style={{ 
                                position: "relative",
                                width: "100%",
                                height: "clamp(340px, 60vw, 680px)",
                                overflow: "hidden" 
                            }}
                        >
                            {galleryImages.map((imgUrl: string, idx: number) => (
                                <div 
                                    key={idx}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        opacity: idx === activeImageIndex ? 1 : 0,
                                        visibility: idx === activeImageIndex ? "visible" : "hidden",
                                        transition: "opacity 0.8s ease-in-out, visibility 0.8s ease-in-out",
                                        backgroundImage: `url('${imgUrl}')`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat"
                                    }}
                                />
                            ))}

                            {/* Left Arrow Button */}
                            {galleryImages.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={handlePrevImage}
                                    aria-label="Previous image"
                                    className="carousel-control-btn position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center ms-3 ms-md-4"
                                    style={{ 
                                        width: "48px", 
                                        height: "48px", 
                                        borderRadius: "50%", 
                                        backgroundColor: "rgba(255, 255, 255, 0.85)", 
                                        color: "#111827",
                                        border: "none",
                                        cursor: "pointer",
                                        zIndex: 10,
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
                                        e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="19" y1="12" x2="5" y2="12"></line>
                                        <polyline points="12 19 5 12 12 5"></polyline>
                                    </svg>
                                </button>
                            )}

                            {/* Right Arrow Button */}
                            {galleryImages.length > 1 && (
                                <button 
                                    type="button" 
                                    onClick={handleNextImage}
                                    aria-label="Next image"
                                    className="carousel-control-btn position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center me-3 me-md-4"
                                    style={{ 
                                        width: "48px", 
                                        height: "48px", 
                                        borderRadius: "50%", 
                                        backgroundColor: "rgba(255, 255, 255, 0.85)", 
                                        color: "#111827",
                                        border: "none",
                                        cursor: "pointer",
                                        zIndex: 10,
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = "#ffffff";
                                        e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
                                        e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            )}

                            {/* Bottom Dots & Autoplay Indicator */}
                            {galleryImages.length > 1 && (
                                <div 
                                    className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex align-items-center gap-2"
                                    style={{ zIndex: 10 }}
                                >
                                    {galleryImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveImageIndex(idx)}
                                            aria-label={`Slide ${idx + 1}`}
                                            style={{
                                                width: idx === activeImageIndex ? "10px" : "8px",
                                                height: idx === activeImageIndex ? "10px" : "8px",
                                                borderRadius: "50%",
                                                backgroundColor: idx === activeImageIndex ? "#ffffff" : "rgba(255, 255, 255, 0.45)",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease"
                                            }}
                                        />
                                    ))}

                                    {/* Play / Pause Autoplay button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                                        className="ms-2 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "22px",
                                            height: "22px",
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                                            color: "#ffffff",
                                            border: "1px solid rgba(255, 255, 255, 0.6)",
                                            padding: 0,
                                            cursor: "pointer"
                                        }}
                                    >
                                        {isPlaying ? (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                                <rect x="6" y="4" width="4" height="16"/>
                                                <rect x="14" y="4" width="4" height="16"/>
                                            </svg>
                                        ) : (
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="5 3 19 12 5 21 5 3"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Restaurant Navigation Bar */}
                    <div 
                        className="bottom-restaurant-nav d-flex justify-content-between align-items-center py-4 px-2 mt-4"
                        style={{ 
                            borderTop: "1px solid #e5e0d8",
                            borderBottom: "1px solid #e5e0d8"
                        }}
                    >
                        {/* Prev Restaurant */}
                        <div>
                            {prevOutlet ? (
                                <Link 
                                    href={`/${hotelSlug}/dining/${prevOutlet.slug || prevOutlet.id}`}
                                    className="text-decoration-none d-inline-flex align-items-center"
                                    style={{ 
                                        fontSize: "12px", 
                                        fontWeight: 600, 
                                        letterSpacing: "1.5px", 
                                        textTransform: "uppercase", 
                                        color: "#111827" 
                                    }}
                                >
                                    <span className="me-1">‹</span> PREV RESTAURANT
                                </Link>
                            ) : (
                                <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase" }}>
                                    ‹ PREV RESTAURANT
                                </span>
                            )}
                        </div>

                        {/* View All Restaurants */}
                        <div>
                            <Link 
                                href={`/${hotelSlug}#dining`}
                                className="text-decoration-none"
                                style={{ 
                                    fontSize: "12px", 
                                    fontWeight: 600, 
                                    letterSpacing: "1.5px", 
                                    textTransform: "uppercase", 
                                    color: "#111827",
                                    borderBottom: "1px solid #111827",
                                    paddingBottom: "2px"
                                }}
                            >
                                VIEW ALL RESTAURANTS
                            </Link>
                        </div>

                        {/* Next Restaurant */}
                        <div>
                            {nextOutlet ? (
                                <Link 
                                    href={`/${hotelSlug}/dining/${nextOutlet.slug || nextOutlet.id}`}
                                    className="text-decoration-none d-inline-flex align-items-center"
                                    style={{ 
                                        fontSize: "12px", 
                                        fontWeight: 600, 
                                        letterSpacing: "1.5px", 
                                        textTransform: "uppercase", 
                                        color: "#111827" 
                                    }}
                                >
                                    NEXT RESTAURANT <span className="ms-1">›</span>
                                </Link>
                            ) : (
                                <span style={{ fontSize: "12px", letterSpacing: "1.5px", color: "#9ca3af", textTransform: "uppercase" }}>
                                    NEXT RESTAURANT ›
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <HotelFooter 
                hotelName={propertyData?.name || "Bahi Ajman Palace Hotel"}
                hotelPhone={propertyData?.phone || "+971 6 701 8888"}
                hotelSlug={hotelSlug}
                logoUrl={propertyData?.footer_logo || propertyData?.logo} hotelEmail={propertyData?.email}
            />
        </div>
    );
}

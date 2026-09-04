'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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
    latitude?: number | string | null;
    longitude?: number | string | null;
    phone?: string;
    email?: string;
    travelclick_hotel_id?: string;
    website?: string;
    google_location?: string;
    star_rating?: number;
}

interface BrandHotelMapProps {
    hotels: ChildHotel[];
    brandName: string;
    contactUrl?: string;
    sectionTitle?: string;
}

function resolveImage(img: string | undefined | null, fallback: string = ''): string {
    if (!img) return fallback;
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
    const clean = img.replace(/^\/?(uploads\/|storage\/)?/, '');
    return `/uploads/${clean}`;
}

function getShortHotelName(name: string): string {
    if (/sharjah/i.test(name)) return 'Sharjah';
    if (/deira|dubai/i.test(name)) return 'Dubai';
    if (/jubail/i.test(name)) return 'Al Jubail';
    if (/ajman/i.test(name)) return 'Ajman';
    if (/amman/i.test(name)) return 'Amman';
    if (/makkah/i.test(name)) return 'Makkah';
    return name.split(' ')[0] || name;
}

export default function BrandHotelMap({
    hotels,
    brandName,
    contactUrl = '/contact',
    sectionTitle = 'WHERE WE ARE'
}: BrandHotelMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<{ [key: number]: any }>({});
    const boundsRef = useRef<any>(null);
    const [activeHotelId, setActiveHotelId] = useState<number | null>(null); // null means "All Hotels"
    const [cardHotelIndex, setCardHotelIndex] = useState<number>(0);

    // Filter hotels that have valid coordinates
    const validHotels = hotels.filter(h => {
        const lat = parseFloat(String(h.latitude || ''));
        const lng = parseFloat(String(h.longitude || ''));
        return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
    });

    const displayHotels = validHotels.length > 0 ? validHotels : hotels;
    const activeHotel = displayHotels[cardHotelIndex] || displayHotels[0];

    useEffect(() => {
        if (!mapContainerRef.current || displayHotels.length === 0) return;

        let isMounted = true;

        const initMap = async () => {
            const L = (await import('leaflet')).default;

            if (!isMounted || !mapContainerRef.current) return;

            // If map already initialized, remove it
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            // Create custom hotel pin icon with badge
            const createIcon = (hotel: ChildHotel, isActive: boolean) => {
                const fill = isActive ? '#c59b4c' : '#ffffff';
                const stroke = isActive ? '#ffffff' : '#231f20';
                const width = isActive ? 34 : 26;
                const height = isActive ? 42 : 32;
                const shortName = getShortHotelName(hotel.name);

                const svgHtml = `
                    <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 30" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); transition: transform 0.25s ease;">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.627-5.373-12-12-12zm0 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
                        </svg>
                        <span style="margin-top: -3px; background: ${isActive ? '#231f20' : '#ffffff'}; color: ${isActive ? '#c59b4c' : '#231f20'}; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid ${isActive ? '#c59b4c' : '#cccccc'}; letter-spacing: 0.3px; font-family: sans-serif;">
                            ${shortName}
                        </span>
                    </div>
                `;

                return L.divIcon({
                    className: 'custom-hotel-pin',
                    html: svgHtml,
                    iconSize: [width, height + 20],
                    iconAnchor: [width / 2, height + 8],
                    popupAnchor: [0, -height - 8]
                });
            };

            // Calculate geographical center of all hotels
            let totalLat = 0;
            let totalLng = 0;
            displayHotels.forEach(h => {
                totalLat += parseFloat(String(h.latitude || 25.2));
                totalLng += parseFloat(String(h.longitude || 55.2));
            });
            const centerLat = totalLat / displayHotels.length;
            const centerLng = totalLng / displayHotels.length;

            // Initialize map with initial zoom out so all points are visible at a glance
            const map = L.map(mapContainerRef.current, {
                center: [centerLat, centerLng],
                zoom: 6,
                zoomControl: true,
                scrollWheelZoom: false
            });

            mapInstanceRef.current = map;

            // ══════════════════════════════════════════════════════════════════════
            // 100% FREE, NO WATERMARK, NO API KEY REQUIRED MAP TILES (Esri World Light Gray)
            // ══════════════════════════════════════════════════════════════════════
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                maxZoom: 16
            }).addTo(map);

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
                attribution: '',
                maxZoom: 16
            }).addTo(map);

            const bounds = L.latLngBounds([]);
            markersRef.current = {};

            displayHotels.forEach((hotel, idx) => {
                const lat = parseFloat(String(hotel.latitude || ''));
                const lng = parseFloat(String(hotel.longitude || ''));

                if (!isNaN(lat) && !isNaN(lng)) {
                    const marker = L.marker([lat, lng], {
                        icon: createIcon(hotel, displayHotels.length === 1),
                        title: hotel.name
                    }).addTo(map);

                    const popupContent = `
                        <div style="font-family: inherit; padding: 4px 2px; min-width: 180px;">
                            <strong style="display: block; font-size: 0.95rem; color: #111; margin-bottom: 4px;">${hotel.name}</strong>
                            <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #666; line-height: 1.4;">${hotel.address || hotel.city || ''}</p>
                            ${hotel.phone ? `<p style="margin: 0 0 8px 0; font-size: 0.82rem; color: #c59b4c;"><a href="tel:${hotel.phone}" style="color: #c59b4c; text-decoration: none;">${hotel.phone}</a></p>` : ''}
                            <a href="/${hotel.slug}" style="display: inline-block; font-size: 0.8rem; font-weight: 600; color: #111; text-transform: uppercase; border-bottom: 1px solid #c59b4c; text-decoration: none; padding-bottom: 2px;">View Hotel &rarr;</a>
                        </div>
                    `;
                    marker.bindPopup(popupContent);

                    marker.on('click', () => {
                        handleSelectHotel(hotel.id, idx);
                    });

                    bounds.extend([lat, lng]);
                    markersRef.current[hotel.id] = marker;
                }
            });

            boundsRef.current = bounds;

            // Automatically zoom out to show all markers at a glance on initial load
            setTimeout(() => {
                if (!isMounted || !mapInstanceRef.current) return;
                map.invalidateSize();
                if (bounds.isValid() && displayHotels.length > 1) {
                    const isDesktop = window.innerWidth > 991;
                    map.fitBounds(bounds, {
                        paddingTopLeft: [50, 50],
                        paddingBottomRight: [isDesktop ? 400 : 50, 50],
                        maxZoom: 7 // Keeps the view zoomed out so all multiple hotel points are visible at a glance
                    });
                } else if (bounds.isValid()) {
                    const isDesktop = window.innerWidth > 991;
                    map.setView(bounds.getCenter(), 13);
                    if (isDesktop) {
                        map.panBy([-150, 0], { animate: false });
                    }
                }
            }, 200);
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [displayHotels.length]);

    // Handle selecting a specific hotel or zooming out to all
    const handleSelectHotel = async (hotelId: number | null, hotelIdx?: number) => {
        if (!mapInstanceRef.current) return;
        const map = mapInstanceRef.current;
        const L = (await import('leaflet')).default;

        if (hotelId === null) {
            // "All Hotels" selected - Zoom out to see all multiple map points
            setActiveHotelId(null);
            if (boundsRef.current && boundsRef.current.isValid()) {
                const isDesktop = window.innerWidth > 991;
                map.fitBounds(boundsRef.current, {
                    paddingTopLeft: [50, 50],
                    paddingBottomRight: [isDesktop ? 400 : 50, 50],
                    maxZoom: 7
                });
            }

            // Reset all icons to inactive
            displayHotels.forEach(h => {
                const m = markersRef.current[h.id];
                if (m) {
                    m.closePopup();
                    m.setIcon(createMarkerIcon(L, h, false));
                }
            });
            return;
        }

        // Specific hotel selected
        setActiveHotelId(hotelId);
        const resolvedIdx = hotelIdx !== undefined ? hotelIdx : displayHotels.findIndex(h => h.id === hotelId);
        if (resolvedIdx >= 0) {
            setCardHotelIndex(resolvedIdx);
        }

        const hotel = displayHotels.find(h => h.id === hotelId);
        if (!hotel) return;

        const lat = parseFloat(String(hotel.latitude || ''));
        const lng = parseFloat(String(hotel.longitude || ''));

        if (!isNaN(lat) && !isNaN(lng)) {
            // Fly to hotel location
            map.flyTo([lat, lng], 13, {
                duration: 1.2
            });

            // Update icons: highlight active hotel
            displayHotels.forEach(h => {
                const m = markersRef.current[h.id];
                if (m) {
                    const isActive = h.id === hotelId;
                    m.setIcon(createMarkerIcon(L, h, isActive));
                    if (isActive) {
                        m.openPopup();
                    }
                }
            });
        }
    };

    const createMarkerIcon = (L: any, hotel: ChildHotel, isActive: boolean) => {
        const fill = isActive ? '#c59b4c' : '#ffffff';
        const stroke = isActive ? '#ffffff' : '#231f20';
        const width = isActive ? 34 : 26;
        const height = isActive ? 42 : 32;
        const shortName = getShortHotelName(hotel.name);

        const svgHtml = `
            <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 30" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); transition: transform 0.25s ease;">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 18 12 18s12-9.5 12-18c0-6.627-5.373-12-12-12zm0 16.5c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
                </svg>
                <span style="margin-top: -3px; background: ${isActive ? '#231f20' : '#ffffff'}; color: ${isActive ? '#c59b4c' : '#231f20'}; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid ${isActive ? '#c59b4c' : '#cccccc'}; letter-spacing: 0.3px; font-family: sans-serif;">
                    ${shortName}
                </span>
            </div>
        `;

        return L.divIcon({
            className: 'custom-hotel-pin',
            html: svgHtml,
            iconSize: [width, height + 20],
            iconAnchor: [width / 2, height + 8],
            popupAnchor: [0, -height - 8]
        });
    };

    if (displayHotels.length === 0) return null;

    const coverImg = resolveImage(
        activeHotel?.cover_image || activeHotel?.banner_images?.[0],
        '/uploads/banner_6a917e6963e1e.jpg'
    );

    return (
        <section className="brand-map-plus-contact-details">
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                crossOrigin=""
            />
            <style jsx>{`
                .brand-map-plus-contact-details {
                    padding: 70px 0 100px 0;
                    background-color: #f7f7f7;
                    position: relative;
                }
                .brand-map-contact-intro {
                    max-width: 1440px;
                    margin: 0 auto 35px auto;
                    padding: 0 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .brand-map-contact-title {
                    position: relative;
                }
                .map-main-title {
                    font-size: 2.2rem;
                    font-weight: 400;
                    color: #111111;
                    letter-spacing: 1.5px;
                    margin: 0;
                    text-transform: uppercase;
                }
                .brand-map-contact-link a {
                    font-size: 0.95rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: #111111;
                    text-transform: uppercase;
                    text-decoration: none;
                    border-bottom: 2px solid #c59b4c;
                    padding-bottom: 4px;
                    transition: color 0.3s ease, border-color 0.3s ease;
                }
                .brand-map-contact-link a:hover {
                    color: #c59b4c;
                }
                .hotel-selector-tabs {
                    max-width: 1440px;
                    margin: 0 auto 25px auto;
                    padding: 0 30px;
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .hotel-tab-btn {
                    background: #ffffff;
                    border: 1px solid #e0e0e0;
                    padding: 10px 20px;
                    border-radius: 4px;
                    font-size: 0.92rem;
                    font-weight: 500;
                    color: #333333;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.25s ease;
                }
                .hotel-tab-btn:hover {
                    border-color: #c59b4c;
                    color: #c59b4c;
                }
                .hotel-tab-btn.active {
                    background: #231f20;
                    border-color: #231f20;
                    color: #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .hotel-tab-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #c59b4c;
                }
                .hotel-tab-all-icon {
                    display: inline-flex;
                    align-items: center;
                }
                .brand-map-container-wrapper {
                    max-width: 1440px;
                    margin: 0 auto;
                    padding: 0 30px;
                    position: relative;
                }
                .brand-map-inner-layout {
                    position: relative;
                    min-height: 560px;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                }
                .brand-map-element {
                    width: 100%;
                    height: 560px;
                    background-color: #e5e3df;
                    z-index: 1;
                }
                /* Reset View Control Button */
                .map-zoom-all-btn {
                    position: absolute;
                    top: 80px;
                    left: 11px;
                    z-index: 1000;
                    background: #ffffff;
                    border: 2px solid rgba(0,0,0,0.2);
                    border-radius: 4px;
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #333;
                    transition: all 0.2s ease;
                }
                .map-zoom-all-btn:hover {
                    background: #231f20;
                    color: #c59b4c;
                }
                /* Floating Card on Right */
                .brand-floating-card {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    bottom: 24px;
                    width: 380px;
                    max-width: calc(100% - 48px);
                    background-color: #231f20;
                    color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
                    z-index: 10;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s ease;
                }
                .floating-card-image-wrap {
                    width: 100%;
                    height: 200px;
                    position: relative;
                    overflow: hidden;
                    flex-shrink: 0;
                }
                .floating-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }
                .brand-floating-card:hover .floating-card-image {
                    transform: scale(1.05);
                }
                .floating-card-body {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex-grow: 1;
                }
                .floating-hotel-name {
                    font-size: 1.25rem;
                    font-weight: 500;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #ffffff;
                    margin: 0 0 16px 0;
                    line-height: 1.35;
                }
                .floating-info-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 12px;
                    font-size: 0.92rem;
                    color: rgba(255, 255, 255, 0.85);
                    line-height: 1.5;
                }
                .floating-info-icon {
                    flex-shrink: 0;
                    color: #c59b4c;
                    margin-top: 3px;
                }
                .floating-hotel-phone {
                    color: #ffffff;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .floating-hotel-phone:hover {
                    color: #c59b4c;
                }
                .floating-card-footer {
                    margin-top: 16px;
                    padding-top: 16px;
                    border-top: 1px solid rgba(255, 255, 255, 0.15);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .floating-view-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    color: #c59b4c;
                    font-size: 0.9rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                    transition: color 0.2s ease, transform 0.2s ease;
                }
                .floating-view-link:hover {
                    color: #ffffff;
                    transform: translateX(4px);
                }
                .floating-nav-arrows {
                    display: flex;
                    gap: 8px;
                }
                .floating-arrow-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .floating-arrow-btn:hover {
                    background: #c59b4c;
                    border-color: #c59b4c;
                }

                @media (max-width: 991px) {
                    .brand-map-inner-layout {
                        display: flex;
                        flex-direction: column;
                    }
                    .brand-map-element {
                        height: 400px;
                    }
                    .brand-floating-card {
                        position: relative;
                        top: auto;
                        right: auto;
                        bottom: auto;
                        width: 100%;
                        max-width: 100%;
                        border-radius: 0;
                    }
                }
                @media (max-width: 768px) {
                    .brand-map-contact-intro {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }
                    .brand-map-container-wrapper {
                        padding: 0 15px;
                    }
                    .hotel-selector-tabs {
                        padding: 0 15px;
                    }
                }
            `}</style>

            {/* Intro Header */}
            <div className="brand-map-contact-intro">
                <div className="brand-map-contact-title">
                    <h2 className="map-main-title">{sectionTitle}</h2>
                </div>
                <div className="brand-map-contact-link">
                    <Link href={contactUrl}>
                        CONTACT US
                    </Link>
                </div>
            </div>

            {/* Hotel Selector Pills */}
            {displayHotels.length > 1 && (
                <div className="hotel-selector-tabs">
                    {/* "All Hotels" Button - Zooms out to see all multiple map points */}
                    <button
                        type="button"
                        className={`hotel-tab-btn ${activeHotelId === null ? 'active' : ''}`}
                        onClick={() => handleSelectHotel(null)}
                        title="Zoom out to see all hotels on map"
                    >
                        <span className="hotel-tab-all-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </span>
                        All Hotels ({displayHotels.length})
                    </button>

                    {/* Individual Hotel Buttons */}
                    {displayHotels.map((h, idx) => (
                        <button
                            key={h.id}
                            type="button"
                            className={`hotel-tab-btn ${activeHotelId === h.id ? 'active' : ''}`}
                            onClick={() => handleSelectHotel(h.id, idx)}
                        >
                            <span className="hotel-tab-dot" />
                            {h.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Map and Floating Card Wrapper */}
            <div className="brand-map-container-wrapper">
                <div className="brand-map-inner-layout">
                    {/* Interactive Leaflet Map */}
                    <div ref={mapContainerRef} className="brand-map-element" />

                    {/* Quick Button to Zoom Out to All Hotels */}
                    {displayHotels.length > 1 && (
                        <button
                            type="button"
                            className="map-zoom-all-btn"
                            title="Zoom out to see all hotel locations"
                            onClick={() => handleSelectHotel(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h6v6" />
                                <path d="M9 21H3v-6" />
                                <path d="M21 3l-7 7" />
                                <path d="M3 21l7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Floating Hotel Details Card */}
                    {activeHotel && (
                        <div className="brand-floating-card">
                            <div className="floating-card-image-wrap">
                                <img
                                    src={coverImg}
                                    alt={activeHotel.name}
                                    className="floating-card-image"
                                />
                            </div>
                            <div className="floating-card-body">
                                <div>
                                    <h3 className="floating-hotel-name">{activeHotel.name}</h3>
                                    
                                    {activeHotel.address && (
                                        <div className="floating-info-item">
                                            <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>{[activeHotel.address, activeHotel.city, activeHotel.country].filter(Boolean).join(', ')}</span>
                                        </div>
                                    )}

                                    {activeHotel.phone && (
                                        <div className="floating-info-item">
                                            <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                            <a href={`tel:${activeHotel.phone}`} className="floating-hotel-phone">
                                                {activeHotel.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="floating-card-footer">
                                    {activeHotel.google_location ? (
                                        <a href={activeHotel.google_location} target="_blank" rel="noopener noreferrer" className="floating-view-link">
                                            Get Directions &rarr;
                                        </a>
                                    ) : (
                                        <Link href={`/${activeHotel.slug}`} className="floating-view-link">
                                            View Hotel &rarr;
                                        </Link>
                                    )}

                                    {displayHotels.length > 1 && (
                                        <div className="floating-nav-arrows">
                                            <button
                                                type="button"
                                                className="floating-arrow-btn"
                                                aria-label="Previous Hotel"
                                                onClick={() => {
                                                    const newIdx = (cardHotelIndex - 1 + displayHotels.length) % displayHotels.length;
                                                    handleSelectHotel(displayHotels[newIdx].id, newIdx);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="15 18 9 12 15 6" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="floating-arrow-btn"
                                                aria-label="Next Hotel"
                                                onClick={() => {
                                                    const newIdx = (cardHotelIndex + 1) % displayHotels.length;
                                                    handleSelectHotel(displayHotels[newIdx].id, newIdx);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9 18 15 12 9 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

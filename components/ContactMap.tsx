'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { resolveImageUrl } from '@/services/api';

export interface LocationItem {
    id?: number | string;
    title?: string;
    name?: string;
    city?: string;
    country?: string;
    address?: string;
    phone?: string;
    email?: string;
    image?: string;
    image_url?: string;
    latitude?: number | string | null;
    longitude?: number | string | null;
    google_location?: string;
    map_url?: string;
}

interface ContactMapProps {
    locations?: LocationItem[];
    sectionTitle?: string;
}

function getShortLocationName(name: string, city?: string): string {
    if (city && city.trim()) return city.trim();
    if (/sharjah/i.test(name)) return 'Sharjah';
    if (/dubai/i.test(name)) return 'Dubai';
    if (/ajman/i.test(name)) return 'Ajman';
    if (/jubail/i.test(name)) return 'Al Jubail';
    if (/amman/i.test(name)) return 'Amman';
    if (/makkah/i.test(name)) return 'Makkah';
    return name.split(' ')[0] || name;
}

const fallbackLocations: LocationItem[] = [
    {
        id: 1,
        title: 'Dubai Corporate Office',
        city: 'Dubai',
        country: 'UAE',
        address: 'Suites 106/107, Madina Tower, Cluster O, Jumeirah Lake Towers, PO Box 66232, Dubai - UAE',
        phone: '+971 4 290 9999',
        email: 'central.reservations@hmhhotelgroup.com',
        image: '/uploads/contact_dubai_office.jpg',
        latitude: 25.07796,
        longitude: 55.14405,
    },
    {
        id: 2,
        title: 'Sharjah Corporate Office',
        city: 'Sharjah',
        country: 'UAE',
        address: '5th Floor, Gibca Building, Al Wahda Street, PO Box 1033, Sharjah - UAE',
        phone: '+971 4 290 9999',
        email: 'central.reservations@hmhhotelgroup.com',
        image: '/uploads/contact_sharjah_office.jpg',
        latitude: 25.29327,
        longitude: 55.37368,
    },
];

export default function ContactMap({
    locations,
    sectionTitle = 'WHERE WE ARE',
}: ContactMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<{ [key: string]: any }>({});
    const [activeLocationId, setActiveLocationId] = useState<string | number | null>(null);
    const [cardLocationIndex, setCardLocationIndex] = useState<number>(0);

    const rawLocations = locations && locations.length > 0 ? locations : fallbackLocations;

    const displayLocations = rawLocations.map((loc, idx) => {
        const id = loc.id ?? idx + 1;
        const name = loc.title || loc.name || `Location ${idx + 1}`;
        const lat = parseFloat(String(loc.latitude || (idx === 0 ? 25.07796 : 25.29327)));
        const lng = parseFloat(String(loc.longitude || (idx === 0 ? 55.14405 : 55.37368)));
        const img = loc.image_url || (loc.image ? resolveImageUrl(loc.image) : (idx === 0 ? '/uploads/contact_dubai_office.jpg' : '/uploads/contact_sharjah_office.jpg'));

        return {
            ...loc,
            id,
            name,
            latitude: isNaN(lat) ? 25.07796 : lat,
            longitude: isNaN(lng) ? 55.14405 : lng,
            image_url: img,
        };
    });

    const activeLocation = displayLocations[cardLocationIndex] || displayLocations[0];

    useEffect(() => {
        if (!mapContainerRef.current || displayLocations.length === 0) return;

        let isMounted = true;

        const initMap = async () => {
            const L = (await import('leaflet')).default;

            if (!isMounted || !mapContainerRef.current) return;

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }

            const createIcon = (loc: any, isActive: boolean) => {
                const fill = isActive ? '#c59b4c' : '#ffffff';
                const stroke = isActive ? '#ffffff' : '#231f20';
                const width = isActive ? 34 : 26;
                const height = isActive ? 42 : 32;
                const shortName = getShortLocationName(loc.name, loc.city);

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

            let totalLat = 0;
            let totalLng = 0;
            displayLocations.forEach(loc => {
                totalLat += Number(loc.latitude);
                totalLng += Number(loc.longitude);
            });
            const centerLat = totalLat / displayLocations.length;
            const centerLng = totalLng / displayLocations.length;

            const map = L.map(mapContainerRef.current, {
                center: [centerLat, centerLng],
                zoom: 10,
                zoomControl: true,
                scrollWheelZoom: false
            });

            mapInstanceRef.current = map;

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

            displayLocations.forEach((loc, idx) => {
                const lat = Number(loc.latitude);
                const lng = Number(loc.longitude);

                bounds.extend([lat, lng]);

                const marker = L.marker([lat, lng], {
                    icon: createIcon(loc, idx === cardLocationIndex)
                }).addTo(map);

                marker.on('click', () => {
                    handleSelectLocation(loc.id, idx);
                });

                markersRef.current[String(loc.id)] = { marker, loc, lat, lng };
            });

            if (displayLocations.length > 1) {
                map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
            } else {
                map.setView([centerLat, centerLng], 12);
            }
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [displayLocations.length]);

    const handleSelectLocation = (id: string | number | null, index?: number) => {
        setActiveLocationId(id);

        if (id === null) {
            // Zoom out to all
            if (mapInstanceRef.current) {
                const bounds = displayLocations.map(loc => [Number(loc.latitude), Number(loc.longitude)]);
                if (bounds.length > 0) {
                    mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
                }
            }
            return;
        }

        const idx = index !== undefined ? index : displayLocations.findIndex(loc => loc.id === id);
        if (idx !== -1) {
            setCardLocationIndex(idx);
            const loc = displayLocations[idx];
            if (loc && mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([Number(loc.latitude), Number(loc.longitude)], 13, { duration: 1.2 });
            }
        }
    };

    // Update marker icons when active selection changes
    useEffect(() => {
        if (!mapInstanceRef.current) return;

        const updateMarkers = async () => {
            const L = (await import('leaflet')).default;
            if (!L || !mapInstanceRef.current) return;

            displayLocations.forEach((loc, idx) => {
                const entry = markersRef.current[String(loc.id)];
                if (entry && entry.marker) {
                    const isActive = (activeLocationId === loc.id) || (activeLocationId === null && idx === cardLocationIndex);
                    const fill = isActive ? '#c59b4c' : '#ffffff';
                    const stroke = isActive ? '#ffffff' : '#231f20';
                    const width = isActive ? 34 : 26;
                    const height = isActive ? 42 : 32;
                    const shortName = getShortLocationName(loc.name, loc.city);

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

                    const newIcon = L.divIcon({
                        className: 'custom-hotel-pin',
                        html: svgHtml,
                        iconSize: [width, height + 20],
                        iconAnchor: [width / 2, height + 8],
                        popupAnchor: [0, -height - 8]
                    });

                    entry.marker.setIcon(newIcon);
                    if (isActive) {
                        entry.marker.setZIndexOffset(1000);
                    } else {
                        entry.marker.setZIndexOffset(0);
                    }
                }
            });
        };

        updateMarkers();
    }, [activeLocationId, cardLocationIndex, displayLocations]);

    return (
        <section className="brand-map-plus-contact-details" id="locations-map" style={{ backgroundColor: "#f7f7f7", padding: "60px 0 90px 0" }}>
            <link rel="stylesheet" href="/css/brand-map.css" />

            {/* Title Row */}
            {sectionTitle && (
                <div className="brand-map-contact-intro">
                    <div className="brand-map-contact-title">
                        <h2 className="map-main-title">{sectionTitle}</h2>
                    </div>
                </div>
            )}

            {/* Location Selector Tabs (Top) */}
            {displayLocations.length > 0 && (
                <div className="hotel-selector-tabs">
                    {/* "All Locations" Button */}
                    <button
                        type="button"
                        className={`hotel-tab-btn ${activeLocationId === null ? 'active' : ''}`}
                        onClick={() => handleSelectLocation(null)}
                    >
                        <span className="hotel-tab-all-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </span>
                        All Locations ({displayLocations.length})
                    </button>

                    {/* Individual Location Buttons */}
                    {displayLocations.map((loc, idx) => (
                        <button
                            key={loc.id}
                            type="button"
                            className={`hotel-tab-btn ${activeLocationId === loc.id ? 'active' : ''}`}
                            onClick={() => handleSelectLocation(loc.id, idx)}
                        >
                            <span className="hotel-tab-dot" />
                            {loc.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Map and Floating Card Wrapper */}
            <div className="brand-map-container-wrapper">
                <div className="brand-map-inner-layout">
                    {/* Interactive Leaflet Map */}
                    <div ref={mapContainerRef} className="brand-map-element" />

                    {/* Quick Button to Zoom Out to All Locations */}
                    {displayLocations.length > 1 && (
                        <button
                            type="button"
                            className="map-zoom-all-btn"
                            title="Zoom out to see all locations"
                            onClick={() => handleSelectLocation(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h6v6" />
                                <path d="M9 21H3v-6" />
                                <path d="M21 3l-7 7" />
                                <path d="M3 21l7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Floating Location Details Card (Matching Screenshot & Reference) */}
                    {activeLocation && (
                        <div className="brand-floating-card">
                            <div className="floating-card-image-wrap">
                                <img
                                    src={activeLocation.image_url}
                                    alt={activeLocation.name}
                                    className="floating-card-image"
                                    onError={(e) => {
                                        e.currentTarget.src = '/uploads/contact_dubai_office.jpg';
                                    }}
                                />
                            </div>
                            <div className="floating-card-body">
                                <div>
                                    <h3 className="floating-hotel-name">{activeLocation.name}</h3>

                                    {activeLocation.address && (
                                        <div className="floating-info-item">
                                            <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>{activeLocation.address}</span>
                                        </div>
                                    )}

                                    {activeLocation.phone && (
                                        <div className="floating-info-item">
                                            <svg className="floating-info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.48 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.07 6.07l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                            <a href={`tel:${activeLocation.phone.replace(/\s+/g, '')}`} className="floating-hotel-phone">
                                                {activeLocation.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="floating-card-footer">
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((activeLocation.address || activeLocation.name || '') + ' ' + (activeLocation.city || ''))}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="floating-view-link"
                                    >
                                        Get Directions &rarr;
                                    </a>

                                    {displayLocations.length > 1 && (
                                        <div className="floating-nav-arrows">
                                            <button
                                                type="button"
                                                className="floating-arrow-btn"
                                                aria-label="Previous Location"
                                                onClick={() => {
                                                    const newIdx = (cardLocationIndex - 1 + displayLocations.length) % displayLocations.length;
                                                    handleSelectLocation(displayLocations[newIdx].id, newIdx);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="15 18 9 12 15 6" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                className="floating-arrow-btn"
                                                aria-label="Next Location"
                                                onClick={() => {
                                                    const newIdx = (cardLocationIndex + 1) % displayLocations.length;
                                                    handleSelectLocation(displayLocations[newIdx].id, newIdx);
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
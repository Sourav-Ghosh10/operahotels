"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllOffersData, getAllHotels, getOfferTypes } from '@/services/api';

export default function OffersSection() {
    const searchParams = useSearchParams();
    const initialHotelQuery = searchParams.get('hotel') || '';
    const initialTypeQuery = searchParams.get('type') || '';

    const [allOffers, setAllOffers] = useState<any[]>([]);
    const [hotelsList, setHotelsList] = useState<any[]>([]);
    const [typesList, setTypesList] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter state initialized from URL query params
    const [selectedHotel, setSelectedHotel] = useState(initialHotelQuery);
    const [selectedType, setSelectedType] = useState(initialTypeQuery);
    const [applied, setApplied] = useState({
        hotel: initialHotelQuery,
        type: initialTypeQuery,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [offers, hotels, types] = await Promise.all([
                    getAllOffersData(),
                    getAllHotels(),
                    getOfferTypes()
                ]);

                if (Array.isArray(offers)) setAllOffers(offers);
                if (Array.isArray(hotels) && hotels.length > 0) setHotelsList(hotels);
                if (Array.isArray(types) && types.length > 0) setTypesList(types);
            } catch (err) {
                console.error("Error loading offers or filter data:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Build unique hotel list: dynamically from API hotels, with fallback to offers
    const hotelOptions = useMemo(() => {
        const map = new Map<string, string>(); // slug -> display name
        hotelsList.forEach((h: any) => {
            if (h.slug && h.name) map.set(h.slug, h.name);
        });
        allOffers.forEach((o: any) => {
            if (o.hotel_slug && o.hotel_name && o.hotel_slug !== 'offers') {
                map.set(o.hotel_slug, o.hotel_name);
            }
        });
        return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
    }, [hotelsList, allOffers]);

    // Build unique offer-type list from API and offer records
    const typeOptions = useMemo(() => {
        const set = new Set<string>();
        typesList.forEach((t) => {
            if (t && t.trim()) set.add(t.trim());
        });
        allOffers.forEach((o: any) => {
            if (o.offer_type && o.offer_type.trim()) set.add(o.offer_type.trim());
        });
        return Array.from(set);
    }, [typesList, allOffers]);

    // Keep filter synced if URL search params change (e.g. navigation between hotel links)
    useEffect(() => {
        const h = searchParams.get('hotel') || '';
        const t = searchParams.get('type') || '';
        setSelectedHotel(h);
        setSelectedType(t);
        setApplied({ hotel: h, type: t });
    }, [searchParams]);

    // Normalize selectedHotel to the matching canonical slug if user passed name or uppercase
    useEffect(() => {
        if (selectedHotel && hotelOptions.length > 0) {
            const lower = selectedHotel.toLowerCase().trim();
            const matched = hotelOptions.find(
                h => h.slug.toLowerCase() === lower || h.name.toLowerCase() === lower
            );
            if (matched && matched.slug !== selectedHotel) {
                setSelectedHotel(matched.slug);
                setApplied(prev => ({ ...prev, hotel: matched.slug }));
            }
        }
    }, [hotelOptions, selectedHotel]);

    // Apply filters on Search click
    const handleSearch = () => {
        setApplied({ hotel: selectedHotel, type: selectedType });
    };

    // Reset on clear
    const handleClear = () => {
        setSelectedHotel('');
        setSelectedType('');
        setApplied({ hotel: '', type: '' });
    };

    // Filtered offers matching applied hotel and type
    const filtered = useMemo(() => {
        return allOffers.filter((o) => {
            const targetHotel = applied.hotel ? applied.hotel.toLowerCase().trim() : '';
            const hotelMatch =
                !targetHotel ||
                (o.hotel_slug && o.hotel_slug.toLowerCase() === targetHotel) ||
                (o.hotel_name && o.hotel_name.toLowerCase() === targetHotel) ||
                String(o.hotel_id) === targetHotel ||
                String(o.hotel) === targetHotel;

            const targetType = applied.type ? applied.type.toLowerCase().trim() : '';
            const typeMatch =
                !targetType ||
                (o.offer_type || '').toLowerCase().trim() === targetType ||
                (o.badge || '').toLowerCase().trim() === targetType;

            return hotelMatch && typeMatch;
        });
    }, [allOffers, applied]);

    return (
        <>
            {/* Offers Filter Bar */}
            <section className="offers-intro">
                <div className="container text-center">
                    <h2 className="section-title">GREAT OFFERS ARE JUST A CLICK</h2>
                    <p className="offers-p">
                        Unbeatable pricing just for you / holidays.<br />
                        Elevate your stay with exclusive offers designed to enhance every moment of your journey.
                    </p>

                    <div className="offers-filters">
                        {/* Dynamic Hotel Filter */}
                        <select
                            className="offers-filter-select"
                            value={selectedHotel}
                            onChange={(e) => setSelectedHotel(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        >
                            <option value="">All Hotels</option>
                            {hotelOptions.map(({ slug, name }) => (
                                <option key={slug} value={slug}>{name}</option>
                            ))}
                        </select>

                        {/* Dynamic Offer Type Filter */}
                        <select
                            className="offers-filter-select"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        >
                            <option value="">All type of offers</option>
                            {typeOptions.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>

                        <button className="offers-search-btn" onClick={handleSearch} type="button">
                            Search <i className="fas fa-arrow-right"></i>
                        </button>

                        {/* Show clear button when a filter is active */}
                        {(applied.hotel || applied.type || selectedHotel || selectedType) && (
                            <button className="offers-clear-btn" onClick={handleClear} type="button">
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Offers Grid */}
            <section className="offers-grid-section">
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-5">
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>
                                No offers found matching your criteria.
                            </p>
                            <button className="offers-clear-btn mt-3" onClick={handleClear} type="button">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="row g-4 justify-content-center">
                            {filtered.map((offer: any, index: number) => {
                                const offerName = offer.name?.en || offer.name || '';
                                const bannerImg = offer.banner_image || offer.image || '';
                                const badge = offer.badge || (offer.offer_type ? offer.offer_type.toUpperCase() : '');
                                const detailUrl = `/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug || ''}`;

                                return (
                                    <div key={offer.id || index} className="col-12 col-md-6 col-lg-3">
                                        <div className="offer-card">
                                            <div className="offer-img-wrapper">
                                                {bannerImg && <img src={bannerImg} alt={offerName} />}
                                                {badge && <div className="offer-tag">{badge}</div>}
                                            </div>
                                            <div className="offer-content">
                                                <h4 className="offer-title">{offerName}</h4>
                                                <div className="offer-hover-details">
                                                    <a href={detailUrl} className="offer-readmore">READ MORE</a>
                                                    <a href={detailUrl} className="btn btn-offer-book">BOOK NOW</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

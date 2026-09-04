"use client";
import React, { useEffect, useState } from 'react';
import { getAllOffersData } from '@/services/api';

export default function OffersGrid() {
    const [offersData, setOffersData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            const data = await getAllOffersData();
            if (data && Array.isArray(data)) {
                setOffersData(data);
            }
            setLoading(false);
        };
        fetchOffers();
    }, []);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="offers-grid-section">
            <div className="container">
                <div className="row g-4 justify-content-center">
                    {offersData.map((offer: any, index: number) => {
                        const offerName = offer.name?.en || offer.name || '';
                        const bannerImg = offer.banner_image || offer.image || '';
                        
                        // We extract the badge if present, or provide a default
                        const badge = offer.badge || (offer.offer_type ? offer.offer_type.toUpperCase() : '');
                        
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
                                            <a
                                                href={`/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug || ''}`}
                                                className="offer-readmore"
                                            >
                                                READ MORE
                                            </a>
                                            <a
                                                href={`/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug || ''}`}
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
            </div>
        </section>
    );
}

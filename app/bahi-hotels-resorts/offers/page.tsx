"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPropertyBySlug, getAllOffersData, resolveImageUrl } from '@/services/api';

export default function BahiOffersPage() {
    const [brandData, setBrandData] = useState<any>(null);
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                const [bData, allOffers] = await Promise.all([
                    getPropertyBySlug('bahi-hotels-resorts'),
                    getAllOffersData()
                ]);

                if (isMounted) {
                    setBrandData(bData);

                    if (Array.isArray(allOffers)) {
                        // Include offers related to Bahi brand or Bahi hotels (e.g. Bahi Ajman Palace)
                        const bahiOffers = allOffers.filter((o: any) => {
                            const nameMatch = /bahi/i.test(o.hotel_name || '') || /bahi/i.test(o.hotel_slug || '');
                            const brandMatch = o.brand_slug === 'bahi-hotels-resorts';
                            return nameMatch || brandMatch;
                        });
                        setOffers(bahiOffers);
                    }
                }
            } catch (err) {
                console.error("Failed to load Bahi offers:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    const brandName = brandData?.name || 'Bahi Hotels & Resorts';
    const heroImg = resolveImageUrl(
        brandData?.banner_images?.[0] || brandData?.cover_image || '/img/uae_wide 1.png'
    );

    return (
        <main>
            <link rel="stylesheet" href="/css/offers.css" />

            {/* Hero Section */}
            <header className="hero-section position-relative" style={{ minHeight: '420px', height: '52vh' }}>
                <div
                    className="position-absolute w-100 h-100 top-0 start-0"
                    style={{
                        backgroundImage: `url('${heroImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }}
                />
                <div className="hero-overlay" />

                <HotelHeader logoUrl={brandData?.logo} hotelSlug="bahi-hotels-resorts" />

                <div className="hero-content position-relative text-center text-white" style={{ zIndex: 10, paddingTop: '40px' }}>
                    <p className="text-uppercase mb-2" style={{ letterSpacing: '3px', fontSize: '0.9rem', color: '#c59b4c' }}>
                        {brandName}
                    </p>
                    <h1 className="main-title" style={{ fontSize: '3rem', letterSpacing: '3px', fontWeight: 600 }}>
                        SPECIAL OFFERS
                    </h1>
                </div>
            </header>

            

            {/* Main Offers Grid Section */}
            <section style={{ padding: '70px 0 100px 0', backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h5 style={{ color: '#c59b4c', letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                            EXCLUSIVE EXPERIENCES &amp; PACKAGES
                        </h5>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 400, color: '#111111', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                            OFFERS AT {brandName.toUpperCase()}
                        </h2>
                        <div style={{ width: '60px', height: '2px', backgroundColor: '#c59b4c', margin: '18px auto 0 auto' }} />
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border" style={{ color: '#c59b4c' }} role="status">
                                <span className="visually-hidden">Loading offers...</span>
                            </div>
                        </div>
                    ) : offers.length === 0 ? (
                        <div className="text-center py-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6 }}>
                                There are currently no active promotional packages for this brand. Please explore all Opera Hotels offers below.
                            </p>
                            <Link href="/offers" className="btn btn-outline-dark mt-3 px-4 py-2" style={{ letterSpacing: '1px', textTransform: 'uppercase' }}>
                                View All Offers
                            </Link>
                        </div>
                    ) : (
                        <div className="row g-4 justify-content-center">
                            {offers.map((offer: any, idx: number) => {
                                const offerTitle = (typeof offer.name === 'object' ? offer.name?.en : offer.name) || '';
                                const rawImg = (offer.images && offer.images.length > 0) ? offer.images[0] : (offer.banner_image || offer.image || '');
                                const offerImg = resolveImageUrl(rawImg);
                                const offerSlug = offer.slug || (offerTitle ? offerTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '');
                                const detailUrl = `/${offer.hotel_slug || 'bahi-hotels-resorts'}/special-offers/${offerSlug}`;
                                const badge = offer.badge || (offer.discount_percentage ? `${offer.discount_percentage}% OFF` : (offer.offer_type ? String(offer.offer_type).toUpperCase() : ''));

                                return (
                                    <div key={offer.id || idx} className="col-12 col-md-6 col-lg-3">
                                        <div className="offer-card">
                                            <div className="offer-img-wrapper">
                                                {offerImg ? (
                                                    <img src={offerImg} alt={offerTitle} />
                                                ) : (
                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#231f20', color: '#c59b4c' }}>
                                                        <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Bahi Hotels</span>
                                                    </div>
                                                )}
                                                {badge && <div className="offer-tag">{badge}</div>}
                                            </div>
                                            <div className="offer-content">
                                                <h4 className="offer-title">{offerTitle}</h4>
                                                <div className="offer-hover-details">
                                                    <Link href={detailUrl} className="offer-readmore">READ MORE</Link>
                                                    <Link href={detailUrl} className="btn btn-offer-book">BOOK NOW</Link>
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

            <OurBrandsBar />

            <HotelFooter
                logoUrl={brandData?.footer_logo || brandData?.logo}
                hotelName={brandName}
                hotelSlug="bahi-hotels-resorts"
                hotelPhone={brandData?.phone}
                hotelAddress={brandData?.address}
                hotelEmail={brandData?.email}
            />
        </main>
    );
}

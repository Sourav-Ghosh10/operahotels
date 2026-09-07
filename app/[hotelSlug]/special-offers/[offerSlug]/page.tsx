"use client";
import React, { useState, useEffect } from 'react';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { useParams } from 'next/navigation';
import { getOfferBySlug, resolveImageUrl } from '@/services/api';

export default function OfferDetailsPage() {
    const params = useParams();
    const [offer, setOffer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const slug = Array.isArray(params?.offerSlug) ? params.offerSlug[0] : params?.offerSlug;
        if (!slug) return;
        
        let isMounted = true;
        const fetchOffer = async () => {
            try {
                const data = await getOfferBySlug(slug as string);
                if (isMounted && data) {
                    setOffer(data);
                }
            } catch (err) {
                console.error("Failed to load offer:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchOffer();
        return () => { isMounted = false; };
    }, [params]);

    if (loading) {
        return (
            <main>
                <HotelHeader logoUrl={resolveImageUrl(offer?.brand_logo)} />
                <div className="container mt-5 pt-5 text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <HotelFooter logoUrl={resolveImageUrl(offer?.brand_logo)} />
            </main>
        );
    }

    if (!offer) {
        return (
            <main>
                <HotelHeader logoUrl={resolveImageUrl(offer?.brand_logo)} />
                <div className="container mt-5 pt-5 text-center">
                    <h2>Offer Not Found</h2>
                    <a href="/offers" className="btn btn-outline-dark mt-3">Back to Offers</a>
                </div>
                <HotelFooter logoUrl={resolveImageUrl(offer?.brand_logo)} />
            </main>
        );
    }

    const title = (typeof offer.name === 'object' ? offer.name?.en : offer.name) || '';
    const description = (typeof offer.details_content === 'object' ? offer.details_content?.en : offer.details_content)
        || (typeof offer.description === 'object' ? offer.description?.en : offer.description)
        || '';
    const rawBannerImg = offer.images && offer.images.length > 0 ? offer.images[0] : (offer.banner_image || '');
    const bannerImg = resolveImageUrl(rawBannerImg);

    return (
        <main>
            <HotelHeader logoUrl={resolveImageUrl(offer?.brand_logo)} />
            
            {/* Hero Image Section */}
            <div 
                className="offer-hero d-flex align-items-center justify-content-center" 
                style={{ 
                    backgroundImage: bannerImg ? `url(${bannerImg})` : 'none', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    height: '60vh',
                    position: 'relative'
                }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
                <div className="text-center text-white" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="mb-4 text-center">
                            <h2 style={{ color: '#0f204b', fontWeight: 'bold' }}>{title}</h2>
                            <div style={{ width: '60px', height: '3px', backgroundColor: '#c89d52', margin: '15px auto' }}></div>
                        </div>
                        
                        <div className="offer-content-body" style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }} dangerouslySetInnerHTML={{ __html: description }} />
                        
                        <div className="text-center mt-5">
                            <a href="#" className="btn btn-primary" style={{ backgroundColor: '#0f204b', borderColor: '#0f204b', padding: '12px 30px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <OurBrandsBar />
            <HotelFooter logoUrl={resolveImageUrl(offer?.footer_logo || offer?.brand_logo)} />
        </main>
    );
}

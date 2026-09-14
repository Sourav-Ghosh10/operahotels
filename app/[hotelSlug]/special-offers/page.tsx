import React from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPropertyBySlug, getAllOffersData, resolveImageUrl } from '@/services/api';

export default async function HotelSpecialOffersPage({ params }: { params: Promise<{ hotelSlug: string }> }) {
    const { hotelSlug } = await params;

    const [hotelData, allOffers] = await Promise.all([
        getPropertyBySlug(hotelSlug),
        getAllOffersData()
    ]);

    const targetSlug = hotelSlug.toLowerCase();
    const propId = hotelData?.id ? Number(hotelData.id) : null;
    const propName = hotelData?.name ? hotelData.name.toLowerCase() : '';
    const childHotels = Array.isArray(hotelData?.child_hotels) ? hotelData.child_hotels : [];

    // Filter offers strictly belonging to this hotel, brand, or brand's child hotels
    const offers = Array.isArray(allOffers)
        ? allOffers.filter((o: any) => {
            // Direct slug match
            if (o.hotel_slug && o.hotel_slug.toLowerCase() === targetSlug) return true;
            // Direct brand_slug match
            if (o.brand_slug && o.brand_slug.toLowerCase() === targetSlug) return true;
            // Direct hotel_id match
            if (propId && o.hotel_id && Number(o.hotel_id) === propId) return true;
            // Direct hotel_name match
            if (propName && o.hotel_name && o.hotel_name.toLowerCase() === propName) return true;

            // If property is a brand, match any of its child hotels
            if (childHotels.length > 0) {
                const matchChildSlug = o.hotel_slug && childHotels.some((c: any) => c.slug && c.slug.toLowerCase() === o.hotel_slug.toLowerCase());
                if (matchChildSlug) return true;

                const matchChildId = o.hotel_id && childHotels.some((c: any) => Number(c.id) === Number(o.hotel_id));
                if (matchChildId) return true;

                const matchChildName = o.hotel_name && childHotels.some((c: any) => c.name && c.name.toLowerCase() === o.hotel_name.toLowerCase());
                if (matchChildName) return true;
            }

            return false;
        })
        : [];

    const hotelName = hotelData?.name || 'Hotel';
    const heroImg = resolveImageUrl(
        hotelData?.banner_images?.[0] || hotelData?.cover_image || '/img/uae_wide 1.png'
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

                <HotelHeader logoUrl={hotelData?.logo} hotelSlug={hotelSlug} />

                <div className="hero-content position-relative text-center text-white" style={{ zIndex: 10, paddingTop: '40px' }}>
                    <p className="text-uppercase mb-2" style={{ letterSpacing: '3px', fontSize: '0.9rem', color: '#c59b4c' }}>
                        {hotelName}
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
                            OFFERS AT {hotelName.toUpperCase()}
                        </h2>
                        <div style={{ width: '60px', height: '2px', backgroundColor: '#c59b4c', margin: '18px auto 0 auto' }} />
                    </div>

                    {offers.length === 0 ? (
                        <div className="text-center py-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6 }}>
                                There are currently no active promotional packages for this property. Please explore our brand offers or contact us directly.
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
                                const detailUrl = `/${offer.hotel_slug || hotelSlug}/special-offers/${offerSlug}`;
                                const badge = offer.badge || (offer.discount_percentage ? `${offer.discount_percentage}% OFF` : (offer.offer_type ? String(offer.offer_type).toUpperCase() : ''));

                                return (
                                    <div key={offer.id || idx} className="col-12 col-md-6 col-lg-3">
                                        <div className="offer-card">
                                            <div className="offer-img-wrapper">
                                                {offerImg ? (
                                                    <img src={offerImg} alt={offerTitle} />
                                                ) : (
                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#231f20', color: '#c59b4c' }}>
                                                        <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Opera Hotels</span>
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
                logoUrl={hotelData?.footer_logo || hotelData?.logo}
                hotelName={hotelName}
                hotelSlug={hotelSlug}
                hotelPhone={hotelData?.phone}
                hotelAddress={hotelData?.address}
                hotelEmail={hotelData?.email}
            />
        </main>
    );
}

import RfpButtonWithModal from '@/components/RfpButtonWithModal';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPropertyBySlug, getSingleMeetingEvent, resolveImageUrl } from '@/services/api';
import VenueGallery from '@/components/VenueGallery';

export async function generateMetadata({ params }: { params: Promise<{ eventSlug: string }> }) {
    const { eventSlug } = await params;
    const eventData = await getSingleMeetingEvent('bahi-hotels-resorts', eventSlug);
    return {
        title: eventData?.seo?.meta_title || eventData?.title ? `${eventData?.title} | Bahi Ajman Palace Hotel` : 'Meeting & Event Space | Bahi Hotels & Resorts',
        description: eventData?.seo?.meta_description || eventData?.description || 'Discover luxury event venues at Bahi Hotels & Resorts.',
    };
}

export default async function BahiIndividualMeetingEventPage({ params }: { params: Promise<{ eventSlug: string }> }) {
    const { eventSlug } = await params;

    const [brandData, eventData] = await Promise.all([
        getPropertyBySlug('bahi-hotels-resorts'),
        getSingleMeetingEvent('bahi-hotels-resorts', eventSlug)
    ]);

    if (!eventData) {
        notFound();
    }

    const title = eventData?.title || 'Meeting & Event Space';
    const hotelName = eventData?.hotel_name || 'Bahi Ajman Palace Hotel';
    const subtitle = eventData?.subtitle || 'BAHI HOTELS & RESORTS';
    const description = eventData?.description || '';
    const detailsContent = eventData?.details_content || description;

    // Resolve hero image with fallback chain
    const rawHero = eventData?.image ||
        (Array.isArray(eventData?.banner_slides) && eventData.banner_slides[0]?.image) ||
        (Array.isArray(eventData?.gallery) && eventData.gallery[0]) ||
        'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop';
    const heroImage = resolveImageUrl(rawHero);

    const gallery: string[] = Array.isArray(eventData?.gallery) && eventData.gallery.length > 0
        ? eventData.gallery
        : (Array.isArray(eventData?.banner_slides) && eventData.banner_slides.length > 0
            ? eventData.banner_slides.map((s: any) => typeof s === 'string' ? s : s.image).filter(Boolean)
            : []);

    const highlights: string[] = Array.isArray(eventData?.highlights) ? eventData.highlights : [];

    const rfpUrl = eventData?.rfp_url || 'https://www.hmhhotelgroup.com/bahi-hotels-resorts-bahi-ajman-palace/request-for-proposal/';
    const contactPhone = eventData?.contact_details?.phone || '+971 6 701 8888';
    const contactEmail = eventData?.contact_details?.email || 'events.bahiajman@hmhhotelgroup.com';
    const logo = brandData?.logo;
    const footerLogo = brandData?.footer_logo || logo;

    return (
        <main className="individual-meeting-event-page" style={{ backgroundColor: '#ffffff', color: '#2c2c2c', fontFamily: 'Arial, sans-serif' }}>
            
            

            {/* ══════════════════════════════════════════
                3. MAIN DETAILS CONTENT SECTION
            ══════════════════════════════════════════ */}
            <section className="py-5">
                <div className="container py-3">
                    <div className="row g-5">
                        {/* Main Content Column */}
                        <div className="col-12 col-lg-8">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <span className="text-uppercase fw-bold px-3 py-1 rounded" style={{ backgroundColor: '#f5efe6', color: '#b89855', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    {eventData?.type ? eventData.type.replace(/_/g, ' ') : 'Event Venue'}
                                </span>
                                <span className="text-muted small">
                                    {hotelName}
                                </span>
                            </div>

                            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.3' }}>
                                {title}
                            </h2>

                            {/* Details Content HTML */}
                            {detailsContent ? (
                                <div 
                                    className="event-details-html-content mb-4"
                                    style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#444' }}
                                    dangerouslySetInnerHTML={{ __html: detailsContent }}
                                />
                            ) : (
                                <p style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#555' }}>
                                    Experience distinguished hospitality, versatile function rooms, and state-of-the-art audiovisual facilities at {hotelName}.
                                </p>
                            )}

                            {/* Key Highlights / Features Box */}
                            {highlights.length > 0 && (
                                <div className="p-4 rounded-0 my-4" style={{ backgroundColor: '#faf9f7', borderLeft: '4px solid #b89855' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: '#1a1a1a' }}>
                                        Venue Highlights &amp; Features
                                    </h4>
                                    <div className="row g-2">
                                        {highlights.map((h: string, idx: number) => (
                                            <div key={idx} className="col-12 col-md-6 d-flex align-items-start gap-2">
                                                <svg style={{ minWidth: '18px', width: '18px', height: '18px', color: '#b89855', marginTop: '3px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                                <span style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Specifications bar if specs exist */}
                            {(eventData?.area_sqft || eventData?.area_sqm || eventData?.ceiling_height || eventData?.capacity_details) && (
                                <div className="row g-3 my-4 p-3 border rounded-0" style={{ backgroundColor: '#fcfcfc' }}>
                                    {eventData?.capacity_details && (
                                        <div className="col-6 col-sm-3 text-center border-end">
                                            <div className="text-muted small text-uppercase">Capacity</div>
                                            <div className="fw-bold" style={{ color: '#1a1a1a' }}>{eventData.capacity_details}</div>
                                        </div>
                                    )}
                                    {(eventData?.area_sqft || eventData?.area_sqm) && (
                                        <div className="col-6 col-sm-3 text-center border-end">
                                            <div className="text-muted small text-uppercase">Area</div>
                                            <div className="fw-bold" style={{ color: '#1a1a1a' }}>
                                                {eventData.area_sqm ? `${eventData.area_sqm} m²` : ''}
                                                {eventData.area_sqm && eventData.area_sqft ? ' / ' : ''}
                                                {eventData.area_sqft ? `${eventData.area_sqft} sq ft` : ''}
                                            </div>
                                        </div>
                                    )}
                                    {eventData?.ceiling_height && (
                                        <div className="col-6 col-sm-3 text-center border-end">
                                            <div className="text-muted small text-uppercase">Ceiling Height</div>
                                            <div className="fw-bold" style={{ color: '#1a1a1a' }}>{eventData.ceiling_height} m</div>
                                        </div>
                                    )}
                                    <div className="col-6 col-sm-3 text-center">
                                        <div className="text-muted small text-uppercase">Location</div>
                                        <div className="fw-bold" style={{ color: '#1a1a1a' }}>{hotelName}</div>
                                    </div>
                                </div>
                            )}

                            {/* Venue Gallery with Lightbox Popup */}
                            {gallery.length > 0 && (
                                <VenueGallery title={title} gallery={gallery} fallbackImage={heroImage} />
                            )}
                        </div>

                        {/* Sidebar Info & Action Box */}
                        <div className="col-12 col-lg-4">
                            <div className="p-4 p-md-5 rounded-0 shadow-sm" style={{ backgroundColor: '#f9f8f6', border: '1px solid #eaeaea', position: 'sticky', top: '100px' }}>
                                <div className="text-uppercase small fw-bold mb-1" style={{ color: '#b89855', letterSpacing: '1.5px' }}>
                                    {hotelName}
                                </div>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: '#1a1a1a' }}>
                                    Event Inquiries
                                </h4>
                                
                                <p style={{ fontSize: '0.92rem', color: '#666', lineHeight: '1.7', marginBottom: '24px' }}>
                                    Contact our dedicated event specialists at {hotelName} to organize your upcoming gathering or request a custom proposal.
                                </p>

                                <div className="mb-3 pb-3 border-bottom">
                                    <span className="d-block small text-uppercase text-muted fw-bold mb-1">Direct Phone</span>
                                    <a href={`tel:${contactPhone}`} className="fw-bold text-decoration-none" style={{ color: '#111', fontSize: '1.05rem' }}>
                                        {contactPhone}
                                    </a>
                                </div>

                                <div className="mb-4 pb-3 border-bottom">
                                    <span className="d-block small text-uppercase text-muted fw-bold mb-1">Email Inquiry</span>
                                    <a href={`mailto:${contactEmail}`} className="fw-bold text-decoration-none" style={{ color: '#b89855', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                                        {contactEmail}
                                    </a>
                                </div>

                                <RfpButtonWithModal hotelName={hotelName} eventType={eventData?.type || title} />

                                <div className="mt-3 text-center">
                                    <Link href="/meetings-events" className="text-decoration-none small text-muted" style={{ fontSize: '0.82rem' }}>
                                        &larr; View all venues across our hotels
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footers */}
            <OurBrandsBar />
            <HotelFooter logoUrl={footerLogo} />
        </main>
    );
}
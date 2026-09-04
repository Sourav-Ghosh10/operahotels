"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPropertyBySlug, getSingleMeetingEvent } from '@/services/api';

export default function DynamicIndividualMeetingEventPage({ params }: { params: Promise<{ hotelSlug: string; eventSlug: string }> }) {
    const { hotelSlug, eventSlug } = use(params);
    const [propertyData, setPropertyData] = useState<any>(null);
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getPropertyBySlug(hotelSlug),
            getSingleMeetingEvent(hotelSlug, eventSlug)
        ])
            .then(([propData, eventResp]) => {
                setPropertyData(propData);
                setEventData(eventResp);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching event details:", err);
                setLoading(false);
            });
    }, [hotelSlug, eventSlug]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    const title = eventData?.title || 'Meeting & Event Space';
    const subtitle = eventData?.subtitle || propertyData?.name || 'HOTEL';
    const description = eventData?.description || '';
    const detailsContent = eventData?.details_content || description;
    const image = eventData?.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop';
    const gallery = eventData?.gallery || [];
    const rfpUrl = eventData?.rfp_url || 'https://www.hmhhotelgroup.com/bahi-hotels-resorts-bahi-ajman-palace/request-for-proposal/';
    const contactPhone = eventData?.contact_details?.phone || '+971 6 701 8888';
    const contactEmail = eventData?.contact_details?.email || 'events.bahiajman@hmhhotelgroup.com';
    const logo = propertyData?.logo;
    const footerLogo = propertyData?.footer_logo || logo;

    return (
        <main className="individual-meeting-event-page" style={{ backgroundColor: '#ffffff', color: '#2c2c2c', fontFamily: 'Arial, sans-serif' }}>
            
            {/* ══════════════════════════════════════════
                1. HERO HEADER BANNER
            ══════════════════════════════════════════ */}
            <header className="position-relative" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 100%), url('${image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1
                    }}
                />

                <div style={{ position: 'relative', zIndex: 10 }}>
                    <HotelHeader logoUrl={logo} />
                </div>

                <div className="container text-center text-white py-5 my-auto position-relative" style={{ zIndex: 5 }}>
                    <p style={{ letterSpacing: '4px', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', color: '#e2be7d', marginBottom: '12px' }}>
                        {subtitle}
                    </p>
                    <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                        {title}
                    </h1>
                    <div style={{ width: '70px', height: '3px', backgroundColor: '#e2be7d', margin: '20px auto 0' }} />
                </div>
            </header>

            {/* ══════════════════════════════════════════
                2. BREADCRUMB BAR
            ══════════════════════════════════════════ */}
            <nav className="py-3 border-bottom" style={{ backgroundColor: '#faf9f8' }}>
                <div className="container">
                    <ol className="breadcrumb m-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
                        <li className="breadcrumb-item">
                            <Link href={`/${hotelSlug}`} className="text-decoration-none" style={{ color: '#888' }}>Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href={`/${hotelSlug}/meetings-events`} className="text-decoration-none" style={{ color: '#888' }}>Meetings &amp; Events</Link>
                        </li>
                        <li className="breadcrumb-item active" style={{ color: '#b89855' }}>
                            {title}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* ══════════════════════════════════════════
                3. MAIN DETAILS CONTENT SECTION
            ══════════════════════════════════════════ */}
            <section className="py-5">
                <div className="container py-3">
                    <div className="row g-5">
                        {/* Main Content Column */}
                        <div className="col-12 col-lg-8">
                            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>
                                {title}
                            </h2>

                            <div 
                                className="event-details-html-content"
                                style={{ fontSize: '1.08rem', lineHeight: '1.85', color: '#444' }}
                                dangerouslySetInnerHTML={{ __html: detailsContent }}
                            />

                            {/* Gallery Grid */}
                            {gallery.length > 0 && (
                                <div className="mt-5 pt-4 border-top">
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                                        Venue Gallery
                                    </h3>
                                    <div className="row g-3">
                                        {gallery.map((gImg: string, gIdx: number) => (
                                            <div key={gIdx} className="col-12 col-sm-6 col-md-4">
                                                <div style={{ height: '200px', overflow: 'hidden', borderRadius: '4px' }}>
                                                    <img 
                                                        src={gImg} 
                                                        alt={`${title} Gallery ${gIdx + 1}`} 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Info & Action Box */}
                        <div className="col-12 col-lg-4">
                            <div className="p-4 p-md-5 rounded-0 shadow-sm" style={{ backgroundColor: '#f9f8f6', border: '1px solid #eaeaea' }}>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: '#1a1a1a' }}>
                                    Event Inquiries
                                </h4>
                                
                                <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.7', marginBottom: '24px' }}>
                                    Contact our dedicated event specialists to organize your upcoming gathering or request a custom proposal.
                                </p>

                                <div className="mb-3">
                                    <span className="d-block small text-uppercase text-muted fw-bold">Direct Phone</span>
                                    <a href={`tel:${contactPhone}`} className="fw-bold text-decoration-none" style={{ color: '#111', fontSize: '1.05rem' }}>
                                        {contactPhone}
                                    </a>
                                </div>

                                <div className="mb-4">
                                    <span className="d-block small text-uppercase text-muted fw-bold">Email Inquiry</span>
                                    <a href={`mailto:${contactEmail}`} className="fw-bold text-decoration-none" style={{ color: '#b89855', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                                        {contactEmail}
                                    </a>
                                </div>

                                <a 
                                    href={rfpUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn text-white w-100 py-3 rounded-0 fw-bold text-uppercase" 
                                    style={{ backgroundColor: '#b89855', letterSpacing: '2px', fontSize: '0.85rem' }}
                                >
                                    REQUEST FOR PROPOSAL
                                </a>
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

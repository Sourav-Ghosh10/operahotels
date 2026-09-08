"use client";

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import OurBrandsBar from '@/components/OurBrandsBar';
import { getPropertyBySlug, resolveImageUrl } from '@/services/api';

export default function HotelContactPage({ params }: { params: Promise<{ hotelSlug: string }> }) {
    const { hotelSlug } = use(params);
    const [hotelData, setHotelData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let isMounted = true;

        getPropertyBySlug(hotelSlug)
            .then((data) => {
                if (isMounted) {
                    setHotelData(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error("Failed to load hotel data for contact:", err);
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [hotelSlug]);

    const hotelName = hotelData?.name || 'Hotel';
    const heroImg = resolveImageUrl(
        hotelData?.banner_images?.[0] || hotelData?.cover_image || '/img/contact-banner.png'
    );

    return (
        <main>
            <link rel="stylesheet" href="/css/contact.css" />

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
                        CONTACT US
                    </h1>
                </div>
            </header>

            {/* Breadcrumb Bar */}
            <div style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #e9e9e9', padding: '14px 0' }}>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0" style={{ fontSize: '0.82rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            <li className="breadcrumb-item">
                                <Link href="/" className="text-dark text-decoration-none">HOME</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link href={`/${hotelSlug}`} className="text-dark text-decoration-none">{hotelName}</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#c59b4c', fontWeight: 600 }}>
                                CONTACT
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Contact Form & Info Section */}
            <section className="contact-intro py-5">
                <div className="container text-center">
                    <h2 className="section-title">GET IN TOUCH WITH {hotelName.toUpperCase()}</h2>
                    <p className="contact-p mb-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        For direct room bookings, meetings &amp; events inquiries, dining reservations, or any special requests, our team is at your service 24/7.
                    </p>

                    <div className="contact-form-wrapper">
                        {submitted ? (
                            <div className="alert alert-success py-4">
                                <h4 className="alert-heading">Thank you!</h4>
                                <p className="mb-0">Your message has been received. Our team will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <select className="form-select" aria-label="Subject" defaultValue="1">
                                            <option value="1">Room Booking Inquiry</option>
                                            <option value="2">Meetings &amp; Events</option>
                                            <option value="3">Dining &amp; Table Reservations</option>
                                            <option value="4">General Inquiries</option>
                                            <option value="5">Feedback</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={hotelName}
                                            disabled
                                            style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="First Name*" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Last Name*" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="tel" className="form-control" placeholder="Phone Number*" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" placeholder="Email Address*" required />
                                    </div>
                                    <div className="col-12">
                                        <textarea className="form-control" rows={4} placeholder="How can we assist you?" required></textarea>
                                    </div>
                                    <div className="col-12 text-start">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="privacyCheckHotel" required defaultChecked />
                                            <label className="form-check-label" htmlFor="privacyCheckHotel" style={{ fontSize: '0.85rem' }}>
                                                I agree to allowing Opera Hotels to store and process my personal data in accordance with the privacy policy.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="btn btn-submit px-5 py-3">SUBMIT NOW</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Direct Hotel Details Section */}
            <section className="reservations-section pb-5" style={{ backgroundColor: '#f9f9f9', paddingTop: '50px' }}>
                <div className="container">
                    <div className="row justify-content-between" style={{ maxWidth: '1024px', margin: '0 auto' }}>
                        <div className="col-md-6 mb-4 mb-md-0">
                            <h3 className="reservations-heading">Direct Hotel Contact</h3>

                            <div className="reservation-item mb-3">
                                <h5>{hotelName}</h5>
                                {hotelData?.address && (
                                    <p className="mb-1" style={{ fontSize: '0.9rem', color: '#666' }}>
                                        {[hotelData.address, hotelData.city, hotelData.country].filter(Boolean).join(', ')}
                                    </p>
                                )}
                                {hotelData?.phone && (
                                    <p className="mb-1">
                                        <strong>Phone: </strong>
                                        <a href={`tel:${hotelData.phone}`} className="text-decoration-none" style={{ color: '#c59b4c' }}>
                                            {hotelData.phone}
                                        </a>
                                    </p>
                                )}
                                {hotelData?.email && (
                                    <p className="mb-1">
                                        <strong>Email: </strong>
                                        <a href={`mailto:${hotelData.email}`} className="text-decoration-none" style={{ color: '#c59b4c' }}>
                                            {hotelData.email}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3 className="reservations-heading">Central Reservations</h3>
                            <div className="reservation-info">
                                <p><strong>Email:</strong> <a href="mailto:reservations@operahotels.com" className="text-decoration-none">reservations@operahotels.com</a></p>
                                <p><strong>Phone:</strong> <a href="tel:+97167018888" className="text-decoration-none">+971 6 701 8888</a></p>
                                <p><strong>Hours:</strong> Available 24 hours / 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hotel Location Google Map */}
            {hotelData?.google_location && (
                <section className="location-section">
                    <div className="location-map-wrapper" style={{ height: '400px' }}>
                        <iframe
                            src={hotelData.google_location.includes('http') ? hotelData.google_location : `https://maps.google.com/maps?q=${encodeURIComponent(hotelData.google_location || hotelName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                            className="location-map-iframe"
                            width="100%"
                            height="100%"
                            style={{ border: '0' }}
                            allowFullScreen={true}
                            loading="lazy"
                            title={`${hotelName} Location`}
                        />
                    </div>
                    <div className="location-info-wrapper">
                        <h2 className="location-heading">HOTEL LOCATION</h2>
                        <div className="location-address-block">
                            <div className="location-city">
                                <svg className="location-pin-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <strong>{hotelData?.city || 'UAE'}</strong>
                            </div>
                            <p className="location-address-text">
                                {[hotelData?.address, hotelData?.city, hotelData?.country].filter(Boolean).join(', ') || hotelName}
                            </p>
                        </div>
                    </div>
                </section>
            )}

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

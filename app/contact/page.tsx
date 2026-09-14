"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import { getPageData, resolveImageUrl } from '@/services/api';

// Dynamic import of Leaflet map component with ssr disabled
const ContactMap = dynamic(() => import('@/components/ContactMap'), {
    ssr: false,
    loading: () => (
        <div style={{ height: "580px", width: "100%", backgroundColor: "#e5e3df", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
            <span>Loading Map...</span>
        </div>
    )
});

interface HotelContact {
    hotel_name: string;
    email: string;
    phone?: string;
}

interface OfficeLocation {
    title: string;
    city: string;
    address: string;
    phone?: string;
    email?: string;
    image?: string;
    image_url?: string;
    latitude?: string | number;
    longitude?: string | number;
}

export default function ContactPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        subject: '',
        hotel: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        enquiry: '',
        gdpr: false,
    });

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const data = await getPageData('contact-us');
                if (isMounted && data) {
                    setPageData(data);
                }
            } catch (err) {
                console.error("Failed to load contact page data:", err);
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    const body = pageData?.body || {};

    // Dynamic banner slides
    const rawSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : (Array.isArray(body.banner_images) && body.banner_images.length > 0
            ? body.banner_images.map((img: string) => ({ image: img, title: 'CONTACT US', subtitle: 'Hospitality Management Holding' }))
            : [
                { image: 'contact_banner_1.jpg', title: 'CONTACT US' },
                { image: 'contact_banner_2.jpg', title: 'CONTACT US' },
                { image: 'contact_banner_3.jpg', title: 'CONTACT US' },
            ]);

    const bannerSlides = rawSlides.map((s: any) => ({
        image_url: s.image_url || (s.image ? resolveImageUrl(s.image) : '/uploads/contact_banner_1.jpg'),
        title: s.title || 'CONTACT US',
    }));

    // Slide autoplay
    useEffect(() => {
        if (!isPlaying || bannerSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isPlaying, bannerSlides.length]);

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    // Update document title
    useEffect(() => {
        if (pageData?.seo?.meta_title || pageData?.title) {
            const t = pageData?.seo?.meta_title || (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title);
            if (t) document.title = t;
        }
    }, [pageData]);

    const introTitle = body.intro_title || body.content_title || 'Get In Touch';
    const introText = body.intro_text || 'For room reservations, we recommend booking directly through our website for the best available rates and exclusive offers.  You may also contact our hotels directly using the details below.';

    // Central contacts
    const centralEmail = body.central_email || 'central.reservations@hmhhotelgroup.com';
    const centralPhone = body.central_phone || '+971 4 290 9999';
    const centralWhatsapp = body.central_whatsapp || '+971 56 1776647';
    const cleanWhatsapp = centralWhatsapp.replace(/[^0-9]/g, '');

    // Hotel contacts list
    const hotelContacts: HotelContact[] = (Array.isArray(body.hotel_contacts) && body.hotel_contacts.length > 0)
        ? body.hotel_contacts
        : [
            { hotel_name: 'Bahi Ajman Palace Hotel', email: 'reservations.bahiajman@hmhhotelgroup.com' },
            { hotel_name: 'Coral Dubai Deira Hotel', email: 'reservations.coraldeira@hmhhotelgroup.com' },
            { hotel_name: 'Coral Beach Resort Sharjah', email: 'reservations.coralsharjah@hmhhotelgroup.com' },
            { hotel_name: 'Corp Amman Hotel', email: 'reservations.corpamman@hmhhotelgroup.com' },
            { hotel_name: 'Coral Jubail Hotel', email: 'reservations.coraljubail@hmhhotelgroup.com' },
            { hotel_name: 'Ecos Dubai Hotel', email: 'reservations.ecosalfurjan@hmhhotelgroup.com' },
        ];

    // Office locations list
    const locationsList: OfficeLocation[] = (Array.isArray(body.locations_list) && body.locations_list.length > 0)
        ? body.locations_list
        : [
            {
                title: 'Dubai',
                city: 'Dubai',
                address: 'Suites 106/107, Madina Tower, Cluster O\nJumeirah Lake Towers\nPO Box 66232, Dubai - UAE',
                image: '/uploads/contact_dubai_office.jpg',
                latitude: 25.07796,
                longitude: 55.14405,
            },
            {
                title: 'Sharjah',
                city: 'Sharjah',
                address: '5th Floor, Gibca Building\nAl Wahda Street\nPO Box 1033, Sharjah - UAE',
                phone: '+971 4 290 9999',
                image: '/uploads/contact_sharjah_office.jpg',
                latitude: 25.29327,
                longitude: 55.37368,
            },
        ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                subject: '',
                hotel: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                enquiry: '',
                gdpr: false,
            });
        }, 5000);
    };

    return (
        <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", position: "relative" }}>
            <link rel="stylesheet" href="/css/contact.css" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

            {/* 1. HERO BANNER SLIDER (Exact HMH Reference) */}
            <section className="hmh-hero-slider" aria-label="Contact Us Banner Slider">
                {bannerSlides.map((slide: any, index: number) => (
                    <div
                        key={index}
                        className={`hmh-hero-slide ${index === activeSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url('${slide.image_url}')` }}
                    />
                ))}

                {/* Dark gradient overlay */}
                <div className="hmh-hero-overlay" />

                {/* Header Navigation */}
                <Header />

                {/* Hero Title at bottom left */}
                <div className="hmh-hero-content">
                    <h1 className="hmh-hero-title">CONTACT US</h1>
                </div>

                {/* Slider Controls (Prev, Play/Pause, Next) */}
                {bannerSlides.length > 1 && (
                    <>
                        {/* Prev Button */}
                        <button
                            type="button"
                            onClick={prevSlide}
                            className="hmh-slider-ctrl hmh-slider-prev"
                            aria-label="Slider Navigation Previous Button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 18.721 12.006">
                                <g transform="translate(1 1.414)">
                                    <path d="M0,0,4.589,4.589,0,9.178" transform="translate(12.132)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path d="M15.746,0H0" transform="translate(0 4.589)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                                </g>
                            </svg>
                        </button>

                        {/* Play/Pause Toggle */}
                        <button
                            type="button"
                            onClick={togglePlayPause}
                            className="hmh-slider-ctrl hmh-slider-playpause"
                            aria-label="Slider Play/Pause Button"
                        >
                            {isPlaying ? (
                                /* Pause Button SVG */
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 29.5 29.5">
                                    <g transform="translate(11 10)">
                                        <g transform="translate(-11 -10)" fill="none" stroke="#fff" strokeWidth="1.5">
                                            <circle cx="14.75" cy="14.75" r="14.75" stroke="none" />
                                            <circle cx="14.75" cy="14.75" r="14" fill="none" />
                                        </g>
                                        <path d="M43,50.108c.65,0,1.2-.313,1.2-.682V40.582c0-.37-.55-.682-1.2-.682s-1.2.313-1.2.682v8.843C41.8,49.8,42.35,50.108,43,50.108Z" transform="translate(-41.8 -39.9)" fill="#fff" />
                                        <path d="M55.6,50.108c.65,0,1.2-.313,1.2-.682V40.582c0-.37-.55-.682-1.2-.682s-1.2.313-1.2.682v8.843C54.4,49.8,54.9,50.108,55.6,50.108Z" transform="translate(-49.014 -39.9)" fill="#fff" />
                                    </g>
                                </svg>
                            ) : (
                                /* Play Button SVG */
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 29.5 29.5">
                                    <g fill="none">
                                        <path d="M14.75,0A14.75,14.75,0,1,1,0,14.75,14.75,14.75,0,0,1,14.75,0Z" stroke="none" />
                                        <path d="M 14.75 1.5 C 11.21 1.5 7.88 2.88 5.38 5.38 C 2.88 7.88 1.5 11.21 1.5 14.75 C 1.5 18.29 2.88 21.62 5.38 24.12 C 7.88 26.62 11.21 28 14.75 28 C 18.29 28 21.62 26.62 24.12 24.12 C 26.62 21.62 28 18.29 28 14.75 C 28 11.21 26.62 7.88 24.12 5.38 C 21.62 2.88 18.29 1.5 14.75 1.5" stroke="none" fill="#fff" />
                                    </g>
                                    <path d="M9,6.979v8.344a.215.215,0,0,0,.322.2l6.614-4.172a.236.236,0,0,0,0-.393L9.322,6.784A.213.213,0,0,0,9,6.979Z" transform="translate(3 4.249)" fill="#fff" />
                                </svg>
                            )}
                        </button>

                        {/* Next Button */}
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="hmh-slider-ctrl hmh-slider-next"
                            aria-label="Slider Navigation Next Button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="15" viewBox="0 0 18.721 12.006">
                                <g transform="translate(1 1.414)">
                                    <path d="M0,0,4.589,4.589,0,9.178" transform="translate(12.132)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    <path d="M15.746,0H0" transform="translate(0 4.589)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                                </g>
                            </svg>
                        </button>
                    </>
                )}
            </section>

            {/* 2. GET IN TOUCH FORM SECTION */}
            <section className="hmh-form-section" id="formBuilder">
                <div className="container">
                    <h2 className="hmh-section-title">{introTitle}</h2>
                    <div className="hmh-title-accent" />

                    <div className="hmh-form-container">
                        {isSubmitted ? (
                            <div className="p-4 rounded-0 text-center" style={{ backgroundColor: "#eef8ee", border: "1px solid #c3e6cb", color: "#155724" }}>
                                <h4 style={{ fontWeight: 600, marginBottom: "8px" }}>Thank You</h4>
                                <p style={{ margin: 0, fontSize: "15px" }}>Your Message has been sent successfully. Our reservations team will respond shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    {/* Subject Dropdown */}
                                    <div className="col-12 col-md-6">
                                        <select
                                            className="hmh-select-field"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            aria-label="Subject"
                                        >
                                            <option value="" disabled>Subject </option>
                                            <option value="Book a room">Book a room</option>
                                            <option value="Meeting and Events">Meeting and Events </option>
                                            <option value="Special Request">Special Request</option>
                                            <option value="Guest Feedback">Guest Feedback</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>

                                    {/* Hotel Name Dropdown */}
                                    <div className="col-12 col-md-6">
                                        <select
                                            className="hmh-select-field"
                                            required
                                            value={formData.hotel}
                                            onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                            aria-label="Hotel Name"
                                        >
                                            <option value="" disabled>Hotel Name</option>
                                            {hotelContacts.map((h, i) => (
                                                <option key={i} value={h.hotel_name}>{h.hotel_name}</option>
                                            ))}
                                            <option value="Corp Makkah Al Naseem Hotel">Corp Makkah Al Naseem Hotel</option>
                                        </select>
                                    </div>

                                    {/* First Name */}
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="text"
                                            className="hmh-input-field"
                                            placeholder="First Name*"
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="text"
                                            className="hmh-input-field"
                                            placeholder="Lastname*"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="tel"
                                            className="hmh-input-field"
                                            placeholder="Phone Number*"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-12 col-md-6">
                                        <input
                                            type="email"
                                            className="hmh-input-field"
                                            placeholder="Email*"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {/* Enquiry Input */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="hmh-input-field"
                                            placeholder="Tell us about your enquiry "
                                            value={formData.enquiry}
                                            onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                                        />
                                    </div>

                                    {/* GDPR Consent Checkbox */}
                                    <div className="col-12">
                                        <div className="hmh-gdpr-row">
                                            <input
                                                type="checkbox"
                                                id="hmhGdpr"
                                                className="hmh-gdpr-checkbox"
                                                required
                                                checked={formData.gdpr}
                                                onChange={(e) => setFormData({ ...formData, gdpr: e.target.checked })}
                                            />
                                            <label htmlFor="hmhGdpr" className="hmh-gdpr-label">
                                                I consent to having this website store my submitted information so they can respond to my enquiry.
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="col-12 text-center">
                                        <button type="submit" className="hmh-submit-btn">
                                            <span>Submit</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14.419" height="9.615" viewBox="0 0 14.419 9.615">
                                                <g transform="translate(1 1.399)">
                                                    <path d="M0,0,4.589,3.408,0,6.817" transform="translate(7.83)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    <path d="M11.444,0H0" transform="translate(0 3.408)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. HOTEL & CENTRAL RESERVATIONS DIRECTORY SECTION */}
            <section className="hmh-reservations-section" id="intro">
                <div className="hmh-reservations-container">
                    <p className="hmh-reservations-p">
                        {introText}
                    </p>

                    <h3 className="hmh-reservations-subtitle">Hotel Reservations</h3>
                    <div className="hmh-hotel-list">
                        {hotelContacts.map((hotel, idx) => (
                            <div key={idx} className="hmh-hotel-list-item">
                                {hotel.hotel_name} - <a href={`mailto:${hotel.email}`} className="hmh-link">{hotel.email}</a>
                            </div>
                        ))}
                    </div>

                    <h3 className="hmh-reservations-subtitle" style={{ marginTop: "36px" }}>Central Reservations</h3>
                    <div className="hmh-hotel-list">
                        <div className="hmh-hotel-list-item">
                            Email: <a href={`mailto:${centralEmail}`} className="hmh-link">{centralEmail}</a>
                        </div>
                        <div className="hmh-hotel-list-item">
                            WhatsApp : <a href={`https://wa.me/${cleanWhatsapp}`} target="_blank" rel="noopener noreferrer" className="hmh-link">{centralWhatsapp}</a>
                        </div>
                        <div className="hmh-hotel-list-item">
                            Phone: <a href={`tel:${centralPhone.replace(/\s+/g, '')}`} className="hmh-link" style={{ textDecoration: "none" }}>{centralPhone}</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. MAP & CORPORATE OFFICES SECTION */}
            <ContactMap locations={locationsList} />
        </main>
    );
}
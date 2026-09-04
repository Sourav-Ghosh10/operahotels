"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import Link from 'next/link';
import { getPageData } from '@/services/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

function resolveImageUrl(img: string | undefined | null): string {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const clean = img.replace(/^\/?(storage\/|uploads\/)?/, '');
    return `${API_BASE}/uploads/${clean}`;
}

export default function OurPartnersPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('our-partners');
            if (data) {
                setPageData(data);
            }
        };
        load();
    }, []);

    const body = pageData?.body || {};
    const bannerSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : [
            { image: 'partners_banner_1.jpg', title: 'Our Partners', subtitle: '' },
            { image: 'partners_banner_2.jpg', title: 'Our Partners', subtitle: '' },
            { image: 'partners_banner_3.jpg', title: 'Our Partners', subtitle: '' },
        ];

    useEffect(() => {
        if (bannerSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerSlides.length]);

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const introSubtitle = body.intro_subtitle || 'HMH Hospitality Management Holding';
    const introTitle = body.intro_title || 'Our Partners';
    const introText = body.intro_text ||
        'Partnerships and investment in technology ensure our product offering reaches its target market segment. Currently we have alliances and partnerships in place with industry leaders such as Emirates Airlines & Al Fursan.';

    const partnersList = Array.isArray(body.partners_list) && body.partners_list.length > 0
        ? body.partners_list
        : [
            {
                name: 'Etisalat',
                image: 'partner_etisalat_logo.png',
                description: '<p>HMH Hotels Group is the ultimate destination with Smiles for everyday savings, offering you amazing daily deals from a variety of your favourite restaurants and spectacular rooms.</p><p>Enjoy up to 20% off on rooms, dining, and wellness.</p>',
            },
            {
                name: 'ESAAD',
                image: 'partner_esaad_logo.jpg',
                description: '<p>Enjoy your privileges of 20% discount off the Bed and Breakfast Rate when staying in any HMH - Hospitality Management Holding Hotels. Take advantage of Esaad privileges and Book Now to benefit from the offer and discounts.</p><p><strong>This offer is available at the following hotels:</strong></p><ul><li>Ecos Dubai Hotel at Al Furjan</li><li>Coral Dubai Deira Hotel</li><li>Coral Beach Resort, Sharjah Hotel</li><li>Bahi Ajman Palace Hotel</li></ul>',
            },
            {
                name: 'ADCB Card Exclusive Offer',
                image: 'partner_adcb_logo.jpg',
                description: '<p>Enjoy a special 20% discount on the flexible rate, including breakfast, when you book with your ADCB card.</p><p><strong>Terms and Conditions:</strong></p><ul><li>All reservations must be secured and paid using an ADCB card.</li><li>This offer cannot be combined with any other promotions or discounts.</li><li>The hotel reserves the right to refuse the discount if the ADCB card used has expired.</li></ul><p><strong>How to Use your Promo Code:</strong><br>Select your preferred hotel and enter the promo code <strong>HMH_ADCB</strong>.<br>Make your stay more enjoyable with this exclusive ADCB card offer! This offer is available at all HMH hotels.</p>',
            },
        ];

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || 'Our Partners';

    return (
        <main>
            <link rel="stylesheet" href="/css/about.css" />

            {/* ================= HERO BANNER ================= */}
            <header className="about-hero-section">
                <div className="about-hero-slider">
                    {bannerSlides.map((slide: any, idx: number) => {
                        const bgUrl = resolveImageUrl(slide.image);
                        return (
                            <div
                                key={idx}
                                className={`about-hero-slide ${idx === activeSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url('${bgUrl}')` }}
                            />
                        );
                    })}
                </div>

                <div className="about-hero-overlay"></div>

                {/* Main Header / Nav */}
                <Header />

                {/* Hero Title Content */}
                <div className="about-hero-content">
                    {currentSlide?.subtitle && (
                        <div className="about-hero-subtitle">{currentSlide.subtitle}</div>
                    )}
                    <h1 className="about-hero-title">{currentSlide?.title || pageTitle}</h1>
                </div>

                {/* Arrows */}
                {bannerSlides.length > 1 && (
                    <>
                        <button className="about-hero-arrow about-hero-prev" onClick={prevSlide} aria-label="Previous Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button className="about-hero-arrow about-hero-next" onClick={nextSlide} aria-label="Next Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="about-hero-dots">
                            {bannerSlides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    className={`about-hero-dot ${idx === activeSlide ? 'active' : ''}`}
                                    onClick={() => setActiveSlide(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </header>

            {/* ================= TERTIARY SUBNAV ================= */}
            <nav className="about-subnav" aria-label="About Us Navigation">
                <div className="container">
                    <ul className="about-subnav-list">
                        <li>
                            <Link href="/about" className="about-subnav-link">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/corporate-responsibility" className="about-subnav-link">
                                Corporate Responsibility
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/our-partners" className="about-subnav-link active">
                                Our Partners
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/board-of-directors-and-team" className="about-subnav-link">
                                Board of Directors and Team
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/our-history" className="about-subnav-link">
                                Our History
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* ================= INTRO BLOCK ================= */}
            <section className="about-intro-section" id="intro">
                <div className="container">
                    {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                    <h2 className="about-intro-title">{introTitle}</h2>
                    <p className="about-intro-text">{introText}</p>
                </div>
            </section>

            {/* ================= PARTNERS LIST ================= */}
            <section className="about-partners-section">
                <div className="container">
                    <div className="about-partners-grid">
                        {partnersList.map((partner: any, idx: number) => (
                            <div key={idx} className="about-partner-card">
                                {partner.image && (
                                    <div className="about-partner-logo-wrap">
                                        <img
                                            src={resolveImageUrl(partner.image)}
                                            alt={partner.name || 'Partner Logo'}
                                            className="about-partner-logo"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <div className="about-partner-content">
                                    <h3 className="about-partner-name">{partner.name}</h3>
                                    <div
                                        className="about-partner-desc"
                                        dangerouslySetInnerHTML={{ __html: partner.description || '' }}
                                    />
                                    {partner.link && (
                                        <div className="about-partner-link-wrap">
                                            <a
                                                href={partner.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="about-partner-link"
                                            >
                                                Learn More &rarr;
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}
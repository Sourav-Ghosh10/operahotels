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

export default function CorporateResponsibilityPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('corporate-responsibility');
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
            { image: 'cr_banner_1.jpg', title: 'Corporate Responsibility', subtitle: '' },
            { image: 'cr_banner_2.jpg', title: 'Corporate Responsibility', subtitle: '' },
            { image: 'cr_banner_3.jpg', title: 'Corporate Responsibility', subtitle: '' },
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
    const introTitle = body.intro_title || 'Corporate Responsibility';
    const introText = body.intro_text ||
        'At HMH, we meet our business objectives in an economically, environmentally and socially responsible manner. We are committed to investing in the communities in which we operate through initiatives that are socially and environmentally responsible and sustainable.';

    const responsibilitiesList = Array.isArray(body.responsibilities_list) && body.responsibilities_list.length > 0
        ? body.responsibilities_list
        : [
            {
                title: 'Employee Responsibility',
                image: 'cr_employee_responsibility.jpg',
                description: '<p>We focus on generating shared value through job creation, employee development and beneficial opportunities for a global and diverse workforce. The majority of HMH hotels are independently owned and operated with many of our owners sharing a similar commitment to their employees.</p><p>We look to the community to discover and develop talent and to generate interest in young people to join this exciting global industry. We work with educational institutions and non-profit organizations to provide experience opportunities for the youth.</p>',
            },
            {
                title: 'Social Responsibility',
                image: 'cr_social_responsibility.jpg',
                description: '<p>HMH associates generate positive action through meaningful donations. Giving campaigns at our hotels and corporate offices focus on helping children, youth and families, providing education and shelter.</p>',
            },
            {
                title: 'Environmental Responsibility',
                image: 'cr_environmental_responsibility.jpg',
                description: '<p><strong>Waste Minimization</strong><br>HMH hotels work to reduce, reuse and recycle—sharing best practices and working with suppliers to reduce waste and increase recycling. Because of its global and local impact, reducing food waste is a special area of focus with an eye on purchasing, kitchen preparation, plate waste and spoilage.</p><p><strong>Responsible Sourcing</strong><br>Much of a hotel’s environmental impact is generated through products and services that are sourced—in the building design process, in the delicious food and drink we serve, and in our laundries. From sustainable seafood to cleaning products, we partner with like-minded suppliers committed to doing business responsibly.</p>',
            },
        ];

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || 'Corporate Responsibility';

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
                            <Link href="/about/corporate-responsibility" className="about-subnav-link active">
                                Corporate Responsibility
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/our-partners" className="about-subnav-link">
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

            {/* ================= RESPONSIBILITIES LIST ================= */}
            <section className="about-cr-list-section">
                {responsibilitiesList.map((item: any, idx: number) => {
                    const isImageFirst = idx % 2 === 0;
                    const isAltBg = idx % 2 === 1;
                    return (
                        <div key={idx} className={`about-cr-item ${isAltBg ? 'alt-bg' : ''}`}>
                            <div className="container">
                                <div className="row align-items-center">
                                    {isImageFirst ? (
                                        <>
                                            <div className="col-lg-6 mb-4 mb-lg-0">
                                                <div className="about-cr-img-wrap">
                                                    <img
                                                        src={resolveImageUrl(item.image)}
                                                        alt={item.title || 'Corporate Responsibility'}
                                                        className="about-cr-img"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 ps-lg-5">
                                                <div className="about-cr-content">
                                                    <h3 className="about-cr-title">{item.title}</h3>
                                                    <div
                                                        className="about-cr-desc"
                                                        dangerouslySetInnerHTML={{ __html: item.description || '' }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-lg-6 order-2 order-lg-1 pe-lg-5">
                                                <div className="about-cr-content">
                                                    <h3 className="about-cr-title">{item.title}</h3>
                                                    <div
                                                        className="about-cr-desc"
                                                        dangerouslySetInnerHTML={{ __html: item.description || '' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                                                <div className="about-cr-img-wrap">
                                                    <img
                                                        src={resolveImageUrl(item.image)}
                                                        alt={item.title || 'Corporate Responsibility'}
                                                        className="about-cr-img"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}
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

export default function AboutPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('about-us');
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
            { image: 'about_banner_1.jpg', title: 'About Us', subtitle: '' },
            { image: 'about_banner_2.jpg', title: 'About Us', subtitle: '' },
            { image: 'about_banner_3.jpg', title: 'About Us', subtitle: '' },
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

    // Subtitle & Title
    const introSubtitle = body.intro_subtitle || 'Hospitality Management Holding';
    const introTitle = body.intro_title || body.content_title || 'Get to know';
    const introText = body.intro_text || (body.content ? body.content.replace(/<[^>]+>/g, '') : '') ||
        'Hospitality Management Holding (HMH) stands as a leading force in the MENA hospitality sector, since its inception in 2003.';

    // Expansion
    const expansionImg = body.expansion_image || 'about_expansion.jpg';
    const expansionHtml = body.expansion_text ||
        '<p>Strategically expanding across the MENA region, HMH has successfully discovered new opportunities and created significant value for all stakeholders. Our properties occupy prime locations across the region, and with a robust pipeline of hotels under development, our reach continues to broaden.</p><p>In the face of global adversities, HMH has demonstrated remarkable resilience and adaptability. Our approach to overcoming these challenges not only strengthens our resolve but also paves the way for continued growth. With a proven record of excellence, a strategic growth trajectory, and an unwavering commitment to wellbeing, sustainability, and innovation, HMH stands ready to capitalize on emerging opportunities in the MENA hospitality industry.</p>';

    // Vision & Mission
    const visionText = body.our_vision_text || 'To build trust with our clients, enrich the healthy journey of our guests in a vibrant environment.';
    const visionImg = body.our_vision_image || 'about_vision.jpg';

    const missionText = body.our_mission_text || 'At HMH we, exceed expectations, ensuring sustainable growth in the MENA region. Emphasising wellness and accessibility, we create a vibrant environment, enriching the guest and associates’ journey, and building trust with stakeholders through profitable operations.';
    const missionImg = body.our_mission_image || 'about_mission.jpg';

    // Values, Culture, Promise
    const valuesList = body.our_values
        ? body.our_values.split('\n').map((v: string) => v.trim()).filter(Boolean)
        : ['Excellence', 'Integrity', 'Innovation', 'Wellness and Accessibility', 'Accountability', 'Sustainability'];

    const cultureText = body.our_culture ||
        'Our culture is led by service excellence; characterized by a forward-looking, responsible, people-centric ethos with a strong focus on technology, diversity, wellness and environmental considerations.';

    const promiseText = body.our_promise || 'Growth & Impeccable Service.';

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || 'About Us';

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
                            <Link href="/about" className="about-subnav-link active">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/corporate-responsibility" className="about-subnav-link">
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

            {/* ================= INTRO ("GET TO KNOW") ================= */}
            <section className="about-intro-section" id="intro">
                <div className="container">
                    {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                    <h2 className="about-intro-title">{introTitle}</h2>
                    <p className="about-intro-text">{introText}</p>
                </div>
            </section>

            {/* ================= STRATEGIC EXPANSION (IMAGE & TEXT SPLIT) ================= */}
            <section className="about-expansion-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="about-expansion-text-wrap">
                                <div
                                    className="about-expansion-text"
                                    dangerouslySetInnerHTML={{ __html: expansionHtml }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-expansion-img-wrap">
                                <img
                                    src={resolveImageUrl(expansionImg)}
                                    alt="HMH Strategic Expansion"
                                    className="about-expansion-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= OUR VISION ================= */}
            <section className="about-vm-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="about-vm-img-wrap">
                                <img
                                    src={resolveImageUrl(visionImg)}
                                    alt="Our Vision"
                                    className="about-vm-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0 ps-lg-5">
                            <h3 className="about-vm-heading">Our Vision</h3>
                            <p className="about-vm-text">{visionText}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= OUR MISSION ================= */}
            <section className="about-vm-section alt-bg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0 pe-lg-5">
                            <h3 className="about-vm-heading">Our Mission</h3>
                            <p className="about-vm-text">{missionText}</p>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-vm-img-wrap">
                                <img
                                    src={resolveImageUrl(missionImg)}
                                    alt="Our Mission"
                                    className="about-vm-img"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= VALUES, CULTURE & PROMISE ================= */}
            <section className="about-cards-section">
                <div className="container">
                    <div className="row g-4">
                        {/* Card 1: Our Values */}
                        <div className="col-md-4 about-card-col">
                            <div className="about-card card-navy">
                                <div className="about-card-inner">
                                    <h3 className="about-card-title">Our Values</h3>
                                    <ul className="about-card-values-list">
                                        {valuesList.map((val: string, i: number) => (
                                            <li key={i}>{val}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Our Culture */}
                        <div className="col-md-4 about-card-col">
                            <div className="about-card card-gold">
                                <div className="about-card-inner">
                                    <h3 className="about-card-title">Our Culture</h3>
                                    <p className="about-card-desc">{cultureText}</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Our Promise */}
                        <div className="col-md-4 about-card-col">
                            <div className="about-card card-dark">
                                <div className="about-card-inner">
                                    <h3 className="about-card-title">Our Promise</h3>
                                    <p className="about-card-desc">{promiseText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}
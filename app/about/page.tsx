"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import Link from 'next/link';
import { getPageData, resolveImageUrl } from '@/services/api';

export default function AboutPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const data = await getPageData('about-us');
                if (isMounted && data) {
                    setPageData(data);
                }
            } catch (err) {
                console.error("Failed to load about-us page data:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    const body = pageData?.body || {};

    // Dynamic banner slides strictly from backend
    const rawSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : (Array.isArray(body.banner_images) && body.banner_images.length > 0
            ? body.banner_images.map((img: string) => ({ image: img, title: '', subtitle: '' }))
            : []);

    const bannerSlides = rawSlides.filter((s: any) => s && (s.image || s.image_url));

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

    // Subtitle & Title strictly from backend
    const introSubtitle = body.intro_subtitle || '';
    const introTitle = body.intro_title || body.content_title || '';
    const introText = body.intro_text || (body.content ? body.content.replace(/<[^>]+>/g, '') : '') || '';

    // Expansion strictly from backend
    const expansionImg = body.expansion_image || '';
    const expansionHtml = body.expansion_text || '';

    // Vision & Mission strictly from backend
    const visionText = body.our_vision_text || '';
    const visionImg = body.our_vision_image || '';

    const missionText = body.our_mission_text || '';
    const missionImg = body.our_mission_image || '';

    // Values, Culture, Promise strictly from backend
    const valuesList = body.our_values
        ? body.our_values.split('\n').map((v: string) => v.trim()).filter(Boolean)
        : [];

    const cultureText = body.our_culture || '';
    const promiseText = body.our_promise || '';

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || '';

    if (isLoading && !pageData) {
        return (
            <div className="luxury-page-loader-overlay active" role="status" aria-live="polite">
                <div className="luxury-loader-center">
                    <div className="luxury-loader-orbit">
                        <div className="luxury-loader-ring-outer"></div>
                        <div className="luxury-loader-ring-inner"></div>
                        <div className="luxury-loader-logo-wrap">
                            <img src="/img/operalogo-white.png" alt="Opera Hotels Logo" className="luxury-loader-logo" />
                        </div>
                    </div>
                    <div className="luxury-loader-brand">Opera Grand Hotels</div>
                    <div className="luxury-loader-progress-track">
                        <div className="luxury-loader-progress-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main>
            <link rel="stylesheet" href="/css/about.css" />

            {/* ================= HERO BANNER ================= */}
            <header className="about-hero-section">
                <div className="about-hero-slider">
                    {bannerSlides.length > 0 ? (
                        bannerSlides.map((slide: any, idx: number) => {
                            const bgUrl = resolveImageUrl(slide.image || slide.image_url);
                            return (
                                <div
                                    key={idx}
                                    className={`about-hero-slide ${idx === activeSlide ? 'active' : ''}`}
                                    style={{ backgroundImage: `url('${bgUrl}')` }}
                                />
                            );
                        })
                    ) : (
                        <div className="about-hero-slide active" style={{ backgroundColor: '#1b1b18' }} />
                    )}
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
                        <button
                            className="about-hero-arrow about-hero-prev"
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button
                            className="about-hero-arrow about-hero-next"
                            onClick={nextSlide}
                            aria-label="Next Slide"
                        >
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
            {(introTitle || introSubtitle || introText) && (
                <section className="about-intro-section" id="intro">
                    <div className="container">
                        {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                        {introTitle && <h2 className="about-intro-title">{introTitle}</h2>}
                        {introText && <p className="about-intro-text">{introText}</p>}
                    </div>
                </section>
            )}

            {/* ================= STRATEGIC EXPANSION (IMAGE & TEXT SPLIT) ================= */}
            {(expansionHtml || expansionImg) && (
                <section className="about-expansion-section">
                    <div className="container">
                        <div className="row align-items-center">
                            {expansionHtml && (
                                <div className={`col-lg-${expansionImg ? '6' : '12'} mb-4 mb-lg-0`}>
                                    <div className="about-expansion-text-wrap">
                                        <div
                                            className="about-expansion-text"
                                            dangerouslySetInnerHTML={{ __html: expansionHtml }}
                                        />
                                    </div>
                                </div>
                            )}
                            {expansionImg && (
                                <div className={`col-lg-${expansionHtml ? '6' : '12'}`}>
                                    <div className="about-expansion-img-wrap">
                                        <img
                                            src={resolveImageUrl(expansionImg)}
                                            alt={introTitle || "Strategic Expansion"}
                                            className="about-expansion-img"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ================= OUR VISION ================= */}
            {(visionText || visionImg) && (
                <section className="about-vm-section">
                    <div className="container">
                        <div className="row align-items-center">
                            {visionImg && (
                                <div className={`col-lg-${visionText ? '6' : '12'} order-2 order-lg-1`}>
                                    <div className="about-vm-img-wrap">
                                        <img
                                            src={resolveImageUrl(visionImg)}
                                            alt="Our Vision"
                                            className="about-vm-img"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            )}
                            {visionText && (
                                <div className={`col-lg-${visionImg ? '6' : '12'} order-1 order-lg-2 mb-4 mb-lg-0 ps-lg-5`}>
                                    <h3 className="about-vm-heading">Our Vision</h3>
                                    <p className="about-vm-text">{visionText}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ================= OUR MISSION ================= */}
            {(missionText || missionImg) && (
                <section className="about-vm-section alt-bg">
                    <div className="container">
                        <div className="row align-items-center">
                            {missionText && (
                                <div className={`col-lg-${missionImg ? '6' : '12'} mb-4 mb-lg-0 pe-lg-5`}>
                                    <h3 className="about-vm-heading">Our Mission</h3>
                                    <p className="about-vm-text">{missionText}</p>
                                </div>
                            )}
                            {missionImg && (
                                <div className={`col-lg-${missionText ? '6' : '12'}`}>
                                    <div className="about-vm-img-wrap">
                                        <img
                                            src={resolveImageUrl(missionImg)}
                                            alt="Our Mission"
                                            className="about-vm-img"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ================= VALUES, CULTURE & PROMISE ================= */}
            {(valuesList.length > 0 || cultureText || promiseText) && (
                <section className="about-cards-section">
                    <div className="container">
                        <div className="row g-4">
                            {/* Card 1: Our Values */}
                            {valuesList.length > 0 && (
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
                            )}

                            {/* Card 2: Our Culture */}
                            {cultureText && (
                                <div className="col-md-4 about-card-col">
                                    <div className="about-card card-gold">
                                        <div className="about-card-inner">
                                            <h3 className="about-card-title">Our Culture</h3>
                                            <p className="about-card-desc">{cultureText}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Card 3: Our Promise */}
                            {promiseText && (
                                <div className="col-md-4 about-card-col">
                                    <div className="about-card card-dark">
                                        <div className="about-card-inner">
                                            <h3 className="about-card-title">Our Promise</h3>
                                            <p className="about-card-desc">{promiseText}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import Link from 'next/link';
import { getPageData, resolveImageUrl } from '@/services/api';

export default function OurHistoryPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSlide, setActiveSlide] = useState(0);
    const [selectedYearIdx, setSelectedYearIdx] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const data = await getPageData('our-history');
                if (isMounted && data) {
                    setPageData(data);
                }
            } catch (err) {
                console.error("Failed to load our-history data:", err);
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

    const rawTimeline = Array.isArray(body.history_timeline) && body.history_timeline.length > 0
        ? body.history_timeline
        : (Array.isArray(body.timeline) ? body.timeline : []);
    const timeline = rawTimeline.filter((t: any) => t && (t.year || t.description || t.image));

    const prevYear = () => {
        if (timeline.length === 0) return;
        setSelectedYearIdx((prev) => (prev === 0 ? timeline.length - 1 : prev - 1));
    };

    const nextYear = () => {
        if (timeline.length === 0) return;
        setSelectedYearIdx((prev) => (prev + 1) % timeline.length);
    };

    const introSubtitle = body.intro_subtitle || '';
    const introTitle = body.intro_title || body.content_title || '';
    const introText = body.intro_text || (body.content ? body.content.replace(/<[^>]+>/g, '') : '') || '';

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || '';
    const activeTimelineItem = timeline[selectedYearIdx] || timeline[0] || null;

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
                            <Link href="/about/our-history" className="about-subnav-link active">
                                Our History
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* ================= INTRO BLOCK ================= */}
            {(introTitle || introSubtitle || introText) && (
                <section className="about-intro-section" id="intro">
                    <div className="container">
                        {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                        {introTitle && <h2 className="about-intro-title">{introTitle}</h2>}
                        {introText && <p className="about-intro-text">{introText}</p>}
                    </div>
                </section>
            )}

            {/* ================= TIMELINE SECTION ================= */}
            {timeline.length > 0 && (
                <section className="about-history-section">
                    <div className="container">
                        {/* Year Pills Slider / Horizontal Nav */}
                        <div className="about-history-years-wrap">
                            <div className="about-history-years">
                                {timeline.map((item: any, idx: number) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`about-history-year-btn ${idx === selectedYearIdx ? 'active' : ''}`}
                                        onClick={() => setSelectedYearIdx(idx)}
                                    >
                                        {item.year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Year Display Card */}
                        {activeTimelineItem && (
                            <div className="about-history-card">
                                <div className="about-history-card-header">
                                    <button
                                        type="button"
                                        className="about-history-nav-btn"
                                        onClick={prevYear}
                                        aria-label="Previous Year"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                        <span>Previous</span>
                                    </button>

                                    <h3 className="about-history-active-year">{activeTimelineItem?.year}</h3>

                                    <button
                                        type="button"
                                        className="about-history-nav-btn"
                                        onClick={nextYear}
                                        aria-label="Next Year"
                                    >
                                        <span>Next</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>

                                <div className="row align-items-center g-4">
                                    {(activeTimelineItem?.image || activeTimelineItem?.image_url) && (
                                        <div className="col-lg-6">
                                            <div className="about-history-img-wrap">
                                                <img
                                                    src={resolveImageUrl(activeTimelineItem?.image_url || activeTimelineItem?.image)}
                                                    alt={`History ${activeTimelineItem?.year}`}
                                                    className="about-history-img"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className={`col-lg-${(activeTimelineItem?.image || activeTimelineItem?.image_url) ? '6 ps-lg-4' : '12'}`}>
                                        <div
                                            className="about-history-desc"
                                            dangerouslySetInnerHTML={{ __html: activeTimelineItem?.description || '' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}

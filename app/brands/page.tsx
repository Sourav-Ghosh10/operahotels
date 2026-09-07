"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import Link from 'next/link';
import { getPageData, resolveImageUrl } from '@/services/api';

function resolveImage(img: string | undefined | null, fallback: string = ""): string { return img ? resolveImageUrl(img) : fallback; }

export default function BrandsPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('our-brands');
            if (data) {
                setPageData(data);
            }
        };
        load();
    }, []);

    const body = pageData?.body || {};

    const defaultBannerSlides = [
        {
            image: 'brands_banner_1.jpg',
            title: 'Explore Our Award-winning Brands',
            subtitle: 'Hospitality Management Holding'
        },
        {
            image: 'brands_banner_2.jpg',
            title: 'Award-winning Brands',
            subtitle: 'Rooftop Lounge at Hospitality Management Holding'
        },
        {
            image: 'brands_banner_3.jpg',
            title: 'Award-winning Brands',
            subtitle: 'Business at Hospitality Management Holding'
        }
    ];

    const bannerSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : [];

    useEffect(() => {
        if (bannerSlides.length <= 1) return;
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [bannerSlides.length]);

    const introTitle = body.intro_title || '5 DISTINCT YET COMPLEMENTARY BRANDS';
    const introContent = body.content || `
        <p>Our hotels offer unparalleled hospitality services in some of the most desirable destinations across the GCC region. Whether you're traveling for business or leisure, you'll find hidden gems in popular landmark locations.</p>
        <p>From Dubai's iconic skyline to the bustling souks of Jeddah and the ancient ruins of Amman, HMH has something to offer everyone.</p>
    `;

    const sectionTitle = body.content_title || 'Our Brands';
    const sectionSubtitle = body.expansion_text || '<p>Hospitality Management Holding (HMH) provides a choice of brands catering to all market segments.</p>';

    const defaultBrands = [
        {
            name: 'Bahi Hotels & Resorts',
            tagline: 'Impeccable Plush',
            image: 'brand_showcase_bahi.jpg',
            logo: 'brand_logo_bahi.svg',
            link: '/bahi-hotels-resorts',
            description: 'Upscale 5-Star beach brand - heritage retreats with a contemporary spirit'
        },
        {
            name: 'Coral Hotels & Resorts',
            tagline: 'You are Unique for Us',
            image: 'brand_showcase_coral.jpg',
            logo: 'brand_logo_coral.svg',
            link: '/coral-hotels-resorts',
            description: 'Designed for discerning travellers who seek secluded surroundings, distinctive service and a safe environment across key destinations in the GCC.'
        },
        {
            name: 'Corp Hotels',
            tagline: 'Urban Comfort',
            image: 'brand_showcase_corp.jpg',
            logo: 'brand_logo_corp.svg',
            link: '/corp-hotels',
            description: 'Specifically designed for global business guests, offering modern comfort at exceptional value; authentic Arabic hospitality combined with first-class service.'
        },
        {
            name: 'Ewa Hotel Apartments',
            tagline: 'It Feels Like Home',
            image: 'brand_showcase_ewa.jpg',
            logo: 'brand_logo_ewa.svg',
            link: '/ewa-hotel-apartments',
            description: 'Beautifully laid out serviced apartments with a residential look and feel, the ideal home away from home for short and long stays.'
        },
        {
            name: 'ECOS Hotels',
            tagline: 'Experience It',
            image: 'brand_showcase_ecos.jpg',
            logo: 'brand_logo_ecos.svg',
            link: '/ecos-hotels',
            description: 'Millennial-centric lifestyle hotspots - the perfect fusion of ultramodern comfort, value, and practicality.'
        }
    ];

    const brandsList = Array.isArray(body.brands_list) && body.brands_list.length > 0
        ? body.brands_list
        : [];

    return (
        <>
            <link rel="stylesheet" href="/css/brands.css" />

            <main>
                {/* Hero Banner Slider Section */}
                <header className="brands-hero-section">
                    <div className="brands-hero-slider">
                        {bannerSlides.map((slide: any, idx: number) => {
                            const bgUrl = resolveImage(slide.image, resolveImageUrl('brands_banner_1.jpg'));
                            return (
                                <div
                                    key={idx}
                                    className={`brands-hero-slide ${idx === activeSlide ? 'active' : ''}`}
                                    style={{ backgroundImage: `url('${bgUrl}')` }}
                                />
                            );
                        })}
                    </div>

                    <div className="brands-hero-overlay"></div>

                    {/* Navigation Header */}
                    <div style={{ position: "relative", zIndex: 10 }}>
                        <Header />
                    </div>

                    {/* Banner Content */}
                    <div className="brands-hero-content">
                        <span className="brands-hero-subtitle">
                            {bannerSlides[activeSlide]?.subtitle || 'Hospitality Management Holding'}
                        </span>
                        <h1 className="brands-hero-title">
                            {bannerSlides[activeSlide]?.title || pageData?.title || 'Our Brands'}
                        </h1>
                    </div>

                    {/* Slider Navigation Arrows */}
                    {bannerSlides.length > 1 && (
                        <div className="brands-slider-arrows">
                            <button
                                className="brands-slider-arrow"
                                type="button"
                                aria-label="Previous Slide"
                                onClick={() => setActiveSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button
                                className="brands-slider-arrow"
                                type="button"
                                aria-label="Next Slide"
                                onClick={() => setActiveSlide((prev) => (prev + 1) % bannerSlides.length)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Slider Indicator Dots */}
                    {bannerSlides.length > 1 && (
                        <div className="brands-slider-dots">
                            {bannerSlides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    className={`brands-slider-dot ${idx === activeSlide ? 'active' : ''}`}
                                    onClick={() => setActiveSlide(idx)}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </header>

                {/* Brands Intro Section */}
                <section className="brands-intro">
                    <div className="intro-container">
                        <h2 className="section-title">{introTitle}</h2>
                        <div dangerouslySetInnerHTML={{ __html: introContent }} />
                    </div>
                </section>

                {/* Our Brands Interactive 5-Column Grid */}
                <section className="our-brands-section">
                    <div className="container-fluid-custom">
                        <div className="intro-area">
                            <span className="h2-heading">{sectionTitle}</span>
                            {sectionSubtitle && (
                                <div className="intro-subtitle-text" dangerouslySetInnerHTML={{ __html: sectionSubtitle }} />
                            )}
                        </div>

                        <div className="feature-block-grid">
                            {brandsList.map((brand: any, idx: number) => {
                                const bgUrl = resolveImage(brand.image, resolveImageUrl('brand_showcase_bahi.jpg'));
                                const logoUrl = resolveImage(brand.logo);
                                const brandLink = brand.link || '#';
                                const cleanDesc = (brand.description || '').replace(/<[^>]*>?/gm, '');

                                return (
                                    <Link key={idx} href={brandLink} className="hmh-brand-card">
                                        <div className="hmh-brand-top">
                                            <div
                                                className="hmh-brand-bg"
                                                style={{ backgroundImage: `url('${bgUrl}')` }}
                                            />
                                            <div className="hmh-brand-overlay" />

                                            {/* Brand Logo */}
                                            <div className="hmh-brand-logo-wrap">
                                                {logoUrl ? (
                                                    <img
                                                        src={logoUrl}
                                                        alt={brand.name || 'Brand Logo'}
                                                        className="hmh-brand-logo-img"
                                                    />
                                                ) : (
                                                    <span style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 600 }}>
                                                        {brand.name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Slogan / Tagline */}
                                            {brand.tagline && (
                                                <div className="hmh-brand-tagline-wrap">
                                                    <h3 className="hmh-brand-tagline">{brand.tagline}</h3>
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover Slide-up Content Panel */}
                                        <div className="hmh-brand-bottom">
                                            <p className="hmh-brand-description">{cleanDesc}</p>
                                            <span className="hmh-brand-btn">
                                                Read More
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Brands Bottom Bar */}
                <OurBrandsBar />
            </main>
        </>
    );
}

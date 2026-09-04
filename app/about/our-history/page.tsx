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

const defaultTimeline = [
    {
        year: '2023',
        image: 'history_ajman_palace.jpg',
        description: '<ul><li>Hospitality Management Holding (HMH) Announces Signing Of Hotel Management Agreement For Corp Yanbu Hotel And Residence, A Magnificent Coastal Hotel In Saudi Arabia.</li><li>Coral Beach Resort Sharjah hosts, the UAE Lifeguard Championship.</li></ul>',
    },
    {
        year: '2022',
        image: 'history_ecos_dubai.jpg',
        description: '<ul><li>Launch Of First Hotel Under The ECOS Hotels Brand At Al Furjan, Dubai.</li><li>HMH’s Successful Blood Donation Drive Across Its UAE Operation.</li><li>Coral Beach Resort Sharjah, Managed By Hospitality Management Holding (HMH), Becomes A Hard Of Hearing Friendly Hotel With Its New Amsaan Technology.</li><li>ECOS Dubai Hotel At Al Furjan Managed By Hospitality Management Holding (HMH), Wins A Prestigious Global Design Award.</li><li>Bahi Ajman Palace Hotel, Managed By Hospitality Management Holding (HMH), Pastry Chef Receives Middle East Chef Excellence Award.</li></ul>',
    },
    {
        year: '2021',
        image: 'history_blood_donation.jpg',
        description: '<ul><li>Coral Beach Resort Sharjah, Managed By Hospitality Management Holding (HMH), Becomes A Hard Of Hearing Friendly Hotel With Its New Amsaan Technology.</li><li>HMH Signs Partnership With Ethiopian Airlines ShebaMiles.</li></ul>',
    },
    {
        year: '2020',
        image: 'history_beach_resort.jpg',
        description: '<ul><li>Bahi Ajman Palace Hotel Re-Opens After Restoration.</li><li>HMH Joins Royal Jordanian Airline’s Royal Club.</li></ul>',
    },
    {
        year: '2019',
        image: 'history_corp_hotel.jpg',
        description: '<ul><li>HMH - Hospitality Management Holding Ceases Management Of Coral Dubai Al Barsha Hotel.</li><li>Hospitality Management Holding (HMH) Signs Management Contract for Corp Yanbu Hotel & Residence.</li><li>HMH - Hospitality Management Holding Signs Agreement with Sabre Hospitality Solutions.</li><li>HMH - Hospitality Management Holding Celebrates Successful Blood Donation Drive.</li></ul>',
    },
    {
        year: '2018',
        image: 'history_hmh_expansion.jpg',
        description: '<ul><li>CEO of HMH Highlights the risks and rewards of operating in frontier markets.</li><li>HMH Celebrates ‘Clean up UAE’ Campaign.</li></ul>',
    },
    {
        year: '2017',
        image: 'history_about_event.jpg',
        description: '<ul><li>HMH Appoints Rafat Gotta New General Manager At Coral Dubai Deira Hotel.</li><li>HMH Announces Re-Opening Of Coral Beach Resort Sharjah.</li><li>HMH Re-Brands The Ajman Palace Hotel To Bahi Ajman Palace Hotel.</li></ul>',
    },
    {
        year: '2016',
        image: 'history_coral_muscat.jpg',
        description: '<ul><li>HMH continues expansion in Oman - Signs Corp Muscat Al Muzn Hotel.</li><li>Coral Muscat Hotel & Apartments officially opens.</li><li>HMH Signs Agreement with Faisal Holding to develop ECOS Hotels.</li></ul>',
    },
    {
        year: '2015',
        image: 'history_ewa_khartoum.jpg',
        description: '<ul><li>HMH announced the official opening of EWA Khartoum Hotel & Apartments.</li><li>HMH Launches Coral Hotel Jubail in Saudi Arabia.</li><li>HMH Launches EWA Mahdia Hotel in Tunisia.</li></ul>',
    },
    {
        year: '2014',
        image: 'history_jubail_majlis.jpg',
        description: '<ul><li>Streamlining and optimization of distribution structure to allow growth by effectively integrating brands.</li><li>Coral Beach Resort Sharjah underwent a multi-million-dirham refurbishment.</li><li>HMH signed management contract for Coral Jubail Hotel in KSA.</li></ul>',
    },
    {
        year: '2013',
        image: 'history_sheikha_wafa.jpg',
        description: '<ul><li>Under the Kind Patronage of H.H. Sheikha Wafa Hasher Al Maktoum, HMH launched its 10th anniversary celebrations.</li><li>HMH rolled out aggressive regional expansion strategy.</li></ul>',
    },
    {
        year: '2012',
        image: 'history_ajman_palace_launch.jpg',
        description: '<ul><li>HMH commemorated the 41st UAE National Day with the soft launch of The Ajman Palace Hotel.</li><li>Coral Hotels & Resorts signed management contract for Coral Muscat Hotel & Apartments.</li></ul>',
    },
    {
        year: '2011',
        image: 'history_beirut_concorde.jpg',
        description: '<ul><li>Coral Hotels & Resorts signed management contract for Coral Beirut Concorde Hotel.</li><li>Coral Hotels & Resorts launched Coral Boutique Villas in Dubai.</li></ul>',
    },
    {
        year: '2010',
        image: 'history_khartoum_hotel.jpg',
        description: '<ul><li>HMH formalized a management agreement for Coral Khartoum Hotel in Sudan.</li><li>HMH expanded in Iraq and Lebanon.</li></ul>',
    },
    {
        year: '2009',
        image: 'history_coral_ahsa.jpg',
        description: '<ul><li>Coral Hotels & Resorts signed the management contract for Coral Plaza Al Ahsa in KSA.</li><li>HMH continued its aggressive expansion across the GCC.</li></ul>',
    },
    {
        year: '2008',
        image: 'history_beirut_alhamra.jpg',
        description: '<ul><li>HMH rolled out a new brand: EWA Hotel Apartments.</li><li>Coral Hotels & Resorts entered Beirut with Coral Beirut Al Hamra.</li></ul>',
    },
    {
        year: '2007',
        image: 'history_corp_amman.jpg',
        description: '<ul><li>HMH conceived ECOS Hotels.</li><li>Coral Hotels & Resorts entered KSA with Coral Al Khobar Hotel.</li><li>Coral Hotels & Resorts opened Coral Sea Hotel in Port Sudan.</li></ul>',
    },
    {
        year: '2006',
        image: 'history_jubail_gateway.jpg',
        description: '<ul><li>Launch of Corp Hotels brand.</li><li>Coral Hotels & Resorts grabbed three top honours at the prestigious MENA Travel Awards.</li></ul>',
    },
    {
        year: '2004',
        image: 'history_alfursan.jpg',
        description: '<ul><li>Coral Hotels & Resorts acquired its second property Coral Dubai Deira Hotel.</li><li>Partnership established with Emirates Skywards and Saudia Al Fursan.</li></ul>',
    },
    {
        year: '2003',
        image: 'history_coral_foundation.jpg',
        description: '<ul><li>Coral Hotels & Resorts was founded in Dubai on September 29 by H.E. Sheikh Faisal bin Sultan Al Qassimi and Mana Al Maktoum.</li><li>First flagship property Coral Beach Resort Sharjah commenced operations.</li></ul>',
    },
];

export default function OurHistoryPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeBannerSlide, setActiveBannerSlide] = useState(0);
    const [selectedYearIdx, setSelectedYearIdx] = useState(0);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('our-history');
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
            { image: 'history_banner_1.jpg', title: 'Our History', subtitle: '' },
            { image: 'history_banner_2.jpg', title: 'Our History', subtitle: '' },
            { image: 'history_banner_3.jpg', title: 'Our History', subtitle: '' },
        ];

    useEffect(() => {
        if (bannerSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerSlides.length]);

    const prevBannerSlide = () => {
        setActiveBannerSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const nextBannerSlide = () => {
        setActiveBannerSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const introSubtitle = body.intro_subtitle || 'HMH Hospitality Management Holding Journey';
    const introTitle = body.intro_title || 'Our History';
    const introText = body.intro_text ||
        'Founded in 2003, Hospitality Management Holding (HMH) has grown across the Middle East & Africa region with a portfolio of distinct hotel brands.';

    const timelineList = Array.isArray(body.history_timeline) && body.history_timeline.length > 0
        ? body.history_timeline
        : defaultTimeline;

    const currentSlide = bannerSlides[activeBannerSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || 'Our History';

    const activeTimelineItem = timelineList[selectedYearIdx] || timelineList[0];

    const prevYear = () => {
        setSelectedYearIdx((prev) => (prev === 0 ? timelineList.length - 1 : prev - 1));
    };

    const nextYear = () => {
        setSelectedYearIdx((prev) => (prev + 1) % timelineList.length);
    };

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
                                className={`about-hero-slide ${idx === activeBannerSlide ? 'active' : ''}`}
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
                        <button className="about-hero-arrow about-hero-prev" onClick={prevBannerSlide} aria-label="Previous Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button className="about-hero-arrow about-hero-next" onClick={nextBannerSlide} aria-label="Next Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="about-hero-dots">
                            {bannerSlides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    className={`about-hero-dot ${idx === activeBannerSlide ? 'active' : ''}`}
                                    onClick={() => setActiveBannerSlide(idx)}
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
            <section className="about-intro-section" id="intro">
                <div className="container">
                    {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                    <h2 className="about-intro-title">{introTitle}</h2>
                    <p className="about-intro-text">{introText}</p>
                </div>
            </section>

            {/* ================= HISTORY TIMELINE TABS ================= */}
            <section className="about-history-section">
                <div className="container">

                    {/* Horizontal Year Selector Bar */}
                    <div className="about-history-years-bar">
                        <div className="about-history-years-track">
                            {timelineList.map((item: any, idx: number) => (
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
                            <div className="col-lg-6">
                                <div className="about-history-img-wrap">
                                    <img
                                        src={resolveImageUrl(activeTimelineItem?.image)}
                                        alt={`HMH History ${activeTimelineItem?.year}`}
                                        className="about-history-img"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 ps-lg-4">
                                <div
                                    className="about-history-desc"
                                    dangerouslySetInnerHTML={{ __html: activeTimelineItem?.description || '' }}
                                />
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
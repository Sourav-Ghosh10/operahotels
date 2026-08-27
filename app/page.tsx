"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import Footer from "@/components/Footer";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import Link from 'next/link';
import CarouselNav from "@/components/CarouselNav";
import { getPageData, getLocationsData, getComingSoonData } from '@/services/api';

export default function Page() {
    const [pageData, setPageData] = useState<any>(null);
    const [locationsData, setLocationsData] = useState<any[]>([]);
    const [comingSoonData, setComingSoonData] = useState<any[]>([]);
    const [destinations, setDestinations] = useState<any[]>([]);

    useEffect(() => {
        const loadPageData = async () => {
            const data = await getPageData('home');
            if (data) {
                setPageData(data);
            }
        };
        const loadLocationsData = async () => {
            const locations = await getLocationsData();
            if (locations) {
                setLocationsData(locations);
            }
        };

        const loadComingSoonData = async () => {
            const comingSoon = await getComingSoonData();
            if (comingSoon) {
                setComingSoonData(comingSoon);
            }
        };

        const loadDestinations = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/destinations`);
                if (res.ok) {
                    const json = await res.json();
                    const mapped = (json.data || [])
                        .filter((dest: any) => dest.slug && (dest.name || dest.name_en))
                        .map((dest: any) => ({
                            id: dest.id,
                            slug: dest.slug,
                            name: dest.name || dest.name_en || "",
                        }));
                    if (mapped.length > 0) {
                        setDestinations(mapped);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch destinations:", err);
            }
        };

        loadPageData();
        loadLocationsData();
        loadComingSoonData();
        loadDestinations();
    }, []);



    useEffect(() => {
        if (locationsData && locationsData.length > 0 && typeof window !== "undefined" && window.$) {
            const timer = setTimeout(() => {
                const $ = window.$;
                if ($('.explore-carousel').length && !$('.explore-carousel').hasClass('owl-loaded')) {
                    var owl = $('.explore-carousel').owlCarousel({
                        loop: true,
                        margin: 30,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        responsive: {
                            0: { items: 1, margin: 15 },
                            768: { items: 2, margin: 20 },
                            992: { items: 3, margin: 30 },
                            1200: { items: 4, margin: 30 }
                        }
                    });
                    $('.explore-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.explore-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                } else if ($('.explore-carousel').hasClass('owl-loaded')) {
                    $('.explore-carousel').trigger('destroy.owl.carousel');
                    $('.explore-carousel').find('.owl-stage-outer').children().unwrap();
                    $('.explore-carousel').removeClass("owl-center owl-loaded owl-text-select-on");

                    var owl = $('.explore-carousel').owlCarousel({
                        loop: true,
                        margin: 30,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        responsive: {
                            0: { items: 1, margin: 15 },
                            768: { items: 2, margin: 20 },
                            992: { items: 3, margin: 30 },
                            1200: { items: 4, margin: 30 }
                        }
                    });
                    $('.explore-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.explore-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [locationsData]);

    useEffect(() => {
        if (comingSoonData && comingSoonData.length > 0 && typeof window !== "undefined" && window.$) {
            const timer = setTimeout(() => {
                const $ = window.$;
                if ($('.amenities-carousel').length && !$('.amenities-carousel').hasClass('owl-loaded')) {
                    var owl = $('.amenities-carousel').owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        items: 1
                    });
                    $('.amenities-nav-btn.next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.amenities-nav-btn.prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                } else if ($('.amenities-carousel').hasClass('owl-loaded')) {
                    $('.amenities-carousel').trigger('destroy.owl.carousel');
                    $('.amenities-carousel').find('.owl-stage-outer').children().unwrap();
                    $('.amenities-carousel').removeClass("owl-center owl-loaded owl-text-select-on");
                    
                    var owl = $('.amenities-carousel').owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        items: 1
                    });
                    $('.amenities-nav-btn.next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.amenities-nav-btn.prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [comingSoonData]);

    const bannerSubtitle = pageData?.body?.intro_subtitle || "YOU ARE UNIQUE FOR US";
    const bannerTitle = pageData?.body?.intro_title || "WELCOME TO OPERA GRAND HOTEL";
    const content = pageData?.body?.content;
    const exploreButtonText = pageData?.body?.cta_text || "EXPLORE MORE";

    return (
        <main>
            {/* Hero Section with Header */}
            <header className="hero-section">
                {/* Background Slider */}
                <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
                    data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: 0 }}>
                    <div className="carousel-inner h-100">
                        {pageData?.body?.banner_slides && pageData.body.banner_slides.length > 0 &&
                            pageData.body.banner_slides.map((slide: any, index: number) => {
                                const imageUrl = slide.image.startsWith('http')
                                    ? slide.image
                                    : `${process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '') : 'http://127.0.0.1:8000'}/uploads/${slide.image}`;

                                return (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} data-bs-interval="5000">
                                        <div className="slider-image w-100 h-100"
                                            style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                                        </div>
                                        <div className="hero-content position-absolute top-50 start-50 translate-middle text-center w-100" style={{ zIndex: 10 }}>
                                            {slide.subtitle && <h2 className="welcome-text">{slide.subtitle}</h2>}
                                            {slide.title && <h1 className="main-title">{slide.title}</h1>}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {/* Banner Overlay */}
                <div className="hero-overlay"></div>

                {/* Navigation */}
                <Header initialDestinations={destinations.length > 0 ? destinations : undefined} />

                {/* Banner Content (Hidden as per new design matching screenshot) */}
                {/* 
                <div className="hero-content position-relative" style={{ zIndex: 10 }}>
                    <h2 className="welcome-text">{bannerSubtitle}</h2>
                    <h1 className="main-title">{bannerTitle}</h1>
                </div> 
                */}

                {/* Carousel Controls */}
                <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#heroCarousel"
                    data-bs-slide="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="20" y1="12" x2="4" y2="12"></line>
                        <polyline points="10 18 4 12 10 6"></polyline>
                    </svg>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#heroCarousel"
                    data-bs-slide="next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <polyline points="14 6 20 12 14 18"></polyline>
                    </svg>
                    <span className="visually-hidden">Next</span>
                </button>

            </header>

            {/* Welcome Section */}
            <section className="welcome-section pt-5 pb-5">
                <div className="container text-center mt-4">
                    <h4 className="welcome-subtitle mb-3" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', color: '#555' }}>{bannerSubtitle}</h4>
                    <h2 className="section-title mb-4" style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{bannerTitle}</h2>
                    <div className="welcome-content mx-auto" style={{ maxWidth: "900px" }}>
                        {content && (
                            <div className="welcome-p mb-4 text-muted" style={{ lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: content }} />
                        )}
                        <div className="mt-4">
                            <Link href="/brands" className="btn btn-gold-large">{exploreButtonText}</Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="gold-separator mx-auto"></div>

            {/* Exclusive Offers Section */}
            <ExclusiveOffers />

            {/* Explore Section */}
            <section className="explore-section  bg-white">
                <div className="container">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-5">
                        <h2 className="explore-section-title mb-2 mb-sm-0">Our Locations</h2>
                        <Link href="/destinations" className="learn-more-link">LEARN MORE</Link>
                    </div>
                </div>
            </section>

            <div className="container-fluid px-0">
                {/* Owl Carousel */}
                <div className="owl-carousel explore-carousel">
                    {locationsData && locationsData.length > 0 ? (
                        locationsData.map((location: any, index: number) => {
                            const locationName = location.city_name || 'Location';
                            const locationDesc = location.home_teaser || '';
                            const locationImg = location.home_image || '/img/explore_museum.png';

                            return (
                                <div key={location.id || index} className="explore-card">
                                    <div className="explore-img-box" style={{ backgroundImage: `url('${locationImg}')` }}>
                                        <div className="explore-img-overlay">
                                            <h3 className="explore-card-title">{locationName.toUpperCase()}</h3>
                                        </div>
                                    </div>
                                    <div className="explore-card-body">
                                        <p className="explore-card-desc" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>{locationDesc}</p>
                                        <a href={`/locations/${location.id}`} className="explore-readmore">READ MORE</a>
                                    </div>
                                </div>
                            );
                        })
                    ) : null}
                </div>

                {/* Custom Carousel Navigation Controls */}
                <CarouselNav className="explore-carousel-nav d-flex justify-content-center align-items-center mt-4 gap-5" />

                {/* Gold line separator */}
                <div className="gold-separator mx-auto mt-4 mb-5"></div>
            </div>

            {/* Amenities Section */}
            <section className="amenities-section">
                <div className="container-fluid">
                    <div className="row g-0 align-items-stretch">
                        {/* Left Column: Content */}
                        <div
                            className="col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end bg-white py-5">
                            <div className="amenities-text-block">
                                <h2 className="amenities-title">{comingSoonData[0]?.title || 'Coming Soon'}</h2>
                                <p className="amenities-p">{comingSoonData[0]?.hotel_name || 'Corp Makkah Al Naseem Hotel'}</p>
                                <p className="amenities-p">{comingSoonData[0]?.description || 'Located just 12 kilometers from Masjid Al Haram on Al Taef road in Makkah, our 4-star hotel blends luxury with convenience. Stay tuned for chic guest rooms, lavish suites, and more!'}</p>
                            </div>
                        </div>

                        {/* Right Column: Slider */}
                        <div className="col-lg-6 position-relative px-0">
                            <div key={comingSoonData && comingSoonData.length > 0 ? 'loaded' : 'fallback'} className="owl-carousel amenities-carousel">
                                {comingSoonData && comingSoonData.length > 0 ? (
                                    comingSoonData.map((item, i) => (
                                        <div key={i} className="amenities-slide-item" style={{ backgroundImage: `url('${item.image_url}')` }}></div>
                                    ))
                                ) : (
                                    <>
                                        <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_pool.png')" }}></div>
                                        <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_gym.png')" }}></div>
                                        <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_spa.png')" }}></div>
                                    </>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}





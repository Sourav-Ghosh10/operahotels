"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import { getPageData, getOffersData, getLocationsData } from '@/services/api';

export default function Page() {
    const [pageData, setPageData] = useState<any>(null);
    const [offersData, setOffersData] = useState<any[]>([]);
    const [locationsData, setLocationsData] = useState<any[]>([]);

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
        const loadOffersData = async () => {
            const offers = await getOffersData();
            if (offers) {
                setOffersData(offers);
            }
        };

        loadPageData();
        loadOffersData();
        loadLocationsData();
    }, []);

    useEffect(() => {
        if (offersData && offersData.length > 0 && typeof window !== "undefined" && window.$) {
            const timer = setTimeout(() => {
                const $ = window.$;
                if ($('.offers-carousel').length && !$('.offers-carousel').hasClass('owl-loaded')) {
                    var owl = $('.offers-carousel').owlCarousel({
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
                            992: { items: 3, margin: 30 }
                        }
                    });
                    $('.offers-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.offers-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                } else if ($('.offers-carousel').hasClass('owl-loaded')) {
                    // If it was already loaded empty, we need to destroy and re-init or trigger refresh
                    $('.offers-carousel').trigger('destroy.owl.carousel');
                    $('.offers-carousel').find('.owl-stage-outer').children().unwrap();
                    $('.offers-carousel').removeClass("owl-center owl-loaded owl-text-select-on");
                    
                    var owl = $('.offers-carousel').owlCarousel({
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
                            992: { items: 3, margin: 30 }
                        }
                    });
                    $('.offers-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.offers-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [offersData]);

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
                <Header />

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
                            <a href="#" className="btn btn-gold-large">{exploreButtonText}</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="gold-separator mx-auto"></div>

            {/* Exclusive Offers Section */}
            <section className="exclusive-offers-section">
                <div className="container">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-3">
                        <h2 className="offers-section-title mb-2 mb-sm-0">EXCLUSIVE OFFERS</h2>
                        <a href="#" className="discover-offers-link">DISCOVER OUR SPECIAL OFFERS</a>
                    </div>
                    <p>Good things come to those who book direct.</p>
                    {/* Owl Carousel */}
                    <div className="owl-carousel offers-carousel">
                        {offersData && offersData.length > 0 ? (
                            offersData.map((offer: any, index: number) => {
                                const offerName = offer.name?.en || offer.name || 'Exclusive Offer';
                                const offerDesc = offer.description?.en || offer.description || '25% OFF ON YOUR BOOKINGS';
                                const bannerImg = offer.banner_image || '/img/summer_escape.png';
                                const offerType = offer.offer_type || 'OFFER';
                                
                                return (
                                    <div key={offer.id || index} className="offer-card-item">
                                        <div className="offer-card">
                                            <div className="offer-img-box" style={{ backgroundImage: `url('${bannerImg}')` }}>
                                                <div className="offer-hover-overlay">
                                                    <span className="offer-hover-badge">REGISTER NOW</span>
                                                    <span className="offer-hover-discount">{offerDesc}</span>
                                                </div>
                                            </div>
                                            <div className="offer-content">
                                                <h3 className="offer-title">{offerName}</h3>
                                                <div className="offer-hover-details">
                                                    <a href={`/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug}`} className="offer-readmore">READ MORE</a>
                                                    <a href="#" className="btn btn-offer-book">BOOK NOW</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : null}
                    </div>

                    {/* Custom Carousel Navigation Controls */}
                    <div className="offers-carousel-nav d-flex justify-content-center align-items-center mt-5 gap-5">
                        <button className="offers-nav-btn prev-btn" type="button" aria-label="Previous">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="20" y1="12" x2="4" y2="12"></line>
                                <polyline points="10 18 4 12 10 6"></polyline>
                            </svg>
                        </button>
                        <button className="offers-nav-btn next-btn" type="button" aria-label="Next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12"></line>
                                <polyline points="14 6 20 12 14 18"></polyline>
                            </svg>
                        </button>
                    </div>

                    {/* Gold Line Separator Bottom */}
                    <div className="gold-separator mx-auto mt-5"></div>
                </div>
            </section>

            {/* Explore Section */}
            <section className="explore-section  bg-white">
                <div className="container">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-5">
                        <h2 className="explore-section-title mb-2 mb-sm-0">Our Locations</h2>
                        <a href="#" className="learn-more-link">LEARN MORE</a>
                    </div>
                </div>
            </section>
            
            <div className="container-fluid px-0">
                {/* Owl Carousel */}
                <div className="owl-carousel explore-carousel">
                    {/* Slide 1: Dubai Museum */}
                    <div className="explore-card">
                        <div className="explore-img-box" style={{ backgroundImage: "url('/img/explore_museum.png')" }}>
                            <div className="explore-img-overlay">
                                <h3 className="explore-card-title">DUBAI MUSEUM</h3>
                            </div>
                        </div>
                        <div className="explore-card-body">
                            <p className="explore-card-desc">Step back in time at Al Fahidi Fort, housing historical exhibits
                                that showcase the traditional Emirati way of life.</p>
                            <a href="#" className="explore-readmore">READ MORE</a>
                        </div>
                    </div>

                    {/* Slide 2: Dubai Mall */}
                    <div className="explore-card">
                        <div className="explore-img-box" style={{ backgroundImage: "url('/img/explore_mall.png')" }}>
                            <div className="explore-img-overlay">
                                <h3 className="explore-card-title">DUBAI MALL</h3>
                            </div>
                        </div>
                        <div className="explore-card-body">
                            <p className="explore-card-desc">Explore the world's largest retail and entertainment destination,
                                featuring a giant aquarium and an indoor ice rink.</p>
                            <a href="#" className="explore-readmore">READ MORE</a>
                        </div>
                    </div>

                    {/* Slide 3: Dubai Frame */}
                    <div className="explore-card">
                        <div className="explore-img-box" style={{ backgroundImage: "url('/img/explore_frame.png')" }}>
                            <div className="explore-img-overlay">
                                <h3 className="explore-card-title">DUBAI FRAME</h3>
                            </div>
                        </div>
                        <div className="explore-card-body">
                            <p className="explore-card-desc">This modern architectural marvel is a short drive away and offers
                                panoramic views of both the historic and modern parts of Dubai.</p>
                            <a href="#" className="explore-readmore">READ MORE</a>
                        </div>
                    </div>

                    {/* Slide 4: Deira Clocktower */}
                    <div className="explore-card">
                        <div className="explore-img-box" style={{ backgroundImage: "url('/img/explore_clocktower.png')" }}>
                            <div className="explore-img-overlay">
                                <h3 className="explore-card-title">DEIRA CLOCKTOWER</h3>
                            </div>
                        </div>
                        <div className="explore-card-body">
                            <p className="explore-card-desc">An iconic monument located at the intersection of Deira,
                                representing the rich history and rapid growth of Dubai.</p>
                            <a href="#" className="explore-readmore">READ MORE</a>
                        </div>
                    </div>
                </div>

                {/* Custom Carousel Navigation Controls */}
                <div className="explore-carousel-nav d-flex justify-content-center align-items-center mt-5 gap-4 mb-5">
                    <button className="explore-nav-btn prev-btn" type="button" aria-label="Previous">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="20" y1="12" x2="4" y2="12"></line>
                            <polyline points="10 18 4 12 10 6"></polyline>
                        </svg>
                    </button>
                    <button className="explore-nav-btn next-btn" type="button" aria-label="Next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <polyline points="14 6 20 12 14 18"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Amenities Section */}
            <section className="amenities-section">
                <div className="container-fluid">
                    <div className="row g-0 align-items-stretch">
                        {/* Left Column: Content */}
                        <div
                            className="col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end bg-white py-5">
                            <div className="amenities-text-block">
                                <h2 className="amenities-title">Coming Soon</h2>
                                <p className="amenities-p">Corp Makkah Al Naseem Hotel

                                </p>
                                <p className="amenities-p">Corp Makkah Al Naseem Hotel



                                    Located just 12 kilometers from Masjid Al Haram on Al Taef road in Makkah, our 4-star
                                    hotel blends luxury with convenience. Stay tuned for chic guest rooms, lavish suites,
                                    and more!</p>

                            </div>
                        </div>

                        {/* Right Column: Slider */}
                        <div className="col-lg-6 position-relative px-0">
                            <div className="owl-carousel amenities-carousel">
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_pool.png')" }}></div>
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_gym.png')" }}></div>
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('/img/amenity_spa.png')" }}></div>
                            </div>

                            {/* Overlay Navigation Arrows */}
                            <button className="amenities-nav-btn prev-btn" type="button" aria-label="Previous">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <line x1="20" y1="12" x2="4" y2="12"></line>
                                    <polyline points="10 18 4 12 10 6"></polyline>
                                </svg>
                            </button>
                            <button className="amenities-nav-btn next-btn" type="button" aria-label="Next">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <polyline points="14 6 20 12 14 18"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}





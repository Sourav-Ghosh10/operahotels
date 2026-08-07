"use client";
import React from 'react';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Page() {
    return (
        <main>
            {/* Hero Section with Header */}
            <header className="hero-section">
                {/* Background Slider */}
                <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
                    data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: 0 }}>
                    <div className="carousel-inner h-100">
                        {/* Slide 1 */}
                        <div className="carousel-item active h-100" data-bs-interval="5000">
                            <div className="slider-image w-100 h-100"
                                style={{ backgroundImage: "url('./img/slider-1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            </div>
                        </div>
                        {/* Slide 2 */}
                        <div className="carousel-item h-100" data-bs-interval="5000">
                            <div className="slider-image w-100 h-100"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            </div>
                        </div>
                        {/* Slide 3 */}
                        <div className="carousel-item h-100" data-bs-interval="5000">
                            <div className="slider-image w-100 h-100"
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banner Overlay */}
                <div className="hero-overlay"></div>

                {/* Navigation */}
                <Header />

                {/* Banner Content */}
                <div className="hero-content position-relative" style={{ zIndex: 10 }}>
                    <h2 className="welcome-text">Welcome To</h2>
                    <h1 className="main-title">OPERA GRAND HOTEL</h1>
                </div>

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
            <section className="welcome-section">
                <div className="container text-center">
                    <h2 className="section-title">5 Distinct Brands, For An Unforgettable Experience</h2>
                    <div className="welcome-content mx-auto" style={{ maxWidth: "900px" }}>
                        <p className="welcome-p mb-3">Discover unique personalities blending international standards with local
                            heritage.
                            Exclusive offers await for your perfect stay - book direct for exceptional savings.</p>
                        <a href="#" className="btn btn-gold-large">EXPLORE MORE</a>
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
                        {/* Card 1: Summer Escape */}
                        <div className="offer-card-item">
                            <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: "url('img/summer_escape.png')" }}>
                                    <span className="offer-badge">SUMMER ESCAPE</span>
                                    <div className="offer-hover-overlay">
                                        <span className="offer-hover-badge">REGISTAR NOW</span>
                                        <span className="offer-hover-discount">25%OFF ON YOUR BOOKINGS</span>
                                    </div>
                                </div>
                                <div className="offer-content">
                                    <h3 className="offer-title">Exclusive Summer Offer</h3>
                                    <div className="offer-hover-details">
                                        <a href="#" className="offer-readmore">READ MORE</a>
                                        <a href="#" className="btn btn-offer-book">BOOK NOW</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Exclusive Member Rates */}
                        <div className="offer-card-item">
                            <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: "url('img/exclusive_member_rates.png')" }}>
                                    <span className="offer-badge">MEMBER RATES</span>
                                    <div className="offer-hover-overlay">
                                        <span className="offer-hover-badge">REGISTAR NOW</span>
                                        <span className="offer-hover-discount">25%OFF ON YOUR BOOKINGS</span>
                                    </div>
                                </div>
                                <div className="offer-content">
                                    <h3 className="offer-title">Exclusive Member Rates</h3>
                                    <div className="offer-hover-details">
                                        <a href="#" className="offer-readmore">READ MORE</a>
                                        <a href="#" className="btn btn-offer-book">BOOK NOW</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: ESAAD Exclusive Offer */}
                        <div className="offer-card-item">
                            <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: "url('img/esaad_exclusive_offer.png')" }}>
                                    <span className="offer-badge">ESAAD OFFER</span>
                                    <div className="offer-hover-overlay">
                                        <span className="offer-hover-badge">REGISTAR NOW</span>
                                        <span className="offer-hover-discount">25%OFF ON YOUR BOOKINGS</span>
                                    </div>
                                </div>
                                <div className="offer-content">
                                    <h3 className="offer-title">ESAAD Exclusive Offer</h3>
                                    <div className="offer-hover-details">
                                        <a href="#" className="offer-readmore">READ MORE</a>
                                        <a href="#" className="btn btn-offer-book">BOOK NOW</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div className="explore-img-box" style={{ backgroundImage: "url('img/explore_museum.png')" }}>
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
                        <div className="explore-img-box" style={{ backgroundImage: "url('img/explore_mall.png')" }}>
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
                        <div className="explore-img-box" style={{ backgroundImage: "url('img/explore_frame.png')" }}>
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
                        <div className="explore-img-box" style={{ backgroundImage: "url('img/explore_clocktower.png')" }}>
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
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('img/amenity_pool.png')" }}></div>
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('img/amenity_gym.png')" }}></div>
                                <div className="amenities-slide-item" style={{ backgroundImage: "url('img/amenity_spa.png')" }}></div>
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

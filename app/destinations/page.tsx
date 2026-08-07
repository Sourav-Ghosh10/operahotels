"use client";
import React from 'react';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Page() {
    return (
        <main>
            <header className="hero-section">

        {/* Background Slider */}
        <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
            data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
            <div className="carousel-inner h-100">

                {/* Slide 2 */}
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                </div>
                {/* Slide 3 */}
                <div className="carousel-item h-100" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('./img/futuristic-dubai-landscape/ 1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                </div>
            </div>
        </div>

        {/* Banner Overlay */}
        <div className="hero-overlay"></div>

        {/* Navigation */}
        <Header />

        {/* Banner Content */}
        <div className="hero-content position-relative" style={{ zIndex: "10" }}>
            <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>ICONIC DESTINATIONS</h1>
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


    {/* Destinations Intro Section */}
    <section className="destinations-intro">
        <div className="container">
            <h2 className="section-title">DISCOVER YOUR NEXT EXPERIENCE</h2>
            <p className="destinations-p">
                Our Hotels offer unparalleled hospitality services in some of the most desirable destinations across the
                GCC region. Whether you're traveling for business or leisure, you'll find hidden gems in popular
                landmark locations.
            </p>
            <p className="destinations-p mb-0">
                From Dubai's iconic skyline to the bustling centre of Jeddah and the ancient ruins of Amman, HMH has
                something to offer everyone.
            </p>
        </div>
    </section>

    {/* Destinations Grid Section */}
    <section className="destinations-grid-section">
        <div className="container">
            <div className="destinations-grid-custom">

                {/* Top Row (2 Cards) */}
                <div className="destinations-row">
                    {/* UAE */}
                    <div className="destination-card">
                        <div className="destination-card-img-wrapper">
                            <img src="/img/des-1.png" alt="UAE Destination" className="destination-card-img" />
                        </div>
                        <h3 className="destination-card-title">UAE</h3>
                        <p className="destination-card-text">
                            A destination where world-class hospitality blends seamlessly with unparalleled luxury, set
                            against stunning landscapes and vibrant culture.
                        </p>
                        <a href="dubai.html" className="destination-card-link">Read More</a>
                    </div>

                    {/* Saudi Arabia */}
                    <div className="destination-card">
                        <div className="destination-card-img-wrapper">
                            <img src="/img/des-2.png" alt="UAE Destination" className="destination-card-img" />
                        </div>
                        <h3 className="destination-card-title">Saudi Arabia</h3>
                        <p className="destination-card-text">
                            Saudi Arabia offers a fascinating blend of rich heritage and futuristic innovation. Discover
                            ancient landmarks and cosmopolitan cities, all with our signature warm hospitality.
                        </p>
                        <a href="dubai.html" className="destination-card-link">Read More</a>
                    </div>
                </div>

                {/* Bottom Row (2 Cards) */}
                <div className="destinations-row">
                    {/* Jordan */}
                    <div className="destination-card">
                        <div className="destination-card-img-wrapper">
                            <img src="/img/des-3.png" alt="UAE Destination" className="destination-card-img" />
                        </div>
                        <h3 className="destination-card-title">Jordan</h3>
                        <p className="destination-card-text">
                            Experience the magic of Jordan, where ancient wonders meet modern luxury. Explore rich
                            history and vibrant landscapes while enjoying world-class hospitality.
                        </p>
                        <a href="dubai.html" className="destination-card-link">Read More</a>
                    </div>

                    {/* Sudan */}
                    <div className="destination-card">
                        <div className="destination-card-img-wrapper">
                            <img src="/img/des-4.png" alt="UAE Destination" className="destination-card-img" />
                        </div>
                        <h3 className="destination-card-title">Sudan</h3>
                        <p className="destination-card-text">
                            Discover the hidden gems of Sudan, from ancient pyramids to stunning landscapes. Explore its
                            rich history and diverse culture with our warm hospitality.
                        </p>
                        <a href="dubai.html" className="destination-card-link">Read More</a>
                    </div>
                </div>

            </div>
        </div>
    </section>
    {/* Our Location Section */}
    <section className="location-section">
        <div className="location-map-wrapper">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.315591956063!2d55.135694!3d25.077065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6be84e9f9c99%3A0x2e9b3e1e2e3f4a5b!2sJumeirah%20Lake%20Towers%2C%20Dubai!5e0!3m2!1sen!2sae!4v1690000000000!5m2!1sen!2sae"
                className="location-map-iframe" width="100%" height="100%" style={{ border: "0" }} allowFullScreen={true}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Opera Hotel Dubai Location">
            </iframe>
        </div>
        <div className="location-info-wrapper">
            <h2 className="location-heading">OUR LOCATION</h2>
            <div className="location-address-block">
                <div className="location-city">
                    <svg className="location-pin-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <strong>Dubai</strong>
                </div>
                <p className="location-address-text">
                    Suites 106/107, Madina Tower, Cluster O<br />
                    Jumeirah Lake Towers , PO Box 66232,<br />
                    Dubai â€“ UAE
                </p>
            </div>
        </div>
    </section>

    {/* ===== FOOTER ===== */}
    
        </main>
    );
}

"use client";
import React from 'react';
import Header from '@/components/Header';

export default function Page() {
    return (
        <main>
            <link rel="stylesheet" href="/css/brands.css" />
            <header className="hero-section">

        {/* Background Slider */}
        <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
            data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
            <div className="carousel-inner h-100">

                {/* Slide 2 */}
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('/img/luxury-hotel-reception-hall-lounge-restaurant-with-high-ceiling 1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
        <div className="hero-content position-relative" style={{ zIndex: "10" }}>
            <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>BRANDS & HOTELS</h1>
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


    {/* Brands Intro Section */}
    <section className="brands-intro">
        <div className="container">
            <h2 className="section-title">5 DISTINCT YET COMPLEMENTARY BRANDS</h2>
            <p className="brands-p">
                Our hotels offer unparalleled hospitality services in some of the most desirable destinations across the
                GCC region. Whether you're traveling for business or leisure, you'll find hidden gems in popular
                landmark locations.
            </p>
            <p className="brands-p mb-0">
                From Dubai's iconic skyline to the bustling centre of Jeddah and the ancient ruins of Amman, HMH has
                something to offer everyone.
            </p>
        </div>
    </section>

    {/* Our Brands Grid Section */}
    <section className="our-brands-section">
        <div className="container">
            <h2 className="section-title">Our Brands</h2>
            <div className="brands-grid-custom">

                {/* Top Row (2 Cards) */}
                <div className="brands-row-top">
                    {/* BAHI Hotels & Resorts */}
                    <a href="#" className="brand-card">
                        <div className="brand-card-bg" style={{ backgroundImage: "url('/img/bahi_bg.png')" }}></div>
                        <div className="brand-card-overlay"></div>
                        <div className="brand-card-content">
                            <div className="brand-card-logo-container">
                                <svg className="brand-card-logo" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                                    <text x="10" y="55" fontFamily="Georgia, serif" fontSize="52" fontWeight="700"
                                        fill="#FFFFFF" letterSpacing="4">BAHI</text>
                                    <text x="12" y="78" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="300"
                                        fill="#FFFFFF" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
                                    <path
                                        d="M235 8 H258 C272 8 281 14 281 25 C281 32 275 37 265 39 C278 41 288 48 288 60 C288 73 277 79 262 79 H235 V8 Z M248 19 V40 H260 C267 40 273 36 273 30 C273 24 267 19 260 19 H248 Z M248 51 V68 H261 C268 68 274 64 274 60 C274 55 268 51 261 51 H248 Z"
                                        fill="#FFFFFF" />
                                </svg>
                            </div>
                            <h3 className="brand-card-tagline">Impeccable Plush</h3>
                        </div>
                    </a>

                    {/* Opera Grand Hotel */}
                    <a href="#" className="brand-card">
                        <div className="brand-card-bg" style={{ backgroundImage: "url('/img/opera_bg.png')" }}></div>
                        <div className="brand-card-overlay"></div>
                        <div className="brand-card-content">
                            <div className="brand-card-logo-container">
                                <img src="/img/operalogo-white 1.png" alt="Opera Grand Hotel" className="brand-card-logo"
                                    style={{ maxHeight: "90px" }} />
                            </div>
                            <h3 className="brand-card-tagline">You are Unique for Us</h3>
                        </div>
                    </a>
                </div>

                {/* Bottom Row (3 Cards) */}
                <div className="brands-row-bottom">
                    {/* CORP Hotels */}
                    <a href="#" className="brand-card">
                        <div className="brand-card-bg" style={{ backgroundImage: "url('/img/corp_bg.png')" }}></div>
                        <div className="brand-card-overlay"></div>
                        <div className="brand-card-content">
                            <div className="brand-card-logo-container">
                                <svg className="brand-card-logo corp-logo" viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="5" width="190" height="190" stroke="#FFFFFF" strokeWidth="3"
                                        fill="none" />
                                    <text x="100" y="108" fontFamily="Arial, sans-serif" fontSize="60"
                                        fontWeight="300" fill="#FFFFFF" textAnchor="middle"
                                        letterSpacing="1">corp</text>
                                    <text x="100" y="140" fontFamily="Arial, sans-serif" fontSize="15"
                                        fontWeight="500" fill="#FFFFFF" textAnchor="middle"
                                        letterSpacing="5">HOTELS</text>
                                </svg>
                            </div>
                            <h3 className="brand-card-tagline">Urban Comfort</h3>
                        </div>
                    </a>

                    {/* EWA Hotel Apartments */}
                    <a href="#" className="brand-card">
                        <div className="brand-card-bg" style={{ backgroundImage: "url('/img/ewa_bg.png')" }}></div>
                        <div className="brand-card-overlay"></div>
                        <div className="brand-card-content">
                            <div className="brand-card-logo-container">
                                <svg className="brand-card-logo" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="60" y="5" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                                        fill="none" />
                                    <rect x="116" y="5" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                                        fill="none" />
                                    <rect x="60" y="61" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                                        fill="none" />
                                    <rect x="116" y="61" width="48" height="48" rx="14" stroke="#FFFFFF"
                                        strokeWidth="5" fill="none" />
                                    <text x="120" y="133" fontFamily="Arial, sans-serif" fontSize="36"
                                        fontWeight="700" fill="#FFFFFF" textAnchor="middle"
                                        letterSpacing="3">ewa</text>
                                    <text x="120" y="155" fontFamily="Arial, sans-serif" fontSize="13"
                                        fontWeight="300" fill="#FFFFFF" textAnchor="middle" letterSpacing="1.5">Hotel
                                        Apartments</text>
                                </svg>
                            </div>
                            <h3 className="brand-card-tagline">It Feels Like Home</h3>
                        </div>
                    </a>

                    {/* ECOS Hotels */}
                    <a href="#" className="brand-card">
                        <div className="brand-card-bg" style={{ backgroundImage: "url('/img/ecos_bg.png')" }}></div>
                        <div className="brand-card-overlay"></div>
                        <div className="brand-card-content">
                            <div className="brand-card-logo-container">
                                <svg className="brand-card-logo" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
                                    <text x="120" y="60" fontFamily="Arial, sans-serif" fontSize="58"
                                        fontWeight="200" fill="#FFFFFF" textAnchor="middle"
                                        letterSpacing="3">ecos</text>
                                    <text x="120" y="86" fontFamily="Arial, sans-serif" fontSize="15"
                                        fontWeight="500" fill="#FFFFFF" textAnchor="middle"
                                        letterSpacing="5">Hotels</text>
                                </svg>
                            </div>
                            <h3 className="brand-card-tagline">Experience It</h3>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>{/* Our Location Section */}
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
                    Dubai – UAE
                </p>
            </div>
        </div>
    </section>

    {/* ===== FOOTER ===== */}
    
        </main>
    );
}

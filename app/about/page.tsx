
import React from 'react';
import Header from '@/components/ServerHeader';
import Head from 'next/head';

export default function Page() {
    return (
        <main>
            <link rel="stylesheet" href="/css/about.css" />
            <header className="hero-section">

        {/* Background Slider */}
        <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
            data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
            <div className="carousel-inner h-100">

                {/* Slide 2 */}
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('/img/mood-option-2 1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
            <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>ABOUT US</h1>
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


    {/* Sub Navbar */}
    <div className="about-subnav">
        <div className="container d-flex flex-wrap justify-content-center">
            <a href="#" className="active">About Us</a>
            <a href="#">Corporate Responsibility</a>
            <a href="#">Our Heritage</a>
            <a href="#">Board of Directors and History</a>
            <a href="#">Our Privacy</a>
        </div>
    </div>

    {/* Intro Section */}
    <section className="about-intro">
        <div className="container text-center">
            <h5 className="section-subtitle">HOSPITALITY MANAGEMENT HOLDING</h5>
            <h2 className="section-title">Get to know</h2>
            <p className="about-p">
                Opera Grand Hotel stands as a leading force in the MENA hospitality sector, since its inception in 2003.
                HMH has been steadfast in its commitment to its guests in its commitment to providing impeccable
                service, operational excellence, and a comprehensive approach to wellbeing. This has enabled HMH to
                carve out a unique position in the industry, with its diverse portfolio of five distinct brands: Bahi,
                Coral, Corp, Ewa, and Ecos; each tailored to cater to specific market needs and designed to provide
                exceptional experiences.
            </p>
        </div>
    </section>

    {/* Split Section */}
    <section className="about-split bg-light-brown">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6 py-5 pe-md-5 d-flex flex-column justify-content-center">
                    <p className="about-p mb-4">
                        Strategically expanding across the MENA region, HMH has successfully discovered new
                        opportunities and created significant value for all stakeholders. Our properties occupy prime
                        locations across the region, and with a robust pipeline of hotels under development, our reach
                        continues to broaden.
                    </p>
                    <p className="about-p mb-0">
                        In the face of global adversities, HMH has demonstrated remarkable resilience and adaptability.
                        Our approach to overcoming these challenges not only strengthens our resolve but also paves the
                        way for continued growth. With a proven record of excellence, a strategic growth trajectory, and
                        an unwavering commitment to wellbeing, sustainability, and innovation, HMH stands ready to
                        capitalize on emerging opportunities in the MENA hospitality industry.
                    </p>
                </div>
                <div className="col-md-6 py-4">
                    <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000"
                        alt="Hotel Lobby" className="about-split-img" />
                </div>
            </div>
        </div>
    </section>

    {/* Cards Section */}
    <section className="about-cards">
        <div className="container">
            <div className="row g-4 justify-content-center">
                {/* Card 1 */}
                <div className="col-md-4">
                    <div className="about-card card-blue">
                        <div className="about-card-inner">
                            <h3 className="about-card-title">Our Values</h3>
                            <ul className="about-card-list">
                                <li>Excellence</li>
                                <li>Integrity</li>
                                <li>Innovation</li>
                                <li>Wellness and Accessibility</li>
                                <li>Accountability</li>
                                <li>Sustainability</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="col-md-4">
                    <div className="about-card card-brown">
                        <div className="about-card-inner">
                            <h3 className="about-card-title">Our Culture</h3>
                            <p className="about-card-text">
                                Our culture is led by service excellence; characterized by a forward-looking,
                                responsible, people-centric ethos with a strong focus on technology, diversity, wellness
                                and environmental considerations.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="col-md-4">
                    <div className="about-card card-black">
                        <div className="about-card-inner">
                            <h3 className="about-card-title">Our Promise</h3>
                            <p className="about-card-text">
                                At Opera Grand Hotel, we exceed expectations, ensuring sustainable growth in the MENA
                                region. Emphasising wellness and accessibility, we create a vibrant environment,
                                enriching the guest and associates' journey, and building trust with stakeholders
                                through profitable operations.

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Vision Section */}
    <section className="about-vision py-4">
        <div className="container-fluid px-4 px-xl-5">
            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                        alt="Our Vision" className="about-vision-img" />
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                    <div style={{ maxWidth: "480px", width: "100%" }}>
                        <h3 className="about-section-heading">Our Vision</h3>
                        <p className="about-p w-100">
                            To build trust with our clients, enrich the healthy journey of our guests in a vibrant
                            environment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Mission Section */}
    <section className="about-mission py-4">
        <div className="container-fluid px-4 px-xl-5">
            <div className="row align-items-center">
                <div className="col-md-6 order-2 order-md-1 d-flex justify-content-center mt-4 mt-md-0">
                    <div style={{ maxWidth: "480px", width: "100%" }}>
                        <h3 className="about-section-heading">Our Mission</h3>
                        <p className="about-p w-100">
                            At Opera Grand Hotel we, exceed expectations, ensuring sustainable growth in the MENA
                            region.
                            Emphasising wellness and accessibility, we create a vibrant environment, enriching the guest
                            and
                            associates' journey, and building trust with stakeholders through profitable operations.
                        </p>
                    </div>
                </div>
                <div className="col-md-6 order-1 order-md-2">
                    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1000"
                        alt="Our Mission" className="about-mission-img" />
                </div>
            </div>
        </div>
    </section>

    <section className="brands-section about-brands py-5">
        <div className="container">
            <h2 className="brands-section-title text-white text-center mb-5">Our Brands</h2>
            <div
                className="brands-grid d-flex flex-wrap justify-content-center justify-content-md-between align-items-center">

                {/* BAHI Hotels & Resorts */}
                <div className="brand-item">
                    <svg className="brand-logo" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="10" y="55" fontFamily="Georgia, serif" fontSize="52" fontWeight="700" fill="#FFFFFF"
                            letterSpacing="4">BAHI</text>
                        <text x="12" y="78" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="300"
                            fill="#FFFFFF" letterSpacing="2.5">HOTELS &amp; RESORTS</text>
                        <path
                            d="M235 8 H258 C272 8 281 14 281 25 C281 32 275 37 265 39 C278 41 288 48 288 60 C288 73 277 79 262 79 H235 V8 Z M248 19 V40 H260 C267 40 273 36 273 30 C273 24 267 19 260 19 H248 Z M248 51 V68 H261 C268 68 274 64 274 60 C274 55 268 51 261 51 H248 Z"
                            fill="#FFFFFF" />
                    </svg>
                </div>

                {/* CORAL Hotels & Resorts */}
                <div className="brand-item">
                    <svg className="brand-logo" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="8" y="58" fontFamily="Georgia, serif" fontSize="52" fontWeight="600" fill="#FFFFFF"
                            letterSpacing="5">CORAL</text>
                        <text x="10" y="80" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="300"
                            fill="#FFFFFF" letterSpacing="2">Hotels &amp; Resorts</text>
                        <g transform="translate(258, 18)" fill="#FFFFFF">
                            <circle cx="12" cy="4" r="4" />
                            <circle cx="22" cy="11" r="3" />
                            <circle cx="2" cy="11" r="3" />
                            <line x1="12" y1="10" x2="12" y2="38" stroke="#FFFFFF" strokeWidth="3"
                                strokeLinecap="round" />
                            <line x1="12" y1="18" x2="22" y2="12" stroke="#FFFFFF" strokeWidth="2.5"
                                strokeLinecap="round" />
                            <line x1="12" y1="24" x2="2" y2="18" stroke="#FFFFFF" strokeWidth="2.5"
                                strokeLinecap="round" />
                            <line x1="12" y1="30" x2="20" y2="25" stroke="#FFFFFF" strokeWidth="2"
                                strokeLinecap="round" />
                            <line x1="12" y1="34" x2="5" y2="28" stroke="#FFFFFF" strokeWidth="2"
                                strokeLinecap="round" />
                        </g>
                    </svg>
                </div>

                {/* CORP Hotels */}
                <div className="brand-item">
                    <svg className="brand-logo corp-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="5" width="190" height="190" stroke="#FFFFFF" strokeWidth="3" fill="none" />
                        <text x="100" y="108" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="300"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="1">corp</text>
                        <text x="100" y="140" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="500"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="5">HOTELS</text>
                    </svg>
                </div>

                {/* EWA Hotel Apartments */}
                <div className="brand-item">
                    <svg className="brand-logo" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
                        <rect x="60" y="5" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                            fill="none" />
                        <rect x="116" y="5" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                            fill="none" />
                        <rect x="60" y="61" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                            fill="none" />
                        <rect x="116" y="61" width="48" height="48" rx="14" stroke="#FFFFFF" strokeWidth="5"
                            fill="none" />
                        <text x="120" y="133" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="700"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="3">ewa</text>
                        <text x="120" y="155" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="300"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="1.5">Hotel Apartments</text>
                    </svg>
                </div>

                {/* ECOS Hotels */}
                <div className="brand-item">
                    <svg className="brand-logo" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="120" y="60" fontFamily="Arial, sans-serif" fontSize="58" fontWeight="200"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="3">ecos</text>
                        <text x="120" y="86" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="500"
                            fill="#FFFFFF" textAnchor="middle" letterSpacing="5">Hotels</text>
                    </svg>
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
                    Dubai - UAE
                </p>
            </div>
        </div>
    </section>

    {/* ===== FOOTER ===== */}
    
        </main>
    );
}

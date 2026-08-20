import React from 'react';
import Header from '@/components/ServerHeader';
import Head from 'next/head';
import '../destination-details.css';

export default function Page() {
    return (
        <main>
            <link rel="stylesheet" href="/css/offers.css" />
            <header className="hero-section">
                {/* Background Slider */}
                <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
                    data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
                    <div className="carousel-inner h-100">
                        {/* Slide 1 */}
                        <div className="carousel-item h-100 active" data-bs-interval="5000">
                            <div className="slider-image w-100 h-100"
                                style={{ backgroundImage: "url('https://image-tc.galaxy.tf/wijpeg-3t536yj35tbdogp4bb75tkxa6/pool.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
                    <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>SHARJAH</h1>
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

            {/* Intro Section */}
            <section className="uae-intro">
                <div className="container">
                    <h2 className="section-title">CORAL BEACH RESORT SHARJAH</h2>
                    <p className="uae-p">
                        Welcome to Coral Beach Resort Sharjah official site. Our Sharjah family hotel offers a haven of relaxation and enjoyment in the United Arab Emirates.
                    </p>
                    <p className="uae-p mb-0">
                        With pristine beaches, family-friendly amenities, and unparalleled hospitality, Coral Beach Resort provides a perfect escape for travelers seeking comfort and cultural enrichment.
                    </p>
                </div>
            </section>

            {/* Rooms & Suites Section */}
            <section className="offers-grid-section" style={{ backgroundColor: "#f9f9f9" }}>
                <div className="container">
                    <h2 className="section-title text-center mb-5" style={{ fontFamily: "var(--font-primary)", fontWeight: 500, letterSpacing: "2px" }}>ROOMS &amp; SUITES</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_standard_king.png" alt="Standard King Room" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Standard King Room</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_premium_king.png" alt="Premium King Room" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Premium King Room</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_king_balcony.png" alt="King Room with Balcony" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">King Room with Balcony</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_twin_balcony.png" alt="Twin Room with Balcony" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Twin Room with Balcony</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining Section */}
            <section className="city-section">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="/img/dining_al_nafoora.png" alt="Al Nafoora Restaurant" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">DINING: AL NAFOORA</h3>
                                <p className="city-text">
                                    Experience a culinary journey at Al Nafoora, where traditional and international flavors meet. 
                                    Our chefs craft exquisite dishes using the freshest ingredients to provide an unforgettable dining experience.
                                </p>
                                <a href="#" className="city-btn">Explore Dining</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="city-section bg-light-grey">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row flex-lg-row-reverse">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="/img/dining_rumours_cafe.png" alt="Rumours Cafe" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">RUMOURS CAFE</h3>
                                <p className="city-text">
                                    Relax and unwind at Rumours Cafe. Enjoy a selection of premium coffees, teas, and freshly baked pastries 
                                    in a cozy and inviting atmosphere.
                                </p>
                                <a href="#" className="city-btn">Explore Dining</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="offers-grid-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5" style={{ fontFamily: "var(--font-primary)", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase" }}>Special Offers</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="/img/summer_escape.png" alt="Summer Escape" />
                                    <div className="offer-tag">SUMMER ESCAPE</div>
                                </div>
                                <h4 className="offer-title">Exclusive Summer Offer</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="/img/esaad_exclusive_offer.png" alt="ESAAD Exclusive Offer" />
                                </div>
                                <h4 className="offer-title">ESAAD Exclusive Offer</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="/img/exclusive_member_rates.png" alt="Exclusive Member Rates" />
                                </div>
                                <h4 className="offer-title">Exclusive Member Rates</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="city-section bg-light-grey">
                <div className="container-fluid px-0">
                    <h2 className="section-title text-center pt-5 pb-4 mb-0" style={{ fontFamily: "var(--font-primary)", fontWeight: 500, letterSpacing: "2px" }}>AMENITIES &amp; FACILITIES</h2>
                    <div className="row g-0 city-row">
                        <div className="col-lg-4">
                            <div className="city-img-wrapper" style={{ height: "400px" }}>
                                <img src="/img/amenity_pool.png" alt="Pool" className="city-img" />
                            </div>
                            <div className="text-center py-4" style={{ backgroundColor: "#fff" }}>
                                <h4 style={{ fontFamily: "var(--font-primary)", fontWeight: 600, textTransform: "uppercase", fontSize: "1.1rem" }}>Swimming Pool</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="city-img-wrapper" style={{ height: "400px" }}>
                                <img src="/img/amenity_gym.png" alt="Gym" className="city-img" />
                            </div>
                            <div className="text-center py-4" style={{ backgroundColor: "#fff" }}>
                                <h4 style={{ fontFamily: "var(--font-primary)", fontWeight: 600, textTransform: "uppercase", fontSize: "1.1rem" }}>Fitness Center</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="city-img-wrapper" style={{ height: "400px" }}>
                                <img src="/img/amenity_spa.png" alt="Spa" className="city-img" />
                            </div>
                            <div className="text-center py-4" style={{ backgroundColor: "#fff" }}>
                                <h4 style={{ fontFamily: "var(--font-primary)", fontWeight: 600, textTransform: "uppercase", fontSize: "1.1rem" }}>Spa &amp; Wellness</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Local Attractions Section */}
            <section className="offers-grid-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5" style={{ fontFamily: "var(--font-primary)", fontWeight: 500, letterSpacing: "2px" }}>EXPLORE SHARJAH</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/explore_museum.png" alt="Sharjah Museum" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Sharjah Museum</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/sharjah_mosque.png" alt="Al Noor Mosque" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Al Noor Mosque</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/explore_clocktower.png" alt="Clock Tower" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Clock Tower</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/explore_mall.png" alt="Shopping Malls" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Shopping Malls</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Location Section */}
            <section className="location-section">
                <div className="location-map-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.331206121666!2d55.42199131501256!3d25.393717983805333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f59cfdf9bdc0d%3A0xc32c2ed12ffb892a!2sCoral%20Beach%20Resort%20Sharjah!5e0!3m2!1sen!2sae!4v1690000000000!5m2!1sen!2sae"
                        className="location-map-iframe" width="100%" height="100%" style={{ border: "0" }} allowFullScreen={true}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Coral Beach Resort Sharjah Location">
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
                            <strong>Sharjah</strong>
                        </div>
                        <p className="location-address-text">
                            Al Muntazah Street, Sharjah Corniche<br />
                            PO Box 5524, Sharjah<br />
                            United Arab Emirates
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

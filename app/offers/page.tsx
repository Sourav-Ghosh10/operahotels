
import React from 'react';
import Header from '@/components/Header';

export default function Page() {
    return (
        <main>
            <link rel="stylesheet" href="/css/offers.css" />
            <header className="hero-section">

                {/* Background Slider */}
                <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
                    data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
                    <div className="carousel-inner h-100">

                {/* Slide 2 */}
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('/img/uae_wide 1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                </div>

                {/* Banner Overlay */}
                <div className="hero-overlay"></div>

                {/* Navigation */}
                <Header />

                {/* Banner Content */}
                <div className="hero-content position-relative" style={{ zIndex: "10" }}>
                    <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>SPECIAL OFFERS</h1>
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


            {/* Offers Section */}
            <section className="offers-intro">
                <div className="container text-center">
                    <h2 className="section-title">GREAT OFFERS ARE JUST A CLICK</h2>
                    <p className="offers-p">
                        Unbeatable pricing just for you / holidays.<br />
                        Elevate your stay with exclusive offers designed to enhance every moment of your journey.
                    </p>

                    <div className="offers-filters">
                        <select className="offers-filter-select">
                            <option>All Hotels</option>
                            <option>Bahi Hotels & Resorts</option>
                            <option>Coral Hotels & Resorts</option>
                        </select>
                        <select className="offers-filter-select">
                            <option>All type of offers</option>
                            <option>Summer Escape</option>
                            <option>Exclusive</option>
                        </select>
                        <button className="offers-search-btn">Search <i className="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </section>

            {/* Offers Grid */}
            <section className="offers-grid-section">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        {/* Offer 1 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop"
                                        alt="Summer Escape" />
                                    <div className="offer-tag">SUMMER ESCAPE</div>
                                </div>
                                <h4 className="offer-title">Exclusive Summer Offer</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>

                        {/* Offer 2 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop"
                                        alt="ESAAD Exclusive Offer" />
                                </div>
                                <h4 className="offer-title">ESAAD Exclusive Offer</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>

                        {/* Offer 3 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="/img/nourth-square-trending-now 1.png" alt="ADCB Card Exclusive Offer" />
                                    <div className="offer-tag">SUMMER ESCAPE</div>
                                </div>
                                <h4 className="offer-title">ADCB Card Exclusive Offer</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>

                        {/* Offer 4 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper">
                                    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop"
                                        alt="Exclusive Member Rates" />
                                </div>
                                <h4 className="offer-title">Exclusive Member Rates</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
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

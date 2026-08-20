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
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
                    <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>AJMAN</h1>
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
                    <h2 className="section-title">BAHI AJMAN PALACE HOTEL</h2>
                    <p className="uae-p">
                        Welcome to Bahi Ajman Palace Hotel. Set on a private beach offering stunning views of the Arabian Gulf, this heritage resort seamlessly blends modern luxury with authentic Arabian hospitality.
                    </p>
                    <p className="uae-p mb-0">
                        Whether you are seeking a peaceful retreat, exquisite dining, or world-class event spaces, Bahi Ajman Palace delivers a truly unforgettable experience tailored just for you.
                    </p>
                </div>
            </section>

            {/* Ajman Section */}
            <section id="ajman" className="city-section">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=2070&auto=format&fit=crop" alt="Ajman" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">AJMAN</h3>
                                <p className="city-text">
                                    As the smallest of the seven emirates, Ajman offers a peaceful retreat away from the
                                    bustling crowds. Known for its pristine white-sand beaches and relaxed coastal atmosphere,
                                    it is the perfect destination for unwinding and reconnecting with nature.
                                    <br /><br />
                                    The picturesque Ajman Corniche invites visitors for leisurely strolls along the Arabian
                                    Gulf, while the historic Ajman Museum, housed in an 18th-century fort, provides a glimpse
                                    into the region's fascinating past. Experience genuine hospitality and tranquility in this
                                    charming, laid-back emirate.
                                </p>
                                <a href="#" className="city-btn">Explore Ajman</a>
                                <a href="#" className="city-btn city-btn-secondary">Our Hotels In Ajman</a>
                            </div>
                        </div>
                    </div>
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
                                    <img src="/img/room_standard_king.png" alt="Deluxe Room" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Deluxe Room</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_premium_king.png" alt="Premium Room" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Premium Room</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_king_balcony.png" alt="One Bedroom Suite" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">One Bedroom Suite</h4>
                                <a href="#" className="offer-btn">BOOK NOW</a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card">
                                <div className="offer-img-wrapper" style={{ height: "250px" }}>
                                    <img src="/img/room_twin_balcony.png" alt="Two Bedroom Suite" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                                </div>
                                <h4 className="offer-title">Two Bedroom Suite</h4>
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
                                <img src="/img/dining_al_nafoora.png" alt="Arabesque Dining" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">ARABESQUE DINING</h3>
                                <p className="city-text">
                                    Embark on a culinary adventure featuring a rich fusion of traditional Middle Eastern dishes and international cuisines. 
                                    Enjoy exceptional dining in an elegant, palace-inspired setting.
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
                                <img src="/img/dining_rumours_cafe.png" alt="Majlis Cafe" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">MAJLIS CAFE</h3>
                                <p className="city-text">
                                    Perfect for casual meetings or a relaxing break. Majlis Cafe offers a delightful selection of premium hot beverages, 
                                    fresh pastries, and light snacks in a welcoming atmosphere.
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
                                <img src="/img/amenity_pool.png" alt="Private Beach & Pool" className="city-img" />
                            </div>
                            <div className="text-center py-4" style={{ backgroundColor: "#fff" }}>
                                <h4 style={{ fontFamily: "var(--font-primary)", fontWeight: 600, textTransform: "uppercase", fontSize: "1.1rem" }}>Private Beach &amp; Pool</h4>
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
                    <h2 className="section-title text-center mb-5" style={{ fontFamily: "var(--font-primary)", fontWeight: 500, letterSpacing: "2px" }}>EXPLORE AJMAN</h2>
                    <div className="row g-4 justify-content-center">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/explore_museum.png" alt="Ajman Museum" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Ajman Museum</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/sharjah_mosque.png" alt="Heritage District" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">Heritage District</h4>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="offer-card pb-4">
                                <div className="offer-img-wrapper" style={{ height: "200px" }}>
                                    <img src="/img/explore_clocktower.png" alt="City Centre" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                </div>
                                <h4 className="offer-title mb-0">City Centre</h4>
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.340058866946!2d55.434057!3d25.4121543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f59fa041ad4cf%3A0xc00f025cb7deee94!2sBahi%20Ajman%20Palace%20Hotel!5e0!3m2!1sen!2sae!4v1690000000000!5m2!1sen!2sae"
                        className="location-map-iframe" width="100%" height="100%" style={{ border: "0" }} allowFullScreen={true}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Bahi Ajman Palace Hotel Location">
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
                            <strong>Ajman</strong>
                        </div>
                        <p className="location-address-text">
                            Sheikh Humaid Bin Rashid Al Nuaimi Street<br />
                            PO Box 7176, Ajman<br />
                            United Arab Emirates
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

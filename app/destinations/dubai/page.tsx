import React from 'react';
import Header from '@/components/ServerHeader';
import Head from 'next/head';
import '../destination-details.css';

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
                                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?q=80&w=2070&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
                    <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>UAE</h1>
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


            {/* UAE Intro Section */}
            <section className="uae-intro">
                <div className="container">
                    <h2 className="section-title">UAE</h2>
                    <p className="uae-p">
                        The United Arab Emirates (UAE) presents a captivating blend of traditional Arabian hospitality and
                        futuristic ambition. From towering skyscrapers and luxurious shopping malls to ancient cultural sites
                        and serene desert landscapes, it offers an extraordinary destination for every traveler.
                    </p>
                    <p className="uae-p mb-0">
                        Experience the vibrant energy of its cosmopolitan cities, indulge in world-class culinary experiences,
                        and discover the deep-rooted heritage that shapes this dynamic nation's unique identity.
                    </p>

                    <div className="uae-subnav">
                        <a href="#sharjah" className="uae-subnav-link">SHARJAH</a>
                        <a href="#ajman" className="uae-subnav-link">AJMAN</a>
                        <a href="#dubai" className="uae-subnav-link">DUBAI</a>
                    </div>
                </div>
            </section>

            {/* Sharjah Section */}
            <section id="sharjah" className="city-section">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="/img/sarjah.png" alt="Sharjah" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">SHARJAH</h3>
                                <p className="city-text">
                                    Sharjah is widely regarded as the cultural capital of the UAE, offering a rich tapestry of
                                    history, art, and Islamic heritage. It is a city where tradition meets modernity, boasting
                                    fascinating museums, beautifully restored heritage areas, and vibrant souks.
                                    <br /><br />
                                    Visitors can explore the stunning architecture of the Al Noor Mosque, wander through the
                                    historic Heart of Sharjah, or enjoy the scenic waterfront at Al Majaz. With a strong
                                    commitment to preserving its cultural roots, Sharjah provides a deeply authentic and
                                    enriching Emirati experience.
                                </p>
                                <a href="/destinations/sharjah" className="city-btn">Explore Sharjah</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ajman Section */}
            <section id="ajman" className="city-section bg-light-grey">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row flex-lg-row-reverse">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=2070&auto=format&fit=crop"
                                    alt="Ajman" className="city-img" />
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
                                <a href="/destinations/ajman" className="city-btn">Explore Ajman</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dubai Section */}
            <section id="dubai" className="city-section">
                <div className="container-fluid px-0">
                    <div className="row g-0 city-row">
                        <div className="col-lg-6">
                            <div className="city-img-wrapper">
                                <img src="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2070&auto=format&fit=crop"
                                    alt="Dubai" className="city-img" />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="city-content">
                                <h3 className="city-title">DUBAI</h3>
                                <p className="city-text">
                                    Dubai is a global icon of innovation and luxury, renowned for its architectural marvels,
                                    world-class shopping, and dynamic lifestyle. From the towering heights of the Burj Khalifa
                                    to the man-made wonders of the Palm Jumeirah, it constantly redefines the boundaries of
                                    possibility.
                                    <br /><br />
                                    Beyond the glitz and glamour, Dubai also cherishes its heritage, visible in the winding
                                    alleys of the Al Fahidi Historical Neighbourhood and the bustling spice and gold souks.
                                    Whether you're seeking high-octane adventure, serene beaches, or cosmopolitan dining, Dubai
                                    promises an unforgettable journey.
                                </p>
                                <a href="/destinations/dubai" className="city-btn">Explore Dubai</a>
                                <a href="/destinations/dubai/hotels" className="city-btn city-btn-secondary">Our Hotels In Dubai</a>
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

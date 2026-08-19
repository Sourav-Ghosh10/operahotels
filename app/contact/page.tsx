
import React from 'react';
import Header from '@/components/Header';

export default function Page() {
    return (
        <main>
            <link rel="stylesheet" href="/css/contact.css" />
            <header className="hero-section">

        {/* Background Slider */}
        <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
            data-bs-ride="carousel" data-bs-pause="false" style={{ zIndex: "0" }}>
            <div className="carousel-inner h-100">

                {/* Slide 2 */}
                <div className="carousel-item h-100 active" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('/img/contact-banner.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                </div>
                {/* Slide 3 */}
                <div className="carousel-item h-100" data-bs-interval="5000">
                    <div className="slider-image w-100 h-100"
                        style={{ backgroundImage: "url('/img/204821.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
            <h1 className="main-title" style={{ fontSize: "3.5rem", letterSpacing: "4px" }}>CONTACT US</h1>
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



    {/* Contact Intro Section */}
    <section className="contact-intro">
        <div className="container text-center">
            <h2 className="section-title">GET IN TOUCH</h2>
            <p className="contact-p">
                For assistance on booking directly through our website, for the best available rates, exclusive offers,
                or if you have any questions, you can contact us directly by using the form below.
            </p>

            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <select className="form-select" aria-label="Subject" defaultValue="">
                                <option disabled value="">Subject</option>
                                <option value="1">General Inquiry</option>
                                <option value="2">Booking</option>
                                <option value="3">Feedback</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <select className="form-select" aria-label="Hotel Name" defaultValue="">
                                <option disabled value="">Hotel Name</option>
                                <option value="1">Bahi Ajman Palace Hotel</option>
                                <option value="2">Coral Dubai Deira Hotel</option>
                                <option value="3">Coral Beach Resort Sharjah</option>
                                <option value="4">Corp Amman Hotel</option>
                                <option value="5">Coral Jubail Hotel</option>
                                <option value="6">Ecos Dubai Hotel</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="First Name*" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Last Name*" />
                        </div>
                        <div className="col-md-6">
                            <input type="tel" className="form-control" placeholder="Phone Number*" />
                        </div>
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Email*" />
                        </div>
                        <div className="col-12">
                            <textarea className="form-control" rows={1} placeholder="Tell us about your enquiry"></textarea>
                        </div>
                        <div className="col-12 text-start">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="privacyCheck" />
                                <label className="form-check-label" htmlFor="privacyCheck">
                                    I agree to allowing Opera Grand Hotel to store and process my personal data in
                                    accordance with our privacy policy.
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <button type="submit" className="btn btn-submit">SUBMIT NOW</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    {/* Reservations Section */}
    <section className="reservations-section pb-5">
        <div className="container">
            <div className="row justify-content-between" style={{ maxWidth: "1024px", margin: "0 auto" }}>
                <div className="col-md-6">
                    <h3 className="reservations-heading">Hotel Reservations</h3>

                    <div className="reservation-item">
                        <h5>Bahi Ajman Palace Hotel</h5>
                        <a href="mailto:reservations.bahi@operahotels.com.com">reservations.bahi@operahotels.com.com</a>
                    </div>

                    

                    <div className="reservation-item">
                        <h5>Corp Amman Hotel</h5>
                        <a
                            href="mailto:reservations.corp.amman@operahotels.com.com">reservations.corp@operahotels.com.com</a>
                    </div>

                    

                    <div className="reservation-item">
                        <h5>Ecos Dubai Hotel</h5>
                        <a
                            href="mailto:reservations.ecos.dubai@operahotels.com.com">reservations.ecos.dubai@operahotels.com.com</a>
                    </div>
                </div>
                <div className="col-md-5 mt-4 mt-md-0">
                    <h3 className="reservations-heading">Central Reservations</h3>
                    <div className="reservation-info">
                        <p><strong>email:</strong> <a href="mailto:central.reservations@operahotels.com"
                                className="text-decoration-none">central.reservations@operahotels.com</a></p>
                        <p><strong>WhatsApp:</strong> <a href="https://wa.me/971561726647"
                                className="text-decoration-none">+971 56 1234567</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+97142989999" className="text-decoration-none">+971 4 298
                                9999</a></p>
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
                    Dubai – UAE
                </p>
            </div>
        </div>
    </section>

    {/* ===== FOOTER ===== */}
    
        </main>
    );
}

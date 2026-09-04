
import React, { Suspense } from 'react';
import Header from '@/components/ServerHeader';
import OffersSection from '@/components/OffersSection';

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
                                style={{ backgroundImage: "url('/img/uae_wide 1.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
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


            {/* Offers Filter + Grid (client component with live filtering and query param support) */}
            <Suspense fallback={
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }>
                <OffersSection />
            </Suspense>

        </main>
    );
}

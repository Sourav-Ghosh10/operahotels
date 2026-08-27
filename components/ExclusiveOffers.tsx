"use client";
import React, { useState, useEffect } from 'react';
import { getOffersData } from '@/services/api';
import CarouselNav from './CarouselNav';

interface ExclusiveOffersProps {
    hotelName?: string;
    hotelSlug?: string;
}

export default function ExclusiveOffers({ hotelName, hotelSlug }: ExclusiveOffersProps) {
    const [offersData, setOffersData] = useState<any[]>([]);

    useEffect(() => {
        const loadOffersData = async () => {
            const allOffers = await getOffersData();
            if (allOffers) {
                let filteredOffers = allOffers;
                if (hotelSlug || hotelName) {
                    filteredOffers = allOffers.filter((offer: any) => {
                        const matchSlug = hotelSlug && offer.hotel_slug === hotelSlug;
                        const matchName = hotelName && offer.hotel_name && offer.hotel_name.toLowerCase() === hotelName.toLowerCase();
                        return matchSlug || matchName;
                    });
                }
                setOffersData(filteredOffers);
            }
        };

        loadOffersData();
    }, [hotelName, hotelSlug]);

    useEffect(() => {
        if (offersData && offersData.length > 0 && typeof window !== "undefined" && (window as any).$) {
            const timer = setTimeout(() => {
                const $ = (window as any).$;
                // Scope to this specific component instance using a wrapper class
                const $carousel = $('.exclusive-offers-wrapper .offers-carousel');
                
                if ($carousel.length && !$carousel.hasClass('owl-loaded')) {
                    var owl = $carousel.owlCarousel({
                        loop: offersData.length > 2,
                        margin: 30,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        responsive: {
                            0: { items: 1, margin: 15 },
                            768: { items: 2, margin: 20 },
                            992: { items: 3, margin: 30 }
                        }
                    });
                    $('.exclusive-offers-wrapper .offers-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.exclusive-offers-wrapper .offers-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                } else if ($carousel.hasClass('owl-loaded')) {
                    // Destroy and reinit
                    $carousel.trigger('destroy.owl.carousel');
                    $carousel.find('.owl-stage-outer').children().unwrap();
                    $carousel.removeClass("owl-center owl-loaded owl-text-select-on");

                    var owl = $carousel.owlCarousel({
                        loop: offersData.length > 2,
                        margin: 30,
                        nav: false,
                        dots: false,
                        autoplay: true,
                        autoplayTimeout: 4000,
                        autoplayHoverPause: true,
                        responsive: {
                            0: { items: 1, margin: 15 },
                            768: { items: 2, margin: 20 },
                            992: { items: 3, margin: 30 }
                        }
                    });
                    $('.exclusive-offers-wrapper .offers-carousel-nav .next-btn').off('click').on('click', function () {
                        owl.trigger('next.owl.carousel');
                    });
                    $('.exclusive-offers-wrapper .offers-carousel-nav .prev-btn').off('click').on('click', function () {
                        owl.trigger('prev.owl.carousel');
                    });
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [offersData]);

    if (!offersData || offersData.length === 0) {
        return null; // Don't render anything if no offers match
    }

    return (
        <section className="exclusive-offers-section exclusive-offers-wrapper">
            <div className="container">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-3">
                    <h2 className="offers-section-title mb-2 mb-sm-0">EXCLUSIVE OFFERS</h2>
                    <a href="/offers" className="discover-offers-link">DISCOVER OUR SPECIAL OFFERS</a>
                </div>
                {/* Only show this tagline if we aren't filtering for a specific hotel */}
                {(!hotelName && !hotelSlug) && <p>Good things come to those who book direct.</p>}
                
                {/* Owl Carousel */}
                <div className="owl-carousel offers-carousel">
                    {offersData.map((offer: any, index: number) => {
                        const offerName = offer.name?.en || offer.name || '';
                        const rawDesc = offer.description?.en || offer.description || (offer.discount_percentage ? `${offer.discount_percentage}% OFF` : '');
                        const offerDesc = typeof rawDesc === 'string' ? rawDesc.replace(/<[^>]*>?/gm, '') : rawDesc;
                        const bannerImg = offer.banner_image || offer.image || '';
                        
                        return (
                            <div key={offer.id || index} className="offer-card-item">
                                <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: bannerImg ? `url('${bannerImg}')` : 'none' }}>
                                        {offer.badge && <span className="offer-badge">{offer.badge}</span>}
                                        <div className="offer-hover-overlay">
                                            <span className="offer-hover-badge">REGISTER NOW</span>
                                            <span className="offer-hover-discount">{offerDesc}</span>
                                        </div>
                                    </div>
                                    <div className="offer-content">
                                        <h3 className="offer-title">{offerName}</h3>
                                        <div className="offer-hover-details">
                                            <a href={`/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug || ''}`} className="offer-readmore">READ MORE</a>
                                            <a href="#" className="btn btn-offer-book">BOOK NOW</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Custom Carousel Navigation Controls */}
                <CarouselNav className="offers-carousel-nav d-flex justify-content-center align-items-center mt-4 gap-5" />

                {/* Gold Line Separator Bottom */}
                <div className="gold-separator mx-auto mt-4"></div>
            </div>
        </section>
    );
}

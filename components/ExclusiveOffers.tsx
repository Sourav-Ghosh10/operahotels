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
    const [locale, setLocale] = useState<'en' | 'ar'>('en');

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("app_locale") as 'en' | 'ar';
                if (saved === "en" || saved === "ar") {
                    setLocale(saved);
                }
            } catch (err) {}
        }

        const handleLocaleChange = (e: any) => {
            const next = e.detail;
            if (next === "en" || next === "ar") {
                setLocale(next);
            }
        };

        window.addEventListener("locale-change", handleLocaleChange);
        window.addEventListener("destination-locale-change", handleLocaleChange);
        return () => {
            window.removeEventListener("locale-change", handleLocaleChange);
            window.removeEventListener("destination-locale-change", handleLocaleChange);
        };
    }, []);

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
                const $carousel = $('.exclusive-offers-wrapper .offers-carousel');
                const isRtl = locale === 'ar';

                if ($carousel.length) {
                    if ($carousel.hasClass('owl-loaded')) {
                        $carousel.trigger('destroy.owl.carousel');
                        $carousel.find('.owl-stage-outer').children().unwrap();
                        $carousel.removeClass("owl-center owl-loaded owl-text-select-on owl-rtl");
                    }

                    var owl = $carousel.owlCarousel({
                        rtl: isRtl,
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
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [offersData, locale]);

    if (!offersData || offersData.length === 0) {
        return null; // Don't render anything if no offers match
    }

    return (
        <section className="exclusive-offers-section exclusive-offers-wrapper" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
            <div className="container">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-3">
                    <h2 className="offers-section-title mb-2 mb-sm-0">{locale === 'ar' ? 'عروض حصرية' : 'EXCLUSIVE OFFERS'}</h2>
                    <a href={hotelSlug ? `/offers?hotel=${hotelSlug}` : '/offers'} className="discover-offers-link">
                        {locale === 'ar' ? 'اكتشف عروضنا الخاصة' : 'DISCOVER OUR SPECIAL OFFERS'}
                    </a>
                </div>
                {(!hotelName && !hotelSlug) && <p>{locale === 'ar' ? 'أفضل المزايا تأتي لمن يحجز مباشرة.' : 'Good things come to those who book direct.'}</p>}
                
                {/* Owl Carousel */}
                <div className="owl-carousel offers-carousel">
                    {offersData.map((offer: any, index: number) => {
                        const offerName = (locale === 'ar' ? (offer.name?.ar || offer.name_ar) : null) || offer.name?.en || offer.name || '';
                        const rawDesc = (locale === 'ar' ? (offer.description?.ar || offer.description_ar) : null) || offer.description?.en || offer.description || (offer.discount_percentage ? `${offer.discount_percentage}% OFF` : '');
                        const offerDesc = typeof rawDesc === 'string' ? rawDesc.replace(/<[^>]*>?/gm, '') : rawDesc;
                        const bannerImg = offer.banner_image || offer.image || '';
                        
                        return (
                            <div key={offer.id || index} className="offer-card-item">
                                <div className="offer-card">
                                <div className="offer-img-box" style={{ backgroundImage: bannerImg ? `url('${bannerImg}')` : 'none' }}>
                                        {offer.badge && <span className="offer-badge">{offer.badge}</span>}
                                        <div className="offer-hover-overlay">
                                            <span className="offer-hover-badge">{locale === 'ar' ? 'سجل الآن' : 'REGISTER NOW'}</span>
                                            <span className="offer-hover-discount">{offerDesc}</span>
                                        </div>
                                    </div>
                                    <div className="offer-content" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr', textAlign: locale === 'ar' ? 'right' : 'left' }}>
                                        <h3 className="offer-title">{offerName}</h3>
                                        <div className="offer-hover-details">
                                            <a href={`/${offer.hotel_slug || 'offers'}/special-offers/${offer.slug || ''}`} className="offer-readmore">
                                                {locale === 'ar' ? 'اقرأ المزيد' : 'READ MORE'}
                                            </a>
                                            <a href="#" className="btn btn-offer-book">
                                                {locale === 'ar' ? 'احجز الآن' : 'BOOK NOW'}
                                            </a>
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


"use client";
import React, { useEffect, useState, use } from 'react';
import HotelHeader from '@/components/HotelHeader';
import HotelFooter from '@/components/HotelFooter';
import Head from 'next/head';
import { getPropertyBySlug, getBrandsData } from '@/services/api';
import Link from 'next/link';
import ExclusiveOffers from '@/components/ExclusiveOffers';
import BrandPage from '@/components/BrandPage';
import OurBrandsBar from '@/components/OurBrandsBar';
import CarouselNav from '@/components/CarouselNav';
import dynamic from 'next/dynamic';

const BrandHotelMap = dynamic(() => import('@/components/BrandHotelMap'), { ssr: false });

function stripHtml(value: string | null | undefined): string {
    if (!value) return '';
    return value
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&rsquo;/gi, "’")
        .replace(/&lsquo;/gi, "‘")
        .replace(/&rdquo;/gi, "”")
        .replace(/&ldquo;/gi, "“")
        .replace(/\s+/g, ' ')
        .trim();
}


export default function Page({ params }: { params: Promise<{ hotelSlug: string }> }) {
    const { hotelSlug } = use(params);
    const [hotelData, setHotelData] = useState<any>(null);
    const [brandsData, setBrandsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching property for slug:", hotelSlug);
            const [data, bData] = await Promise.all([
                getPropertyBySlug(hotelSlug),
                getBrandsData()
            ]);
            console.log("Fetched data:", data);
            setHotelData(data);
            setBrandsData(bData);
            setLoading(false);
            
            // Re-initialize jQuery plugins for dynamic content
            if (typeof window !== "undefined" && window.$) {
                setTimeout(() => {
                    const $ = window.$;

                    if ($('.accommodation-carousel').length) {
                        $('.accommodation-carousel').owlCarousel({
                            loop: true,
                            margin: 20,
                            nav: false,
                            dots: false,
                            items: 1,
                            onChanged: function(event: any) {
                                let currentIndex = event.item.index;
                                if (currentIndex === null) return;
                                let activeItem = $(event.target).find('.owl-item').eq(currentIndex).find('.accommodation-slide-item');
                                let slideIndex = activeItem.data('slide-index');
                                if (slideIndex !== undefined) {
                                    $('.accommodation-list-item').removeClass('active');
                                    $('.accommodation-list-item[data-slide="' + slideIndex + '"]').addClass('active');
                                }
                            }
                        });
                        $('.accommodation-nav-btn.prev-btn').on('click', function() { $('.accommodation-carousel').trigger('prev.owl.carousel'); });
                        $('.accommodation-nav-btn.next-btn').on('click', function() { $('.accommodation-carousel').trigger('next.owl.carousel'); });
                        
                        $('.accommodation-list-item').on('click', function(this: any) {
                            let slideIndex = $(this).data('slide');
                            $('.accommodation-carousel').trigger('to.owl.carousel', [slideIndex, 300]);
                            $('.accommodation-list-item').removeClass('active');
                            $(this).addClass('active');
                        });
                    }
                    if ($('.amenities-carousel').length) {
                        $('.amenities-carousel').owlCarousel({
                            loop: true,
                            margin: 0,
                            nav: false,
                            dots: false,
                            items: 1
                        });
                        $('.amenities-nav-btn.prev-btn').on('click', function() { $('.amenities-carousel').trigger('prev.owl.carousel'); });
                        $('.amenities-nav-btn.next-btn').on('click', function() { $('.amenities-carousel').trigger('next.owl.carousel'); });
                    }
                    if ($('.explore-carousel').length) {
                        $('.explore-carousel').owlCarousel({
                            loop: true,
                            margin: 20,
                            nav: false,
                            dots: false,
                            responsive: {
                                0: { items: 1 },
                                768: { items: 2 },
                                1200: { items: 3 }
                            }
                        });
                        $('.explore-carousel-nav .prev-btn').on('click', function() { $('.explore-carousel').trigger('prev.owl.carousel'); });
                        $('.explore-carousel-nav .next-btn').on('click', function() { $('.explore-carousel').trigger('next.owl.carousel'); });
                    }
                    if ($('.dining-carousel').length) {
                        const diningCount = $('.dining-carousel .dining-card').length;
                        const diningOwl = $('.dining-carousel').owlCarousel({
                            loop: diningCount > 2,
                            margin: 30,
                            nav: false,
                            dots: false,
                            autoplay: true,
                            autoplayTimeout: 5000,
                            autoplayHoverPause: true,
                            responsive: {
                                0: { items: 1, margin: 15 },
                                768: { items: 2, margin: 20 },
                                992: { items: 2, margin: 30 }
                            }
                        });
                        $('.dining-carousel-controls .prev-btn').off('click').on('click', function() {
                            diningOwl.trigger('prev.owl.carousel');
                        });
                        $('.dining-carousel-controls .next-btn').off('click').on('click', function() {
                            diningOwl.trigger('next.owl.carousel');
                        });
                        let isDiningPlaying = true;
                        $('.dining-carousel-controls .play-pause-btn').off('click').on('click', function(this: any) {
                            if (isDiningPlaying) {
                                diningOwl.trigger('stop.owl.autoplay');
                                $(this).removeClass('autoplay-start').addClass('autoplay-stop');
                                isDiningPlaying = false;
                            } else {
                                diningOwl.trigger('play.owl.autoplay', [5000]);
                                $(this).removeClass('autoplay-stop').addClass('autoplay-start');
                                isDiningPlaying = true;
                            }
                        });
                    }
                }, 500);
            }
        };
        fetchData();
    }, [hotelSlug]);

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="spinner-border text-primary" role="status"></div>
        </div>;
    }

    if (!hotelData) {
        return <div className="text-center py-5"><h2>Property Not Found</h2></div>;
    }

    // ── Brand pages get their own dedicated layout ──────────────────────
    if (hotelData.type === 'brand') {
        return (
            <>
                <link rel="stylesheet" href="/css/brand-dynamic.css" />
                <BrandPage brandData={hotelData} brandsData={brandsData} />
            </>
        );
    }

    // ── Hotel pages continue with the existing layout below ────────────
    // Prepare interactive map data for hotel
    const hotelMapList = (hotelData?.latitude || hotelData?.longitude || hotelData?.address)
        ? [{
            id: hotelData.id,
            name: hotelData.name,
            slug: hotelData.slug,
            cover_image: hotelData.cover_image || (hotelData.banner_images && hotelData.banner_images[0]),
            banner_images: hotelData.banner_images,
            latitude: hotelData.latitude,
            longitude: hotelData.longitude,
            address: hotelData.address,
            city: hotelData.city,
            country: hotelData.country,
            phone: hotelData.phone,
            email: hotelData.email,
            google_location: hotelData.google_location,
            star_rating: hotelData.star_rating,
        }]
        : [];

    return (
        <main>

    
    <div className="booking-sidebar">
        {/* Close Button */}
        <button className="booking-close-btn" aria-label="Close booking panel">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <div className="booking-sidebar-content">
            <h2 className="booking-title">Book a room</h2>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
                {/* Where Do You Want to Go */}
                <div className="booking-form-group">
                    <label className="booking-label">
                        <i className="fas fa-search booking-icon"></i> WHERE DO YOU WANT TO GO
                    </label>
                    <div className="booking-field-select dropdown">
                        <a href="#" className="booking-value dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            SELECT HOTEL
                        </a>
                        <ul className="dropdown-menu w-100">
                            <li><a className="dropdown-item" href="#">Bahi Ajman Palace Hotel</a></li>
                            <li><a className="dropdown-item" href="#">Coral Beach Resort Sharjah</a></li>
                            <li><a className="dropdown-item" href="#">Coral Deira Dubai</a></li>
                            <li><a className="dropdown-item" href="#">Corp Amman Hotel</a></li>
                            <li><a className="dropdown-item" href="#">Ewa Amman Hotel</a></li>
                            <li><a className="dropdown-item" href="#">Ecos Coral Deira</a></li>
                        </ul>
                    </div>
                </div>

                {/* Check In - Check Out */}
                <div className="booking-form-group">
                    <label className="booking-label">
                        <i className="far fa-calendar-alt booking-icon"></i> CHECK IN - CHECK OUT
                    </label>
                    <div className="booking-field-input">
                        <input type="text" className="booking-input" defaultValue="23/07/2026 - 24/07/2026"
                            placeholder="Select Dates" />
                    </div>
                </div>

                {/* Rooms */}
                <div className="booking-form-group">
                    <label className="booking-label">
                        <i className="fas fa-bed booking-icon"></i> ROOMS
                    </label>
                    <div className="booking-field-select dropdown">
                        <a href="#" className="booking-value dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            1
                        </a>
                        <ul className="dropdown-menu w-100">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <li><a className="dropdown-item" href="#">3</a></li>
                            <li><a className="dropdown-item" href="#">4+</a></li>
                        </ul>
                    </div>
                </div>

                {/* Guests */}
                <div className="booking-form-group">
                    <label className="booking-label">
                        <i className="fas fa-users booking-icon"></i> GUESTS
                    </label>
                    <div className="booking-field-select dropdown">
                        <a href="#" className="booking-value dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            2
                        </a>
                        <ul className="dropdown-menu w-100">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <li><a className="dropdown-item" href="#">3</a></li>
                            <li><a className="dropdown-item" href="#">4</a></li>
                            <li><a className="dropdown-item" href="#">5+</a></li>
                        </ul>
                    </div>
                </div>

                {/* Promocode */}
                <div className="booking-form-group">
                    <label className="booking-label">
                        <i className="fas fa-tag booking-icon"></i> PROMOCODE
                    </label>
                    <div className="booking-field-input">
                        <input type="text" className="booking-input text-uppercase" defaultValue="TYPE YOUR CODE"
                            placeholder="Enter Promocode" />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-booking-submit w-100">BOOK NOW</button>
            </form>

            <div className="booking-footer">
                <a href="#" className="booking-cancel-link">Modify / Cancel Reservation</a>
            </div>
        </div>
    </div>



    {/* Hero Section with Header */}
    <header className="hero-section">
        {/* Background Slider */}
        <div id="heroCarousel" className="carousel slide carousel-fade position-absolute w-100 h-100 top-0 start-0"
            data-bs-ride="carousel" data-bs-pause="false" style={{zIndex: "0"}}>
            <div className="carousel-inner h-100">
                {Array.isArray(hotelData.banner_images) && hotelData.banner_images.length > 0 ? (
                    hotelData.banner_images.map((img: string, idx: number) => (
                        <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''} h-100`} data-bs-interval="5000">
                            <div className="slider-image w-100 h-100"
                                style={{backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center"}}>
                            </div>
                        </div>
                    ))
                ) : hotelData.cover_image ? (
                    <div className="carousel-item active h-100" data-bs-interval="5000">
                        <div className="slider-image w-100 h-100"
                            style={{backgroundImage: `url('${hotelData.cover_image}')`, backgroundSize: "cover", backgroundPosition: "center"}}>
                        </div>
                    </div>
                ) : (
                    <div className="carousel-item active h-100" data-bs-interval="5000">
                        <div className="slider-image w-100 h-100"
                            style={{backgroundImage: `url('/img/slider-1.jpg')`, backgroundSize: "cover", backgroundPosition: "center"}}>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Banner Overlay */}
        <div className="hero-overlay"></div>

        {/* Navigation */}
        <HotelHeader logoUrl={hotelData?.logo} hotelSlug={hotelSlug} />

        {/* Banner Content */}
        <div className="hero-content position-relative" style={{zIndex: "10"}}>
            <h2 className="welcome-text">{hotelData.intro_subtitle || 'Welcome To'}</h2>
            <h1 className="main-title">{hotelData.intro_title || hotelData.name}</h1>
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

    {/* Welcome Section */}
    <section className="welcome-section">
        <div className="container text-center">
            <h5 className="section-subtitle">YOU ARE UNIQUE FOR US</h5>
            <h2 className="section-title">WELCOME TO {hotelData.name?.toUpperCase()}</h2>

            <div className="welcome-content mx-auto" style={{maxWidth: "900px"}}>
                {hotelData.description ? (
                    <div dangerouslySetInnerHTML={{ __html: hotelData.description }} />
                ) : (
                    <>
                        <p className="welcome-p mb-3">Get Great {hotelData.star_rating} Star Hotel Deals at {hotelData.name}.</p>
                        <p className="welcome-p mb-3">Looking for a stylish and comfortable getaway <a href="#" className="inline-link">strategically located</a>?</p>
                        <p className="welcome-p mb-5">Book your online hotel reservation directly with us today, or call us.</p>
                    </>
                )}
            </div>
        </div>
    </section>
    <div className="gold-separator mx-auto"></div>




    {/* Guest Reviews Section */}
    <section className="reviews-section">
        <div className="container text-center">
            {/* Gold Line Separator Top */}


            <h2 className="section-title mb-4">GUEST REVIEWS</h2>

            {/* Stars */}
            <div className="review-stars mb-5">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
            </div>

            {/* Reviews Slider */}
            <div id="reviewsCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner mx-auto" style={{maxWidth: "850px"}}>
                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <p className="review-text">Very special offers you had in there and very special workers and I had
                            enjoyed with my father a lot and there is a pool and gymnasium which make me don't need to
                            go any where and the food is very fantastic and from the beginning we were treated from the
                            resption very well and especially from mrs Mira and mr tazi and the manager Hassan</p>
                    </div>
                    {/* Slide 2 */}
                    <div className="carousel-item">
                        <p className="review-text">Excellent service from start to finish. The rooms were spacious,
                            immaculately clean, and the views of the city skyline were breath-taking. The staff went
                            above and beyond to make our wedding anniversary memorable. Highly recommend the dining
                            experience!</p>
                    </div>
                    {/* Slide 3 */}
                    <div className="carousel-item">
                        <p className="review-text">An absolute gem in Dubai. The attention to detail in every corner of the
                            hotel is outstanding. From the warm welcome at reception to the exquisite rooftop pool
                            amenities, everything was perfect. We will definitely return on our next trip.</p>
                    </div>
                </div>

                {/* Controls and Read More */}
                <div className="reviews-controls mt-5">
                    <a href="#" className="read-more-link d-block mb-4">READ MORE</a>

                    <div className="d-flex justify-content-center align-items-center gap-5">
                        <button className="review-control-btn" type="button" data-bs-target="#reviewsCarousel"
                            data-bs-slide="prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="20" y1="12" x2="4" y2="12"></line>
                                <polyline points="10 18 4 12 10 6"></polyline>
                            </svg>
                        </button>
                        <button className="review-control-btn" type="button" data-bs-target="#reviewsCarousel"
                            data-bs-slide="next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12"></line>
                                <polyline points="14 6 20 12 14 18"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Gold Line Separator Bottom */}
            <div className="gold-separator mx-auto mt-5"></div>
        </div>
    </section>

    {/* Exclusive Offers Section */}
    <ExclusiveOffers hotelName={hotelData?.name} hotelSlug={hotelSlug} />
    {/* Accommodation Section */}
    <section className="accommodation-section">
        <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-5">
                <h2 className="accommodation-section-title mb-2 mb-sm-0">ACCOMMODATION</h2>
            </div>
        </div>
        <div className="container-fluid padin">
            <div className="row">

                <div className="row align-items-center">
                    {/* Left: List of Rooms */}
                    <div className="col-lg-3 col-md-4 mb-4 mb-lg-0">
                        <ul className="accommodation-list list-unstyled mb-0">
                            {hotelData.room_types && hotelData.room_types.map((room: any, idx: number) => (
                                <li key={idx} className={`accommodation-list-item ${idx === 0 ? 'active' : ''}`} data-slide={idx}>
                                    {room.name.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right: Carousel slider */}
                    <div className="col-lg-9 col-md-8 position-relative">
                        {/* Owl Carousel */}
                        <div className="owl-carousel accommodation-carousel">
                            {hotelData.room_types && hotelData.room_types.map((room: any, idx: number) => (
                                <div className="accommodation-slide-item" data-slide-index={idx} key={idx}>
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-8">
                                            <div className="accommodation-img-box"
                                                style={{backgroundImage: `url('${room.image || '/img/room_standard_king.png'}')`}}></div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="accommodation-details-card">
                                                <h3 className="room-title">{room.name}</h3>
                                                <p className="room-desc">{stripHtml(room.short_description || room.description)}</p>
                                                <div className="room-actions">
                                                    <Link href={room.read_more_link || `/${hotelSlug}/rooms-suites/${room.slug}`} className="room-readmore">{room.read_more_label || "READ MORE"}</Link>
                                                    <a href={room.book_now_link || "#"} className="btn btn-room-book">{room.book_now_label || "BOOK NOW"}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Overlaid Navigation Arrows */}
                        <button className="accommodation-nav-btn prev-btn" type="button" aria-label="Previous">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="20" y1="12" x2="4" y2="12"></line>
                                <polyline points="10 18 4 12 10 6"></polyline>
                            </svg>
                        </button>
                        <button className="accommodation-nav-btn next-btn" type="button" aria-label="Next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="4" y1="12" x2="20" y2="12"></line>
                                <polyline points="14 6 20 12 14 18"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Gold Line Separator Bottom */}
                <div className="gold-separator mx-auto mt-5"></div>
            </div>
        </div>
    </section>

    {/* Dining Section */}
    <section className="dining-section">
        <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-5">
                <h2 className="dining-section-title mb-2 mb-sm-0">DINING</h2>
                <a href={hotelData.slug ? `/${hotelData.slug}/dining` : '#'} className="discover-restaurants-link">DISCOVER OUR RESTAURANTS</a>
            </div>

            <div className="owl-carousel dining-carousel">
                {hotelData.dining_outlets && hotelData.dining_outlets.map((dining: any, idx: number) => (
                    <div className="dining-card" key={idx}>
                        <h3 className="dining-card-title">{dining.name?.toUpperCase()}</h3>
                        <div className="dining-img-wrapper">
                            <div className="dining-img-box" style={{backgroundImage: `url('${dining.image || '/img/dining_al_nafoora.png'}')`}}>
                            </div>
                        </div>
                        <a href={dining.link || (hotelData.slug ? `/${hotelData.slug}/dining` : '#')} className="dining-readmore">READ MORE</a>
                    </div>
                ))}
            </div>

            {/* Custom Carousel Navigation Controls */}
            {hotelData.dining_outlets && hotelData.dining_outlets.length > 1 && (
                <div className="dining-carousel-controls d-flex justify-content-between align-items-center mt-5">
                    <button className="dining-nav-btn prev-btn" type="button" aria-label="Previous">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 18.721 12.006">
                            <g transform="translate(1 1.414)">
                                <path d="M0,0,4.589,4.589,0,9.178" transform="translate(12.132)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
                                <path d="M15.746,0H0" transform="translate(0 4.589)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/>
                            </g>
                        </svg>
                    </button>

                    <button className="dining-play-pause-btn play-pause-btn autoplay-start" type="button" aria-label="Play or Pause slider">
                        <span className="icon icon-pause">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 29.5 29.5">
                                <circle cx="14.75" cy="14.75" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <line x1="12" y1="9.5" x2="12" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <line x1="17.5" y1="9.5" x2="17.5" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span className="icon icon-play">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 29.5 29.5">
                                <circle cx="14.75" cy="14.75" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                <polygon points="12,9.5 20,14.75 12,20" fill="currentColor" />
                            </svg>
                        </span>
                    </button>

                    <button className="dining-nav-btn next-btn" type="button" aria-label="Next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 18.721 12.006">
                            <g transform="translate(1 1.414)">
                                <path d="M0,0,4.589,4.589,0,9.178" transform="translate(12.132)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/>
                                <path d="M15.746,0H0" transform="translate(0 4.589)" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8"/>
                            </g>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    </section>

    {/* Amenities Section */}
    <section className="amenities-section">
        <div className="container-fluid">
            <div className="row g-0 align-items-stretch">

                {/* Left Column: Content */}
                <div
                    className="col-lg-6 d-flex align-items-center justify-content-center justify-content-lg-end bg-white py-5">
                    <div className="amenities-text-block">
                        <h2 className="amenities-title">AMENITIES</h2>
                        <p className="amenities-p">Make the most of your stay, with a wide range of modern facilities and
                            leisure amenities, combined with exceptional service and warm hospitality.</p>
                        <p className="amenities-p">Keep up with work in our modern business centre, explore the wonders of
                            dubai or enjoy relaxing time by the pool.</p>
                        <a href="#" className="discover-facilities-link">DISCOVER OUR FACILITIES</a>
                    </div>
                </div>

                {/* Right Column: Slider */}
                <div className="col-lg-6 position-relative px-0">
                    <div className="owl-carousel amenities-carousel">
                        {hotelData.amenities && hotelData.amenities.length > 0 ? (
                            hotelData.amenities.map((amenity: any, idx: number) => (
                                <div key={idx} className="amenities-slide-item" style={{backgroundImage: `url('${amenity.image || '/img/amenity_pool.png'}')`}}></div>
                            ))
                        ) : (
                            <>
                                <div className="amenities-slide-item" style={{backgroundImage: "url('/img/amenity_pool.png')"}}></div>
                                <div className="amenities-slide-item" style={{backgroundImage: "url('/img/amenity_gym.png')"}}></div>
                                <div className="amenities-slide-item" style={{backgroundImage: "url('/img/amenity_spa.png')"}}></div>
                            </>
                        )}
                    </div>

                    {/* Overlay Navigation Arrows */}
                    <button className="amenities-nav-btn prev-btn" type="button" aria-label="Previous">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="20" y1="12" x2="4" y2="12"></line>
                            <polyline points="10 18 4 12 10 6"></polyline>
                        </svg>
                    </button>
                    <button className="amenities-nav-btn next-btn" type="button" aria-label="Next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <polyline points="14 6 20 12 14 18"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* Explore Section */}
    <section className="explore-section">
        <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-baseline mb-5">
                <h2 className="explore-section-title mb-2 mb-sm-0">EXPLORE</h2>
                <a href="#" className="learn-more-link">LEARN MORE</a>
            </div>
        </div>
        <div className="container-fluid px-0">
            {/* Owl Carousel */}
            <div className="owl-carousel explore-carousel">
                {hotelData.attractions && hotelData.attractions.map((attr: any, idx: number) => (
                    <div className="explore-card" key={idx}>
                        <div className="explore-img-box" style={{backgroundImage: `url('${attr.image || '/img/explore_museum.png'}')`}}>
                            <div className="explore-img-overlay">
                                <h3 className="explore-card-title">{attr.name?.toUpperCase()}</h3>
                            </div>
                        </div>
                        <div className="explore-card-body">
                            <p className="explore-card-desc">{stripHtml(attr.description)}</p>
                            <a href="#" className="explore-readmore">READ MORE</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Carousel Navigation Controls */}
            <CarouselNav className="explore-carousel-nav d-flex justify-content-center align-items-center mt-4 gap-5" />

            {/* Gold line separator */}
            <div className="gold-separator mx-auto mt-4 mb-5"></div>
        </div>
    </section>

            {/* Our Location Section - Interactive Luxury Hotel Map */}
            {hotelMapList.length > 0 && (
                <BrandHotelMap
                    hotels={hotelMapList}
                    brandName={hotelData.name}
                    contactUrl={`/${hotelData.slug}/contact`}
                    sectionTitle={hotelData.location_title || "OUR LOCATION"}
                />
            )}

            <OurBrandsBar />
            <HotelFooter 
                logoUrl={hotelData?.footer_logo || hotelData?.logo}
                hotelName={hotelData?.name}
                hotelSlug={hotelSlug}
                hotelPhone={hotelData?.phone}
                hotelAddress={hotelData?.address}
                hotelEmail={hotelData?.email}
            />
        </main>
    );
}

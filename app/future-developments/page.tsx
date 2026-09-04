"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import OurBrandsBar from "@/components/OurBrandsBar";
import Link from "next/link";
import { getPageData } from "@/services/api";
import "./future-developments.css";

// Global dictionary mapping known image filenames to local path & live CDN fallback
const ASSET_LOOKUP: Record<string, { local: string; cdn: string }> = {
  "future_banner_1.jpg": {
    local: "/img/future/future_banner_1.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-3he26am5miyj7iol3cprxwxg9/shutterstock-2373539131.jpg",
  },
  "hero_banner.jpg": {
    local: "/img/future/future_banner_1.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-3he26am5miyj7iol3cprxwxg9/shutterstock-2373539131.jpg",
  },
  "future_banner_2.jpg": {
    local: "/img/future/future_banner_2.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-8fsv0lzis4ljwbwrbqreudwpf/shutterstock-1177935583.jpg?width=1920",
  },
  "future_banner_3.jpg": {
    local: "/img/future/future_banner_3.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-8z43aowss3nq9x3qkbv6q9i89/mood-option-3-old-image.jpg?width=1920",
  },
  "future_brands_overview.jpg": {
    local: "/img/future/future_brands_overview.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-et3mfauqo2cle1pgs2mfle2w5/corp-1.jpg",
  },
  "corp-1.jpg": {
    local: "/img/future/future_brands_overview.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-et3mfauqo2cle1pgs2mfle2w5/corp-1.jpg",
  },
  "future_slider_1.jpg": {
    local: "/img/future/future_slider_1.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-afi9mn4r5e5qrvbtgapi32g1y/dsc4450-edit-edit.jpg?width=1920",
  },
  "future_slider_2.jpg": {
    local: "/img/future/future_slider_2.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-88mg2js8gvong7ysliy7eqbqe/dsc3474-edit-edit-2.jpg?width=1920",
  },
  "future_slider_3.jpg": {
    local: "/img/future/future_slider_3.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-31v79fvzzrbsnaocqqjmgwb0w/hotel-outdoor.jpg?width=1920",
  },
  "future_brand_bahi.jpg": {
    local: "/img/future/future_brand_bahi.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-3kpfuztpsllz1okuu7x2e8uon/shutterstock-2294489191.jpg",
  },
  "bahi.svg": {
    local: "/img/future/bahi.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-drhs9e5u9f2tufk5ad5b5b895/bahi.svg",
  },
  "future_brand_coral.jpg": {
    local: "/img/future/future_brand_coral.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-1318q0zwkyvq7fz80834nejaw/shutterstock-2353761413.jpg",
  },
  "coral.svg": {
    local: "/img/future/coral.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-886xnys4x1oemkay14tyqrejh/coral.svg",
  },
  "future_brand_corp.jpg": {
    local: "/img/future/future_brand_corp.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-6c7908b1i2mpgtmesfzjaummk/shutterstock-2351513777.jpg",
  },
  "corp.svg": {
    local: "/img/future/corp.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-dcreyb355wpwlhe58hk4boeun/corp.svg",
  },
  "future_brand_ewa.jpg": {
    local: "/img/future/future_brand_ewa.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-bixniahc747yex3jttex03owj/shutterstock-2249009659.jpg",
  },
  "ewa.svg": {
    local: "/img/future/ewa.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-1zs2y5e755zmcj89f2dfxbjz8/ewa.svg",
  },
  "future_brand_ecos.jpg": {
    local: "/img/future/future_brand_ecos.jpg",
    cdn: "https://image-tc.galaxy.tf/wijpeg-k8rlww1konyl1m9bmwzlj8pp/shutterstock-2308145127.jpg",
  },
  "ecos.svg": {
    local: "/img/future/ecos.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-cey6pag5t5edldl90vkvpjy5k/ecos.svg",
  },
  "future_service_1.svg": {
    local: "/img/future/future_service_1.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-4042e1ec33k7r9o0f02ap9ihf/group-12605.svg",
  },
  "future_service_2.svg": {
    local: "/img/future/future_service_2.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-bd9a8r32347mioyqg6mm93pth/group-12606.svg",
  },
  "future_service_3.svg": {
    local: "/img/future/future_service_3.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-5etdvh4za2yzvfozv5pqf02vu/group-12607.svg",
  },
  "future_service_4.svg": {
    local: "/img/future/future_service_4.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-1q0iugex1ic7cble5nz4ip0k4/group-12611.svg",
  },
  "future_service_5.svg": {
    local: "/img/future/future_service_5.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-52kz9nd1l30tr1rd110b7czhg/group-12609.svg",
  },
  "future_service_6.svg": {
    local: "/img/future/future_service_6.svg",
    cdn: "https://image-tc.galaxy.tf/wisvg-6dkvu18505pqciuai5621vh2x/group-12610.svg",
  },
};

function getAssetUrls(filenameOrUrl: string | undefined | null, defaultFilename: string): { local: string; cdn: string } {
  const target = filenameOrUrl || defaultFilename;
  if (!target) {
    return ASSET_LOOKUP[defaultFilename] || { local: "", cdn: "" };
  }
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return { local: target, cdn: target };
  }
  const clean = target.replace(/^.*[\\\/]/, "");
  if (ASSET_LOOKUP[clean]) {
    return ASSET_LOOKUP[clean];
  }
  if (ASSET_LOOKUP[defaultFilename]) {
    return ASSET_LOOKUP[defaultFilename];
  }
  return {
    local: `/img/future/${clean}`,
    cdn: `/img/future/${clean}`,
  };
}

export default function FutureDevelopmentsPage() {
  const [pageData, setPageData] = useState<any>(null);

  // Hero Slider State
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);

  // Gallery Carousel State
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPlaying, setGalleryPlaying] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPageData("future-developments");
        if (data) {
          setPageData(data);
        }
      } catch (e) {
        console.error("Failed to load page data for future-developments:", e);
      }
    };
    loadData();
  }, []);

  const body = pageData?.body || {};

  // 1. Hero Slides
  const rawHeroSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
    ? body.banner_slides
    : [
        {
          image: "future_banner_1.jpg",
          title: "Pioneering Hotel Management Company",
          subtitle: "HMH Hospitality Management Holding",
        },
        {
          image: "future_banner_2.jpg",
          title: "Hotel Management Company",
          subtitle: "Future Developments",
        },
      ];

  const heroSlides = rawHeroSlides.map((slide: any, idx: number) => {
    const defaultName = idx === 0 ? "future_banner_1.jpg" : "future_banner_2.jpg";
    const urls = getAssetUrls(slide.image, defaultName);
    return {
      urls,
      title: slide.title || "Pioneering Hotel Management Company",
      subtitle: slide.subtitle || "HMH Hospitality Management Holding",
    };
  });

  // Hero Autoplay
  useEffect(() => {
    if (!heroPlaying || heroSlides.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPlaying, heroSlides.length]);

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const currentHeroSlide = heroSlides[heroIndex] || heroSlides[0];

  // 2. Intro Block
  const introSubtitle = body.intro_subtitle || "DEVELOPMENT AND SERVICES";
  const introTitle = body.intro_title || body.content_title || "Partner With Us For Success";
  const introText = body.intro_text ||
    "Founded in 2003 in Dubai, HMH – Hospitality Management Holding is a fully integrated pioneer hotel management company, that has been steadfast in its commitment to our guests in our commitment to provide impeccable service, operational excellence, and a comprehensive approach to wellbeing in an alcohol-free environment.\n\nOur team would be happy to hear about your project and how we can partner for mutual success.";
  const ctaText = body.cta_text || "Contact Us Now";
  const ctaLink = body.cta_link || "mailto:central.reservations@hmhhotelgroup.com";

  // 3. Image Slider
  const rawGalleryImages = Array.isArray(body.future_slider_images) && body.future_slider_images.length > 0
    ? body.future_slider_images
    : ["future_slider_1.jpg", "future_slider_2.jpg", "future_slider_3.jpg"];

  const gallerySlides = rawGalleryImages.map((item: any, idx: number) => {
    const rawSrc = typeof item === "string" ? item : item.image || item.url || "";
    const defaultName = `future_slider_${idx + 1}.jpg`;
    const urls = getAssetUrls(rawSrc, defaultName);
    return {
      urls,
      alt: typeof item === "object" && item.alt ? item.alt : `HMH Hotel Facility ${idx + 1}`,
    };
  });

  // Gallery Autoplay
  useEffect(() => {
    if (!galleryPlaying || gallerySlides.length <= 1) return;
    const timer = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [galleryPlaying, gallerySlides.length]);

  const prevGallerySlide = () => {
    setGalleryIndex((prev) => (prev === 0 ? gallerySlides.length - 1 : prev - 1));
  };

  const nextGallerySlide = () => {
    setGalleryIndex((prev) => (prev + 1) % gallerySlides.length);
  };

  // 4. Value Proposition (Plain text block)
  const valuePropTitle = body.value_proposition_title || "Solid Partner for Mutual Growth";
  const valuePropText = body.value_proposition_text ||
    "Our core values, understanding of the local cultures and personalized relationships with all our owners made us a prominent management company in our socialized industry. HMH is continuously growing in its core regions to ensure its strong positioning and relevance in an increasingly competitive sector. We are committed to providing our owners, guests, and employees with a solid partner who understands their requirements, expectations, markets and how we can grow equally together.\n\nHMH’s experienced team assists each owner starting with the initial vision, market feasibility, concept design, to construction and successful opening, where our operations team excels with their efficient operational structures and strong performances. We are also well-positioned to take over operational properties that are in line with our brand standards with a very short lead time, where we immediately assign a task force team to ensure a smooth transition.";

  // 5. Expansion & Brands Overview (Text & Image)
  const expansionUrls = getAssetUrls(body.expansion_image, "future_brands_overview.jpg");
  const expansionText = body.expansion_text ||
    "With our five core brands, <strong>Bahi Hotels & Resorts, Coral Hotels & Resorts, Corp Hotels, EWA Hotel Apartments and ECOS Hotels</strong>, we are perfectly positioned to ensure each hotel and serviced apartment project competes efficiently in its specific market.\n\nWe are also constantly modernizing our brand standards to guarantee our hotels remain appealing to our clientele and are equipped with the latest technology.";

  // 6. Brands List
  const rawBrandsList = Array.isArray(body.brands_list) && body.brands_list.length > 0
    ? body.brands_list
    : [
        {
          name: "Bahi Hotels & Resorts",
          tagline: "Impeccable Plush",
          description: "Upscale 5-Star beach brand - heritage retreats with a contemporary spirit.",
          image: "future_brand_bahi.jpg",
          logo: "bahi.svg",
        },
        {
          name: "Coral Hotels & Resorts",
          tagline: "You are Unique for Us",
          description: "Designed for discerning travellers who seek secluded surroundings, distinctive service and a safe environment across key destinations in the GCC.",
          image: "future_brand_coral.jpg",
          logo: "coral.svg",
        },
        {
          name: "Corp Hotels",
          tagline: "Urban Comfort",
          description: "Specifically designed for global business guests, offering modern comfort at exceptional value; authentic Arabic hospitality combined with first-class service.",
          image: "future_brand_corp.jpg",
          logo: "corp.svg",
        },
        {
          name: "EWA Hotel Apartments",
          tagline: "It Feels Like Home",
          description: "Beautifully laid out serviced apartments with a residential look and feel, the ideal home away from home for short and long stays.",
          image: "future_brand_ewa.jpg",
          logo: "ewa.svg",
        },
        {
          name: "ECOS Hotels",
          tagline: "Experience It",
          description: "Millennial-centric lifestyle hotspots - the perfect fusion of ultramodern comfort, value, and practicality.",
          image: "future_brand_ecos.jpg",
          logo: "ecos.svg",
        },
      ];

  const brandKeys = ["bahi", "coral", "corp", "ewa", "ecos"];
  const brandsList = rawBrandsList.map((brand: any, idx: number) => {
    const key = brandKeys[idx] || "bahi";
    const imgUrls = getAssetUrls(brand.image, `future_brand_${key}.jpg`);
    const logoUrls = getAssetUrls(brand.logo, `${key}.svg`);
    return {
      name: brand.name,
      tagline: brand.tagline,
      description: brand.description,
      imageUrls: imgUrls,
      logoUrls: logoUrls,
    };
  });

  // 7. Services
  const servicesTitle = body.services_title || "Services";
  const servicesIntro = body.services_intro ||
    "HMH – Hospitality Management Holding is a fully integrated hotel management company that provides all the advisory services required starting at the financial and feasibility review stage and leading to the operation of the completed hotel.\n\nOur services are designed to assist you at every stage of the development ensuring a strong foundation from the inception to the completion of the hotel.";
  const servicesHeadline = "Our dynamic hotel team facilitate the following services:";

  const rawServicesList = Array.isArray(body.services_list) && body.services_list.length > 0
    ? body.services_list
    : [
        {
          title: "Entrepreneurship and Financial Expertise",
          icon: "future_service_1.svg",
        },
        {
          title: "Technical Services",
          icon: "future_service_2.svg",
        },
        {
          title: "Comprehensive Operations & Management",
          icon: "future_service_3.svg",
        },
        {
          title: "Human Resource Management & Training",
          icon: "future_service_4.svg",
        },
        {
          title: "Sales & Marketing Support with a Global Distribution Network",
          icon: "future_service_5.svg",
        },
        {
          title: "Strong performances with the aim to achieve strong ROI - return on investment",
          icon: "future_service_6.svg",
        },
      ];

  const servicesList = rawServicesList.map((srv: any, idx: number) => {
    const defaultIcon = `future_service_${idx + 1}.svg`;
    const iconUrls = getAssetUrls(srv.icon, defaultIcon);
    return {
      title: srv.title,
      iconUrls: iconUrls,
    };
  });

  return (
    <main className="future-developments-page">
      {/* ================= 1. HERO BANNER WITH INTEGRATED HEADER ================= */}
      <header className="future-hero-section">
        {/* Background Slides */}
        <div className="future-hero-slider">
          {heroSlides.map((slide: any, idx: number) => (
            <div
              key={idx}
              className={`future-hero-slide ${idx === heroIndex ? "active" : ""}`}
            >
              <img
                src={slide.urls.local}
                alt={slide.title}
                className="future-hero-slide-img"
                onError={(e) => {
                  if (slide.urls.cdn && e.currentTarget.src !== slide.urls.cdn) {
                    e.currentTarget.src = slide.urls.cdn;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Dark Linear Overlay */}
        <div className="future-hero-overlay"></div>

        {/* Transparent Luxury Header */}
        <Header />

        {/* Hero Title & Subtitle Content */}
        <div className="future-hero-content">
          <div className="container">
            {currentHeroSlide.subtitle && (
              <span className="future-hero-subtitle">{currentHeroSlide.subtitle}</span>
            )}
            <h1 className="future-hero-title">{currentHeroSlide.title}</h1>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="future-hero-controls">
          <button
            type="button"
            className="future-slider-arrow"
            onClick={prevHeroSlide}
            aria-label="Previous Slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="future-hero-dots">
            {heroSlides.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                className={`future-hero-dot ${idx === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="future-play-pause-btn"
            onClick={() => setHeroPlaying((p) => !p)}
            aria-label={heroPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <i className={`fas ${heroPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>

          <button
            type="button"
            className="future-slider-arrow"
            onClick={nextHeroSlide}
            aria-label="Next Slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </header>

      {/* ================= 2. MASTERBRAND INTRO BLOCK ================= */}
      <section className="future-intro-section" id="intro">
        <div className="container">
          <div className="future-intro-container">
            {introSubtitle && <span className="future-intro-subtitle">{introSubtitle}</span>}
            <h2 className="future-intro-title">{introTitle}</h2>
            <div className="future-intro-text">
              {introText.split("\n\n").map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {ctaLink && (
              <a href={ctaLink} className="future-cta-btn">
                <span>{ctaText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14.419 9.615" fill="none">
                  <path d="M7.83 1.399L12.419 4.807L7.83 8.216" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 4.807H11.444" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ================= 3. CMS IMAGE CAROUSEL SLIDER ================= */}
      <section className="future-image-slider-section">
        <div className="container">
          <div className="future-image-slider-container">
            <div className="future-image-slider-track">
              {gallerySlides.map((slide: any, idx: number) => (
                <div
                  key={idx}
                  className={`future-image-slide ${idx === galleryIndex ? "active" : ""}`}
                >
                  <img
                    src={slide.urls.local}
                    alt={slide.alt}
                    loading="lazy"
                    onError={(e) => {
                      if (slide.urls.cdn && e.currentTarget.src !== slide.urls.cdn) {
                        e.currentTarget.src = slide.urls.cdn;
                      }
                    }}
                  />
                </div>
              ))}

              {/* Prev / Next Arrows */}
              <div className="future-image-slider-controls">
                <button
                  type="button"
                  className="future-image-slider-arrow"
                  onClick={prevGallerySlide}
                  aria-label="Previous Slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  className="future-image-slider-arrow"
                  onClick={nextGallerySlide}
                  aria-label="Next Slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Dots + Play/Pause */}
            <div className="future-image-slider-dots-wrap">
              {gallerySlides.map((_: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  className={`future-image-dot ${idx === galleryIndex ? "active" : ""}`}
                  onClick={() => setGalleryIndex(idx)}
                  aria-label={`Gallery slide ${idx + 1}`}
                />
              ))}
              <button
                type="button"
                className="future-play-pause-btn text-dark ms-2"
                onClick={() => setGalleryPlaying((p) => !p)}
                aria-label={galleryPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                <i className={`fas ${galleryPlaying ? "fa-pause" : "fa-play"}`} style={{ color: "#132a39" }}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. PLAIN TEXT SECTION ================= */}
      <section className="future-plain-text-section">
        <div className="container">
          <div className="future-plain-text-container">
            <h2 className="future-plain-text-title">{valuePropTitle}</h2>
            <div className="future-plain-text-body">
              {valuePropText.split("\n\n").map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. TEXT & IMAGE OVERVIEW SECTION ================= */}
      <section className="future-overview-section">
        <div className="container">
          <div className="future-overview-container">
            <div className="future-overview-row">
              <div className="future-overview-text-col">
                <div
                  className="future-overview-text"
                  dangerouslySetInnerHTML={{
                    __html: expansionText
                      .split("\n\n")
                      .map((p: string) => `<p>${p}</p>`)
                      .join(""),
                  }}
                />
              </div>

              <div className="future-overview-img-col">
                <div className="future-overview-img-wrap">
                  <img
                    src={expansionUrls.local}
                    alt="HMH Core Brands Overview"
                    loading="lazy"
                    onError={(e) => {
                      if (expansionUrls.cdn && e.currentTarget.src !== expansionUrls.cdn) {
                        e.currentTarget.src = expansionUrls.cdn;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FEATURE BRANDS GRID ================= */}
      <section className="future-brands-section">
        <div className="container-fluid px-lg-5">
          <div className="future-brands-container">
            <div className="future-brands-grid">
              {brandsList.map((brand: any, idx: number) => (
                <div key={idx} className="future-brand-card">
                  <div className="future-brand-card-top">
                    <img
                      src={brand.imageUrls.local}
                      alt={brand.name}
                      className="future-brand-card-img"
                      loading="lazy"
                      onError={(e) => {
                        if (brand.imageUrls.cdn && e.currentTarget.src !== brand.imageUrls.cdn) {
                          e.currentTarget.src = brand.imageUrls.cdn;
                        }
                      }}
                    />
                    <div className="future-brand-card-overlay"></div>

                    <div className="future-brand-card-logo-wrap">
                      <img
                        src={brand.logoUrls.local}
                        alt={`${brand.name} Logo`}
                        className="future-brand-card-logo"
                        loading="lazy"
                        onError={(e) => {
                          if (brand.logoUrls.cdn && e.currentTarget.src !== brand.logoUrls.cdn) {
                            e.currentTarget.src = brand.logoUrls.cdn;
                          }
                        }}
                      />
                    </div>

                    <div className="future-brand-card-tagline">
                      {brand.tagline}
                    </div>
                  </div>

                  <div className="future-brand-card-bottom">
                    <p className="future-brand-card-desc">{brand.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. SERVICES SECTION ================= */}
      <section className="future-services-section">
        <div className="container">
          <div className="future-services-container">
            <div className="future-services-header">
              <h2 className="future-services-title">{servicesTitle}</h2>
            </div>

            <div className="future-services-content-wrap">
              {/* Left Intro */}
              <div className="future-services-intro-col">
                <div className="future-services-intro-text">
                  {servicesIntro.split("\n\n").map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Right Services List */}
              <div className="future-services-list-col">
                <div className="future-services-headline">
                  {servicesHeadline}
                </div>

                <div className="future-services-grid">
                  {servicesList.map((item: any, idx: number) => (
                    <div key={idx} className="future-service-item">
                      <div className="future-service-icon-wrap">
                        <img
                          src={item.iconUrls.local}
                          alt={item.title}
                          className="future-service-icon"
                          loading="lazy"
                          onError={(e) => {
                            if (item.iconUrls.cdn && e.currentTarget.src !== item.iconUrls.cdn) {
                              e.currentTarget.src = item.iconUrls.cdn;
                            }
                          }}
                        />
                      </div>
                      <h3 className="future-service-item-title">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. OUR BRANDS BAR ================= */}
      <OurBrandsBar />
    </main>
  );
}
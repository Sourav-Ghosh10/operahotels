"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getPageData, resolveImageUrl } from "@/services/api";
import "./privacy-policy.css";

const CDN_FALLBACK_IMG = "https://image-tc.galaxy.tf/wijpeg-e13mupbfo8skm9uovb4nzkxf1/whatsapp-image-2024-11-28-at-1-55-59-pm.jpg?width=1920";

function resolvePrivacyImg(filenameOrUrl: string | undefined | null): { local: string; backend: string; cdn: string } {
  const target = filenameOrUrl || "privacy_banner_1.jpg";
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return { local: target, backend: target, cdn: target };
  }
  const clean = target.replace(/^.*[\\\/]/, "");
  return {
    backend: resolveImageUrl(`uploads/${clean}`),
    local: `/uploads/${clean}`,
    cdn: CDN_FALLBACK_IMG,
  };
}

export default function PrivacyPolicyPage() {
  const [pageData, setPageData] = useState<any>(null);

  // Hero Slider State
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);

  // Accordion State - by default first item expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPageData("privacy-policy");
        if (data) {
          setPageData(data);
        }
      } catch (e) {
        console.error("Failed to load page data for privacy-policy:", e);
      }
    };
    loadData();
  }, []);

  const body = pageData?.body || {};

  // 1. Hero Slides - check banner_images (uploaded via FileUpload in Filament) or banner_slides
  let heroSlidesList: any[] = [];
  if (Array.isArray(body.banner_images) && body.banner_images.length > 0) {
    heroSlidesList = body.banner_images.map((img: string, idx: number) => {
      const matchingSlide = Array.isArray(body.banner_slides) ? body.banner_slides[idx] : null;
      return {
        image: img,
        title: matchingSlide?.title || body.intro_title || "Privacy Policy",
        subtitle: matchingSlide?.subtitle || body.intro_subtitle || "Hospitality Management Holding",
      };
    });
  } else if (Array.isArray(body.banner_slides) && body.banner_slides.length > 0) {
    heroSlidesList = body.banner_slides;
  } else {
    heroSlidesList = [
      {
        image: "privacy_banner_1.jpg",
        title: "Privacy Policy",
        subtitle: "Hospitality Management Holding",
      },
    ];
  }

  const heroSlides = heroSlidesList.map((slide: any) => {
    const urls = resolvePrivacyImg(slide.image);
    return {
      urls,
      title: slide.title || "Privacy Policy",
      subtitle: slide.subtitle || "Hospitality Management Holding",
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

  // 2. Intro Section
  const introSubtitle = body.intro_subtitle || "Hospitality Management Holding";
  const introTitle = body.intro_title || body.content_title || "PRIVACY POLICY";
  const introText = body.intro_text || "Learn More About Your Privacy Rights";

  // 3. Accordion Items
  const rawAccordion = Array.isArray(body.privacy_accordion) && body.privacy_accordion.length > 0
    ? body.privacy_accordion
    : [
        {
          title: "Third Parties",
          description: "<p>We do not rent, sell, or exchange your names, personal information, or email address to third-party companies for their marketing purposes. We do provide your information to reputable organizations that help us to fulfill your services. For example, we use commercial software to broadcast our regular newsletters and share only the necessary information to enable our newsletter to be broadcast. We do not provide your email addresses to them for any other purposes.</p>",
        },
        {
          title: "Cookies And Other Computer Information",
          description: "<p>When you visit HMHHotelGroup.com (referred hereafter solely as HMH), small text files known as \"cookies\" will be stored on your computer's hard drive. A cookie does not contain any personal information, and is only used to enable the features and functionality of the website. For example, our site uses cookies to remember what language you prefer.</p>",
        },
        {
          title: "How Do We Protect The Security Of Your Information?",
          description: "<p>We protect our databases with various physical, technical and procedural measures and we restrict access to your information by unauthorized persons. Our information systems are maintained behind a software firewall to isolate them from access by other networks connected to the Internet. Only those employees who need the information to perform a specific job are granted access to personally identifiable information.</p>",
        },
        {
          title: "Do We Link To Other Websites?",
          description: "<p>HMH sometimes provides links to other companies' websites. Unless we expressly say otherwise, a link to another website does not mean that we are responsible for, or that we endorse the content or policy of that website. When you provide information at one of these sites, you are subject to that site's privacy policy. We encourage you to read that website's policy before submitting any information if you have concerns about how information may be collected or used.</p>",
        },
        {
          title: "Changes To The HmH Privacy Policy",
          description: "<p>This Privacy Policy was posted on HMH on April 28, 2008. We reserve the right to change, modify or amend this policy at any time. If we make any significant change to this policy, we will post notice of the change on HMH.</p>",
        },
      ];

  const toggleAccordion = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  // 4. Bottom Slider Image
  const sliderImgUrls = resolvePrivacyImg(
    Array.isArray(body.privacy_slider_images) && body.privacy_slider_images.length > 0
      ? body.privacy_slider_images[0]
      : "privacy_slider_1.jpg"
  );

  return (
    <main className="privacy-policy-page">
      {/* ================= 1. HERO BANNER WITH INTEGRATED HEADER ================= */}
      <header className="privacy-hero-section">
        {/* Background Slides */}
        <div className="privacy-hero-slider">
          {heroSlides.map((slide: any, idx: number) => (
            <div
              key={idx}
              className={`privacy-hero-slide ${idx === heroIndex ? "active" : ""}`}
            >
              <img
                src={slide.urls.backend}
                alt={slide.title}
                className="privacy-hero-slide-img"
                onError={(e) => {
                  if (slide.urls.local && e.currentTarget.src !== slide.urls.local) {
                    e.currentTarget.src = slide.urls.local;
                  } else if (slide.urls.cdn && e.currentTarget.src !== slide.urls.cdn) {
                    e.currentTarget.src = slide.urls.cdn;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Dark Linear Overlay */}
        <div className="privacy-hero-overlay"></div>

        {/* Transparent Header */}
        <Header />

        {/* Hero Title & Subtitle */}
        <div className="privacy-hero-content">
          <div className="container">
            {currentHeroSlide.subtitle && (
              <span className="privacy-hero-subtitle">{currentHeroSlide.subtitle}</span>
            )}
            <h1 className="privacy-hero-title">{currentHeroSlide.title}</h1>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="privacy-hero-controls">
          <button
            type="button"
            className="privacy-slider-arrow"
            onClick={prevHeroSlide}
            aria-label="Previous Slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="privacy-hero-dots">
            {heroSlides.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                className={`privacy-hero-dot ${idx === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="privacy-play-pause-btn"
            onClick={() => setHeroPlaying((p) => !p)}
            aria-label={heroPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <i className={`fas ${heroPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>

          <button
            type="button"
            className="privacy-slider-arrow"
            onClick={nextHeroSlide}
            aria-label="Next Slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </header>

      {/* ================= 2. MASTERBRAND INTRO BLOCK ================= */}
      <section id="intro" className="privacy-intro-section">
        <div className="container">
          <div className="privacy-intro-container">
            {introSubtitle && <span className="privacy-intro-subtitle">{introSubtitle}</span>}
            <h1 className="privacy-intro-title">{introTitle}</h1>
            <div className="privacy-intro-divider"></div>
            {introText && <p className="privacy-intro-text">{introText}</p>}
          </div>
        </div>
      </section>

      {/* ================= 3. ACCORDION SECTION ================= */}
      <section className="privacy-accordion-section">
        <div className="container">
          <div className="privacy-accordion-container">
            {rawAccordion.map((item: any, idx: number) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`privacy-accordion-item ${isExpanded ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="privacy-accordion-header"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`privacy-item-${idx}`}
                  >
                    <h2 className="privacy-accordion-title">{item.title}</h2>
                    <span className="privacy-accordion-icon-wrap">
                      <i className={`fas ${isExpanded ? "fa-minus" : "fa-plus"}`}></i>
                    </span>
                  </button>

                  <div
                    id={`privacy-item-${idx}`}
                    className="privacy-accordion-content-wrap"
                  >
                    <div
                      className="privacy-accordion-body"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div style={{ padding: "0 32px 20px" }}>
                      <button
                        type="button"
                        className="privacy-item-read-more"
                        onClick={() => toggleAccordion(idx)}
                      >
                        <span>{isExpanded ? "Read Less" : "Read More"}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 14.419 9.615"
                          fill="none"
                        >
                          <path
                            d="M7.83 1.399L12.419 4.807L7.83 8.216"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M0 4.807H11.444"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. BOTTOM IMAGE SLIDER ================= */}
      <section className="privacy-slider-section">
        <div className="container">
          <div className="privacy-slider-container">
            <div className="privacy-slider-track">
              <div className="terms-slider-slide">
                <img
                  src={sliderImgUrls.backend}
                  alt="HMH Hotel Facilities"
                  loading="lazy"
                  onError={(e) => {
                    if (sliderImgUrls.local && e.currentTarget.src !== sliderImgUrls.local) {
                      e.currentTarget.src = sliderImgUrls.local;
                    } else if (sliderImgUrls.cdn && e.currentTarget.src !== sliderImgUrls.cdn) {
                      e.currentTarget.src = sliderImgUrls.cdn;
                    }
                  }}
                />
              </div>

              {/* Slider Arrows */}
              <div className="privacy-slider-controls">
                <button
                  type="button"
                  className="privacy-slider-arrow-btn"
                  aria-label="Previous Slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  className="privacy-slider-arrow-btn"
                  aria-label="Next Slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. OUR BRANDS BAR ================= */}
      <OurBrandsBar />
    </main>
  );
}
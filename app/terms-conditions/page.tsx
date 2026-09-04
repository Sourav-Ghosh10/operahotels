"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import OurBrandsBar from "@/components/OurBrandsBar";
import { getPageData } from "@/services/api";
import "./terms-conditions.css";

const CDN_FALLBACK_IMG = "https://image-tc.galaxy.tf/wijpeg-b908ajejqmip9iayngpr2zdmv/dsc4324.jpg?width=1920";
const BACKEND_URL = "http://127.0.0.1:8000";

function resolveTermsImg(filenameOrUrl: string | undefined | null): { local: string; backend: string; cdn: string } {
  const target = filenameOrUrl || "dsc4324.jpg";
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return { local: target, backend: target, cdn: target };
  }
  const clean = target.replace(/^.*[\\\/]/, "");
  return {
    backend: `${BACKEND_URL}/uploads/${clean}`,
    local: `/uploads/${clean}`,
    cdn: CDN_FALLBACK_IMG,
  };
}

export default function TermsConditionsPage() {
  const [pageData, setPageData] = useState<any>(null);

  // Hero Slider State
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);

  // Accordion State - by default first item expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPageData("terms-conditions");
        if (data) {
          setPageData(data);
        }
      } catch (e) {
        console.error("Failed to load page data for terms-conditions:", e);
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
        title: matchingSlide?.title || body.intro_title || "Terms & Conditions",
        subtitle: matchingSlide?.subtitle || body.intro_subtitle || "Hospitality Management Holding",
      };
    });
  } else if (Array.isArray(body.banner_slides) && body.banner_slides.length > 0) {
    heroSlidesList = body.banner_slides;
  } else {
    heroSlidesList = [
      {
        image: "terms_banner_1.jpg",
        title: "Terms & Conditions",
        subtitle: "Hospitality Management Holding",
      },
    ];
  }

  const heroSlides = heroSlidesList.map((slide: any) => {
    const urls = resolveTermsImg(slide.image);
    return {
      urls,
      title: slide.title || "Terms & Conditions",
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
  const introTitle = body.intro_title || body.content_title || "TERMS & CONDITIONS";
  const introText = body.intro_text || "Read here our terms and conditions";

  // 3. Accordion Items
  const rawAccordion = Array.isArray(body.terms_accordion) && body.terms_accordion.length > 0
    ? body.terms_accordion
    : [
        {
          title: "Copyright information",
          description: "<p>All pages and graphics on this web site are the property of HMH. Pages, code or other content from the HMH website may not be redistributed or reproduced in any way, shape, or form without the express written consent of HMH. Failure to obey is a violation of copyright laws.</p>",
        },
        {
          title: "Guarantees",
          description: "<p>The HMH website is provided without a guarantee of any kind. The HMH website may contain errors or incorrect code that does not function properly. HMH makes no representations about the suitability of this documentation for any purpose. All content and code are provided 'as is' without warranty of any kind. HMH hereby disclaims all warranties and conditions with regard to this information, including all implied warranties and conditions of merchantability, fitness for a particular purpose, title and non-infringement. In no event shall HMH be liable for any special, indirect or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this information.</p>",
        },
        {
          title: "Linked sites and partners",
          description: "<p>The HMH website contains links to other internet web sites. HMH is not responsible for any content that appears on partner web sites or other linked to sites.</p>",
        },
        {
          title: "User agreement",
          description: "<p>By using the HMH website you agree that you have read and agreed to the terms specified on this copyright page.</p>",
        },
      ];

  const toggleAccordion = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  // 4. Bottom Slider Image
  const sliderImgUrls = resolveTermsImg(
    Array.isArray(body.terms_slider_images) && body.terms_slider_images.length > 0
      ? body.terms_slider_images[0]
      : "dsc4324.jpg"
  );

  return (
    <main className="terms-conditions-page">
      {/* ================= 1. HERO BANNER WITH INTEGRATED HEADER ================= */}
      <header className="terms-hero-section">
        {/* Background Slides */}
        <div className="terms-hero-slider">
          {heroSlides.map((slide: any, idx: number) => (
            <div
              key={idx}
              className={`terms-hero-slide ${idx === heroIndex ? "active" : ""}`}
            >
              <img
                src={slide.urls.backend}
                alt={slide.title}
                className="terms-hero-slide-img"
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
        <div className="terms-hero-overlay"></div>

        {/* Transparent Header */}
        <Header />

        {/* Hero Title & Subtitle */}
        <div className="terms-hero-content">
          <div className="container">
            {currentHeroSlide.subtitle && (
              <span className="terms-hero-subtitle">{currentHeroSlide.subtitle}</span>
            )}
            <h1 className="terms-hero-title">{currentHeroSlide.title}</h1>
          </div>
        </div>

        {/* Hero Controls */}
        <div className="terms-hero-controls">
          <button
            type="button"
            className="terms-slider-arrow"
            onClick={prevHeroSlide}
            aria-label="Previous Slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className="terms-hero-dots">
            {heroSlides.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                className={`terms-hero-dot ${idx === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="terms-play-pause-btn"
            onClick={() => setHeroPlaying((p) => !p)}
            aria-label={heroPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <i className={`fas ${heroPlaying ? "fa-pause" : "fa-play"}`}></i>
          </button>

          <button
            type="button"
            className="terms-slider-arrow"
            onClick={nextHeroSlide}
            aria-label="Next Slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </header>

      {/* ================= 2. MASTERBRAND INTRO BLOCK ================= */}
      <section id="intro" className="terms-intro-section">
        <div className="container">
          <div className="terms-intro-container">
            {introSubtitle && <span className="terms-intro-subtitle">{introSubtitle}</span>}
            <h1 className="terms-intro-title">{introTitle}</h1>
            <div className="terms-intro-divider"></div>
            {introText && <p className="terms-intro-text">{introText}</p>}
          </div>
        </div>
      </section>

      {/* ================= 3. ACCORDION SECTION ================= */}
      <section className="terms-accordion-section">
        <div className="container">
          <div className="terms-accordion-container">
            {rawAccordion.map((item: any, idx: number) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className={`terms-accordion-item ${isExpanded ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="terms-accordion-header"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`terms-item-${idx}`}
                  >
                    <h2 className="terms-accordion-title">{item.title}</h2>
                    <span className="terms-accordion-icon-wrap">
                      <i className={`fas ${isExpanded ? "fa-minus" : "fa-plus"}`}></i>
                    </span>
                  </button>

                  <div
                    id={`terms-item-${idx}`}
                    className="terms-accordion-content-wrap"
                  >
                    <div
                      className="terms-accordion-body"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div style={{ padding: "0 32px 20px" }}>
                      <button
                        type="button"
                        className="terms-item-read-more"
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
      <section className="terms-slider-section">
        <div className="container">
          <div className="terms-slider-container">
            <div className="terms-slider-track">
              <div className="terms-slider-slide">
                <img
                  src={sliderImgUrls.backend}
                  alt="HMH Hotel Interior"
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
              <div className="terms-slider-controls">
                <button
                  type="button"
                  className="terms-slider-arrow-btn"
                  aria-label="Previous Slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  className="terms-slider-arrow-btn"
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
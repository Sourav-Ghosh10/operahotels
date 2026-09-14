"use client";
import React, { useEffect, useState } from "react";
import { useUI } from "@/app/UIContext";
import Link from "next/link";

type Locale = "en" | "ar";

export default function Navigation() {
  const { isNavOpen, setIsNavOpen, setIsBookingOpen, setIsPageLoading } = useUI();
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("app_locale") as Locale;
        if (saved === "en" || saved === "ar") {
          setLocale(saved);
        }
      } catch (err) {}
    }

    const handleLocaleChange = (e: Event) => {
      const next = (e as CustomEvent<Locale>).detail;
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

  function selectLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("app_locale", nextLocale);
      } catch (err) {}
      window.dispatchEvent(new CustomEvent("locale-change", { detail: nextLocale }));
      window.dispatchEvent(new CustomEvent("destination-locale-change", { detail: nextLocale }));
    }
  }

  const handleMenuLinkClick = (href: string) => {
    setIsNavOpen(false);
    if (typeof window !== "undefined" && window.location.pathname !== href) {
      setIsPageLoading(true);
    }
  };

  return (
    <div className={`overlay-navigation ${isNavOpen ? "active" : ""}`}>
      <div className="overlay-left-pane">
        <button
          className="overlay-close-btn"
          aria-label="Close menu"
          onClick={(e) => {
            e.preventDefault();
            setIsNavOpen(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="overlay-sidebar-content">
          <Link href="/" onClick={() => setIsNavOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>
            <h3 className="overlay-sidebar-heading">Hospitality Management Holding</h3>
            <div className="overlay-sidebar-img-wrapper">
              <img
                src="/img/explore_clocktower.png"
                alt="Traditional Arabic Architecture"
                className="overlay-sidebar-img"
              />
            </div>
          </Link>
          <div className="overlay-sidebar-socials">
            <h5 className="socials-heading">Follow Us</h5>
            <div className="socials-icons">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Threads">
                <i className="fab fa-threads"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="X (Twitter)">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="overlay-right-pane">
        <div className="overlay-right-top">
          <div className="dropdown overlay-lang-dropdown">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={(e) => e.preventDefault()}
            >
              {locale === "en" ? "ENGLISH" : "العربية"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ms-1 dropdown-chevron"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className={`dropdown-item text-capitalize ${locale === "en" ? "active" : ""}`}
                  type="button"
                  onClick={() => selectLocale("en")}
                >
                  ENGLISH
                </button>
              </li>
              <li>
                <button
                  className={`dropdown-item text-capitalize ${locale === "ar" ? "active" : ""}`}
                  type="button"
                  onClick={() => selectLocale("ar")}
                >
                  العربية
                </button>
              </li>
            </ul>
          </div>
          <a
            href="#"
            className="btn btn-book-now"
            onClick={(e) => {
              e.preventDefault();
              setIsNavOpen(false);
              setIsBookingOpen(true);
            }}
          >
            BOOK NOW
          </a>
        </div>

        <div className="overlay-menu-container">
          <nav className="overlay-menu-grid">
            <div className="overlay-menu-col">
              <Link href="/" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/")}>HOME</Link>
              <Link href="/brands" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/brands")}>BRANDS</Link>
              <Link href="/destinations" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/destinations")}>DESTINATIONS</Link>
              <Link href="/offers" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/offers")}>SPECIAL OFFERS</Link>
              <Link href="/meetings-events" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/meetings-events")}>MEETINGS &amp; EVENTS</Link>
            </div>
            <div className="overlay-menu-col">
              <Link href="/contact" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/contact")}>CONTACT US</Link>
              <Link href="/gallery" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/gallery")}>GALLERY</Link>
              <Link href="/newsletter" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/newsletter")}>NEWSLETTER</Link>
              <Link href="/future-developments" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/future-developments")}>FUTURE DEVELOPMENTS</Link>
              <Link href="/careers" className="overlay-menu-link" onClick={() => handleMenuLinkClick("/careers")}>CAREERS</Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

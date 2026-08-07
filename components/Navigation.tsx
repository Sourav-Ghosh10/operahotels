"use client";
import React from "react";
import { useUI } from "@/app/UIContext";
import Link from "next/link";

export default function Navigation() {
  const { isNavOpen, setIsNavOpen, setIsBookingOpen } = useUI();

  return (
    <div className={`overlay-navigation ${isNavOpen ? "active" : ""}`}>
      {/* Left Sidebar / Pane */}
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
          <h3 className="overlay-sidebar-heading">Hospitality Management Holding</h3>
          <div className="overlay-sidebar-img-wrapper">
            <img
              src="/img/explore_clocktower.png"
              alt="Traditional Arabic Architecture"
              className="overlay-sidebar-img"
            />
          </div>
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

      {/* Right Content Pane */}
      <div className="overlay-right-pane">
        <div className="overlay-right-top">
          {/* Language Selector */}
          <div className="dropdown overlay-lang-dropdown">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ENGLISH
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
                <a className="dropdown-item text-capitalize" href="#">
                  ENGLISH
                </a>
              </li>
              <li>
                <a className="dropdown-item text-capitalize" href="#">
                  العربية
                </a>
              </li>
              <li>
                <a className="dropdown-item text-capitalize" href="#">
                  FRANÇAIS
                </a>
              </li>
            </ul>
          </div>
          {/* Book Now Button */}
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
              <Link href="/" className="overlay-menu-link">HOME</Link>
              <Link href="/brands" className="overlay-menu-link">BRANDS</Link>
              <Link href="/destinations" className="overlay-menu-link">DESTINATIONS</Link>
              <Link href="/offers" className="overlay-menu-link">SPECIAL OFFERS</Link>
              <Link href="/" className="overlay-menu-link">MEETINGS & EVENTS</Link>
            </div>
            <div className="overlay-menu-col">
              <Link href="/contact" className="overlay-menu-link">CONTACT US</Link>
              <Link href="/" className="overlay-menu-link">GALLERY</Link>
              <Link href="/" className="overlay-menu-link">NEWSLETTER</Link>
              <Link href="/" className="overlay-menu-link">FUTURE DEVELOPMENTS</Link>
              <Link href="/" className="overlay-menu-link">CAREERS</Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

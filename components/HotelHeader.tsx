"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/app/UIContext";

interface HotelHeaderProps {
  logoUrl?: string;
  hotelSlug?: string;
  isSolid?: boolean;
}

export default function HotelHeader({ logoUrl, hotelSlug, isSolid }: HotelHeaderProps) {
  const { setIsNavOpen, setIsBookingOpen } = useUI();
  const pathname = usePathname();

  let currentSlug = hotelSlug;
  if (!currentSlug && pathname) {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && !['offers', 'contact', 'destinations', 'brands', 'about', 'gallery', 'future-developments', 'press-release'].includes(segments[0])) {
      currentSlug = segments[0];
    }
  }

  // Auto-detect if solid nav is needed (e.g. room details or subpages where no full-screen hero slider exists)
  const isSolidNav = isSolid !== undefined ? isSolid : Boolean(pathname && pathname.includes('/rooms-suites'));

  const meetingsEventsHref = currentSlug ? `/${currentSlug}/meetings-events` : '/bahi-hotels-resorts/meetings-events';

  return (
    <nav
      className={`navbar navbar-expand-lg ${isSolidNav ? 'solid-hotel-nav position-sticky top-0' : 'transparent-nav position-absolute'} w-100`}
      style={{
        zIndex: 1020,
        backgroundColor: isSolidNav ? "#0b1a26" : undefined,
        borderBottom: isSolidNav ? "1px solid rgba(255, 255, 255, 0.12)" : undefined,
        boxShadow: isSolidNav ? "0 4px 20px rgba(0, 0, 0, 0.25)" : undefined,
        transition: "all 0.3s ease"
      }}
    >
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center">
          {/* Custom Toggle Icon */}
          <a
            href="#"
            className="custom-nav-toggler me-3 me-lg-4 text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              setIsNavOpen(true);
            }}
          >
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
            <span className="line line-4"></span>
          </a>

          {/* Logo */}
          <Link className="navbar-brand m-0 d-flex align-items-center" href={currentSlug ? `/${currentSlug}` : "/"}>
            <img
              src={logoUrl || "/img/operalogo-white 1.png"}
              alt="Hotel Logo"
              style={{
                height: isSolidNav ? "70px" : (logoUrl ? "115px" : "100px"),
                maxHeight: isSolidNav ? "78px" : "125px",
                maxWidth: "280px",
                objectFit: "contain",
                display: "block",
                transition: "all 0.3s ease"
              }}
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler d-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}#overview` : "/"}>OVERVIEW</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}#accommodation` : "/rooms-suites"}>ROOMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}#dining` : "#dining"}>DINING</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}/special-offers` : "/offers"}>OFFERS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={meetingsEventsHref}>MEETINGS &amp; EVENTS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}#gallery` : "/gallery"}>GALLERY</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={currentSlug ? `/${currentSlug}/contact` : "/contact"}>CONTACT</Link>
            </li>

            {/* Mobile Book Now Button */}
            <li className="nav-item d-lg-none mt-4 w-100 px-3">
              <a
                href="#"
                className="btn btn-book-now w-100"
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookingOpen(true);
                }}
              >
                BOOK NOW
              </a>
            </li>
          </ul>

          {/* Desktop Book Now Button */}
          <div className="d-none d-lg-block">
            <a
              href="#"
              className="btn btn-book-now"
              onClick={(e) => {
                e.preventDefault();
                setIsBookingOpen(true);
              }}
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";
import React from "react";
import Link from "next/link";
import { useUI } from "@/app/UIContext";

export default function Header() {
  const { setIsNavOpen, setIsBookingOpen } = useUI();

  return (
    <nav className="navbar navbar-expand-lg transparent-nav position-relative" style={{ zIndex: 10 }}>
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
          <Link className="navbar-brand m-0" href="/">
            <img src="/img/operalogo-white 1.png" alt="" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <Link
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="/brands"
                id="brandsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                BRANDS & HOTELS
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
                  className="ms-1 nav-chevron-icon"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
              <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="brandsDropdown">
                <li className="dropdown-submenu">
                  <Link
                    className="dropdown-item d-flex align-items-center justify-content-between active"
                    href="/brands"
                  >
                    Bahi Hotels & Resorts
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="submenu-chevron"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <ul className="submenu-menu">
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Bahi Ajman Palace Hotel
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    href="/brands"
                  >
                    Coral Hotels & Resorts
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="submenu-chevron"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <ul className="submenu-menu">
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Coral Beach Resort Sharjah
                      </Link>
                    </li>
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Coral Deira Dubai
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    href="/brands"
                  >
                    Corp Hotels
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="submenu-chevron"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <ul className="submenu-menu">
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Corp Amman Hotel
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    href="/brands"
                  >
                    Ewa Hotels
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="submenu-chevron"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <ul className="submenu-menu">
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Ewa Amman Hotel
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <Link
                    className="dropdown-item d-flex align-items-center justify-content-between"
                    href="/brands"
                  >
                    Ecos Hotels
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="submenu-chevron"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <ul className="submenu-menu">
                    <li>
                      <Link className="submenu-item" href="/brands">
                        Ecos Coral Deira
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown custom-dropdown">
              <Link
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="/destinations"
                id="destinationsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                DESTINATIONS
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
                  className="ms-1 nav-chevron-icon"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>
              <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="destinationsDropdown">
                <li>
                  <Link className="dropdown-item" href="/dubai">
                    Dubai
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/destinations">
                    Amman
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/destinations">
                    Sharjah
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/offers">
                OFFERS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                CONTACT
              </Link>
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

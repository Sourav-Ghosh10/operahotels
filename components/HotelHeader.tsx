"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUI } from "@/app/UIContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function HotelHeader({ logoUrl }: { logoUrl?: string }) {
  const { setIsNavOpen, setIsBookingOpen } = useUI();

  return (
    <nav className="navbar navbar-expand-lg transparent-nav position-absolute w-100" style={{ zIndex: 10 }}>
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
            <img src={logoUrl || "/img/operalogo-white 1.png"} alt="Hotel Logo" style={{ maxHeight: "50px" }} />
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
              <Link className="nav-link" href="#">OVERVIEW</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">ROOMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">DINING</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/offers">OFFERS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">GALLERY</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">CONTACT</Link>
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


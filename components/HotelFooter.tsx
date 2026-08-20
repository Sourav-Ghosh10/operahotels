"use client";
import React from "react";
import Link from "next/link";

export default function HotelFooter({ logoUrl }: { logoUrl?: string }) {
  return (
    <footer className="hotel-footer bg-white pt-5 pb-0" style={{ color: "#333", borderTop: "1px solid #eaeaea", fontFamily: "Arial, sans-serif" }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="row mb-5">
          {/* Column 1: Logos and Contact */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center mb-5 gap-3">
              <img src="/img/dark.png" alt="Opera Hotels" style={{ maxHeight: "60px", objectFit: "contain" }} />
              {logoUrl && (
                <>
                  <div className="border-start border-dark mx-2" style={{ height: "40px" }}></div>
                  <img src={logoUrl} alt="Brand Logo" style={{ maxHeight: "60px", objectFit: "contain" }} />
                </>
              )}
            </div>
            
            <div className="d-flex align-items-center mt-auto">
              <div className="me-4 pe-4 border-end border-dark">
                <h4 className="mb-0 fw-bold" style={{ fontSize: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Best Rate<br />Guaranteed
                </h4>
              </div>
              <div>
                <span className="d-block text-uppercase" style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}>Book Online Or Call</span>
                <span className="d-block fw-bold" style={{ fontSize: "16px" }}>+971 4 290 9999</span>
              </div>
            </div>
          </div>

          {/* Column 2: Hotel Links */}
          <div className="col-12 col-md-4 col-lg-2 mb-4 mb-md-0">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Opera Grand Hotel</h6>
            <ul className="list-unstyled" style={{ fontSize: "12px", lineHeight: "2.5", fontWeight: "500", textTransform: "uppercase" }}>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Facilities</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Destinations</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Gallery</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Location & Contact</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate Links */}
          <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Opera Hotels</h6>
            <ul className="list-unstyled" style={{ fontSize: "12px", lineHeight: "2.5", fontWeight: "500", textTransform: "uppercase" }}>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">About Us</Link></li>
              <li><Link href="/contact" className="text-dark text-decoration-none hover-gold">Contact Us</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Press Release</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Terms and Conditions</Link></li>
              <li><Link href="#" className="text-dark text-decoration-none hover-gold">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="col-12 col-md-4 col-lg-3">
            <h6 className="fw-bold mb-4" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Stay In Touch</h6>
            <form className="mb-5">
              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control border-0 border-bottom border-dark rounded-0 px-0 shadow-none bg-transparent" 
                  placeholder="Your email" 
                  style={{ fontSize: "13px" }}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-outline-dark rounded-0 px-4 py-2" 
                style={{ fontSize: "12px", letterSpacing: "1px", fontWeight: "bold" }}
              >
                SIGN UP
              </button>
            </form>

            <h6 className="fw-bold mb-3" style={{ fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark fs-5"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-dark fs-5"><i className="fab fa-threads"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-100 py-3" style={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #eaeaea" }}>
        <div className="container-fluid px-4 px-lg-5 text-center">
          <p className="mb-0" style={{ fontSize: "11px", color: "#666", letterSpacing: "0.5px" }}>
            &copy; Copyright {new Date().getFullYear()} Opera Hotels - Hospitality Management Holding.
          </p>
        </div>
      </div>
    </footer>
  );
}


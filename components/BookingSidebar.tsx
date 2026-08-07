"use client";
import React, { useState } from "react";
import { useUI } from "@/app/UIContext";

export default function BookingSidebar() {
  const { isBookingOpen, setIsBookingOpen } = useUI();
  const [hotel, setHotel] = useState("SELECT HOTEL");
  const [rooms, setRooms] = useState("1");
  const [guests, setGuests] = useState("2");

  return (
    <div className={`booking-sidebar ${isBookingOpen ? "active" : ""}`}>
      {/* Close Button */}
      <button
        className="booking-close-btn"
        aria-label="Close booking panel"
        onClick={(e) => {
          e.preventDefault();
          setIsBookingOpen(false);
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

      <div className="booking-sidebar-content">
        <h2 className="booking-title">Book a room</h2>

        <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
          {/* Where Do You Want to Go */}
          <div className="booking-form-group">
            <label className="booking-label">
              <i className="fas fa-search booking-icon"></i> WHERE DO YOU WANT TO GO
            </label>
            <div className="booking-field-select dropdown">
              <a
                href="#"
                className="booking-value dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {hotel}
              </a>
              <ul className="dropdown-menu w-100">
                {["Bahi Ajman Palace Hotel", "Coral Beach Resort Sharjah", "Coral Deira Dubai", "Corp Amman Hotel", "Ewa Amman Hotel", "Ecos Coral Deira"].map((h) => (
                  <li key={h}>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setHotel(h); }}>
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Check In - Check Out */}
          <div className="booking-form-group">
            <label className="booking-label">
              <i className="far fa-calendar-alt booking-icon"></i> CHECK IN - CHECK OUT
            </label>
            <div className="booking-field-input">
              <input
                type="text"
                className="booking-input"
                defaultValue="23/07/2026 - 24/07/2026"
                placeholder="Select Dates"
              />
            </div>
          </div>

          {/* Rooms */}
          <div className="booking-form-group">
            <label className="booking-label">
              <i className="fas fa-bed booking-icon"></i> ROOMS
            </label>
            <div className="booking-field-select dropdown">
              <a
                href="#"
                className="booking-value dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {rooms}
              </a>
              <ul className="dropdown-menu w-100">
                {["1", "2", "3", "4+"].map((r) => (
                  <li key={r}>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setRooms(r); }}>
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guests */}
          <div className="booking-form-group">
            <label className="booking-label">
              <i className="fas fa-users booking-icon"></i> GUESTS
            </label>
            <div className="booking-field-select dropdown">
              <a
                href="#"
                className="booking-value dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {guests}
              </a>
              <ul className="dropdown-menu w-100">
                {["1", "2", "3", "4", "5+"].map((g) => (
                  <li key={g}>
                    <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setGuests(g); }}>
                      {g}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Promocode */}
          <div className="booking-form-group">
            <label className="booking-label">
              <i className="fas fa-tag booking-icon"></i> PROMOCODE
            </label>
            <div className="booking-field-input">
              <input
                type="text"
                className="booking-input text-uppercase"
                defaultValue="TYPE YOUR CODE"
                placeholder="Enter Promocode"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-booking-submit w-100">
            BOOK NOW
          </button>
        </form>

        <div className="booking-footer">
          <a href="#" className="booking-cancel-link">
            Modify / Cancel Reservation
          </a>
        </div>
      </div>
    </div>
  );
}

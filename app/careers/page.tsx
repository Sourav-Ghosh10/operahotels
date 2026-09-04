"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ConditionalFooter from "@/components/ConditionalFooter";
import Link from "next/link";
import { getPageData } from "@/services/api";

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const SAMPLE_JOBS: JobPosition[] = [
  {
    id: 1,
    title: "Front Office Supervisor",
    department: "Rooms Division",
    location: "Ajman, UAE",
    type: "Full Time",
    description: "Lead the front desk operations ensuring exceptional guest arrival and departure experiences with genuine warmth and efficiency."
  },
  {
    id: 2,
    title: "Sales & Marketing Manager",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full Time",
    description: "Drive strategic market positioning, corporate partnerships, and revenue growth across our flagship hotel properties."
  },
  {
    id: 3,
    title: "F&B Operations Supervisor",
    department: "Food & Beverage",
    location: "Sharjah, UAE",
    type: "Full Time",
    description: "Supervise restaurant service, banquet functions, and dining standards while delighting guests with impeccable culinary service."
  },
  {
    id: 4,
    title: "Guest Relations Executive",
    department: "Front Office",
    location: "Ajman, UAE",
    type: "Full Time",
    description: "Deliver bespoke concierge and VIP assistance, attending to guest preferences and orchestrating memorable stays."
  },
  {
    id: 5,
    title: "Executive Sous Chef",
    department: "Culinary",
    location: "Dubai, UAE",
    type: "Full Time",
    description: "Inspire the culinary team to craft exquisite international and Mediterranean menus utilizing the freshest local ingredients."
  },
  {
    id: 6,
    title: "Revenue & Reservations Specialist",
    department: "Revenue Management",
    location: "Dubai, UAE",
    type: "Full Time",
    description: "Analyze booking trends, yield strategies, and distribution channels to optimize hotel occupancy and RevPAR performance."
  }
];

export default function CareersPage() {
  const [pageData, setPageData] = useState<any>(null);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPageData("careers");
        if (data) setPageData(data);
      } catch (err) {
        console.error("Error loading careers data:", err);
      }
    };
    load();
  }, []);

  const departments = ["All", "Rooms Division", "Commercial & Sales", "Food & Beverage", "Front Office", "Culinary", "Revenue Management"];

  const filteredJobs = selectedDept === "All"
    ? SAMPLE_JOBS
    : SAMPLE_JOBS.filter(job => job.department === selectedDept);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
      setApplicationSubmitted(false);
    }, 2500);
  };

  return (
    <main className="careers-page" style={{ backgroundColor: "#faf9f6", minHeight: "100vh", fontFamily: "var(--font-primary, Arial, sans-serif)" }}>
      {/* 1. HERO BANNER */}
      <header className="position-relative overflow-hidden" style={{ minHeight: "550px", backgroundColor: "#111" }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('/img/luxury-hotel-reception-hall-lounge-restaurant-with-high-ceiling 1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
            filter: "brightness(0.85)"
          }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)"
          }}
        />

        <Header />

        <div className="container position-relative text-center text-white d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "450px", zIndex: 10, paddingTop: "100px" }}>
          <span className="text-uppercase mb-2" style={{ letterSpacing: "4px", fontSize: "13px", color: "#c5a46d", fontWeight: "600" }}>
            Hospitality Management Holding
          </span>
          <h1 className="fw-light display-4 mb-3" style={{ letterSpacing: "5px", textTransform: "uppercase" }}>
            CAREERS AT HMH
          </h1>
          <div style={{ width: "60px", height: "2px", backgroundColor: "#c5a46d", margin: "0 auto 20px" }}></div>
          <p className="lead max-w-700 text-light px-3" style={{ maxWidth: "700px", fontSize: "16px", lineHeight: "1.8", color: "#e0e0e0" }}>
            Join a vibrant hospitality family dedicated to genuine warmth, regional prestige, and limitless professional horizons.
          </p>
        </div>
      </header>

      {/* 2. INTRODUCTION & CULTURE */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-lg-4">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-lg-6">
              <span className="text-uppercase" style={{ letterSpacing: "3px", fontSize: "12px", color: "#c5a46d", fontWeight: "bold" }}>
                Work With Us
              </span>
              <h2 className="mt-2 mb-4 fw-normal" style={{ fontSize: "2.2rem", letterSpacing: "1px", color: "#222" }}>
                Empowering Talent,<br />Inspiring Excellence
              </h2>
              <p style={{ color: "#666", lineHeight: "1.9", fontSize: "15px" }}>
                At Hospitality Management Holding (HMH), we believe our people are the heartbeat of our success. Across our distinctive hotel brands, we foster a collaborative, inclusive culture that encourages individual initiative, creativity, and long-term career progression.
              </p>
              <p style={{ color: "#666", lineHeight: "1.9", fontSize: "15px" }}>
                Whether you aspire to delight guests at the front of house, excel in culinary mastery, or drive commercial success behind the scenes, HMH provides the mentorship, modern training programs, and global hospitality standards to help you achieve your career aspirations.
              </p>
              <div className="d-flex gap-4 mt-4 pt-2">
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: "#c5a46d" }}>5+</h4>
                  <span style={{ fontSize: "13px", color: "#777", textTransform: "uppercase", letterSpacing: "1px" }}>Hotel Brands</span>
                </div>
                <div style={{ borderLeft: "1px solid #ddd", paddingLeft: "1.5rem" }}>
                  <h4 className="fw-bold mb-1" style={{ color: "#c5a46d" }}>1000+</h4>
                  <span style={{ fontSize: "13px", color: "#777", textTransform: "uppercase", letterSpacing: "1px" }}>Hoteliers</span>
                </div>
                <div style={{ borderLeft: "1px solid #ddd", paddingLeft: "1.5rem" }}>
                  <h4 className="fw-bold mb-1" style={{ color: "#c5a46d" }}>30+</h4>
                  <span style={{ fontSize: "13px", color: "#777", textTransform: "uppercase", letterSpacing: "1px" }}>Nationalities</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="position-relative p-2 p-md-3">
                <img
                  src="/img/204821.png"
                  alt="HMH Team & Hospitality"
                  className="img-fluid shadow-sm"
                  style={{ borderRadius: "4px", width: "100%", height: "420px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES / WHY JOIN HMH */}
      <section className="py-5" style={{ backgroundColor: "#f6f4f0" }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-uppercase" style={{ letterSpacing: "3px", fontSize: "12px", color: "#c5a46d", fontWeight: "bold" }}>
              Our Values
            </span>
            <h2 className="mt-2 fw-normal" style={{ fontSize: "2rem", letterSpacing: "1px" }}>
              Why Build Your Career at HMH?
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-white p-4 h-100 shadow-sm" style={{ borderTop: "3px solid #c5a46d" }}>
                <div className="mb-3" style={{ color: "#c5a46d", fontSize: "28px" }}>✦</div>
                <h5 className="fw-bold mb-2" style={{ fontSize: "16px", letterSpacing: "0.5px" }}>Growth & Mentorship</h5>
                <p className="mb-0 text-muted" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  Continuous professional development, leadership seminars, and career pathways across our multi-property network.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-white p-4 h-100 shadow-sm" style={{ borderTop: "3px solid #c5a46d" }}>
                <div className="mb-3" style={{ color: "#c5a46d", fontSize: "28px" }}>❖</div>
                <h5 className="fw-bold mb-2" style={{ fontSize: "16px", letterSpacing: "0.5px" }}>Inclusive Culture</h5>
                <p className="mb-0 text-muted" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  A harmonious, multicultural work environment welcoming over 30 nationalities with dignity, equality, and mutual respect.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-white p-4 h-100 shadow-sm" style={{ borderTop: "3px solid #c5a46d" }}>
                <div className="mb-3" style={{ color: "#c5a46d", fontSize: "28px" }}>★</div>
                <h5 className="fw-bold mb-2" style={{ fontSize: "16px", letterSpacing: "0.5px" }}>Excellence & Rewards</h5>
                <p className="mb-0 text-muted" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  Competitive compensation packages, performance recognitions, wellness benefits, and exclusive hotel stay privileges.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-white p-4 h-100 shadow-sm" style={{ borderTop: "3px solid #c5a46d" }}>
                <div className="mb-3" style={{ color: "#c5a46d", fontSize: "28px" }}>◈</div>
                <h5 className="fw-bold mb-2" style={{ fontSize: "16px", letterSpacing: "0.5px" }}>Dynamic Brands</h5>
                <p className="mb-0 text-muted" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  Experience diverse segments of hospitality ranging from luxury resort sanctuaries to vibrant urban lifestyle hotels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRENT JOB OPENINGS */}
      <section className="py-5" id="openings" style={{ backgroundColor: "#ffffff" }}>
        <div className="container py-4">
          <div className="text-center mb-4">
            <span className="text-uppercase" style={{ letterSpacing: "3px", fontSize: "12px", color: "#c5a46d", fontWeight: "bold" }}>
              Explore Roles
            </span>
            <h2 className="mt-2 fw-normal" style={{ fontSize: "2.2rem", letterSpacing: "1px" }}>
              Current Opportunities
            </h2>
            <p className="text-muted mt-2" style={{ fontSize: "15px" }}>
              Discover open positions across our corporate offices and hotel properties.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`btn btn-sm px-3 py-2 rounded-0 text-uppercase ${
                  selectedDept === dept ? "btn-dark" : "btn-outline-secondary"
                }`}
                style={{
                  fontSize: "12px",
                  letterSpacing: "1px",
                  borderColor: selectedDept === dept ? "#222" : "#ddd",
                  backgroundColor: selectedDept === dept ? "#222" : "transparent"
                }}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job List Cards */}
          <div className="row g-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border rounded-0 p-4 shadow-sm position-relative d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: "11px", fontWeight: "500" }}>
                        {job.department}
                      </span>
                      <span className="text-muted" style={{ fontSize: "12px" }}>
                        {job.type}
                      </span>
                    </div>
                    <h5 className="card-title fw-bold mb-2" style={{ fontSize: "17px", color: "#222" }}>
                      {job.title}
                    </h5>
                    <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
                      <i className="fas fa-map-marker-alt me-1 text-secondary"></i> {job.location}
                    </p>
                    <p className="card-text text-secondary mb-4" style={{ fontSize: "13.5px", lineHeight: "1.7" }}>
                      {job.description}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedJob(job)}
                      className="btn btn-outline-dark w-100 rounded-0 text-uppercase py-2"
                      style={{ fontSize: "12px", letterSpacing: "1.5px", fontWeight: "600" }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* General Application Banner */}
          <div className="mt-5 p-4 p-md-5 text-center text-md-start d-flex flex-column flex-md-row align-items-center justify-content-between" style={{ backgroundColor: "#f8f6f2", border: "1px solid #eae5dc" }}>
            <div className="mb-3 mb-md-0">
              <h4 className="fw-bold mb-1" style={{ color: "#222" }}>Don't see a suitable role?</h4>
              <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                Send your spontaneous CV to our talent acquisition team at <strong className="text-dark">careers@hmhhotelgroup.com</strong>.
              </p>
            </div>
            <a
              href="mailto:careers@hmhhotelgroup.com?subject=Spontaneous%20Job%20Application%20-%20HMH"
              className="btn btn-dark rounded-0 px-4 py-2 text-uppercase text-nowrap"
              style={{ fontSize: "12px", letterSpacing: "1px", backgroundColor: "#c5a46d", borderColor: "#c5a46d" }}
            >
              Send Your CV
            </a>
          </div>
        </div>
      </section>

      {/* 5. APPLY MODAL */}
      {selectedJob && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ backgroundColor: "rgba(0,0,0,0.65)", zIndex: 1050 }}
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white p-4 p-md-5 position-relative shadow-lg"
            style={{ maxWidth: "550px", width: "100%", borderRadius: "4px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={() => setSelectedJob(null)}
            ></button>

            {applicationSubmitted ? (
              <div className="text-center py-4">
                <div style={{ fontSize: "42px", color: "#28a745" }}>✓</div>
                <h4 className="mt-3 fw-bold">Application Received!</h4>
                <p className="text-muted mt-2">
                  Thank you for your interest in joining HMH. Our talent acquisition team will review your application for <strong>{selectedJob.title}</strong> and contact you soon.
                </p>
              </div>
            ) : (
              <>
                <span className="text-uppercase" style={{ letterSpacing: "2px", fontSize: "11px", color: "#c5a46d", fontWeight: "bold" }}>
                  Application Form
                </span>
                <h4 className="fw-bold mt-1 mb-2">{selectedJob.title}</h4>
                <p className="text-muted mb-4" style={{ fontSize: "13px" }}>
                  {selectedJob.department} &bull; {selectedJob.location}
                </p>

                <form onSubmit={handleApply}>
                  <div className="mb-3">
                    <label className="form-label text-uppercase" style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: "600" }}>Full Name *</label>
                    <input type="text" className="form-control rounded-0" placeholder="John Doe" required style={{ fontSize: "14px" }} />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label text-uppercase" style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: "600" }}>Email *</label>
                      <input type="email" className="form-control rounded-0" placeholder="name@example.com" required style={{ fontSize: "14px" }} />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-uppercase" style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: "600" }}>Phone *</label>
                      <input type="tel" className="form-control rounded-0" placeholder="+971 50 000 0000" required style={{ fontSize: "14px" }} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-uppercase" style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: "600" }}>LinkedIn Profile / CV Link</label>
                    <input type="url" className="form-control rounded-0" placeholder="https://linkedin.com/in/..." style={{ fontSize: "14px" }} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-uppercase" style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: "600" }}>Message / Cover Note</label>
                    <textarea className="form-control rounded-0" rows={3} placeholder="Briefly describe your experience..." style={{ fontSize: "14px" }}></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark w-100 rounded-0 text-uppercase py-2"
                    style={{ fontSize: "13px", letterSpacing: "1px", backgroundColor: "#c5a46d", borderColor: "#c5a46d" }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <ConditionalFooter />
    </main>
  );
}

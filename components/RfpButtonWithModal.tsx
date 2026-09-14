"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const DEFAULT_HOTELS = [
    'Bahi Ajman Palace Hotel',
    'Coral Beach Resort Sharjah',
    'Coral Dubai Deira Hotel',
    'Coral Jubail Hotel',
    'Corp Executive Hotel Amman',
    'ECOS Dubai Hotel Al Furjan'
];

function normalizeEventType(type?: string): string {
    if (!type) return '';
    const lower = type.toLowerCase();
    if (lower.includes('wedding')) return 'Weddings & Celebrations';
    if (lower.includes('corp') || lower.includes('meeting')) return 'Corporate Meetings';
    if (lower.includes('cater')) return 'Outside Catering';
    if (lower.includes('conference')) return 'Conference Facilities';
    if (lower.includes('banquet') || lower.includes('event')) return 'Events & Banquets';
    return type;
}

export interface RfpProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotelName?: string;
    eventType?: string;
    availableHotels?: string[];
}

export function RfpProposalModal({
    isOpen,
    onClose,
    hotelName = '',
    eventType = '',
    availableHotels = DEFAULT_HOTELS
}: RfpProposalModalProps) {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        hotel: hotelName,
        eventType: normalizeEventType(eventType),
        date: '',
        guests: '',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Synchronize initial pre-selections when opened
    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                hotel: hotelName || prev.hotel,
                eventType: normalizeEventType(eventType) || prev.eventType
            }));
            setSubmitted(false);
        }
    }, [isOpen, hotelName, eventType]);

    // Keyboard Escape to close
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
        }, 3500);
    };

    if (!isOpen || !mounted) return null;

    // Combine available hotels ensuring hotelName is always in the list
    const hotelOptions = [...availableHotels];
    if (hotelName && !hotelOptions.includes(hotelName)) {
        hotelOptions.unshift(hotelName);
    }

    const modalContent = (
        <div
            className="me-modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 999999,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backdropFilter: 'blur(4px)'
            }}
        >
            <link rel="stylesheet" href="/css/meetings.css" />
            
            <div
                className="me-modal-box"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#ffffff',
                    width: '100%',
                    maxWidth: '780px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    borderRadius: '6px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'rfpModalPop 0.25s ease-out'
                }}
            >
                <button
                    type="button"
                    className="me-modal-close-btn"
                    onClick={onClose}
                    aria-label="Close Proposal Modal"
                >
                    &times;
                </button>

                <div className="me-modal-header">
                    <div className="me-modal-subtitle">Hospitality Management Holding</div>
                    <h3 className="me-modal-title">Request for Proposal</h3>
                </div>

                <div className="me-modal-body">
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: '#eafaf1',
                                    color: '#27ae60',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 18px auto',
                                    fontSize: '28px',
                                }}
                            >
                                &#10003;
                            </div>
                            <h4 style={{ fontSize: '22px', color: '#093266', fontWeight: 600, marginBottom: '10px' }}>
                                Thank You!
                            </h4>
                            <p style={{ color: '#666666', fontSize: '14.5px', lineHeight: '1.6' }}>
                                Your event proposal request for <strong>{formData.hotel || 'HMH Hotels'}</strong> has been received. Our dedicated event planning specialist will contact you with a tailored package shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Your Name *</label>
                                        <input
                                            type="text"
                                            className="me-form-input"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            className="me-form-input"
                                            placeholder="name@company.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className="me-form-input"
                                            placeholder="+971 50 000 0000"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Preferred Hotel</label>
                                        <select
                                            className="me-form-input"
                                            value={formData.hotel}
                                            onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                        >
                                            <option value="">Any Hotel / Flexible</option>
                                            {hotelOptions.map((h, i) => (
                                                <option key={i} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Event Type</label>
                                        <select
                                            className="me-form-input"
                                            value={formData.eventType}
                                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                        >
                                            <option value="">Select Event Type</option>
                                            <option value="Corporate Meetings">Corporate Meetings</option>
                                            <option value="Weddings & Celebrations">Weddings &amp; Celebrations</option>
                                            <option value="Events & Banquets">Events &amp; Banquets</option>
                                            <option value="Outside Catering">Outside Catering</option>
                                            <option value="Conference Facilities">Conference Facilities</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Estimated Guests</label>
                                        <input
                                            type="number"
                                            className="me-form-input"
                                            placeholder="e.g. 50, 200"
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="me-form-group">
                                        <label className="me-form-label">Event Requirements &amp; Notes</label>
                                        <textarea
                                            className="me-form-input"
                                            rows={3}
                                            placeholder="Preferred dates, seating setup, catering preferences, audiovisual requirements..."
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button type="submit" className="me-form-submit-btn">
                                        Submit Proposal Request
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes rfpModalPop {
                    from {
                        opacity: 0;
                        transform: scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default function RfpButtonWithModal({
    hotelName = '',
    eventType = '',
    buttonText = 'REQUEST FOR PROPOSAL',
    className = 'btn text-white w-100 py-3 rounded-0 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2',
    style = { backgroundColor: '#b89855', letterSpacing: '2px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }
}: {
    hotelName?: string;
    eventType?: string;
    buttonText?: string;
    className?: string;
    style?: React.CSSProperties;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={className}
                style={style}
                onClick={() => setIsOpen(true)}
            >
                <span>{buttonText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>

            <RfpProposalModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                hotelName={hotelName}
                eventType={eventType}
            />
        </>
    );
}
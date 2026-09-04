"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OurBrandsBar from '@/components/OurBrandsBar';
import Link from 'next/link';
import { getPageData } from '@/services/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

function resolveImageUrl(img: string | undefined | null): string {
    if (!img) return '';
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    const clean = img.replace(/^\/?(storage\/|uploads\/)?/, '');
    return `${API_BASE}/uploads/${clean}`;
}

const defaultTeamList = [
    {
        name: 'Haytham Abdelaziz',
        position: 'Chief Operating Officer (COO)',
        image: 'team_haytham_abdelaziz.jpg',
        description: '<p>Haytham Abdelaziz serves as the Chief Operating Officer (COO) of Hospitality Management Holding (HMH). He joined HMH in May 2019 as the Director of Operations. Since 2014, Mr. Abdelaziz has been an integral part of the team, initially serving as the General Manager for Coral Dubai Deira Hotel.</p><p>With over two decades of experience in the hospitality industry, Mr. Abdelaziz has developed a deep understanding of operations and asset management across the UAE, Egypt, KSA, and Oman. In his current role, he oversees the group’s operations, ensuring brand growth, operational excellence, and maximizing returns for property owners.</p>',
    },
    {
        name: 'Ashish Sharma',
        position: 'Director of Revenue & Distribution',
        image: 'team_ashish_sharma.jpg',
        description: '<p>Ashish Sharma has 22 years of hospitality experience in the Middle East and is currently the Director of Revenue and Distribution at Hospitality Management Holding (HMH). With an extensive background working with globally recognized brands such as Taj Hotels & Resorts, IHG, and Marriott International, Ashish brings deep market knowledge of India, Indian Ocean, UAE, and other GCC regions.</p><p>In his role at HMH, Ashish oversees all the Revenue Management and distribution functions throughout the portfolio, working closely with the hotel teams to optimize Rooms Revenue, reservations, and distribution through well-defined processes and effective execution.</p>',
    },
    {
        name: 'Mustafa Osrof',
        position: 'Director of Information Technology',
        image: 'team_mustafa_osrof.jpg',
        description: '<p>Mustafa Osrof has over 11 years of experience working for travel and hospitality industry leaders. Before joining HMH, he served as Regional IT Service Operations Manager for Premier Inn Hotels Middle East and Head of IT at Jordan Projects for Tourism Development (JPTD), managing IT for Radisson BLU Talabay Resort - Aqaba, Oryx Hotel, and associated properties.</p><p>Osrof holds a Bachelor’s degree in Software engineering and a diploma in information technology. At HMH, he is responsible for the Group IT function, system security, telecommunications, service delivery, infrastructure management, business continuity, and disaster recovery planning.</p>',
    },
    {
        name: 'Dawood Abdalla',
        position: 'Director of Special Projects',
        image: 'team_dawood_abdalla.jpg',
        description: '<p>Dawood Abdalla’s business development proficiency involves identifying projects and partnerships for hotel management of new hotels and expanding the footprint of Hospitality Management Holding (HMH) managed properties.</p><p>With a degree in Business Management and a master’s degree in Sales and Marketing, Abdalla is gifted at building and maintaining relationships with property owners, conducting due diligence for new hotel management projects, ensuring compliance with brand standards, and finalizing hotel management agreements.</p>',
    },
    {
        name: 'Leah Virtucio Bolaños',
        position: 'Quality Assurance and EHS Manager',
        image: 'team_leah_bolanos.jpg',
        description: '<p>Leah Virtucio Bolaños is a certified Environment, Health & Safety (EHS) expert with an excellent track record of managing compliance with local, state, and federal safety, health, and environmental regulations to deliver the highest standards in food safety and quality.</p><p>Drawing upon 20 years of international experience at all stages of the food chain, she joined HMH in 2014 as Cluster EHS Manager, with previous roles at Ritz Carlton, Iberotel, and Emirates Flight Catering. She holds a Bachelor of Science in Food Technology, is an ISO 22000:2018 lead auditor, certified trainer of HACCP Awareness and L3, and master trainer for GHP. At HMH, Bolaños leads the ‘Be Green, Go Green’ initiative and oversees food safety and EHS protocols.</p>',
    },
    {
        name: 'Adnan Solanki',
        position: 'Marketing Manager',
        image: 'team_adnan_solanki.jpg',
        description: '<p>With nearly two decades of experience in advertising and marketing, Adnan Solanki has partnered with diverse brands across industries. His expertise spans market research, trend analysis, customer insights, marketing strategy development, content creation, social media management, branding, marketing plans, budgeting, and organizational efficiency.</p><p>As Marketing Manager at Faisal Holding Group, Adnan led marketing initiatives for all subsidiary companies. Before this, he served in Senior Client Servicing at Market Projection Company (MPJ). Currently, Adnan heads the Marketing department at HMH, overseeing brand identity and digital marketing strategies for the hotel group and managed properties to drive website traffic, increase direct bookings, and enhance brand visibility.</p>',
    },
    {
        name: 'Ann Mascarenhas',
        position: 'Office Manager',
        image: 'team_ann_mascarenhas.jpg',
        description: '<p>Ann Mascarenhas is a highly experienced and valued member of the Hospitality Management Holding (HMH) team, bringing over 20 years of expertise in the hospitality and financial sectors. Since joining the company in December 2003, she has played a crucial role in its operations.</p><p>With a Bachelor’s degree in Commerce with Accountancy from Mumbai University, Ann works closely with top management, ensuring coordination and smooth administrative functioning across all levels of the organization, and facilitating effective communication and collaboration with the Board of Directors.</p>',
    },
    {
        name: 'Iftikhar Hamdani',
        position: 'Area General Manager for the Northern Emirates',
        image: 'team_iftikhar_hamdani.jpg',
        description: '<p>Iftikhar Hamdani has more than 27 years of invaluable experience in the Hospitality Industry and is responsible for managing the Faisal Holding Hotels across the Northern Emirates in the UAE.</p><p>Hamdani has worked with international hospitality brands like InterContinental, Ambassador, and Wyndham in management positions, with an excellent track record of driving profitability through strategic growth.</p>',
    },
    {
        name: 'Ahmad Ebdah',
        position: 'Cluster General Manager',
        image: 'team_ahmad_ebdah.jpg',
        description: '<p>Ahmad Ebdah is a passionate Hotelier with over 25 years of experience in the hospitality industry, having worked with leading brands such as Accor, Kempinski Hotels, and Intercontinental Hotel Group.</p><p>Ebdah excels in managing and growing sales and marketing strategies, targeting new market segments, and forming high-performing teams. He was awarded the Nobel Laureate at SOFEX in Amman for his key role in FIFA 2016 and planning the Cluster Sales and Marketing Office of IHG Jordan.</p>',
    },
    {
        name: 'Mohamed Fouad',
        position: 'General Manager',
        image: 'team_mohamed_fouad.jpg',
        description: '<p>Mohamed Fouad, a highly accomplished Hotel Manager, has been an asset to Hospitality Management Holding (HMH). With more than 25 years of experience in the hospitality industry, Mohamed has consistently demonstrated exceptional leadership skills and a keen eye for detail.</p><p>His background in commercial sales and revenue management, coupled with his expertise as a hotel manager, has contributed to his remarkable success throughout his career across Starwood Hotels & Resorts, Renaissance Hotel, Pullman Zamzam Makkah, and Al Marwa Rayhaan Rotana Makkah.</p>',
    },
    {
        name: 'Rafat Gotta',
        position: 'Cluster General Manager',
        image: 'team_rafat_gotta.jpg',
        description: '<p>Rafat Gotta holds diverse experience in the hospitality industry for over 18 years, having held senior positions across the MENA region with leading hotel brands such as Marriott, Crowne Plaza, and Holiday Inn Express.</p><p>During his tenure, Gotta has received several awards and certifications related to brand standard audits, excellence, sell-out efficiency, employee relationships, and best-valued hotel. Armed with a Bachelor’s degree in Hotel Management, he is skilled in project management, team motivation, customer management, and budget forecasting.</p>',
    },
    {
        name: 'Jan Siddiqui',
        position: 'General Manager',
        image: 'team_jan_siddiqui.jpg',
        description: '<p>Jan Siddiqui enjoys more than 3 decades of experience dedicated to sales functions in the hospitality industry. Siddiqui has successfully contributed to the launch and rebranding of hotels for international brands like Marriott, Hyatt International, ACCOR, IHG, and Wyndham in the region.</p><p>Siddiqui has sound knowledge of contractual agreements, legal processes, and revenue maximization strategies. His notable achievements include exceeding Gross Operating Profit (GOP) expectations and contributing to the successful pre-opening of the largest Holiday Inn Express at Dubai Airport for IHG Group.</p>',
    },
];

export default function BoardOfDirectorsAndTeamPage() {
    const [pageData, setPageData] = useState<any>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [expandedMembers, setExpandedMembers] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const load = async () => {
            const data = await getPageData('board-of-directors-and-team');
            if (data) {
                setPageData(data);
            }
        };
        load();
    }, []);

    const body = pageData?.body || {};
    const bannerSlides = Array.isArray(body.banner_slides) && body.banner_slides.length > 0
        ? body.banner_slides
        : [
            { image: 'team_banner_1.jpg', title: 'Board Of Directors & Executives', subtitle: '' },
            { image: 'team_banner_2.jpg', title: 'Board Of Directors & Executives', subtitle: '' },
            { image: 'team_banner_3.jpg', title: 'Board Of Directors & Executives', subtitle: '' },
        ];

    useEffect(() => {
        if (bannerSlides.length <= 1) return;
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerSlides.length]);

    const prevSlide = () => {
        setActiveSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    };

    const toggleMember = (idx: number) => {
        setExpandedMembers((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    const introSubtitle = body.intro_subtitle || 'HMH Hospitality Management Holding';
    const introTitle = body.intro_title || 'Board of Directors & Leadership Team';
    const introText = body.intro_text ||
        'Meet the leadership team and board of directors at Hospitality Management Holding (HMH), steering excellence, innovation, and strategic growth across the MENA region.';

    const teamList = Array.isArray(body.team_members_list) && body.team_members_list.length > 0
        ? body.team_members_list
        : defaultTeamList;

    const currentSlide = bannerSlides[activeSlide] || bannerSlides[0];
    const pageTitle = (typeof pageData?.title === 'object' ? pageData?.title?.en : pageData?.title) || currentSlide?.title || 'Board of Directors and Team';

    return (
        <main>
            <link rel="stylesheet" href="/css/about.css" />

            {/* ================= HERO BANNER ================= */}
            <header className="about-hero-section">
                <div className="about-hero-slider">
                    {bannerSlides.map((slide: any, idx: number) => {
                        const bgUrl = resolveImageUrl(slide.image);
                        return (
                            <div
                                key={idx}
                                className={`about-hero-slide ${idx === activeSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url('${bgUrl}')` }}
                            />
                        );
                    })}
                </div>

                <div className="about-hero-overlay"></div>

                {/* Main Header / Nav */}
                <Header />

                {/* Hero Title Content */}
                <div className="about-hero-content">
                    {currentSlide?.subtitle && (
                        <div className="about-hero-subtitle">{currentSlide.subtitle}</div>
                    )}
                    <h1 className="about-hero-title">{currentSlide?.title || pageTitle}</h1>
                </div>

                {/* Arrows */}
                {bannerSlides.length > 1 && (
                    <>
                        <button className="about-hero-arrow about-hero-prev" onClick={prevSlide} aria-label="Previous Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button className="about-hero-arrow about-hero-next" onClick={nextSlide} aria-label="Next Slide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="about-hero-dots">
                            {bannerSlides.map((_: any, idx: number) => (
                                <button
                                    key={idx}
                                    className={`about-hero-dot ${idx === activeSlide ? 'active' : ''}`}
                                    onClick={() => setActiveSlide(idx)}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </header>

            {/* ================= TERTIARY SUBNAV ================= */}
            <nav className="about-subnav" aria-label="About Us Navigation">
                <div className="container">
                    <ul className="about-subnav-list">
                        <li>
                            <Link href="/about" className="about-subnav-link">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/corporate-responsibility" className="about-subnav-link">
                                Corporate Responsibility
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/our-partners" className="about-subnav-link">
                                Our Partners
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/board-of-directors-and-team" className="about-subnav-link active">
                                Board of Directors and Team
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/our-history" className="about-subnav-link">
                                Our History
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* ================= INTRO BLOCK ================= */}
            <section className="about-intro-section" id="intro">
                <div className="container">
                    {introSubtitle && <div className="about-intro-subtitle">{introSubtitle}</div>}
                    <h2 className="about-intro-title">{introTitle}</h2>
                    <p className="about-intro-text">{introText}</p>
                </div>
            </section>

            {/* ================= TEAM MEMBERS LIST ================= */}
            <section className="about-team-section">
                <div className="container">
                    <div className="about-team-grid">
                        {teamList.map((member: any, idx: number) => {
                            const isExpanded = !!expandedMembers[idx];
                            return (
                                <div key={idx} className="about-team-card">
                                    <div className="about-team-header">
                                        <div className="about-team-avatar-wrap">
                                            {member.image ? (
                                                <img
                                                    src={resolveImageUrl(member.image)}
                                                    alt={member.name || 'Team Member'}
                                                    className="about-team-avatar"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="about-team-avatar-placeholder">
                                                    {(member.name || 'H').charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="about-team-titles">
                                            <h3 className="about-team-name">{member.name}</h3>
                                            {member.position && (
                                                <div className="about-team-position">{member.position}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="about-team-body">
                                        <div
                                            className={`about-team-desc ${isExpanded ? 'expanded' : 'collapsed'}`}
                                            dangerouslySetInnerHTML={{ __html: member.description || '' }}
                                        />
                                        {member.description && member.description.length > 200 && (
                                            <button
                                                type="button"
                                                className="about-team-toggle-btn"
                                                onClick={() => toggleMember(idx)}
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        Read Less
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="18 15 12 9 6 15"></polyline>
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        Read More
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= OUR BRANDS BAR ================= */}
            <OurBrandsBar />
        </main>
    );
}
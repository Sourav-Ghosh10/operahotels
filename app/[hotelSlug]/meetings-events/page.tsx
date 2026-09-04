"use client";

import React, { useEffect, useState, use } from 'react';
import MeetingsEventsClient from '@/components/MeetingsEventsClient';
import { getPropertyBySlug, getMeetingsEventsByProperty } from '@/services/api';

export default function DynamicMeetingsEventsPage({ params }: { params: Promise<{ hotelSlug: string }> }) {
    const { hotelSlug } = use(params);
    const [propertyData, setPropertyData] = useState<any>(null);
    const [meetingsData, setMeetingsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getPropertyBySlug(hotelSlug),
            getMeetingsEventsByProperty(hotelSlug)
        ])
            .then(([propData, meetData]) => {
                setPropertyData(propData);
                setMeetingsData(meetData);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching meetings data:", err);
                setLoading(false);
            });
    }, [hotelSlug]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    const mainPage = meetingsData?.main_page;
    const eventSpaces = meetingsData?.event_spaces || [];

    // Map banner slides to heroImages array
    const heroImages = mainPage?.banner_slides?.length > 0
        ? mainPage.banner_slides.map((slide: any) => typeof slide === 'string' ? slide : slide.image).filter(Boolean)
        : (propertyData?.banner_images?.length > 0 ? propertyData.banner_images : undefined);

    // Map event spaces to cards array expected by MeetingsEventsClient
    const cards = eventSpaces.map((space: any) => ({
        id: String(space.id),
        title: space.title || space.subtitle || 'VENUE',
        subtitle: space.subtitle || space.hotel_name || propertyData?.name || '',
        description: space.description || space.details_content || '',
        image: space.image || (space.gallery && space.gallery[0]) || '',
        hotel: space.hotel_name || propertyData?.name || 'Hotel',
        type: space.type ? space.type.replace('_', ' ').toUpperCase() : 'EVENTS',
        slug: space.slug,
        rfp_url: space.rfp_url,
        contact_details: space.contact_details
    }));

    return (
        <MeetingsEventsClient
            brandName={propertyData?.name || meetingsData?.property?.name || 'HOTEL'}
            logo={propertyData?.logo || meetingsData?.property?.logo}
            footerLogo={propertyData?.footer_logo || propertyData?.logo || meetingsData?.property?.logo}
            heroImages={heroImages}
            cards={cards}
            mainTitle={mainPage?.title}
            mainSubtitle={mainPage?.subtitle}
            mainDescription={mainPage?.description}
            rfpUrl={mainPage?.rfp_url}
            hotelSlug={hotelSlug}
        />
    );
}

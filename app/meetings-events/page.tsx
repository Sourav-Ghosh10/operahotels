import React from 'react';
import MeetingsEventsClient from '@/components/MeetingsEventsClient';
import { getPropertyBySlug, getMeetingsEventsByProperty } from '@/services/api';

export const metadata = {
    title: 'Meetings & Events | Hospitality Management Holding',
    description: 'Host successful meetings and events at our business hotels and luxury resorts.',
};

export default async function GeneralMeetingsEventsPage() {
    const [brandData, meetingsData] = await Promise.all([
        getPropertyBySlug('bahi-hotels-resorts'),
        getMeetingsEventsByProperty('bahi-hotels-resorts')
    ]);

    const mainPage = meetingsData?.main_page;
    const eventSpaces = meetingsData?.event_spaces || [];

    // Map hero images
    const heroImages = mainPage?.banner_slides?.length > 0
        ? mainPage.banner_slides.map((slide: any) => typeof slide === 'string' ? slide : slide.image).filter(Boolean)
        : (brandData?.banner_images?.length > 0 ? brandData.banner_images : undefined);

    // Map cards
    const cards = eventSpaces.map((space: any) => ({
        id: String(space.id),
        title: space.title || space.subtitle || 'VENUE',
        subtitle: space.subtitle || space.hotel_name || brandData?.name || '',
        description: space.description || space.details_content || '',
        image: space.image || (space.gallery && space.gallery[0]) || '',
        hotel: space.hotel_name || brandData?.name || 'Bahi Ajman Palace Hotel',
        type: space.type ? space.type.replace('_', ' ').toUpperCase() : 'EVENTS',
        slug: space.slug,
        rfp_url: space.rfp_url,
        contact_details: space.contact_details
    }));

    return (
        <MeetingsEventsClient 
            brandName={brandData?.name || meetingsData?.property?.name || "HOSPITALITY MANAGEMENT HOLDING"}
            logo={brandData?.logo || meetingsData?.property?.logo}
            footerLogo={brandData?.footer_logo || brandData?.logo || meetingsData?.property?.logo}
            heroImages={heroImages}
            cards={cards}
            mainTitle={mainPage?.title || "MEETINGS & EVENTS"}
            mainSubtitle={mainPage?.subtitle || "HOST SUCCESSFUL MEETINGS AND EVENTS"}
            mainDescription={mainPage?.description || "From private meeting spaces to dining venues on the shores of stunning seas, our modern, high-tech conference and event facilities are complemented by exceptional culinary and technical services."}
            rfpUrl={mainPage?.rfp_url}
            hotelSlug="bahi-hotels-resorts"
        />
    );
}

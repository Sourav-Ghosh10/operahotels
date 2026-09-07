"use client";

import React, { use } from 'react';
import DiningDetailsPage from '@/components/DiningDetailsPage';

export default function HotelDiningDetailsPage({ 
    params 
}: { 
    params: Promise<{ hotelSlug: string; diningSlug: string }> 
}) {
    const { hotelSlug, diningSlug } = use(params);
    return <DiningDetailsPage hotelSlug={hotelSlug} diningSlug={diningSlug} />;
}

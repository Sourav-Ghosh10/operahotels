"use client";

import React, { use } from 'react';
import RoomDetailsPage from '@/components/RoomDetailsPage';

export default function HotelRoomDetailsPage({ 
    params 
}: { 
    params: Promise<{ hotelSlug: string; roomSlug: string }> 
}) {
    const { hotelSlug, roomSlug } = use(params);
    return <RoomDetailsPage hotelSlug={hotelSlug} roomSlug={roomSlug} />;
}

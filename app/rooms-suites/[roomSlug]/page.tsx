"use client";

import React, { use } from 'react';
import RoomDetailsPage from '@/components/RoomDetailsPage';

export default function DirectRoomDetailsPage({ 
    params 
}: { 
    params: Promise<{ roomSlug: string }> 
}) {
    const { roomSlug } = use(params);
    return <RoomDetailsPage hotelSlug="bahi-ajman-palace-hotel" roomSlug={roomSlug} />;
}

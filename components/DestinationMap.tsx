'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BrandHotelMap = dynamic(() => import('@/components/BrandHotelMap'), { ssr: false });

interface DestinationMapProps {
    hotels: any[];
    brandName: string;
    contactUrl?: string;
    sectionTitle?: string;
}

export default function DestinationMap({
    hotels,
    brandName,
    contactUrl = '/contact',
    sectionTitle = 'WHERE WE ARE',
}: DestinationMapProps) {
    if (!hotels || hotels.length === 0) return null;

    return (
        <BrandHotelMap
            hotels={hotels}
            brandName={brandName}
            contactUrl={contactUrl}
            sectionTitle={sectionTitle}
        />
    );
}

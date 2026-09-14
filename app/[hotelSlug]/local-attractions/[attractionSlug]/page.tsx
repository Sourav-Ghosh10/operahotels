'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import AttractionDetailsPage from '@/components/AttractionDetailsPage';

export default function LocalAttractionSlugPage() {
  const params = useParams();
  const hotelSlug = params?.hotelSlug as string;
  const attractionSlug = params?.attractionSlug as string;

  if (!hotelSlug || !attractionSlug) return null;

  return <AttractionDetailsPage hotelSlug={hotelSlug} attractionSlug={attractionSlug} />;
}

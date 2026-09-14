'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyDetails } from '@/services/api';

export default function LocalAttractionsRootPage() {
  const params = useParams();
  const router = useRouter();
  const hotelSlug = params?.hotelSlug as string;

  useEffect(() => {
    if (!hotelSlug) return;
    getPropertyDetails(hotelSlug)
      .then((data) => {
        const firstAttr = data?.attractions?.[0];
        if (firstAttr?.slug) {
          router.replace(`/${hotelSlug}/local-attractions/${firstAttr.slug}`);
        } else if (firstAttr?.id) {
          router.replace(`/${hotelSlug}/local-attractions/${firstAttr.id}`);
        } else {
          router.replace(`/${hotelSlug}/local-attractions/noor-island`);
        }
      })
      .catch(() => {
        router.replace(`/${hotelSlug}/local-attractions/noor-island`);
      });
  }, [hotelSlug, router]);

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

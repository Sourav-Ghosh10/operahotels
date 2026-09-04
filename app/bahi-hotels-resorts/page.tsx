import React from 'react';
import BrandPage from '@/components/BrandPage';
import { getPropertyBySlug, getBrandsData } from '@/services/api';

export const metadata = {
  title: 'Bahi Hotels & Resorts | Opera Hotels',
  description: 'Discover Bahi Hotels & Resorts – luxury hospitality experiences.',
};

export default async function BahiHotelsPage() {
  const [brandData, brandsData] = await Promise.all([
    getPropertyBySlug('bahi-hotels-resorts'),
    getBrandsData()
  ]);

  if (!brandData) {
    return <div className="text-center py-5"><h2>Brand Not Found</h2></div>;
  }

  return (
    <>
      <link rel="stylesheet" href="/css/brand-dynamic.css" />
      <BrandPage brandData={brandData} brandsData={brandsData} />
    </>
  );
}

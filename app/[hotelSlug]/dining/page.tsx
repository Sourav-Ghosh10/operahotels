"use client";

import React, { use } from "react";
import DiningListingPage from "@/components/DiningListingPage";

export default function HotelDiningPage({
  params,
}: {
  params: Promise<{ hotelSlug: string }>;
}) {
  const { hotelSlug } = use(params);
  return <DiningListingPage hotelSlug={hotelSlug} />;
}
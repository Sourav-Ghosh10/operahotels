"use client";

import React, { use } from "react";
import FacilitiesPage from "@/components/FacilitiesPage";

export default function HotelFacilitiesRoute({
  params,
}: {
  params: Promise<{ hotelSlug: string }>;
}) {
  const { hotelSlug } = use(params);
  return <FacilitiesPage hotelSlug={hotelSlug} />;
}

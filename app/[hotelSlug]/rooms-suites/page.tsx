"use client";

import React, { use } from "react";
import RoomsSuitesPage from "@/components/RoomsSuitesPage";

export default function HotelRoomsSuitesListingPage({
  params,
}: {
  params: Promise<{ hotelSlug: string }>;
}) {
  const { hotelSlug } = use(params);
  return <RoomsSuitesPage hotelSlug={hotelSlug} />;
}

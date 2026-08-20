import React from "react";
import Header from "./Header";
import { fetchDestinations } from "@/lib/api/destinations";

const fallbackDestinations = [
  { id: 1, slug: "dubai", name: "Dubai" },
  { id: 2, slug: "amman", name: "Amman" },
  { id: 3, slug: "sharjah", name: "Sharjah" },
];

export default async function ServerHeader() {
  let destinations: { id: number; slug: string; name: string }[] = [];
  try {
    const data = await fetchDestinations();
    const mapped = data
      .filter((dest) => dest.slug && (dest.name || dest.name_en))
      .map((dest) => ({
        id: dest.id,
        slug: dest.slug,
        name: dest.name || dest.name_en || "",
      }));
    destinations = mapped.length > 0 ? mapped : fallbackDestinations;
  } catch (err) {
    console.error("[ServerHeader] Failed to fetch destinations:", err);
    destinations = fallbackDestinations;
  }

  return <Header initialDestinations={destinations} />;
}

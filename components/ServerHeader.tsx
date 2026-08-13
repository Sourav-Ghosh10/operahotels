import React from "react";
import Header from "./Header";
import { fetchDestinations } from "@/lib/api/destinations";

export default async function ServerHeader() {
  let destinations = [];
  try {
    const data = await fetchDestinations();
    destinations = data
      .filter((dest) => dest.slug && (dest.name || dest.name_en))
      .map((dest) => ({
        id: dest.id,
        slug: dest.slug,
        name: dest.name || dest.name_en || "",
      }));
  } catch (err) {
    console.error("[ServerHeader] Failed to fetch destinations:", err);
  }

  return <Header initialDestinations={destinations} />;
}

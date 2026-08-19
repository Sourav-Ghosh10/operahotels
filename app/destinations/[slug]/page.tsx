import React from "react";
import "../destination-details.css";
import { fetchDestination, fetchDestinations } from "@/lib/api/destinations";
import { notFound } from "next/navigation";
import DestinationDetailClient from "./DestinationDetailClient";

type DestinationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DestinationDetailPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await fetchDestination(slug, "en").catch(() => null);

  if (!destination) {
    notFound();
  }

  let headerDestinations: any[] = [];
  try {
    const data = await fetchDestinations();
    headerDestinations = data
      .filter((dest) => dest.slug && (dest.name || dest.name_en))
      .map((dest) => ({
        id: dest.id,
        slug: dest.slug,
        name: dest.name || dest.name_en || "",
      }));
  } catch (err) {
    console.error("[Header] Failed to fetch header destinations:", err);
  }

  return (
    <DestinationDetailClient 
      initialDestination={destination} 
      slug={slug} 
      headerDestinations={headerDestinations} 
    />
  );
}

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import ZoneUnitCard from "@/components/ZoneUnitCard";
import { zones } from "@/data/zones";
import { places } from "@/data/places";

interface ZonePageProps {
  params: { id: string };
}

const filterChips = [
  { id: "all", label: "All" },
  { id: "open", label: "Open Now" },
  { id: "live", label: "🔴 Live" },
  { id: "trending", label: "🔥 Trending" },
];

export default function ZonePage({ params }: ZonePageProps) {
  const zone = zones.find((z) => z.id === params.id);
  if (!zone) notFound();

  const [activeFilter, setActiveFilter] = useState("all");

  const zonePlaces = places.filter((p) => {
    const inZone = p.zone === zone.id;
    if (!inZone) return false;
    if (activeFilter === "open") return p.isOpenNow;
    if (activeFilter === "live") return p.isLive;
    if (activeFilter === "trending") return p.signalCount > 100;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar variant="back" title={zone.name} />

      {/* Zone hero banner */}
      <div className="relative w-full h-48">
        <Image
          src={zone.photo}
          alt={zone.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 gradient-scrim-strong" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white font-display text-shadow">
            {zone.name}
          </h1>
          <p className="text-sm text-white/70 mt-1">
            {zone.city} · {zone.placeCount} places
            {zone.trending && (
              <span className="ml-2 text-amber font-semibold">🔥 Trending</span>
            )}
          </p>
          <p className="text-xs text-white/50 mt-1">{zone.description}</p>
        </div>
      </div>

      {/* Sticky filter chips */}
      <div className="sticky top-14 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="overflow-x-auto scrollbar-hide px-4 py-2">
          <div className="flex gap-2 min-w-max">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                  activeFilter === chip.id
                    ? "bg-accent/20 text-accent border-accent/50"
                    : "bg-surface text-textMuted hover:text-textPrimary border-border"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-column grid */}
      <div className="max-w-desktop mx-auto px-3 py-4 pb-8">
        {zonePlaces.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-5">
            {zonePlaces.map((place, i) => (
              <ZoneUnitCard key={place.id} place={place} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🏙️</div>
            <p className="text-textSecondary text-sm">No places match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

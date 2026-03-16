"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import ZoneTabs from "@/components/ZoneTabs";
import UnitCard from "@/components/UnitCard";
import { places } from "@/data/places";

const zoneTabs = [
  { id: "all", label: "All" },
  { id: "itaewon", label: "Itaewon" },
  { id: "hongdae", label: "Hongdae" },
  { id: "gangnam", label: "Gangnam" },
  { id: "seongsu", label: "Seongsu" },
  { id: "mapo", label: "Mapo" },
  { id: "ikseon", label: "Ikseon-dong" },
];

const filterChips = [
  { id: "all", label: "All" },
  { id: "open", label: "Open Now" },
  { id: "trending", label: "🔥 Trending" },
  { id: "cafe", label: "☕ Cafés" },
  { id: "food", label: "🍜 Food" },
  { id: "bar", label: "🍺 Bars" },
];

export default function ExplorePage() {
  const [activeZone, setActiveZone] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = places.filter((place) => {
    const zoneMatch = activeZone === "all" || place.zone === activeZone;
    let filterMatch = true;
    if (activeFilter === "open") filterMatch = place.isOpenNow;
    else if (activeFilter === "trending") filterMatch = place.signalCount > 150;
    else if (activeFilter === "cafe") filterMatch = place.category === "Café";
    else if (activeFilter === "food")
      filterMatch = ["Ramen", "Korean BBQ", "Omakase", "Brunch", "Night Market"].includes(
        place.category
      );
    else if (activeFilter === "bar")
      filterMatch = ["Wine Bar", "Rooftop Bar", "Bar", "Traditional Bar"].includes(place.category);
    return zoneMatch && filterMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar variant="back" title="Explore" showFilter />

      {/* Zone tabs + filter chips keep their padding */}
      <ZoneTabs tabs={zoneTabs} activeTab={activeZone} onSelect={setActiveZone} />

      <div className="overflow-x-auto scrollbar-hide px-4 pb-3">
        <div className="flex gap-2 min-w-max">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
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

      {/* Full-bleed grid — no horizontal padding */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-[2px] pb-8">
          {filtered.map((place, i) => (
            <UnitCard key={place.id} place={place} index={i} aspectRatio="portrait" />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-textSecondary text-sm">No places match this filter</p>
        </div>
      )}
    </div>
  );
}

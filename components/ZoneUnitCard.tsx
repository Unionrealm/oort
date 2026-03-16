"use client";

import Link from "next/link";
import Image from "next/image";
import { Place } from "@/data/places";

interface ZoneUnitCardProps {
  place: Place;
  index?: number;
}

export default function ZoneUnitCard({ place, index = 0 }: ZoneUnitCardProps) {
  const staggerClass = index < 10 ? `stagger-${index + 1}` : "stagger-10";

  return (
    <Link href={`/place/${place.id}`} className="block group">
      <div
        className={`relative overflow-hidden rounded-xl aspect-square bg-surface card-hover ${staggerClass}`}
      >
        {/* Image */}
        <Image
          src={place.photo}
          alt={place.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 33vw, 20vw"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 gradient-scrim-strong" />

        {/* Live badge */}
        {place.isLive && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5">
              <span className="live-dot" style={{ width: 6, height: 6 }} />
              <span className="text-[9px] font-bold text-white tracking-wider">LIVE</span>
            </div>
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-xs font-bold text-white text-shadow leading-tight line-clamp-2">
            {place.name}
          </h3>
          <p className="text-[10px] text-white/60 mt-0.5">
            {place.categoryEmoji} {place.category}
          </p>
        </div>
      </div>
    </Link>
  );
}

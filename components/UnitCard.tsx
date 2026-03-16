"use client";

import Link from "next/link";
import Image from "next/image";
import { Place } from "@/data/places";

interface UnitCardProps {
  place: Place;
  index?: number;
  aspectRatio?: "portrait" | "square";
}

function LiveBadge() {
  return (
    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
      <span className="live-dot" />
      <span className="text-[10px] font-bold text-white tracking-widest">LIVE</span>
    </div>
  );
}

export default function UnitCard({ place, index = 0, aspectRatio = "portrait" }: UnitCardProps) {
  const staggerClass = index < 10 ? `stagger-${index + 1}` : "stagger-10";
  const aspectClass = aspectRatio === "portrait" ? "aspect-[4/5]" : "aspect-square";

  return (
    <Link href={`/place/${place.id}`} className="block group">
      <div
        className={`relative overflow-hidden rounded-2xl ${aspectClass} bg-surface card-hover cursor-pointer ${staggerClass}`}
      >
        {/* Image */}
        <Image
          src={place.photo}
          alt={place.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Gradient scrim */}
        <div className="absolute inset-0 gradient-scrim" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {place.isLive && <LiveBadge />}
          <div className="ml-auto">
            <span className="text-[10px] font-medium text-white/70 bg-black/40 backdrop-blur-sm rounded-full px-2 py-0.5">
              {place.signalCount} signals
            </span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-[11px] font-medium text-white/60 bg-white/10 rounded-full px-2 py-0.5 backdrop-blur-sm">
                  {place.zone}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-tight text-shadow truncate">
                {place.name}
              </h3>
              <p className="text-xs text-white/70 mt-0.5 text-shadow">
                {place.categoryEmoji} {place.category}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              {place.isOpenNow ? (
                <span className="text-[10px] text-green-400 font-semibold">Open</span>
              ) : (
                <span className="text-[10px] text-red-400 font-semibold">Closed</span>
              )}
              <span className="text-[10px] text-white/50">⭐ {place.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

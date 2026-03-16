"use client";

import Link from "next/link";
import Image from "next/image";
import { Place } from "@/data/places";

interface UnitCardProps {
  place: Place;
  index?: number;
  aspectRatio?: "portrait" | "square";
}

export default function UnitCard({ place, index = 0, aspectRatio = "portrait" }: UnitCardProps) {
  const staggerClass = index < 10 ? `stagger-${index + 1}` : "stagger-10";
  const aspectClass = aspectRatio === "portrait" ? "aspect-[4/5]" : "aspect-square";

  return (
    <Link href={`/place/${place.id}`} className={`block group relative overflow-hidden ${aspectClass} ${staggerClass} cursor-pointer`}>
      {/* Image fills 100% of cell */}
      <Image
        src={place.photo}
        alt={place.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="50vw"
      />

      {/* Bottom gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Signal count — top right, minimal */}
      {place.signalCount > 0 && (
        <div className="absolute top-2 right-2">
          <span className="text-[9px] font-semibold text-white/60 tabular-nums">
            {place.signalCount}
          </span>
        </div>
      )}

      {/* Text floats over scrim at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-[11px] font-bold text-white leading-tight truncate">
          {place.name}
        </p>
        <p className="text-[10px] text-white/60 mt-0.5 truncate">
          {place.categoryEmoji} {place.category}
        </p>
      </div>
    </Link>
  );
}

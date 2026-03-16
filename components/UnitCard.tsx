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
    <Link href={`/place/${place.id}`} className={`block group relative overflow-hidden rounded-[10px] ${aspectClass} ${staggerClass} cursor-pointer`}>
      {/* Image fills 100% of cell */}
      <Image
        src={place.photo}
        alt={place.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="50vw"
      />

      {/* Bottom gradient scrim — tall enough for comfortable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Text floats over scrim at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3">
        {/* Zone pill */}
        <span className="inline-block text-[10px] font-medium text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5 mb-1.5">
          {place.zone}
        </span>
        <h3 className="text-sm font-bold text-white leading-snug text-shadow truncate">
          {place.name}
        </h3>
        <p className="text-xs text-white/65 mt-0.5 text-shadow truncate">
          {place.categoryEmoji} {place.category}
        </p>
      </div>
    </Link>
  );
}

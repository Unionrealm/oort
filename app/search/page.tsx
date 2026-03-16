"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { places } from "@/data/places";
import { zones } from "@/data/zones";

const recentSearches = ["Cherry blossom café", "Itaewon ramen", "Hongdae bar", "Seongsu brunch"];

const trendingPlaces = places.filter((p) => p.isLive && p.signalCount > 150).slice(0, 4);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.trim()
    ? places.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.zone.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Search header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-desktop mx-auto">
          <button
            onClick={() => router.back()}
            className="text-textSecondary hover:text-textPrimary transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-surface rounded-xl px-3 py-2 border border-border focus-within:border-accent transition-colors">
            <Search size={16} className="text-textMuted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places, neighborhoods..."
              className="flex-1 bg-transparent text-sm text-textPrimary placeholder-textMuted focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="max-w-desktop mx-auto px-4 py-4 pb-8">
        {query.trim() === "" ? (
          <>
            {/* Recent searches */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-textPrimary mb-3">Recent</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 bg-surface border border-border rounded-full text-xs text-textSecondary hover:text-textPrimary hover:border-accent/50 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Zones */}
            <div className="mb-6">
              <h2 className="text-sm font-bold text-textPrimary mb-3">Neighborhoods</h2>
              <div className="grid grid-cols-2 gap-3">
                {zones.map((zone) => (
                  <Link
                    key={zone.id}
                    href={`/zone/${zone.id}`}
                    className="relative h-20 rounded-xl overflow-hidden card-hover block"
                  >
                    <Image
                      src={zone.photo}
                      alt={zone.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 gradient-scrim" />
                    <div className="absolute bottom-2 left-3">
                      <div className="text-sm font-bold text-white text-shadow">{zone.name}</div>
                      <div className="text-[10px] text-white/60">{zone.placeCount} places</div>
                    </div>
                    {zone.trending && (
                      <div className="absolute top-2 right-2 text-[10px] bg-amber/90 text-black font-bold px-2 py-0.5 rounded-full">
                        Trending
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending places */}
            <div>
              <h2 className="text-sm font-bold text-textPrimary mb-3">🔥 Trending Now</h2>
              <div className="space-y-3">
                {trendingPlaces.map((place) => (
                  <Link
                    key={place.id}
                    href={`/place/${place.id}`}
                    className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-border hover:border-accent/50 transition-all"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={place.photo}
                        alt={place.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-textPrimary truncate">{place.name}</h3>
                        {place.isLive && (
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="live-dot" style={{ width: 6, height: 6 }} />
                            <span className="text-[9px] font-bold text-live">LIVE</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-textMuted mt-0.5">
                        <MapPin size={10} />
                        <span>{place.zone} · {place.categoryEmoji} {place.category}</span>
                      </div>
                      <div className="text-[10px] text-textMuted mt-1">{place.signalCount} signals</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-textMuted">{results.length} results for &ldquo;{query}&rdquo;</p>
            {results.map((place) => (
              <Link
                key={place.id}
                href={`/place/${place.id}`}
                className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-border hover:border-accent/50 transition-all"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={place.photo}
                    alt={place.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-textPrimary truncate">{place.name}</h3>
                    {place.isLive && (
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="live-dot" style={{ width: 6, height: 6 }} />
                        <span className="text-[9px] font-bold text-live">LIVE</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-textMuted mt-0.5">
                    <MapPin size={10} />
                    <span>{place.zone} · {place.categoryEmoji} {place.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-textMuted">{place.signalCount} signals</span>
                    <span className="text-[10px] text-textMuted">⭐ {place.rating}</span>
                    {place.isOpenNow ? (
                      <span className="text-[10px] text-green-400">Open</span>
                    ) : (
                      <span className="text-[10px] text-red-400">Closed</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
            {results.length === 0 && (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-textSecondary text-sm">No places found</p>
                <p className="text-textMuted text-xs mt-1">Try a different search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

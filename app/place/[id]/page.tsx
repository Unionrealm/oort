"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Clock, Star, Users, Zap } from "lucide-react";
import TopBar from "@/components/TopBar";
import OwnerBeaconCard from "@/components/OwnerBeaconCard";
import LiveFeedPost from "@/components/LiveFeedPost";
import SignalRequestCard from "@/components/SignalRequestCard";
import PatternHeatmap from "@/components/PatternHeatmap";
import { places } from "@/data/places";
import { posts } from "@/data/posts";

interface PlacePageProps {
  params: { id: string };
}

const busyLabels = {
  quiet: "Usually quiet",
  moderate: "Moderately busy",
  busy: "Busy right now",
  very_busy: "Very busy",
};

const busyColors = {
  quiet: "text-green-400",
  moderate: "text-yellow-400",
  busy: "text-orange-400",
  very_busy: "text-red-400",
};

type Tab = "live" | "patterns" | "info";

export default function PlacePage({ params }: PlacePageProps) {
  const place = places.find((p) => p.id === params.id);
  if (!place) notFound();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("live");

  const placePosts = posts.filter((p) => p.placeId === place.id);

  return (
    <div className="min-h-screen bg-background">
      <TopBar variant="back" title={place.name} showShare />

      {/* Hero image */}
      <div className="relative w-full h-[42vh] max-h-72">
        <Image
          src={place.photo}
          alt={place.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 gradient-scrim-strong" />

        {/* Place name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          {place.isLive && (
            <div className="flex items-center gap-1.5 mb-2">
              <span className="live-dot" />
              <span className="text-xs font-bold text-white tracking-widest">LIVE NOW</span>
            </div>
          )}
          <h1 className="text-2xl font-bold text-white font-display text-shadow leading-tight">
            {place.name}
          </h1>
          <p className="text-sm text-white/70 mt-1">
            {place.categoryEmoji} {place.category} · {place.zone}, {place.city}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-desktop mx-auto px-4 py-3 flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 shrink-0">
            <Clock size={14} className="text-accent" />
            <span className="text-xs text-textSecondary">
              {place.isOpenNow ? (
                <span className="text-green-400 font-medium">Open now</span>
              ) : (
                <span className="text-red-400 font-medium">Closed</span>
              )}
            </span>
          </div>
          <div className="w-px h-4 bg-border shrink-0" />
          <div className="flex items-center gap-1.5 shrink-0">
            <Users size={14} className="text-accent" />
            <span className={`text-xs font-medium ${busyColors[place.busyNow]}`}>
              {busyLabels[place.busyNow]}
            </span>
          </div>
          <div className="w-px h-4 bg-border shrink-0" />
          <div className="flex items-center gap-1.5 shrink-0">
            <Star size={14} className="text-amber" fill="currentColor" />
            <span className="text-xs text-textSecondary font-medium">{place.rating}</span>
          </div>
          <div className="w-px h-4 bg-border shrink-0" />
          <div className="flex items-center gap-1.5 shrink-0">
            <Zap size={14} className="text-accent" />
            <span className="text-xs text-textSecondary">{place.signalCount} signals</span>
          </div>
        </div>
      </div>

      {/* Owner Beacon */}
      {place.ownerBeacon && (
        <div className="max-w-desktop mx-auto px-4 pt-4">
          <OwnerBeaconCard
            ownerName={place.ownerBeacon.ownerName}
            ownerAvatar={place.ownerBeacon.ownerAvatar}
            message={place.ownerBeacon.message}
            timestamp={place.ownerBeacon.timestamp}
          />
        </div>
      )}

      {/* Tab bar */}
      <div className="sticky top-14 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-desktop mx-auto flex">
          {(["live", "patterns", "info"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "text-accent border-accent"
                  : "text-textMuted border-transparent hover:text-textSecondary"
              }`}
            >
              {tab === "live" ? "Live Feed" : tab === "patterns" ? "Patterns" : "Info"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-desktop mx-auto px-4 py-4 pb-28 space-y-4">
        {activeTab === "live" && (
          <>
            {placePosts.length > 0 ? (
              placePosts.map((post, i) => (
                <div key={post.id} className={`stagger-${Math.min(i + 1, 10)}`}>
                  {post.type === "signal" ? (
                    <SignalRequestCard post={post} showPlace={false} className="mb-4" />
                  ) : (
                    <LiveFeedPost post={post} showPlace={false} />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">📡</div>
                <p className="text-textSecondary text-sm">No posts yet for this place</p>
              </div>
            )}
          </>
        )}

        {activeTab === "patterns" && (
          <div className="space-y-4">
            <PatternHeatmap />

            {/* AI Summary */}
            <div className="bg-surface rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Zap size={14} className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-bold text-accent">AI Summary</div>
                  <div className="text-[10px] text-textMuted">
                    Based on {place.signalCount} signals
                  </div>
                </div>
              </div>
              <p className="text-sm text-textSecondary leading-relaxed">{place.aiSummary}</p>
            </div>

            {/* Open confidence */}
            <div className="bg-surface rounded-2xl p-4 border border-border/50">
              <h3 className="text-sm font-bold text-textPrimary mb-3">Usually Open?</h3>
              <div className="space-y-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                  const confidence = [0.85, 0.7, 0.9, 0.85, 0.95, 0.95, 0.6][i];
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-xs text-textMuted w-7">{day}</span>
                      <div className="flex-1 bg-surfaceHigh rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-textMuted w-8 text-right">
                        {Math.round(confidence * 100)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-4">
            {/* Details card */}
            <div className="bg-surface rounded-2xl p-4 border border-border/50 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-textMuted mb-0.5">Address</div>
                  <div className="text-sm text-textPrimary">{place.address}</div>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-textMuted mb-0.5">Hours</div>
                  <div className="text-sm text-textPrimary">{place.hours}</div>
                </div>
              </div>
              {place.phone && (
                <>
                  <div className="h-px bg-border" />
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-textMuted mb-0.5">Phone</div>
                      <div className="text-sm text-accent">{place.phone}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="bg-surface rounded-2xl p-4 border border-border/50">
              <h3 className="text-sm font-bold text-textPrimary mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surfaceHigh rounded-full text-xs text-textSecondary border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo gallery */}
            <div className="bg-surface rounded-2xl p-4 border border-border/50">
              <h3 className="text-sm font-bold text-textPrimary mb-3">Gallery</h3>
              <div className="grid grid-cols-3 gap-1">
                {place.photos.map((photo, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={photo}
                      alt={`${place.name} photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ask the crowd → opens post/new with signal type preset */}
      <button
        onClick={() => router.push("/post/new?type=signal")}
        className="fixed bottom-24 right-4 flex items-center gap-2 bg-surface border border-border px-4 py-3 rounded-full shadow-lg hover:bg-surfaceHigh transition-all z-40"
      >
        <span className="text-base">📡</span>
        <span className="text-sm font-semibold text-textPrimary">Ask the crowd</span>
      </button>
    </div>
  );
}

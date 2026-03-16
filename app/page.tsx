"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ZoneTabs from "@/components/ZoneTabs";
import LiveFeedPost from "@/components/LiveFeedPost";
import LivePeekCard from "@/components/LivePeekCard";
import SignalRequestCard from "@/components/SignalRequestCard";
import OwnerBeaconCard from "@/components/OwnerBeaconCard";
import { posts } from "@/data/posts";
import { places } from "@/data/places";

const zoneTabs = [
  { id: "for-you", label: "For You" },
  { id: "itaewon", label: "Itaewon" },
  { id: "hongdae", label: "Hongdae" },
  { id: "gangnam", label: "Gangnam" },
  { id: "seongsu", label: "Seongsu" },
  { id: "mapo", label: "Mapo" },
  { id: "ikseon", label: "Ikseon-dong" },
];

export default function HomePage() {
  const [activeZone, setActiveZone] = useState("for-you");

  const filteredPosts =
    activeZone === "for-you"
      ? posts
      : posts.filter((p) => p.zone === activeZone);

  const ownerBeaconPlaces = places.filter(
    (p) =>
      p.ownerBeacon &&
      (activeZone === "for-you" || p.zone === activeZone)
  );

  return (
    <div className="min-h-screen bg-background">
      <TopBar variant="home" />
      <ZoneTabs tabs={zoneTabs} activeTab={activeZone} onSelect={setActiveZone} />

      <div className="max-w-mobile mx-auto pb-8">
        {ownerBeaconPlaces.slice(0, 1).map((place) =>
          place.ownerBeacon ? (
            <div key={place.id} className="stagger-1 px-4 mb-4">
              <OwnerBeaconCard
                ownerName={place.ownerBeacon.ownerName}
                ownerAvatar={place.ownerBeacon.ownerAvatar}
                message={place.ownerBeacon.message}
                timestamp={place.ownerBeacon.timestamp}
                placeName={place.name}
                placeId={place.id}
              />
            </div>
          ) : null
        )}

        {filteredPosts.map((post, i) => {
          const staggerNum = Math.min(i + 2, 10);
          return (
            <div key={post.id} className={`stagger-${staggerNum}`}>
              {post.type === "live_peek" ? (
                <LivePeekCard post={post} />
              ) : post.type === "signal" ? (
                <SignalRequestCard post={post} />
              ) : (
                <LiveFeedPost post={post} />
              )}
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="text-4xl mb-3">📡</div>
            <p className="text-textSecondary text-sm">No activity in this zone yet</p>
            <p className="text-textMuted text-xs mt-1">Be the first to post a signal!</p>
          </div>
        )}
      </div>

      <Link
        href="/post/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg hover:bg-accentHover transition-all hover:scale-110 glow-accent z-40"
      >
        <PlusCircle size={24} className="text-white" />
      </Link>
    </div>
  );
}

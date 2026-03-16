"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, MapPin, Grid3X3, Zap } from "lucide-react";
import TopBar from "@/components/TopBar";
import TrustBadge from "@/components/TrustBadge";
import { posts } from "@/data/posts";
import { places } from "@/data/places";

const userProfile = {
  id: "user-1",
  name: "Jisoo Kwon",
  username: "jisoo_explorer",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  bio: "Seoul explorer 🗺️ Café addict. Finding the real stories behind places.",
  trustScore: 78,
  postsCount: 142,
  signalsCount: 89,
  zone: "Itaewon",
};

const userPosts = posts.filter((p) => p.userId === "user-1" || p.userId === "user-18");
const userPhotoPosts = userPosts.filter((p) => p.photo);

function getTierInfo(score: number): { label: string; desc: string; color: string; next?: string; nextScore?: number } {
  if (score >= 90) return { label: "Elite", desc: "Top-tier contributor. Your signals are highly trusted.", color: "text-yellow-400" };
  if (score >= 75) return {
    label: "Trusted",
    desc: "Your updates are frequently marked helpful by the community.",
    color: "text-accent",
    next: "Elite",
    nextScore: 90,
  };
  if (score >= 50) return {
    label: "Verified",
    desc: "You've been active in the community for a while.",
    color: "text-green-400",
    next: "Trusted",
    nextScore: 75,
  };
  return {
    label: "Explorer",
    desc: "New to Oort. Keep posting to build your Truth Engine score.",
    color: "text-textMuted",
    next: "Verified",
    nextScore: 50,
  };
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"posts" | "signals">("posts");
  const tier = getTierInfo(userProfile.trustScore);

  const visitedPlaces = places.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <TopBar variant="back" title="Profile" />

      {/* Profile header */}
      <div className="max-w-mobile mx-auto px-4 pt-6 pb-4">
        {/* Avatar & name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              width={80}
              height={80}
              className="rounded-full object-cover ring-2 ring-accent/40"
            />
            <div className="absolute -bottom-1 -right-1">
              <TrustBadge score={userProfile.trustScore} />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h1 className="text-xl font-bold text-textPrimary font-display">{userProfile.name}</h1>
            <p className="text-sm text-textMuted">@{userProfile.username}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-textMuted" />
              <span className="text-xs text-textMuted">{userProfile.zone}, Seoul</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-textSecondary mb-4 leading-relaxed">{userProfile.bio}</p>

        {/* Stats row */}
        <div className="flex items-center gap-0 bg-surface rounded-2xl border border-border overflow-hidden mb-4">
          <div className="flex-1 text-center py-3">
            <div className="text-xl font-bold text-textPrimary">{userProfile.postsCount}</div>
            <div className="text-xs text-textMuted mt-0.5">Posts</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center py-3">
            <div className="text-xl font-bold text-textPrimary">{userProfile.signalsCount}</div>
            <div className="text-xs text-textMuted mt-0.5">Signals</div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center py-3">
            <div className={`text-xl font-bold ${tier.color}`}>{userProfile.trustScore}</div>
            <div className="text-xs text-textMuted mt-0.5">Score</div>
          </div>
        </div>

        {/* Truth Engine card */}
        <div className="bg-surface rounded-2xl p-4 border border-border/50 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className={tier.color} />
            <span className="text-sm font-bold text-textPrimary">Truth Engine</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-accent/10 ${tier.color}`}>
              {tier.label}
            </span>
          </div>
          <p className="text-xs text-textSecondary mb-3">{tier.desc}</p>

          {/* Score bar */}
          <div className="relative">
            <div className="flex justify-between text-[10px] text-textMuted mb-1">
              <span>0</span>
              {tier.nextScore && <span className="text-accent">→ {tier.nextScore} for {tier.next}</span>}
              <span>100</span>
            </div>
            <div className="h-2 bg-surfaceHigh rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r from-accent to-accentHover transition-all`}
                style={{ width: `${userProfile.trustScore}%` }}
              />
            </div>
          </div>

          {tier.nextScore && (
            <p className="text-xs text-textMuted mt-2">
              {tier.nextScore - userProfile.trustScore} more points to reach{" "}
              <span className="text-accent font-semibold">{tier.next}</span>
            </p>
          )}
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-border mb-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-all ${
              activeTab === "posts"
                ? "text-accent border-accent"
                : "text-textMuted border-transparent"
            }`}
          >
            <Grid3X3 size={14} />
            Posts
          </button>
          <button
            onClick={() => setActiveTab("signals")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border-b-2 transition-all ${
              activeTab === "signals"
                ? "text-accent border-accent"
                : "text-textMuted border-transparent"
            }`}
          >
            <Zap size={14} />
            Signals
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "posts" && (
          <div>
            {userPhotoPosts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {[...userPhotoPosts, ...userPhotoPosts].slice(0, 9).map((post, i) => (
                  <Link
                    key={`${post.id}-${i}`}
                    href={`/place/${post.placeId}`}
                    className={`relative aspect-square rounded-lg overflow-hidden stagger-${Math.min(i + 1, 10)}`}
                  >
                    <Image
                      src={post.photo!}
                      alt={post.text}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-textMuted text-sm">No posts yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "signals" && (
          <div className="space-y-3">
            {visitedPlaces.map((place, i) => (
              <Link
                key={place.id}
                href={`/place/${place.id}`}
                className={`flex items-center gap-3 bg-surface rounded-xl p-3 border border-border hover:border-accent/50 transition-all stagger-${Math.min(i + 1, 10)}`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={place.photo}
                    alt={place.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-textPrimary truncate">{place.name}</div>
                  <div className="text-xs text-textMuted">{place.zone} · {place.category}</div>
                </div>
                <div className="text-xs text-accent font-medium">{Math.floor(Math.random() * 8) + 1} signals</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

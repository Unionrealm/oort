"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Post } from "@/data/posts";

interface LivePeekCardProps {
  post: Post;
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function LivePeekCard({ post }: LivePeekCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-accent/40 glow-accent bg-surface">
      {/* Photo with gradient */}
      {post.photo && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={post.photo}
            alt={post.text}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Accent border overlay */}
          <div className="absolute inset-0 border border-accent/20" />

          {/* Live Peek badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-accent/40">
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            <span className="text-[10px] font-bold text-accent tracking-widest">LIVE PEEK</span>
          </div>

          {/* Place tag floating at bottom */}
          <div className="absolute bottom-3 left-3 right-3">
            <Link
              href={`/place/${post.placeId}`}
              className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10 hover:border-accent/40 transition-colors"
            >
              <MapPin size={11} className="text-accent" />
              <span className="text-xs font-semibold text-white">{post.placeName}</span>
              <span className="text-[10px] text-white/50">· {post.zone}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Post info */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={post.userAvatar}
            alt={post.userName}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <span className="text-xs font-semibold text-textPrimary">@{post.userName}</span>
          <span className="text-xs text-textMuted">{timeAgo(post.timestamp)}</span>
        </div>
        <p className="text-sm text-textPrimary">{post.text}</p>
      </div>
    </div>
  );
}

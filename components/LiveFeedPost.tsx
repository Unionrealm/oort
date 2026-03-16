"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, Flame, Zap, MapPin } from "lucide-react";
import { Post } from "@/data/posts";

interface LiveFeedPostProps {
  post: Post;
  showPlace?: boolean;
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

export default function LiveFeedPost({ post, showPlace = true }: LiveFeedPostProps) {
  const isLivePeek = post.type === "live_peek";

  return (
    <div className="border-b border-border/20">
      {/* Live Peek: thin accent line at top */}
      {isLivePeek && <div className="h-[1.5px] bg-accent/60" />}

      {/* Header — avatar + name + timestamp float directly on dark background */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Image
          src={post.userAvatar}
          alt={post.userName}
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-textPrimary">@{post.userName}</span>
            {isLivePeek && (
              <span className="flex items-center gap-1 bg-accent/20 text-accent text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                <span className="live-dot" style={{ width: 5, height: 5 }} />
                PEEK
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-textMuted">
            <span>{timeAgo(post.timestamp)}</span>
            {/* Place shown in header only for text-only posts (photo posts show it over the image) */}
            {showPlace && !post.photo && (
              <>
                <span>·</span>
                <Link
                  href={`/place/${post.placeId}`}
                  className="text-accent hover:underline flex items-center gap-1"
                >
                  <MapPin size={10} />
                  {post.placeName}
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="text-xs text-textMuted">{post.zone}</div>
      </div>

      {/* Photo — full width, edge to edge, no rounded corners */}
      {post.photo && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={post.photo}
            alt={post.text}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Place name floats over image bottom */}
          {showPlace && (
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
              <Link
                href={`/place/${post.placeId}`}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <MapPin size={10} className="text-accent shrink-0" />
                <span className="text-xs font-semibold text-white truncate">{post.placeName}</span>
                <span className="text-[10px] text-white/50 shrink-0">· {post.zone}</span>
              </Link>
            </div>
          )}
          {/* Live peek: subtle accent inner border */}
          {isLivePeek && (
            <div className="absolute inset-0 border border-accent/20" />
          )}
        </div>
      )}

      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-sm text-textPrimary leading-relaxed">{post.text}</p>
      </div>

      {/* Reactions — sit directly on dark background, no top border */}
      <div className="flex items-center gap-1 px-4 pb-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceHigh transition-all text-xs font-medium">
          <ThumbsUp size={13} />
          <span>Helpful</span>
          <span className="text-textMuted ml-0.5">{post.reactions.helpful}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-textMuted hover:text-amber hover:bg-surfaceHigh transition-all text-xs font-medium">
          <Flame size={13} />
          <span>Trending</span>
          <span className="text-textMuted ml-0.5">{post.reactions.trending}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceHigh transition-all text-xs font-medium">
          <Zap size={13} />
          <span>Wow</span>
          <span className="text-textMuted ml-0.5">{post.reactions.surprising}</span>
        </button>
      </div>
    </div>
  );
}

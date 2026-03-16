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
  const isSignal = post.type === "signal";
  const isLivePeek = post.type === "live_peek";

  if (isSignal) {
    return (
      <div className="bg-surface rounded-2xl p-4 border border-border/50">
        <div className="flex items-start gap-3">
          <Image
            src={post.userAvatar}
            alt={post.userName}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-textPrimary">@{post.userName}</span>
              <span className="text-xs text-textMuted">{timeAgo(post.timestamp)}</span>
            </div>
            <div className="bg-surfaceHigh rounded-xl p-3 mb-3">
              <span className="text-lg mr-2">📡</span>
              <span className="text-sm text-textPrimary">{post.text}</span>
            </div>
            {showPlace && (
              <Link
                href={`/place/${post.placeId}`}
                className="flex items-center gap-1.5 text-accent text-xs font-medium mb-3 hover:underline"
              >
                <MapPin size={11} />
                {post.placeName}
                <span className="text-textMuted">· {post.zone}</span>
              </Link>
            )}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accentHover transition-colors">
                Answer
              </button>
              <span className="text-xs text-textMuted">
                {post.reactions.helpful} responses
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-surface rounded-2xl overflow-hidden border ${
        isLivePeek ? "border-accent/40 glow-accent" : "border-border/50"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-3 pb-2">
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
            {/* Show place in header only for text-only posts (image posts show place on the photo) */}
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

      {/* Photo */}
      {post.photo && (
        <div className="relative w-full aspect-[4/3] mx-0">
          <Image
            src={post.photo}
            alt={post.text}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient scrim — same visual language as explore grid */}
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
          {isLivePeek && (
            <div className="absolute inset-0 border-2 border-accent/30 rounded-0" />
          )}
        </div>
      )}

      {/* Text */}
      <div className="px-4 py-3">
        <p className="text-sm text-textPrimary leading-relaxed">{post.text}</p>
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-1 px-4 pb-3 pt-1 border-t border-border/30">
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

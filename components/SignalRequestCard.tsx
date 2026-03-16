"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { Post } from "@/data/posts";

interface SignalRequestCardProps {
  post: Post;
  showPlace?: boolean;
  /** Pass "mb-4" (no mx) when rendered inside a px-4 container (e.g. place page) */
  className?: string;
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

export default function SignalRequestCard({
  post,
  showPlace = true,
  className = "mx-4 mb-4",
}: SignalRequestCardProps) {
  const router = useRouter();

  return (
    <div
      className={`${className} rounded-2xl p-4 border border-[#2a2a2a] cursor-pointer active:opacity-75 transition-opacity`}
      onClick={() => router.push(`/signal/${post.id}`)}
    >
      <div className="flex items-start gap-3">
        <Image
          src={post.userAvatar}
          alt={post.userName}
          width={36}
          height={36}
          className="rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-textPrimary">@{post.userName}</span>
            <span className="text-xs text-textMuted">{timeAgo(post.timestamp)}</span>
          </div>

          {showPlace && (
            <button
              className="flex items-center gap-1 text-xs text-textMuted mb-2 hover:text-accent transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/place/${post.placeId}`);
              }}
            >
              <MapPin size={10} />
              <span className="text-accent">{post.placeName}</span>
              <span>· {post.zone}</span>
            </button>
          )}

          <div className="rounded-xl p-3 mb-2.5 border-l-2 border-accent bg-accent/5">
            <div className="flex items-start gap-2">
              <span className="text-base mt-0.5">📡</span>
              <p className="text-sm text-textPrimary">{post.text}</p>
            </div>
          </div>

          <p className="text-xs text-textMuted">{post.reactions.helpful} answers</p>
        </div>
      </div>
    </div>
  );
}

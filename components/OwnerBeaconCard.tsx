"use client";

import Image from "next/image";
import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

interface OwnerBeaconCardProps {
  ownerName: string;
  ownerAvatar: string;
  message: string;
  timestamp: string;
  placeName?: string;
  placeId?: string;
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

export default function OwnerBeaconCard({
  ownerName,
  ownerAvatar,
  message,
  timestamp,
  placeName,
}: OwnerBeaconCardProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-amber/30 animate-[beacon-enter_0.4s_ease-out]"
      style={{
        background:
          "linear-gradient(135deg, rgba(245,166,35,0.12) 0%, rgba(247,184,75,0.06) 100%)",
        animation: "beacon-enter 0.4s ease-out",
      }}
    >
      {/* Amber top strip */}
      <div className="h-1 bg-gradient-to-r from-amber to-amberLight" />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Owner avatar */}
          <div className="relative shrink-0">
            <Image
              src={ownerAvatar}
              alt={ownerName}
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-amber/60"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-black" fill="currentColor" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber">Owner Update</span>
              {placeName && (
                <span className="text-xs text-textMuted">· {placeName}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm font-semibold text-textPrimary">{ownerName}</span>
              <div className="flex items-center gap-1 bg-amber/20 rounded-full px-2 py-0.5">
                <CheckCircle size={10} className="text-amber" fill="currentColor" />
                <span className="text-[10px] font-bold text-amber">Verified Owner</span>
              </div>
            </div>
            <p className="text-sm text-textPrimary leading-relaxed">{message}</p>
            <span className="text-xs text-textMuted mt-2 block">{timeAgo(timestamp)}</span>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="text-textMuted hover:text-textPrimary transition-colors shrink-0 -mt-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

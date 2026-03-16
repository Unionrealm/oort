"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { Post } from "@/data/posts";
import { useState } from "react";

interface SignalRequestCardProps {
  post: Post;
  showPlace?: boolean;
}

interface SignalModalProps {
  question: string;
  placeName: string;
  onClose: () => void;
}

function SignalModal({ question, placeName, onClose }: SignalModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl p-6 w-full max-w-md border border-border animate-[slide-down_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <span className="text-3xl">📡</span>
          <h3 className="text-lg font-bold text-textPrimary mt-2">Answer Signal</h3>
          <p className="text-sm text-textMuted mt-1">
            Someone is asking about <span className="text-accent">{placeName}</span>
          </p>
        </div>
        <div className="bg-surfaceHigh rounded-xl p-4 mb-4">
          <p className="text-sm text-textPrimary">{question}</p>
        </div>
        <textarea
          className="w-full bg-surfaceHigh border border-border rounded-xl p-3 text-sm text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent resize-none"
          placeholder="Share what you know..."
          rows={3}
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-textSecondary text-sm font-medium hover:bg-surfaceHigh transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accentHover transition-colors"
          >
            Send Answer
          </button>
        </div>
      </div>
    </div>
  );
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

export default function SignalRequestCard({ post, showPlace = true }: SignalRequestCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mx-4 mb-4 rounded-2xl p-4 border border-[#2a2a2a]">
        <div className="flex items-start gap-3">
          <Image
            src={post.userAvatar}
            alt={post.userName}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-textPrimary">@{post.userName}</span>
              <span className="text-xs text-textMuted">{timeAgo(post.timestamp)}</span>
            </div>

            {showPlace && (
              <Link
                href={`/place/${post.placeId}`}
                className="flex items-center gap-1 text-xs text-textMuted mb-2 hover:text-accent transition-colors"
              >
                <MapPin size={10} />
                <span className="text-accent">{post.placeName}</span>
                <span>· {post.zone}</span>
              </Link>
            )}

            <div className="bg-surfaceHigh rounded-xl p-3 mb-3 border-l-2 border-accent">
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">📡</span>
                <p className="text-sm text-textPrimary">{post.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accentHover transition-colors"
              >
                <MessageCircle size={13} />
                Answer
              </button>
              <div className="flex items-center gap-1 text-xs text-textMuted">
                <span>{post.reactions.helpful}</span>
                <span>responses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SignalModal
          question={post.text}
          placeName={post.placeName}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, ThumbsUp, Send } from "lucide-react";
import { posts } from "@/data/posts";
import { signalAnswers } from "@/data/signals";

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function SignalThreadPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const signal = posts.find((p) => p.id === params.id && p.type === "signal");
  if (!signal) notFound();

  const initialAnswers = signalAnswers
    .filter((a) => a.signalId === params.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(
    Object.fromEntries(initialAnswers.map((a) => [a.id, a.helpful]))
  );
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [inputText, setInputText] = useState("");

  function toggleHelpful(id: string) {
    if (voted[id]) return;
    setVoted((v) => ({ ...v, [id]: true }));
    setHelpfulCounts((c) => ({ ...c, [id]: c[id] + 1 }));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center gap-3 px-4 h-14 max-w-desktop mx-auto">
          <button
            onClick={() => router.back()}
            className="text-textSecondary hover:text-textPrimary transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <h1 className="text-base font-semibold text-textPrimary">Signal Thread</h1>
        </div>
      </header>

      {/* Content + bottom input padding */}
      <div className="max-w-mobile mx-auto pb-24">

        {/* Original question — static, non-interactive */}
        <div className="px-4 py-4 border-b border-[#1a1a1a]">
          <div className="flex items-start gap-3">
            <Image
              src={signal.userAvatar}
              alt={signal.userName}
              width={36}
              height={36}
              className="rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-textPrimary">@{signal.userName}</span>
                <span className="text-xs text-textMuted">{timeAgo(signal.timestamp)}</span>
              </div>
              <Link
                href={`/place/${signal.placeId}`}
                className="flex items-center gap-1 text-xs text-textMuted mb-2.5 hover:text-accent transition-colors"
              >
                <MapPin size={10} />
                <span className="text-accent">{signal.placeName}</span>
                <span>· {signal.zone}</span>
              </Link>
              <div className="rounded-xl p-3 border-l-2 border-accent bg-accent/5">
                <div className="flex items-start gap-2">
                  <span className="text-base mt-0.5">📡</span>
                  <p className="text-sm text-textPrimary">{signal.text}</p>
                </div>
              </div>
              <p className="text-xs text-textMuted mt-2.5">{initialAnswers.length} answers</p>
            </div>
          </div>
        </div>

        {/* Answer feed */}
        {initialAnswers.length > 0 ? (
          initialAnswers.map((answer) => (
            <div key={answer.id} className="px-4 py-4 border-b border-[#1a1a1a]">
              <div className="flex items-start gap-3">
                <Image
                  src={answer.userAvatar}
                  alt={answer.userName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold text-textPrimary">@{answer.userName}</span>
                    <span className="text-xs text-textMuted">{timeAgo(answer.timestamp)}</span>
                  </div>
                  <p className="text-sm text-textPrimary leading-relaxed">{answer.text}</p>
                  <button
                    onClick={() => toggleHelpful(answer.id)}
                    className={`flex items-center gap-1.5 mt-2.5 text-xs font-medium transition-colors ${
                      voted[answer.id]
                        ? "text-accent"
                        : "text-textMuted hover:text-textPrimary"
                    }`}
                  >
                    <ThumbsUp
                      size={13}
                      fill={voted[answer.id] ? "currentColor" : "none"}
                    />
                    <span>Helpful</span>
                    <span className="ml-0.5">{helpfulCounts[answer.id]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 px-4">
            <div className="text-4xl mb-3">📡</div>
            <p className="text-textSecondary text-sm">No answers yet</p>
            <p className="text-textMuted text-xs mt-1">Be the first to answer this signal</p>
          </div>
        )}
      </div>

      {/* Sticky input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/50">
        <div className="max-w-mobile mx-auto flex items-center gap-3 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
            alt="You"
            width={32}
            height={32}
            className="rounded-full object-cover shrink-0"
          />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Answer this signal..."
            className="flex-1 bg-transparent text-sm text-textPrimary placeholder-textMuted focus:outline-none"
          />
          <button
            disabled={!inputText.trim()}
            className="text-accent disabled:text-textMuted transition-colors disabled:cursor-not-allowed"
          >
            <Send size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

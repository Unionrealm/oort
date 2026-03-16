"use client";

import Link from "next/link";
import { ArrowLeft, Search, Bell, Share2, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopBarProps {
  variant?: "home" | "back" | "search";
  title?: string;
  showSearch?: boolean;
  showShare?: boolean;
  showFilter?: boolean;
  showBell?: boolean;
}

export default function TopBar({
  variant = "home",
  title,
  showSearch = false,
  showShare = false,
  showFilter = false,
  showBell = false,
}: TopBarProps) {
  const router = useRouter();

  if (variant === "home") {
    return (
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14 max-w-desktop mx-auto">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold font-display">O</span>
            </div>
            <span className="text-lg font-bold text-textPrimary font-display tracking-tight">
              oort
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="text-textSecondary hover:text-textPrimary transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <button className="text-textSecondary hover:text-textPrimary transition-colors relative">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 h-14 max-w-desktop mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-textSecondary hover:text-textPrimary transition-colors p-1 -ml-1"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          {title && (
            <h1 className="text-base font-semibold text-textPrimary truncate">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showSearch && (
            <Link href="/search" className="text-textSecondary hover:text-textPrimary transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </Link>
          )}
          {showFilter && (
            <button className="text-textSecondary hover:text-textPrimary transition-colors">
              <SlidersHorizontal size={20} strokeWidth={1.5} />
            </button>
          )}
          {showBell && (
            <button className="text-textSecondary hover:text-textPrimary transition-colors">
              <Bell size={20} strokeWidth={1.5} />
            </button>
          )}
          {showShare && (
            <button className="text-textSecondary hover:text-textPrimary transition-colors">
              <Share2 size={20} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PlusCircle, Search, User } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/explore", icon: Compass, label: "Explore" },
  { href: "/post/new", icon: PlusCircle, label: "Post", isAccent: true },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border bottom-nav-safe">
      <div className="flex items-center justify-around max-w-desktop mx-auto px-2 pt-2 pb-1">
        {navItems.map(({ href, icon: Icon, label, isAccent }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-all duration-200 ${
                isAccent
                  ? "text-accent"
                  : isActive
                  ? "text-accent"
                  : "text-textMuted hover:text-textSecondary"
              }`}
            >
              <Icon
                size={isAccent ? 28 : 22}
                strokeWidth={isAccent ? 1.5 : isActive ? 2.5 : 1.5}
                className={isAccent ? "drop-shadow-[0_0_8px_rgba(74,158,255,0.5)]" : ""}
              />
              <span
                className={`text-[10px] font-medium tracking-wide ${
                  isAccent
                    ? "text-accent"
                    : isActive
                    ? "text-accent"
                    : "text-textMuted"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

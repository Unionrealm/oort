import { Shield } from "lucide-react";

interface TrustBadgeProps {
  score: number;
}

function getTier(score: number): { label: string; color: string; bg: string } {
  if (score >= 90) return { label: "Elite", color: "text-yellow-400", bg: "bg-yellow-400/20" };
  if (score >= 75) return { label: "Trusted", color: "text-accent", bg: "bg-accent/20" };
  if (score >= 50) return { label: "Verified", color: "text-green-400", bg: "bg-green-400/20" };
  return { label: "Explorer", color: "text-textMuted", bg: "bg-surfaceHigh" };
}

export default function TrustBadge({ score }: TrustBadgeProps) {
  const tier = getTier(score);
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${tier.bg}`}>
      <Shield size={10} className={tier.color} fill="currentColor" />
      <span className={`text-[10px] font-bold ${tier.color}`}>{tier.label}</span>
    </div>
  );
}

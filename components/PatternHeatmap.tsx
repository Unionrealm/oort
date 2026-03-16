"use client";

import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [
  "6am", "7am", "8am", "9am", "10am", "11am", "12pm",
  "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm",
  "8pm", "9pm", "10pm", "11pm",
];

// Generate realistic-looking busyness data
function generateHeatmap(): number[][] {
  return HOURS.map((_, hourIdx) => {
    return DAYS.map((_, dayIdx) => {
      const isWeekend = dayIdx >= 5;
      const isMorning = hourIdx <= 3; // 6–9am
      const isLunch = hourIdx >= 6 && hourIdx <= 8; // 12–2pm
      const isEvening = hourIdx >= 12 && hourIdx <= 15; // 6–9pm
      const isLate = hourIdx >= 16; // 10pm+

      let base = 0.1;
      if (isMorning) base += isWeekend ? 0.2 : 0.4;
      if (isLunch) base += isWeekend ? 0.5 : 0.6;
      if (isEvening) base += isWeekend ? 0.8 : 0.5;
      if (isLate) base += isWeekend ? 0.4 : 0.1;
      if (isWeekend) base += 0.15;

      // Add some randomness
      base += (Math.random() - 0.5) * 0.2;
      return Math.max(0, Math.min(1, base));
    });
  });
}

const heatmapData = generateHeatmap();

function getBusynessLabel(value: number): string {
  if (value < 0.2) return "Very quiet";
  if (value < 0.4) return "Quiet";
  if (value < 0.6) return "Moderate";
  if (value < 0.8) return "Busy";
  return "Very busy";
}

function getCellColor(value: number): string {
  if (value < 0.15) return "bg-surface";
  if (value < 0.3) return "bg-accent/10";
  if (value < 0.45) return "bg-accent/25";
  if (value < 0.6) return "bg-accent/45";
  if (value < 0.75) return "bg-accent/65";
  if (value < 0.88) return "bg-accent/80";
  return "bg-accent";
}

export default function PatternHeatmap() {
  const [tooltip, setTooltip] = useState<{
    day: string;
    hour: string;
    value: number;
  } | null>(null);

  return (
    <div className="bg-surface rounded-2xl p-4 border border-border/50">
      <h3 className="text-sm font-bold text-textPrimary mb-1">Busyness Heatmap</h3>
      <p className="text-xs text-textMuted mb-4">Tap a cell to see typical busyness</p>

      {/* Day headers */}
      <div className="flex gap-1 mb-1 ml-8">
        {DAYS.map((day) => (
          <div key={day} className="flex-1 text-center text-[9px] font-medium text-textMuted">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-0.5">
        {HOURS.map((hour, hourIdx) => (
          <div key={hour} className="flex gap-1 items-center">
            <div className="w-7 text-right text-[9px] text-textMuted shrink-0">{hour}</div>
            {DAYS.map((day, dayIdx) => {
              const value = heatmapData[hourIdx][dayIdx];
              return (
                <button
                  key={day}
                  className={`flex-1 h-4 rounded-sm transition-all hover:scale-110 ${getCellColor(value)}`}
                  onMouseEnter={() => setTooltip({ day, hour, value })}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => setTooltip({ day, hour, value })}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="mt-3 px-3 py-2 bg-surfaceHigh rounded-lg text-xs text-textPrimary border border-border">
          <span className="font-semibold">{tooltip.day} {tooltip.hour}</span>
          {" — "}
          <span className="text-accent">{getBusynessLabel(tooltip.value)}</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-textMuted">Quiet</span>
        <div className="flex gap-0.5 flex-1">
          {[0.05, 0.25, 0.45, 0.65, 0.85].map((v) => (
            <div key={v} className={`flex-1 h-2 rounded-sm ${getCellColor(v)}`} />
          ))}
        </div>
        <span className="text-[10px] text-textMuted">Busy</span>
      </div>
    </div>
  );
}

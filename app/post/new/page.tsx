"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, MapPin, X } from "lucide-react";
import Image from "next/image";

const postTypes = [
  { id: "update", label: "Update", emoji: "📍", desc: "Share what's happening" },
  { id: "signal", label: "Signal", emoji: "📡", desc: "Ask the crowd" },
  { id: "live_peek", label: "Live Peek", emoji: "🔴", desc: "Quick visual moment" },
];

const placeSuggestions = [
  { id: "brew-lab-itaewon", name: "Brew Lab Seoul", zone: "Itaewon" },
  { id: "hakata-ramen-hongdae", name: "Hakata Ramen House", zone: "Hongdae" },
  { id: "analog-coffee-seongsu", name: "Analog Coffee Lab", zone: "Seongsu" },
  { id: "vinyl-bar-hongdae", name: "Vinyl Underground", zone: "Hongdae" },
  { id: "rooftop-gangnam", name: "Sky Social Rooftop", zone: "Gangnam" },
];

export default function PostNewPage() {
  const router = useRouter();
  const [postType, setPostType] = useState("update");
  const [text, setText] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<typeof placeSuggestions[0] | null>(null);
  const [placeSearch, setPlaceSearch] = useState("");
  const [showPlacePicker, setShowPlacePicker] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const filteredPlaces = placeSearch
    ? placeSuggestions.filter(
        (p) =>
          p.name.toLowerCase().includes(placeSearch.toLowerCase()) ||
          p.zone.toLowerCase().includes(placeSearch.toLowerCase())
      )
    : placeSuggestions;

  const placeholder =
    postType === "update"
      ? "What's happening here right now?"
      : postType === "signal"
      ? "Ask a question about this place..."
      : "Describe what you're seeing live...";

  const handlePost = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-background sticky top-0 z-40">
        <button
          onClick={() => router.back()}
          className="text-textSecondary hover:text-textPrimary transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h1 className="text-base font-bold text-textPrimary">New Post</h1>
        <button
          onClick={handlePost}
          disabled={!text.trim() || !selectedPlace}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            text.trim() && selectedPlace
              ? "bg-accent text-white hover:bg-accentHover"
              : "bg-surface text-textMuted cursor-not-allowed"
          }`}
        >
          Post
        </button>
      </div>

      <div className="flex-1 flex flex-col max-w-mobile mx-auto w-full px-4 py-4 space-y-4">
        {/* Post type selector */}
        <div>
          <p className="text-xs font-semibold text-textMuted mb-2 uppercase tracking-widest">Type</p>
          <div className="grid grid-cols-3 gap-2">
            {postTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setPostType(type.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                  postType === type.id
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-surface border-border text-textMuted hover:border-border/80"
                }`}
              >
                <span className="text-xl">{type.emoji}</span>
                <span className="text-xs font-bold">{type.label}</span>
                <span className="text-[10px] text-center leading-tight opacity-70">{type.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <p className="text-xs font-semibold text-textMuted mb-2 uppercase tracking-widest">Photo</p>
          {photoPreview ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={photoPreview} alt="Preview" fill className="object-cover" />
              <button
                onClick={() => setPhotoPreview(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                setPhotoPreview(
                  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
                )
              }
              className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-border bg-surface flex flex-col items-center justify-center gap-3 hover:border-accent/50 transition-colors"
            >
              <Camera size={32} className="text-textMuted" />
              <div className="text-center">
                <p className="text-sm font-medium text-textSecondary">Add a photo</p>
                <p className="text-xs text-textMuted mt-0.5">Tap to upload</p>
              </div>
            </button>
          )}
        </div>

        {/* Text input */}
        <div>
          <p className="text-xs font-semibold text-textMuted mb-2 uppercase tracking-widest">
            {postType === "signal" ? "Your Question" : "Caption"}
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-surface border border-border rounded-2xl p-4 text-sm text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent resize-none leading-relaxed"
          />
          <p className="text-[10px] text-textMuted mt-1 text-right">{text.length}/280</p>
        </div>

        {/* Place selector */}
        <div>
          <p className="text-xs font-semibold text-textMuted mb-2 uppercase tracking-widest">Tag a Place</p>
          {selectedPlace ? (
            <div className="flex items-center gap-3 bg-surface border border-accent/50 rounded-xl px-4 py-3">
              <MapPin size={16} className="text-accent shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-textPrimary">{selectedPlace.name}</div>
                <div className="text-xs text-textMuted">{selectedPlace.zone}</div>
              </div>
              <button
                onClick={() => { setSelectedPlace(null); setShowPlacePicker(true); }}
                className="text-textMuted hover:text-textPrimary"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowPlacePicker(true)}
              className="w-full flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/50 transition-colors text-left"
            >
              <MapPin size={16} className="text-textMuted shrink-0" />
              <span className="text-sm text-textMuted">Search for a place...</span>
            </button>
          )}

          {/* Place picker dropdown */}
          {showPlacePicker && (
            <div className="mt-2 bg-surfaceHigh border border-border rounded-xl overflow-hidden">
              <div className="p-3 border-b border-border">
                <input
                  type="text"
                  value={placeSearch}
                  onChange={(e) => setPlaceSearch(e.target.value)}
                  placeholder="Search places..."
                  className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-textPrimary placeholder-textMuted focus:outline-none focus:border-accent"
                  autoFocus
                />
              </div>
              {filteredPlaces.map((place) => (
                <button
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    setShowPlacePicker(false);
                    setPlaceSearch("");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors text-left border-b border-border/30 last:border-0"
                >
                  <MapPin size={14} className="text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-textPrimary">{place.name}</div>
                    <div className="text-xs text-textMuted">{place.zone}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

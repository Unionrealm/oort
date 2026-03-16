export interface Zone {
  id: string;
  name: string;
  city: string;
  photo: string;
  placeCount: number;
  trending: boolean;
  description: string;
}

export const zones: Zone[] = [
  {
    id: "itaewon",
    name: "Itaewon",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1601706551553-57a23a3dbbb6?w=1200&q=80",
    placeCount: 48,
    trending: true,
    description: "Seoul's international hub — eclectic bars, global cuisine, and vibrant nightlife.",
  },
  {
    id: "hongdae",
    name: "Hongdae",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80",
    placeCount: 62,
    trending: true,
    description: "Art, youth culture, street performances, and indie cafés near Hongik University.",
  },
  {
    id: "gangnam",
    name: "Gangnam",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1533050487297-09b450131914?w=1200&q=80",
    placeCount: 91,
    trending: false,
    description: "Seoul's upscale district — designer boutiques, rooftop bars, and Michelin restaurants.",
  },
  {
    id: "seongsu",
    name: "Seongsu",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80",
    placeCount: 37,
    trending: true,
    description: "Seoul's Brooklyn — converted factories, specialty coffee, and indie fashion.",
  },
  {
    id: "mapo",
    name: "Mapo",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1200&q=80",
    placeCount: 29,
    trending: false,
    description: "Creative economy district along the Han River, known for media and culture.",
  },
  {
    id: "ikseon",
    name: "Ikseon-dong",
    city: "Seoul",
    photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    placeCount: 24,
    trending: true,
    description: "Traditional hanok village reimagined — cozy teahouses and artisan shops.",
  },
];

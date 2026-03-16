export interface SignalAnswer {
  id: string;
  signalId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  helpful: number;
}

export const signalAnswers: SignalAnswer[] = [
  // post-4: "Is the cherry blossom latte still available here?"
  {
    id: "ans-1",
    signalId: "post-4",
    userId: "user-15",
    userName: "barista_life",
    userAvatar: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=100&q=80",
    text: "Yes! Just had it 20 min ago. They also have a new yuzu version that's even better 🍋",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    helpful: 12,
  },
  {
    id: "ans-2",
    signalId: "post-4",
    userId: "user-18",
    userName: "coffee_commute",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    text: "Had it this morning — usually runs out by 2pm based on my experience here",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    helpful: 7,
  },

  // post-9: "Is the oat milk available today?"
  {
    id: "ans-3",
    signalId: "post-9",
    userId: "user-1",
    userName: "jisoo_explorer",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "I asked when I was there — they restocked this morning, should be fine until close 👍",
    timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    helpful: 5,
  },

  // post-11: "Is there a cover charge tonight?"
  {
    id: "ans-4",
    signalId: "post-11",
    userId: "user-3",
    userName: "seoulnights_",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "₩15,000 cover from 10pm, includes 1 drink. DJ set goes until 3am. Totally worth it",
    timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    helpful: 11,
  },
  {
    id: "ans-5",
    signalId: "post-11",
    userId: "user-8",
    userName: "winenerd_seoul",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    text: "Cover is only for the rooftop section. Ground floor is still free seating",
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    helpful: 8,
  },
  {
    id: "ans-6",
    signalId: "post-11",
    userId: "user-12",
    userName: "ramen_pilgrim",
    userAvatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
    text: "Just called — cover starts at 9pm not 10pm tonight, heads up!",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    helpful: 14,
  },

  // post-20: "Is the outdoor courtyard heated in winter?"
  {
    id: "ans-7",
    signalId: "post-20",
    userId: "user-7",
    userName: "tradition.ko",
    userAvatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&q=80",
    text: "Yes, two overhead heaters and blankets on the chairs. Very cozy even in January 🧣",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    helpful: 6,
  },
  {
    id: "ans-8",
    signalId: "post-20",
    userId: "user-13",
    userName: "teaTime_seoul",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    text: "Went last February — courtyard is fully heated and they serve hot makgeolli too 😄",
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    helpful: 4,
  },
];

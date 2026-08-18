// constants/homeTheme.ts
// Shared design tokens for the HandysCompany Home Screen.
// Keeping these centralised makes every home-screen component
// (header, banners, cards, bottom nav) visually consistent and
// makes future re-theming a one-file change.

export const HomeColors = {
  primary: "#0E9D47", // Brand green (logo / CTA)
  primaryDeep: "#08763A", // Dark green
  primarySoft: "#E8F5E9",
  primarySoftAlt: "#F1FBF4",
  accentGold: "#FFD54F", // Yellow Accent
  accentGoldDeep: "#C59E1A",

  text: "#1A1A1A",
  textMuted: "#757575",
  textFaint: "#9E9E9E",

  surface: "#FFFFFF",
  background: "#FFFFFF", // Pure white background
  border: "#F5F5F5",

  danger: "#EF4444",
  star: "#FFD54F", // Accent color for stars too
  
  // category accent colors (used for icon tints on service sections)
  maid: "#0E9D47",
  menSalon: "#0E9D47",
  womenSalon: "#0E9D47",
  cleaning: "#0E9D47",
  pest: "#0E9D47",
  more: "#0E9D47",
} as const;

export const HomeRadius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
};

export const HomeShadow = {
  card: {
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  soft: {
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1.5,
  },
  floating: {
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;

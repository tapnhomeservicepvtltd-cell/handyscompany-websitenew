// utils/variantIcon.ts
// हर variant के title के आधार पर सही आइकॉन चुनता है, ताकि Tap/Mixer/AC जैसे
// अलग-अलग sub-item अलग-अलग दिखें (पहले सब एक जैसा service-level icon दिखाते थे).
// किसी भी service की data file में icon जोड़ने की ज़रूरत नहीं — यह सभी services पर अपने आप काम करता है.

type IconMatch = { keywords: string[]; icon: string };

// ज़्यादा specific keywords पहले, ताकि सही मैच पहले हो जाए
const ICON_RULES: IconMatch[] = [
  // Plumbing / Water
  { keywords: ["mixer tap", "wall mixer", "deck mixer", "diverter mixer", "diverter"], icon: "faucet-variant" },
  { keywords: ["sensor tap", "sensor light"], icon: "motion-sensor" },
  { keywords: ["kitchen tap", "kitchen"], icon: "silverware-fork-knife" },
  { keywords: ["normal tap", "tap"], icon: "faucet" },
  { keywords: ["shower", "hand shower", "overhead shower"], icon: "shower" },
  { keywords: ["flush", "toilet", "commode", "wall basin", "pedestal", "basin"], icon: "toilet" },
  { keywords: ["pipe", "cpvc", "pvc", "gi pipe"], icon: "pipe" },
  { keywords: ["tank", "sintex"], icon: "silo" },
  { keywords: ["geyser", "water heater"], icon: "water-boiler" },
  { keywords: ["purifier", "ro ", "uv purifier"], icon: "water-outline" },
  { keywords: ["sink"], icon: "sink" },
  { keywords: ["motor", "pump repair"], icon: "pump" },

  // Electrical
  { keywords: ["ceiling fan"], icon: "ceiling-fan" },
  { keywords: ["table fan", "wall fan", "exhaust fan"], icon: "fan" },
  { keywords: ["chandelier"], icon: "chandelier" },
  { keywords: ["led light", "tube light", "sensor light"], icon: "lightbulb-on" },
  { keywords: ["dimmer switch", "light switch", "power socket", "usb socket", "switch"], icon: "toggle-switch" },
  { keywords: ["mcb", "elcb", "rccb", "fuse", "short circuit", "earthing"], icon: "fuse" },
  { keywords: ["wiring", "internal wiring"], icon: "cable-data" },
  { keywords: ["stabilizer", "inverter", "ups"], icon: "flash" },

  // Appliances
  { keywords: ["split ac"], icon: "air-conditioner" },
  { keywords: ["window ac"], icon: "air-filter" },
  { keywords: ["gas charging"], icon: "gas-cylinder" },
  { keywords: ["front load", "top load", "washing machine"], icon: "washing-machine" },
  { keywords: ["fridge", "refrigerator", "side-by-side"], icon: "fridge-outline" },
  { keywords: ["microwave", "convection", "solo microwave"], icon: "microwave" },
  { keywords: ["led tv", "smart tv", "television"], icon: "television" },
  { keywords: ["cooling pad", "battery service"], icon: "battery-charging" },

  // Carpenter / Furniture
  { keywords: ["single door", "double door", "new door fit", "door"], icon: "door" },
  { keywords: ["drawer"], icon: "archive-outline" },
  { keywords: ["wardrobe"], icon: "wardrobe-outline" },
  { keywords: ["bed", "king size", "single bed", "double bed"], icon: "bed" },
  { keywords: ["chair"], icon: "chair-rolling" },
  { keywords: ["table", "table top basin"], icon: "table-furniture" },
  { keywords: ["hinge", "latch", "lock change", "shutter"], icon: "hammer-screwdriver" },
  { keywords: ["polish", "duco", "melamine", "pu polish"], icon: "brush" },

  // Cleaning / Home size
  { keywords: ["1 bhk", "1bhk", "2 bhk", "2bhk", "3 bhk", "3bhk", "villa", "apartment", "independent house"], icon: "home-city-outline" },
  { keywords: ["carpet"], icon: "rug" },
  { keywords: ["deep clean", "full house"], icon: "broom" },

  // Generic sizes / tiers (fall back on a neutral icon)
  { keywords: ["small", "large", "basic", "standard", "premium", "modular", "l-shape", "single", "double"], icon: "shape-outline" },
];

export function getVariantIcon(title?: string, fallback: string = "tools"): string {
  if (!title) return fallback;
  const t = title.toLowerCase();
  for (const rule of ICON_RULES) {
    if (rule.keywords.some((k) => t.includes(k))) {
      return rule.icon;
    }
  }
  return fallback;
}

export default getVariantIcon;

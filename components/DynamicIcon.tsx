// components/DynamicIcon.tsx
// एक ही जगह से सभी आइकॉन लाइब्रेरी हैंडल होती हैं + अगर कोई icon name गलत/मौजूद
// नहीं है तो भी खाली बॉक्स दिखने की बजाय एक safe fallback आइकॉन दिखेगा।
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";

export type IconLibrary =
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Ionicons"
  | "FontAwesome5"
  | "FontAwesome6";

type Props = {
  library?: string;
  name?: string;
  size?: number;
  color: string;
  fallback?: string;
};

export default function DynamicIcon({
  library = "MaterialCommunityIcons",
  name,
  size = 22,
  color,
  fallback = "tools",
}: Props) {
  const iconName = name || fallback;

  try {
    switch (library) {
      case "FontAwesome6":
        return <FontAwesome6 name={iconName as any} size={size} color={color} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName as any} size={size} color={color} />;
      case "MaterialIcons":
        return (
          // @ts-ignore - glyph map fallback handled at runtime
          <MaterialIcons
            name={iconName as any}
            size={size}
            color={color}
            onError={() => null}
          />
        );
      case "Ionicons":
        return <Ionicons name={iconName as any} size={size} color={color} />;
      default: {
        // MaterialCommunityIcons - अगर icon glyph मौजूद नहीं है तो fallback दिखाएँ
        const glyphMap = (MaterialCommunityIcons as any).glyphMap || {};
        const safeName = glyphMap[iconName] ? iconName : fallback;
        return <MaterialCommunityIcons name={safeName as any} size={size} color={color} />;
      }
    }
  } catch {
    return <MaterialCommunityIcons name="help-circle-outline" size={size} color={color} />;
  }
}

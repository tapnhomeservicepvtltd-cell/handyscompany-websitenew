// components/home/MoreServicesGrid.tsx
// "More Services" section using custom SVG icons for category tiles with multi-language support.

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import {
  SvgApplianceIcon,
  SvgArrowRightIcon,
  SvgCarpenterIcon,
  SvgElectricalIcon,
  SvgIcon,
  SvgInstallationIcon,
  SvgPaintingIcon,
  SvgPlumbingIcon,
  SvgStarIcon,
} from "@/components/icons/SvgIcons";
import { HomeColors, HomeShadow } from "@/constants/homeTheme";

type Tile = {
  id: string;
  titleEn: string;
  titleHi: string;
  route: string;
  rating: number;
  renderSvg: () => React.ReactNode;
};

const TILES: Tile[] = [
  {
    id: "painting",
    titleEn: "Painting Services",
    titleHi: "पेंटिंग सेवाएं",
    route: "/category/painting",
    rating: 4.7,
    renderSvg: () => <SvgPaintingIcon size={26} color="#0284C7" />,
  },
  {
    id: "electrical",
    titleEn: "Electrical Services",
    titleHi: "इलेक्ट्रिकल सेवाएं",
    route: "/category/electrical",
    rating: 4.8,
    renderSvg: () => <SvgElectricalIcon size={26} color="#00A651" />,
  },
  {
    id: "plumbing",
    titleEn: "Plumbing Services",
    titleHi: "प्लंबिंग सेवाएं",
    route: "/category/plumbing",
    rating: 4.8,
    renderSvg: () => <SvgPlumbingIcon size={26} color="#2563EB" />,
  },
  {
    id: "appliance",
    titleEn: "Appliance Repair",
    titleHi: "अप्लायंस रिपेयर",
    route: "/category/appliance",
    rating: 4.7,
    renderSvg: () => <SvgApplianceIcon size={26} color="#D97706" />,
  },
  {
    id: "installation",
    titleEn: "Installation Services",
    titleHi: "इंस्टॉलेशन सेवाएं",
    route: "/category/installation",
    rating: 4.6,
    renderSvg: () => <SvgInstallationIcon size={26} color="#475569" />,
  },
  {
    id: "carpenter",
    titleEn: "Carpenter Services",
    titleHi: "कारपेंटर सेवाएं",
    route: "/category/carpenter",
    rating: 4.7,
    renderSvg: () => <SvgCarpenterIcon size={26} color="#B45309" />,
  },
];

export default function MoreServicesGrid() {
  const router = useRouter();
  const { t } = useLang();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SvgIcon name="more" size={20} color={HomeColors.more} />
          <Text style={[styles.title, { color: HomeColors.more }]}>
            {t("More Services", "अन्य सेवाएं")}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.viewAllPill, pressed && styles.viewAllPillPressed]}
          onPress={() => router.push("/explore" as any)}
        >
          <Text style={[styles.viewAllText, { color: HomeColors.more }]}>
            {t("View All", "सभी देखें")}
          </Text>
          <SvgArrowRightIcon size={12} color={HomeColors.more} />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {TILES.map((tile) => (
          <Pressable
            key={tile.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push(tile.route as any)}
          >
            <View style={styles.iconBox}>{tile.renderSvg()}</View>
            <Text style={styles.cardLabel} numberOfLines={2}>
              {t(tile.titleEn, tile.titleHi)}
            </Text>
            <View style={styles.ratingPill}>
              <SvgStarIcon size={10} color={HomeColors.star} />
              <Text style={styles.ratingText}>{tile.rating}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 15.5, fontWeight: "800" },
  viewAllPill: { flexDirection: "row", alignItems: "center", gap: 3 },
  viewAllPillPressed: { opacity: 0.6 },
  viewAllText: { fontSize: 12.5, fontWeight: "800" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  card: {
    width: "31.5%",
    backgroundColor: HomeColors.surface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: "0.75%",
    borderWidth: 1,
    borderColor: HomeColors.border,
    ...HomeShadow.soft,
  },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: HomeColors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: HomeColors.text,
    textAlign: "center",
    lineHeight: 14,
    minHeight: 28,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginTop: 6,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: { fontSize: 9.5, fontWeight: "700", color: "#92400E" },
});

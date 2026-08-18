// components/home/ServiceCategorySection.tsx
// Generic "category row" used for Maid / Men Salon / Women Salon /
// Deep Cleaning / Pest Control / Electrical / Plumbing / Appliance / Carpenter sections using SVG icons with multi-language support.

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";
import {
  SvgArrowRightIcon,
  SvgIcon,
  SvgStarIcon,
} from "@/components/icons/SvgIcons";
import { HomeColors, HomeShadow } from "@/constants/homeTheme";
import { AnimatedServiceCard } from "./AnimatedServiceCard";

export type CategoryServiceItem = {
  id: string;
  title: string;
  hindiTitle?: string;
  icon?: string;
  library?: string;
  rating?: number;
  price?: string;
  route?: string;
};

type Props = {
  title: string;
  titleHi?: string;
  headerIcon: string;
  accentColor: string;
  route: string;
  data: CategoryServiceItem[];
};

const CARD_COUNT = 8;

export default function ServiceCategorySection({
  title,
  titleHi,
  headerIcon,
  accentColor,
  route,
  data,
}: Props) {
  const router = useRouter();
  const { t, lang } = useLang();

  if (!data || data.length === 0) return null;

  const items = data.slice(0, CARD_COUNT);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIconWrap, { backgroundColor: `${accentColor}16` }]}> 
            <SvgIcon name={headerIcon} size={18} color={accentColor} />
          </View>
          <Text style={[styles.title, { color: accentColor }]}> 
            {lang === "hi" && titleHi ? titleHi : title}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.viewAllPill, pressed && styles.viewAllPillPressed]}
          onPress={() => router.push(route as any)}
        >
          <Text style={[styles.viewAllText, { color: accentColor }]}>
            {t("View All", "सभी देखें")}
          </Text>
          <SvgArrowRightIcon size={12} color={accentColor} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {items.map((item) => (
          <AnimatedServiceCard 
            key={item.id} 
            item={item} 
            headerIcon={headerIcon} 
            accentColor={accentColor} 
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerIconWrap: { width: 34, height: 34, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 16, fontWeight: "800" },
  viewAllPill: { flexDirection: "row", alignItems: "center", gap: 3 },
  viewAllPillPressed: { opacity: 0.6 },
  viewAllText: { fontSize: 12.5, fontWeight: "800" },
  scrollRow: { paddingLeft: 16, paddingRight: 2 },
});

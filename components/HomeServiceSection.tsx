// components/HomeServiceSection.tsx
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// डायनामिक आइकॉन रेंडरर
const DynamicIcon = ({ library, name, color, size = 24 }: { library: string; name: string; color: string; size?: number }) => {
  if (library === "FontAwesome6") return <FontAwesome6 name={name as any} size={size} color={color} />;
  if (library === "MaterialIcons") return <MaterialIcons name={name as any} size={size} color={color} />;
  if (library === "Ionicons") return <Ionicons name={name as any} size={size} color={color} />;
  return <MaterialCommunityIcons name={name as any} size={size} color={color} />;
};

export default function HomeServiceSection({
  title,
  route,
  data = [],
}: {
  title: string;
  route: string;
  data?: any[];
}) {
  const router = useRouter();

  if (!data || data.length === 0) {
    return null;
  }

  const items = data.slice(0, 6);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleAccent} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.viewAllPill, pressed && styles.viewAllPillPressed]}
          onPress={() => router.push(route as any)}
        >
          <Text style={styles.viewAll}>View All</Text>
          <MaterialIcons name="arrow-forward-ios" size={11} color="#00A651" />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {items.map((item: any, index: number) => {
          const isLabourFree = item.labourFree === true;
          const price = item.price ? String(item.price).replace(/\s*\/.*$/, "") : null;

          return (
            <Pressable
              key={item.id ?? index}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() => router.push(route as any)}
            >
              {isLabourFree && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeBadgeText}>LABOUR FREE</Text>
                </View>
              )}

              <LinearGradient
                colors={["#F0FBF5", "#E1F5EA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBox}
              >
                <DynamicIcon library={item.library || "MaterialCommunityIcons"} name={item.icon} color="#00A651" size={26} />
              </LinearGradient>

              <Text numberOfLines={2} style={styles.label}>
                {item.title}
              </Text>

              <View style={styles.footerRow}>
                {item.rating ? (
                  <View style={styles.ratingPill}>
                    <MaterialCommunityIcons name="star" size={10} color="#F59E0B" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                ) : (
                  <View />
                )}
                {price && <Text style={styles.priceText}>{price}</Text>}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 22,
    marginHorizontal: 12,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleAccent: {
    width: 4,
    height: 16,
    borderRadius: 2,
    backgroundColor: "#00A651",
    marginRight: 8,
  },
  sectionTitle: { fontSize: 15.5, fontWeight: "800", color: "#0F172A", letterSpacing: 0.1 },
  viewAllPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FBF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewAllPillPressed: { opacity: 0.6 },
  viewAll: { fontSize: 12, fontWeight: "700", color: "#00A651" },
  scrollPadding: { paddingHorizontal: 12 },
  card: {
    width: 118,
    alignItems: "flex-start",
    marginHorizontal: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2F1",
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1.5,
  },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  freeBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#003B1C",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 2,
  },
  freeBadgeText: { fontSize: 7, fontWeight: "800", color: "#A7F3D0", letterSpacing: 0.2 },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 15,
    minHeight: 30,
  },
  footerRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: { fontSize: 10, fontWeight: "700", color: "#92400E" },
  priceText: { fontSize: 11, fontWeight: "800", color: "#00A651" },
});

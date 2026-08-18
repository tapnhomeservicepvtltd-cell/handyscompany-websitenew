import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DynamicIcon from "../../components/DynamicIcon";
import { getServiceThumbnail } from "../../constants/serviceThumbnails";
import { serviceDetails } from "../../data/serviceDetails";
import { getCategoryById } from "../../services/api/services";

// हर कैटेगरी का टाइटल (English + Hindi) + फॉलबैक आइकॉन यहाँ रखा गया है
const CATEGORY_META: Record<
  string,
  { title: string; hindiTitle: string; icon: string; library?: string }
> = {
  plumbing: { title: "PLUMBING", hindiTitle: "प्लंबिंग", icon: "pipe-wrench" },
  electrical: { title: "ELECTRICAL", hindiTitle: "इलेक्ट्रिकल", icon: "flash" },
  carpenter: { title: "CARPENTER", hindiTitle: "कारपेंटर", icon: "hammer" },
  appliance: { title: "HOME APPLIANCE", hindiTitle: "होम अप्लायंस", icon: "air-conditioner" },
  cleaning: { title: "DEEP CLEANING", hindiTitle: "डीप क्लीनिंग", icon: "spray-bottle" },
  inspection: { title: "MONTHLY INSPECTION", hindiTitle: "मासिक निरीक्षण", icon: "clipboard-check" },
  maid: { title: "MAID SERVICE", hindiTitle: "मेड सर्विस", icon: "account-tie-woman" },
  men: { title: "MEN'S SALON", hindiTitle: "मेन्स सैलून", icon: "face-man" },
  women: { title: "WOMEN'S SALON", hindiTitle: "वूमेंस सैलून", icon: "face-woman" },
  pest: { title: "PEST CONTROL", hindiTitle: "पेस्ट कंट्रोल", icon: "spider" },
  installation: { title: "INSTALLATION", hindiTitle: "इंस्टॉलेशन", icon: "tools" },
  painting: { title: "PAINTING", hindiTitle: "पेंटिंग", icon: "format-paint" },
};

export default function CategoryScreen() {
  const { type } = useLocalSearchParams();
  const typeKey = (type as string) || "";
  
  const [apiCategory, setApiCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!typeKey) return;
    getCategoryById(typeKey)
      .then(res => {
        setApiCategory(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [typeKey]);

  const meta = apiCategory ? {
      title: apiCategory.name,
      hindiTitle: apiCategory.nameHi,
      icon: apiCategory.icon || CATEGORY_META[typeKey]?.icon || "toolbox",
  } : CATEGORY_META[typeKey] || {
      title: typeKey ? typeKey.toUpperCase() : "SERVICES",
      hindiTitle: "सर्विसेज",
      icon: "toolbox",
  };

  const currentServices = useMemo(() => {
    if (apiCategory?.services) {
      return apiCategory.services;
    }
    const allServices = Object.values(serviceDetails);
    const byCategory = allServices.filter(
      (s: any) => (s.category || "").toString().toLowerCase() === typeKey.toLowerCase()
    );
    if (byCategory.length > 0) return byCategory;
    return allServices.filter((s: any) => (s.id || "").toString().includes(typeKey));
  }, [typeKey, apiCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text style={styles.headerTitle}>{meta.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={currentServices}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <DynamicIcon library="MaterialCommunityIcons" name={meta.icon} size={40} color="#CBD5E1" />
            <Text style={styles.emptyText}>No services available yet.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const thumb = getServiceThumbnail(item.id, typeKey);
          const source = typeof thumb === 'string' ? { uri: thumb } : thumb;
          return (
            <Pressable
              style={({ pressed }) => [styles.gridItem, pressed && styles.gridItemPressed]}
              onPress={() => router.push(`/service/${item.id}` as any)}
            >
              <Image source={source} style={styles.gridImage} resizeMode="cover" />
              <View style={styles.gridTextContainer}>
                <Text style={styles.title} numberOfLines={2}>{item.title || item.name}</Text>
                {(!!item.hindiTitle || !!item.nameHi) && (
                  <Text style={styles.hindiTitle} numberOfLines={1}>{item.hindiTitle || item.nameHi}</Text>
                )}
              </View>
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backBtn: { padding: 4, width: 40 },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#0F172A", letterSpacing: 0.3 },
  listContent: { paddingHorizontal: 8, paddingTop: 16, paddingBottom: 24 },
  gridItem: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
  },
  gridItemPressed: { opacity: 0.7, backgroundColor: "#F8FAFC" },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F1F5F9",
  },
  gridTextContainer: {
    padding: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 10, fontWeight: "700", color: "#0F172A", lineHeight: 14, textAlign: "center" },
  hindiTitle: { fontSize: 9, color: "#64748B", marginTop: 2, textAlign: "center" },
  bookButton: {
    backgroundColor: "#00A651",
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  emptyBox: { alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyText: { marginTop: 12, color: "#94A3B8", fontSize: 14 },
});

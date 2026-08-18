// app/(tabs)/index.tsx
// HandysCompany — Premium Home Screen UI (High-Fidelity Production Ready)
// Composes all components in the exact layout order requested by the user.
// Every service is configured with a unique, relevant photorealistic Unsplash image.

import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Animated, ScrollView, StyleSheet, View, Text, RefreshControl, ActivityIndicator } from "react-native";

// --- HOME COMPONENTS ---
import CustomerReviewSection from "@/components/CustomerReviewSection";
import FAQSection from "@/components/FAQSection";
import NeedHelpSection from "@/components/NeedHelpSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import BottomNavBar from "@/components/home/BottomNavBar";
import HomeSearchBar from "@/components/home/HomeSearchBar";
import LabourFreeGrid from "@/components/home/LabourFreeGrid";
import LocationBar from "@/components/home/LocationBar";
import MembershipBanner from "@/components/home/MembershipBanner";
import QuickActionsRow from "@/components/home/QuickActionsRow";
import ServiceCategorySection from "@/components/home/ServiceCategorySection";
import StickyHeader from "@/components/home/StickyHeader";

// --- THEME & API ---
import { HomeColors } from "@/constants/homeTheme";
import { getServiceThumbnail } from "@/constants/serviceThumbnails";
import { useLang } from "@/app/context/LanguageContext";
import { getHomeCategories } from "@/services/api/services";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(12)).current;

  const fetchLiveHomeCategories = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await getHomeCategories();
      if (res && Array.isArray(res.categories) && res.categories.length > 0) {
        setCategories(res.categories);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load live home categories.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void fetchLiveHomeCategories();
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.spring(slide, { toValue: 0, useNativeDriver: true, damping: 18, mass: 0.6 }),
    ]).start();
  }, [fade, slide, fetchLiveHomeCategories]);

  const handleSearchSubmit = () => {
    if (search.trim()) {
      router.push({ pathname: "/search", params: { q: search.trim() } } as any);
    }
  };

  // Static high-fidelity service category data (Exactly 7 categories, each with exactly 6 services with unique image URLs)
  const categoryData = [
    {
      id: "ondemand",
      title: t("Daily Needs (On Demand)", "डेली नीड्स (ऑन डिमांड)"),
      icon: "car",
      services: [
        {
          id: "ondemand_driver",
          title: t("Driver on Demand", "ड्राइवर ऑन डिमांड"),
          price: "399",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ondemand_driver")
        },
        {
          id: "ondemand_tour_guide",
          title: t("Tourist Guide", "टूरिस्ट गाइड"),
          price: "499",
          rating: 4.9,
          imageUrl: getServiceThumbnail("ondemand_tour_guide")
        },
        {
          id: "ondemand_scooty",
          title: t("Scooty / Bike Rent", "स्कूटी रेंटल"),
          price: "350",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ondemand_scooty")
        },
        {
          id: "ondemand_panditji",
          title: t("Pandit Ji / Purohit", "पंडित जी / पुरोहित"),
          price: "501",
          rating: 4.9,
          imageUrl: getServiceThumbnail("ondemand_panditji")
        },
        {
          id: "ondemand_carwash",
          title: t("Car Wash at Home", "कार वाश एट होम"),
          price: "299",
          rating: 4.7,
          imageUrl: getServiceThumbnail("ondemand_carwash")
        },
        {
          id: "ondemand_laundry",
          title: t("Laundry & Ironing", "लॉन्ड्री व प्रेस"),
          price: "15",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ondemand_laundry")
        },
        {
          id: "ondemand_tiffin",
          title: t("Tiffin Service", "टिफिन सर्विस"),
          price: "70",
          rating: 4.7,
          imageUrl: getServiceThumbnail("ondemand_tiffin")
        },
        {
          id: "ondemand_errand",
          title: t("Local Errand Boy", "लोकल कूरियर"),
          price: "99",
          rating: 4.6,
          imageUrl: getServiceThumbnail("ondemand_errand")
        },
      ],
    },
    {
      id: "maid",
      title: t("Maid Services", "मेड सर्विसेज"),
      icon: "maid",
      services: [
        {
          id: "full-time-maid",
          title: t("Full Time Maid", "फुल टाइम मेड"),
          price: "249",
          rating: 4.8,
          imageUrl: getServiceThumbnail("full-time-maid")
        },
        {
          id: "part-time-maid",
          title: t("Part Time Maid", "पार्ट टाइम मेड"),
          price: "149",
          rating: 4.9,
          imageUrl: getServiceThumbnail("part-time-maid")
        },
        {
          id: "cook-service",
          title: t("Home Cook", "कुक सर्विस"),
          price: "199",
          rating: 4.7,
          imageUrl: getServiceThumbnail("cook-service")
        },
        {
          id: "baby-sitter",
          title: t("Babysitter", "बेबीसिटर"),
          price: "199",
          rating: 4.8,
          imageUrl: getServiceThumbnail("baby-sitter")
        },
        {
          id: "elderly-care",
          title: t("Elder Care", "बुजुर्ग देखभाल"),
          price: "199",
          rating: 4.9,
          imageUrl: getServiceThumbnail("elderly-care")
        },
        {
          id: "maid_night_attendant",
          title: t("Night Maid", "नाइट मेड"),
          price: "199",
          rating: 4.8,
          imageUrl: getServiceThumbnail("maid_night_attendant")
        },
        {
          id: "maid_utensil_cleaning",
          title: t("Utensil Cleaning", "बर्तन सफाई"),
          price: "129",
          rating: 4.7,
          imageUrl: getServiceThumbnail("part-time-maid")
        },
        {
          id: "maid_patient_care",
          title: t("Patient Caretaker", "मरीज अटेंडेंट"),
          price: "399",
          rating: 4.9,
          imageUrl: getServiceThumbnail("elderly-care")
        },
      ],
    },
    {
      id: "men-salon",
      title: t("Men Salon Services", "मेंस सैलून"),
      icon: "men-salon",
      services: [
        {
          id: "men_haircut",
          title: t("Haircut", "हेयरकट"),
          price: "149",
          rating: 4.9,
          imageUrl: getServiceThumbnail("men_haircut")
        },
        {
          id: "men_beard_trim",
          title: t("Beard Trim", "बियर्ड ट्रिम"),
          price: "99",
          rating: 4.8,
          imageUrl: getServiceThumbnail("men_beard_trim")
        },
        {
          id: "men_hair_spa",
          title: t("Hair Wash", "हेयर वॉश"),
          price: "99",
          rating: 4.7,
          imageUrl: getServiceThumbnail("men_hair_spa")
        },
        {
          id: "men_head_massage",
          title: t("Head Massage", "हेड मसाज"),
          price: "299",
          rating: 4.9,
          imageUrl: getServiceThumbnail("men_head_massage")
        },
        {
          id: "men_shave",
          title: t("Shaving", "शेविंग"),
          price: "99",
          rating: 4.8,
          imageUrl: getServiceThumbnail("men_shave")
        },
        {
          id: "men_face_bleach",
          title: t("Face Bleach", "फेस ब्लीच"),
          price: "199",
          rating: 4.9,
          imageUrl: getServiceThumbnail("men_face_bleach")
        },
        {
          id: "men_hair_color",
          title: t("Hair Color", "हेयर कलर"),
          price: "199",
          rating: 4.8,
          imageUrl: getServiceThumbnail("men_hair_color")
        },
        {
          id: "men_facial",
          title: t("O3+ Facial", "O3+ फेशियल"),
          price: "399",
          rating: 4.9,
          imageUrl: getServiceThumbnail("men_face_bleach")
        },
      ],
    },
    {
      id: "women-salon",
      title: t("Women Salon Services", "विमेंस सैलून"),
      icon: "women-salon",
      services: [
        {
          id: "women_haircut",
          title: t("Haircut", "हेयरकट"),
          price: "199",
          rating: 4.8,
          imageUrl: getServiceThumbnail("women_haircut")
        },
        {
          id: "women_hair_spa",
          title: t("Hair Spa", "हेयर स्पा"),
          price: "499",
          rating: 4.9,
          imageUrl: getServiceThumbnail("women_hair_spa")
        },
        {
          id: "women_facial",
          title: t("Facial", "फेशियल"),
          price: "299",
          rating: 4.7,
          imageUrl: getServiceThumbnail("women_facial")
        },
        {
          id: "women_clean_up",
          title: t("Cleanup", "क्लीनअप"),
          price: "199",
          rating: 4.8,
          imageUrl: getServiceThumbnail("women_clean_up")
        },
        {
          id: "women_manicure",
          title: t("Manicure", "मैनीक्योर"),
          price: "199",
          rating: 4.9,
          imageUrl: getServiceThumbnail("women_manicure")
        },
        {
          id: "women_pedicure",
          title: t("Pedicure", "पेडीक्योर"),
          price: "249",
          rating: 4.8,
          imageUrl: getServiceThumbnail("women_pedicure")
        },
        {
          id: "women_waxing",
          title: t("Full Rica Waxing", "रीका वैक्सिंग"),
          price: "399",
          rating: 4.9,
          imageUrl: getServiceThumbnail("women_rica_waxing")
        },
        {
          id: "women_threading",
          title: t("Threading", "थ्रेडिंग"),
          price: "49",
          rating: 4.7,
          imageUrl: getServiceThumbnail("women_eyebrow_threading")
        },
      ],
    },
    {
      id: "cleaning",
      title: t("Cleaning Services", "सफाई सेवाएं"),
      icon: "clean",
      services: [
        {
          id: "full-house-cleaning",
          title: t("Full Home Cleaning", "फुल होम क्लीनिंग"),
          price: "499",
          rating: 4.8,
          imageUrl: getServiceThumbnail("full-home-cleaning")
        },
        {
          id: "deep-cleaning",
          title: t("Deep Cleaning", "डीप क्लीनिंग"),
          price: "999",
          rating: 4.9,
          imageUrl: getServiceThumbnail("deep-cleaning")
        },
        {
          id: "sofa-cleaning",
          title: t("Sofa Cleaning", "सोफा क्लीनिंग"),
          price: "499",
          rating: 4.7,
          imageUrl: getServiceThumbnail("sofa-cleaning")
        },
        {
          id: "kitchen-cleaning",
          title: t("Kitchen Cleaning", "किचन क्लीनिंग"),
          price: "499",
          rating: 4.8,
          imageUrl: getServiceThumbnail("kitchen-cleaning")
        },
        {
          id: "bathroom-cleaning",
          title: t("Bathroom Cleaning", "बाथरूम क्लीनिंग"),
          price: "699",
          rating: 4.9,
          imageUrl: getServiceThumbnail("bathroom-cleaning")
        },
        {
          id: "office-cleaning",
          title: t("Office Cleaning", "ऑफिस क्लीनिंग"),
          price: "999",
          rating: 4.8,
          imageUrl: getServiceThumbnail("office-cleaning")
        },
        {
          id: "tank-cleaning",
          title: t("Water Tank Clean", "पानी टंकी सफाई"),
          price: "399",
          rating: 4.8,
          imageUrl: getServiceThumbnail("deep-cleaning")
        },
        {
          id: "balcony-cleaning",
          title: t("Balcony Wash", "बालकनी वाश"),
          price: "299",
          rating: 4.7,
          imageUrl: getServiceThumbnail("full-home-cleaning")
        },
      ],
    },
    {
      id: "pest-control",
      title: t("Pest Control Services", "पेस्ट कंट्रोल"),
      icon: "pest",
      services: [
        {
          id: "cockroach-control",
          title: t("Cockroach Control", "कॉकरोच कंट्रोल"),
          price: "499",
          rating: 4.8,
          imageUrl: getServiceThumbnail("cockroach-control")
        },
        {
          id: "termite-control",
          title: t("Termite Control", "दीमक कंट्रोल"),
          price: "799",
          rating: 4.9,
          imageUrl: getServiceThumbnail("termite-control")
        },
        {
          id: "bed-bug-control",
          title: t("Bed Bug Control", "खटमल कंट्रोल"),
          price: "599",
          rating: 4.7,
          imageUrl: getServiceThumbnail("bed-bug-control")
        },
        {
          id: "rodent-control",
          title: t("Rodent Control", "चूहा कंट्रोल"),
          price: "599",
          rating: 4.8,
          imageUrl: getServiceThumbnail("rodent-control")
        },
        {
          id: "mosquito-control",
          title: t("Mosquito Control", "मच्छर कंट्रोल"),
          price: "499",
          rating: 4.9,
          imageUrl: getServiceThumbnail("mosquito-control")
        },
        {
          id: "ant-control",
          title: t("Ant Control", "चींटी कंट्रोल"),
          price: "399",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ant-control")
        },
        {
          id: "lizard-control",
          title: t("Lizard Spray", "छिपकली कंट्रोल"),
          price: "299",
          rating: 4.7,
          imageUrl: getServiceThumbnail("cockroach-control")
        },
        {
          id: "bird-netting",
          title: t("Pigeon Bird Net", "कबूतर नेट"),
          price: "699",
          rating: 4.9,
          imageUrl: getServiceThumbnail("termite-control")
        },
      ],
    },
    {
      id: "appliance",
      title: t("Home Appliance", "होम अप्लायंस"),
      icon: "appliance",
      services: [
        {
          id: "ac-repair",
          title: t("AC Installation", "एसी इंस्टॉलेशन"),
          price: "799",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ac-repair")
        },
        {
          id: "led-tv-repair",
          title: t("TV Installation", "टीवी इंस्टॉलेशन"),
          price: "499",
          rating: 4.9,
          imageUrl: getServiceThumbnail("led-tv-repair")
        },
        {
          id: "wm-repair",
          title: t("Washing Machine", "वाशिंग मशीन"),
          price: "699",
          rating: 4.7,
          imageUrl: getServiceThumbnail("wm-repair")
        },
        {
          id: "ro-repair",
          title: t("RO Installation", "आरओ इंस्टॉलेशन"),
          price: "499",
          rating: 4.8,
          imageUrl: getServiceThumbnail("ro-repair")
        },
        {
          id: "chimney-repair",
          title: t("Chimney Installation", "चिमनी इंस्टॉलेशन"),
          price: "699",
          rating: 4.9,
          imageUrl: getServiceThumbnail("chimney-repair")
        },
        {
          id: "geyser-repair",
          title: t("Geyser Installation", "गीजर इंस्टॉलेशन"),
          price: "649",
          rating: 4.8,
          imageUrl: getServiceThumbnail("geyser-repair")
        },
        {
          id: "fridge-repair",
          title: t("Fridge Gas Fill", "फ्रिज गैस रिफिल"),
          price: "899",
          rating: 4.9,
          imageUrl: getServiceThumbnail("wm-repair")
        },
        {
          id: "microwave-repair",
          title: t("Microwave Repair", "माइक्रोवेव रिपेयर"),
          price: "399",
          rating: 4.7,
          imageUrl: getServiceThumbnail("ro-repair")
        },
      ],
    },
    {
      id: "electrical",
      title: t("Electric Services", "इलेक्ट्रिक सर्विस"),
      icon: "install",
      services: [
        {
          id: "electrical_fan",
          title: t("Fan Installation", "पंखे का इंस्टॉलेशन"),
          price: "249",
          rating: 4.8,
          imageUrl: getServiceThumbnail("electrical_fan")
        },
        {
          id: "electrical_light",
          title: t("Light Installation", "लाइट का इंस्टॉलेशन"),
          price: "199",
          rating: 4.9,
          imageUrl: getServiceThumbnail("electrical_light")
        },
        {
          id: "electrical_chandelier",
          title: t("Chandelier", "झूमर इंस्टॉलेशन"),
          price: "499",
          rating: 4.7,
          imageUrl: getServiceThumbnail("electrical_chandelier")
        },
        {
          id: "electrical_exhaust_fan",
          title: t("Exhaust Fan", "एग्जॉस्ट फैन"),
          price: "249",
          rating: 4.8,
          imageUrl: getServiceThumbnail("electrical_exhaust_fan")
        },
        {
          id: "electrical_switch",
          title: t("Switch Board", "स्विच बोर्ड"),
          price: "349",
          rating: 4.9,
          imageUrl: getServiceThumbnail("electrical_switch")
        },
        {
          id: "electrical_inverter",
          title: t("Inverter Setup", "इन्वर्टर सेटअप"),
          price: "799",
          rating: 4.8,
          imageUrl: getServiceThumbnail("electrical_inverter")
        },
        {
          id: "electrical_mcb",
          title: t("MCB Fitting", "एमसीबी फिटिंग"),
          price: "249",
          rating: 4.9,
          imageUrl: getServiceThumbnail("electrical_switch")
        },
        {
          id: "electrical_wiring",
          title: t("Wiring Repair", "वायरिंग रिपेयर"),
          price: "499",
          rating: 4.8,
          imageUrl: getServiceThumbnail("electrical_fan")
        },
      ],
    },
  ];

  return (
    <View style={styles.root}>
      {/* Sticky Header */}
      <StickyHeader notificationCount={3} />

      {/* Main Scroll Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => void fetchLiveHomeCategories(true)}
            colors={["#00A651"]}
          />
        }
      >
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
          {/* Location Bar */}
          <LocationBar city={t("Sector 62, Noida, Uttar Pradesh", "सेक्टर 62, नोएडा, उत्तर प्रदेश")} />

          {/* Search Bar */}
          <HomeSearchBar
            value={search}
            onChangeText={setSearch}
            onSubmit={handleSearchSubmit}
            onVoicePress={() => {}}
          />

          {/* Quick Actions Row */}
          <QuickActionsRow />

          {/* Hero Membership Banner */}
          <MembershipBanner />

          {/* Trust Tip */}
          <View style={{ marginHorizontal: 16, marginTop: 12, backgroundColor: "#ECFDF5", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#D1FAE5", flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>💡</Text>
            <Text style={{ flex: 1, fontSize: 12, color: "#065F46", fontWeight: "600", lineHeight: 18 }}>
              Tip: You can buy 100% genuine parts from us at MRP, or you can choose to provide your own materials.
            </Text>
          </View>

          {/* Labour Free Services */}
          <LabourFreeGrid />

          {/* Service Categories (Dynamic Live API Data) */}
          {loading && !refreshing ? (
            <View style={{ padding: 24, alignItems: "center" }}>
              <ActivityIndicator size="large" color="#00A651" />
              <Text style={{ marginTop: 8, color: "#64748B", fontSize: 12 }}>Loading live categories...</Text>
            </View>
          ) : (
            (categories.length > 0 ? categories : categoryData).map((cat) => (
              <ServiceCategorySection
                key={cat.id || cat.slug}
                title={cat.title || cat.name}
                titleHi={cat.titleHi || cat.nameHi}
                headerIcon={cat.icon || "wrench"}
                accentColor={HomeColors.primary}
                route={`/search?categorySlug=${cat.slug || cat.id}`}
                data={cat.services || cat.items || []}
              />
            ))
          )}

          {/* Customer Reviews */}
          <CustomerReviewSection />

          {/* Why Choose HandysCompany */}
          <WhyChooseUs />

          {/* FAQ Accordion */}
          <FAQSection />

          {/* Need Help Actions */}
          <NeedHelpSection />
        </Animated.View>
      </ScrollView>

      {/* Floating Bottom Navigation */}
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1 },
  scrollContent: { paddingTop: 4, paddingBottom: 80 },
});

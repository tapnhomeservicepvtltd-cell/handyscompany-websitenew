import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"; // 🌟 नेविगेशन के लिए इम्पोर्ट किया
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    title: "FREE",
    picUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150",
    gradientColors: ["#15803D", "#166534"], 
    textColor: "#FACC15",
    isSpecialFree: true,
    // 🌟 फ्री सर्विस पर क्लिक करने के लिए रूट पाथ
    route: "/booking/date?serviceId=electrician" // या जो भी आपकी लेबर फ्री पैरेंट कैटेगरी आईडी हो
  },
  {
    title: "MAID",
    picUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150",
    gradientColors: ["#F3E8FF", "#FFFFFF"], 
    textColor: "#111827",
    route: "/category/maid" // मेड सर्विस स्क्रीन का पाथ
  },
  {
    title: "MEN",
    picUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=150",
    gradientColors: ["#EFF6FF", "#FFFFFF"], 
    textColor: "#111827",
    route: "/category/men" // मेन्स सैलून स्क्रीन का पाथ
  },
  {
    title: "WOMEN",
    picUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150",
    gradientColors: ["#FDF2F8", "#FFFFFF"], 
    textColor: "#111827",
    route: "/category/women" // वूमेंस सैलून स्क्रीन का पाथ
  },
  {
    title: "ON DEMAND",
    picUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150",
    gradientColors: ["#FAF5FF", "#FFFFFF"],
    textColor: "#111827",
    route: "/explore" // ऑन डिमांड (सभी सर्विसेस) स्क्रीन का पाथ
  },
  {
    title: "MORE",
    picUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=150",
    gradientColors: ["#F8FAFC", "#FFFFFF"],
    textColor: "#111827",
    route: "/explore" // मोर/मेन्यू स्क्रीन का पाथ
  },
];

export default function TopCategoryBar() {
  const router = useRouter(); // 🌟 राउटर हुक को इनिशियलाइज़ किया

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((item) => (
        <TouchableOpacity
          key={item.title}
          activeOpacity={0.85}
          style={styles.cardWrapper}
          // 🌟 ऑन प्रेस इवेंट: जिस कैटेगरी पर क्लिक होगा उसका रूट ओपन हो जाएगा
          onPress={() => {
            if (item.route) {
              router.push(item.route as any);
            }
          }}
        >
          <LinearGradient
            colors={item.gradientColors as [string, string, ...string[]]}
            style={styles.cardGradient}
          >
            <View style={[
              styles.imageContainer,
              item.isSpecialFree && styles.freeImageContainer
            ]}>
              <Image
                source={{ uri: item.picUrl }}
                style={[
                  styles.pic,
                  item.isSpecialFree ? styles.freePic : styles.regularPic
                ]}
                resizeMode="cover"
              />
            </View>

            <Text numberOfLines={1} style={[styles.title, { color: item.textColor }]}>
              {item.title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#F8FAFC", 
  },
  cardWrapper: {
    marginRight: 12,
    borderRadius: 20,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardGradient: {
    width: 84,
    height: 78,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 6,
  },
  freeImageContainer: {
    shadowColor: "#FACC15", 
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  pic: {
    width: 38,
    height: 38,
    borderWidth: 1.5,
  },
  regularPic: {
    borderRadius: 12, 
    borderColor: "#FFFFFF",
  },
  freePic: {
    borderRadius: 19, 
    borderColor: "#FACC15", 
    borderWidth: 2,
  },
  title: {
    fontSize: 9.5,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.4,
  },
});
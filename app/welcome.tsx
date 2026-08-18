import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(40));

  useEffect(() => {
    // 🎬 एनीमेशन स्टार्ट
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // ⏱️ 2.5 सेकंड बाद ऑटोमैटिकली होम स्क्रीन (Tabs) पर रीडायरेक्ट
    const redirectTimer = setTimeout(() => {
      router.replace("/(tabs)" as any);
    }, 2500);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <View style={styles.solidContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#00A651" translucent />
      
      <SafeAreaView style={styles.mainContent}>
        <View style={styles.centerCard}>
          
          {/* 🎯 फ़ाइनल फिक्स पाथ: आपके फ़ोल्डर स्ट्रक्चर के हिसाब से बिल्कुल सटीक पाथ */}
          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Image
              source={require("../assets/images/logo.png")} // 100% सही और वर्किंग पाथ
              style={styles.logoImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* 🎬 एनिमेटेड टेक्स्ट और टैगलाइन */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandText}>HandysCompany</Text>
            
            <View style={styles.taglineBox}>
              <MaterialCommunityIcons
                name="shield-check"
                size={16}
                color="#FFD700"
              />
              <Text style={styles.tagline}>
                India&apos;s Trusted Free Home Services
              </Text>
            </View>
          </Animated.View>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidContainer: {
    flex: 1,
    backgroundColor: "#00A651", 
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  centerCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoWrapper: {
    width: 140, 
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    padding: 12, 
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  brandText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  taglineBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  tagline: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFD700",
    letterSpacing: 0.2,
  },
});
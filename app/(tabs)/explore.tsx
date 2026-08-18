import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLang } from "../context/LanguageContext"; // 🎯 सही रिलेटिव पाथ

export default function ExploreScreen() {
  const { t } = useLang();

  return (
    <View style={styles.container}>
      {/* हेडर */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("Explore Services", "सेवाएं एक्सप्लोर करें")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Ionicons name="search-outline" size={40} color="#00A651" />
          <Text style={styles.cardTitle}>{t("Looking for something?", "कुछ ढूंढ रहे हैं क्या भाई?")}</Text>
          <Text style={styles.cardDesc}>
            {t(
              "HandysCompany provides top-notch home maintenance, repairs, and deep cleaning services at your doorstep.",
              "हैंडीजकंपनी आपके दरवाजे पर बेहतरीन होम मेंटेनेंस, रिपेयरिंग और डीप क्लीनिंग सेवाएं प्रदान करती है।"
            )}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{t("💡 Our Promise", "💡 हमारा वादा")}</Text>
          <Text style={styles.infoText}>• {t("20 Minutes Quick Response", "20 मिनट के अंदर त्वरित प्रतिक्रिया")}</Text>
          <Text style={styles.infoText}>• {t("Fully Background-Verified Pros", "पूरी तरह से बैकग्राउंड-वेरिफाइड प्रोफेशनल्स")}</Text>
          <Text style={styles.infoText}>• {t("100% Satisfaction Guaranteed", "100% संतुष्टि की पूरी गारंटी")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7FB' },
  header: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#EFEFEF', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#11111F' },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#EBEBEB', marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 10, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 18 },
  infoBox: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#EBEBEB' },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#11a644', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#444', lineHeight: 22, fontWeight: '600' },
});
// components/FAQSection.tsx
// Accordion section for FAQ displaying top 3 questions in rounded white cards.

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLang } from "@/app/context/LanguageContext";

export default function FAQSection() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "How does HandysCompany Membership work?",
      qHi: "मेंबरशिप कैसे काम करती है?",
      aEn: "Pay ₹699 once and enjoy labour charges free on all eligible services for 6 months. A nominal visit charge of ₹49 applies. Material cost is extra.",
      aHi: "एक बार ₹699 का भुगतान करें और 6 महीने के लिए योग्य सेवाओं पर मुफ्त लेबर चार्ज का आनंद लें। ₹49 का नाममात्र का विज़िट चार्ज लागू होता है। सामग्री लागत अतिरिक्त है।",
    },
    {
      qEn: "Are the technicians verified?",
      qHi: "क्या तकनीशियन सत्यापित हैं?",
      aEn: "Yes. Every technician undergoes rigorous background verification, police ID check, and professional training before dispatch.",
      aHi: "हाँ। प्रत्येक तकनीशियन का कठोर पृष्ठभूमि सत्यापन, पुलिस आईडी जांच और भेजने से पहले पेशेवर प्रशिक्षण होता है।",
    },
    {
      qEn: "What is the cancellation policy?",
      qHi: "रद्दीकरण नीति क्या है?",
      aEn: "You can cancel or reschedule your booking free of charge at any time before the technician is dispatched.",
      aHi: "तकनीशियन के भेजे जाने से पहले आप किसी भी समय अपनी बुकिंग को मुफ्त में रद्द या पुनर्निर्धारित कर सकते।",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t("Frequently Asked Questions", "अक्सर पूछे जाने वाले प्रश्न")}</Text>

      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <Pressable
            key={index}
            style={[styles.card, isOpen && styles.cardOpen]}
            onPress={() => setOpenIndex(isOpen ? null : index)}
          >
            <View style={styles.header}>
              <Text style={styles.question}>{t(item.qEn, item.qHi)}</Text>
              <Ionicons
                name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                size={18}
                color="#0E9D47"
              />
            </View>

            {isOpen && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{t(item.aEn, item.aHi)}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardOpen: {
    borderColor: "#E8F5E9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: "800",
    color: "#1A1A1A",
    paddingRight: 10,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  answer: {
    fontSize: 12,
    lineHeight: 18,
    color: "#757575",
    fontWeight: "600",
  },
});
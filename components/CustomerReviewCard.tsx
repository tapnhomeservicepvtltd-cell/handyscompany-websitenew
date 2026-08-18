import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLang } from "../app/context/LanguageContext";

// 🌟 SMART UNION TYPE: Dono tarah ke review data modules ko support karne ke liye
export interface SafeReviewItem {
  userName?: string;
  name?: string; // Saloon target path compatibility
  photo?: string;
  rating: number;
  cityNameEn?: string;
  cityNameHi?: string;
  verified?: boolean;
  serviceDate?: string;
  serviceNameEn?: string;
  serviceNameHi?: string;
  reviewTextEn?: string;
  reviewTextHi?: string;
  comment?: string; // Saloon target path compatibility
  helpful?: number;
}

interface ReviewCardProps {
  item: SafeReviewItem;
}

export default function ReviewCard({ item }: ReviewCardProps) {
  const { t } = useLang();
  
  // 🌟 Safe Fallbacks Mapping: Taki purana aur naya data seamlessly binding handle kare
  const finalName = item.userName || item.name || t("Anonymous", "अनाम यूजर");
  const finalComment = item.reviewTextEn ? t(item.reviewTextEn, item.reviewTextHi || "") : (item.comment || "");
  const finalCity = item.cityNameEn ? t(item.cityNameEn, item.cityNameHi || "") : t("Verified Location", "सत्यापित स्थान");
  const finalService = item.serviceNameEn ? t(item.serviceNameEn, item.serviceNameHi || "") : t("Expert Service", "विशेषज्ञ सेवा");
  const isVerified = item.verified !== undefined ? item.verified : true; // Default to true for premium layout

  // 🌟 इंटरएक्टिविटी: हेल्पफुल बटन को क्लिकेबल बनाने के लिए लोकल स्टेट
  const [isHelpfulPressed, setIsHelpfulPressed] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(item.helpful || 0);

  const handleHelpfulPress = () => {
    if (isHelpfulPressed) {
      setHelpfulCount((prev) => prev - 1);
    } else {
      setHelpfulCount((prev) => prev + 1);
    }
    setIsHelpfulPressed(!isHelpfulPressed);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={14}
        color="#FACC15" // 🌟 UC-सटीक मस्टर्ड गोल्ड कलर
        style={styles.starSpacing}
      />
    ));
  };

  return (
    <View style={styles.card}>
      {/* ऊपरी हिस्सा: यूजर अवतार, नाम और वेरिफिकेशन */}
      <View style={styles.headerRow}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarCircleFallback}>
            <Text style={styles.avatarText}>
              {finalName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.userMeta}>
          <Text style={styles.userName}>{finalName}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={12} color="#64748B" />
            <Text style={styles.locationText} numberOfLines={1}>
              {finalCity}
            </Text>
          </View>
        </View>

        {isVerified && (
          <View style={styles.verifiedBadge}>
            <MaterialCommunityIcons name="check-decagram" size={14} color="#00A651" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>

      {/* रेटिंग्स और डेट लाइन */}
      <View style={styles.ratingRow}>
        <View style={styles.starsWrapper}>{renderStars(item.rating)}</View>
        <Text style={styles.dateText}>{item.serviceDate || t("Recent", "हाल ही में")}</Text>
      </View>

      {/* टैग्स: सिलेक्टेड转换 सर्विस और मेंबरशिप स्टेटस */}
      <View style={styles.premiumTagRow}>
        <View style={styles.serviceTag}>
          <Text style={styles.serviceTagText} numberOfLines={1}>
            {finalService}
          </Text>
        </View>
        
        <View style={styles.memberBadge}>
          <MaterialCommunityIcons name="shield-crown-outline" size={13} color="#00A651" />
          <Text style={styles.memberBadgeText}>Member</Text>
        </View>
      </View>

      {/* कस्टमर रिव्यू टेक्स्ट */}
      <Text style={styles.reviewBody}>
        &quot;{finalComment}&quot;
      </Text>

      {/* HandysCompany की तरफ से आधिकारिक जवाब (Reply) */}
      <View style={styles.replyBox}>
        <View style={styles.replyHeader}>
          <MaterialCommunityIcons name="hand-heart" size={13} color="#00A651" />
          <Text style={styles.replyHeaderPrefix}>HandysCompany Response</Text>
        </View>
        <Text style={styles.replyBodyText}>
          {t(
            "Thank you for trusting us! We will keep serving you premium quality experience.", 
            "हम पर भरोसा करने के लिए धन्यवाद! हम आपको बेहतरीन अनुभव देते रहेंगे।"
          )}
        </Text>
      </View>

      {/* डिवाइडर */}
      <View style={styles.thinDivider} />

      {/* निचला हिस्सा: इंटरैक्टिव Helpful बटन */}
      <View style={styles.helpfulRow}>
        <TouchableOpacity 
          style={[
            styles.helpfulButton,
            isHelpfulPressed && styles.helpfulButtonPressed
          ]}
          activeOpacity={0.7}
          onPress={handleHelpfulPress}
        >
          <MaterialCommunityIcons 
            name={isHelpfulPressed ? "thumb-up" : "thumb-up-outline"} 
            size={13} 
            color={isHelpfulPressed ? "#00A651" : "#475569"} 
          />
          <Text style={[
            styles.helpfulText,
            isHelpfulPressed && styles.helpfulTextPressed
          ]}>
            {helpfulCount} {t("Helpful", "मददगार")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E2E8F0",
  },
  avatarCircleFallback: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#00A651",
  },
  userMeta: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#0F172A",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  locationText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    marginLeft: 2,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedText: {
    color: "#00A651",
    fontSize: 9.5,
    fontWeight: "800",
    marginLeft: 3,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  starsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  starSpacing: {
    marginRight: 1,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
  },
  premiumTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
    marginTop: 10,
  },
  serviceTag: {
    backgroundColor: "#F8FAFC",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  serviceTagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#475569",
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  memberBadgeText: {
    color: "#1D4ED8",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 3,
  },
  reviewBody: {
    fontSize: 13,
    fontWeight: "500",
    color: "#334155",
    lineHeight: 19,
    marginTop: 10,
  },
  replyBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#E2E8F0",
    padding: 10,
    marginTop: 12,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  replyHeaderPrefix: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1E293B",
    marginLeft: 4,
  },
  replyBodyText: {
    fontSize: 11.5,
    fontWeight: "500",
    color: "#64748B",
    lineHeight: 16,
  },
  thinDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginTop: 12,
    marginBottom: 10,
  },
  helpfulRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpfulButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  helpfulButtonPressed: {
    backgroundColor: "#E6F6ED",
    borderColor: "#00A651",
  },
  helpfulText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    marginLeft: 4,
  },
  helpfulTextPressed: {
    color: "#00A651",
  },
});
// components/home/AnimatedServiceCard.tsx
// High-fidelity service card with realistic photography, rating, price and book button.

import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SvgStarIcon } from '@/components/icons/SvgIcons';
import { HomeColors } from '@/constants/homeTheme';
import { useLang } from '@/app/context/LanguageContext';
import { getServiceThumbnail } from '@/constants/serviceThumbnails';

type AnimatedServiceCardProps = {
  item: any;
  headerIcon: string;
  accentColor: string;
};



export function AnimatedServiceCard({ item, headerIcon, accentColor }: AnimatedServiceCardProps) {
  const router = useRouter();
  const { t, lang } = useLang();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const itemTarget = item.route || `/service/${item.id}`;
  const displayTitle = lang === "hi" && item.hindiTitle ? item.hindiTitle : item.title || item.name;

  // Resolve photo URL
  const photoUrl =
    item.imageUrl ||
    item.picUrl ||
    getServiceThumbnail(item.id, headerIcon);

  const imageSource = typeof photoUrl === 'string' ? { uri: photoUrl } : photoUrl;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(itemTarget as any)}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Large Rounded Photo at top */}
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource}
            style={styles.serviceImage}
            resizeMode="cover"
          />
        </View>

        {/* Text Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.cardLabel} numberOfLines={2}>
            {displayTitle}
          </Text>

          {/* Rating and Starting Price Row */}
          <View style={styles.cardFooter}>
            <View style={styles.ratingPill}>
              <SvgStarIcon size={10} color={HomeColors.star} />
              <Text style={styles.ratingText}>{item.rating || "4.8"}</Text>
            </View>
            {item.price || item.basePrice || item.startingPrice ? (
              <Text style={styles.priceText} numberOfLines={1}>
                ₹{item.price || item.basePrice || item.startingPrice}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Green Book Button */}
        <View style={[styles.bookButton, { backgroundColor: HomeColors.primary }]}>
          <Text style={styles.bookButtonText}>{t("Book →", "बुक करें →")}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 145,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    justifyContent: "space-between",
    minHeight: 220,
  },
  imageWrapper: {
    width: "100%",
    height: 96,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "#F5F5F5",
  },
  serviceImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 16,
    height: 32,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 213, 79, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0E9D47",
  },
  bookButton: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 11.5,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

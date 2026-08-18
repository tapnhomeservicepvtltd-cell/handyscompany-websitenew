import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");
// Card width fix to stop stretching layouts
const CARD_WIDTH = width - 28; 

const banners = [
  {
    id: "1",
    title: "FREE Home Services",
    subtitle: "Pay ₹699 Once\nEnjoy 6 Months",
    color: "#00A651",
    icon: "home",
  },
  {
    id: "2",
    title: "Labour FREE",
    subtitle: "₹49 Visit Charge\nMaterial Extra",
    color: "#0EA5E9",
    icon: "construct",
  },
  {
    id: "3",
    title: "20 Minutes Response",
    subtitle: "Fast & Verified Professionals",
    color: "#F59E0B",
    icon: "flash",
  },
];

export default function BannerSlider() {
  const listRef = useRef<FlatList>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (current + 1) % banners.length;
      
      // ✅ Added safe checking before scrolling
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index: next,
          animated: true,
        });
        setCurrent(next);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [current]);

  // ✅ Added onViewableItemsChanged to safe-track manual scrolls
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrent(viewableItems[0].index || 0);
    }
  }).current;

  return (
    <View>
      <FlatList
        ref={listRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewabilityConfig}
        // ✅ CRITICAL FIX: getItemLayout explicitly tells dimensions to framework
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + 12, // width + total horizontal margins
          offset: (CARD_WIDTH + 12) * index,
          index,
        })}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: item.color },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.subtitle}>
                {item.subtitle}
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  View Plans
                </Text>
              </TouchableOpacity>
            </View>

            <Ionicons
              name={item.icon as any}
              size={70}
              color="#FFFFFF"
            />
          </View>
        )}
      />

      <View style={styles.dots}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              current === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 28,
    marginHorizontal: 6,
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },

  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "900",
  },

  subtitle: {
    color: "#FFF",
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },

  button: {
    marginTop: 18,
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#00A651",
    fontWeight: "800",
    fontSize: 14,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: "#00A651",
  },
});
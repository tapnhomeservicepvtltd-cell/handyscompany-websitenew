import React, { memo, useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width < 370 ? 74 : width < 410 ? 80 : 86;

type CategoryType =
  | "free"
  | "maid"
  | "men"
  | "women"
  | "ondemand"
  | "more";

interface CategoryItem {
  id: CategoryType;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  route: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "free",
    title: "FREE",
    icon: "gift-outline",
    color: "#00A651",
    route: "/category/free",
  },
  {
    id: "maid",
    title: "MAID",
    icon: "account-tie-woman",
    color: "#16A34A",
    route: "/category/maid",
  },
  {
    id: "men",
    title: "MEN",
    icon: "face-man",
    color: "#2563EB",
    route: "/category/men",
  },
  {
    id: "women",
    title: "WOMEN",
    icon: "face-woman",
    color: "#EC4899",
    route: "/category/women",
  },
  {
    id: "ondemand",
    title: "ON DEMAND",
    icon: "tools",
    color: "#7C3AED",
    route: "/category/ondemand",
  },
  {
    id: "more",
    title: "MORE",
    icon: "dots-grid",
    color: "#64748B",
    route: "/categories",
  },
];

interface CategoryCardProps {
  item: CategoryItem;
  active: boolean;
  onPress: (item: CategoryItem) => void;
}

const CategoryCard = memo(
  ({ item, active, onPress }: CategoryCardProps) => {
    return (
      <Pressable
        android_ripple={{
          color: "#E5E7EB",
          borderless: false,
        }}
        onPress={() => onPress(item)}
        style={[
          styles.card,

          {
            borderColor: item.color,
          },

          active && {
            backgroundColor: item.color,
          },
        ]}
      >
        <View
          style={[
            styles.iconWrapper,

            active && {
              backgroundColor: "#FFFFFF",
            },
          ]}
        >
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
            color={active ? item.color : item.color}
          />
        </View>

        <Text
          numberOfLines={2}
          style={[
            styles.cardTitle,

            active && {
              color: "#FFFFFF",
            },
          ]}
        >
          {item.title}
        </Text>
      </Pressable>
    );
  }
);

CategoryCard.displayName = "CategoryCard";

export default function CategoryGrid() {
  const router = useRouter();

  const [selected, setSelected] =
    useState<CategoryType>("free");

  const data = useMemo(() => CATEGORIES, []);

  const handlePress = useCallback(
    (item: CategoryItem) => {
      setSelected(item.id);

      router.push(item.route as any);
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
          <CategoryCard
            item={item}
            active={selected === item.id}
            onPress={handlePress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 12,
    marginBottom: 18,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingRight: 24,
  },

  card: {
    width: CARD_WIDTH,
    height: 96,

    borderRadius: 22,

    borderWidth: 1.4,

    backgroundColor: "#FFFFFF",

    marginRight: 12,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.06,

    shadowRadius: 8,

    elevation: 5,
  },

  iconWrapper: {

    width: 46,

    height: 46,

    borderRadius: 23,

    backgroundColor: "#F8FAFC",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 8,

  },

  cardTitle: {

    fontSize: 10,

    fontWeight: "800",

    textAlign: "center",

    color: "#111827",

    paddingHorizontal: 4,

    letterSpacing: 0.2,

  },

});
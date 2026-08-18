import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { electricalServices } from "@/data/electronics";
import { installationServices } from "@/data/installation";

const freeServices = [
  ...installationServices,
  ...electricalServices,
].slice(0, 10);

export default function FreeServiceSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <View>

          <Text style={styles.title}>
            ⚡ Labour FREE Services
          </Text>

          <Text style={styles.subTitle}>
            ₹49 Visit • Labour FREE • Material Extra
          </Text>

        </View>

        <Pressable
          onPress={() => router.push("/category/free")}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </Pressable>

      </View>

      {/* Horizontal List */}

      <FlatList
        horizontal
        data={freeServices}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) => (

          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(item.route as any)
            }
          >

            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor:
                    item.color + "15",
                },
              ]}
            >

              <MaterialCommunityIcons
                name={item.icon as any}
                size={32}
                color={item.color}
              />

            </View>

            <Text
              numberOfLines={2}
              style={styles.serviceTitle}
            >
              {item.title}
            </Text>

            <View style={styles.badge}>

              <Text style={styles.badgeText}>
                Labour FREE
              </Text>

            </View>

            <Text style={styles.price}>
              ₹49 Visit
            </Text>

          </Pressable>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 20,
    marginBottom: 10,
  },

  header: {
    marginHorizontal: 16,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  subTitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  viewAll: {
    color: "#00A651",
    fontWeight: "800",
    fontSize: 14,
  },

  card: {
    width: 165,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 18,

    marginRight: 14,

    elevation: 3,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: "center",
    alignItems: "center",
  },

  serviceTitle: {
    marginTop: 14,

    fontSize: 14,

    fontWeight: "800",

    color: "#111827",

    minHeight: 40,
  },

  badge: {
    alignSelf: "flex-start",

    marginTop: 12,

    backgroundColor: "#ECFDF3",

    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#00A651",
    fontSize: 11,
    fontWeight: "800",
  },

  price: {
    marginTop: 10,

    fontSize: 13,

    fontWeight: "900",

    color: "#00A651",
  },

});
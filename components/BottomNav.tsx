import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TABS = [
  {
    label: "Home",
    icon: "home-variant",
    route: "/",
  },
  {
    label: "Explore",
    icon: "view-grid",
    route: "/explore",
  },
  {
    label: "Bookings",
    icon: "calendar-check",
    route: "/bookings",
  },
  {
    label: "Profile",
    icon: "account-circle",
    route: "/profile",
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = pathname === tab.route;

        return (
          <Pressable
            key={tab.route}
            style={styles.item}
            onPress={() => router.push(tab.route as any)}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={26}
              color={active ? "#00A651" : "#94A3B8"}
            />

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,

    height: 72,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 10,
  },

  item: {
    flex: 1,
    alignItems: "center",
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
  },

  activeLabel: {
    color: "#00A651",
    fontWeight: "900",
  },
});
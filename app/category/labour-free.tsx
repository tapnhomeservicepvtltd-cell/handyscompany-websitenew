
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const categories = [
  {
    id: "electrical",
    title: "Electrical Services",
    icon: "flash",
    route: "/category/electrical",
  },
  {
    id: "plumbing",
    title: "Plumbing Services",
    icon: "water-pump",
    route: "/category/plumbing",
  },
  {
    id: "carpenter",
    title: "Carpenter Services",
    icon: "hammer",
    route: "/category/carpenter",
  },
  {
    id: "appliance",
    title: "Home Appliance",
    icon: "air-conditioner",
    route: "/category/appliance",
  },
  {
    id: "deep-cleaning",
    title: "Free Deep Cleaning",
    icon: "spray-bottle",
    route: "/category/cleaning",
  },
  {
    id: "inspection",
    title: "Monthly Inspection",
    icon: "clipboard-check",
    route: "/category/inspection",
  },
];

export default function LabourFreeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        ⭐ Labour-FREE Services
      </Text>

      <Text style={styles.subHeading}>
        Pay only ₹49 visit charge.
        Labour is absolutely FREE for members.
      </Text>

      {categories.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push(item.route as any)
          }
        >
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name={item.icon as any}
              size={28}
              color="#00A651"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              View sub services
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="#94A3B8"
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  subHeading: {
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
    color: "#64748B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#ECFDF3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
});

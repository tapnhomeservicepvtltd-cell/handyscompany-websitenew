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

const DATA = [
  {
    id: "installation",
    title: "Installation",
    icon: "tools",
    color: "#F97316",
    route: "/category/installation",
  },
  {
    id: "electronics",
    title: "Electronics",
    icon: "laptop",
    color: "#2563EB",
    route: "/category/electronics",
  },
  {
    id: "cleaning",
    title: "Cleaning",
    icon: "spray-bottle",
    color: "#14B8A6",
    route: "/category/cleaning",
  },
  {
    id: "painting",
    title: "Painting",
    icon: "roller",
    color: "#F59E0B",
    route: "/category/painting",
  },
  {
    id: "pest",
    title: "Pest Control",
    icon: "shield-bug",
    color: "#16A34A",
    route: "/category/pest",
  },
];

export default function OnDemandSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          ⚙️ On Demand Services
        </Text>

        <Pressable
          onPress={() =>
            router.push("/category/ondemand")
          }
        >
          <Text style={styles.viewAll}>
            View All →
          </Text>
        </Pressable>

      </View>

      <FlatList
        horizontal
        data={DATA}
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
                size={34}
                color={item.color}
              />

            </View>

            <Text style={styles.title}>
              {item.title}
            </Text>

            <View
              style={[
                styles.button,
                {
                  backgroundColor:
                    item.color,
                },
              ]}
            >

              <Text style={styles.buttonText}>
                Explore
              </Text>

            </View>

          </Pressable>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 30,
  },

  header: {
    marginHorizontal: 16,
    marginBottom: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  viewAll: {
    color: "#00A651",
    fontWeight: "800",
    fontSize: 14,
  },

  card: {

    width: 155,

    backgroundColor: "#FFF",

    borderRadius: 22,

    marginRight: 14,

    paddingVertical: 18,

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

    width: 68,

    height: 68,

    borderRadius: 34,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 14,

  },

  title: {

    fontSize: 14,

    fontWeight: "800",

    color: "#111827",

    textAlign: "center",

    paddingHorizontal: 10,

  },

  button: {

    marginTop: 16,

    width: 110,

    height: 38,

    borderRadius: 12,

    justifyContent: "center",

    alignItems: "center",

  },

  buttonText: {

    color: "#FFF",

    fontWeight: "800",

    fontSize: 13,

  },

});
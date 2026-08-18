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

interface Item {
  id: string;
  title: string;
  icon: string;
  route: string;
  price: string;
}

interface Props {
  services: Item[];
}

export default function SimilarServices({
  services,
}: Props) {
  const router = useRouter();

  if (!services?.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Similar Services
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push(item.route as any)
            }
          >
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={22}
                color="#00A651"
              />
            </View>

            <Text
              style={styles.title}
              numberOfLines={2}
            >
              {item.title}
            </Text>

            <Text style={styles.price}>
              {item.price}
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
    paddingLeft: 16,
  },

  heading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14,
  },

  card: {
    width: 130,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F4FBF7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
    minHeight: 34,
  },

  price: {
    marginTop: 10,
    color: "#00A651",
    fontWeight: "900",
    fontSize: 13,
  },
});
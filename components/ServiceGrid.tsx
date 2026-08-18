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

type Service = {
  id: string;
  title: string;
  hindiTitle: string;
  icon: string;
  color: string;
  route: string;
};

type Props = {
  title: string;
  services: Service[];
  viewAllRoute: string;
};

export default function ServiceGrid({
  title,
  services,
  viewAllRoute,
}: Props) {

  const router = useRouter();

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.heading}>
          {title}
        </Text>

        <Pressable
          onPress={() =>
            router.push(viewAllRoute as any)
          }
        >

          <Text style={styles.viewAll}>
            View All →
          </Text>

        </Pressable>

      </View>

      <FlatList
        horizontal
        data={services}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 4,
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

            <Text
              numberOfLines={2}
              style={styles.title}
            >
              {item.title}
            </Text>

            <Text
              numberOfLines={1}
              style={styles.hindi}
            >
              {item.hindiTitle}
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
                Book
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
    marginBottom: 24,
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
    fontSize: 14,
    fontWeight: "800",
    color: "#00A651",
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

  hindi: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
  },

  button: {
    marginTop: 14,

    width: 110,
    height: 38,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "800",
  },

});
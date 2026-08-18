import React, { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ApiError } from "../../services/api/client";
import { Address, getAddresses } from "../../services/api/addresses";

export default function AddressScreen() {
  const router = useRouter();
  const {
    serviceId, serviceName,
    variantId, variantName, variantBrand, variantPrice,
    problemId, addonsJson, addonsTotal,
    brandAddonsJson, brandAddonsTotal,
    visitCharge, finalPrice,
  } = useLocalSearchParams<{
    serviceId?: string; serviceName?: string;
    variantId?: string; variantName?: string; variantBrand?: string; variantPrice?: string;
    problemId?: string; addonsJson?: string; addonsTotal?: string;
    brandAddonsJson?: string; brandAddonsTotal?: string;
    visitCharge?: string; finalPrice?: string;
  }>();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAddresses();
      setAddresses(result);
      setSelected((current) =>
        current && result.some((address) => address.id === current)
          ? current
          : result.find((address) => address.isDefault)?.id ?? result[0]?.id ?? null
      );
    } catch (caught) {
      setError(
        caught instanceof ApiError ? caught.message : "Addresses could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const handleDelete = (addressId: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to remove this saved address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await console.log(addressId);
              void load();
            } catch {
              Alert.alert("Error", "Could not delete address.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#111827" />
        </Pressable>

        <Text style={styles.title}>Saved Addresses</Text>
        <View style={{ width: 26 }} />
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelected(item.id)}
            style={[styles.card, selected === item.id && styles.activeCard]}
          >
            <MaterialCommunityIcons
              name={
                item.label === "HOME"
                  ? "home"
                  : item.label === "WORK"
                  ? "office-building"
                  : "map-marker"
              }
              size={28}
              color="#00A651"
            />

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.type}>
                {item.label === "HOME"
                  ? "Home"
                  : item.label === "WORK"
                  ? "Work"
                  : "Other"}
              </Text>
              <Text style={styles.address}>
                {item.addressLine1}, {item.city}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Pressable onPress={() => handleDelete(item.id)} style={{ padding: 4 }}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color="#DC2626" />
              </Pressable>

              {selected === item.id && (
                <MaterialCommunityIcons name="check-circle" size={24} color="#00A651" />
              )}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.empty}>
              <ActivityIndicator color="#00A651" size="large" />
            </View>
          ) : (
            <View style={styles.empty}>
              <Text style={styles.address}>
                {error ?? "No saved addresses yet."}
              </Text>
              <Pressable onPress={() => void load()}>
                <Text style={styles.retry}>Retry</Text>
              </Pressable>
            </View>
          )
        }
      />

      {/* Add New Address Button */}
      <Pressable
        style={styles.addCard}
        onPress={() => router.push("/booking/location" as never)}
      >
        <MaterialCommunityIcons name="plus-circle" size={22} color="#00A651" />
        <Text style={styles.addText}>Add New Location via Map</Text>
      </Pressable>

      {/* Bottom Action */}
      <View style={styles.bottom}>
        <Pressable
          style={[styles.button, !selected && { opacity: 0.6 }]}
          disabled={!selected}
          onPress={() =>
            router.push({
              pathname: "/booking/date",
              params: {
                addressId: selected,
                serviceId,
                serviceName,
                variantId,
                variantName,
                variantBrand,
                variantPrice,
                problemId,
                addonsJson,
                addonsTotal,
                brandAddonsJson,
                brandAddonsTotal,
                visitCharge,
                finalPrice,
              },
            } as any)
          }
        >
          <Text style={styles.buttonText}>Continue with Selected Address</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 60,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeCard: {
    borderWidth: 2,
    borderColor: "#00A651",
    backgroundColor: "#F0FDF4",
  },
  type: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },
  address: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
  addCard: {
    height: 54,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#ECFDF3",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  addText: {
    marginLeft: 8,
    fontWeight: "800",
    color: "#00A651",
    fontSize: 14,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 12,
  },
  retry: {
    fontWeight: "800",
    color: "#00A651",
  },
  bottom: {
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
  },
  button: {
    height: 54,
    backgroundColor: "#00A651",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
});

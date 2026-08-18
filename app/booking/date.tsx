import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// अगले 14 दिन जनरेट करें ताकि यूज़र किसी भी नज़दीकी तारीख़ को चुन सके
const generateDates = () => {
  const today = new Date();
  const days = [];
  // Same-day slots may already be in the past; start tomorrow to satisfy
  // the backend's future-schedule validation deterministically.
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const slots = [
  { id: "1", time: "09:00 AM - 11:00 AM", status: "Available" },
  { id: "2", time: "11:00 AM - 01:00 PM", status: "Fast Filling" },
  { id: "3", time: "01:00 PM - 03:00 PM", status: "Available" },
  { id: "4", time: "03:00 PM - 05:00 PM", status: "Available" },
  { id: "5", time: "05:00 PM - 07:00 PM", status: "Available" },
  { id: "6", time: "07:00 PM - 09:00 PM", status: "Available" },
];

export default function DateTimeScreen() {
  const router = useRouter();
  const {
    serviceId, serviceName, addressId,
    variantId, variantName, variantBrand, variantPrice,
    problemId, addonsJson, addonsTotal,
    brandAddonsJson, brandAddonsTotal,
    visitCharge, finalPrice,
  } = useLocalSearchParams<{
    serviceId: string; serviceName?: string; addressId?: string;
    variantId?: string; variantName?: string; variantBrand?: string; variantPrice?: string;
    problemId?: string; addonsJson?: string; addonsTotal?: string;
    brandAddonsJson?: string; brandAddonsTotal?: string;
    visitCharge?: string; finalPrice?: string;
  }>();
  const dates = useMemo(() => generateDates(), []);

  const [selectedDate, setSelectedDate] = useState(0); // index into `dates`
  const [selectedSlot, setSelectedSlot] = useState("2");

  const activeDate = dates[selectedDate];
  const monthLabel = `${MONTHS[activeDate.getMonth()]} ${activeDate.getFullYear()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="#111827" />
        </Pressable>
        <Text style={styles.title}>Select Date & Time</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Month + horizontal day strip */}
        <View style={styles.calendarBlock}>
          <Text style={styles.monthLabel}>{monthLabel}</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dayStrip}
          >
            {dates.map((d, index) => {
              const active = index === selectedDate;
              return (
                <Pressable
                  key={index}
                  onPress={() => setSelectedDate(index)}
                  style={[styles.dayPill, active && styles.dayPillActive]}
                >
                  <Text style={[styles.dayLabel, active && styles.dayLabelActive]}>
                    {DAY_LABELS[d.getDay()]}
                  </Text>
                  <Text style={[styles.dayNumber, active && styles.dayNumberActive]}>
                    {d.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Time slots */}
        <View style={styles.slotBlock}>
          <Text style={styles.slotHeading}>Select Time Slot</Text>

          <FlatList
            data={slots}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const active = selectedSlot === item.id;
              return (
                <Pressable
                  onPress={() => setSelectedSlot(item.id)}
                  style={[styles.card, active && styles.activeCard]}
                >
                  <View>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text
                      style={[
                        styles.status,
                        item.status === "Fast Filling" && styles.statusUrgent,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>

                  {active && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={26}
                      color="#00A651"
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          disabled={!serviceId || !addressId}
          onPress={() => {
            const [start] = slots.find((slot) => slot.id === selectedSlot)?.time.split(" - ") ?? [];
            const [time, meridiem] = start.split(" ");
            const [hoursText, minutesText] = time.split(":");
            let hours = Number(hoursText) % 12;
            if (meridiem === "PM") hours += 12;
            const scheduledAt = new Date(activeDate);
            scheduledAt.setHours(hours, Number(minutesText), 0, 0);
            router.push({ pathname: "/booking/checkout", params: {
              serviceId, serviceName, addressId,
              variantId, variantName, variantBrand, variantPrice,
              problemId, addonsJson, addonsTotal,
              brandAddonsJson, brandAddonsTotal,
              visitCharge, finalPrice,
              scheduledAt: scheduledAt.toISOString(),
            } } as any);
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    height: 60,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "900", color: "#111827" },

  calendarBlock: {
    backgroundColor: "#FFF",
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: 12,
  },
  monthLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginLeft: 16,
    marginBottom: 12,
  },
  dayStrip: { paddingHorizontal: 12 },
  dayPill: {
    width: 56,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    backgroundColor: "#F8FAFC",
  },
  dayPillActive: {
    backgroundColor: "#00A651",
    borderColor: "#00A651",
  },
  dayLabel: { fontSize: 12, fontWeight: "700", color: "#64748B" },
  dayLabelActive: { color: "#FFFFFF" },
  dayNumber: { fontSize: 18, fontWeight: "900", color: "#111827", marginTop: 4 },
  dayNumberActive: { color: "#FFFFFF" },

  slotBlock: { paddingHorizontal: 16, paddingTop: 4 },
  slotHeading: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeCard: { borderColor: "#00A651", borderWidth: 2 },
  time: { fontSize: 16, fontWeight: "900", color: "#111827" },
  status: { marginTop: 6, fontSize: 13, color: "#00A651" },
  statusUrgent: { color: "#EA580C" },

  bottom: {
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    height: 54,
    backgroundColor: "#00A651",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
});

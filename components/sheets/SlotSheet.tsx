import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

const slots = [
  "09:00 AM",
  "11:00 AM",
  "01:00 PM",
  "03:00 PM",
  "05:00 PM",
];

const SlotSheet = forwardRef<any>((props, ref) => {
  const snapPoints = useMemo(() => ["70%"], []);

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={snapPoints}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Select Time Slot
        </Text>

        {slots.map((item) => (
          <Pressable
            key={item}
            style={{
              padding: 15,
              borderWidth: 1,
              borderRadius: 12,
              marginTop: 15,
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
});

SlotSheet.displayName = 'SlotSheet';
export default SlotSheet;
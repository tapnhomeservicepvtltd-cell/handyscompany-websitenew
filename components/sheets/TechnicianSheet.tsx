import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Image, Text, View } from "react-native";

const TechnicianSheet = forwardRef<any>((props, ref) => {
  const snapPoints = useMemo(() => ["65%", "90%"], []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <BottomSheetScrollView>
        <View style={{ padding: 20 }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
            }}
          />

          <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 15 }}>
            Pooja Sharma
          </Text>

          <Text>⭐ 4.9 Rating</Text>
          <Text>🏆 3200 Services Completed</Text>
          <Text>✔ Background Verified</Text>
          <Text>🎯 8 Years Experience</Text>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

TechnicianSheet.displayName = 'TechnicianSheet';
export default TechnicianSheet;
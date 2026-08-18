import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Text, View } from "react-native";

const AddonSheet = forwardRef<any>((props, ref) => {
  const snapPoints = useMemo(() => ["60%"], []);

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={snapPoints}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Add-on Services
        </Text>

        <Text>☑ Head Massage ₹199</Text>
        <Text>☑ Premium Facial Kit ₹299</Text>
        <Text>☑ Cleanup ₹149</Text>
      </View>
    </BottomSheet>
  );
});

AddonSheet.displayName = 'AddonSheet';
export default AddonSheet;
import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Text, View } from "react-native";

const ReviewSheet = forwardRef<any>((props, ref) => {
  const snapPoints = useMemo(() => ["80%"], []);

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={snapPoints}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "700" }}>
          ⭐ 4.89
        </Text>

        <Text>12,000 Reviews</Text>

        <Text style={{ marginTop: 20 }}>
          ⭐⭐⭐⭐⭐ Excellent Service
        </Text>

        <Text>
          Technician was professional and arrived on time.
        </Text>
      </View>
    </BottomSheet>
  );
});

ReviewSheet.displayName = 'ReviewSheet';
export default ReviewSheet;
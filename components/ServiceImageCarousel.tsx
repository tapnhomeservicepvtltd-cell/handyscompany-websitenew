import React, { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  images: string[];
}

export default function ServiceImageCarousel({
  images,
}: Props) {
  const [active, setActive] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x /
        (width - 32)
    );

    if (slide !== active) {
      setActive(slide);
    }
  };

  if (!images?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              active === index &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 18,
  },

  image: {
    width: width - 32,
    height: 210,
    borderRadius: 22,
    marginRight: 8,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor: "#00A651",
  },
});
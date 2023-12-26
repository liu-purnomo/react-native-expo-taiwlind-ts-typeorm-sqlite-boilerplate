import { OnboardingItem } from "@/constants";
import React from "react";
import { Animated, Text, View } from "react-native";

interface OnboardProps {
  index: number;
  item: OnboardingItem;
  x: Animated.Value;
  screenWidth: number;
}

export default function Onboard({ index, item, x, screenWidth }: OnboardProps) {
  const imageTranslateY = x.interpolate({
    inputRange: [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ],
    outputRange: [100, 0, 100],
    extrapolate: "clamp",
  });

  const textTranslateY = x.interpolate({
    inputRange: [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ],
    outputRange: [10, 0, 10],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth,
      }}
    >
      <Animated.Image
        source={item.image}
        style={{
          width: screenWidth * 0.8,
          height: screenWidth * 0.8,
          opacity: 1,
          transform: [{ translateY: imageTranslateY }],
        }}
        resizeMode="contain"
      />

      <Animated.View
        style={{
          marginTop: 16,
          width: "90%",
          opacity: 1,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        <Text className="text-center text-2xl font-bold text-sky-100">
          {item.title}
        </Text>
      </Animated.View>
    </View>
  );
}

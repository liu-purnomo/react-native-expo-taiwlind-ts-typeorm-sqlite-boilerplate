import React, { FC, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import { onboarding } from "@/constants";
import { Link, useRouter } from "expo-router";
import Onboard from "./item";

export interface OnBoardingScreenProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const OnBoardingScreen: FC<OnBoardingScreenProps> = ({
  setIsLoggedIn,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef<ScrollView>(null);

  const [currentBoard, setCurrentBoard] = useState<number>(0);

  const flatListIndex = useRef(0);

  const x = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    x.setValue(event.nativeEvent.contentOffset.x);
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentBoard(index);
    flatListIndex.current = index; // Update flatListIndex
  };

  const router = useRouter();

  const navigateToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-sky-500"
      style={{ width: screenWidth }}
    >
      <View className="flex w-full flex-row items-center justify-between px-5 pt-5">
        <Image
          source={require("../../../src/assets/images/logo/rpi-white.png")}
          style={{ width: 80, height: 40 }}
          resizeMode="contain"
        />
        <Button onPress={() => setIsLoggedIn(true)}>
          <Text className="font-bold text-sky-100">Lewati</Text>
        </Button>
      </View>

      <ScrollView
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {onboarding.map((item, index) => {
          return (
            <Onboard
              key={item.id}
              index={index}
              item={item}
              x={x}
              screenWidth={screenWidth}
            />
          );
        })}
      </ScrollView>

      {currentBoard !== onboarding.length - 1 && (
        <View className="mb-10 flex h-10 flex-row items-center justify-center">
          {onboarding.map((item, index) => (
            <Animated.View
              key={index}
              className={`${
                currentBoard === index ? "w-10 bg-sky-50" : "w-6 bg-sky-200"
              } mx-1 h-2  rounded-lg`}
            />
          ))}
        </View>
      )}

      {currentBoard === onboarding.length - 1 && (
        <Link href="/modal" asChild>
          <Pressable className="mb-20 rounded-full border border-sky-500 bg-sky-50 px-5 py-3 shadow-xl">
            <View className="flex flex-row">
              <Text className="font-bold text-sky-500">Masuk Sekarang</Text>
            </View>
          </Pressable>
        </Link>
      )}
    </SafeAreaView>
  );
};

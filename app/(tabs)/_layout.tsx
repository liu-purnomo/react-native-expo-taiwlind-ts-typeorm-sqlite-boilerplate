import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, useColorScheme } from "react-native";

import { UserController } from "@/data";
import { useQuery } from "@tanstack/react-query";
import Colors from "../../src/constants/Colors";
import { OnBoardingScreen } from "../screens/OnBoarding";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data } = useQuery(["userInfo"], UserController.getUser);

  useEffect(() => {
    if (!!data) {
      setIsLoggedIn(true);
    }
  }, [data]);

  return (
    <>
      {!isLoggedIn && (
        <OnBoardingScreen
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {isLoggedIn && <TabLayout />}
    </>
  );
}

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Remote Pilot",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-alt" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Item",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="auth"
        options={{
          title: "Authentication",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

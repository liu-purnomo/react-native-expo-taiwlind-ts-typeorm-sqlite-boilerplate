import Button from "@/components/Button";
import { UserController } from "@/data";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Alert, Image, Text, View } from "react-native";

export default function MyProfileTab() {
  const { data } = useQuery(["userInfo"], UserController.getUser);
  const { mutateAsync } = useMutation(UserController.deleteUser);

  console.log(data);

  const handleLogout = async () => {
    if (!data) {
      Alert.alert("Error", "Anda belum login");
      return;
    } else {
      await mutateAsync(data?.id as string);
      Alert.alert("Success", "Berhasil keluar");
    }
  };

  return (
    <View>
      {data && data.avatar && (
        <Image
          source={{ uri: data.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <Button
        className="mt-14 items-center rounded-2xl bg-sky-500 py-4"
        onPress={handleLogout}
      >
        <Text className="text-base font-semibold text-white">Logout</Text>
      </Button>
    </View>
  );
}

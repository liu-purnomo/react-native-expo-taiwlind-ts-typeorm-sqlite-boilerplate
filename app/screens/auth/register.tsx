import Button from "@/components/Button";
import React, { FC } from "react";
import { Text, View } from "react-native";

interface IRegisterProps {
  pageToShow: "login" | "register";
  setPageToShow: (pageToShow: "login" | "register") => void;
}

export const RegisterScreen: FC<IRegisterProps> = ({
  pageToShow,
  setPageToShow,
}) => {
  return (
    <View>
      <Text>Register</Text>
      <Button
        className="mt-6 flex-row items-center justify-center"
        onPress={() => setPageToShow("login")}
      >
        <Text className="font-rubik text-sm text-black">
          Sudah punya akun?{" "}
          <Text className="text-main font-semibold text-sky-800">Login</Text>
        </Text>
      </Button>
    </View>
  );
};

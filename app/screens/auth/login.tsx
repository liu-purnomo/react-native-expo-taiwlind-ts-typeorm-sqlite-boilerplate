import { Auth } from "@/api";
import { Colors, Constants } from "@/components";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Feather, Octicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Formik, FormikHelpers } from "formik";
import React, { FC, useState } from "react";

import { UserController } from "@/data";
import Checkbox from "expo-checkbox";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface ILoginProps {
  pageToShow: "login" | "register";
  setPageToShow: (pageToShow: "login" | "register") => void;
}

const initialsValue = {
  email: "",
  password: "",
  remember: false,
};

export const LoginScreen: FC<ILoginProps> = ({ pageToShow, setPageToShow }) => {
  const { mutateAsync, isLoading } = useMutation(Auth.login);
  const { mutateAsync: createUser } = useMutation(UserController.createUser);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (
    value: DefaultFormValues,
    formik: FormikHelpers<any>
  ) => {
    if (!value.email && !value.password) {
      Alert.alert("Opss", "Email dan password wajib diisi!");
      return;
    }

    try {
      const response = await mutateAsync(value);
      await createUser({
        id: response?.data?.id,
        email: response?.data?.email,
        name: response?.data?.name,
        role: response?.data?.role,
        status: response?.data?.status,
        token: response?.token,
        username: response?.data?.username,
        avatar: response?.data?.avatar,
      });
      Alert.alert(response.message);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      Alert.alert("Opss", errorMessage);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === "android" ? -100 : 0}
        enableOnAndroid
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-sky-600">
            <Image
              source={require("@/assets/images/shape.png")}
              className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
            />

            <Image
              source={require("@/assets/images/logo/rpi-white.png")}
              className="mx-auto mt-24 mb-6 h-20 w-40"
              resizeMode="contain"
            />

            <Text className="mb-9 text-center text-2xl font-bold text-sky-50">
              Login
            </Text>

            <View className="h-[60vh] rounded-t-3xl bg-white px-6 pt-10">
              <Formik initialValues={initialsValue} onSubmit={handleOnSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  handleSubmit,
                  values,
                }) => (
                  <>
                    <View className="flex-row items-center rounded-3xl bg-sky-100 p-4">
                      <Feather name="mail" size={20} color={Colors.black} />
                      <Input
                        placeholder="Email"
                        placeholderTextColor={Constants.HexToRgba(
                          Colors.black,
                          0.4
                        )}
                        className="ml-2 flex-1 text-black"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                    </View>

                    <View className="mt-4 flex-row items-center rounded-3xl bg-sky-100 p-4">
                      <Feather name="lock" size={20} color={Colors.black} />
                      <Input
                        placeholder="Password"
                        placeholderTextColor={Constants.HexToRgba(
                          Colors.black,
                          0.4
                        )}
                        className="ml-2 flex-1 text-black"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={handleTogglePasswordVisibility}
                      >
                        <Octicons
                          name={showPassword ? "eye" : "eye-closed"}
                          size={16}
                          color={Constants.HexToRgba(Colors.black, 0.5)}
                        />
                      </TouchableOpacity>
                    </View>

                    <View className="mt-4 flex-row items-center justify-between">
                      <Button className="flex-row items-center pl-[3px]">
                        <Checkbox
                          className="relative h-4 w-4 items-center justify-center rounded-md border "
                          disabled={false}
                          value={values.remember}
                          onValueChange={(newValue) => {
                            setFieldValue("remember", newValue);
                          }}
                        />

                        <Text className="ml-2 text-sm text-black/30">
                          Ingat Saya
                        </Text>
                      </Button>

                      <Button onPress={() => console.log("forgot password")}>
                        <Text className="ml-2 text-sm text-black/30">
                          Lupa password
                        </Text>
                      </Button>
                    </View>

                    <Button
                      className="mt-14 items-center rounded-2xl bg-sky-500 py-4"
                      onPress={handleSubmit}
                    >
                      <Text className="text-base font-semibold text-white">
                        Login
                      </Text>
                    </Button>

                    {/* <View className="absolute top-[50%] right-0 left-0">
                      <ActivityIndicator
                        animating={isLoading}
                        size="large"
                        color="red"
                      />
                    </View> */}

                    <Button onPress={handleSubmit} title="Submit" />
                  </>
                )}
              </Formik>

              <Button
                className="mt-6 flex-row items-center justify-center"
                onPress={() => setPageToShow("register")}
              >
                <Text className="text-sm text-black">
                  Belum punya akun?{" "}
                  <Text className="text-main font-semibold text-sky-800">
                    Mendaftar
                  </Text>
                </Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

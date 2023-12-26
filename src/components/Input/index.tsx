import React from "react";
import { TextInput } from "react-native";

function Input(props: any) {
  return <TextInput {...props} autoCapitalize="none" />;
}

export default Input;

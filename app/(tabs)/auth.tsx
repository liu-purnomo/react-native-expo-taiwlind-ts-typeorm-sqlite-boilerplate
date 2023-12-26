import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { addItem } from "../../src/api";
import Auth from "../screens/auth";

export default function AuthTab() {
  const [text, onChangeText] = useState<string>("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
  });

  async function addNewItem(event: GestureResponderEvent) {
    mutate({ id: Math.random(), content: text });
    onChangeText("");
  }

  return <Auth />;
}

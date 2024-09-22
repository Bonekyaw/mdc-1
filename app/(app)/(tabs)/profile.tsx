import { View, Text, Pressable } from "react-native";
import React from "react";
import { useSession } from "@/providers/ctx";

export default function profile() {
  const { signOut } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}

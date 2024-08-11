import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Detail() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Detail Screen</Text>
      {/* <Link href="(tabs)">Go to Tab</Link> */}
    </View>
  );
}

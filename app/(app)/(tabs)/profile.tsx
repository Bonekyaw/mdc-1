import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useSession } from "@/providers/ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  runOnUI,
} from "react-native-reanimated";

export default function profile() {
  const { signOut } = useSession();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onZoomIn = () => {
    "worklet";
    scale.value = withTiming(scale.value - 0.5);
  };
  const onZoomOut = () => {
    "worklet";
    scale.value = withSpring(scale.value + 0.3);
  };

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Pressable
        onPress={() => runOnUI(onZoomIn)()}
        style={{ marginBottom: 20 }}
      >
        <Text>Zoom In</Text>
      </Pressable>
      <Pressable onPress={() => runOnUI(onZoomOut)()}>
        <Text>Zoom Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginVertical: 200,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
  },
});

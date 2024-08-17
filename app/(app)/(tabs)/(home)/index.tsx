import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const {width, height} = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: height,
    backgroundColor: '#ffffff',
  },
});

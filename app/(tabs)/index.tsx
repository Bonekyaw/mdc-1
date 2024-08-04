import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>0</Text>
        <Pressable style={styles.button}>
          <Text style={styles.btnText}>Increase</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 200,
    marginHorizontal: 'auto',
    backgroundColor: '#deeeef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1CFCB3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 17,
  },
  btnText: {
    fontSize: 16,
  },
});

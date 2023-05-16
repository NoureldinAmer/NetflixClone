import React from "react";
import { StyleSheet, View, ActivityIndicator, Platform } from "react-native";

export default function Indicator({}) {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator
        size={Platform.OS === "android" ? 60 : "large"}
        color={Platform.OS === "android" ? "#f00" : "#fff"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, View } from "react-native";
import React from "react";

export default VideoPlayerIcon = ({ children }) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconBackground} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    borderRadius: "50%",
    backgroundColor: "red",
  },
  iconBackground: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    top: 2,
    right: 2,
  },
});

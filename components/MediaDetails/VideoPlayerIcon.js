import { StyleSheet, View } from "react-native";
import React from "react";

export default VideoPlayerIcon = ({ children, iconSize }) => {
  iconContainerStyles = {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize / 2,
  };

  return (
    <View style={[styles.iconContainer, iconContainerStyles]}>
      <View style={styles.iconBackground} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
    backgroundColor: "transparent",
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

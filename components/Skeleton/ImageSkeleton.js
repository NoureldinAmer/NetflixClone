import { Skeleton } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const getSkeletonStyle = (tileSize) => {
  switch (tileSize) {
    case "small":
      return { width: 103, height: 154 };
    case "medium":
      return { width: 103, height: 154 };
    case "large":
      return { width: 103, height: 154 };
    case "search":
      return { width: 145, height: 85 };
    default:
      return { width: 103, height: 154 }; // Default to small size if tileSize is not specified or not recognized
  }
};

const ImageSkeleton = ({ tileSize, style }) => {
  const { width, height } = getSkeletonStyle(tileSize);
  return (
    <Skeleton
      animation={"wave"}
      LinearGradientComponent={LinearGradient}
      width={width}
      height={height}
      style={[{ opacity: 0.4 }, style]}
    />
  );
};

export default ImageSkeleton;

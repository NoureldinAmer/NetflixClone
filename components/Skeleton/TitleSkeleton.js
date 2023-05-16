import { Skeleton } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const getSkeletonStyle = (tileSize) => {
  switch (tileSize) {
    case "xsmall":
      return { width: 75, height: 30 };
    case "small":
      return { width: 120, height: 30 };
    case "medium":
      return { width: 170, height: 35 };
    case "large":
      return { width: 103, height: 154 };
    default:
      return { width: 103, height: 154 }; // Default to small size if tileSize is not specified or not recognized
  }
};

const TitleSkeleton = ({ style, size }) => {
  const { width, height } = getSkeletonStyle(size);
  return (
    <View style={style}>
      <Skeleton
        LinearGradientComponent={LinearGradient}
        style={{ opacity: 0.4 }}
        animation="wave"
        width={width}
        height={height}
      />
    </View>
  );
};

export default TitleSkeleton;

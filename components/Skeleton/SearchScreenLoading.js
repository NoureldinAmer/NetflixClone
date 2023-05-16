import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImageSkeleton from "./ImageSkeleton";
import TitleSkeleton from "./TitleSkeleton";

export default function SearchScreenLoading({}) {
  const emptyArr = new Array(10).fill(null);

  return (
    <ScrollView scrollEnabled={false}>
      {emptyArr.map((_, index) => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
            }}
            key={index}
          >
            <ImageSkeleton tileSize={"search"} />
            <View style={styles.titleContainer}>
              <TitleSkeleton
                size={"small"}
                style={{
                  paddingLeft: 16,
                }}
              />
              {index % 2 ? (
                <TitleSkeleton
                  size={"xsmall"}
                  style={{
                    paddingLeft: 16,
                  }}
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    gap: 4,
  },
});

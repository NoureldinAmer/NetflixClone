import React from "react";
import { ScrollView, View } from "react-native";
import TitleSkeleton from "./TitleSkeleton";
import ImageSkeleton from "./ImageSkeleton";
export default function HomeScreenLoading({}) {
  return (
    <View>
      <TitleSkeleton
        style={{
          marginBottom: 14,
          marginLeft: 16,
        }}
        size={"medium"}
      />
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 12,
        }}
        scrollEnabled={false}
      >
        <ImageSkeleton
          tileSize={"small"}
          style={{
            marginLeft: 7,
          }}
        />
        <ImageSkeleton
          tileSize={"small"}
          style={{
            marginLeft: 7,
          }}
        />
        <ImageSkeleton
          tileSize={"small"}
          style={{
            marginLeft: 7,
          }}
        />
        <ImageSkeleton
          tileSize={"small"}
          style={{
            marginLeft: 7,
          }}
        />
        <ImageSkeleton
          tileSize={"small"}
          style={{
            marginLeft: 7,
          }}
        />
      </ScrollView>
    </View>
  );
}

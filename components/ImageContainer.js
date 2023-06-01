import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const getImageStyle = (tileSize) => {
  switch (tileSize) {
    case "small":
      return styles.imageSmall;
    case "medium":
      return styles.imageMedium;
    case "large":
      return styles.imageLarge;
    default:
      return styles.imageSmall; // Default to small size if tileSize is not specified or not recognized
  }
};

const getBoxStyle = (tileSize) => {
  switch (tileSize) {
    case "small":
      return styles.imgBoxSmall;
    case "medium":
      return styles.imgBoxMedium;
    case "large":
      return styles.imgBoxLarge;
    default:
      return styles.imgBoxSmall; // Default to small size if tileSize is not specified or not recognized
  }
};

function ImageContainer({
  tileSize,
  handlePress,
  posterPath,
  movieID,
  style,
  contentType,
  placeHolderText = "placeholder text",
}) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <Pressable
      style={[getBoxStyle(tileSize), style]}
      onPress={() => handlePress(movieID, contentType)}
    >
      {posterPath ? (
        <View style={{ flexDirection: "row" }}>
          {isImageLoading && (
            <View
              style={[getImageStyle(tileSize), styles.placeHolderContainer]}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              <Text style={styles.placeHolderText}>{placeHolderText}</Text>
            </View>
          )}
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w200/${posterPath}`,
            }}
            style={getImageStyle(tileSize)}
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(true)}
          />
        </View>
      ) : (
        <BlurView
          style={[getImageStyle(tileSize), styles.placeHolderContainer]}
          intensity={35}
        >
          <Text
            style={styles.placeHolderText}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {placeHolderText}
          </Text>
        </BlurView>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageSmall: {
    resizeMode: "cover",
    height: 154.5,
    width: 103,
    borderRadius: 4,
  },
  imageMedium: {
    resizeMode: "cover",
    height: 180,
    width: 125,
    borderRadius: 4,
  },
  imageLarge: {
    resizeMode: "cover",
    height: 231.06,
    width: 154.04,
    borderRadius: 4,
  },
  imgBoxSmall: {
    marginRight: 7,
    height: 161,
    width: 103,
    overflow: "hidden",
  },
  imgBoxMedium: {
    marginRight: 7,
    height: 187.56512678,
    width: 125,
    overflow: "hidden",
  },
  imgBoxLarge: {
    marginRight: 7,
    height: 251,
    width: 154.04,
    overflow: "hidden",
  },
  placeHolderContainer: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  placeHolderText: {
    textAlign: "center",
    textAlignVertical: "center",
    width: "72%",
    color: "#fff",
    fontFamily: "netflix-light",
    fontSize: 14.5,
  },
});

export default ImageContainer;

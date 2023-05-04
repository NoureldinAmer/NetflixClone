import {
  StyleSheet,
  View,
  Platform,
  TextInput,
  Button,
  Text,
  Pressable,
} from "react-native";
import React, { Component, useRef } from "react";
import { BlurView } from "expo-blur";
import { WebView } from "react-native-webview";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Icon = ({ name, size, color }) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconBackground} />
      <AntDesign name={name} size={size} color={color} />
    </View>
  );
};

const MediaDetails = ({ route, navigation }) => {
  const webViewRef = useRef(null);
  const handleShouldStartLoadWithRequest = (event) => {
    // You can add logic here to determine if you want to allow the URL to load.
    if (
      event.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`
    ) {
      return false;
    }
    return true;
  };

  const handleNavigationStateChange = (navState) => {
    console.log("Redirected URL:", navState.url);

    if (
      navState.url !==
      `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`
    ) {
      webViewRef.current?.reload();
      console.log("[RELOADING]");
    }
  };

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <BlurView style={styles.container} intensity={100} tint="dark">
      <View style={{ height: 300, backgroundColor: "green", width: "100%" }}>
        <View style={styles.exitButton}>
          <Pressable onPress={closeModal}>
            <Icon name="closecircle" size={24} color="#272526" />
          </Pressable>
        </View>
        <WebView
          ref={webViewRef}
          style={styles.WebViewContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          source={{
            uri: `https://www.2embed.to/embed/tmdb/movie?id=${route.params.contentID}`,
          }}
          onNavigationStateChange={handleNavigationStateChange}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, styles.text]}>
          All Quiet on the Western Front
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={[styles.text, styles.subtitleText, styles.ratings]}>
            85% match
          </Text>
          <Text style={[styles.text, styles.subtitleText]}>2022</Text>
          <View style={styles.certification}>
            <Text style={[styles.text, styles.certificationText]}>PG-13</Text>
          </View>
          <Text style={[styles.text, styles.subtitleText]}>2h 28m</Text>
        </View>
        <View style={styles.highLight}>
          <View style={styles.highLightIcon}>
            <Entypo name="thumbs-up" size={20} color="white" />
          </View>
          <Text style={styles.highLightText}>Most Liked</Text>
        </View>
        <View style={styles.playButton}>
          <FontAwesome name="play" size={20} color="black" />
          <Text style={styles.playButtonText}> GONT Play</Text>
        </View>

        <Text style={[styles.text, styles.overview]}>
          Framed Polish pianist Wladyslaw Szpilman struggles to survive the
          onslaught of Nazi tyranny during World War II in this drama based on
          his memoirs.
        </Text>
      </View>
    </BlurView>
  );
};

export default MediaDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#fff",
  },
  detailsContainer: {
    padding: 8,
    gap: 8,
  },
  title: {
    fontFamily: "netflix-medium",
    fontSize: 18,
  },
  subtitleContainer: {
    color: "white",
    flexDirection: "row",
    gap: 4,
    alignItems: "baseline",
  },
  subtitleText: {
    fontFamily: "netflix-regular",
    fontSize: 16,
  },
  ratings: {
    color: "#43C864",
  },
  certification: {
    backgroundColor: "#4D4D4D",
    padding: 3,
    borderRadius: 3,
  },
  certificationText: {
    fontSize: 12,
  },
  highLight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  highLightIcon: {
    backgroundColor: "red",
    padding: 3,
    borderRadius: 3,
  },
  highLightText: {
    fontFamily: "netflix-medium",
    color: "#fff",
    fontSize: 16,
  },
  playButton: {
    marginVertical: 12,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 7,
    borderRadius: 3,
  },
  playButtonText: {
    fontFamily: "netflix-medium",
    fontSize: 18,
  },
  overview: {
    fontFamily: "netflix-regular",
    fontSize: 14.5,
  },
  WebViewContainer: {},
  exitButton: {
    position: "absolute",
    top: 13,
    right: 13,
    zIndex: 1,
  },
  iconContainer: {
    position: "relative",
    borderRadius: "50%",
    backgroundColor: "green",
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

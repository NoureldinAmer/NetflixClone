import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react-native";

const SplashScreen = ({ finishLoading, isDBInitialized, areFontsLoaded }) => {
  const [initializationComplete, setInitializationComplete] = useState(false);

  useEffect(() => {
    if (isDBInitialized && areFontsLoaded) {
      setInitializationComplete(true);
    }
  }, [isDBInitialized, areFontsLoaded]);

  return (
    <View style={styles.container}>
      <Lottie
        source={require("../assets/splashScreenAnimation.json")}
        autoPlay
        loop={initializationComplete ? false : true}
        style={styles.animation}
        onAnimationFinish={finishLoading}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    flex: 1,
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import React, { useRef, useState } from "react";

const AnimatedButton = () => {
  const animationRef = useRef(null);
  const [selected, setSelected] = useState(true);

  const handlePress = () => {
    if (!selected) {
      animationRef.current?.play(22, 50);
      setSelected(true);
    } else {
      animationRef.current?.play(50, 22);
      setSelected(false);
    }
  };

  return (
    <Pressable style={styles.animatedButtonContainer} onPress={handlePress}>
      <Lottie
        source={require("../../../assets/buttons/addButton.json")}
        ref={animationRef}
        progress={0.5}
        loop={false}
        resizeMode="contain"
        style={styles.animatedButton}
        colorFilters={[
          {
            keypath: "Path :M",
            color: "#FFF",
          },
          {
            keypath: "Path 1",
            color: "#FFF",
          },
          {
            keypath: "Path 2",
            color: "#FFF",
          },
          {
            keypath: "Path 3",
            color: "#FFF",
          },
          {
            keypath: "Path",
            color: "#FFF",
          },
        ]}
      />
    </Pressable>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  animatedButtonContainer: {
    height: 50,
    //backgroundColor: "white",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  animatedButton: {
    height: 135,
    aspectRatio: 1,
  },
});

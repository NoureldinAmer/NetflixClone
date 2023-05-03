import * as React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./screens/Navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const App = () => {
  const [fontsLoaded] = useFonts({
    "netflix-bold": require("./assets/fonts/NetflixSans-Bold.otf"),
    "netflix-light": require("./assets/fonts/NetflixSans-Light.otf"),
    "netflix-medium": require("./assets/fonts/NetflixSans-Medium.otf"),
    "netflix-regular": require("./assets/fonts/NetflixSans-Regular.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

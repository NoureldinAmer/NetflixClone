import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Navigation from "./screens/Navigation";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { ApiProvider } from "./contexts/ApiContext";

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
    <ApiProvider>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Navigation />
      </View>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

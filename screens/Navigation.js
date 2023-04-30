import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomNavigation,
  Text,
  DefaultTheme,
  Provider as ThemeProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Music</Text>
  </View>
);
const SearchScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Albums</Text>
  </View>
);
const ExploreScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Recents</Text>
  </View>
);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#000",
  },
};

export default function Navigation() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Favorites",
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
    },
    { key: "search", title: "Search", focusedIcon: "magnify" },
    { key: "explore", title: "New & Hot", focusedIcon: "youtube-subscription" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    search: SearchScreen,
    explore: ExploreScreen,
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <BottomNavigation
          sceneAnimationEnabled
          sceneAnimationType={"shifting"}
          navigationState={{
            index,
            routes,
          }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{
            backgroundColor: "white",
          }}
        />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});

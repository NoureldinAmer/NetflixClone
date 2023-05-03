import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomNavigation,
  Text,
  DefaultTheme,
  Provider as ThemeProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import SearchScreen from "./SearchScreen";

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
          compact={true}
          sceneAnimationType={"shifting"}
          navigationState={{
            index,
            routes,
          }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{
            height: 85,
            backgroundColor: "#121212",
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

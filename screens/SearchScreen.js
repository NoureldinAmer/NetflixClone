import { StyleSheet } from "react-native";
import React from "react";
import SearchResults from "../components/SearchResults";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MediaContextProvider from "../contexts/MediaContext";
import { NavigationContainer } from "@react-navigation/native";

const RootStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

const ModalStackView = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="detailsPrimaryScreen"
      component={MediaDetails}
      options={{
        contentStyle: {
          backgroundColor: Platform.OS === "ios" ? "transparent" : "#000",
        },
        headerShown: false,
      }}
    />
    <ModalStack.Screen
      name="detailsSecondaryScreen"
      component={MediaDetailsSecondary}
      options={{
        contentStyle: { backgroundColor: "#000" },
        presentation: "card",
        headerShown: false,
      }}
    />
  </ModalStack.Navigator>
);

const SearchScreen = () => {
  return (
    <MediaContextProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="search"
            component={SearchResults}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: "#000" },
            }}
          />
          <RootStack.Screen
            name="modal"
            component={ModalStackView}
            options={{
              contentStyle: { backgroundColor: "transparent" },
              presentation: Platform.OS === "ios" ? "modal" : "card",
              headerShown: false,
              animation: Platform.OS === "android" ? "slide_from_right" : null,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </MediaContextProvider>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 8,
  },
});

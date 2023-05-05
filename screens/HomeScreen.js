import React from "react";
import { Image, Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenLists from "./../components/HomeScreenLists";
import MediaDetails from "../components/MediaDetails/MediaDetails";
import MediaDetailsSecondary from "../components/MediaDetails/MediaDetailsSeconday";
import NetflixLogo from "./../assets/NetflixLogo.svg";

const RootStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

const ModalStackView = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="details"
      component={MediaDetails}
      options={{
        contentStyle: { backgroundColor: "transparent" },
        presentation: "modal",
        headerShown: false,
      }}
    />
    <ModalStack.Screen
      name="detailsSecondary"
      component={MediaDetailsSecondary}
      options={{
        contentStyle: { backgroundColor: "#000" },
        presentation: "card",
        headerShown: false,
      }}
    />
  </ModalStack.Navigator>
);

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="lists"
          component={HomeScreenLists}
          options={{
            title: null,
            headerLeft: () => {
              return <NetflixLogo width={40} height={30} />;
            },
            statusBarTranslucent: true,
            contentStyle: { backgroundColor: "#000" },
            headerLargeTitleShadowVisible: true,
            headerBlurEffect: "systemUltraThinMaterialDark",
            headerTransparent: true,
            headerTitleAlign: "left",
            headerStyle: {
              height: 50,
              backgroundColor:
                Platform.OS === "android" ? "rgba(18, 18, 18, 0.85)" : null,
            },
            headerTitleStyle: {
              color: "white",
              fontFamily: "netflix-medium",
              fontSize: 25,
            },
          }}
        />
        <RootStack.Screen
          name="modal"
          component={ModalStackView}
          options={{
            contentStyle: { backgroundColor: "transparent" },
            presentation: "modal",
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;

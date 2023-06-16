import React, { useEffect } from "react";
import { Image, Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenLists from "./../components/HomeScreenLists";
import MyList from "../components/MyList";
import NetflixLogo from "./../assets/NetflixLogo.svg";
import MediaContextProvider from "../contexts/MediaContext";
import MediaDetails from "../components/MediaDetails";
import MediaDetailsSecondary from "../components/MediaDetails/MediaDetailsSecondary/MediaDetailsSeconday";

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
        freezeOnBlur: true,
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

const MyListScreen = ({ index }) => {
  return (
    <MediaContextProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="lists"
            component={MyList}
            initialParams={{ index: index }}
            options={{
              title: null,
              headerShown: false,
              // headerLeft: () => {
              //   return <NetflixLogo width={40} height={30} />;
              // },
              statusBarTranslucent: true,
              contentStyle: { backgroundColor: "#000" },
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

export default MyListScreen;

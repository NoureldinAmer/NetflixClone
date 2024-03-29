import React, { useContext, useState } from "react";
import MediaRecommendations from "./MediaRecommendations";
import Episodes from "./Episodes";
import { MediaContext } from "../../contexts/MediaContext";
import { View } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function TabNavigation({ recommendations, episodes }) {
  const { selectedMedia } = useContext(MediaContext);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const Tab = createMaterialTopTabNavigator();
  return (
    <View
      style={{
        paddingTop: 10,
      }}
    >
      <Tab.Navigator
        style={{
          height: childrenHeight + 100, //TODO => fix tab size height
          paddingTop: 20,
        }}
        sceneContainerStyle={{
          backgroundColor: "transparent",
          paddingTop: 20,
        }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "transparent",
            marginLeft: 0,
          },
          tabBarLabelStyle: {
            fontFamily: "netflix-bold",
            fontSize: 12.5,
            marginHorizontal: 0,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "red",
            height: 4,
            position: "absolute",
            top: 0,
          },
          tabBarActiveTintColor: "#fff",
          tabBarGap: 20,
        }}
      >
        {selectedMedia.contentType === "tv" && (
          <Tab.Screen
            name="mediaRecommendations1"
            component={Episodes}
            initialParams={{
              seasons: episodes,
              setHeight: setChildrenHeight, //give navigator space to display entire media collection
            }}
            options={{
              title: "Episodes",
            }}
          />
        )}
        <Tab.Screen
          name="mediaRecommendations"
          component={MediaRecommendations}
          initialParams={{
            recommendations: recommendations,
            setHeight: setChildrenHeight, //give navigator space to display entire media collection
          }}
          options={{
            title: "More Like This",
            tabBarAccessibilityLabel: "Tab 2",
            listeners: {
              focus: () => {
                console.log("Tab 2 is focused");
              },
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

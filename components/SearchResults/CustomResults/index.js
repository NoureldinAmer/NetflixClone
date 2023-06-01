import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MediaList from "../../MediaList";

export default function CustomResults({ data, resetData }) {
  useEffect(() => {
    return () => {
      resetData();
    };
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={() => Keyboard.dismiss()}
      scrollEventThrottle={16}
    >
      {data?.results?.map((item, index) => {
        return (
          <MediaList
            data={item.content}
            title={item.genre_name}
            key={index}
            titleStyle={styles.title}
            listStyle={styles.listContainer}
            contentContainerStyle={styles.flatList}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 0,
    color: "#fff",
    fontSize: 20.92,
    marginBottom: 8,
    fontFamily: "netflix-medium",
  },
  listContainer: {
    marginTop: 0,
    marginBottom: 22,
  },
  flatList: {
    paddingHorizontal: 0,
  },
});

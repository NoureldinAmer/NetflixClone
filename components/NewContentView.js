import React from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";

export default function NewContentView({ url, overview, title, releaseDate }) {
  return (
    <View style={styles.mediaContainer}>
      <View style={styles.date}>
        <View>
          <Text style={styles.month}>MAY</Text>
        </View>
        <View>
          <Text style={styles.day}>26</Text>
        </View>
      </View>
      <View style={styles.innerMediaContainer}>
        <View style={styles.imgBox}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${url}`,
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.innerDate}>{releaseDate}</Text>
          <Text style={styles.overView}>{overview}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: "row",
    marginBottom: 25,
  },
  date: {
    flex: 1,
    alignItems: "center",
  },
  month: {
    fontFamily: "netflix-light",
    fontWeight: "100",
    fontSize: 17,
    color: "#fff",
    flexWrap: "wrap",
  },
  day: {
    fontFamily: "netflix-bold",
    fontSize: 26,
    color: "#fff",
    flexWrap: "wrap",
  },
  innerMediaContainer: {
    flex: 6,
  },
  image: {
    width: "100%",
    height: 195,
    resizeMode: "cover",
    borderRadius: 8,
  },
  titleContainer: {
    width: "60%",
  },
  title: {
    flexWrap: "wrap",
    fontFamily: "netflix-bold",
    fontSize: 23,
    color: "#fff",
    marginVertical: 10,
  },
  innerDate: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "netflix-medium",
    color: "#fff",
  },
  overView: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "netflix-light",
  },
});

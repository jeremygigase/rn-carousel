import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const slideList = Array.from({ length: 30 }).map((_, i) => {
    return {
      id: i,
      image: `https://picsum.photos/1440/2842?random=${i}`,
      title: `This is the title! ${i + 1}`,
      subtitle: `This is the subtitle ${i + 1}!`,
    };
  });

  return (
    <View style={styles.container}>
      <Carousel slideList={slideList} />
    </View>
  );
}

function Slide({ data }) {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image
        source={{ uri: data.image }}
        style={{
          width: windowWidth * 0.9,
          height: windowHeight * 0.9,
        }}></Image>
      <Text style={{ fontSize: 24 }}>{data.title}</Text>
      <Text style={{ fontSize: 18 }}>{data.subtitle}</Text>
    </View>
  );
}

function Carousel({ slideList }) {
  console.log(slideList);
  return (
    <FlatList
      data={slideList}
      style={{ flex: 1 }}
      renderItem={({ item }) => {
        return <Slide data={item} />;
      }}
      // pagingEnabled
      // horizontal
      // showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

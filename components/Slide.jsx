//Packages
import React, { memo, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

//FIX ME: sometimes a memory leak and a scrolling issue when changing orientation
//Problem in Carousel and Slide...

const Slide = memo(function Slide({ data }) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  Dimensions.addEventListener("change", () => {
    setWindowHeight(Dimensions.get("window").height);
    setWindowWidth(Dimensions.get("window").width);
  });

  return (
    <View style={{ ...styles.slide, height: windowHeight, width: windowWidth }}>
      <ImageZoom
        cropWidth={windowWidth}
        cropHeight={windowHeight * 0.8}
        imageWidth={windowWidth}
        imageHeight={"100%"}>
        <Image source={{ uri: data.uri }} style={styles.slideImage} />
      </ImageZoom>
      <View style={styles.textContainer}>
        <Text style={styles.slideTitle}>width: {data.width}</Text>
        <Text style={styles.slideSubtitle}>height: {data.height}</Text>
      </View>
    </View>
  );
});

export default Slide;

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "pink",
  },
  slideTitle: {
    fontSize: 24,
  },
  slideSubtitle: {
    fontSize: 18,
  },
  textContainer: {
    backgroundColor: "red",
  },
});

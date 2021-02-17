// Packages
import React, { useState, useRef, useCallback, useEffect } from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";

// Components
import Slide from "./Slide";
import Pagination from "./Pagination";

//FIX ME: sometimes a memory leak and a scrolling issue when changing orientation
//Problem in Carousel and Slide...

function Carousel({ slideList }) {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  Dimensions.addEventListener("change", () => {
    setWindowWidth(Dimensions.get("window").width);
  });

  //console.log(windowWidth);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 2,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((item) => item.id.toString(), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  return (
    <>
      <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={({ item }) => {
          return <Slide data={item} />;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index} slideList={slideList}></Pagination>
    </>
  );
}

export default Carousel;

const styles = StyleSheet.create({});

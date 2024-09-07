import { View, Text, Dimensions, Animated, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";

import {
//   ScalingDot,
//   SlidingBorder,
//   ExpandingDot,
  SlidingDot,
} from "react-native-animated-pagination-dots";
import { Image } from "expo-image";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
import { sample } from "@/data";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ViewPager() {
  const { width, height } = Dimensions.get("window");
  const pageRef = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, sample.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, sample.length * width],
  });
  const [current, setCurrent] = useState(0);

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrent((prev) => {
            const nextPage = (prev + 1) % sample.length;
            pageRef.current?.setPage(nextPage);
            return nextPage;
        });
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ width: width, height: height / 3 }}>
      <AnimatedPagerView
        testID="pager-view"
        initialPage={0}
        ref={pageRef}
        style={{ height: height / 3 }}
        onPageScroll={onPageScroll}
      >
        {sample.map((item) => (
          <View
            testID={`pager-view-data-${item.key}`}
            key={item.key}
            style={styles.imageView}
          >
            <Image
              source={item.image}
              style={styles.image}
              contentFit="contain"
              placeholder={blurhash}
              transition={1000}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <View style={styles.dotContainer}>
        <SlidingDot
          testID={"sliding-dot"}
          marginHorizontal={3}
        //   containerStyle={{ top: 10 }}
          data={sample}
          //@ts-ignore
          scrollX={scrollX}
          dotSize={9}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBDDDA44",
  },
  image: {
    width: "60%",
    height: "80%",
  },
  dotContainer: {
    // position: 'relative',
    // top: -10,
    marginTop: 10,
  },
});

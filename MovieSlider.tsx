import React, { FC, useRef } from 'react';
import { StyleSheet, View, useWindowDimensions, Animated } from 'react-native';

interface Props {
  item: any;
  scrollX: any;
  index: number;
}

const MovieSlider: FC<Props> = ({ item, scrollX, index }) => {
  const dimensions = useWindowDimensions();
  const { width, height } = dimensions;
  const position = Animated.subtract(index * width, scrollX)
  const scale = position.interpolate({
    inputRange: [width * (-2), 0, width],
    outputRange: [0, 1, 0]
  });

  return (
    <View style={[styles.background, { width: width }]}>
      <Animated.Image
        style={[styles.movieImg, { transform: [{ scale }] }]}
        source={item.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  movieImg: {
    width: 700,
    height: 500,
    borderRadius: 10,
    resizeMode: 'contain'
  },
});

export default MovieSlider;

import React, { useRef, useState } from 'react';
import MovieList from './MovieList';
import MovieSlider from './MovieSlider';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  Animated,
  useWindowDimensions,
  Alert
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const Movies = () => {
  const MOVIES = [
    {
      id: uuidv4(),
      image: require('../assets/movie-images/Catch-me-if-you-can.jpg'),
      title: 'Catch Me If You Can',
      icon: 'like2',
      rate: '8.3',
      release: 'Released',
      time: '11 May(Out Now)',
    },
    {
      id: uuidv4(),
      image: require('../assets/movie-images/Cruella.jpg'),
      title: 'Cruella',
      icon: 'like2',
      rate: '8.1',
      release: 'Released',
      time: '11 May(Coming Soon)',
    },
    {
      id: uuidv4(),
      image: require('../assets/movie-images/Inglourious.jpg'),
      title: 'Inglourious Basterds',
      icon: 'like2',
      rate: '9.1',
      release: 'Released',
      time: '11 May(Out Now)',
    },
    {
      id: uuidv4(),
      image: require('../assets/movie-images/Sound.jpg'),
      title: 'Sound Of Metal',
      icon: 'like2',
      rate: '8.3',
      release: 'Released',
      time: '11 May(Out Now)',
    },
    {
      id: uuidv4(),
      image: require('../assets/movie-images/The-Godfather.jpg'),
      title: 'The Godfather',
      icon: 'like2',
      rate: '8.8',
      release: 'Released',
      time: '11 May(Out Now)',
    },
    {
      id: uuidv4(),
      image: require('../assets/movie-images/Those-Who-Wish-Me-Dead.jpg'),
      title: 'Those Who Wish Me Dead',
      icon: 'like2',
      rate: '7.1',
      release: 'Released',
      time: '15 May(Coming Soon)',
    },
  ];

  const dimensions = useWindowDimensions();
  const { width, height } = dimensions;
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        {MOVIES.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return <Animated.Image key={`${index}`} source={image.image} style={[
            StyleSheet.absoluteFillObject,
            {
              opacity
            }
          ]}
            blurRadius={190}
          />
        })}
      </View>
      <Animated.FlatList
        // onEndReached={() => (Alert.alert('Reached end'))}
        pagingEnabled
        horizontal
        onScroll={(event) => {
          scrollX.setValue(event.nativeEvent.contentOffset.x);
        }}
        data={MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <MovieSlider item={item} scrollX={scrollX} index={index} />}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
    marginTop: 10
  },
});

export default Movies;

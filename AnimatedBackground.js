import React from 'react';
import {View, StyleSheet} from 'react-native'
import Constants from './Constants'
import ScrollingBackground from 'react-native-scrolling-images'

export default class AnimatedBackground extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollingBackground
          style={styles.scrollingBackground}
          speed={0.87}
          direction={"left"}
          images={[require("./assets/background1_background1.png")]}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: Constants.MAX_HEIGHT,
    top:-Constants.MAX_HEIGHT/2-35
    
  },
  scrollingBackground: {
    backgroundColor: "#0B7483",
  },
});
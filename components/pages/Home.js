import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryLinkButton from '../buttons/PrimaryLinkButton';
import { Link } from "react-router-native";

function Home(props) {
  return (
      
      <View style={styles.mainPageContainer}>
        <Link to="/game">
        <PrimaryLinkButton buttonTitle={'Play Game'} path={'/game'}/>
        </Link>
      </View>
      
  );
}

const styles = StyleSheet.create({
  mainPageContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default Home;
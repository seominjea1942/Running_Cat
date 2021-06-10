import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryButton from './components/buttons/PrimaryButton';
import { NativeRouter, Route } from "react-router-native";
import Home from './components/pages/Home'
import Game from './Game'
import GameOver from './components/pages/GameOver'

function App(props) {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/gameover" component={GameOver} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  mainPageContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  }
})


export default App;
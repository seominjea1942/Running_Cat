import React, {useState}from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryButton from './components/buttons/PrimaryButton';
import { NativeRouter, Route } from "react-router-native";
import SignIn from './components/pages/SignIn'
import Home from './components/pages/Home'
import Game from './Game'
import GameOver from './components/pages/GameOver'
//font
import { useFonts } from 'expo-font';
//app-loading
import AppLoading from 'expo-app-loading'
// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage'
//credential context
import {CredentialsContext} from './CredentialsContext'

function App(props) {

  const [appReady,setAppReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState("")
  
  const [loaded] = useFonts({
    BMEULJIRO: require('./assets/fonts/BMEULJIRO.otf'),
  });
  
  if (!loaded) {
    return null;
  }

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('RunningCatCredentials')
    .then((result)=>{
      if(result !== null){
        setStoredCredentials(JSON.parse(result))
      } else {
        setStoredCredentials(null)
      }
    })
    .catch((error)=>{console.log(error)})
  }

  if(!appReady){
    return (<AppLoading
      startAsync = {checkLoginCredentials}
      onFinish = {()=> setAppReady(true)}
      onError = {(err)=>console.log(err)}
    />)
  }
  
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      {console.disableYellowBox = true}
    <NativeRouter>
      <Route exact path="/" component={SignIn}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/game" component={Game}/>
      <Route exact path="/gameover" component={GameOver}/>
    </NativeRouter>
    </ CredentialsContext.Provider>
  );
}

const styles = StyleSheet.create({
})


export default App;
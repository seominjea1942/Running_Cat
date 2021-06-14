import React,{useState,useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import PrimaryLinkButton from '../buttons/PrimaryLinkButton';
import {CredentialsContext} from '../../CredentialsContext'
import Constants from '../../Constants';
import FishButton from '../buttons/FishButton'
import HighScore from '../statusBar/HighScore'
import axios from 'axios';
function Home(props) {

  let [fish,setFish] = useState()
  let [highScore, setHighScore]= useState()

  return (
    <CredentialsContext.Consumer>
      {({storedCredentials})=>(
        <View style={styles.mainPageContainer}>
          {/* <Text>{JSON.stringify(storedCredentials)}</Text> */}
          <Image
          style={styles.mainImage}
          source={require('../../assets/main_place_holder.png')}
          ></Image>
          <SafeAreaView style={styles.topButtonsContainer}>
            <HighScore userinfo={storedCredentials.userInfo}/>
            <FishButton userinfo={storedCredentials.userInfo} />
          </SafeAreaView>
          <SafeAreaView style={styles.bottomButtonsContainer}>
            <PrimaryLinkButton buttonType={'store'} path={'/home'}/>
            <PrimaryLinkButton buttonType={'play'} path={'/game'}/>
          </SafeAreaView>          
        </View>
      )}
    </CredentialsContext.Consumer>
  )
}

const styles = StyleSheet.create({
  mainPageContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonsContainer:{
    position: 'absolute',
    flexDirection: 'row',
    alignItems:'center',
    left:0,
    bottom:0,
    width:'100%',
    justifyContent:'space-between'
  },
  topButtonsContainer:{
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top:20,
    width:Constants.MAX_WIDTH,
  },
  mainImage:{
    resizeMode:'contain',
    width:Constants.MAX_WIDTH
  }
})


export default Home;
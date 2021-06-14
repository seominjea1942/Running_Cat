import React, { useEffect,useContext } from 'react';
import { StyleSheet, View, Text, Image} from 'react-native'
import Constants from '../../Constants'
import PrimaryLinkButton from '../buttons/PrimaryLinkButton'
import PrimaryLinkButtonAdjustable from '../buttons/PrimaryLinkButtonAdjustable'
import { useFonts } from 'expo-font';
import axios from 'axios';
import {CredentialsContext} from '../../CredentialsContext'



function GameOver(props) {
    let {storedCrendentials, setStoredCredentials} = useContext(CredentialsContext)
    const [loaded] = useFonts({
        BMEULJIRO: require('../../assets/fonts/BMEULJIRO.otf'),
      });
       
    const updateData =(storedCredentials,score,fish)=>{
        axios.put(`http://localhost:3000/user/${storedCredentials.email}`, {
            storedCredentials:storedCredentials,
            score:score,
            fish:fish
        }).then(res=>
            axios.get(`http://localhost:3000/user/${storedCredentials.email}`)
            .then(res=>setStoredCredentials({...storedCredentials, userInfo:res.data[0]}))
        )
    }

    useEffect(()=>{
        updateData(props.location.state.storedCredentials,
            props.location.state.score,
            parseInt(props.location.state.score/10))
    },[props])

    return (
        <View style={styles.gameOverContainer}>
            <Text style={styles.resultHeader}>Result</Text>
            <View style={styles.resultContent}>
                <View>
                    <Text style={{...styles.resultSubHeader,  marginBottom:12 }}>Total Score</Text>
                    <Text style={styles.pointText} >{props.location.state.score}</Text>
                </View>
                <View>
                    <Text style={styles.resultSubHeader}>Fish</Text>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <Image
                        style={styles.fishicon}
                        source={require('../../assets/fish_icon.png')}
                        />
                        <Text style={{
                        fontFamily:'BMEULJIRO',
                        marginHorizontal:10
                    }}>x</Text>
                        <Text style={styles.pointText} >{parseInt(props.location.state.score/10)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonList}>
                <PrimaryLinkButton buttonType={'home'} path={"/home"} email={props.location.state.storedCredentials.email}></PrimaryLinkButton>
                <PrimaryLinkButtonAdjustable buttonType={'play_again'} path={"/game"}
                buttonWidth={280}></PrimaryLinkButtonAdjustable>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    gameOverContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonList:{
        flexDirection:'row'
    },
    resultHeader:{
        fontFamily:'BMEULJIRO',
        fontSize: 36,
        marginBottom:36
    },resultContent:{
        flexDirection:'row',
        width:300,
        justifyContent:'space-between',
        marginBottom:36
    },
    fishicon:{
        width:60,
        height:60,
        resizeMode:'contain'
    },
    resultSubHeader:{
        fontFamily:'BMEULJIRO',
        fontSize:16
    },
    pointText:{
        fontFamily:'BMEULJIRO',
        fontSize:36
    }
})

export default GameOver;
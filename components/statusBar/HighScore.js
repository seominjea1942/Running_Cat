import React, {useState, useEffect}from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Link} from 'react-router-native'
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

function HighScore({userinfo}) {

    let [highscore, setHighscore] = useState(0)

    useEffect(()=>{
        if(userinfo!==undefined){
        setHighscore(userinfo['highscore'])
        }
    },[userinfo])

    const [loaded] = useFonts({
        BMEULJIRO: require('../../assets/fonts/BMEULJIRO.otf'),
      });

    return (
        <Link component={TouchableOpacity} style={styles.highScoreContainer}>
            <Text style={styles.highScoreLabel}>highscore</Text>
            <Text style={styles.highScoreText}>{highscore}</Text>
        </Link>
    );
}

const styles= StyleSheet.create({
    highScoreContainer:{
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor:'rgba(0,0,0,0.6)',
        borderWidth: 3,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    highScoreLabel:{
        fontFamily: 'BMEULJIRO',
        fontSize: 16,
        marginBottom: 4,
        color:'rgba(0,0,0,0.6)',
    },
    highScoreText:{
        fontFamily: 'BMEULJIRO',
        fontSize: 32
    }
})
export default HighScore;
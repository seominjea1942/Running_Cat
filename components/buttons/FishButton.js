import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { useFonts } from 'expo-font';
import { Link } from 'react-router-native'

function FishButton({userinfo}) {
    let [fishAmount, setFishAmount] = useState(0)
    const [loaded] = useFonts({
        BMEULJIRO: require('../../assets/fonts/BMEULJIRO.otf'),
      });
      
    useEffect(()=>{
        if(userinfo!==undefined){
        setFishAmount(userinfo['fish'])
        }
    },[userinfo])

    return (
        <Link component={TouchableOpacity} style={styles.fishButtonContainer}>
            <View style={styles.fishAmountContainer}>
                <Text
                style={styles.fishButtonText}
                >{fishAmount}
                </Text>
            </View>
            <Image
            style={styles.fishButton}
            source={require('../../assets/fish_plus_button.png')}
            />
        </Link>
    );
}
const styles = StyleSheet.create({
    fishButtonContainer:{
        flexDirection:'row',
        height: 50,
        alignItems: 'center',
        position:'absolute',
        right: 150
    },
    fishButton:{
        width: 70,
        height:60,
        resizeMode:'contain'
    },
    fishButtonText:{
        color:'white',
        fontSize: 18,
        fontFamily: 'BMEULJIRO',
    },
    fishAmountContainer:{
        backgroundColor:'rgba(29,57,81,0.6)',
       flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 45,
        paddingRight: 20,
        paddingVertical:10,
        borderRadius: 15,
        position: 'absolute',
        borderWidth: 3,
        borderColor: '#1D3951',
        left:30
    }
})

export default FishButton;
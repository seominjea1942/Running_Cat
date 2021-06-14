import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Constants from '../../Constants';

function LifeBar({healthPoint}) {

    let hearts =()=>{
        let hearts = []
        for(let i = 0; i<healthPoint; i++){
            hearts.push(
                <Image
                    key={`heart${i}`}
                    style={styles.heart}
                    source={require('../../assets/heart_fill.png')}
                ></Image>
            )
        }
        for(let i = 0; i<5-healthPoint; i++){
            hearts.push(
                <Image
                    key={`emptyHeart${i}`}
                    style={styles.heart}
                    source={require('../../assets/heart_empty.png')}
                ></Image>
            )
        }
        return hearts
    }

    return (
        <View style={styles.lifeBarContainer}>
            {hearts()}
        </View>
    );
}

const styles = StyleSheet.create({
    lifeBarContainer:{
        zIndex:1,
        position: 'absolute',
        left:Constants.MAX_WIDTH/2-((37.5*5+2*5)/2)-2,
        marginTop: 30,
        flexDirection: 'row',
    },
    heart:{
        width:41,
        height:37.5,
        marginRight:2
    }
})
export default LifeBar;
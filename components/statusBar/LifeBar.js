import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

function LifeBar({healthPoint}) {

    let hearts =()=>{
        let hearts = []
        for(let i = 0; i<healthPoint; i++){
            hearts.push(
                <Image
                    key={`heart${i}`}
                    style={styles.heart}
                    source={require('../../assets/favicon.png')}
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
        marginTop: 30,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heart:{
        width:50,
        height:50,
        backgroundColor:'gray'
    }
})
export default LifeBar;
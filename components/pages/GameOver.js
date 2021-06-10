import React from 'react';
import { StyleSheet, View } from 'react-native'
import Constants from '../../Constants'
import PrimaryLinkButton from '../buttons/PrimaryLinkButton'

function GameOver(props) {
    return (
        <View style={styles.gameOverContainer}>
            <PrimaryLinkButton buttonTitle={'Go back to main'} path={"/"}></PrimaryLinkButton>
            <PrimaryLinkButton buttonTitle={'Play Again'} path={"/game"}></PrimaryLinkButton>
        </View>
    );
}
const styles = StyleSheet.create({
    gameOverContainer:{
        backgroundColor:'black',
        position: 'absolute',
        zIndex:1,
        top:0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default GameOver;
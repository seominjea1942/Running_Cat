import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native'

function GamePauseButton(props) {
    return (
        <TouchableOpacity>
            <Image
            style={styles.pauseButton}
            source={require('../../assets/pauseButton.png')}
            />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    pauseButton:{
        position:'absolute',
        top: 20,
        right:60,
        width:50,
        height:50
    }
})

export default GamePauseButton;
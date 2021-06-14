import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Link } from "react-router-native";

function PrimaryLinkButton({buttonType, path,buttonWidth}) {

    let buttonImages = {
      play: require('../../assets/play_button.png'),
      store: require('../../assets/sotre_button.png'),
      play_again: require('../../assets/play_again_button.png'),
      home: require('../../assets/home_button.png'),
    }

    const styles = StyleSheet.create({
      primaryButtonContainer:{
          width: buttonWidth,
          height:80,
      },
      buttonStyle:{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
      }
    });
    
    return (
      <Link component={TouchableOpacity} to={path} style={styles.primaryButtonContainer}>
        {
          (buttonType)?<Image
          style={styles.buttonStyle}
          source={buttonImages[buttonType]}
        />:null
        }
      </Link>
    );
}


  export default PrimaryLinkButton;
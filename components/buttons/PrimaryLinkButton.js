import React,{useEffect,useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Link } from "react-router-native";
import axios from 'axios'


function PrimaryLinkButton({buttonType, path, email}) {

    
    let buttonImages = {
      play: require('../../assets/play_button.png'),
      store: require('../../assets/sotre_button.png'),
      play_again: require('../../assets/play_again_button.png'),
      home: require('../../assets/home_button.png'),
    }
    
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
const styles = StyleSheet.create({
    primaryButtonContainer:{
        width: 200,
        height:80,
    },
    buttonStyle:{
      resizeMode: 'contain',
      width: '100%',
      height: '100%',
    }
  });

  export default PrimaryLinkButton;
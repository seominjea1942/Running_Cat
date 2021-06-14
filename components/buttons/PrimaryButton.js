import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';

function PrimaryButton({buttonTitle}) {
    const [loaded] = useFonts({
      BMEULJIRO: require('../../assets/fonts/BMEULJIRO.otf'),
    });
    
    if (!loaded) {
      return null;
    }

    return (
        <TouchableHighlight style={styles.primaryButtonContainer}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {buttonTitle}
          </Text>
        </View>
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    primaryButtonContainer:{
        width: 100
    },
    primaryButton: {
      backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 18,
      marginBottom: 16
    },
    primaryButtonText:{
      color: 'white',
      fontFamily:'BMEULJIRO'
    }
  });

  export default PrimaryButton;
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link } from "react-router-native";

function PrimaryButton({buttonTitle}) {
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
        width: 300
    },
    primaryButton: {
      backgroundColor: 'purple',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      marginBottom: 16
    },
    primaryButtonText:{
      color: 'white'
    }
  });

  export default PrimaryButton;
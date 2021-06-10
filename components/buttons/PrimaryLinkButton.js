import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Link } from "react-router-native";

function PrimaryLinkButton({buttonTitle, path}) {
    return (
      <Link to={path} style={styles.primaryButtonContainer}>
        <View style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              {buttonTitle}
            </Text>
        </View>
      </Link>
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

  export default PrimaryLinkButton;
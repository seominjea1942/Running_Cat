import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Jump from '../../Jump'

function JumpButton({character, setMaxJumpCount, maxJumpCount}) {
    return (
        <TouchableHighlight
        onPress={()=>{
        Jump(character, setMaxJumpCount, maxJumpCount)
        }}>
        <View 
        style={styles.jumpButton}
        >
          <Text style={styles.jumpButtonText}>
            Jump
          </Text>
        </View>
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({
    jumpButton: {
      backgroundColor: 'purple',
      fontSize: 36,
      position: 'absolute',
      top: Constants.MAX_HEIGHT - 100,
      right: 60,
      padding: 24
    },
    jumpButtonText:{
      color: 'white'
    }
  });
  
export default JumpButton;
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Jump from '../../Jump'

function JumpButton({character, setMaxJumpCount, maxJumpCount}) {
    return (
        <TouchableOpacity
        onPress={()=>{
        Jump(character, setMaxJumpCount, maxJumpCount)
        }}
        style={styles.jumpButtonContainer}
        >
          <Image
          style ={styles.jumpButton}
          source={require('../../assets/JumpButton-01.png')}
          />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    jumpButtonContainer:{
      position: 'absolute',
      top: Constants.MAX_HEIGHT - 120,
      right:60,
      width: 180,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    jumpButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }
  });
  
export default JumpButton;
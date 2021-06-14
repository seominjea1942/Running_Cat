import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Punch from '../../Punch'
function PunchButton({mouseId, mouseDetected, entities, setMouseDetected, updateScore}) {
    return (
        <TouchableOpacity
            style={styles.punchButtonContainer}
            onPress={
                ()=>{
                    if(mouseDetected===true){
                        Punch(mouseId, entities)
                        setMouseDetected(false)
                        updateScore(10)
                    }
                }
            }
        >
            <Image
                style ={styles.punchButton}
                source={require('../../assets/PunchButton-01.png')}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    punchButtonContainer:{
        position: 'absolute',
        top: Constants.MAX_HEIGHT - 120,
        left:40,
        width: 180,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
      },
    punchButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }
})
export default PunchButton;
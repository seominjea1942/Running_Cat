import React from 'react';
import { StyleSheet,TouchableHighlight, Text, View } from 'react-native';
import Punch from '../../Punch'
function PunchButton({mouseId, mouseDetected, entities, setMouseDetected, updateScore}) {
    return (
        <TouchableHighlight
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
            <View style={styles.punchButton}>
                <Text style={styles.punchButtonText}>Punch</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    punchButton:{
        backgroundColor: 'pink',
      fontSize: 36,
      position: 'absolute',
      top: Constants.MAX_HEIGHT - 100,
      left: 40,
      padding: 24

    },
})
export default PunchButton;
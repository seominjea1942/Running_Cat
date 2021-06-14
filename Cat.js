import React, {Component} from 'react'
import { StyleSheet,View,Image } from 'react-native'

export default class Cat extends Component {
    
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height /2;

        return (
            <View
            style = {{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
            }}
            >
                <Image
                style={styles.image}
                source={require('./assets/cat_animation/splash_cat_animation1.gif')}
      />
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width:10,
        height:10,
    },
    image: {
        position:'absolute',
        width:458/3,
        height:315/3,
    }
});
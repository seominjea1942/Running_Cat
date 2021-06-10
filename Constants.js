import {Dimensions} from 'react-native';

export default Constants = {
    MAX_WIDTH: Dimensions.get('screen').width,
    MAX_HEIGHT: Dimensions.get('screen').height,
    GAP_SIZE: 200,
    PIPE_WIDTH: 50,
    TERRAIN_SIZE: { x:Dimensions.get('screen').width, y:50},
    MOUSE_SIZE:{x:100, y:100}
}
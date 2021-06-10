import Matter from 'matter-js';
import Constants from './Constants'

export function createMice(props) {
    let pipe1Height = 20;
    let mice = []
    let howManyMice = Math.floor(Math.random()*3)+1
    for(let i = 0; i<howManyMice; i++){
        mice.push(
            Matter.Bodies.rectangle(
                Constants.MAX_WIDTH + Math.floor(Math.random()*100),
                Constants.MAX_HEIGHT - Constants.TERRAIN_SIZE.y/2 - 50,
                Constants.MOUSE_SIZE.x,
                Constants.MOUSE_SIZE.y,
                {isSensor: true, isStatic: true, id:`mouse${i}`}
            )
        )
    }
    return mice
}
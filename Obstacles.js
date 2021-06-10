import Matter from 'matter-js'
import Constants from './Constants'

export function createObstacles(props) {
    generate =() =>{
        let pipe1Height = 20;
        let obstacles = [];
        let howManyObstacles = Math.floor(Math.random()*3)+1
        for(let i = 0; i<howManyObstacles; i++){
            obstacles.push(
                Matter.Bodies.rectangle(
                        Constants.MAX_WIDTH + Math.floor(Math.random()*100),
                        Constants.MAX_HEIGHT - Constants.TERRAIN_SIZE.y/2 - pipe1Height/2,
                        Constants.PIPE_WIDTH,
                        pipe1Height,
                        {isSensor: true, isStatic: true, id:'obstacle'}
                    )
            )
        }
        return obstacles
    }
    return generate()
}

// export function removeObstacles(props){
//     return(

//     );
// }

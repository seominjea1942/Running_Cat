import Matter from 'matter-js'
import Constants from './Constants'

export function createObstacles(props) {
    generate =() =>{
        let obstacles = [];
        let chooseTypeOfObstacle = Math.floor(Math.random()*2)
        let howManyObstacles = 1
        for(let i = 0; i<howManyObstacles; i++){
            switch (chooseTypeOfObstacle){
                case 0:
                    obstacles.push(
                        Matter.Bodies.rectangle(
                                Constants.MAX_WIDTH + Math.floor(Math.random()*100),
                                Constants.MAX_HEIGHT - Constants.TERRAIN_SIZE.y/2 - Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.y/2,
                                Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.x,
                                Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.y,
                                {isSensor: true, isStatic: true, id:`obstacle${chooseTypeOfObstacle}`}
                            )
                )
                break;
                case 1:
                    obstacles.push(
                        Matter.Bodies.rectangle(
                                Constants.MAX_WIDTH + Math.floor(Math.random()*100),
                                Constants.MAX_HEIGHT - Constants.TERRAIN_SIZE.y/2 - Constants.SHIPPING_BOX_SIZE.y/2,
                                Constants.SHIPPING_BOX_SIZE.x,
                                Constants.SHIPPING_BOX_SIZE.y,
                                {isSensor: true, isStatic: true, id:`obstacle${chooseTypeOfObstacle}`}
                            )
                )
                break;
            }
        }
        return obstacles
    }
    return generate()
}
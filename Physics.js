import Matter from 'matter-js';
import Constants from './Constants'
import ShippingBox from './renderers/ShippingBox'
import CollectionBox from './renderers/CollectionBox'
import Mouse from './renderers/Mouse'
const Physics = (entities, {touches, time}) => {
    let engine = entities.physics.engine;
    let obsatcleKeys = Object.keys(entities).filter((key)=>key.includes('obstacle'))
    let miceKeys = Object.keys(entities).filter((key)=>key.includes('mouse'))
    let obstacleRenderers = [CollectionBox,ShippingBox]
    //make obstacles move
    for(let i = 0; i<obsatcleKeys.length; i++){
        Matter.Body.translate(entities["obstacle"+ i].body, { x:-7, y:0 })
    }

    //make mice move
    for(let i = 0; i<miceKeys.length; i++){
        Matter.Body.translate(entities["mouse"+ i].body, { x:-10, y:0 })
    }

    //reset obstacles and mice
    //later I have to change obstalce0 and mouse0 to the better code.
    if(entities.obstacle0.body.position.x<-100){
        //obstacles
        let randomNum = Math.floor(Math.random()*2)
        let obstacleHeight = 0;
        switch (randomNum){
            case 0:
                entities.obstacle0.size[0]=Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.x
                entities.obstacle0.size[1]=Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.y
                obstacleHeight = Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.y;
                break;
            case 1:
                entities.obstacle0.size[0]=Constants.SHIPPING_BOX_SIZE.x
                entities.obstacle0.size[1]=Constants.SHIPPING_BOX_SIZE.y
                obstacleHeight = Constants.SHIPPING_BOX_SIZE.y;
                break;
        }
        entities["obstacle0"].body.position.y = Constants.MAX_HEIGHT - Constants.TERRAIN_SIZE.y/2 - obstacleHeight/2
        Matter.Body.translate(entities["obstacle0"].body, { x:+Constants.MAX_WIDTH+Math.floor(Math.random()*Constants.MAX_WIDTH), y:0})
        entities.obstacle0.renderer = obstacleRenderers[randomNum]
    }

    if(entities.mouse0.body.position.x<-100 || entities.mouse0.body.position.y<0){
        //mice
        Matter.Body.translate(entities["mouse0"].body, { x:+Constants.MAX_WIDTH+Math.floor(Math.random()*Constants.MAX_WIDTH), y:0 })
        Matter.Body.applyForce(entities["mouse0"].body, entities["mouse0"].body.position, {x:0.0, y:0.0})
        entities["mouse0"].renderer = Mouse
    }

    //update engine
    Matter.Engine.update(engine,time.data);
    return entities;
}

export default Physics;
import Matter from 'matter-js';
import Constants from './Constants'

const Physics = (entities, {touches, time}) => {
    let engine = entities.physics.engine;
    let obsatcleKeys = Object.keys(entities).filter((key)=>key.includes('obstacle'))
    let miceKeys = Object.keys(entities).filter((key)=>key.includes('mouse'))

    //make obstacles move
    for(let i = 0; i<obsatcleKeys.length; i++){
        Matter.Body.translate(entities["obstacle"+ i].body, { x:-5, y:0 })
    }

    //make mice move
    for(let i = 0; i<miceKeys.length; i++){
        Matter.Body.translate(entities["mouse"+ i].body, { x:-8, y:0 })
    }

    //reset obstacles and mice
    //later I have to change obstalce0 and mouse0 to the better code.
    if(entities.obstacle0.body.position.x<-100){
        //obstacles
        Matter.Body.translate(entities["obstacle0"].body, { x:+Constants.MAX_WIDTH+Math.floor(Math.random()*Constants.MAX_WIDTH), y:0 })
    }

    if(entities.mouse0.body.position.x<-100 || entities.mouse0.body.position.y<0){
        //mice
        Matter.Body.translate(entities["mouse0"].body, { x:+Constants.MAX_WIDTH+Math.floor(Math.random()*Constants.MAX_WIDTH), y:0 })
        Matter.Body.applyForce(entities["mouse0"].body, entities["mouse0"].body.position, {x:0.0, y:0.0})
        entities["mouse0"].color = 'orange'
    }

    //update engine
    Matter.Engine.update(engine,time.data);
    return entities;
}

export default Physics;
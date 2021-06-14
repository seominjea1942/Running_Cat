import Matter from 'matter-js'

function Jump(character, controlJump, jumpCount) {
    if(jumpCount>0){
        if(jumpCount>=2){
            Matter.Body.applyForce(character, character.position, {x:0.0, y:-0.4})
        }
        else{
            Matter.Body.applyForce(character, character.position, {x:0.0, y:-0.2})
        }
    controlJump(jumpCount-1)
    }
}

export default Jump;
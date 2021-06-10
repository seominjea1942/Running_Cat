import Matter from 'matter-js'

function Punch(mouseId, entities) {
    let mouse = entities[mouseId].body
    entities[mouseId].color = 'rgba(0,0,0,0)';
}

export default Punch;
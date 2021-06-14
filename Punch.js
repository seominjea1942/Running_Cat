import Matter from 'matter-js'

function Punch(mouseId, entities) {
    let mouse = entities[mouseId].body
    entities[mouseId].renderer = '';
}

export default Punch;
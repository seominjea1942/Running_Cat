import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from './Constants'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
import Cat from './Cat'
import {createMice} from './Mice'
import Terrain from './renderers/Terrain'
import Physics from './Physics'
import {createObstacles} from './Obstacles'
import JumpButton from './components/buttons/JumpButton'
import PunchButton from './components/buttons/PunchButton'
import LifeBar from './components/statusBar/LifeBar'
import {Redirect} from 'react-router-native'
import GamePauseButton from './components/buttons/GamePauseButton'
//obstalce renderers
import CollectionBox from './renderers/CollectionBox'
import ShippingBox from './renderers/ShippingBox'
import Mouse from './renderers/Mouse'
//loopAnimation
import AnimatedBackground from './AnimatedBackground'
//font
import * as Font from 'expo-font'
import {CredentialsContext} from './CredentialsContext'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
    this.state = {
      running: true,
      maxJumpCount: 2,
      healthPoint: 5,
      numOfObstacle: 0,
      mouseDetected: false,
      mouseId: '',
      score: 0
    }
  }

  updateScore =(number)=> {
    this.setState({
      score: this.state.score + number
    })
  }
  setMouseId = (id)=>{
    this.setState({
      mouseId: id
    })
  }
  setMouseDetected = (bool) => {
    this.setState({
      mouseDetected: bool
    })
  }

  setMaxJumpCount = (number) => {
    this.setState({maxJumpCount: number})
  }

  decreaseHealthPoint = (number) => {
    this.setState({healthPoint: number})
  }

  setupWorld = () =>{
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    let catSize = { x: 300/3, y:315/3};
    let cat = Matter.Bodies.rectangle(Constants.MAX_WIDTH/4+100, 0, catSize.x, catSize.y, {id:'cat'});
    let terrain = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT, Constants.TERRAIN_SIZE.x, Constants.TERRAIN_SIZE.y, { isStatic: true, id:'terrain'});

    //obstalces
    let obstacles = createObstacles();
    let obstaclesObjects = {}
    let obstacleRenderers = [CollectionBox, ShippingBox]
    
    obstacles.forEach((obstacle, index)=>{
      let renderNumber = obstacles[0].id.slice(-1)
      switch(renderNumber){
        case '0':
          obstaclesObjects[`obstacle${index}`] = {
            body: obstacle, size:[Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.x, Constants.OLD_CLOTH_COLLECTION_BOX_SIZE.y], renderer: obstacleRenderers[renderNumber]
          }
          break;
        case '1':
          obstaclesObjects[`obstacle${index}`] = {
            body: obstacle, size:[Constants.SHIPPING_BOX_SIZE.x, Constants.SHIPPING_BOX_SIZE.y], renderer: obstacleRenderers[renderNumber]
          }
          break;
      }

    })

    //mice
    let mice = createMice();
    let miceObjects = {}
    mice.forEach((mouse, index)=>{
      miceObjects[`mouse${index}`]={
        body:mouse, size:[Constants.MOUSE_SIZE.x, Constants.MOUSE_SIZE.y], renderer: Mouse
      }
    })

    //Don't forget to add Terrain
    Matter.World.add(world, [cat, terrain, ...obstacles, ...mice]);

    //set collision event dispatch
    Matter.Events.on(engine, "collisionStart", (event)=>{
      let collideSubject = event.pairs["0"].bodyB["id"]
      if(collideSubject.includes('obstacle')){
        this.gameEngine.dispatch({type: "collide"})
      }
      if(collideSubject.includes('mouse')){
        this.gameEngine.dispatch({type: "punch"})
        this.setMouseId(collideSubject)
      }
      if (collideSubject.includes('terrain')){
        this.setMaxJumpCount(2)
      }
    })

    //set collsion end event
    Matter.Events.on(engine, "collisionEnd", function(event) {
      let collideSubject = event.pairs["0"].bodyB["id"]
      if(collideSubject.includes('mouse')){
        this.setMouseDetected(false)
      }
    }.bind(this))

    return{
      physics: {engine: engine, world: world},
      cat: {body: cat, size:[catSize.x, catSize.y], renderer: Cat },
      terrain: {body: terrain, size:[Constants.TERRAIN_SIZE.x, Constants.TERRAIN_SIZE.y], color: '#515151', renderer: Terrain},
      ...obstaclesObjects,
      ...miceObjects
    }
  }

  onEvent = (e) => {
    if (e.type === "collide"){
      this.decreaseHealthPoint(this.state.healthPoint-1)
      if(this.state.healthPoint === 0){
        clearInterval(this.scoreTimer);
        this.setState({
          running: false
        })
      }
    }
    if (e.type === "punch"){
      this.setMouseDetected(true)
    }
  }

  componentDidMount(){
      this.scoreTimer = setInterval(()=>{this.updateScore(1)} , 1000);
      Font.loadAsync({
        'BMEULJIRO': require('./assets/fonts/BMEULJIRO.otf')
      })
  }

  
  render(){
      return (
        <View style={styles.gameContainer}>
          <AnimatedBackground/>
          <GameEngine
        ref = {(ref)=>{this.gameEngine = ref}}
        style = {styles.gameContainer}
        systems = {[Physics]}
        running = {(this.state.healthPoint>0)?this.state.running:!this.state.running}
        onEvent = {this.onEvent}
        entities = {this.entities}
        />
          <JumpButton
          character={this.entities.cat.body}
          setMaxJumpCount={this.setMaxJumpCount}
          maxJumpCount={this.state.maxJumpCount}
          ></JumpButton>
          <PunchButton
          mouseId={this.state.mouseId}
          mouseDetected={this.state.mouseDetected}
          entities={this.entities}
          setMouseDetected={this.setMouseDetected}
          updateScore={this.updateScore}
          >
          </PunchButton>
          <LifeBar healthPoint={this.state.healthPoint}></LifeBar>
          <Text style={styles.scoreStyle}>{`Score: ${this.state.score}`}</Text>
          {(!this.state.running)?
          <CredentialsContext.Consumer>
            {({storedCredentials})=>(
          <Redirect
          to={{
            pathname:'/gameover',
            state: { score: this.state.score,
              storedCredentials: storedCredentials
            }
          }}/>
            )}
          </CredentialsContext.Consumer>:null}
          <GamePauseButton/>
        </View>
      )
}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  },
  scoreStyle:{
    fontSize:36,
    position: 'absolute',
    top:26,
    left:40,
    fontFamily:'BMEULJIRO'
  }
});

import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Constants from './Constants'
import Matter from 'matter-js'
import { GameEngine } from 'react-native-game-engine'
import Bird from './Bird'
import {createMice} from './Mice'
import Terrain from './Terrain'
import Physics from './Physics'
import {createObstacles} from './Obstacles'
import JumpButton from './components/buttons/JumpButton'
import PunchButton from './components/buttons/PunchButton'
import LifeBar from './components/statusBar/LifeBar'
import {Redirect} from 'react-router-native'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      running: true,
      maxJumpCount: 2,
      healthPoint: 3,
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
    let birdSize = { x: 50, y:50 };
    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH/4, 0, birdSize.x, birdSize.y, {id:'bird'});
    let terrain = Matter.Bodies.rectangle(Constants.MAX_WIDTH/2, Constants.MAX_HEIGHT, Constants.TERRAIN_SIZE.x, Constants.TERRAIN_SIZE.y, { isStatic: true, id:'terrain'});
    let pipe1Height = 20;

    //obstalces
    let obstacles = createObstacles();
    let obstaclesObjects = {}
    obstacles.forEach((obstacle, index)=>{
      obstaclesObjects[`obstacle${index}`] = {
        body: obstacle, size:[Constants.PIPE_WIDTH, pipe1Height], color: 'green', renderer: Terrain
      }
    })

    //mice
    let mice = createMice();
    let miceObjects = {}
    mice.forEach((mouse, index)=>{
      miceObjects[`mouse${index}`]={
        body:mouse, size:[Constants.MOUSE_SIZE.x, Constants.MOUSE_SIZE.y], color: 'orange', renderer: Terrain
      }
    })

    //Don't forget to add Terrain
    Matter.World.add(world, [bird, terrain, ...obstacles, ...mice]);

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
      bird: {body: bird, size:[birdSize.x, birdSize.y], color:'red', renderer: Bird },
      terrain: {body: terrain, size:[Constants.TERRAIN_SIZE.x, Constants.TERRAIN_SIZE.y], color: 'blue', renderer: Terrain},
      ...obstaclesObjects,
      ...miceObjects
    }
  }

  onEvent = (e) => {
    if (e.type === "collide"){
      this.decreaseHealthPoint(this.state.healthPoint-1)
      // console.log("Collided")
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
  }

  render(){
      return (
        <View style={styles.gameContainer}>
          <GameEngine
          ref = {(ref)=>{this.gameEngine = ref}}
          style = {styles.gameContainer}
          systems = {[Physics]}
          running = {(this.state.healthPoint>0)?this.state.running:!this.state.running}
          onEvent = {this.onEvent}
          entities = {this.entities}
          />
          <JumpButton
          character={this.entities.bird.body}
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
          <Text>{this.state.score}</Text>
          {(!this.state.running)?<Redirect to={'/gameover'} />:null}
        </View>
      )
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverContainer: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  }
});

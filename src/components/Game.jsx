import * as PIXI from 'pixi.js';
import { Sprite, Text, Container } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import background from '../images/background.png';

import Bird from './Bird';
import DaveoLogo from './DaveoLogo';
import Stage from './Stage';
import Obstacle from './Obstacle';
import DualObstacle from './DualObstacle';
import StartButton from './StartButton';
import Mountain from './Mountain';
import Cloud from './Cloud';
import Rock from './Rock';
import Tree from './Tree';
import Elephant from './Elephant';
import DevFest from './DevFest';

import keyboard from './KeyboardController';

import { reset } from '../slices/gameSlice';
import { move as moveBird, jump, setJumpVelocity } from '../slices/birdSlice';
import Zeppelin from './Zeppelin';

const textStyle = new PIXI.TextStyle({
  align: 'center',
  fontWeight: 'bold',
  fill: ['#FFFFFF'],
  stroke: '#eef1f5',
  strokeThickness: 1,
  letterSpacing: 5,
  wordWrap: false,
  wordWrapWidth: 350,
});

const handleKeyDown = (event) => {
  console.log('User pressed: ', event.key);
};

function setupGame() {
  const dispatch = useDispatch();

  dispatch(reset());

  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
}

function displayObstacle(obstacle) {
  if (obstacle?.isDual) {
    return (
      <DualObstacle
        key={obstacle?.id}
        id={obstacle?.id}
        gap={obstacle?.gap}
        x={obstacle?.x}
        y={obstacle?.y}
        topId={obstacle?.id}
        bottomId={obstacle?.id}
        topHeight={obstacle?.height}
      />
    );
  }
  return (
    <Obstacle
      key={obstacle?.id}
      id={obstacle?.id}
      isTop={obstacle?.isTop}
      x={obstacle?.x}
      y={obstacle?.y}
      height={obstacle?.height}
      isDual={false}
    />
  );
}

function ObstacleContainer() {
  const obstacles = useSelector((state) => state.obstacle.obstacles);

  return (
    <Container>
      {obstacles.map((obstacle) => (
        displayObstacle(obstacle)
      ))}
    </Container>
  );
}

function BackgroundContainer() {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);

  const spaceKey = keyboard(' ');
  const enterKey = keyboard('Enter');

  enterKey.press = () => {
    if (gameHasStarted) {
      dispatch(jump());
    }
  };

  spaceKey.press = () => {
    if (gameHasStarted) {
      dispatch(jump());
    }
  };
  return (
    <Container>
      <Sprite
        image={background}
        interactive
        pointerdown={() => {
          if (gameHasStarted) {
            dispatch(setJumpVelocity(birdJumpVelocity));
            dispatch(jump());
          }
        }}
      />
    </Container>
  );
}

function StartButtonContainer() {
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);

  return (
    <Container>
      {!gameHasStarted && <StartButton x={width / 2} y={height / 2} scale={0.4} />}
    </Container>
  );
}

function ScoreContainer() {
  const score = useSelector((state) => state.game.score);
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  return (
    <Container
      x={width / 2}
      y={height / 10}
    >
      <Text text={score} style={textStyle} />
    </Container>
  );
}

function Game() {
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);

  setupGame();

  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x1099bb }}
      onKeyDown={handleKeyDown}
    >
      <BackgroundContainer />
      <Container>
        <Cloud x={width * 0.5} y={height * 0.5} scale={0.4} />
        <Cloud x={width} y={height * 0.45} scale={0.5} />
        <Mountain x={0.5 * width} y={height - 170} scale={0.5} />
        <Mountain x={0.25 * width} y={height - 170} scale={0.3} />
        <Rock x={width} y={height - 170} scale={0.6} />
        <Tree x={0.1 * width} y={height - 170} scale={0.15} />
        <Tree x={0.3 * width} y={height} scale={0.25} />
        <Tree x={0.8 * width} y={height * 0.86} scale={0.2} />
        <Elephant x={0.8 * width} y={height - 170} scale={0.5} />
        <Zeppelin x={0.7 * width} y={height * 0.2} scale={0.15} />
      </Container>
      <Container>
        <DaveoLogo x={0.1 * width} y={0.2 * height} scale={0.1} />
        <DevFest x={0.6 * width} y={0.42 * height} scale={0.1} />
      </Container>
      <Container>
        <Bird />
      </Container>
      <ObstacleContainer />
      <StartButtonContainer />
      <ScoreContainer />
    </Stage>
  );
}

export default Game;

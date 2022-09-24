import * as PIXI from 'pixi.js';
import { Sprite, Text, Container } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import background from '../images/background.png';

import Bird from './Bird';
import DaveoLogo from './DaveoLogo';
import Stage from './Stage';
import Obstacle from './Obstacle';
import StartButton from './StartButton';

import { addObstacle } from '../slices/obstacleSlice';
import { reset } from '../slices/gameSlice';
import { move as moveBird } from '../slices/birdSlice';

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

function setupGame() {
  const dispatch = useDispatch();

  dispatch(reset());

  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  dispatch(addObstacle({ angle: 180, x: width - 100, y: 0 }));
  dispatch(addObstacle({ angle: 0, x: width - 300, y: height }));
  dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
}

function ObstacleContainer() {
  const obstacles = useSelector((state) => state.obstacle.obstacles);

  return (
    <Container>
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          id={obstacle.id}
          angle={obstacle.angle}
          x={obstacle.x}
          y={obstacle.y}
        />
      ))}
    </Container>
  );
}

function StartButtonContainer() {
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);

  return (
    <Container>
      {!gameHasStarted && <StartButton x={width / 2} y={height / 2} />}
    </Container>
  );
}

function Game() {
  const score = useSelector((state) => state.game.score);
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);

  setupGame();

  return (
    <Stage
      width={width}
      height={height}
      options={{ backgroundColor: 0x1099bb }}
    >
      <Container>
        <Sprite
          image={background}
        />
      </Container>
      <Container>
        <DaveoLogo />
      </Container>
      <Container>
        <Bird />
      </Container>
      <ObstacleContainer />
      <StartButtonContainer />
      <Container
        x={width / 2}
        y={height / 10}
      >
        <Text text={score} style={textStyle} />
      </Container>
    </Stage>
  );
}

export default Game;

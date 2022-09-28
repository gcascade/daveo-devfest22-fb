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
import { move as moveBird, jump, setJumpVelocity } from '../slices/birdSlice';

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
  dispatch(addObstacle({ isTop: true, x: width - 100, y: 0 }));
  dispatch(addObstacle({ isTop: false, x: width - 300, y: height }));
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
          isTop={obstacle.isTop}
          x={obstacle.x}
          y={obstacle.y}
        />
      ))}
    </Container>
  );
}

function BackgroundContainer() {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  return (
    <Container>
      <Sprite
        image={background}
        interactive
        pointerdown={() => {
          if (gameHasStarted) {
            dispatch(jump());
            dispatch(setJumpVelocity(birdJumpVelocity));
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
      {!gameHasStarted && <StartButton x={width / 2} y={height / 2} />}
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
    >
      <BackgroundContainer />
      <Container>
        <DaveoLogo />
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

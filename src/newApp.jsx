import * as PIXI from 'pixi.js';
import {
  Stage as PixiStage, Sprite, Text, Container, useTick,
} from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch, ReactReduxContext } from 'react-redux';
import background from './images/background.png';
import birdImage from './images/balloon_120x120.png';
import obstacleImage from './images/obstacle.png';
import daveoImage from './images/daveo.png';
import ContextBridge from './ContextBridge';

const width = 1920;
const height = 1080;
const gravity = 1;

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

// eslint-disable-next-line react/prop-types
function Stage({ children, ...props }) {
  return (
    <ContextBridge
      Context={ReactReduxContext}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(children) => <PixiStage {...props}>{children}</PixiStage>}
    >
      {children}
    </ContextBridge>
  );
}

function onKeyDown(e) {
  if (e.keyCode === 32) {
    console.log('space');
  }
}

function DaveoLogo() {
  return (
    <Sprite image={daveoImage} scale={0.1} x={100} y={200} />
  );
}

function Bird() {
  document.addEventListener('keydown', onKeyDown);
  const x = useSelector((state) => state.birdX);
  const y = useSelector((state) => state.birdY);
  const dispatch = useDispatch();

  useTick((delta) => {
    dispatch({ type: 'APPLY_GRAVITY' });
  });

  return (
    <Sprite image={birdImage} x={x} y={y} />
  );
}

function BottomObstacle() {
  const [bottomObstacleX, setBottomObstacleX] = React.useState(width - 300);
  const [bottomObstacleY, setBottomObstacleY] = React.useState(height - 300);

  return (
    <Sprite image={obstacleImage} x={bottomObstacleX} y={bottomObstacleY} />
  );
}

function TopObstacle() {
  const [topObstacleX, setTopObstacleX] = React.useState(width - 100);
  const [topObstacleY, setTopObstacleY] = React.useState(300);

  return (
    <Sprite image={obstacleImage} x={topObstacleX} y={topObstacleY} angle={180} />
  );
}

function Game() {
  // const score = React.useReducer(reducer, initialState);
  const score = useSelector((state) => state.score);

  return (
    <Stage
      width={1920}
      height={1080}
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
      <Container>
        <TopObstacle />
      </Container>
      <Container>
        <BottomObstacle />
      </Container>
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

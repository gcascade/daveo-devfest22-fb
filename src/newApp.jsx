import * as PIXI from 'pixi.js';
import {
  Stage, Sprite, Text, Container, useTick,
} from '@inlet/react-pixi';

import React from 'react';
import background from './images/background.png';
import birdImage from './images/balloon_120x120.png';
import obstacleImage from './images/obstacle.png';
import daveoImage from './images/daveo.png';

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

function onKeyDown(e) {
  if (e.keyCode === 32) {
    console.log('space');
  }
}

function Bird() {
  document.addEventListener('keydown', onKeyDown);
  const [x, setX] = React.useState(width / 2);
  const [y, setY] = React.useState(height / 2);

  useTick((delta) => {
    if (y < height) {
      setY(y + gravity);
    } else {
      setY(height / 2);
    }
  });

  return (
    <Sprite image={birdImage} x={x} y={y} />
  );
}

function Game() {
  const score = 0;
  const topObstacleX = width - 100;
  const topObstacleY = 300;
  const bottomObstacleX = width - 300;
  const bottomObstacleY = height - 300;
  const scoreDisplay = `Score: ${score}`;

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
        <Sprite image={daveoImage} scale={0.1} x={100} y={200} />
      </Container>
      <Container>
        <Bird />
      </Container>
      <Container>
        <Sprite image={obstacleImage} x={topObstacleX} y={topObstacleY} angle={180} />
      </Container>
      <Container>
        <Sprite image={obstacleImage} x={bottomObstacleX} y={bottomObstacleY} />
      </Container>
      <Container
        x={width / 2}
        y={height / 10}
      >
        <Text text={scoreDisplay} style={textStyle} />
      </Container>
    </Stage>
  );
}

export default Game;

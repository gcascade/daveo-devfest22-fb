import * as PIXI from 'pixi.js';
import {
  Stage, Sprite, Text, Container,
} from '@inlet/react-pixi';

import React from 'react';
import background from './images/background.png';
import birdImage from './images/balloon_120x120.png';
import obstacleImage from './images/obstacle.png';
import daveoImage from './images/daveo.png';

const width = 1920;
const height = 1080;

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

function Game() {
  const score = 0;
  const birdX = width / 2;
  const birdY = height / 2;
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
        <Sprite image={birdImage} x={birdX} y={birdY} />
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

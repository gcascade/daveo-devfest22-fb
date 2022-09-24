import * as PIXI from 'pixi.js';
import { Sprite, Text, Container } from '@inlet/react-pixi';

import React from 'react';
import { useSelector } from 'react-redux';
import background from '../images/background.png';
import Bird from './Bird';
import DaveoLogo from './DaveoLogo';
import Stage from './Stage';
import Obstacle from './Obstacle';

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
  const score = useSelector((state) => state.game.score);
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const topObstacle = Obstacle({ angle: 180, x: width - 100, y: 300 });
  const bottomObstacle = Obstacle({ angle: 0, x: width - 300, y: height - 300 });

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
        {topObstacle}
      </Container>
      <Container>
        {bottomObstacle}
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

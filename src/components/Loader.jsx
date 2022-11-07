import React, { useCallback } from 'react';
import {
  Text, Container, useTick, Sprite, Graphics,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadSounds } from '../slices/soundSlice';
import image from '../images/loader.png';

function LoaderSprite({ gameWidth, gameHeight }) {
  const [rotate, setRotate] = React.useState(0);

  useTick((delta) => {
    setRotate(rotate + 0.05 * delta);
  });

  return (
    <Sprite
      image={image}
      x={0.5 * gameWidth}
      y={0.5 * gameHeight}
      rotation={rotate}
      anchor={0.5}
      scale={0.2}
    />
  );
}

const titleStyle = new PIXI.TextStyle({
  align: 'center',
  fontSize: 36,
  fontWeight: 'bold',
  fill: ['#FFFFFF'],
  stroke: '#000000',
  strokeThickness: 2,
  letterSpacing: 5,
  wordWrap: false,
  wordWrapWidth: 350,
});

export default function Loader({
  gameWidth, gameHeight, isMobile,
}) {
  const isLoaded = useSelector((state) => state.sound.isLoaded);
  const dispatch = useDispatch();
  import('../sounds').then((sound) => {
    if (!isLoaded) {
      sound.default();
      dispatch(loadSounds());
    }
  });

  const rectWidth = isMobile ? 400 : 0.4 * gameWidth;
  const rectHeight = isMobile ? 250 : 0.4 * gameHeight;
  const topLeftPoint = {
    x: isMobile ? (gameWidth - rectWidth) / 2 : 0.3 * gameWidth,
    y: isMobile ? (gameHeight - rectHeight) / 2 : 0.3 * gameHeight,
  };

  const draw = useCallback((context) => {
    context.clear();
    context.lineStyle(5, 0x000000, 1);
    context.beginFill(0x003c5a, 1);
    context.drawRoundedRect(
      topLeftPoint.x,
      topLeftPoint.y,
      rectWidth,
      rectHeight,
      15,
    );
    context.endFill();
  }, []);

  return (
    <Container>
      <Graphics draw={draw} />
      <Text
        text="Loading..."
        x={0.5 * gameWidth}
        y={0.5 * gameHeight - 75}
        anchor={0.5}
        style={titleStyle}
      />
      <LoaderSprite gameWidth={gameWidth} gameHeight={gameHeight} isMobile={isMobile} />
    </Container>
  );
}

Loader.propTypes = {
  gameWidth: PropTypes.number.isRequired,
  gameHeight: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
};

Loader.defaultProps = {
  isMobile: false,
};

LoaderSprite.propTypes = {
  gameWidth: PropTypes.number.isRequired,
  gameHeight: PropTypes.number.isRequired,
};

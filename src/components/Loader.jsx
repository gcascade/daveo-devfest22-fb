import React from 'react';
import {
  Text, Container, useTick, Sprite,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadSounds } from '../slices/soundSlice';
import image from '../images/loader.png';

function LoaderSprite({ x, y }) {
  const [rotate, setRotate] = React.useState(0);

  useTick((delta) => {
    setRotate(rotate + 0.05 * delta);
  });

  return (
    <Sprite
      image={image}
      x={x}
      y={y}
      rotation={rotate}
      anchor={0.5}
      scale={0.1}
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
  x, y,
}) {
  const isLoaded = useSelector((state) => state.sound.isLoaded);
  const dispatch = useDispatch();
  import('../sounds').then((sound) => {
    if (!isLoaded) {
      sound.default();
      dispatch(loadSounds());
    }
  });

  return (
    <Container>
      <Text
        text="Loading..."
        x={x}
        y={y - 75}
        anchor={0.5}
        style={titleStyle}
      />
      <LoaderSprite x={x} y={y} />
    </Container>
  );
}

Loader.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

LoaderSprite.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

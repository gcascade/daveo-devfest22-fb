import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatedSprite, Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import elephantImage from '../images/elephant.png';
import elephantImage2 from '../images/elephant2.png';

export default function Elephant({
  x, y, scale,
}) {
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);
  const playAnimation = gameHasStarted && !paused;

  // dirty hack to make the elephant move
  if (playAnimation) {
    return (
      <AnimatedSprite
        images={[elephantImage, elephantImage2]}
        animationSpeed={0.05}
        scale={scale}
        x={x}
        y={y}
        anchor={0.5}
      />
    );
  }

  return (
    <Sprite
      image={elephantImage}
      scale={scale}
      x={x}
      y={y}
      anchor={0.5}
    />
  );
}

Elephant.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

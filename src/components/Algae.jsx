import React from 'react';
import { useSelector } from 'react-redux';
import { Sprite, AnimatedSprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import algaeImage from '../images/algae.png';
import algaeImage2 from '../images/algae2.png';

export default function Algae({
  x, y, scale, mirrored,
}) {
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);
  const playAnimation = gameHasStarted && !paused;

  if (playAnimation) {
    return (
      <AnimatedSprite
        images={[algaeImage, algaeImage2]}
        animationSpeed={0.01}
        scale={{ x: mirrored ? -scale : scale, y: scale }}
        x={x}
        y={y}
        anchor={0.5}
      />
    );
  }

  return (
    <Sprite
      image={algaeImage}
      scale={{ x: mirrored ? -scale : scale, y: scale }}
      x={x}
      y={y}
      anchor={0.5}
    />
  );
}

Algae.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  mirrored: PropTypes.bool,
};

Algae.defaultProps = {
  mirrored: false,
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import pauseImage from '../images/pause.png';
import playImage from '../images/play.png';
import { pauseGame, resumeGame } from '../slices/gameSlice';

export default function PauseButton({
  x, y, scale,
}) {
  const paused = useSelector((state) => state.game.paused);
  const changingLevel = useSelector((state) => state.game.changingLevel);
  const dispatch = useDispatch();

  return (
    <Sprite
      image={paused ? playImage : pauseImage}
      scale={scale}
      x={x}
      y={y}
      anchor={0.5}
      interactive
      pointerdown={() => {
        if (!changingLevel) {
          if (!paused) {
            dispatch(pauseGame());
          } else {
            dispatch(resumeGame());
          }
        }
      }}
    />
  );
}

PauseButton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

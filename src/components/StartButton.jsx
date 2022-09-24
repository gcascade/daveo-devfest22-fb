import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import startImage from '../images/start.png';
import { startGame } from '../slices/gameSlice';

function Start({ x, y }) {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  return (
    <Sprite
      image={startImage}
      x={x}
      y={y}
      interactive
      pointerdown={() => {
        if (!gameHasStarted) {
          dispatch(startGame());
        }
      }}
      anchor={0.5}
    />
  );
}

Start.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Start;

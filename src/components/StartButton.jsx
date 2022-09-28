import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import startImage from '../images/start.png';
import { startGame, reset } from '../slices/gameSlice';
import { addObstacle, removeAllObstacles } from '../slices/obstacleSlice';
import { move as moveBird, resetBird } from '../slices/birdSlice';

function Start({ x, y }) {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);

  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  return (
    <Sprite
      image={startImage}
      x={x}
      y={y}
      interactive
      pointerdown={() => {
        if (!gameHasStarted) {
          dispatch(reset());
          dispatch(resetBird());
          dispatch(removeAllObstacles());
          dispatch(addObstacle({ isTop: true, x: width - 100, y: 0 }));
          dispatch(addObstacle({ isTop: false, x: width - 300, y: height }));
          dispatch(addObstacle({ isTop: true, x: width + 100, y: 0 }));
          dispatch(addObstacle({ isTop: false, x: width + 100, y: height }));
          dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
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

import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import startImage from '../images/start.png';
import { startGame, reset, setGameSpeed } from '../slices/gameSlice';
import { addObstacle, addDualObstacle, removeAllObstacles } from '../slices/obstacleSlice';
import { move as moveBird, resetBird } from '../slices/birdSlice';

function Start({ x, y, scale }) {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const obstacleMaxSpacing = useSelector((state) => state.game.obstacleMaxSpacing);
  const gap = useSelector((state) => state.game.obstacleGap);

  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  const initialTopObstacleHeight = 0;
  const initialBottomObstacleHeight = height;
  return (
    <Sprite
      image={startImage}
      x={x}
      y={y}
      scale={scale}
      interactive
      pointerdown={() => {
        if (!gameHasStarted) {
          dispatch(reset());
          dispatch(resetBird());
          dispatch(removeAllObstacles());
          dispatch(setGameSpeed(2));
          dispatch(addDualObstacle({
            isTop: true,
            x: width,
            height: (height - gap) / 2,
            gap,
          }));
          dispatch(addDualObstacle({
            isTop: true,
            x: width + obstacleMaxSpacing,
            height: (height - gap) / 2,
            gap,
          }));
          dispatch(addObstacle({
            isTop: false,
            x: width + 2 * obstacleMaxSpacing,
            y: initialBottomObstacleHeight,
            height: 0.55 * height,
          }));
          dispatch(addObstacle({
            isTop: true,
            x: width + 3 * obstacleMaxSpacing,
            y: initialTopObstacleHeight,
            height: 0.55 * height,
          }));
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
  scale: PropTypes.number.isRequired,
};

export default Start;

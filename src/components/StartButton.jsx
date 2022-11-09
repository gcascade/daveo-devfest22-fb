import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import { sound } from '@pixi/sound';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import startImage from '../images/start.png';
import { startGame, reset, setGameSpeed } from '../slices/gameSlice';
import { addObstacle, addDualObstacle, removeAllObstacles } from '../slices/obstacleSlice';
import { move as moveBird, resetBird } from '../slices/birdSlice';
import { reset as resetBonus } from '../slices/bonusSlice';
import { loop, play, stopAll } from '../slices/soundSlice';
import { bgm } from '../constants';
import { randomFromList } from '../utils/randomUtils';

function Start({
  x, y, scale, width, height, isMobile,
}) {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const gap = useSelector((state) => state.game.obstacleGap);
  const initialTopObstacleHeight = 0;
  const initialBottomObstacleHeight = height;
  const obstacleMinSpacing = useSelector((state) => state.game.obstacleMinSpacing);
  let obstacleSpacing = 0.25 * width > obstacleMinSpacing ? 0.25 * width : obstacleMinSpacing;

  if (isMobile) {
    obstacleSpacing *= 2 / 3;
  }
  const mainVolume = useSelector((state) => state.sound.mainVolume);
  const effectVolume = mainVolume;
  const initGameSpeed = useSelector((state) => state.game.initGameSpeed);

  return (
    <Sprite
      image={startImage}
      x={x}
      y={y}
      scale={scale}
      interactive
      pointerdown={() => {
        sound.context.playEmptySound();
        dispatch(stopAll());
        dispatch(play({ name: 'start', volume: effectVolume }));
        const music = randomFromList(bgm);
        console.log(`Playing ${music}`);
        dispatch(loop({ name: music, volume: mainVolume }));
        if (!gameHasStarted) {
          dispatch(reset());
          dispatch(resetBird());
          dispatch(resetBonus());
          dispatch(removeAllObstacles());
          dispatch(setGameSpeed(initGameSpeed));
          dispatch(addDualObstacle({
            isTop: true,
            x: width,
            height: (height - gap) / 2,
            gap,
          }));
          dispatch(addDualObstacle({
            isTop: true,
            x: width + obstacleSpacing,
            height: (height - gap) / 2,
            gap,
          }));
          dispatch(addObstacle({
            isTop: false,
            x: width + 2 * obstacleSpacing,
            y: initialBottomObstacleHeight,
            height: 0.4 * height,
          }));
          dispatch(addObstacle({
            isTop: true,
            x: width + 3 * obstacleSpacing,
            y: initialTopObstacleHeight,
            height: 0.4 * height,
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Start;

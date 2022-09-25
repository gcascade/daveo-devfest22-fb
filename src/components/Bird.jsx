import { Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import birdImage from '../images/balloon_120x120.png';
import { move, setY } from '../slices/birdSlice';
import { endGame } from '../slices/gameSlice';

export default function Bird() {
  const x = useSelector((state) => state.bird.x);
  const y = useSelector((state) => state.bird.y);
  const gravity = useSelector((state) => state.game.gravity);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const dispatch = useDispatch();

  useTick(() => {
    if (gameHasStarted) {
      if (y < height) {
        dispatch(move({ y: gravity }));
      } else {
        dispatch(setY(0));
        dispatch(endGame());
      }
    }
  });

  return (
    <Sprite image={birdImage} x={x} y={y} anchor={0.5} />
  );
}

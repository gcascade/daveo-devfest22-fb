import { Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import birdImage from '../images/balloon_daveo_94x120.png';
import {
  move, setY, setJumpVelocity, stopJump,
} from '../slices/birdSlice';
import { endGame } from '../slices/gameSlice';

export default function Bird() {
  const x = useSelector((state) => state.bird.x);
  const y = useSelector((state) => state.bird.y);
  const isJumping = useSelector((state) => state.bird.isJumping);
  const gravity = useSelector((state) => state.game.gravity);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const jumpVelocity = useSelector((state) => state.bird.jumpVelocity);
  const defaultJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const dispatch = useDispatch();

  useTick((delta) => {
    if (gameHasStarted) {
      if (isJumping) {
        const jumpHeight = (-gravity / 2) * delta ** 2 + jumpVelocity * delta;
        dispatch(move({ y: -jumpHeight }));
        dispatch(setJumpVelocity(jumpVelocity - gravity * delta));
        console.log(jumpHeight);
        if (jumpVelocity <= 0) {
          dispatch(setJumpVelocity(defaultJumpVelocity));
          dispatch(stopJump());
        }
      } else if (y < height) {
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

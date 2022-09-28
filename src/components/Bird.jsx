import { Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import birdImage from '../images/balloon_daveo_94x120.png';
import {
  move, setJumpVelocity, stopJump,
} from '../slices/birdSlice';
import { endGame } from '../slices/gameSlice';

export default function Bird() {
  const x = useSelector((state) => state.bird.x);
  const y = useSelector((state) => state.bird.y);
  const birdHeight = useSelector((state) => state.game.birdHeight);
  const isJumping = useSelector((state) => state.bird.isJumping);
  const gravity = useSelector((state) => state.game.gravity);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const jumpVelocity = useSelector((state) => state.bird.jumpVelocity);
  const defaultJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);
  const dispatch = useDispatch();

  useTick((delta) => {
    if (gameHasStarted) {
      if (isJumping) {
        const jumpHeight = (-(gravity * gameSpeed) / 2) * delta ** 2 + jumpVelocity * delta;
        dispatch(move({ y: -jumpHeight }));
        dispatch(setJumpVelocity(jumpVelocity - gravity * delta));
        if (jumpVelocity <= 0) {
          dispatch(setJumpVelocity(defaultJumpVelocity));
          dispatch(stopJump());
        }
      } else if (y + birdHeight / 2 < height) {
        dispatch(move({ y: gravity * gameSpeed }));
      } else {
        dispatch(endGame());
      }
    }
  });

  return (
    <Sprite image={birdImage} x={x} y={y} anchor={0.5} />
  );
}

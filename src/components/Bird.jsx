import { Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import birdImage from '../images/balloon_daveo_94x120.png';
import nautilusImage from '../images/nautilus_150x37.png';
import {
  move, setJumpVelocity, stopJump, setY,
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
  const dispatch = useDispatch();
  const defaultOffset = birdHeight / 2;
  const godMode = useSelector((state) => state.game.godMode);
  const paused = useSelector((state) => state.game.paused);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  const image = isSeaWorld ? nautilusImage : birdImage;

  useTick((delta) => {
    if (!paused && gameHasStarted) {
      if (isJumping) {
        const jumpHeight = (-(gravity) / 2) * delta ** 2 + jumpVelocity * delta;

        if (y - jumpHeight >= defaultOffset) {
          dispatch(move({ y: -jumpHeight }));
          dispatch(setJumpVelocity(jumpVelocity - gravity * delta));
        } else {
          dispatch(setY(defaultOffset));
          dispatch(setJumpVelocity(defaultJumpVelocity));
          dispatch(stopJump());
        }
        if (jumpVelocity <= 0) {
          dispatch(setJumpVelocity(defaultJumpVelocity));
          dispatch(stopJump());
        }
      } else if (y + defaultOffset < height) {
        dispatch(move({ y: gravity }));
      } else if (!godMode) {
        dispatch(endGame());
      }
    }
  });

  return (
    <Sprite image={image} x={x} y={y} anchor={0.5} />
  );
}

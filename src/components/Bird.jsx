import { AnimatedSprite, Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { sound } from '@pixi/sound';
import { useDispatch, useSelector } from 'react-redux';
import balloonImage from '../images/balloon_daveo.png';
import nautilusImage from '../images/nautilus.png';
import transparentImage from '../images/transparent.png';
import {
  move, resetFallVelocity, setFallVelocity, setJumpVelocity, setY, stopJump,
} from '../slices/birdSlice';
import { endGame } from '../slices/gameSlice';

export default function Bird() {
  const x = useSelector((state) => state.bird.x);
  const y = useSelector((state) => state.bird.y);
  const birdHeight = useSelector((state) => state.game.birdHeight);
  const birdScale = useSelector((state) => state.game.birdScale);
  const isJumping = useSelector((state) => state.bird.isJumping);
  const gravity = useSelector((state) => state.game.gravity);
  const fallVelocity = useSelector((state) => state.bird.fallVelocity);
  const height = useSelector((state) => state.game.height);
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const jumpVelocity = useSelector((state) => state.bird.jumpVelocity);
  const defaultJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const dispatch = useDispatch();
  const defaultOffset = birdHeight / 2;
  const godMode = useSelector((state) => state.game.godMode);
  const paused = useSelector((state) => state.game.paused);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);
  const playHitAnimation = useSelector((state) => state.bird.invincible);

  const image = isSeaWorld ? nautilusImage : balloonImage;

  useTick((delta) => {
    if (!paused && gameHasStarted) {
      if (isJumping) {
        const jumpHeight = (-(gravity) / 2) * delta ** 2 + jumpVelocity * delta;

        if (y - jumpHeight >= defaultOffset) {
          dispatch(move({ y: -jumpHeight }));
          dispatch(setJumpVelocity(jumpVelocity - gravity * delta));
          dispatch(resetFallVelocity());
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
        dispatch(move({ y: fallVelocity }));
        dispatch(setFallVelocity(fallVelocity + gravity * 0.025));
      } else if (!godMode) {
        dispatch(endGame());
        sound.stopAll();
        sound.play('game_over');
      }
    }
  });

  const nautilusScale = 0.10 * birdScale;
  const ballonScale = 0.125 * birdScale;
  const xScale = isSeaWorld ? -nautilusScale : ballonScale;
  const yScale = isSeaWorld ? nautilusScale : ballonScale;

  if (playHitAnimation) {
    return (
      <AnimatedSprite
        images={[image, transparentImage]}
        scale={{ x: xScale, y: yScale }}
        x={x}
        y={y}
        anchor={0.5}
        isPlaying={playHitAnimation}
        animationSpeed={0.2}
      />
    );
  }
  // workaround to force the default image after animation
  // best way would be to use PIXI.AnimatedSprite and not react-pixi AnimatedSprite
  return (
    <Sprite
      image={image}
      scale={{ x: xScale, y: yScale }}
      x={x}
      y={y}
      anchor={0.5}
    />
  );
}

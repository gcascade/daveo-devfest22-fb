import { Sprite, useTick } from '@inlet/react-pixi';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import birdImage from '../images/balloon_120x120.png';
import { move, setY } from '../slices/birdSlice';

function onKeyDown(e) {
  if (e.keyCode === 32) {
    console.log('space');
  }
}

export default function Bird() {
  document.addEventListener('keydown', onKeyDown);
  const x = useSelector((state) => state.bird.x);
  const y = useSelector((state) => state.bird.y);
  const gravity = useSelector((state) => state.game.gravity);
  const height = useSelector((state) => state.game.height);
  const dispatch = useDispatch();

  useTick(() => {
    if (y < height - 120) {
      dispatch(move({ y: gravity }));
    } else {
      dispatch(setY(0));
    }
  });

  return (
    <Sprite image={birdImage} x={x} y={y} />
  );
}

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import helpImage from '../images/question.png';
import { displayHelp, hideHelp } from '../slices/gameSlice';

export default function HelpButton({
  x, y, scale,
}) {
  const showHelp = useSelector((state) => state.game.showHelp);
  const dispatch = useDispatch();

  return (
    <Sprite
      image={helpImage}
      scale={scale}
      x={x}
      y={y}
      anchor={0.5}
      interactive
      pointerdown={() => {
        if (!showHelp) {
          dispatch(displayHelp());
        } else {
          dispatch(hideHelp());
        }
      }}
    />
  );
}

HelpButton.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

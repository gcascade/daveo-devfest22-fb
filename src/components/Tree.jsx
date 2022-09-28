import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import treeImage from '../images/tree.png';

export default function Tree({ x, y, scale }) {
  return (
    <Sprite image={treeImage} scale={scale} x={x} y={y} anchor={(0.5, 1)} />
  );
}

Tree.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

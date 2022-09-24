import React from 'react';
import { Sprite } from '@inlet/react-pixi';
import daveoImage from '../images/daveo.png';

export default function DaveoLogo() {
  return (
    <Sprite image={daveoImage} scale={0.1} x={100} y={200} />
  );
}

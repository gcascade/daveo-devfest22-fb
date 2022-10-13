import React, { useState } from 'react';
import { Container, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import DaveoLogo from './DaveoLogo';
import Mountain from './Mountain';
import Cloud from './Cloud';
import Rock from './Rock';
import Tree from './Tree';
import Elephant from './Elephant';
import DevFest from './DevFest';
import Zeppelin from './Zeppelin';

function moveElementHorizontally(x, setX, resetValue, speed) {
  if ((speed < 0 && x > 0) || (speed > 0 && x < 1920)) {
    setX(x + speed);
  } else {
    setX(resetValue);
  }
}

export default function AirWorld({ width, height }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  const gameIsStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);

  const animationEnabled = useSelector((state) => state.game.animationEnabled);

  const gameIsRunning = gameIsStarted && !paused;

  const [cloud1x, setCloud1x] = useState(0.5 * width);
  const [cloud2x, setCloud2x] = useState(1 * width);
  const [mountain1x, setMountain1x] = useState(0.5 * width);
  const [mountain2x, setMountain2x] = useState(0.25 * width);
  const [rockX, setRockX] = useState(1 * width);
  const [tree1x, setTree1x] = useState(0.1 * width);
  const [tree2x, setTree2x] = useState(0.3 * width);
  const [tree3x, setTree3x] = useState(0.8 * width);
  const [elephantX, setElephantX] = useState(0.8 * width);
  const [zeppelinX, setZeppelinX] = useState(0.7 * width);
  const [daveoLogoX, setDaveoLogoX] = useState(0.1 * width);
  const [devFestX, setDevFestX] = useState(0.6 * width);

  useTick(() => {
    if (animationEnabled && gameIsRunning) {
      moveElementHorizontally(cloud1x, setCloud1x, width, -0.1);
      moveElementHorizontally(cloud2x, setCloud2x, width, -0.1);
      moveElementHorizontally(mountain1x, setMountain1x, width, -0.1);
      moveElementHorizontally(mountain2x, setMountain2x, width, -0.1);
      moveElementHorizontally(rockX, setRockX, width, -0.1);
      moveElementHorizontally(tree1x, setTree1x, width, -1);
      moveElementHorizontally(tree2x, setTree2x, width, -1);
      moveElementHorizontally(tree3x, setTree3x, width, -1);
      moveElementHorizontally(elephantX, setElephantX, width, -3);
      moveElementHorizontally(zeppelinX, setZeppelinX, 0, 2);
      moveElementHorizontally(daveoLogoX, setDaveoLogoX, 0, 1);
      moveElementHorizontally(devFestX, setDevFestX, 0, 1);
    }
  });

  return (
    <Container>
      {!isSeaWorld && (
        <>
          <Cloud x={cloud1x} y={height * 0.5} scale={0.4} />
          <Cloud x={cloud2x} y={height * 0.45} scale={0.5} />
          <Mountain x={mountain1x} y={0.85 * height} scale={0.5} />
          <Mountain x={mountain2x} y={0.85 * height} scale={0.3} />
          <Rock x={rockX} y={0.85 * height} scale={0.6} />
          <Tree x={tree1x} y={0.85 * height} scale={0.15} />
          <Tree x={tree2x} y={1 * height} scale={0.25} />
          <Tree x={tree3x} y={1 * height * 0.86} scale={0.2} />
          <Elephant x={elephantX} y={0.85 * height} scale={0.5} />
          <Zeppelin x={zeppelinX} y={0.2 * height} scale={0.15} />
          <Container>
            <DaveoLogo x={daveoLogoX} y={0.2 * height} scale={0.1} color={1} />
            <DevFest x={devFestX} y={0.42 * height} scale={0.1} color={1} />
          </Container>
        </>
      )}
    </Container>

  );
}

AirWorld.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

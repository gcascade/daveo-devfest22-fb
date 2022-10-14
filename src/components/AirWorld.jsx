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

import { moveElementHorizontally } from '../utils/movementUtils';

export default function AirWorld({ width, height }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  const gameIsStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);

  const animationEnabled = useSelector((state) => state.game.animationEnabled);

  const gameIsRunning = gameIsStarted && !paused;

  const [cloud1x, setCloud1x] = useState(0.5 * width);
  const [cloud2x, setCloud2x] = useState(1 * width);
  const [cloud3x, setCloud3x] = useState(1.5 * width);
  const [mountain1x, setMountain1x] = useState(0.5 * width);
  const [mountain2x, setMountain2x] = useState(0.25 * width);
  const [mountain3x, setMountain3x] = useState(1.25 * width);
  const [rockX, setRockX] = useState(1 * width);
  const [tree1x, setTree1x] = useState(0.1 * width);
  const [tree2x, setTree2x] = useState(0.3 * width);
  const [tree3x, setTree3x] = useState(0.8 * width);
  const [tree4x, setTree4x] = useState(1.2 * width);
  const [tree5x, setTree5x] = useState(1.3 * width);
  const [tree6x, setTree6x] = useState(1.5 * width);
  const [tree7x, setTree7x] = useState(1.8 * width);
  const [elephantX, setElephantX] = useState(0.5 * width);
  const [zeppelinX, setZeppelinX] = useState(0.7 * width);
  const [daveoLogoX, setDaveoLogoX] = useState(0.1 * width);
  const [devFestX, setDevFestX] = useState(0.6 * width);

  useTick(() => {
    if (isSeaWorld) {
      return;
    }
    if (animationEnabled && gameIsRunning) {
      moveElementHorizontally(cloud1x, setCloud1x, 2 * width, -0.1);
      moveElementHorizontally(cloud2x, setCloud2x, 2 * width, -0.1);
      moveElementHorizontally(cloud3x, setCloud3x, 2 * width, -0.1);
      moveElementHorizontally(mountain1x, setMountain1x, 2 * width, -0.1);
      moveElementHorizontally(mountain2x, setMountain2x, 2 * width, -0.1);
      moveElementHorizontally(mountain3x, setMountain3x, 2 * width, -0.1);
      moveElementHorizontally(rockX, setRockX, 2 * width, -0.1);
      moveElementHorizontally(tree1x, setTree1x, 2 * width, -0.1);
      moveElementHorizontally(tree2x, setTree2x, 2 * width, -1);
      moveElementHorizontally(tree3x, setTree3x, 2 * width, -0.1);
      moveElementHorizontally(tree4x, setTree4x, 2 * width, -0.1);
      moveElementHorizontally(tree5x, setTree5x, 2 * width, -0.1);
      moveElementHorizontally(tree6x, setTree6x, 2 * width, -0.1);
      moveElementHorizontally(tree7x, setTree7x, 2 * width, -1);
      moveElementHorizontally(elephantX, setElephantX, 2 * width, -0.1);
      moveElementHorizontally(zeppelinX, setZeppelinX, -2 * width, 2);
      moveElementHorizontally(daveoLogoX, setDaveoLogoX, -width, 0.1);
      moveElementHorizontally(devFestX, setDevFestX, -width, 0.1);
    }
  });

  const hidden = false;

  return (
    <Container>
      {!isSeaWorld && (
        <>
          <Cloud x={cloud1x} y={height * 0.5} scale={0.4} />
          <Cloud x={cloud2x} y={height * 0.45} scale={0.5} />
          <Mountain x={mountain1x} y={0.85 * height} scale={0.5} />
          <Mountain x={mountain2x} y={0.85 * height} scale={0.3} />
          <Rock x={rockX} y={0.85 * height} scale={0.5} />
          <Tree x={tree1x} y={0.85 * height} scale={0.15} />
          <Tree x={tree2x} y={1 * height} scale={0.25} />
          <Tree x={tree3x} y={1 * height * 0.86} scale={0.2} />
          <Zeppelin x={zeppelinX} y={0.2 * height} scale={0.15} />
          <Container>
            <DaveoLogo x={daveoLogoX} y={0.2 * height} scale={0.1} color={1} />
            <DevFest x={devFestX} y={0.42 * height} scale={0.1} color={1} />
          </Container>
          <Cloud x={cloud3x} y={height * 0.5} scale={0.4} />
          <Mountain x={mountain1x} y={0.85 * height} scale={0.5} />
          <Mountain x={mountain2x} y={0.85 * height} scale={0.3} />
          <Rock x={rockX} y={0.85 * height} scale={0.6} />
          <Tree x={tree1x} y={0.85 * height} scale={0.15} />
          <Tree x={tree3x} y={1 * height * 0.86} scale={0.2} />
          <Tree x={tree4x} y={0.85 * height} scale={0.15} />
          <Tree x={tree5x} y={0.85 * height} scale={0.25} />
          <Tree x={tree6x} y={0.86 * height} scale={0.2} />
          <Tree x={tree7x} y={1 * height} scale={0.2} />
          <Tree x={tree2x} y={1 * height} scale={0.25} />
          { !hidden && (<Elephant x={elephantX} y={0.85 * height} scale={0.1} />) }
          <Zeppelin x={zeppelinX} y={0.2 * height} scale={0.15} />
        </>
      )}
    </Container>

  );
}

AirWorld.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
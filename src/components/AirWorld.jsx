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
import Ground from './Ground';

import { moveElementHorizontally } from '../utils/movementUtils';

export default function AirWorld({ width, height, isMobile }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  const gameIsStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);

  const animationEnabled = useSelector((state) => state.game.animationEnabled);

  const gameIsRunning = gameIsStarted && !paused;

  const [cloud1x, setCloud1x] = useState(0.5 * width);
  const [cloud2x, setCloud2x] = useState(0.9 * width);
  const [cloud3x, setCloud3x] = useState(1.5 * width);
  const [cloud4x, setCloud4x] = useState(2 * width);
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

  useTick((delta) => {
    if (isSeaWorld) {
      return;
    }
    if (animationEnabled && gameIsRunning) {
      moveElementHorizontally(cloud1x, setCloud1x, 2 * width, -0.1 * delta);
      moveElementHorizontally(cloud2x, setCloud2x, 2 * width, -0.1 * delta);
      moveElementHorizontally(cloud3x, setCloud3x, 2 * width, -0.1 * delta);
      moveElementHorizontally(cloud4x, setCloud4x, 2 * width, -0.1 * delta);
      moveElementHorizontally(mountain1x, setMountain1x, 2 * width, -0.1 * delta);
      moveElementHorizontally(mountain2x, setMountain2x, 2 * width, -0.1 * delta);
      moveElementHorizontally(mountain3x, setMountain3x, 2 * width, -0.1 * delta);
      moveElementHorizontally(rockX, setRockX, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree1x, setTree1x, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree2x, setTree2x, 2 * width, -1 * delta);
      moveElementHorizontally(tree3x, setTree3x, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree4x, setTree4x, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree5x, setTree5x, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree6x, setTree6x, 2 * width, -0.1 * delta);
      moveElementHorizontally(tree7x, setTree7x, 2 * width, -1 * delta);
      moveElementHorizontally(elephantX, setElephantX, 2 * width, -0.5 * delta);
      moveElementHorizontally(zeppelinX, setZeppelinX, -2 * width, 2 * delta);
      moveElementHorizontally(daveoLogoX, setDaveoLogoX, -width, 0.5 * delta);
      moveElementHorizontally(devFestX, setDevFestX, -width, 0.5 * delta);
    }
  });

  return (
    <Container>
      {!isSeaWorld && (
        <>
          <Ground x={width} y={height} scale={1} color={1} />
          <Cloud x={cloud1x} y={height * 0.2} scale={isMobile ? 0.2 : 0.4} />
          <Cloud x={cloud2x} y={height * 0.3} scale={isMobile ? 0.25 : 0.5} mirrored />
          <Mountain x={mountain1x} y={0.85 * height} scale={isMobile ? 0.25 : 0.5} />
          <Mountain x={mountain2x} y={0.85 * height} scale={isMobile ? 0.15 : 0.3} />
          <Rock x={rockX} y={0.85 * height} scale={isMobile ? 0.25 : 0.5} />
          <Tree x={tree1x} y={0.85 * height} scale={isMobile ? 0.075 : 0.15} />
          <Tree x={tree2x} y={1 * height} scale={isMobile ? 0.175 : 0.35} />
          <Tree x={tree3x} y={0.86 * height} scale={isMobile ? 0.1 : 0.2} />
          <Zeppelin x={zeppelinX} y={0.2 * height} scale={isMobile ? 0.075 : 0.15} />
          <Container>
            <DaveoLogo x={daveoLogoX} y={0.2 * height} scale={isMobile ? 0.05 : 0.1} color={1} />
            <DevFest x={devFestX} y={0.42 * height} scale={isMobile ? 0.05 : 0.1} color={1} />
          </Container>
          <Cloud x={cloud3x} y={height * 0.2} scale={isMobile ? 0.2 : 0.4} mirrored />
          <Cloud x={cloud4x} y={height * 0.3} scale={isMobile ? 0.25 : 0.5} />
          <Mountain x={mountain1x} y={0.85 * height} scale={isMobile ? 0.25 : 0.5} />
          <Mountain x={mountain2x} y={0.85 * height} scale={isMobile ? 0.15 : 0.3} />
          <Rock x={rockX} y={0.85 * height} scale={isMobile ? 0.3 : 0.6} />
          <Tree x={tree1x} y={0.85 * height} scale={isMobile ? 0.075 : 0.15} />
          <Tree x={tree3x} y={0.86 * height} scale={isMobile ? 0.1 : 0.2} />
          <Tree x={tree4x} y={0.85 * height} scale={isMobile ? 0.075 : 0.15} mirrored />
          <Tree x={tree5x} y={0.85 * height} scale={isMobile ? 0.125 : 0.25} />
          <Tree x={tree6x} y={0.86 * height} scale={isMobile ? 0.1 : 0.2} />
          <Elephant x={elephantX} y={0.85 * height} scale={isMobile ? 0.2 : 0.4} />
          <Tree x={tree7x} y={1 * height} scale={isMobile ? 0.15 : 0.3} mirrored />
          <Tree x={tree2x} y={1 * height} scale={isMobile ? 0.175 : 0.35} />
        </>
      )}
    </Container>

  );
}

AirWorld.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
};

AirWorld.defaultProps = {
  isMobile: false,
};

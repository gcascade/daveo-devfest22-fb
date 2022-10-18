import React, { useState } from 'react';
import { Container, useTick } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Algae from './Algae';
import Bubble from './Bubble';
import Coral from './Coral';
import DaveoLogo from './DaveoLogo';
import DevFest from './DevFest';
import Fish from './Fish';
import Ground from './Ground';

import { moveElementHorizontally, moveElementVerticallyAndScaleUp, moveElementVerticallyBetween } from '../utils/movementUtils';

export default function SeaWorld({ width, height }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  const gameIsStarted = useSelector((state) => state.game.hasStarted);
  const paused = useSelector((state) => state.game.paused);

  const animationEnabled = useSelector((state) => state.game.animationEnabled);

  const gameIsRunning = gameIsStarted && !paused;

  const [daveoLogoX, setDaveoLogoX] = useState(0.1 * width);
  const [devFestX, setDevFestX] = useState(0.6 * width);
  const [bubble1Y, setBubble1Y] = useState(0.7 * height);
  const [bubble1scale, setBubble1scale] = useState(0);
  const [bubble2Y, setBubble2Y] = useState(0.1 * height);
  const [bubble2scale, setBubble2scale] = useState(0);
  const [bubble3Y, setBubble3Y] = useState(0.05 * height);
  const [bubble3scale, setBubble3scale] = useState(0);
  const [bubble4Y, setBubble4Y] = useState(0.3 * height);
  const [bubble4scale, setBubble4scale] = useState(0);
  const [bubble5Y, setBubble5Y] = useState(0.6 * height);
  const [bubble5scale, setBubble5scale] = useState(0);
  const [bubble6Y, setBubble6Y] = useState(0.66 * height);
  const [bubble6scale, setBubble6scale] = useState(0);
  const [bubble7Y, setBubble7Y] = useState(0.66 * height);
  const [bubble7scale, setBubble7scale] = useState(0);
  const [bubble8Y, setBubble8Y] = useState(0.71 * height);
  const [bubble8scale, setBubble8scale] = useState(0);
  const [algae1x, setAlgae1x] = useState(0.1 * width);
  const [algae2x, setAlgae2x] = useState(0.6 * width);
  const [yellowCoral1x, setYellowCoral1x] = useState(0.18 * width);
  const [yellowCoral2x, setYellowCoral2x] = useState(0.85 * width);
  const [redCoral1x, setRedCoral1x] = useState(0.5 * width);
  const [redCoral2x, setRedCoral2x] = useState(0.9 * width);

  const [redfish1x, setRedfish1x] = useState(0.2 * width);
  const [redfish1y, setRedfish1y] = useState(0.2 * height);
  const [redfish1goingUp, setRedfish1goingUp] = useState(false);
  const redfish1minY = 0.175 * height;
  const redfish1maxY = 0.225 * height;
  const [redFish1SwimmingForward, setRedFish1SwimmingForward] = useState(false);

  const [redfish2x, setRedfish2x] = useState(0.9 * width);
  const [redfish2y, setRedfish2y] = useState(0.8 * height);
  const [redfish2goingUp, setRedfish2goingUp] = useState(false);
  const redfish2minY = 0.8 * height;
  const redfish2maxY = 0.85 * height;

  const [redfish3x, setRedfish3x] = useState(0.66 * width);
  const [redfish3y, setRedfish3y] = useState(0.12 * height);
  const [redfish3goingUp, setRedfish3goingUp] = useState(false);
  const redfish3minY = 0.115 * height;
  const redfish3maxY = 0.125 * height;

  const [yellowfish1x, setYellowfish1x] = useState(0.295 * width);
  const [yellowfish1y, setYellowfish1y] = useState(0.49 * height);
  const [yellowfish1goingUp, setYellowfish1goingUp] = useState(false);
  const yellowfish1minY = 0.48 * height;
  const yellowfish1maxY = 0.50 * height;

  const [yellowfish2x, setYellowfish2x] = useState(0.293 * width);
  const [yellowfish2y, setYellowfish2y] = useState(0.52 * height);
  const [yellowfish2goingUp, setYellowfish2goingUp] = useState(false);
  const yellowfish2minY = 0.51 * height;
  const yellowfish2maxY = 0.53 * height;

  const [yellowfish3x, setYellowfish3x] = useState(0.32 * width);
  const [yellowfish3y, setYellowfish3y] = useState(0.5 * height);
  const [yellowfish3goingUp, setYellowfish3goingUp] = useState(false);
  const yellowfish3minY = 0.49 * height;
  const yellowfish3maxY = 0.51 * height;

  const [yellowfish4x, setYellowfish4x] = useState(0.9 * width);
  const [yellowfish4y, setYellowfish4y] = useState(0.25 * height);
  const [yellowfish4goingUp, setYellowfish4goingUp] = useState(false);
  const yellowfish4minY = 0.23 * height;
  const yellowfish4maxY = 0.27 * height;
  const [yellowFish4SwimmingForward, setYellowFish4SwimmingForward] = useState(false);

  useTick(() => {
    if (!isSeaWorld) {
      return;
    }
    if (animationEnabled && gameIsRunning) {
      // fish
      if (!redFish1SwimmingForward) {
        moveElementHorizontally(redfish1x, setRedfish1x, 2 * width, -0.9);
        if (redfish1x <= 10) {
          setRedFish1SwimmingForward(true);
        }
      } else if (redfish1x <= 1) {
        setRedFish1SwimmingForward(true);
        moveElementHorizontally(redfish1x, setRedfish1x, 2 * width, 5);
      } else if (redfish1x > 1.2 * width) {
        setRedFish1SwimmingForward(false);
      } else {
        moveElementHorizontally(redfish1x, setRedfish1x, 2 * width, 5);
      }
      moveElementHorizontally(redfish2x, setRedfish2x, 2 * width, -0.9);
      moveElementHorizontally(redfish3x, setRedfish3x, 2 * width, -0.3);
      moveElementHorizontally(yellowfish1x, setYellowfish1x, 2 * width, -0.5);
      moveElementHorizontally(yellowfish2x, setYellowfish2x, 2 * width, -0.5);
      moveElementHorizontally(yellowfish3x, setYellowfish3x, 2 * width, -0.5);

      if (!yellowFish4SwimmingForward) {
        moveElementHorizontally(yellowfish4x, setYellowfish4x, 2 * width, -0.7);
        if (yellowfish4x <= 0.5 * width) {
          setYellowFish4SwimmingForward(true);
        }
      } else if (yellowfish4x <= 0.5 * width) {
        setYellowFish4SwimmingForward(true);
        moveElementHorizontally(yellowfish4x, setYellowfish4x, 2 * width, 5);
      } else if (yellowfish4x > 0.9 * width) {
        setYellowFish4SwimmingForward(false);
      } else {
        moveElementHorizontally(yellowfish4x, setYellowfish4x, 2 * width, 5);
      }

      moveElementVerticallyBetween(
        yellowfish1y,
        setYellowfish1y,
        0.1,
        yellowfish1goingUp,
        setYellowfish1goingUp,
        yellowfish1minY,
        yellowfish1maxY,
      );

      moveElementVerticallyBetween(
        yellowfish2y,
        setYellowfish2y,
        0.1,
        yellowfish2goingUp,
        setYellowfish2goingUp,
        yellowfish2minY,
        yellowfish2maxY,
      );

      moveElementVerticallyBetween(
        yellowfish3y,
        setYellowfish3y,
        0.1,
        yellowfish3goingUp,
        setYellowfish3goingUp,
        yellowfish3minY,
        yellowfish3maxY,
      );

      moveElementVerticallyBetween(
        yellowfish4y,
        setYellowfish4y,
        0.2,
        yellowfish4goingUp,
        setYellowfish4goingUp,
        yellowfish4minY,
        yellowfish4maxY,
      );

      moveElementVerticallyBetween(
        redfish1y,
        setRedfish1y,
        0.5,
        redfish1goingUp,
        setRedfish1goingUp,
        redfish1minY,
        redfish1maxY,
      );

      moveElementVerticallyBetween(
        redfish2y,
        setRedfish2y,
        0.2,
        redfish2goingUp,
        setRedfish2goingUp,
        redfish2minY,
        redfish2maxY,
      );

      moveElementVerticallyBetween(
        redfish3y,
        setRedfish3y,
        0.1,
        redfish3goingUp,
        setRedfish3goingUp,
        redfish3minY,
        redfish3maxY,
      );

      // logos
      moveElementHorizontally(daveoLogoX, setDaveoLogoX, -width, 0.5);
      moveElementHorizontally(devFestX, setDevFestX, -width, 0.5);

      // bubble 1
      moveElementVerticallyAndScaleUp(
        bubble1Y,
        setBubble1Y,
        0.7 * height,
        -0.2,
        -2.6 * height,
        bubble1scale,
        setBubble1scale,
        0.00001,
        0.5,
      );

      // bubble 2
      moveElementVerticallyAndScaleUp(
        bubble2Y,
        setBubble2Y,
        0.1 * height,
        -0.1,
        -2 * height,
        bubble2scale,
        setBubble2scale,
        0.00003,
        0.3,
      );

      // bubble 3
      moveElementVerticallyAndScaleUp(
        bubble3Y,
        setBubble3Y,
        0.05 * height,
        -0.1,
        -0.3 * height,
        bubble3scale,
        setBubble3scale,
        0.00001,
        0.3,
      );

      // bubble 4
      moveElementVerticallyAndScaleUp(
        bubble4Y,
        setBubble4Y,
        0.3 * height,
        -0.1,
        -4 * height,
        bubble4scale,
        setBubble4scale,
        0.00003,
        0.15,
      );

      // bubble 5
      moveElementVerticallyAndScaleUp(
        bubble5Y,
        setBubble5Y,
        0.6 * height,
        -0.1,
        0 * height,
        bubble5scale,
        setBubble5scale,
        0.00001,
        0.25,
      );

      // bubble 6
      moveElementVerticallyAndScaleUp(
        bubble6Y,
        setBubble6Y,
        0.66 * height,
        -0.1,
        -3 * height,
        bubble6scale,
        setBubble6scale,
        0.00003,
        0.4,
      );

      // bubble 7
      moveElementVerticallyAndScaleUp(
        bubble7Y,
        setBubble7Y,
        0.66 * height,
        -0.1,
        -0.5 * height,
        bubble7scale,
        setBubble7scale,
        0.00002,
        0.25,
      );

      // bubble 8
      moveElementVerticallyAndScaleUp(
        bubble8Y,
        setBubble8Y,
        0.71 * height,
        -0.1,
        -0.9 * height,
        bubble8scale,
        setBubble8scale,
        0.00003,
        0.45,
      );

      // foreground
      moveElementHorizontally(algae1x, setAlgae1x, 1.2 * width, -1);
      moveElementHorizontally(algae2x, setAlgae2x, 1.2 * width, -1);
      moveElementHorizontally(yellowCoral1x, setYellowCoral1x, 1.2 * width, -1);
      moveElementHorizontally(yellowCoral2x, setYellowCoral2x, 1.2 * width, -1);
      moveElementHorizontally(redCoral1x, setRedCoral1x, 1.2 * width, -1);
      moveElementHorizontally(redCoral2x, setRedCoral2x, 1.2 * width, -1);
    }
  });

  return (
    <Container>
      {isSeaWorld && (
        <>
          <Ground x={width} y={height} scale={1} color={2} />
          <Fish x={yellowfish1x} y={yellowfish1y} scale={0.09} color={1} />
          <Fish x={yellowfish2x} y={yellowfish2y} scale={0.11} color={1} />
          <Fish x={yellowfish3x} y={yellowfish3y} scale={0.1} color={1} />
          <Fish x={yellowfish4x} y={yellowfish4y} scale={0.2} color={1} />
          <Fish x={redfish1x} y={redfish1y} scale={0.15} color={2} />
          <Fish x={redfish2x} y={redfish2y} scale={0.17} color={2} />
          <Fish x={redfish3x} y={redfish3y} scale={0.07} color={2} />
          <Coral x={yellowCoral1x} y={0.85 * height} scale={0.4} color={1} />
          <Coral x={redCoral1x} y={0.85 * height} scale={0.45} color={2} />
          <Coral x={redCoral2x} y={0.85 * height} scale={0.2} color={2} />
          <Coral x={yellowCoral2x} y={0.85 * height} scale={0.5} color={1} />
          <Algae x={algae1x} y={0.8 * height} scale={0.7} />
          <Algae x={algae2x} y={0.8 * height} scale={0.4} />
          <Bubble x={0.45 * width} y={bubble1Y} scale={bubble1scale} />
          <Bubble x={0.1 * width} y={bubble2Y} scale={bubble2scale} />
          <Bubble x={0.7 * width} y={bubble3Y} scale={bubble3scale} />
          <Bubble x={0.56 * width} y={bubble4Y} scale={bubble4scale} />
          <Bubble x={0.55 * width} y={bubble5Y} scale={bubble5scale} />
          <Bubble x={0.57 * width} y={bubble6Y} scale={bubble6scale} />
          <Bubble x={0.8 * width} y={bubble7Y} scale={bubble7scale} />
          <Bubble x={0.84 * width} y={bubble8Y} scale={bubble8scale} />
          <Container>
            <DaveoLogo x={daveoLogoX} y={0.2 * height} scale={0.1} color={2} />
            <DevFest x={devFestX} y={0.42 * height} scale={0.1} color={2} />
          </Container>
        </>
      )}
    </Container>
  );
}

SeaWorld.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

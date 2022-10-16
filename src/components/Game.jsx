import * as PIXI from 'pixi.js';
import {
  Sprite, Text, Container, useTick,
} from '@inlet/react-pixi';
import { sound } from '@pixi/sound';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import background from '../images/background.png';
import seaBackground from '../images/seaBackground.png';

import Bonus from './Bonus';
import Bird from './Bird';
import Stage from './Stage';
import Obstacle from './Obstacle';
import DualObstacle from './DualObstacle';
import StartButton from './StartButton';
import DebugMenu from './DebugMenu';
import CollectedBonusesContainer from './CollectedBonusesDisplay';

import AirWorld from './AirWorld';
import SeaWorld from './SeaWorld';

import keyboard from './KeyboardController';

import {
  reset, displayDebugMenu, hideDebugMenu, pauseGame, resumeGame, updateSettings,
} from '../slices/gameSlice';
import { move as moveBird, jump, setJumpVelocity } from '../slices/birdSlice';

const {
  REACT_APP_ENABLE_CHEATS,
} = process.env;

const textStyle = new PIXI.TextStyle({
  align: 'center',
  fontSize: 36,
  fontWeight: 'bold',
  fill: ['#FFFFFF'],
  stroke: '#000000',
  strokeThickness: 2,
  letterSpacing: 5,
  wordWrap: false,
  wordWrapWidth: 350,
});

function setupGame() {
  const dispatch = useDispatch();

  dispatch(reset());

  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);
  dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
}

function displayObstacle(obstacle) {
  if (obstacle?.isDual) {
    return (
      <DualObstacle
        key={obstacle?.id}
        id={obstacle?.id}
        gap={obstacle?.gap}
        x={obstacle?.x}
        y={obstacle?.y}
        topId={obstacle?.id}
        bottomId={obstacle?.id}
        topHeight={obstacle?.height}
      />
    );
  }
  return (
    <Obstacle
      key={obstacle?.id}
      id={obstacle?.id}
      isTop={obstacle?.isTop}
      x={obstacle?.x}
      y={obstacle?.y}
      height={obstacle?.height}
      isDual={false}
    />
  );
}

function ObstacleContainer() {
  const obstacles = useSelector((state) => state.obstacle.obstacles);

  return (
    <Container>
      {obstacles.map((obstacle) => (
        displayObstacle(obstacle)
      ))}
    </Container>
  );
}

function BonusContainer() {
  const bonus = useSelector((state) => state.bonus.currentBonus);
  return (
    <Container>
      {bonus
      && (
      <Bonus
        x={bonus.x}
        y={bonus.y}
        type={bonus.type}
        scale={bonus.scale}
        active={bonus.active}
        goingUp={bonus.goingUp}
        minY={bonus.minY}
        maxY={bonus.maxY}
      />
      )}
    </Container>
  );
}
const spaceKey = keyboard(' ');
const enterKey = keyboard('Enter');
const dKey = keyboard('d');

function BackgroundContainer() {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const isDebugMenuDisplayed = useSelector((state) => state.game.displayDebugMenu);
  const paused = useSelector((state) => state.game.paused);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);
  const changingLevel = useSelector((state) => state.game.changingLevel);
  const changeLevelEnabled = useSelector((state) => state.game.changeLevelEnabled);

  const [noise, setNoise] = React.useState(0);
  const [updatedLevel, setUpdatedLevel] = React.useState(false);

  const backgroundImage = isSeaWorld ? seaBackground : background;
  const jumpSound = isSeaWorld ? 'nautilus_jump' : 'balloon_jump';

  enterKey.press = () => {
    if (!paused && gameHasStarted) {
      dispatch(jump());
      sound.play(jumpSound);
    }
  };

  spaceKey.press = () => {
    if (!paused && gameHasStarted) {
      dispatch(jump());
      sound.play(jumpSound);
    }
  };

  dKey.press = () => {
    if (REACT_APP_ENABLE_CHEATS === 'true') {
      if (isDebugMenuDisplayed) {
        dispatch(hideDebugMenu());
        dispatch(resumeGame());
      } else {
        dispatch(displayDebugMenu());
        dispatch(pauseGame());
      }
    }
  };

  const noiseIncrement = 0.005;

  useTick(() => {
    if (changeLevelEnabled && paused && changingLevel) {
      if (!updatedLevel && noise <= 1) {
        setNoise(noise + noiseIncrement);
      } else if (!updatedLevel && noise > 1) {
        dispatch(updateSettings({ isSeaWorld: true }));
        setUpdatedLevel(true);
      } else if (updatedLevel && noise >= 0) {
        setNoise(noise - noiseIncrement);
      } else {
        setNoise(0);
        setUpdatedLevel(false);
        dispatch(updateSettings({ changingLevel: false }));
        dispatch(resumeGame());
      }
    }
  });

  const noiseFilter = new PIXI.filters.NoiseFilter(noise);

  return (
    <Container>
      <Sprite
        filters={[noiseFilter]}
        image={backgroundImage}
        interactive
        pointerdown={() => {
          if (!paused && gameHasStarted) {
            dispatch(setJumpVelocity(birdJumpVelocity));
            dispatch(jump());
            sound.play(jumpSound);
          }
        }}
      />
    </Container>
  );
}

function StartButtonContainer({ width, height }) {
  const gameHasStarted = useSelector((state) => state.game.hasStarted);

  return (
    <Container>
      {!gameHasStarted && <StartButton x={width / 2} y={height / 2} scale={0.4} />}
    </Container>
  );
}

function ScoreContainer({ width, height }) {
  const totalScore = useSelector((state) => state.game.totalScore);
  return (
    <Container
      x={width / 2}
      y={height / 10}
    >
      <Text text={totalScore} style={textStyle} anchor={0.5} />
    </Container>
  );
}

function Game() {
  const width = useSelector((state) => state.game.width);
  const height = useSelector((state) => state.game.height);

  setupGame();

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x1099bb }}
      >
        <BackgroundContainer />
        <AirWorld
          width={width}
          height={height}
        />
        <SeaWorld
          width={width}
          height={height}
        />
        <Container>
          <Bird />
        </Container>
        <BonusContainer />
        <ObstacleContainer />
        <StartButtonContainer width={width} height={height} />
        <ScoreContainer width={width} height={height} />
        <CollectedBonusesContainer width={width} height={height} />
      </Stage>
      <DebugMenu enabled={REACT_APP_ENABLE_CHEATS === 'true'} />
    </>
  );
}

export default Game;

ScoreContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

StartButtonContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

CollectedBonusesContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

import * as PIXI from 'pixi.js';
import {
  Sprite, Text, Container, useTick, useApp,
} from '@inlet/react-pixi';
import { sound } from '@pixi/sound';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { GamepadsProvider, useGamepads } from 'react-gamepads';

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
import PauseButton from './PauseButton';
import PauseMenu from './PauseMenu';
import HelpButton from './HelpButton';

import AirWorld from './AirWorld';
import SeaWorld from './SeaWorld';

import keyboard from './KeyboardController';

import {
  reset, displayDebugMenu, hideDebugMenu, pauseGame, resumeGame, updateSettings, startGame,
  setGameSpeed,
} from '../slices/gameSlice';
import {
  move as moveBird, jump, setJumpVelocity, resetBird,
} from '../slices/birdSlice';
import { addDualObstacle, addObstacle, removeAllObstacles } from '../slices/obstacleSlice';
import { randomFromList } from '../utils/randomUtils';
import { reset as resetBonus } from '../slices/bonusSlice';
import { seaBgm, bgm } from '../constants';

import useWindowDimensions from '../hooks/windowDimensions';

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

function displayObstacle(obstacle, gameWidth, gameHeight) {
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
        gameHeight={gameHeight}
        gameWidth={gameWidth}
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
      gameHeight={gameHeight}
      gameWidth={gameWidth}
    />
  );
}

function ObstacleContainer({ width, height }) {
  const obstacles = useSelector((state) => state.obstacle.obstacles);

  return (
    <Container>
      {obstacles.map((obstacle) => (
        displayObstacle(obstacle, width, height)
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

function BackgroundContainer({ width, height }) {
  const dispatch = useDispatch();
  const gameHasStarted = useSelector((state) => state.game.hasStarted);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const isDebugMenuDisplayed = useSelector((state) => state.game.displayDebugMenu);
  const paused = useSelector((state) => state.game.paused);
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);
  const changingLevel = useSelector((state) => state.game.changingLevel);
  const changeLevelEnabled = useSelector((state) => state.game.changeLevelEnabled);
  const mainVolume = useSelector((state) => state.game.mainVolume);
  const effectVolume = useSelector((state) => state.game.effectVolume);

  const [noise, setNoise] = React.useState(0);
  const [updatedLevel, setUpdatedLevel] = React.useState(false);

  const backgroundImage = isSeaWorld ? seaBackground : background;
  const jumpSound = isSeaWorld ? 'nautilus_jump' : 'balloon_jump';

  const [gamepads, setGamepads] = React.useState({});
  useGamepads((gp) => setGamepads(gp));
  const [directionUpWasPressed, setDirectionUpWasPressed] = React.useState(false);
  const [buttonDownWasPressed, setButtonDownWasPressed] = React.useState(false);
  const [buttonRightWasPressed, setButtonRightWasPressed] = React.useState(false);
  const [buttonStartWasPressed, setButtonStartWasPressed] = React.useState(false);

  const playing = !paused && gameHasStarted;

  const obstacleMaxSpacing = useSelector((state) => state.game.obstacleMaxSpacing);
  const gap = useSelector((state) => state.game.obstacleGap);
  const initialTopObstacleHeight = 0;
  const initialBottomObstacleHeight = height;

  const jumpAndSound = () => {
    dispatch(setJumpVelocity(birdJumpVelocity));
    dispatch(jump());
    sound.play(jumpSound, { volume: effectVolume });
  };

  const app = useApp();
  app.ticker.minFPS = 144;
  app.ticker.maxFPS = 144;
  app.ticker.speed = 1;

  const start = () => {
    // duplicated code from StartButton
    // -----
    sound.context.playEmptySound();
    sound.stopAll();
    sound.play('start', { volume: effectVolume });
    const music = randomFromList(bgm);
    console.log(`Playing ${music}`);
    sound.play(music, { loop: true, volume: mainVolume });
    if (!gameHasStarted) {
      dispatch(reset());
      dispatch(resetBird());
      dispatch(resetBonus());
      dispatch(removeAllObstacles());
      dispatch(setGameSpeed(8));
      dispatch(addDualObstacle({
        isTop: true,
        x: width,
        height: (height - gap) / 2,
        gap,
      }));
      dispatch(addDualObstacle({
        isTop: true,
        x: width + obstacleMaxSpacing,
        height: (height - gap) / 2,
        gap,
      }));
      dispatch(addObstacle({
        isTop: false,
        x: width + 2 * obstacleMaxSpacing,
        y: initialBottomObstacleHeight,
        height: 0.4 * height,
      }));
      dispatch(addObstacle({
        isTop: true,
        x: width + 3 * obstacleMaxSpacing,
        y: initialTopObstacleHeight,
        height: 0.4 * height,
      }));
      dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
      dispatch(startGame());
    } // -----
  };

  useEffect(() => {
    // If controller connected with buttons
    if (gamepads && gamepads[0] && gamepads[0].buttons.length > 0) {
      const directionUp = gamepads[0].buttons[12].pressed;
      // const directionDown = gamepads[0].buttons[13].pressed;
      // const directionLeft = gamepads[0].buttons[14].pressed;
      // const directionRight = gamepads[0].buttons[15].pressed;
      const buttonDown = gamepads[0].buttons[0].pressed;
      const buttonRight = gamepads[0].buttons[1].pressed;
      // const buttonLeft = gamepads[0].buttons[2].pressed;
      // const buttonUp = gamepads[0].buttons[3].pressed;
      // const select = gamepads[0].buttons[8].pressed;
      const buttonStart = gamepads[0].buttons[9].pressed;

      if (directionUp && !directionUpWasPressed) {
        setDirectionUpWasPressed(true);

        if (playing) {
          jumpAndSound();
        }
      }

      if (!directionUp && directionUpWasPressed) {
        setDirectionUpWasPressed(false);
      }

      if (buttonDown && !buttonDownWasPressed) {
        setButtonDownWasPressed(true);

        if (playing) {
          jumpAndSound();
        }
      }

      if (!buttonDown && buttonDownWasPressed) {
        setButtonDownWasPressed(false);
      }

      if (buttonRight && !buttonRightWasPressed) {
        setButtonRightWasPressed(true);

        if (playing) {
          jumpAndSound();
        }
      }

      if (!buttonRight && buttonRightWasPressed) {
        setButtonRightWasPressed(false);
      }

      if (buttonStart && !buttonStartWasPressed) {
        setButtonStartWasPressed(true);

        if (playing) {
          jumpAndSound();
        } else if (!gameHasStarted && !paused) {
          start();
        }
      }

      if (!start && buttonStartWasPressed) {
        setButtonStartWasPressed(false);
      }
    }
  });

  enterKey.press = () => {
    if (!paused && gameHasStarted) {
      jumpAndSound();
    } else if (!gameHasStarted && !paused) {
      start();
    }
  };

  spaceKey.press = () => {
    if (!paused && gameHasStarted) {
      jumpAndSound();
    } else if (!gameHasStarted && !paused) {
      start();
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

  useTick((delta) => {
    if (changeLevelEnabled && paused && changingLevel) {
      if (!updatedLevel && noise <= 1) {
        setNoise(noise + noiseIncrement * delta);
      } else if (!updatedLevel && noise > 1) {
        dispatch(updateSettings({ isSeaWorld: true }));
        setUpdatedLevel(true);
        sound.stopAll();
      } else if (updatedLevel && noise >= 0) {
        setNoise(noise - noiseIncrement * delta);
      } else {
        setNoise(0);
        setUpdatedLevel(false);
        dispatch(updateSettings({ changingLevel: false }));
        dispatch(resumeGame());
        const music = randomFromList(seaBgm);
        console.log(`Playing ${music}`);
        sound.play(music, { loop: true, volume: mainVolume });
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
            jumpAndSound();
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
      {!gameHasStarted && (
      <StartButton
        x={width / 2}
        y={height / 2}
        scale={0.4}
        width={width}
        height={height}
      />
      )}
    </Container>
  );
}

function ButtonContainer({ width, height, isMobile }) {
  const spacing = isMobile ? 60 : 75;
  return (
    <Container>
      <PauseButton
        x={0.95 * width}
        y={0.05 * height}
        scale={0.5}
      />
      <HelpButton
        x={0.95 * width - spacing}
        y={0.05 * height}
        scale={0.5}
      />
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
  const windowDimensions = useWindowDimensions();
  const maxWidth = useSelector((state) => state.game.width);
  const maxHeight = useSelector((state) => state.game.height);
  const { isMobile } = windowDimensions;

  const width = windowDimensions.width > maxWidth ? maxWidth : windowDimensions.width;
  const height = windowDimensions.height > maxHeight ? maxHeight : windowDimensions.height;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(moveBird({ x: width / 2, y: height * 0.3 }));
    sound.stopAll();
  }, [width, height]);

  return (
    <>
      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0x1099bb }}
      >
        <GamepadsProvider>
          <BackgroundContainer width={width} height={height} />
          <AirWorld
            width={width}
            height={height}
            isMobile={isMobile}
          />
          <SeaWorld
            width={width}
            height={height}
            isMobile={isMobile}
          />
          <Container>
            <Bird gameHeight={height} />
          </Container>
          <BonusContainer />
          <ObstacleContainer width={width} height={height} />
          <StartButtonContainer width={width} height={height} />
          <ScoreContainer width={width} height={height} />
          <CollectedBonusesContainer width={width} height={height} />
          <ButtonContainer width={width} height={height} isMobile={isMobile} />
          <PauseMenu gameWidth={width} gameHeight={height} isMobile={isMobile} />
        </GamepadsProvider>
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

BackgroundContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

ObstacleContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

ButtonContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
};

ButtonContainer.defaultProps = {
  isMobile: false,
};

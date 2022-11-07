import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Sprite, Graphics, Text,
} from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import PropTypes from 'prop-types';
import { sound } from '@pixi/sound';
import plusImage from '../images/plus.png';
import minusImage from '../images/minus.png';
import { updateMainVolume, updateEffectVolume } from '../slices/soundSlice';
import { bgm, seaBgm, sfx } from '../constants';

export default function PauseMenu({
  gameWidth, gameHeight, isMobile,
}) {
  const paused = useSelector((state) => state.game.paused);
  const changingLevel = useSelector((state) => state.game.changingLevel);
  const mainVolume = useSelector((state) => state.sound.mainVolume);
  const effectVolume = useSelector((state) => state.sound.effectVolume);
  const dispatch = useDispatch();
  const [mVolume, setMVolume] = useState(mainVolume * 100);
  const [eVolume, setEVolume] = useState(effectVolume * 100);

  const titleStyle = new PIXI.TextStyle({
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

  const textStyle = new PIXI.TextStyle({
    align: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    fill: ['#FFFFFF'],
    stroke: '#000000',
    strokeThickness: 2,
    letterSpacing: 5,
    wordWrap: false,
    wordWrapWidth: 350,
  });

  function updateMVolume(volume) {
    bgm.forEach((trackName) => {
      if (sound.exists(trackName, false)) {
        sound.find(trackName).volume = volume;
      }
    });
    seaBgm.forEach((trackName) => {
      if (sound.exists(trackName, false)) {
        sound.find(trackName).volume = volume;
      }
    });
    dispatch(updateMainVolume(volume));
  }

  function updateSoundEffectVolume(volume) {
    sfx.forEach((trackName) => {
      if (sound.exists(trackName, false)) {
        sound.find(trackName).volume = volume;
      }
    });
    dispatch(updateEffectVolume(volume));
  }

  useEffect(() => {
    updateMVolume(mVolume / 100);
  }, [mVolume]);

  useEffect(() => {
    updateSoundEffectVolume(eVolume / 100);
  }, [eVolume]);

  const rectWidth = isMobile ? 300 : 0.4 * gameWidth;
  const rectHeight = isMobile ? 275 : 0.4 * gameHeight;
  const topLeftPoint = {
    x: isMobile ? (gameWidth - rectWidth) / 2 : 0.3 * gameWidth,
    y: isMobile ? (gameHeight - rectHeight) / 2 : 0.3 * gameHeight,
  };

  const draw = useCallback((context) => {
    context.clear();
    context.lineStyle(5, 0x000000, 1);
    context.beginFill(0x003c5a, 1);
    context.drawRoundedRect(
      topLeftPoint.x,
      topLeftPoint.y,
      rectWidth,
      rectHeight,
      15,
    );
    context.endFill();
  }, []);

  const pauseText = {
    x: 0.5 * gameWidth,
    y: isMobile ? gameHeight / 2 - 100 : 0.35 * gameHeight,
    width: isMobile ? undefined : 0.07 * gameWidth,
  };

  const mainVolumeText = {
    x: 0.5 * gameWidth,
    y: 0.5 * gameHeight,
    width: isMobile ? 125 : 0.2 * gameWidth,
    minusButton: {
      x: isMobile ? gameWidth / 2 - 100 : 0.35 * gameWidth,
      y: 0.5 * gameHeight,
    },
    plusButton: {
      x: isMobile ? gameWidth / 2 + 100 : 0.65 * gameWidth,
      y: 0.5 * gameHeight,
    },
  };

  const soundEffectsText = {
    x: 0.5 * gameWidth,
    y: isMobile ? 0.5 * gameHeight + 75 : 0.6 * gameHeight,
    width: isMobile ? 125 : 0.2 * gameWidth,
    minusButton: {
      x: isMobile ? gameWidth / 2 - 100 : 0.35 * gameWidth,
      y: isMobile ? 0.5 * gameHeight + 75 : 0.6 * gameHeight,
    },
    plusButton: {
      x: isMobile ? gameWidth / 2 + 100 : 0.65 * gameWidth,
      y: isMobile ? 0.5 * gameHeight + 75 : 0.6 * gameHeight,
    },
  };

  return (
    <Container>
      <Graphics draw={draw} visible={paused && !changingLevel} />
      <Text
        x={pauseText.x}
        y={pauseText.y}
        text="Pause"
        visible={paused && !changingLevel}
        anchor={0.5}
        style={titleStyle}
        width={pauseText.width}
      />
      <Text
        x={mainVolumeText.x}
        y={mainVolumeText.y}
        text={`Main Volume: ${mVolume}%`}
        visible={paused && !changingLevel}
        anchor={0.5}
        style={textStyle}
        width={mainVolumeText.width}
      />
      <Text
        x={soundEffectsText.x}
        y={soundEffectsText.y}
        text={`Sound Effects Volume: ${eVolume}%`}
        visible={paused && !changingLevel}
        anchor={0.5}
        style={textStyle}
        width={soundEffectsText.width}
      />
      <Sprite
        image={minusImage}
        x={mainVolumeText.minusButton.x}
        y={mainVolumeText.minusButton.y}
        interactive
        pointerdown={() => {
          if (mVolume > 0) {
            setMVolume(mVolume - 10);
          }
        }}
        visible={paused && !changingLevel}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
      />
      <Sprite
        image={plusImage}
        x={mainVolumeText.plusButton.x}
        y={mainVolumeText.plusButton.y}
        interactive
        pointerdown={() => {
          if (mVolume < 100) {
            setMVolume(mVolume + 10);
          }
        }}
        visible={paused && !changingLevel}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
      />
      <Sprite
        image={minusImage}
        x={soundEffectsText.minusButton.x}
        y={soundEffectsText.minusButton.y}
        interactive
        pointerdown={() => {
          if (eVolume > 0) {
            setEVolume(eVolume - 10);
          }
        }}
        visible={paused && !changingLevel}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
      />
      <Sprite
        image={plusImage}
        x={soundEffectsText.plusButton.x}
        y={soundEffectsText.plusButton.y}
        interactive
        pointerdown={() => {
          if (eVolume < 100) {
            setEVolume(eVolume + 10);
          }
        }}
        visible={paused && !changingLevel}
        scale={{ x: 0.5, y: 0.5 }}
        anchor={0.5}
      />
    </Container>
  );
}

PauseMenu.propTypes = {
  gameWidth: PropTypes.number.isRequired,
  gameHeight: PropTypes.number.isRequired,
  isMobile: PropTypes.bool,
};

PauseMenu.defaultProps = {
  isMobile: false,
};

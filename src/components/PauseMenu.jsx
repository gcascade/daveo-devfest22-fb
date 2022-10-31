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
import { updateSettings } from '../slices/gameSlice';
import { bgm, seaBgm, sfx } from '../constants';

export default function PauseMenu({
  gameWidth, gameHeight,
}) {
  const paused = useSelector((state) => state.game.paused);
  const changingLevel = useSelector((state) => state.game.changingLevel);
  const mainVolume = useSelector((state) => state.game.mainVolume);
  const effectVolume = useSelector((state) => state.game.effectVolume);
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

  function updateMainVolume(volume) {
    bgm.forEach((track) => {
      sound.find(track).volume = volume;
    });
    seaBgm.forEach((track) => {
      sound.find(track).volume = volume;
    });
    dispatch(updateSettings({ mainVolume: volume }));
  }

  function updateSoundEffectVolume(volume) {
    sfx.forEach((track) => {
      sound.find(track).volume = volume;
    });
    dispatch(updateSettings({ effectVolume: volume }));
  }

  useEffect(() => {
    updateMainVolume(mVolume / 100);
  }, [mVolume]);

  useEffect(() => {
    updateSoundEffectVolume(eVolume / 100);
  }, [eVolume]);

  const draw = useCallback((context) => {
    context.clear();
    context.lineStyle(5, 0x003c5a, 1);
    context.beginFill(0x003c5a, 0.25);
    context.drawRoundedRect(
      0.3 * gameWidth,
      0.3 * gameHeight,
      0.4 * gameWidth,
      0.4 * gameHeight,
      15,
    );
    context.endFill();
  }, []);

  return (
    <Container>
      <Graphics draw={draw} visible={paused && !changingLevel} />
      <Text
        x={0.5 * gameWidth}
        y={0.35 * gameHeight}
        text="Pause"
        visible={paused && !changingLevel}
        anchor={0.5}
        style={titleStyle}
        width={0.07 * gameWidth}
      />
      <Text
        x={0.5 * gameWidth}
        y={gameHeight / 2}
        text={`Main Volume: ${mVolume}%`}
        visible={paused && !changingLevel}
        anchor={0.5}
        style={textStyle}
        width={0.2 * gameWidth}
      />
      <Text
        x={0.5 * gameWidth}
        y={0.6 * gameHeight}
        text={`Sound Effects Volume: ${eVolume}%`}
        visible={paused && !changingLevel}
        anchor={0.5}
        style={textStyle}
        width={0.2 * gameWidth}
      />
      <Sprite
        image={minusImage}
        x={0.35 * gameWidth}
        y={gameHeight / 2}
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
        x={0.65 * gameWidth}
        y={gameHeight / 2}
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
        x={0.35 * gameWidth}
        y={0.6 * gameHeight}
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
        x={0.65 * gameWidth}
        y={0.6 * gameHeight}
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
};

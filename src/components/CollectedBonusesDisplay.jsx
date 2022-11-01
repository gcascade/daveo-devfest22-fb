import * as PIXI from 'pixi.js';

import {
  Sprite, Text, Container, Graphics,
} from '@inlet/react-pixi';

import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import heart from '../images/heart_100x100.png';
import coin from '../images/coin_100x100.png';

const bonusTextStyle = new PIXI.TextStyle({
  align: 'left',
  fontSize: 24,
  fontWeight: 'bold',
  fill: ['#FFFFFF'],
  stroke: '#000000',
  strokeThickness: 2,
  letterSpacing: 3,
  wordWrap: false,
  wordWrapWidth: 350,
});

export default function CollectedBonusesContainer({ width, height }) {
  const collectedBonuses = useSelector((state) => state.bonus.collectedBonuses);
  const pointsPerCoin = useSelector((state) => state.game.pointsPerCoin);
  const hearts = collectedBonuses.filter((bonus) => bonus.type === 'heart');
  const coins = collectedBonuses.filter((bonus) => bonus.type === 'coin');
  const showHelp = useSelector((state) => state.game.showHelp);

  const minWidth = 180;
  const minHeight = 200;
  const mainContainerWidth = 0.1 * width > minWidth ? 0.1 * width : minWidth;
  const mainContainerHeight = 0.2 * height > minHeight ? 0.2 * height : minHeight;
  const draw = useCallback((context) => {
    context.clear();
    context.lineStyle(2, 0x003c5a, 1);
    context.beginFill(0x003c5a, 0.25);
    context.drawRoundedRect(0, 0, mainContainerWidth, mainContainerHeight, 15);
    context.endFill();
  }, []);

  // TODO dirty
  const heartcountX = hearts.length >= 10 ? 78 : 70;
  const coincountX = coins.length >= 10 ? 78 : 70;
  const pointsPerCoinX = pointsPerCoin >= 10 ? 100 : 92;

  return (
    <Container
      x={0.01 * width}
      y={0.2 * height}
      width={mainContainerWidth}
      height={mainContainerHeight}
      visible={showHelp}
    >
      <Graphics draw={draw} />
      <Container>
        <Text
          x={0.5 * mainContainerWidth}
          y={mainContainerHeight / 6}
          text="Bonus"
          style={bonusTextStyle}
          anchor={0.5}
        />
      </Container>
      <Container
        x={0}
        y={mainContainerHeight / 4}
        width={mainContainerWidth}
        height={mainContainerHeight / 4}
      >
        <Sprite
          x={0.01 * width}
          y={0.01 * height}
          image={heart}
          scale={0.3}
        />
        <Text
          x={heartcountX}
          y={25}
          text={`x${hearts.length}`}
          style={bonusTextStyle}
          anchor={(0, 0.5)}
        />
      </Container>
      <Container
        x={0}
        y={2 * (mainContainerHeight / 4)}
        width={mainContainerWidth}
        height={2 * (mainContainerHeight / 4)}
      >
        <Sprite
          x={0.01 * width}
          y={0.01 * height}
          image={coin}
          scale={0.3}
        />
        <Text
          x={coincountX}
          y={25}
          text={`x${coins.length}`}
          style={bonusTextStyle}
          anchor={(0, 0.5)}
        />
      </Container>
      <Container
        x={0}
        y={3 * (mainContainerHeight / 4)}
        width={mainContainerWidth}
        height={3 * (mainContainerHeight / 4)}
      >
        <Sprite
          x={0.01 * width}
          y={0.01 * height}
          image={coin}
          scale={0.3}
        />
        <Text
          x={pointsPerCoinX}
          y={25}
          text={`=${pointsPerCoin}pts`}
          style={bonusTextStyle}
          anchor={(0, 0.5)}
        />
      </Container>
    </Container>
  );
}

CollectedBonusesContainer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

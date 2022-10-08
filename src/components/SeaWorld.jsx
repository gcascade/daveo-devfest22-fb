import React from 'react';
import { Container } from '@inlet/react-pixi';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Algae from './Algae';
import Bubble from './Bubble';
import Coral from './Coral';
import DaveoLogo from './DaveoLogo';
import DevFest from './DevFest';
import Fish from './Fish';
import Ground from './Ground';

export default function SeaWorld({ width, height }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  return (
    <Container>
      {isSeaWorld && (
        <>
          <Ground x={width} y={height} scale={1} />
          <Fish x={0.295 * width} y={0.49 * height} scale={0.09} color={1} />
          <Fish x={0.293 * width} y={0.52 * height} scale={0.11} color={1} />
          <Fish x={0.32 * width} y={0.5 * height} scale={0.1} color={1} />
          <Fish x={0.9 * width} y={0.25 * height} scale={0.2} color={1} />
          <Fish x={0.2 * width} y={0.2 * height} scale={0.15} color={2} />
          <Fish x={0.9 * width} y={0.8 * height} scale={0.17} color={2} />
          <Fish x={0.66 * width} y={0.12 * height} scale={0.07} color={2} />
          <Coral x={0.18 * width} y={0.85 * height} scale={0.4} color={1} />
          <Coral x={0.5 * width} y={0.85 * height} scale={0.45} color={2} />
          <Coral x={0.9 * width} y={0.85 * height} scale={0.2} color={2} />
          <Coral x={0.85 * width} y={0.85 * height} scale={0.5} color={1} />
          <Algae x={0.1 * width} y={0.8 * height} scale={0.7} />
          <Algae x={0.6 * width} y={0.8 * height} scale={0.4} />
          <Bubble x={0.45 * width} y={0.7 * height} scale={0.5} />
          <Bubble x={0.1 * width} y={0.1 * height} scale={0.3} />
          <Bubble x={0.7 * width} y={0.05 * height} scale={0.3} />
          <Bubble x={0.56 * width} y={0.3 * height} scale={0.15} />
          <Bubble x={0.55 * width} y={0.6 * height} scale={0.25} />
          <Bubble x={0.57 * width} y={0.66 * height} scale={0.4} />
          <Bubble x={0.8 * width} y={0.66 * height} scale={0.25} />
          <Bubble x={0.84 * width} y={0.71 * height} scale={0.45} />
          <Container>
            <DaveoLogo x={0.1 * width} y={0.2 * height} scale={0.1} color={2} />
            <DevFest x={0.6 * width} y={0.42 * height} scale={0.1} color={2} />
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

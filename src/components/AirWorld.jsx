import React from 'react';
import { Container } from '@inlet/react-pixi';
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

export default function AirWorld({ width, height }) {
  const isSeaWorld = useSelector((state) => state.game.isSeaWorld);

  return (
    <Container>
      {!isSeaWorld && (
        <>
          <Cloud x={width * 0.5} y={height * 0.5} scale={0.4} />
          <Cloud x={1 * width} y={height * 0.45} scale={0.5} />
          <Mountain x={0.5 * width} y={0.85 * height} scale={0.5} />
          <Mountain x={0.25 * width} y={0.85 * height} scale={0.3} />
          <Rock x={1 * width} y={0.85 * height} scale={0.6} />
          <Tree x={0.1 * width} y={0.85 * height} scale={0.15} />
          <Tree x={0.3 * width} y={1 * height} scale={0.25} />
          <Tree x={0.8 * width} y={1 * height * 0.86} scale={0.2} />
          <Elephant x={0.8 * width} y={0.85 * height} scale={0.5} />
          <Zeppelin x={0.7 * width} y={0.2 * height} scale={0.15} />
          <Container>
            <DaveoLogo x={0.1 * width} y={0.2 * height} scale={0.1} color={1} />
            <DevFest x={0.6 * width} y={0.42 * height} scale={0.1} color={1} />
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

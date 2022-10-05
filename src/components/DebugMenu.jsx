import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../slices/gameSlice';

export default function DebugMenu() {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gravity = useSelector((state) => state.game.gravity);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const obstacleGap = useSelector((state) => state.game.obstacleGap);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);
  const maxGameSpeed = useSelector((state) => state.game.maxGameSpeed);
  const godMode = useSelector((state) => state.game.godMode);
  const displayDebugMenu = useSelector((state) => state.game.displayDebugMenu);
  const speedIncrease = useSelector((state) => state.game.speedIncrease);
  const obstacleMinHeight = useSelector((state) => state.game.obstacleMinHeight);

  return (
    <div>
      {displayDebugMenu && (
      <div style={{
        position: 'absolute',
        right: '16px',
        top: '16px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        borderRadius: '8px',
      }}
      >
        <h1>
          Debug Menu
          {' '}
          {displayDebugMenu}
        </h1>
        <span>Gravity</span>
        <input
          type="number"
          value={gravity}
          onChange={((e) => dispatch(updateSettings({ gravity: e.target.value })))}
        />
        <br />
        <span>Bird Jump Velocity</span>
        <input
          type="number"
          value={birdJumpVelocity}
          onChange={((e) => dispatch(updateSettings({ birdJumpVelocity: e.target.value })))}
        />
        <br />
        <span>Obstacle Speed</span>
        <input
          type="number"
          value={obstacleSpeed}
          onChange={((e) => dispatch(updateSettings({ obstacleSpeed: e.target.value })))}
        />
        <br />
        <span>Obstacle Gap</span>
        <input
          type="number"
          value={obstacleGap}
          onChange={((e) => dispatch(updateSettings({ obstacleGap: e.target.value })))}
        />
        <br />
        <span>Obstacle Min Height</span>
        <input
          type="number"
          value={obstacleMinHeight}
          onChange={((e) => dispatch(updateSettings({ obstacleMinHeight: e.target.value })))}
        />
        <br />
        <span>Game speed (current)</span>
        <input
          type="number"
          value={gameSpeed}
          onChange={((e) => dispatch(updateSettings({ gameSpeed: e.target.value })))}
        />
        <br />
        <span>Game speed (max)</span>
        <input
          type="number"
          value={maxGameSpeed}
          onChange={((e) => dispatch(updateSettings({ maxGameSpeed: e.target.value })))}
        />
        <br />
        <span>Game speed increase</span>
        <input
          type="number"
          value={speedIncrease}
          onChange={((e) => dispatch(updateSettings({ speedIncrease: e.target.value })))}
        />
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'right',
          }}
        >
          <span>God mode</span>
          <input
            type="checkbox"
            value={godMode}
            checked={godMode}
            onChange={((e) => dispatch(updateSettings({ godMode: e.target.checked })))}
          />
        </div>
      </div>
      )}
    </div>
  );
}

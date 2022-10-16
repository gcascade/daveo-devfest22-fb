import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateSettings, incrementTotalScore, decreaseTotalScore } from '../slices/gameSlice';
import { collectBonus, removeOneCoinBonus, removeOneHeartBonus } from '../slices/bonusSlice';

export default function DebugMenu() {
  const dispatch = useDispatch();
  const obstacleSpeed = useSelector((state) => state.game.obstacleSpeed);
  const gravity = useSelector((state) => state.game.gravity);
  const birdJumpVelocity = useSelector((state) => state.game.birdJumpVelocity);
  const birdScale = useSelector((state) => state.game.birdScale);
  const obstacleGap = useSelector((state) => state.game.obstacleGap);
  const gameSpeed = useSelector((state) => state.game.gameSpeed);
  const maxGameSpeed = useSelector((state) => state.game.maxGameSpeed);
  const godMode = useSelector((state) => state.game.godMode);
  const displayDebugMenu = useSelector((state) => state.game.displayDebugMenu);
  const speedIncrease = useSelector((state) => state.game.speedIncrease);
  const obstacleMinHeight = useSelector((state) => state.game.obstacleMinHeight);
  const seaWorld = useSelector((state) => state.game.isSeaWorld);
  const scoreNeededForNextLevel = useSelector((state) => state.game.scoreNeededForNextLevel);
  const changeLevelEnabled = useSelector((state) => state.game.changeLevelEnabled);
  const animationEnabled = useSelector((state) => state.game.animationEnabled);
  const lives = useSelector((state) => state.game.lives);
  const pointsPerCoin = useSelector((state) => state.game.pointsPerCoin);

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
          onChange={((e) => dispatch(updateSettings({ gravity: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Bird Jump Velocity</span>
        <input
          type="number"
          value={birdJumpVelocity}
          onChange={((e) => dispatch(updateSettings({ birdJumpVelocity: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Bird scale</span>
        <input
          type="number"
          value={birdScale}
          onChange={((e) => dispatch(updateSettings({ birdScale: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Obstacle Speed</span>
        <input
          type="number"
          value={obstacleSpeed}
          onChange={((e) => dispatch(updateSettings({ obstacleSpeed: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Obstacle Gap</span>
        <input
          type="number"
          value={obstacleGap}
          onChange={((e) => dispatch(updateSettings({ obstacleGap: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Obstacle Min Height</span>
        <input
          type="number"
          value={obstacleMinHeight}
          onChange={((e) => dispatch(updateSettings({ obstacleMinHeight: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Game speed (current)</span>
        <input
          type="number"
          value={gameSpeed}
          onChange={((e) => dispatch(updateSettings({ gameSpeed: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Game speed (max)</span>
        <input
          type="number"
          value={maxGameSpeed}
          onChange={((e) => dispatch(updateSettings({ maxGameSpeed: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Game speed increase</span>
        <input
          type="number"
          value={speedIncrease}
          onChange={((e) => dispatch(updateSettings({ speedIncrease: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Score needed for next level</span>
        <input
          type="number"
          value={scoreNeededForNextLevel}
          onChange={((e) => dispatch(updateSettings({ scoreNeededForNextLevel: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Lives</span>
        <input
          type="number"
          value={lives}
          onChange={((e) => dispatch(updateSettings({ lives: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <span>Points per coin</span>
        <input
          type="number"
          value={pointsPerCoin}
          onChange={((e) => dispatch(updateSettings({ pointsPerCoin: parseFloat(e.target.value.replace(',', '.')) })))}
        />
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'right',
          }}
        >
          <span>Change level during game ?</span>
          <input
            type="checkbox"
            value={changeLevelEnabled}
            checked={changeLevelEnabled}
            onChange={((e) => dispatch(updateSettings({ changeLevelEnabled: e.target.checked })))}
          />
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'right',
          }}
        >
          <span>Sea world</span>
          <input
            type="checkbox"
            value={seaWorld}
            checked={seaWorld}
            onChange={((e) => dispatch(updateSettings({ isSeaWorld: e.target.checked })))}
          />
        </div>
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
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'right',
          }}
        >
          <span>Animation</span>
          <input
            type="checkbox"
            value={animationEnabled}
            checked={animationEnabled}
            onChange={((e) => dispatch(updateSettings({ animationEnabled: e.target.checked })))}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <button
            onClick={() => {
              dispatch(collectBonus({ type: 'coin' }));
              dispatch(incrementTotalScore(pointsPerCoin));
            }}
            type="button"
            style={{
              margin: '0 8px',
            }}
          >
            +1 coin
          </button>
          <button
            onClick={() => {
              dispatch(removeOneCoinBonus());
              dispatch(decreaseTotalScore(pointsPerCoin));
            }}
            type="button"
            style={{
              margin: '0 8px',
            }}
          >
            -1 coin
          </button>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <button
            onClick={() => {
              dispatch(collectBonus({ type: 'heart' }));
              dispatch(updateSettings({ lives: lives + 1 }));
            }}
            type="button"
            style={{
              margin: '0 8px',
            }}
          >
            +1 heart
          </button>
          <button
            onClick={() => {
              dispatch(removeOneHeartBonus());
              dispatch(updateSettings({ lives: lives - 1 }));
            }}
            type="button"
            style={{
              margin: '0 8px',
            }}
          >
            -1 heart
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useWindowDimensions from './hooks/windowDimensions';
import birdImage from './images/balloon_120x120.png';
import background from './images/background.png';
import groundImage from './images/ground.png';

// bird file dimension
const BIRD_SIZE = {
  width: 120,
  height: 120,
};
const GRAVITY = 3;
const OBSTACLE_HEIGHT = 100;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_GAP = 250;
const OBSTACLE_MOVE_SPEED = 5;
const WINDOW_MARGIN = 8;
const GAME_SPEED = 2;
const INTERVAL_TIME = 24;
const GROUND_HEIGHT = 50;

/**
 *  0 ---------- > width
 *  |  bird
 *  |
 *  v
 *  height
 *
 */
function App() {
  const { height, width } = useWindowDimensions();
  const windowHeight = height - WINDOW_MARGIN;
  const windowWidth = width - WINDOW_MARGIN;
  const jumpHeight = windowHeight * 0.05;
  const gravity = GRAVITY * GAME_SPEED;

  const birdStartingHeight = height / 2;

  const [birdPosition, setBirdPosition] = useState(windowHeight / 2);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(OBSTACLE_HEIGHT);
  const [obstacleLeft, setObstacleLeft] = useState(windowWidth - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
  const bottomObstacleHeight = windowHeight - OBSTACLE_GAP - obstacleHeight;

  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < windowHeight - BIRD_SIZE.height) {
      timeId = setInterval(() => {
        setBirdPosition((position) => position + gravity);
      }, INTERVAL_TIME);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [birdPosition, gameHasStarted]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((left) => left - OBSTACLE_MOVE_SPEED);
      }, INTERVAL_TIME);

      return () => {
        clearInterval(obstacleId);
      };
    }

    setObstacleLeft(windowWidth - OBSTACLE_WIDTH - WINDOW_MARGIN);
    setObstacleHeight(Math.floor(Math.random() * (windowHeight - OBSTACLE_GAP)));

    if (gameHasStarted) {
      setScore((sc) => sc + 1);
    }
  }, [obstacleLeft, gameHasStarted]);

  useEffect(() => {
    const birdHorizontalPosition = {
      center: windowWidth / 2,
      left: windowWidth / 2 - BIRD_SIZE.width / 2,
      right: windowWidth / 2 + BIRD_SIZE.width / 2,
    };
    const birdTopPosition = birdPosition - BIRD_SIZE.height / 2;
    const birdBottomPosition = birdPosition + BIRD_SIZE.height / 2;
    const hasCollidedWithTopObstacle = birdTopPosition < obstacleHeight;
    const hasCollidedWithBottomObstacle = birdBottomPosition >= windowHeight - bottomObstacleHeight;
    const hasCollidedWithFloor = birdPosition >= windowHeight - (BIRD_SIZE.height + GROUND_HEIGHT);

    // peut-être BIRD_LEFT + BIRD_SIZE
    const obstacleReachedBird = obstacleLeft <= birdHorizontalPosition.right
      && obstacleLeft >= birdHorizontalPosition.left;
    const gameOver = hasCollidedWithFloor || (obstacleReachedBird
       && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle));

    if (gameOver) {
      setGameHasStarted(false);
      setBirdPosition(birdStartingHeight);
    }
  }, [birdPosition, obstacleLeft, obstacleHeight, gameHasStarted, bottomObstacleHeight]);

  const handleClick = () => {
    const newBirdPosition = birdPosition - jumpHeight;
    if (!gameHasStarted) {
      setGameHasStarted(true);
      setScore(0);
      setBirdPosition(birdStartingHeight);
    }
    if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  };

  return (
    <Div onClick={handleClick}>
      <GameBox height={windowHeight} width={windowWidth}>
        <TopObstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft - WINDOW_MARGIN}
        />
        <Obstacle
          top={windowHeight - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft - WINDOW_MARGIN}
        />
        <Bird
          size={BIRD_SIZE}
          top={birdPosition - BIRD_SIZE.height / 2 - WINDOW_MARGIN / 2}
          left={50 - (100 * ((BIRD_SIZE.width / 2 + WINDOW_MARGIN) / windowWidth))}
        />
        <Ground height={GROUND_HEIGHT} width={windowWidth} top={windowHeight + WINDOW_MARGIN / 2} />
        <Score top={WINDOW_MARGIN}>{score}</Score>
      </GameBox>
    </Div>
  );
}

export default App;

const Score = styled.span`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%;
`;

const Bird = styled.div.attrs((props) => ({
  style: {
    top: props.top,
    left: `${props.left}%`,
    height: props.size.height,
    width: props.size.width,
  },
}))`
  position: absolute;
  background-image: url(${birdImage});
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & span {
    color: white;
    font-size: 24px;
    position: absolute;
  }
`;

const GameBox = styled.div.attrs((props) => ({
  style: {
    height: props.height,
    width: props.width,
  },
}))`
  background-image: url(${background});
  overflow: hidden;
`;

const Obstacle = styled.div.attrs((props) => ({
  style: {
    top: props.top,
    left: props.left,
    height: props.height,
    width: props.width,
  },
}))`
  position: relative;
  background-image: url(${obstacleImage});
  background-color: green;
`;

const TopObstacle = styled.div.attrs((props) => ({
  style: {
    top: props.top,
    left: props.left,
    height: props.height,
    width: props.width,
  },
}))`
  position: relative;
  background-image: url(${obstacleImage});
  transform: rotate(180deg);
`;

const Ground = styled.div.attrs((props) => ({
  style: {
    top: props.top,
    height: props.height,
  },
}))`
  background-image: url(${groundImage});
  position: absolute;
  z-index: +1;
  width: 100%;
`;

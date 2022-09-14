import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useWindowDimensions from './hooks/windowDimensions';
import birdImage from './images/balloon_120x120.png';
import background from './images/background.png';
import obstacleImage from './images/obstacle.png';
import groundImage from './images/ground.png';

// bird file dimension
const BIRD_SIZE = {
  width: 120,
  height: 120,
};
const GRAVITY = 3;
const OBSTACLE_HEIGHT = 100;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_GAP = 200;
const OBSTACLE_MOVE_SPEED = 15;
const WINDOW_OFFSET = 20;
const GAME_SPEED = 2;
const INTERVAL_TIME = 24;
const GROUND_HEIGHT = 150;

function App() {

  let { height, width } = useWindowDimensions();
  height = height - WINDOW_OFFSET;
  width = width - WINDOW_OFFSET;
  // const jumpHeight = height * 0.2;
  const jumpHeight = 50;
  const gravity = GRAVITY * GAME_SPEED;
  const birdHorizontalPosition = {
    center: width / 2,
    left: width / 2 - BIRD_SIZE.width / 2,
    right: width / 2 + BIRD_SIZE.width / 2,
  }

  
  const birdStartingHeight = height / 2;

  const [birdPosition, setBirdPosition] = useState(birdStartingHeight);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(OBSTACLE_HEIGHT);
  const [obstacleLeft, setObstacleLeft] = useState(width - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const bottomObstacleHeight = height - OBSTACLE_GAP - obstacleHeight;

  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < height - BIRD_SIZE.height) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + gravity);
      }, INTERVAL_TIME);
    }

    return () => {
      clearInterval(timeId);
    }
  }, [height, birdPosition, gameHasStarted, gravity]);

  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - OBSTACLE_MOVE_SPEED);
      }, INTERVAL_TIME);
      
      return () => {
        clearInterval(obstacleId);
      }
    }
    else {
      setObstacleLeft(width - OBSTACLE_WIDTH);
      setObstacleHeight(Math.floor(Math.random() * (height - OBSTACLE_GAP)));

      if (gameHasStarted) {
        setScore((score) => score + 1);
      }
    }
  }, [gameHasStarted, height, obstacleLeft, width]);

  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObstacle = birdPosition <= height && birdPosition >= height - bottomObstacleHeight;
    const hasCollidedWithFloor = birdPosition >= height - BIRD_SIZE.height;
    // peut-être BIRD_LEFT + BIRD_SIZE
    const obstacleReachedBird = obstacleLeft <= birdHorizontalPosition.right && obstacleLeft >= birdHorizontalPosition.left;
    const gameOver = hasCollidedWithFloor || (obstacleReachedBird && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle));

    if (gameOver) {
      setGameHasStarted(false);
      if (score > bestScore) {
        setBestScore(score);
      }
      setBirdPosition(birdStartingHeight);
    }
  }, [birdPosition, obstacleLeft, obstacleHeight, bottomObstacleHeight, height, birdStartingHeight, birdHorizontalPosition.right, birdHorizontalPosition.left, score, bestScore]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - jumpHeight;
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
  }

  return (
    <Div onClick={handleClick}>
      <GameBox height={height} width={width}>
        <TopObstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={height - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
        <Bird size={BIRD_SIZE} top={birdPosition}/>
        {/* <Ground height={height - GROUND_HEIGHT} width={width}/> */}
      </GameBox>
      <Score top={WINDOW_OFFSET}>{score}</Score>
      {/* <span>Best: {bestScore}</span>
      <span>Last: {lastScore}</span> */}
    </Div>
  );
}

export default App;

const Score = styled.span`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 50%;
`;

const Bird = styled.div`
  position: absolute;
  height: ${(props) => props.size.height}px;
  width: ${(props) => props.size.width}px;
  top: ${(props) => props.top}px;
  left: 50%;
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

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-image: url(${background});
  overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-image: url(${obstacleImage});
  // background-repeat: no-repeat;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
`;

const TopObstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-image: url(${obstacleImage});
  // background-repeat: no-repeat;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;  
  transform: rotate(180deg);
`;

const Ground = styled.div`
  background-image: url(${groundImage});
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
`;

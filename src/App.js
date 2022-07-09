import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BIRD_SIZE = 20;
const BIRD_LEFT = 0;
const GAME_WIDTH = 500;
const GAME_HEIGHT = 500;
const GRAVITY = 3;
const JUMP_HEIGHT = 50;
const OBSTACLE_HEIGHT = 100;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_GAP = 200;
const OBSTACLE_MOVE_SPEED = 5;
const BIRD_STARTING_HEIGHT = GAME_HEIGHT / 2;

function App() {

  const [birdPosition, setBirdPosition] = useState(BIRD_STARTING_HEIGHT);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(OBSTACLE_HEIGHT);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;

  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + GRAVITY);
      }, 24);
    }

    return () => {
      clearInterval(timeId);
    }
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - OBSTACLE_MOVE_SPEED);
      }, 24);
      
      return () => {
        clearInterval(obstacleId);
      }
    }
    else {
      setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
      setObstacleHeight(Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP)));

      if (gameHasStarted) {
        setScore((score) => score + 1);
      }
    }
  }, [gameHasStarted, obstacleLeft]);

  useEffect(() => {
    const hasCollidedWithTopObstacle = birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObstacle = birdPosition <= GAME_HEIGHT && birdPosition >= GAME_HEIGHT - bottomObstacleHeight;
    const hasCollidedWithFloor = birdPosition >= GAME_HEIGHT - BIRD_SIZE;
    // peut-être BIRD_LEFT + BIRD_SIZE
    const obstacleReachedBird = obstacleLeft >= BIRD_LEFT && obstacleLeft <= (BIRD_LEFT + OBSTACLE_WIDTH)
    const gameOver = hasCollidedWithFloor || (obstacleReachedBird && (hasCollidedWithTopObstacle || hasCollidedWithBottomObstacle));

    if (gameOver) {
      setGameHasStarted(false);
      setLastScore(score);
      if (score > bestScore) {
        setBestScore(score);
      }
      setBirdPosition(BIRD_STARTING_HEIGHT);
    }
  }, [birdPosition, obstacleLeft, obstacleHeight, bottomObstacleHeight, score, bestScore]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT;
    if (!gameHasStarted) {
      setGameHasStarted(true);
      setScore(0);
      setBirdPosition(BIRD_STARTING_HEIGHT);
    }
    if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  }

  return (
    <Div onClick={handleClick}>
      <GameBox height={GAME_HEIGHT} width={GAME_WIDTH}>
        <Obstacle
          top={0}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
        <Bird size={BIRD_SIZE} top={birdPosition}/>
      </GameBox>
      <span>{score}</span>
      {/* <span>Best: {bestScore}</span>
      <span>Last: {lastScore}</span> */}
    </Div>
  );
}

export default App;

const Bird = styled.div`
  position: absolute;
  background-color: red;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
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
  background-color: blue;
  overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  top: ${(props) => props.top}px;
  background-color: green;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
`;

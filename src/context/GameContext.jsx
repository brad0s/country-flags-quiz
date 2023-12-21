import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GameStatus, shuffle } from '../utils/helpers';
import countriesData from '../utils/countries-197.json';

export const GameContext = createContext(null);

export const GameContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [countries, setCountries] = useState([]);
  const total = countries.length;
  const [gameStatus, setGameStatus] = useState(GameStatus.INIT); // INIT || PLAYING || ENDED

  const resetGameContext = () => {
    setCounter(0);
    setAnswers([]);
  };

  const handleButtonClick = () => {
    if (gameStatus === GameStatus.INIT) {
      setGameStatus(GameStatus.PLAYING);
    } else if (gameStatus === GameStatus.PLAYING) {
      setGameStatus(GameStatus.ENDED);
    } else {
      setGameStatus(GameStatus.PLAYING);
      resetGameContext();
      setCountries(shuffle(countriesData));
    }
  };

  const contextValue = {
    counter,
    answers,
    setAnswers,
    countries,
    total,
    gameStatus,
    setGameStatus,
    handleButtonClick,
  };

  useEffect(() => {
    setCountries(shuffle(countriesData));
    setGameStatus(GameStatus.INIT);
  }, []);

  useEffect(() => {
    setCounter(answers.length);
    if (answers.length === total && gameStatus === 'playing') {
      setGameStatus(GameStatus.ENDED);
    }
  }, [answers, total, gameStatus]);

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

GameContextProvider.propTypes = {
  children: PropTypes.any,
};

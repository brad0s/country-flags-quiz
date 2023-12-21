import styles from './flags.module.css';
import Flag from '../flag/Flag';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { GameContext } from '../../context/GameContext';
import { GameStatus } from '../../utils/helpers';

const Flags = () => {
  let { gameStatus, answers, setAnswers, countries } = useContext(GameContext);
  let flagsRef = useRef(null);

  const onInputAnswers = (item) => {
    setAnswers([...answers, item]);
  };

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      flagsRef.current.firstElementChild?.querySelector('input')?.focus();
    }
  }, [gameStatus]);

  return (
    <div ref={flagsRef} className={styles.flagGrid}>
      {countries &&
        countries.map((country) => (
          <Flag
            key={country.code}
            code={country.code}
            name={country.name}
            altAnswers={country.altAnswers}
            handleAnswers={onInputAnswers}
          />
        ))}
    </div>
  );
};

export default Flags;

Flags.propTypes = {
  countries: PropTypes.array,
  onInputAnswers: PropTypes.func,
  gameStatus: PropTypes.string,
};

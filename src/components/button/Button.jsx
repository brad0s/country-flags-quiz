import styles from './button.module.css';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Button = () => {
  let { gameStatus, handleButtonClick } = useContext(GameContext);
  let title = gameStatus !== 'playing' ? 'Start' : 'Finish 🏁';
  return (
    <>
      <button onClick={handleButtonClick} className={styles.button}>
        {title}
      </button>
    </>
  );
};

export default Button;

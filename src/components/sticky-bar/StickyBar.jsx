import { useContext } from 'react';
import styles from './sticky-bar.module.css';
import Timer from '../timer/Timer';
import { GameContext } from '../../context/GameContext';
import Button from '../button/Button';

const StickyBar = () => {
  let { counter, total } = useContext(GameContext);

  return (
    <div className={styles.utilRow}>
      <div className={styles.counter}>
        <div className={styles.score}>
          <span className={styles.currentScore}>{counter}</span> /{' '}
          <span className={styles.total}>{total}</span>
        </div>
        <span className={styles.percentage}>{((counter / total) * 100).toFixed(0)}%</span>
      </div>
      <Timer />
      <Button />
    </div>
  );
};

export default StickyBar;

import styles from './timer.module.css';
import { useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
import { GameStatus } from '../../utils/helpers';

const Timer = () => {
  let { time, setTime, gameStatus } = useContext(GameContext);
  // const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (gameStatus === GameStatus.PLAYING) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }

    if (gameStatus === GameStatus.INIT) {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }),
    [gameStatus, time];

  useEffect(() => {
    if (gameStatus === 'playing') {
      setTime(0);
    }
  }, [gameStatus]);

  // Hours calculation
  //  const hours = Math.floor(time / 360000);
  // Minutes calculation
  // const minutes = Math.floor((time % 360000) / 6000);
  // const minutes = Math.floor(time / 6000);
  // Seconds calculation
  // const seconds = Math.floor((time % 6000) / 100);
  // const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  // const milliseconds = time % 100;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <>
      <div className={styles.timer}>
        <span className={styles.min}>{minutes.toString().padStart(2, '0')}</span>:
        <span className={styles.sec}>{seconds.toString().padStart(2, '0')}</span>
        {/* <span className={styles.ms}>{milliseconds.toString().padStart(2, '0')}</span> */}
      </div>
    </>
  );
};

export default Timer;

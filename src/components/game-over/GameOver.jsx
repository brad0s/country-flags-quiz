import { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GameContext } from '../../context/GameContext';
import { getHighScoresList, addHighScore } from '../../utils/firebase';
import {
  convertSecondsToMilliseconds,
  GameStatus,
  getFormattedTimeFromMilliseconds,
  getFormattedTimeFromSeconds,
} from '../../utils/helpers';
import styles from './game-over.module.css';

const HighScore = () => {
  let { counter, total, time, gameStatus } = useContext(GameContext);
  const [isVisible, setIsVisible] = useState(true);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isNewHighScoreSubmitted, setIsNewHighScoreSubmitted] = useState(false);
  const [highScoresList, setHighScoresList] = useState([]);
  const hasInsertedHighScore = useRef(false);

  // get high scores
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const highScores = await getHighScoresList();
        setHighScoresList(highScores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    fetchHighScores();
  }, []);

  // check game status
  useEffect(() => {
    if (gameStatus === GameStatus.ENDED) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [gameStatus]);

  // check if new high score
  useEffect(() => {
    let timeInMilliseconds = convertSecondsToMilliseconds(time);
    if (!highScoresList || !highScoresList.length) return;
    if (hasInsertedHighScore.current) return;
    const checkIfHighScore = () => {
      if (total !== 0 && counter === total && time > 0) {
        // if (time > 0) {
        let lowestHighScoreItem = highScoresList[highScoresList.length - 1];
        let lowestHighScore = convertSecondsToMilliseconds(lowestHighScoreItem.score) || {
          score: Infinity,
        };
        if (timeInMilliseconds < lowestHighScore) {
          setIsNewHighScore(true);
          let newHighScoresList = [...highScoresList];
          newHighScoresList.push({
            id: Date.now().toString(),
            name: '',
            score: timeInMilliseconds,
            isCurrentPlayer: true,
          });
          newHighScoresList.sort((a, b) => a.score - b.score);
          setHighScoresList(newHighScoresList.slice(0, 10));
          hasInsertedHighScore.current = true;
        }
      }
    };
    checkIfHighScore();
  }, [highScoresList, time]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeBtn}
          onClick={() => setIsVisible(false)}
        >
          X
        </button>
        <h2 className={styles.title}>Game Over</h2>
        <div>
          <p className={styles.score}>
            {counter} / {total}
          </p>
          <p className={styles.time}>Time: {getFormattedTimeFromSeconds(time)}</p>
          {isNewHighScore && (
            <h4 className={styles.newHighScore}>
              Congratulations! <br></br>A New High Score! 🎉
            </h4>
          )}
        </div>
        <div className={styles.highScoresList}>
          <h3>High Scores</h3>
          {highScoresList &&
            highScoresList.map((item, index) => (
              <HighScoresListItem
                key={item.id}
                id={item.id}
                index={index}
                name={item.name}
                score={item.score}
                isCurrentPlayer={item.isCurrentPlayer}
                isNewHighScoreSubmitted={isNewHighScoreSubmitted}
                setIsNewHighScoreSubmitted={setIsNewHighScoreSubmitted}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HighScore;

const HighScoresListItem = ({
  id,
  index,
  name,
  score,
  isCurrentPlayer,
  isNewHighScoreSubmitted,
  setIsNewHighScoreSubmitted,
}) => {
  const [input, setInput] = useState('');

  const handleHighScoreSubmit = () => {
    try {
      addHighScore(input, score);
      // const docID = addHighScore(input, score);
      // console.log('Document written with ID: ', docID);
      setIsNewHighScoreSubmitted(true);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div
      key={id}
      className={styles.highScoreItem}
    >
      <span className={styles.index}>{index + 1}</span>
      <HighScoresListItemName
        isCurrentPlayer={isCurrentPlayer}
        name={name}
        input={input}
        setInput={setInput}
        isNewHighScoreSubmitted={isNewHighScoreSubmitted}
      />
      <span className={styles.score}>{getFormattedTimeFromMilliseconds(score)}</span>
      {isCurrentPlayer && !isNewHighScoreSubmitted ? (
        <button onClick={() => handleHighScoreSubmit()}>Submit</button>
      ) : null}
    </div>
  );
};

HighScoresListItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isCurrentPlayer: PropTypes.bool.isRequired,
  isNewHighScoreSubmitted: PropTypes.bool.isRequired,
  setIsNewHighScoreSubmitted: PropTypes.func.isRequired,
};

const HighScoresListItemName = ({
  isCurrentPlayer,
  name,
  input,
  setInput,
  isNewHighScoreSubmitted,
}) => {
  if (isCurrentPlayer) {
    if (isNewHighScoreSubmitted) {
      return <span className={styles.name}>{input}</span>;
    } else {
      return (
        <input
          type='text'
          placeholder='Name'
          value={input}
          tabIndex={0}
          onChange={(e) => setInput(e.target.value)}
        />
      );
    }
  } else {
    return <span className={styles.name}>{name}</span>;
  }
};

HighScoresListItemName.propTypes = {
  isCurrentPlayer: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  isNewHighScoreSubmitted: PropTypes.bool.isRequired,
};

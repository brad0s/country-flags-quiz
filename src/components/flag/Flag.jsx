import PropTypes from 'prop-types';
import styles from './flag.module.css';
import { useState, useEffect, useContext } from 'react';
import { GameStatus } from '../../utils/helpers';
import { GameContext } from '../../context/GameContext';

function Flag({ code, name, altAnswers, handleAnswers }) {
  const { gameStatus } = useContext(GameContext);
  const [isCorrect, setIsCorrect] = useState(false);
  const [value, setValue] = useState('');
  const acceptedAnswers = [name, ...altAnswers].filter(Boolean).join(', ');
  const cardCorrectClassName = isCorrect ? styles.cardCorrect : '';
  const inputIncorrectClassName = !isCorrect && value !== '' ? styles.inputIncorrect : '';
  const imgUrl = new URL(`../../assets/flag-svgs/${code.toLowerCase()}.svg`, import.meta.url).href;

  // useEffect(() => {
  //   const dynamicSvgImport = async () => {
  //     const svg = await import(`../../assets/flag-svgs/${code.toLowerCase()}.svg?react`);
  //     console.log(svg.default);
  //     // setFlagSvg(svg);
  //   };
  //   dynamicSvgImport();
  // });

  const handleInput = (e) => {
    setValue(e.target.value);
    const inputValue = e.target.value.trim();
    const acceptedValues = acceptedAnswers.toLowerCase().split(', ');
    const match = acceptedValues.includes(inputValue.toLowerCase());
    if (match) {
      setIsCorrect(true);
      setValue(name);
      e.target.parentElement.nextElementSibling?.querySelector('input')?.focus();
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    if (isCorrect) {
      handleAnswers(code);
    }
  }, [isCorrect]);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      setValue('');
      setIsCorrect(false);
    }
  }, [gameStatus]);

  return (
    <>
      <div className={`${styles.card} ${cardCorrectClassName}`}>
        <img src={imgUrl} className={styles.image} alt='Country flag' />
        <input
          className={`${styles.input} ${inputIncorrectClassName}`}
          type='text'
          tabIndex={isCorrect ? -1 : 0}
          autoComplete='false'
          autoCorrect='false'
          spellCheck='true'
          onInput={(e) => handleInput(e)}
          disabled={gameStatus !== GameStatus.PLAYING || isCorrect}
          value={value}
        />
        {gameStatus === GameStatus.ENDED && <p className={styles.answer}>{name}</p>}
      </div>
    </>
  );
}

Flag.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  altAnswers: PropTypes.arrayOf(PropTypes.string),
  handleAnswers: PropTypes.func,
};

export default Flag;

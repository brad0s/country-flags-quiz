import styles from './hero.module.css';

const Hero = () => {
  return (
    <div className={styles.header}>
      <h1>197 Countries Flag Quiz</h1>
      <p>
        Welcome to the Flag Quiz! 🤠 Test your knowledge of countries&apos; flags by following these
        simple instructions:
      </p>
      <p>
        Press the <code>START</code> button to get started. <br />
        When you&apos;re ready to see your results, hit the <code>FINISH</code> button. This will
        stop the timer and reveal all your answers. <br />
        After you&apos;ve done some studying, press the <code>START</code> button again to reset the
        quiz and start guessing!
        <br />
      </p>
      <p>
        Press the <code>START</code> button to begin!
      </p>
    </div>
  );
};

export default Hero;

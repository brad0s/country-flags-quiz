import styles from './hero.module.css';

const Hero = () => {
  return (
    <div className={styles.header}>
      <h1>197 Countries Flag Quiz</h1>
      <p>Welcome to the Flag Quiz! 🤠 Test your knowledge of countries&apos; flags.</p>
      <p>
        Press the <code>START</code> button to begin!
      </p>
    </div>
  );
};

export default Hero;

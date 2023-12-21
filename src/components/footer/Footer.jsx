import styles from './footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <p>
          <a href='https://github.com/hampusborgos/country-flags'>country-flags repo</a>
        </p>
        <p>© {new Date().getFullYear()} Braden Wright</p>
      </footer>
    </>
  );
};

export default Footer;

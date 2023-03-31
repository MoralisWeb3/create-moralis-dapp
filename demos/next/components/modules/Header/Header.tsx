/* eslint-disable @next/next/no-img-element */
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.links}>
        <a href="https://nextjs.org/docs" target="_blank">
          <img
            src="/next.svg"
            className={`${styles.logo} ${styles.next}`}
            alt="Next logo"
          />
        </a>
        <a href="https://moralis.io" target="_blank">
          <img
            src="/moralis.svg"
            className={`${styles.logo} ${styles.moralis}`}
            alt="Moralis logo"
          />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="/typescript.svg" className={styles.logo} alt="TS logo" />
        </a>
      </div>
      <h1>Next Moralis Template</h1>
    </header>
  );
}

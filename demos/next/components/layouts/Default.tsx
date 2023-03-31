import React from 'react';
import { Footer } from '../modules';
import styles from './Default.module.css';
import { Header } from 'components/modules/Header';

const Default: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.default}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Default;

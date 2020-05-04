import * as React from 'react';
import * as styles from './global.module.scss';

export default () => {
  return (
    <div className={styles.Container}>
      <h1>404 - That's an Error!</h1>
      <p>Sorry, but that page is not available.</p>
    </div>
  )
}
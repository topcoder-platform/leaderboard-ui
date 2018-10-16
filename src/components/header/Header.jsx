import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function logoContainer(imgPath) {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoBg} />
      <img className={styles.logo} src={imgPath} alt="background" />
    </div>
  );
}

function sponsorContainer(imgPath) {
  return (
    <div className={styles.sponsorContainer}>
      <div className={styles.sponsorBg} />
      <img className={styles.sponsor} src={imgPath} alt="background" />
    </div>
  );
}

function titleContainer(title) {
  return (
    <div className={styles.title}>
      { title }
    </div>
  );
}

function header({ roundTitle, logoImage, sponsorImage }) {
  return (
    <header className={styles.header}>
      {titleContainer(roundTitle)}
      {logoContainer(logoImage)}
      {sponsorContainer(sponsorImage)}
    </header>
  );
}

header.propTypes = {
  roundTitle: PropTypes.string.isRequired,
  logoImage: PropTypes.string,
  sponsorImage: PropTypes.string,
};

header.defaultProps = {
  logoImage: 'logo.png',
  sponsorImage: 'sponsor.png',
};

export default header;

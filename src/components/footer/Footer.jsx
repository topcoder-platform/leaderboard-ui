import React from 'react';
import PropTypes from 'prop-types';
import NewsMarquee from '../newsMarquee/NewsMarquee';
import styles from './Footer.module.css';

function footer({ tickerMessages, tickerSeparator, tickerTypeImage }) {
  return (
    <footer>
      <img className={styles.footerDivider} src="footerSeparator.png" alt="stars" />
      <div className={styles.flashContainer}>
        <img className={styles.flashImg} src={tickerTypeImage} alt="flash news" />
        <NewsMarquee tickerMessages={tickerMessages} tickerSeparator={tickerSeparator} />
      </div>
    </footer>
  );
}

footer.propTypes = {
  tickerTypeImage: PropTypes.string,
  tickerMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  tickerSeparator: PropTypes.string,
};

footer.defaultProps = {
  tickerTypeImage: 'flashNews.png',
  tickerSeparator: 'miniLogo.png',
};

export default footer;

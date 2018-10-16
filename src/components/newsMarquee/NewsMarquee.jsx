import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './NewsMarquee.module.css';

class NewsMarquee extends Component {
  constructor() {
    super();
    this.state = {
      elemWidth: 0,
      translateX: 0,
      slide: false,
      elem: null,
      bodyWidth: 0,
    };
  }

  componentDidMount() {
    const elem = document.getElementById('marquee-rollover');
    let { elemWidth, translateX, bodyWidth } = this.state;
    if (elemWidth !== elem.clientWidth) {
      elemWidth = elem.clientWidth;
      bodyWidth = document.body.clientWidth;
      translateX = bodyWidth;
    }
    this.setState({
      elemWidth,
      translateX,
      bodyWidth,
      elem,
      slide: true,
    }, this.slide.bind(this));
  }

  slide() {
    const {
      elem, slide, elemWidth, bodyWidth,
    } = this.state;
    let { translateX } = this.state;
    if (!slide) {
      return;
    }
    elem.style.transform = `translateX(${translateX}px)`;
    if (translateX < -elemWidth) {
      translateX = bodyWidth;
    } else {
      translateX -= 1;
    }
    this.setState({ translateX }, () => {
      requestAnimationFrame(this.slide.bind(this));
    });
  }

  render() {
    const { tickerMessages, tickerSeparator } = this.props;
    return (
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeText} id="marquee-rollover">
          {tickerMessages.map(message => (
            <span className={styles.marqueeMessageBlock} key={message}>
              {message}
              <img className={styles.marqueeDividerImg} src={tickerSeparator} alt="divier" />
            </span>
          ))}
        </div>
        <div className={styles.marqueeShadowStart} />
        <div className={styles.marqueeShadow} />
      </div>
    );
  }
}

NewsMarquee.propTypes = {
  tickerSeparator: PropTypes.string.isRequired,
  tickerMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewsMarquee;

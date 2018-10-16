import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from  './Message.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTitle: 'ALGORITHM ROUND - 1',
      logoImage: 'logo.png',
      sponsorImage: 'sponsor.png',
      message: 'WILL BE BACK SOON',
      tickerTypeImage: 'flashNews.png',
      tickerSeparator: 'miniLogo.png',
      tickerMessages: ['This is a test message 1', 'This is a test message 2'],
    };
  }

  render() {
    const { message } = this.state;
    return (
      <div className={styles.container}>
        <Header {...this.state} />
        <main className={styles.main}>
          <div className={styles.messageContainer}>
            <img className={styles.messageBg} src="messageHolder.png" alt="stars" />
            <div className={styles.message}>
              { message }
            </div>
          </div>
        </main>
        <Footer {...this.state} />
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import Header from '../../components/header/Header';
import styles from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundTitle: 'ALGORITHM ROUND - 1',
      logoImage: 'logo.png',
      sponsorImage: 'sponsor.png',
    };
  }

  render() {
    const { logoImage, sponsorImage } = this.state;
    return (
      <div className={styles.container}>
        <Header {...this.state} />
        <main className={styles.main}>
          <img className={styles.logo} src={logoImage} alt="logo" />
          <img className={styles.divider} src="divider.png" alt="divider" />
          <div className={styles.sponsoredText}>
            SPONSORED BY
          </div>
          <img className={styles.sponsor} src={sponsorImage} alt="sponsor" />
        </main>
      </div>
    );
  }
}

export default Home;

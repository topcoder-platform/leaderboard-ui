import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Countdown.module.css";

function leadingZero(number) {
  if (number < 10) {
    return `0${number}`;
  }
  if (number > 99) {
    return "99";
  }
  return number;
}

class Countdown extends Component {
  constructor(props) {
    super(props);
    const iso = "2018-10-17T18:49:20.000Z";
    this.state = {
      roundTitle: "ALGORITHM ROUND - 1",
      logoImage: "logo.png",
      sponsorImage: "sponsor.png",
      eventTime: Math.floor(new Date(iso).getTime() / 1000),
      countdownText: "",
      tickerTypeImage: "flashNews.png",
      tickerSeparator: "miniLogo.png",
      tickerMessages: ["This is a test message", "This is a test message2"]
    };
  }

  componentDidMount() {
    this.timerHandler = setInterval(this.timer.bind(this), 1000);
  }

  timer() {
    const { eventTime } = this.state;
    const now = Math.floor(Date.now() / 1000);
    const diff = eventTime - now;
    if (diff < 0) {
      this.setState({ countdownText: "00 : 00 : 00" });
      clearInterval(this.timerHandler);
      this.timerHandler = null;
      return;
    }
    const hour = leadingZero(Math.floor(diff / 3600));
    const minutes = leadingZero(Math.floor((diff - hour * 3600) / 60));
    const seconds = leadingZero(diff % 60);
    const countdownText = `${hour} : ${minutes} : ${seconds}`;
    this.setState({ countdownText });
  }

  render() {
    const { countdownText } = this.state;
    return (
      <div className={styles.container}>
        <Header {...this.state} />
        <main className={styles.main}>
          <div className={styles.countdownContainer}>
            <img className={styles.countdownBg} src="timerHolder.png" alt="stars" />
            <div className={styles.countdownTitle}>WILL BE STARTING IN</div>
            <div className={styles.countdown}>{countdownText}</div>
          </div>
        </main>
        <Footer {...this.state} />
      </div>
    );
  }
}

export default Countdown;

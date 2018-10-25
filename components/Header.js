import React from 'react'
import PropTypes from 'prop-types'
import { leadingZero } from '../common/helper'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      timerText: null
    }

    setInterval(this.tick.bind(this), 1000)
  }

  tick () {
    const { timerText } = this.state
    let { eventStartDateTime } = this.props

    if (!eventStartDateTime) {
      if (!timerText) {
        this.setState({ timerText: null })
      }

      return
    }

    eventStartDateTime = Math.floor(new Date(eventStartDateTime).getTime() / 1000)

    const now = Math.floor(Date.now() / 1000)
    const diff = eventStartDateTime - now

    if (diff < 0) {
      this.setState({ timerText: null })
    } else {
      const hour = leadingZero(Math.floor(diff / 3600))
      const minutes = leadingZero(Math.floor((diff - hour * 3600) / 60))

      this.setState({ timerText: `${hour}:${minutes}` })
    }
  }

  timer () {
    const { timerText } = this.state

    return (
      <div className='timerContainer'>
        <div className='timerBg' />
        {timerText &&
          (
            <div className='timer'>
              <div className='clock'>
                {timerText}
              </div>
              <div className='hint'>
                Time to start
              </div>
            </div>
          )
        }
        <style jsx>
          {`
            .timerContainer {
              width: 400px;
              height: 100%;
              position: absolute;
              right: 0;
            }

            .timerBg {
              width: 350px;
              height: 100%;
              position: absolute;
              right: -18px;
              transform: skew(-18deg);
              background-image: linear-gradient(8deg, #011921 0%, #07547A 70%);
            }

            .timer {
              position: absolute;
              top: 13px;
              right: 38px;
              color: #FFFFFF;
              font-family: Montserrat;
              text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
            }

            .clock {
              font-size: 32px;
              font-weight: 400;
              text-align: right;
            }

            .hint {
              font-size: 22px;
              font-weight: 700;
              line-height: 26px;
              text-align: right;
            }
            @media only screen and (min-width:1600px){
              .clock {
                font-size: 46px;
              }
            }
          `}
        </style>
      </div>
    )
  }

  logoContainer () {
    const { logo, primaryColor } = this.props
    return (
      <div className='logoContainer'>
        <div className='logoBg'>
          <div
            className='colorSpread'
            style={{ color: primaryColor, background: primaryColor }}
          />
        </div>
        <img className='logo' src={logo} alt='background' />
        <style jsx>
          {`
            .logoContainer {
              width: 400px;
              height: 100%;
              position: absolute;
              left: 0;
            }

            .logoBg {
              position: absolute;
              left: -19px;
              width: 350px;
              height: 100%;
              transform: skew(-18deg);
              box-shadow: 0px 0px 15px 0 rgba(0,0,0,0.42);
              background-image: linear-gradient(90deg, #011921 0%, #07547A 76%);
            }

            .logo {
              position: absolute;
              left: 72px;
              top: 20px;
              height: 72px;
              z-index: 2;
            }

            .colorSpread {
              width: 20px;
              height: 100%;
              position: absolute;
              right: 0;
              box-shadow: 40px 0px 100px 26px;
            }

            @media only screen and (min-width:1600px){
              .logo {
                height: 84px;
              }
            }
          `}
        </style>
      </div>
    )
  }

  titleContainer () {
    const { track, round } = this.props
    return (
      <div className='title'>
        <span>{track}</span>
        &nbsp;
        <span className='round'>{round}</span>
        <style jsx>
          {`
            .title {
              position: absolute;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 89px;
              font-family: 'Montserrat';
              font-size: 32px;
              color: #FFFFFF;
              text-shadow: 0 1px 4px rgba(0,0,0,0.50);
              font-weight: 800;
              text-transform: uppercase;
              text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
            }

            .round {
              font-weight: 300;
            }

            @media only screen and (min-width:1600px){
              .title {
                font-size: 46px;
                line-height: 119px;
              }
            }
          `}
        </style>
      </div>
    )
  }

  render () {
    return (
      <header className='header'>
        <img className='background' src='/static/img/titleBackground.png' alt='background' />
        {this.titleContainer()}
        {this.logoContainer()}
        {this.timer()}
        <style jsx>
          {`
            .header {
              height: 89px;
              min-height: 89px;
              width: 100%;
              position: relative;
              background-size: cover;
              overflow: hidden;
              box-shadow: 1px 4px 15px 0 rgba(0,0,0,0.42);
            }

            .background {
              width: 100%;
              position: absolute;
              left: -70px;
              height: 89px;
            }

            @media only screen and (min-width:1600px) {
              .header {
                height: 119px;
                min-height: 119px;
              }
            }

            @media only screen and (min-width:1450px) {
              .background {
                left: 40px;
                height: 119px;
              }
            }
          `}
        </style>
      </header>
    )
  }
}

Header.propTypes = {
  logo: PropTypes.string,
  track: PropTypes.string,
  round: PropTypes.string,
  eventStartDateTime: PropTypes.string,
  primaryColor: PropTypes.string
}

Header.defaultProps = {
  logo: '/static/img/logo.png',
  track: 'development',
  round: 'round 1',
  eventStartDateTime: null,
  primaryColor: '#5CC900'
}

export default Header

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
    let { eventStartDateTime, eventEndDateTime } = this.props

    if (!eventStartDateTime && !eventEndDateTime) {
      if (!timerText) {
        this.setState({ timerText: null })
      }
      return
    }

    let endTime = eventEndDateTime || eventStartDateTime
    endTime = Math.floor(new Date(endTime).getTime() / 1000)

    const now = Math.floor(Date.now() / 1000)
    const diff = endTime - now

    if (diff < 0) {
      this.setState({ timerText: null })
    } else {
      const hour = leadingZero(Math.floor(diff / 3600))
      const minutes = leadingZero(Math.floor((diff - hour * 3600) / 60))
      const seconds = leadingZero(diff % 60)

      this.setState({ timerText: `${hour}:${minutes}:${seconds}` })
    }
  }

  timer () {
    const { timerText } = this.state
    const { smallHeader } = this.props
    const smallClass = smallHeader ? ' small' : ''
    const { eventStartDateTime, eventEndDateTime } = this.props
    return (
      <div className={'timerContainer' + smallClass}>
        <div className='timerBg' />
        {timerText &&
          (
            <div className='timer'>

              {eventEndDateTime && <div className='hint'>
                Ends in
              </div>}
              <div className='clock'>
                {timerText}
              </div>
              {eventStartDateTime && <div className='hint'>
                Time to start
              </div>}
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
              z-index: 2;
            }

            .timerContainer.small {
              width: 300px;
            }

            .timerBg {
              width: calc(100% - 50px);
              height: 100%;
              position: absolute;
              right: -18px;
              transform: skew(-18deg);
              background-image: linear-gradient(8deg,#001C41 0%,#003E8F 70%);
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
              font-family: 'Roboto', sans-serif;
              font-size: 2.875em;
              font-weight: 400;
              text-align: right;
            }

            .hint {
              font-family: 'Roboto', sans-serif;
              font-size: 1.25em;
              font-weight: 400;
              line-height: 26px;
              text-align: right;
            }
            @media only screen and (min-width:1600px){
              .clock {
                font-size: 2.875em;
              }

              .timer {
                right: 20px;
              }
            }
          `}
        </style>
      </div>
    )
  }

  logoContainer () {
    const { logo, primaryColor, smallHeader } = this.props
    const smallClass = smallHeader ? ' small' : ''
    return (
      <div className={'logoContainer' + smallClass}>
        <div className={'logoBg' + smallClass}>
          <div
            className='colorSpread'
            style={{ color: primaryColor, background: primaryColor }}
          />
        </div>
        <img className={'logo' + smallClass} src={logo} alt='background' />
        <style jsx>
          {`
            .logoContainer {
              width: 400px;
              height: 100%;
              position: absolute;
              left: 0;
            }

            .logoContainer.small {
              width: 300px;
            }

            .logoBg {
              position: absolute;
              left: -19px;
              width: calc(100% - 50px);
              height: 100%;
              transform: skew(-18deg);
              box-shadow: 0px 0px 15px 0 rgba(0,0,0,0.42);
              background-image: linear-gradient(90deg,#00132B 0%,#003E8F 76%);
            }

            .logo {
              position: absolute;
              left: 72px;
              top: 10px;
              height: 72px;
              z-index: 2;
            }

            .logo.small {
              left: 20px;
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
                width: 7.625em;
                height: auto;
                top: 13px;
              }

              .logo.small {
                left: 10px;
              }
            }
          `}
        </style>
      </div>
    )
  }

  titleContainer () {
    const { smallHeader } = this.props
    const { track, round } = this.props
    const smallClass = smallHeader ? ' small' : ''
    return (
      <div className={'title' + smallClass}>
        <img className='gradient' src='/static/img/headerGradient.svg' alt='gradient' />
        <span>{track}</span>
        &nbsp;
        <span className={'round' + smallClass}>{round}</span>
        <style jsx>
          {`
            .title {
              position: absolute;
              width: 100%;
              height: 100%;
              text-align: center;
              line-height: 89px;
              font-family: 'Barlow Condensed', sans-serif;
              font-size: 4.0625em;
              color: #FFFFFF;
              text-shadow: 0 1px 4px rgba(0,0,0,0.50);
              font-weight: 700;
              text-transform: uppercase;
              text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
            }

            .gradient {
              position: absolute;
              width: 80%;
              top: 0;
              left: 50%;
              margin-left: -40%;
            }

            .title.small {
              font-family: 'Barlow Condensed', sans-serif;
              font-weight: 400;
              z-index: 1;
              text-align: left;
              padding-left: 270px;
              font-size: 1.75em;
            }

            .round {
              font-weight: 300;
            }

            .round.small {
              font-size: 1.125em;
              font-weight: 300;
            }

            .small .gradient {
              margin-left: -35%;
            }

            @media only screen and (min-width:1600px){
              .title {
                font-size: 4.063em;
                line-height: 119px;
              }

              .title.small {
                font-size: 3.875em;
              }

              .round.small {
                font-size: 0.75em;
              }
            }
          `}
        </style>
      </div>
    )
  }

  render () {
    const { smallHeader } = this.props
    const smallClass = smallHeader ? ' small' : ''
    return (
      <header className='header'>
        <img className={'background ' + smallClass} src='/static/img/titleBackground.png' alt='background' />
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
              background: #003E8F;
            }

            .header::before {
              content: "";
              height: 2px;
              background: linear-gradient(#01285c 0%, #01459e 44.66%, #00285d 100%);
              bottom: 0;
              left: 0;
              width: 100%;
              position: absolute;
              z-index: 3;
            }

            .background {
              width: 100%;
              position: absolute;
              height: 89px;
            }

            .background.small {
              left: 170px;
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
  eventEndDateTime: PropTypes.string,
  primaryColor: PropTypes.string,
  smallHeader: PropTypes.bool
}

Header.defaultProps = {
  logo: '/static/img/logo.png',
  track: 'development',
  round: 'round 1',
  eventStartDateTime: null,
  eventEndDateTime: null,
  primaryColor: '#5CC900',
  smallHeader: false
}

export default Header

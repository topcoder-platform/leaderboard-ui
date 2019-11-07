import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import { leadingZero, checkForMainSponsor } from '../common/helper'

class Countdown extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      countdownText: ''
    }
  }

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

    const data = await res.json()

    const header = data.fields.header.fields

    const sponsor = data.fields.sponsor.fields

    const footer = data.fields.footer.fields

    const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

    const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

    return {
      logo: header.logo.fields.file.url,
      primaryColor: header.primaryColor,
      track: header.track,
      round: header.round,
      eventStartDateTime: header.eventDateTime,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors
    }
  }

  componentDidMount () {
    this.timerHandler = setInterval(this.timer.bind(this), 1000)
  }

  timer () {
    const { eventStartDateTime } = this.props
    const eventTime = Math.floor(new Date(eventStartDateTime).getTime() / 1000)
    const now = Math.floor(Date.now() / 1000)
    const diff = eventTime - now

    if (diff < 0) {
      this.setState({ countdownText: '00:00:00' })

      clearInterval(this.timerHandler)

      this.timerHandler = null

      return
    }

    const hour = leadingZero(Math.floor(diff / 3600))
    const minutes = leadingZero(Math.floor((diff - hour * 3600) / 60))
    const seconds = leadingZero(diff % 60)
    const countdownText = `${hour}:${minutes}:${seconds}`

    this.setState({ countdownText })
  }

  render () {
    const { countdownText } = this.state

    return (
      <div className='container'>
        <PageHead />
        <Header {...this.props} eventStartDateTime={null} />
        <main className='main'>
          <div className='countdownContainer'>
            <div className='countdownTitle'>WILL START IN</div>
            <div className='countdown'>{countdownText}</div>
          </div>
        </main>
        <Sponsors {...this.props} hideMainSponsor />
        <Footer {...this.props} />
        <style jsx>
          {`
            .container {
              width: 100%;
              height: 100vh;
              display: flex;
              flex-direction: column;
              overflow: auto;
              background: url("/static/img/background.png") no-repeat center center fixed;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
            }

            .main {
              min-height: 200px;
              flex-grow: 1;
              align-items: center;
              display: flex;
              flex-direction: column;
            }

            .countdownContainer {
              text-shadow: 0 7px 15px rgba(0, 0, 0, 0.4000000059604645);
              flex-grow: 1;
              width: 100%;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .countdownTitle {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: 'Montserrat', sans-serif;
              font-size: 1.5em;
              line-height: 2.25em;
              opacity: 0.6;
              text-align: center;
              margin-bottom: 80px;
            }

            .countdown {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              position: absolute;
              color: #FFFFFF;
              font-family: 'Montserrat', sans-serif;
              font-size: 4.5em;
              font-weight: 400;
              line-height: 46px;
              width: 350px;
              margin-top: 20px;
              letter-spacing: 1.4px;
              margin-left: 25px;
            }

            @media only screen and (min-width:1600px){
              .countdown{
                font-size: 7.625em;
                margin-top: 10px;
                margin-left: 35px;
                width: 600px;
              }

              .countdownTitle {
                margin-bottom: 130px;
                font-size: 1.875em;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default Countdown

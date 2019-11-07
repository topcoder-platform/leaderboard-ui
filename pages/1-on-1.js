import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { hexToName, prepareLeaderboard, checkForMainSponsor } from '../common/helper'

const DETAILS = ['rating', 'rank', 'percentile', 'competitions', 'volatility']

const detailLayout = (props) => {
  const { challengee, challenger, primaryColor } = props
  return (
    <div className='container'>
      <div className='profilePicContainer'>
        <img className='profilePicMask' src={`/static/img/avatarBg/profile-mask-${hexToName(primaryColor)}.svg`} alt='bg' />
        <span className='oval-shape' />
        <img className='profilePic' src={challenger.profilePic} />
        <div className='handle' style={{ color: primaryColor }}>
          {challenger.handle}
        </div>
        <div className='country'>
          <img className='countryFlag' src={challenger.countryFlag} />
          {challenger.country}
        </div>
      </div>
      <div className='details'>
        { DETAILS.map((key, i) => (
          <div key={i} className='details-item'>
            <div className='value'>{challenger[key]}</div>
            <div className='key'>{key}</div>
          </div>
        ))}
      </div>
      <img className='divider' src='/static/img/verticalDivider.png' />
      <div className='details challenger'>
        { DETAILS.map((key, i) => (
          <div key={i} className='details-item'>
            <div className='value'>{challengee[key]}</div>
            <div className='key'>{key}</div>
          </div>
        ))}
      </div>
      <div className='profilePicContainer challenger'>
        <img className='profilePicMask' src={`/static/img/avatarBg/profile-mask-${hexToName(primaryColor)}.svg`} alt='bg' />
        <span className='oval-shape' />
        <img className='profilePic' src={challengee.profilePic} />
        <div className='handle' style={{ color: primaryColor }}>
          {challengee.handle}
        </div>
        <div className='country'>
          <img className='countryFlag' src={challengee.countryFlag} />
          {challengee.country}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            margin-top: 30px;
            zoom: 0.7;
          }

          .profilePicContainer {
            height: 387px;
            width: 230px;
            position: relative;
            z-index: 1;
            margin-bottom: 20px;
          }

          .profilePicBg {
            width: 120%;
            position: absolute;
            left: 0px;
            bottom: 12px;
            z-index: -1;
          }

          .profilePicMask {
            position: absolute;
            bottom: -11px;
            left: -24px;
            width: 140%;
            z-index: -2;
          }

          .oval-shape {
            display: block;
            position: absolute;
            width: 160px; 
            height: 12px; 
            background: rgba(5, 5, 5, .58); 
            -moz-border-radius: 12px / 6px; 
            -webkit-border-radius: 12px / 6px; 
            border-radius: 12px / 6px;
            filter: blur(8px);
            bottom: -40px;
            left: 60px;
          }

          .profilePic {
            z-index: 1;
            margin-left: 40px;
            width: 100%;
            margin-bottom: 8px;
          }

          .details {
            margin-left: 120px;
            margin-right: 50px;
            text-align: right;
          }

          .details.challenger {
            margin-left: 50px;
            margin-right: 120px;
            text-align: left;
          }

          .details-item:not(:first-child) {
            margin-top: 20px;
          }

          .value {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-family: 'Barlow Condensed',sans-serif;
            font-size: 2.625em;
            font-weight: 500;
            letter-spacing: 2.38px;
            line-height: 40px;
          }

          .handle {
            position: absolute;
            font-family: Montserrat;
            font-size: 2.1875em;
            font-weight: 900;
            line-height: 31px;
            left: 30px;
            text-align: center;
            width: 100%;
            bottom: -85px;
          }

          .country {
            color: #FFFFFF;
            font-family: Helvetica;
            font-weight: 400;
            text-align: center;
            position: absolute;
            width: 100%;
            bottom: -50px;
            text-transform: uppercase;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: -140px;
            left: 20px;
            font-size: 1.3125em;
          }

          .countryFlag {
            height: 27px;
            width: auto;
            margin-right: 10px;
          }

          .key {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.25em;
            font-weight: 400;
            letter-spacing: 1.25px;
            line-height: 40px;
            opacity: 0.4000000059604645;
            text-transform: uppercase;
          }
          
          .challenger .profilePicMask {;
            transform: scaleX(-1);
          }

          .challenger .profilePic {
            margin-left: 20px;
            margin-top: -15px;
          }

          @media only screen and (min-width:1620px){
            .container {
              zoom: 0.9;
            }
          }

          @media only screen and (min-width:1920px){
            .container {
              zoom: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

class OneOnOne extends React.Component {
  constructor (props) {
    super(props)

    this.polling = null
    this.state = {
      leaderboard: []
    }
    this.setupLeaderboard = this.setupLeaderboard.bind(this)
  }

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

    const leaderboardData = await import('../static/json/leaderboard.json')

    const data = await res.json()

    const header = data.fields.header.fields

    const sponsor = data.fields.sponsor.fields

    const footer = data.fields.footer.fields

    const finalists = data.fields.finalists.fields

    const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

    const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

    return {
      logo: header.logo.fields.file.url,
      primaryColor: header.primaryColor,
      track: header.track,
      round: header.round,
      eventEndDateTime: header.eventDateTime,
      showScoreboard: header.showScoreboard,
      challengeId: header.challengeId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors,
      members: finalists.finalists,
      challengee: data.fields.challengee,
      challenger: data.fields.challenger,
      finalists: leaderboardData.leaderboard
    }
  }

  componentDidMount () {
    this.setupLeaderboard()
  }

  setupLeaderboard () {
    const { publicRuntimeConfig } = getConfig()

    prepareLeaderboard(this.props.challengeId, this.props.members)
      .then((leaderboard) => {
        this.setState({ leaderboard })
        // Poll after configured second
        this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
      })
  }

  componentWillUnmount () {
    clearTimeout(this.polling)
  }

  render () {
    return (
      <div className='container'>
        <div className='viewHolder'>
          <PageHead />
          <Header {...this.props} />
          <main className='main'>
            <img className='hexa' src='/static/img/largeHexa.png' />
            <div className='message'>
              <img src='/static/img/hexagon.png' alt='hex' />
              <div className='subtitle'>one on one</div>
              <div className='title'>challenge</div>
            </div>
            {detailLayout(this.props)}
          </main>
          <Sponsors {...this.props} smallerSponsor />
          <Footer {...this.props} />
        </div>
        { this.props.showScoreboard && <FinalistTable
          {...this.props}
          finalists={this.state.leaderboard}
          // smallerDesign
        />
        }
        <style jsx global>{`
          #__next {
            display: flex;
            min-height: 100%;
          }
        `}</style>
        <style jsx>
          {`
            .container {
              display: flex;
              background: url("/static/img/background.png") no-repeat center center fixed;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              overflow-y: auto;
              width: 100%;
            }

            .viewHolder {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              width: 0;
            }

            .main {
              flex-grow: 1;
              align-items: center;
              display: flex;
              flex-direction: column;
              flex-shrink: 1;
              background-image: linear-gradient(270deg,rgba(0, 78, 119, 0.5) 0%,rgba(0, 18, 101, 0.5) 51.72%,rgba(0, 40, 61, 0.5) 100%);
              margin-bottom: 10px;
            }

            .hexa {
              position: absolute;
              width: 550px;
            }

            .message {
              min-height: 100px;
              display: flex;
              position: relative;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 40px;
              text-transform: uppercase;
            }

            .message img {
              height: 125%;
              position: absolute;
            }

            .message .subtitle {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: Montserrat;
              font-size: 1.5em;
              font-weight: 400;
              line-height: 29px;
              opacity: 0.6;
              text-align: center;
            }

            .message .title {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: Montserrat;
              font-size: 2.375em;
              font-weight: 700;
              line-height: 46px;
              text-align: center;
              margin-top: -5px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default OneOnOne

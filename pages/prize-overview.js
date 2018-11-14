import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard, checkForMainSponsor } from '../common/helper'

const prizesLayout = (prizes) => {
  return (
    <div className='container'>
      <div className='small'>
        <img src='/static/img/silverTrophy.png' />
        <div className='money'>
          ${prizes[1]}
        </div>
      </div>
      <div className='large' style={{ marginTop: ((prizes.length === 2) ? '60px' : '0px') }}>
        <img src='/static/img/goldTrophy.png' />
        <div className='money'>
          ${prizes[0]}
        </div>
      </div>
      { (prizes.length === 3) && <div className='small'>
        <img src='/static/img/bronzeTrophy.png' />
        <div className='money'>
          ${prizes[2]}
        </div>
      </div>}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-grow: 1;
            margin-bottom: 40px;
            margin-top: 100px;
          }

          img {
            width: 100%;
            z-index: 3;
          }

          .small {
            width: 160px;
            position: relative;
            color: #EEF4F5;
            font-size: 32px;
            z-index: 1;
            height: 200px;
            margin-top: 100px;
          }

          .large {
            width: 220px;
            height: 240px;
            color: #FFBA3A;
            font-size: 48px;
            position: relative;
            z-index: 1;
            margin: 0px 60px;
          }

          .money {
            font-family: Montserrat;
            font-weight: 700;
            text-align: center;
            position: absolute;
            bottom: 7%;
            display: block;
            width: 100%;
          }
        `}
      </style>
    </div>
  )
}

class PrizeOverview extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      leaderboard: []
    }

    this.polling = null
    this.setupLeaderboard = this.setupLeaderboard.bind(this)
  }

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

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
      challengeId: header.challengeId,
      showScoreboard: header.showScoreboard,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors,
      members: finalists.finalists,
      prizes: data.fields.prizes
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
          <Header {...this.props} smallHeader />
          <main className='main'>
            <img className='hexa' src='/static/img/largeHexa.png' />
            <div className='message'>
              <img src='/static/img/hexagon.png' alt='hex' />
              <div className='subtitle'>TCO Champions</div>
              <div className='title'>Prize overview</div>
            </div>
            {prizesLayout(this.props.prizes)}
          </main>
          <Sponsors {...this.props} hideMainSponsor smallerSponsor showFlatDesign />
          <Footer {...this.props} />
        </div>
        { this.props.showScoreboard && <FinalistTable
          {...this.props}
          finalists={this.state.leaderboard}
        />}
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
              background: url('/static/img/plainBackground.png') no-repeat center center fixed;
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
              background-image: linear-gradient(270deg, rgba(0, 78, 119, 0) 0%, #004165 51.72%, rgba(0, 40, 61, 0) 100%);
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
              font-family: Helvetica;
              font-size: 24px;
              font-weight: 400;
              line-height: 29px;
              opacity: 0.6;
              text-align: center;
            }

            .message .title {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: Helvetica;
              font-size: 38px;
              font-weight: 700;
              line-height: 46px;
              text-align: center;
              margin-top: -10px;
            }

            @media only screen and (min-width:1600px){
              .message{
                font-size: 94px;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default PrizeOverview

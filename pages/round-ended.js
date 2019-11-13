import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard, checkForMainSponsor } from '../common/helper'

class RoundEnded extends React.Component {
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
      eventStartDateTime: header.eventDateTime,
      eventEndDateTime: header.eventEndDateTime,
      showScoreboard: header.showScoreboard,
      challengeId: header.challengeId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors,
      members: finalists.finalists
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
            <div className='message'>
              <div className='subtitle'>{this.props.track + ' ' + this.props.round}</div>
              <div className='title'>ENDED</div>
            </div>
          </main>
          <Sponsors {...this.props} smallerSponsor />
          <Footer {...this.props} />
        </div>
        { this.props.showScoreboard && <FinalistTable
          {...this.props}
          finalists={this.state.leaderboard}
          isMini
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
              background: url('/static/img/background.png') no-repeat center center fixed;
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
              background-image: linear-gradient(rgba(0,78,119,0.1) 0%,rgba(0,18,101,0.1) 51.72%,rgba(0,40,61,0.2) 100%);
              margin-bottom: 10px;
              position: relative;
            }

            .main::before {
              content: "";
              width: 363.1px;
              background: rgba(112, 112, 112, 0.12);
              height: 2px;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
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
              margin-top: 200px;
              text-transform: uppercase;
            }

            .message img {
              height: 180%;
              position: absolute;
            }

            .message .subtitle {
              text-shadow: 0px 3px 0 rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: Montserrat;
              font-size: 51.88px;
              font-weight: 400;
              line-height: 62px;
              opacity: 0.6;
              text-align: center;
            }

            .message .title {
              text-shadow: 0px 3px 0 rgba(0,0,0,0.4000000059604645);
              color: #FFFFFF;
              font-family: Montserrat;
              font-size: 82.14px;
              font-weight: 700;
              line-height: 99px;
              text-align: center;
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

export default RoundEnded

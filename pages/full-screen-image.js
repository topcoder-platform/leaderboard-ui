import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { checkForMainSponsor } from '../common/helper'

class FullScreenImage extends React.Component {

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

    const leaderboardData = await import('../static/json/leaderboard.json')

    const data = await res.json()

    const header = data.fields.header.fields

    const screenImage = data.fields.screenImage

    const sponsor = data.fields.sponsor.fields

    const footer = data.fields.footer.fields

    const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

    const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

    return {
      logo: header.logo.fields.file.url,
      primaryColor: header.primaryColor,
      track: header.track,
      round: header.round,
      eventEndDateTime: header.eventDateTime,
      showScoreboard: false,
      challengeId: header.challengeId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors,
      problemTitle: data.fields.problemStatementTitle,
      problemDescription: data.fields.problemStatementDescription,
      finalists: leaderboardData.leaderboard,
      imageSrc: screenImage.fields.file.url
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='viewHolder'>
          <PageHead />
          <Header {...this.props} />
          <main className='main'>
            <img className='content-image' src={this.props.imageSrc} />
          </main>
          <Sponsors {...this.props} hideMainSponsor smallerSponsor showFlatDesign />
          <Footer {...this.props} />
        </div>
        {this.props.showScoreboard && <FinalistTable
          {...this.props}
          smallerDesign
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
              background-image: linear-gradient(270deg,rgba(0, 43, 119, 0.5) 0%,rgba(0, 18, 101, 0.5) 100%,rgba(0, 13, 61, 0.5) 0%);
              margin-bottom: 10px;
            }

            .content-image {
              width: 100%;
            }
          `}
        </style>
      </div>
    )
  }
}

export default FullScreenImage

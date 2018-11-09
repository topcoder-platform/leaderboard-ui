import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard } from '../common/helper'

const ProblemStatement = (props) => {
  return (
    <div className='container'>
      <div className='viewHolder'>
        <PageHead />
        <Header {...props} smallHeader />
        <main className='main'>
          <iframe
            width='800'
            height='600'
            src={props.livestreamUrl}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </main>
        <Sponsors {...props} smallerSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
        smallerDesign
      />
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
            margin-bottom: 10px;
          }

          .streamContainer {
            width: 100%;
            margin-top: 40px;
          }

          .streamContainer img {
            width: 100%;
          }

          iframe {
            width: 90%;
            min-height: 600px;
            margin-top: 60px;
          }
        `}
      </style>
    </div>
  )
}

ProblemStatement.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const header = data.fields.header.fields

  const sponsor = data.fields.sponsor.fields

  const footer = data.fields.footer.fields

  const finalists = data.fields.finalists.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  const leaderboard = await prepareLeaderboard(header.challengeId, finalists.finalists)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventEndDateTime: header.eventDateTime,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor: sponsor.primarySponsor.fields.file.url,
    otherSponsors,
    finalists: leaderboard,
    livestreamUrl: data.fields.liveStreamUrl
  }
}

export default ProblemStatement

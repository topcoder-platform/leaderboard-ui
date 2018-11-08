import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

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

ProblemStatement.getInitialProps = async function () {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/content/CONTENTFUL_FINALISTS_ENTRY_ID`)

  const data = await res.json()

  const otherSponsors = data.fields.otherSponsors.map(s => s.fields.file.url)

  const finalists = data.fields.finalists

  for (let i = 0; i < finalists.length; i++) {
    finalists[i] = {
      ...finalists[i],
      testsPassed: 20,
      challenges: 2,
      points: 12
    }
    if (i > 7) {
      delete finalists[i].points
      finalists[i].status = 'awaiting submission'
    }
  }

  return {
    logo: data.fields.logo.fields.file.url,
    primaryColor: data.fields.primaryColor,
    track: data.fields.track,
    round: data.fields.round,
    tickerType: data.fields.tickerType.fields.file.url,
    tickerSeparator: data.fields.tickerSeparator.fields.file.url,
    tickerMessages: data.fields.tickerMessages,
    mainSponsor: data.fields.mainSponsor.fields.file.url,
    otherSponsors,
    finalists,
    eventEndDateTime: '2018-11-04T18:49:20.000Z',
    livestreamUrl: 'https://www.youtube.com/embed/bNLgikGu4Yw'
  }
}

export default ProblemStatement

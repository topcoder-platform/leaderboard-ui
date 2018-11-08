import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

const RoundEnded = (props) => {
  return (
    <div className='container'>
      <div className='viewHolder'>
        <PageHead />
        <Header {...props} smallHeader />
        <main className='main'>
          <img className='hexa' src='/static/img/largeHexa.png' />
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='subtitle'>{props.track + ' ' + props.round}</div>
            <div className='title'>ENDED</div>
          </div>
        </main>
        <Sponsors {...props} smallerSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
      />
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

RoundEnded.getInitialProps = async function () {
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
    eventEndDateTime: '2018-11-04T18:49:20.000Z'
  }
}

export default RoundEnded

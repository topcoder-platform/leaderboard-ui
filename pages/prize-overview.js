import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

const prizesLayout = (prizes) => {
  return (
    <div className='container'>
      <div className='small'>
        <img src='/static/img/silverTrophy.png' />
        <div className='money'>
          ${prizes[1]}
        </div>
      </div>
      <div className='large' style={{ marginBottom: ((prizes.length === 2) ? '60px' : '120px') }}>
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
            align-items: baseline;
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
            margin-bottom: 50px;
            z-index: 1;
          }

          .large {
            width: 220px;
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

const PrizeOverview = (props) => {
  return (
    <div className='container'>
      <div className='viewHolder'>
        <PageHead />
        <Header {...props} smallHeader />
        <main className='main'>
          <img className='hexa' src='/static/img/largeHexa.png' />
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='subtitle'>TCO Champions</div>
            <div className='title'>Prize overview</div>
          </div>
          {prizesLayout(props.prizes)}
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

PrizeOverview.getInitialProps = async function () {
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
    prizes: ['5000', '2000', '1000']
  }
}

export default PrizeOverview

import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { hexToName } from '../common/helper'

const DETAILS = ['rating', 'rank', 'percentile', 'competitions', 'volatility']

const detailLayout = (props) => {
  const { challengee, challenger, primaryColor } = props
  return (
    <div className='container'>
      <div className='profilePicContainer'>
        <img className='profilePicMask' src='/static/img/detailsProfileMask.png' />
        <img className='profilePicBg' src={`/static/img/avatarBg/right/${hexToName(primaryColor)}.png`} alt='bg' />
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
        <img className='profilePicMask' src='/static/img/detailsProfileMask.png' />
        <img className='profilePicBg' src={`/static/img/avatarBg/left/${hexToName(primaryColor)}.png`} alt='bg' />
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
            margin-top: 60px;
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
            font-family: Montserrat;
            font-size: 42px;
            font-weight: 900;
            letter-spacing: 2.63px;
            line-height: 40px;
          }

          .handle {
            position: absolute;
            font-family: Montserrat;
            font-size: 48px;
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
            font-size: 14px;
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
            font-size: 24px;
          }

          .countryFlag {
            height: 27px;
            width: auto;
            margin-right: 10px;
          }

          .key {
            color: #FFFFFF;
            font-family: Montserrat;
            font-size: 20px;
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

const OneOnOne = (props) => {
  return (
    <div className='container'>
      <div className='viewHolder'>
        <PageHead />
        <Header {...props} smallHeader />
        <main className='main'>
          <img className='hexa' src='/static/img/largeHexa.png' />
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='subtitle'>one on one</div>
            <div className='title'>challenge</div>
          </div>
          {detailLayout(props)}
        </main>
        <Sponsors {...props} smallerSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
        smallerDesign
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

const challenger = {
  profilePic: '/static/img/dummyWinner2.png',
  country: 'china',
  countryFlag: '/static/img/flag/china.png',
  rating: '3100',
  rank: '10',
  percentile: '40%',
  competitions: 227,
  volatility: 335,
  handle: 'tourist'
}

const challengee = {
  ...challenger,
  profilePic: '/static/img/dummyWinner3.png',
  countryFlag: '/static/img/flag/argentina.png',
  country: 'argentina',
  handle: 'Petr'
}

OneOnOne.getInitialProps = async function () {
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
    challengee,
    challenger
  }
}

export default OneOnOne

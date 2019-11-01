import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import { checkForMainSponsor, blobGen } from '../common/helper'

const card = (props, showBottomBg, finalist, i) => {
  if (finalist == null) {
    return (<div key={i} style={{ width: '164px', margin: '0px 20px' }} />)
  }
  const { primaryColor } = props
  const { handle, country, countryFlag, profilePic } = finalist
  return (
    <div key={i} className='card'>
      <img src={`/static/img/profile-blob/blob${blobGen(1, 9)}.svg`} className='profileBlob' />
      <img className='cardProfilePic' src={profilePic} alt='profile' />
      <div className='cardContent'>
        <div className='cardTitle' style={{ color: primaryColor }}>
          {handle}
        </div>
        <div className='cardSubtitle'>
          <img className='cardFlag' src={countryFlag} alt='flag' />
          {country}
        </div>
      </div>
      <style jsx>
        {`
          .card {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 160px;
            margin: 0px 15px;
          }

          .profileBlob {
            width: 260px;
            height: 250px;
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            z-index: 1;
          }

          .bottomBg {
            top: auto;
            bottom: -15%;
          }

          .cardProfilePic {
            width: 150px;
            height: 150px;
            z-index: 2;
            border-radius: 100%;
            position: absolute;
            left: 50%;
            top: 40px;
            transform: translateX(-50%);
          }

          .cardContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1;
            flex-grow: 1;
            margin-top: 200px;
          }

          .cardTitle {            
            font-family: 'Roboto', sans-serif;
            font-size: 1.25em;
            font-weight: 500;
            line-height: 22px;
            text-align: center;
            color: rgb(37, 152, 213);
            margin: 10px 0 5px;
          }

          .cardSubtitle {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFFFFF;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8125em;
            font-weight: 400;
            line-height: 14px;
            text-align: left;
            text-transform: uppercase;
            margin-top: 3px;
          }

          .cardFlag {
            width: 13px;
            height: autp;
            margin-right: 3px;
            margin-bottom: 1px;
          }
        `}
      </style>
    </div>
  )
}

const Finalists = (props) => {
  const { finalists } = props
  const splitIndex = (finalists.length / 2) + (finalists.length % 2)
  const rowOne = finalists.slice(0, splitIndex)
  const rowTwo = finalists.slice(splitIndex)
  if (finalists.length !== 2 && ((finalists.length % 2) === 1)) {
    rowTwo.push(null)
  }
  return (
    <div className='container'>
      <PageHead />
      <Header {...props} />
      <main className='main'>
        <div className='message'>
          <img src='/static/img/hexagon.png' alt='hex' />
          <div className='subtitle'>introducing</div>
          <div className='title'>Finalists</div>
        </div>
        <div className='rows'>
          <div className='cardConainer'>
            {rowOne.map(card.bind(this, props, false))}
          </div>
          <div className='cardConainer'>
            {rowTwo.map(card.bind(this, props, true))}
          </div>
        </div>
      </main>
      <Sponsors {...props} hideMainSponsor showFlatDesign />
      <Footer {...props} />
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
            flex-grow: 1;
            align-items: center;
            display: flex;
            flex-direction: column;
            min-height: 800px;
            position: relative;
          }

          .message {
            height: 100px;
            width: 100px;
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            text-transform: uppercase;
            position: relative;
            z-index: 4;
          }

          .message img {
            position: absolute;
          }

          .message .subtitle {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-family: 'Montserrat', sans-serif; 
            font-family: Montserrat;
            font-size: 1.5em;
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

          .rows {
            width: 100%;
            position: relative;
            z-index: 3;
            margin-top: -20px;
          }

          .cardConainer {
            display: flex;
            margin-top: 20px;
            width: 100%;
            justify-content: center;
            position: relative;
          }
          .cardConainer:first-child::before {
            content: '';
            display: block;
            width: 100%;
            height: calc(100% + 160px);
            top: -140px;
            position: absolute;
            background-image: linear-gradient(270deg, rgba(0, 78, 119, 0) 0%, #002765 51.72%, rgba(0, 40, 61, 0) 100%);
            z-index: 0;
          }
        `}
      </style>
    </div>
  )
}

Finalists.getInitialProps = async function ({ query }) {
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
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor,
    otherSponsors,
    finalists: finalists.finalists
  }
}

export default Finalists

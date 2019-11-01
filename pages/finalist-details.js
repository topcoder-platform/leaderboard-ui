import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import { hexToName, checkForMainSponsor, blobGen } from '../common/helper'

const getStatView = (key, value) => {
  return (
    <div key={key} className='container'>
      <div className='value'>{value}</div>
      <div className='key'>{key}</div>
      <style jsx>
        {`
          .container {
            min-width: 120px;
            max-width: 180px;
            margin-top: 20px;
          }

          .value {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-family: 'Barlow Condensed',sans-serif;
            font-size: 2.375em;
            font-weight: 500;
            letter-spacing: 2.63px;
            line-height: 40px;
            text-align: left;
          }

          .key {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.25em;
            font-weight: 400;
            letter-spacing: 1.25px;
            line-height: 40px;
            opacity: 0.4000000059604645;
            text-align: left;
            text-transform: uppercase;
          }
        `}
      </style>
    </div>
  )
}

const statsLayout = (stats) => {
  const keys = Object.keys(stats)
  const firstRow = keys.slice(0, 2)
  const secondRow = keys.slice(2)
  return (
    <div className='statsContainer'>
      <div className='row'>
        {firstRow.map(key => getStatView(key, stats[key]))}
      </div>
      <div className='row'>
        {secondRow.map(key => getStatView(key, stats[key]))}
      </div>
      <style jsx>
        {`
          .statsContainer {
            display: flex;
            justify-content: center;
          }

          .row {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0px 10px;
          }
        `}
      </style>
    </div>
  )
}

const badgeLayout = (badges) => {
  return (
    <div className='container'>
      <div>
        {badges.slice(0, 3).map(badge => (<img key={badge} src={badge} />))}
      </div>
      <div>
        {badges.slice(3).map(badge => (<img key={badge} src={badge} />))}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          img {
            margin: 10px;
            height: 57px;
            max-width: 52px;
          }
        `}
      </style>
    </div>
  )
}

const finalistsList = (props, finalists) => {
  const { primaryColor } = props
  return (
    <div className='container'>
      {(finalists.map((data, i) => (
        <div key={i} className='card' style={{ opacity: (data.isActive ? '1' : '0.3'), filter: (data.isActive ? 'grayscale(0%)' : 'grayscale(100%)') }}>
          <img className='profilePic' src={data.profilePic} />
          <img src={`/static/img/profile-blob/blob${blobGen(1, 9)}.svg`} className='profileBlob' />
          <div className='handle' style={{ color: primaryColor }}>
            <span>
              {data.handle}
            </span>
          </div>
          <div className='countryDetails'>
            <span className='countryName' />
            <img className='countryFlag' src={data.countryFlag} />
          </div>
        </div>
      )))}
      <style jsx>
        {`
          .container {
            display: flex;
            position: relative;
            flex-wrap: wrap
          }

          .card {
            width: 90px;
            height: 90px;
            margin: 3px;
            position: relative;
            z-index: 1;
            zoom: 0.7;
            margin: 0 15px;
          }
          
          .cardHexagonBackground {
            width: 70%;
            position: absolute;
            left: 15%;
            bottom: -15%;
            z-index: -1;
          }

          .profilePic {
            width: 90px;
            height: 90px;
            border-radius: 100%;
          }

          .profileBlob {
            width: 148px;
            height: 148px;
            position: absolute;
            left: -28px;
            top: -23px;
            z-index: -1;
          }

          .countryDetails {
            display: flex;
          }

          .borderOverlay {
            position: absolute;
            width: 92px;
            height: 116px;      
            left: 0px;
            top: 0;
            border-style: solid;
            border-width: 4px 4px 0px 4px;
            border-color: #025f907d;
            opacity: 0.4;
          }

          .handle {
            width: 100%;
            font-family: Roboto;
            font-size: 0.8125em;
            font-weight: 500;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 5px;
          }

          span {
            padding-top: 5px;
            display: block;
            text-align: center;
          }
          
          .countryFlag {
            display: flex;
            margin: auto;
            height: 24px;
            width: 22px;
          }

          @media only screen and (min-width:1400px){
            .card {
              zoom: 0.8;
            }
          }
          
          @media only screen and (min-width:1600px){
            .card {
              zoom: 0.9;
              margin: 10px;
            }
          }

          @media only screen and (min-width:1920px){
            .card {
              zoom: 1;
              margin: 15px;
            }
          }
        `}
      </style>
    </div>
  )
}

const FinalistsDetails = (props) => {
  const { finalists, finalistDetails, primaryColor } = props
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
        {finalistDetails && <div className='detailsContainer'>
          <div className='profilePicContainer'>
            <img className='profilePicMask' src={`/static/img/avatarBg/profile-mask-${hexToName(primaryColor)}.svg`} alt='bg' />
            <span className='oval-shape' />
            <img className='profilePic' src={finalistDetails.profilePic} />
          </div>
          <div className='nameContainer'>
            <div className='handle' style={{ color: primaryColor }}>
              {finalistDetails.handle}
            </div>
            <div className='fullname'>
              {finalistDetails.fullName}
            </div>
            <div className='countryDetails'>
              <img className='countryFlag' src={finalistDetails.countryFlag} />
              {finalistDetails.country}
            </div>
          </div>
          <img className='divider' src='/static/img/verticalDivider.png' />
          {statsLayout(finalistDetails.stats)}
          <img className='divider' src='/static/img/verticalDivider.png' />
          {badgeLayout(finalistDetails.badges)}
        </div>}
        <div className='finalist-bottom-container'>
          <div className='finalist-wrapper'>
            {finalistsList(props, finalists)}
          </div>
          <Sponsors {...props} hideMainSponsor showFlatDesign />
        </div>
      </main>
      <Footer {...props} />
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: auto;
            overflow-x: hidden;
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
            height: auto;
            flex-shrink: 0;
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
          }

          .message img {
            position: absolute;
          }

          .message .subtitle {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-family: 'Montserrat', sans-serif;  
            font-size: 1.5em;
            font-weight: 400;
            line-height: 29px;
            opacity: 0.6;
            text-align: center;
          }

          .message .title {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-family: 'Montserrat', sans-serif;  
            font-size: 2.375em;
            font-weight: 700;
            line-height: 46px;
            text-align: center;
            margin-top: -5px;
          }

          .detailsContainer {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            flex-grow: 1;
          }

          .profilePicContainer {
            width: 230px;
            height: 322px;
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
            bottom: -20px;
            left: 60px;
          }

          .profilePic {
            z-index: 1;
            margin-left: 52px;
          }

          .nameContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 90px;
          }

          .handle {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #5CC900;
            font-family: 'Barlow Condensed',sans-serif;
            font-size: 2.625em;
            font-weight: 700;
            text-align: left;
          }

          .fullname {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.5em;
            font-weight: 500;
            text-align: left;
            margin-top: 6px;
          }

          .countryDetails {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.25em;
            font-weight: 300;
            text-transform: uppercase;
            text-align: left;
            margin-top: 6px;
            display: flex;
            align-items: center;
          }

          .countryFlag {
            margin-right: 10px;
            width: 16px;
          }

          .divider {
            margin: 0 30px;
          }

          .finalist-bottom-container {
            display: flex;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.15);
            width: 100%;
            flex-grow: 1;
            position: relative;
            height: 295px;
          }

          .finalist-bottom-container::before {
            content: "";
            height: 11px;
            left: 0;
            bottom: -11px;
            background-color: rgba(0, 0, 0, 0.15);
            position: absolute;
            width: 100%;
          }

          .finalist-wrapper {
            flex-grow: 1;
            margin: 30px auto 0 auto;
          }
        `}
      </style>
    </div>
  )
}

FinalistsDetails.getInitialProps = async function ({ query }) {
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
    eventStartDateTime: header.eventStartDateTime,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor,
    otherSponsors,
    finalists: finalists.finalists,
    finalistDetails: data.fields.finalistDetails
  }
}

export default FinalistsDetails

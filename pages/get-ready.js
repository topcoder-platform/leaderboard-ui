import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

const rowSize = {
  7: [2, 3, 2],
  9: [2, 3, 4],
  10: [3, 4, 3],
  11: [4, 3, 4],
  12: [3, 4, 5],
  13: [4, 5, 4],
  14: [5, 4, 5],
  16: [5, 6, 5]
}

const cardLayout = (profile, primaryColor, position) => {
  const { handle, countryFlag, profilePic } = profile
  return (
    <div key={position} className='container' style={{ opacity: (profile.hasOwnProperty('points')) ? 0.4 : 1 }}>
      <img src={profilePic} />
      <img className={'cardHexagonBackground'} src='/static/img/miniHexa.png' alt='hexa' />
      <div className='overlay' />
      <div className='handle' style={{ color: primaryColor }}>
        <span>
          {handle}
        </span>
      </div>
      <img className='countryFlag' src={countryFlag} />
      <style jsx>
        {`
          .container {
            width: 101px;
            height: 162px;
            position: relative;
            margin: 0 10px;
            box-shadow: inset 0 7px 9px 0 rgba(0, 0, 0, 0.5);
            z-index: 1;
          }

          img {
            width: 100%;
            height: 120px;
          }

          .overlay {
            position: absolute;
            height: calc(100% - 80px);
            width: calc(100% - 14px);
            left: 0px;
            top: 0px;
            border-style: solid;
            border-width: 7px 7px 0px 7px;
            border-color: #025f907d;
            border: 7px 0px 0px 0px solid #123123;
            z-index: 1;
            opacity: 0.4;
          }

          .handle {
            margin-top: -4px;
            width: 100%;
            height: 42px;
            text-align: center;
            background-image: linear-gradient(228.85deg, #002A41 0%, #004E77 100%);
            font-family: Montserrat;
            font-size: 11px;
            font-weight: 700;
            text-align: center;
          }

          span {
            padding-top: 5px;
            display: block;
            text-align: center;
          }

          .countryFlag {
            width: 21px;
            height: auto;
            position: absolute;
            bottom: -10px;
            left: 41%;
          }

          .cardHexagonBackground {
            width: 70%;
            height: auto;
            position: absolute;
            left: 15%;
            bottom: -18%;
            z-index: -1;
          }

          .count {
            width: 37px;
            height: 40px;
            color: #D1DDE4;
            font-family: Montserrat;
            font-size: 18px;
            font-weight: 900;
            line-height: 40px;
            text-align: center;
            position: absolute;
            left: -20px;
            top: 40%;
            z-index: 1;
          }

          .countbadge {
            width: 100%;
            height: auto;
            position: absolute;
            left: 0;
            z-index: -1;
          }
          
          @media only screen and (min-width:1600px){
            .container {
              margin: 0px 20px;
            }
          }
        `}
      </style>
    </div>
  )
}

const finalistsLayout = (props) => {
  const { primaryColor, finalists } = props
  const rows = rowSize[finalists.length]
  const row1 = finalists.slice(0, rows[0])
  const row2 = finalists.slice(rows[0], rows[0] + rows[1])
  const row3 = finalists.slice(rows[0] + rows[1])
  return (
    <div className='container'>
      <div className='rowsContainer'>
        <div className='row'>
          {row1.map((profile, i) => cardLayout(profile, primaryColor, i))}
        </div>
        <div className='row'>
          {row2.map((profile, i) => cardLayout(profile, primaryColor, i))}
        </div>
        <div className='row'>
          {row3.map((profile, i) => cardLayout(profile, primaryColor, i))}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          .rowsContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
          }

          .row {
            display: flex;
            margin: 20px 0px;
          }
        `}
      </style>
    </div>
  )
}

const GetReady = (props) => {
  return (
    <div className='container'>
      <div className='viewHolder'>
        <PageHead />
        <Header {...props} smallHeader />
        <main className='main'>
          <img className='hexa' src='/static/img/largeHexa.png' />
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='subtitle'>players</div>
            <div className='title'>GET READY!</div>
          </div>
          {finalistsLayout(props)}
        </main>
        <Sponsors {...props} smallerSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
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
            width: 100%;
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
          }

          .hexa {
            position: absolute;
            width: 550px;
          }

          .message {
            height: 100px;
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

GetReady.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const otherSponsors = data.fields.otherSponsors.map(s => s.fields.file.url)

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
    finalists: data.fields.finalists,
    eventEndDateTime: data.fields.eventEndsIn
  }
}

export default GetReady

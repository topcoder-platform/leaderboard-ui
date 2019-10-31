import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import { hexToName, checkForMainSponsor } from '../common/helper'

const rowSize = {
  5: [2, 1, 2],
  7: [2, 3, 2],
  8: [3, 2, 3],
  9: [2, 3, 4],
  10: [3, 4, 3],
  11: [4, 3, 4],
  12: [3, 4, 5],
  13: [4, 5, 4],
  14: [5, 4, 5],
  16: [5, 6, 5]
}

const cardLayout = (profile, primaryColor, position, length) => {
  const { handle, countryFlag, profilePic } = profile
  return (
    <div key={position} className='container' style={{ opacity: (position <= length) ? 0.4 : 1 }}>
      <img src={profilePic} />
      <img className={'cardHexagonBackground'} src='/static/img/miniHexa.png' alt='hexa' />
      <div className='overlay' />
      <div className='handle' style={{ color: primaryColor }}>
        <span>
          {handle}
        </span>
      </div>
      <img className='countryFlag' src={countryFlag} />
      <div className='count'>
        <img className='countbadge' src='/static/img/countBadge.png' />
        {position}
      </div>
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

const otherSponsorsLayout = (sponsors) => {
  return (
    <div className='container'>
      {sponsors.map((sponsor, i) => (<img key={`${sponsor}${i}`} className='otherSponsor' src={sponsor} />))}
      <style jsx>
        {`
          .container {
            height: 52px;
            display: flex;
            align-items: center;
          }
          .otherSponsor {
            margin: 0px 10px;
            height: 28px;
          }
        `}
      </style>
    </div>
  )
}

const finalistsLayout = (profiles, props) => {
  const { primaryColor, finalists, prizes } = props
  const rows = rowSize[profiles.length]
  const row1 = profiles.slice(0, rows[0])
  const row2 = profiles.slice(rows[0], rows[0] + rows[1])
  const row3 = profiles.slice(rows[0] + rows[1])
  return (
    <div className='container'>
      <div className='rowsContainer'>
        <div className='row'>
          {row1.map(profile => cardLayout(profile, primaryColor, finalists.indexOf(profile) + 1, prizes.length))}
        </div>
        <div className='row'>
          {row2.map(profile => cardLayout(profile, primaryColor, finalists.indexOf(profile) + 1, prizes.length))}
        </div>
        <div className='row'>
          {row3.map(profile => cardLayout(profile, primaryColor, finalists.indexOf(profile) + 1, prizes.length))}
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

const prizesLayout = (props, showWinners) => {
  const { finalists, prizes, primaryColor, winnersImages } = props
  return (
    <div className={'container ' + (showWinners && 'containerWithZoom')}>
      <div className='small'>
        <img src='/static/img/silverTrophy.png' />
        <div className='money'>
          ${prizes[1]}
        </div>
        {showWinners && <div>
          <img className='smallBg' src={`/static/img/avatarBg/right/${hexToName(primaryColor)}.png`} />
          <img className='smallPic' src={winnersImages[1]} />
          <img className='smallMask' src='/static/img/detailsProfileMask.png' />
          <div className='handle' style={{ color: primaryColor }}>
            {finalists[1].handle}
          </div>
          <div className='country'>
            <img className='countryFlag' src={finalists[1].countryFlag} />
            {finalists[1].country}
          </div>
        </div>}
      </div>
      <div className='large' style={{
        marginBottom: ((prizes.length === 2) ? '60px' : (showWinners ? '60px' : '120px')),
        marginLeft: (showWinners) ? '110px' : '60px',
        marginRight: (showWinners) ? '110px' : '60px'
      }}>
        <img src='/static/img/goldTrophy.png' />
        <div className='money'>
          ${prizes[0]}
        </div>
        {showWinners && <div>
          <img className='largeBg' src={`/static/img/avatarBg/left/${hexToName(primaryColor)}.png`} />
          <img className='spark' src='/static/img/spark.png' />
          <img className='largePic' src={winnersImages[0]} />
          <img className='largeMask flipLarge' src='/static/img/detailsProfileMask.png' />
          <div className='handle' style={{ color: primaryColor }}>
            {finalists[0].handle}
          </div>
          <div className='country'>
            <img className='countryFlag' src={finalists[0].countryFlag} />
            {finalists[0].country}
          </div>
        </div>}
      </div>
      { (prizes.length === 3) && <div className='small'>
        <img src='/static/img/bronzeTrophy.png' />
        <div className='money'>
          ${prizes[2]}
        </div>
        {showWinners && <div>
          <img className='smallBg' src={`/static/img/avatarBg/left/${hexToName(primaryColor)}.png`} />
          <img className='smallPic' src={winnersImages[2]} />
          <img className='smallMask flip' src='/static/img/detailsProfileMask.png' />
          <div className='handle' style={{ color: primaryColor }}>
            {finalists[2].handle}
          </div>
          <div className='country'>
            <img className='countryFlag' src={finalists[2].countryFlag} />
            {finalists[2].country}
          </div>
        </div>}
      </div>}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-grow: 1;
            margin-bottom: 40px;
            align-items: baseline;
            margin-top: 200px;
          }

          .containerWithZoom {
            zoom: 0.8;
            margin-top: 270px;
            background: linear-gradient(270deg, rgba(0, 78, 119, 0) 0%, #00416580 51.72%, rgba(0, 40, 61, 0) 100%);
          }

          img {
            width: 100%;
            z-index: 3;
          }

          .small {
            width: 160px;
            position: relative;
            color: #EEF4F5;
            font-size: 24px;
            margin-bottom: 50px;
            z-index: 1;
          }

          .smallPic {
            position: absolute;
            z-index: -1;
            top: -103%;
            left: 0px;
            height: 250px;
            width: auto;
          }

          .spark {
            position: absolute;
            z-index: -2;
            left: -11px;
            top: -103%;
          }

          .largePic {
            position: absolute;
            z-index: -1;
            top: -97%;
            left: 10px;
            height: 300px;
            width: auto;
          }

          .smallBg {
            position: absolute;
            z-index: -2;
            width: 126%;
            top: -127px;
            left: -31px;
          }

          .large {
            width: 220px;
            color: #FFBA3A;
            font-size: 38px;
            position: relative;
            z-index: 1;
            margin: 0px 60px;
          }

          .largeBg {
            position: absolute;
            z-index: -2;
            width: 120%;
            top: -70%;
            left: -14%;
          }

          .smallMask {
            position: absolute;
            z-index: -3;
            left: -53px;
            width: 150%;
            top: -127px;
          }

          .largeMask {
            position: absolute;
            z-index: -3;
            top: -72%;
            left: -27%;
            width: 145%;
          }

          .flip {
            left: -48px;
            transform: scaleX(-1);
          }

          .flipLarge {
            transform: scaleX(-1);
          }

          .money {
            font-family: Montserrat;
            font-weight: 700;
            text-align: center;
            position: absolute;
            bottom: 10%;
            display: block;
            width: 100%;
          }

          .handle {
            position: absolute;
            font-family: Montserrat;
            font-size: 26px;
            font-weight: 900;
            line-height: 31px;
            left: 0px;
            text-align: center;
            width: 100%;
            bottom: -25px;
            text-transform: capitalize;
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
          }

          .countryFlag {
            width: 19px;
            height: auto;
            margin-right: 10px;
          }

          @media only screen and (min-width:1610px){
            .containerWithZoom {
              zoom: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

const WinnersLayout = (props) => {
  const { finalists, showWinners, otherSponsors, mainSponsor, prizes } = props
  const profiles = (showWinners) ? finalists.slice(prizes.length) : finalists
  return (
    <div className='container'>
      <PageHead />
      <Header {...props} />
      <main className='main'>
        <div className='prizeContainer'>
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='title'>Finalists</div>
          </div>
          {prizesLayout(props, showWinners)}
        </div>
        {finalistsLayout(profiles, props)}
      </main>
      <div className='sponsorContainer'>
        <div className='sponsorhalf'>
          {otherSponsorsLayout(otherSponsors)}
        </div>
        <div className='sponsorhalf'>
          <img className='sponsorImg' src={mainSponsor} />
        </div>
      </div>
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
            display: flex;
            flex-shrink: 0;
            justify-content: space-evenly;
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

          .prizeContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .sponsorContainer {
            display: flex;
            margin: 20px 0px;
          }

          .sponsorhalf {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            flex-basis: 0;
            align-items: center;
          }

          .sponsorImg {
            width: 250px;
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

class Winners extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showWinners: false
    }
  }

  componentDidMount () {
    setTimeout(this.toggleWinners.bind(this), 10000)
  }

  toggleWinners () {
    this.setState({ showWinners: !this.state.showWinners })
  }

  render () {
    return (
      <WinnersLayout
        {...this.props}
        showWinners={this.state.showWinners}
      />
    )
  }
}

Winners.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const header = data.fields.header.fields

  const sponsor = data.fields.sponsor.fields

  const footer = data.fields.footer.fields

  const finalists = data.fields.finalists.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  const winnersImages = data.fields.winnerImages.fields.winners.map(w => w.fields.file.url)

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
    finalists: finalists.finalists,
    winnersImages,
    prizes: data.fields.prizes
  }
}

export default Winners

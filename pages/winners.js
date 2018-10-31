import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'

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
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            margin-bottom: 40px;
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
  const { finalists, prizes, primaryColor, winnersImage } = props
  return (
    <div className={'container ' + (showWinners && 'containerWithZoom')}>
      <div className='small'>
        <img src='/static/img/silverTrophy.png' />
        <div className='money'>
          ${prizes[1]}
        </div>
        {showWinners && <div>
          <img className='smallBg' src='/static/img/winnerBg1.png' />
          <img className='smallPic' src={winnersImage[1]} />
          <div className='handle' style={{ color: primaryColor }}>
            {finalists[1].handle}
          </div>
          <div className='country'>
            <img className='countryFlag' src={finalists[1].countryFlag} />
            {finalists[1].country}
          </div>
        </div>}
      </div>
      <div className='large' style={{ marginBottom: ((prizes.length === 2) ? '60px' : (showWinners ? '60px' : '120px')) }}>
        <img src='/static/img/goldTrophy.png' />
        <div className='money'>
          ${prizes[0]}
        </div>
        {showWinners && <div>
          <img className='largeBg' src='/static/img/winnerBg2.png' />
          <img className='largePic' src={winnersImage[0]} />
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
          <img className='smallBg' src='/static/img/winnerBg1.png' />
          <img className='smallPic' src={winnersImage[2]} />
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
            background: linear-gradient(270deg, rgba(0, 78, 119, 0) 0%, #00416580 51.72%, rgba(0, 40, 61, 0) 100%);
            margin-bottom: 40px;
            align-items: baseline;
            margin-top: 200px;
          }

          .containerWithZoom {
            zoom: 0.8;
            margin-top: 270px;
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

          .largePic {
            position: absolute;
            z-index: -1;
            top: -97%;
            left: 10px;
            height: 300px;
            width: auto;
          }

          .smallBg {
            width: 160%;
            position: absolute;
            left: -33%;
            z-index: -2;
            top: -58%;
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
            width: 130%;
            position: absolute;
            left: -15%;
            z-index: -2;
            top: -92%;
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

          @media only screen and (min-width:1600px){
            .containerWithZoom {
              zoom: 1;
              min-height: 650px;
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
            <div className='subtitle'>introducing</div>
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
            background: url('/static/img/background.png') no-repeat center center fixed;
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
            margin-top: 20px;
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

const finalists = []
for (let i = 0; i < 16; i++) {
  finalists.push({
    handle: (i % 2) ? 'deedee' : 'tuxing',
    country: (i % 2) ? 'argentina' : 'italy',
    profilePic: (i % 2) ? '/static/img/profilePic1.png' : '/static/img/profilePic2.png',
    countryFlag: (i % 2) ? '/static/img/flag/argentina.png' : '/static/img/flag/italy.png'
  })
}

Winners.getInitialProps = async function () {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/content/CONTENTFUL_MESSAGE_ENTRY_ID`)

  const data = await res.json()

  const otherSponsors = data.fields.otherSponsors.map(s => s.fields.file.url)

  return {
    logo: data.fields.logo.fields.file.url,
    primaryColor: data.fields.primaryColor,
    track: data.fields.track,
    round: data.fields.round,
    eventStartDateTime: data.fields.eventStartDateTime,
    message: data.fields.message,
    tickerType: data.fields.tickerType.fields.file.url,
    tickerSeparator: data.fields.tickerSeparator.fields.file.url,
    tickerMessages: data.fields.tickerMessages,
    mainSponsor: data.fields.mainSponsor.fields.file.url,
    otherSponsors,
    finalists,
    winnersImage: ['/static/img/dummyWinner1.png', '/static/img/dummyWinner2.png', '/static/img/dummyWinner3.png'],
    prizes: ['5000', '2000', '1000']
  }
}

export default Winners

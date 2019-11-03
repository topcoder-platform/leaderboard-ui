import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import { checkForMainSponsor } from '../common/helper'

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
      <img className={`blob blob-${position % 12 + 1}`} src={`/static/img/blob/blob${position % 12 + 1}.svg`} />
      <div style={{ backgroundImage: `url('${profilePic}')` }} className='avatar' />
      <div className='handle' style={{ color: primaryColor }}>
        <span>
          {handle}
        </span>
      </div>
      <div className='countryFlagContainer'>
        <img className='countryFlag' src={countryFlag} />
        <span>{profile.country}</span>
      </div>
      <style jsx>
        {`
          .container {
            width: 138px;
            height: 183px;
            position: relative;
            margin: 0 10px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Roboto;
          }

          .blob {
            position: absolute;
            z-index: -1;
          }

          .blob-1 {
            top: -23px;
            left: -29px;
          }

          .blob-2 {
            top: -25px;
            left: -22px;
          }

          .blob-3 {
            top: -23px;
            left: -29px;
          }

          .blob-4 {
            top: -20px;
            left: -29px;
          }

          .blob-5 {
            top: -28px;
            left: -26px;
          }

          .blob-6 {
            top: -28px;
            left: -23px;
          }

          .blob-7 {
            top: -23px;
            left: -29px;
          }

          .blob-8 {
            top: -33px;
            left: -23px;
          }

          .blob-9 {
            top: -26px;
            left: -29px;
          }

          .blob-10 {
            top: -26px;
            left: -20px;
          }

          .blob-11 {
            top: -23px;
            left: -29px;
          }

          .blob-12 {
            top: -23px;
            left: -29px;
          }

          .blob-13 {
            top: -27px;
            left: -24px;
          }

          .blob-14 {
            top: -23px;
            left: -29px;
          }

          .avatar {
            width: 116px;
            height: 116px;
            border-radius: 50%;
            background-size: 136.5px 163.1px;
            background-position: 50% -10px;
            background-repeat: no-repeat;
            margin-top: 10px;
          }

          .handle {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            line-height: 19px;
            margin-top: auto;
            margin-bottom 6px;
          }

          span {
            display: block;
            text-align: center;
          }

          .countryFlagContainer {
            margin-bottom: 0;
            display: flex;
            font-size: 12px;
            color: white;
            text-transform: uppercase;
          }

          .countryFlag {
            width: 12px;
            height: auto;
            margin-right: 3px;
          }

          @media only screen and (min-width:1600px){
            .container {
              margin: 0px 16px;
            }

            .container:last-child {
              margin-right: 0;
            }

            .container:first-child {
              margin-left: 0;
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
            margin: 0px 30px;
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
            flex: 1;
            align-items: flex-end;
            padding: 0 66px;
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
    <div
      className={'container ' + (showWinners && 'containerWithZoom')}
      style={{
        alignItems: (showWinners) ? 'flex-end' : 'flex-start'
      }}
    >
      <div
        className='small'
        style={{
          marginTop: (showWinners) ? '' : '40px'
        }}
      >
        <img src='/static/img/silverTrophy.png' />
        <div className='money'>
          ${prizes[1]}
        </div>
        {showWinners && <div>
          <img className='smallBg smallBg2Place' src={`/static/img/blob/blob-2-place.png`} />
          <div className='smallPicContainer smallPicContainer2Place'>
            <img className='smallPic' src={winnersImages[1]} />
          </div>
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
        marginTop: (showWinners) ? '' : '-30px',
        marginLeft: (showWinners) ? '110px' : '60px',
        marginRight: (showWinners) ? '110px' : '60px'
      }}>
        <img src='/static/img/goldTrophy.png' />
        <div className='money money1Place'>
          ${prizes[0]}
        </div>
        {showWinners && <div>
          <img className='largeBg' src={`/static/img/blob/blob-1-place.png`} />
          <img className='spark' src='/static/img/spark.png' />
          <div className='largePicContainer'>
            <img className='largePic' src={winnersImages[0]} />
          </div>
          <div className='handle' style={{ color: primaryColor }}>
            {finalists[0].handle}
          </div>
          <div className='country'>
            <img className='countryFlag' src={finalists[0].countryFlag} />
            {finalists[0].country}
          </div>
        </div>}
      </div>
      { (prizes.length === 3) && <div className='small' style={{
        marginTop: (showWinners) ? '' : '40px'
      }}>
        <img src='/static/img/bronzeTrophy.png' />
        <div className='money'>
          ${prizes[2]}
        </div>
        {showWinners && <div>
          <img className='smallBg smallBg3Place' src={`/static/img/blob/blob-3-place.png`} />
          <div className='smallPicContainer smallPicContainer3Place'>
            <img className='smallPic' src={winnersImages[2]} />
          </div>
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
            margin-bottom: 40px;
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
            z-index: 1;
          }

          .smallPicContainer {
            z-index: -1;
            left: 0px;
            top: -178px;
            position: absolute;
            overflow: hidden;
          }

          .smallPicContainer3Place {
            border-bottom-right-radius: 40px;
            border-bottom-left-radius: 80px;
          }

          .smallPicContainer2Place {
            left: 13px;
            border-bottom-left-radius: 28px;
            border-bottom-right-radius: 80px;
          }

          .smallPic {
            height: 250px;
            width: auto;
            margin-bottom: -10px;
          }

          .spark {
            position: absolute;
            z-index: -2;
            left: -11px;
            top: -103%;
          }

          .largePicContainer {
            position: absolute;
            z-index: -1;
            top: -219px;
            left: 10px;
            position: absolute;
            overflow: hidden;
            border-bottom-right-radius: 91px;
            border-bottom-left-radius: 82px;
          }

          .largePic {
            height: 300px;
            width: auto;
            margin-bottom: -10px;
          }

          .smallBg {
            position: absolute;
            z-index: -2;
            width: 133%;
          }

          .smallBg2Place {
            top: -88px;
            left: -27px;
          }

          .smallBg3Place {
            top: -93px;
            left: -29px;
          }

          .large {
            width: 220px;
            color: #FFBA3A;
            position: relative;
            z-index: 1;
            margin: 0px 60px;
          }

          .largeBg {
            position: absolute;
            z-index: -2;
            width: 120%;
            top: -157px;
            left: -14%;
          }

          .flip {
            left: -48px;
            transform: scaleX(-1);
          }

          .money {
            font-family: Roboto;
            font-weight: 400;
            text-align: center;
            position: absolute;
            bottom: 10%;
            display: block;
            width: 100%;
            font-size: 38px;
            margin-bottom: -6%;
          }

          .money1Place {
            font-size: 54px;
          }

          .containerWithZoom .money {
            margin-bottom: 0;
            font-size: 24px;
          }

          .containerWithZoom .money1Place {
            font-size: 42px;
          }

          .handle {
            position: absolute;
            font-family: 'Barlow Condensed',sans-serif;
            font-size: 24px;
            font-weight: 500;
            line-height: 31px;
            left: 0px;
            text-align: center;
            width: 100%;
            bottom: -25px;
            text-transform: capitalize;
          }

          .country {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 15px;
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
            <div className='subtitle'>ANNOuncing</div>
            <div className='title'>WINNERS</div>
          </div>
          {prizesLayout(props, showWinners)}
        </div>
        {finalistsLayout(profiles, props)}
      </main>
      <div className='sponsorContainer'>
        <img className='sponsorContainerSeparator' src='/static/img/footerSeparator.png' alt='separator' />
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
            background: url("/static/img/background.png") no-repeat center 0 fixed;
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
            font-family: 'Barlow', sans-serif;
            font-weight: 400;
          }

          .message img {
            position: absolute;
          }

          .message .subtitle {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-size: 24px;
            line-height: 29px;
            opacity: 0.6;
            text-align: center;
            margin-bottom: 5px;
          }

          .message .title {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #FFFFFF;
            font-size: 38px;
            line-height: 46px;
            text-align: center;
            margin-top: -10px;
          }

          .prizeContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            margin-left: 70px;
          }

          .sponsorContainer {
            display: flex;
            padding: 30px 0px;
            background: rgba(0, 0, 0, 0.15);
            position: relative;
          }

          .sponsorContainerSeparator {
            position: absolute;
            top: 0;
            width: 50%;
            left: 50%;
            margin-left: -25%;
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

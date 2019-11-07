import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'

const cardLayout = (profile, primaryColor, position) => {
  const { handle, profilePic } = profile
  return (
    <div key={position} className='container'>
      <img className={`blob blob-${position % 12 + 1}`} src={`/static/img/blob/blob${position % 12 + 1}.svg`} />
      <div style={{ backgroundImage: `url('${profilePic}')` }} className='avatar' />
      <div className='handle' style={{ color: primaryColor }}>
        <span>
          {handle}
        </span>
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
            margin-right: 39px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Roboto;
          }

          .blob {
            position: absolute;
            z-index: -1;
            transform: scale(0.84) translate(-24px,-24px);
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
            width: 98px;
            height: 98px;
            border-radius: 50%;
            background-size: 116px 139px;
            background-position: 50% -15px;
            background-repeat: no-repeat;
            margin-top: 0;
          }

          .handle {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            line-height: 19px;
            margin-top: 15px;
            margin-bottom 0;
          }

          span {
            display: block;
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}

const finalistsLayout = (props) => {
  const { primaryColor, tracks, flag } = props
  return (
    <div className='container'>
      <div className='flag-container'>
        <img className='flag' width='613' src={flag} alt='flag' />
        <img className='divider' src='/static/img/verticalDivider.png' />
      </div>
      <div className='rowsContainer'>
        {tracks.map((track, index) => (
          <div key={index} className='oneRowContainer'>
            <span className='rowTitle'>{track.name} FINALISTS</span>
            <div className='row'>
              {track.profiles.map((profile, profileIndex) => cardLayout(profile, primaryColor, profileIndex + 1))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex: 1;
            align-items: flex-start;
            margin-top: 42px;
          }
          .divider {
            height: 100%;
            max-height: 611px;
            width: 2px;
          }
          .flag-container {
            display: flex;
            width: 775px;
            height: 100%;
            justify-content: flex-end;
            align-items: flex-start;
          }
          .flag {
            margin-top: 105px;
            margin-right: 43px;
          }
          .rowsContainer {
            display: flex;
            align-items: flex-start;
            flex: 1;
            flex-wrap: wrap;
          }
          .oneRowContainer {
            display: flex;
            margin-left: 49px;
            flex-direction: column;
            margin-bottom: 27px;
            margin-right: 12px;
            flex: 1;
            min-width: 548px;
          }
          .row {
            display: flex;
          }
          .rowTitle {
            font-size: 21px;
            font-family: 'Barlow Condensed',sans-serif;
            font-weight: 700;
            line-height: 60px;
            color: #C4E9FF;
            text-transform: uppercase;
          }
        `}
      </style>
    </div>
  )
}

const FinalistsLayout = (props) => {
  const { country } = props
  return (
    <div className='container'>
      <PageHead />
      <Header {...props} />
      <main className='main'>
        <div className='pageTitleContainer'>
          <div className='message'>
            <img src='/static/img/hexagon.png' alt='hex' />
            <div className='subtitle'>Representing</div>
            <div className='title'>{country}</div>
          </div>
        </div>
        {finalistsLayout(props)}
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
            background: url("/static/img/background.png") no-repeat center 0 fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }

          .main {
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .message {
            height: 139px;
            display: flex;
            position: relative;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
            white-space: nowrap;
          }

          .pageTitleContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
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
        `}
      </style>
    </div>
  )
}

class FinalistsPerCountries extends React.Component {
  render () {
    return (
      <FinalistsLayout
        {...this.props}
      />
    )
  }
}

FinalistsPerCountries.getInitialProps = async function () {
  const data = await import('../static/json/finalists-per-countries.json')

  const header = data.fields.header.fields
  const footer = data.fields.footer.fields

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    tickerMessages: footer.tickerMessages,
    tracks: data.tracks,
    flag: data.flag,
    country: data.country
  }
}

export default FinalistsPerCountries

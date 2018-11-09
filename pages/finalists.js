import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'

const card = (props, showBottomBg, finalist, i) => {
  if (finalist == null) {
    return (<div key={i} style={{ width: '164px', margin: '0px 20px' }} />)
  }
  const { primaryColor } = props
  const { handle, country, countryFlag, profilePic } = finalist
  const hexaClassname = (showBottomBg) ? 'bottomBg' : ''
  return (
    <div key={i} className='card'>
      <img className={'cardHexagonBackground ' + hexaClassname} src='/static/img/miniHexa.png' alt='hexa' />
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
      <div className='maskLayer' />
      <style jsx>
        {`
          .card {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 164px;
            margin: 0px 15px;
            box-shadow: 0px 3px 10px 0px #0000008f;
          }

          .cardHexagonBackground {
            width: 70%;
            position: absolute;
            left: 15%;
            top: -15%;
          }

          .bottomBg {
            top: auto;
            bottom: -15%;
          }

          .cardProfilePic {
            width: 100%;
            height: auto;
            z-index: 1;
          }

          .cardContent {
            height: 71.34px;
            background-image: linear-gradient(228.85deg, #002A41 0%, #004E77 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1;
            flex-grow: 1;
          }

          .cardTitle {
            font-family: Helvetica;
            font-size: 18px;
            font-weight: 700;
            line-height: 22px;
            text-align: center;
            color: rgb(37, 152, 213);
          }

          .cardSubtitle {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #FFFFFF;
            font-family: Helvetica;
            font-size: 13px;
            font-weight: 200;
            line-height: 14px;
            text-align: left;
            text-transform: uppercase;
            margin-top: 3px;
          }

          .maskLayer {
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
      <Sponsors {...props} showFlatDesign />
      <Footer {...props} />
      <style jsx>
        {`
          .container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: auto;
            background: url('/static/img/backgroundWithBlur.png') no-repeat center center fixed;
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

          .rows {
            width: 100%;
          }

          .cardConainer {
            display: flex;
            margin-top: 30px;
            width: 100%;
            justify-content: center;
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

Finalists.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const header = data.fields.header.fields

  const sponsor = data.fields.sponsor.fields

  const footer = data.fields.footer.fields

  const finalists = data.fields.finalists.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor: sponsor.primarySponsor.fields.file.url,
    otherSponsors,
    finalists: finalists.finalists
  }
}

export default Finalists

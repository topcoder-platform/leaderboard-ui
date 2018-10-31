import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'

const getStatView = (key, value) => {
  return (
    <div className='container'>
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
            font-family: Montserrat;
            font-size: 42px;
            font-weight: 900;
            letter-spacing: 2.63px;
            line-height: 40px;
            text-align: left;
          }

          .key {
            color: #FFFFFF;
            font-family: Montserrat;
            font-size: 20px;
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
        {badges.slice(0, 3).map(badge => (<img src={badge} />))}
      </div>
      <div>
        {badges.slice(3).map(badge => (<img src={badge} />))}
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
      {(finalists.map(data => (
        <div className='card' style={{ opacity: (data.isActive ? '1' : '0.3') }}>
          <img className='profilePic' src={data.profilePic} />
          <div className='borderOverlay' />
          <img className={'cardHexagonBackground'} src='/static/img/miniHexa.png' alt='hexa' />
          <div className='handle' style={{ color: primaryColor }}>
            <span>
              {data.handle}
            </span>
          </div>
          <img className='countryFlag' src={data.countryFlag} />
        </div>
      )))}
      <style jsx>
        {`
          .container {
            display: flex;
            position: relative;
            flex-wrap: wrap;
          }

          .card {
            width: 100px;
            height: 162px;
            margin: 10px 10px;
            position: relative;
            z-index: 1;
          }
          
          .cardHexagonBackground {
            width: 70%;
            position: absolute;
            left: 15%;
            bottom: -15%;
            z-index: -1;
          }

          .profilePic {
            height: 120px;
            width: 100%;
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
            height: 24px;
            width: 22px;
            position: absolute;
            bottom: -14px;
            left: 41%;
          }
        `}
      </style>
    </div>
  )
}

const FinalistsDetails = (props) => {
  const { finalists, finalistDetail, primaryColor } = props
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
        {finalistDetail && <div className='detailsContainer'>
          <div className='profilePicContainer'>
            <img className='profilePicBg' src='/static/img/selectedMemberBg.png' alt='bg' />
            <img className='profilePic' src={finalistDetail.profilePic} />
          </div>
          <div className='nameContainer'>
            <div className='handle' style={{ color: primaryColor }}>
              {finalistDetail.handle}
            </div>
            <div className='fullname'>
              {finalistDetail.fullName}
            </div>
            <div className='countryDetails'>
              <img className='countryFlag' src={finalistDetail.countryFlag} />
              {finalistDetail.country}
            </div>
          </div>
          <img className='divider' src='/static/img/verticalDivider.png' />
          {statsLayout(finalistDetail.stats)}
          <img className='divider' src='/static/img/verticalDivider.png' />
          {badgeLayout(finalistDetail.badges)}
        </div>}
        {finalistsList(props, finalists)}
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
            height: auto;
            flex-shrink: 0;
            margin-bottom: 60px;
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

          .detailsContainer {
            display: flex;
            justify-content: center;
          }

          .profilePicContainer {
            width: 230px;
            position: relative;
            z-index: 1;
            margin-bottom: 60px;
          }

          .profilePicBg {
            width: 100%;
            position: absolute;
            left: 0px;
            bottom: 0px;
            z-index: -1;
          }

          .profilePic {
            z-index: 1;
            margin-left: 24px;
            margin-bottom: 16px;        
          }

          .nameContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 30px;
          }

          .handle {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
            color: #5CC900;
            font-family: Montserrat;
            font-size: 42px;
            font-weight: 800;
            text-align: left;
          }

          .fullname {
            color: #FFFFFF;
            font-family: Montserrat;
            font-size: 24px;
            font-weight: 500;
            /* line-height: 29px; */
            text-align: left;
            margin-top: 6px;
          }

          .countryDetails {
            color: #FFFFFF;
            font-family: Montserrat;
            font-size: 20px;
            font-weight: 300;
            /* line-height: 24px; */
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

const finalists = []
for (let i = 0; i < 12; i++) {
  finalists.push({
    handle: (i % 2) ? 'deedee' : 'tuxing',
    country: (i % 2) ? 'argentina' : 'italy',
    profilePic: (i % 2) ? '/static/img/profilePic1.png' : '/static/img/profilePic2.png',
    countryFlag: (i % 2) ? '/static/img/flag/argentina.png' : '/static/img/flag/italy.png',
    isActive: (i === 4)
  })
}

const finalistDetail = {
  profilePic: '/static/img/profilePicBig1.png',
  handle: 'maxceem',
  fullName: 'Maksym Mykhailenko',
  country: 'Russia',
  countryFlag: '/static/img/flag/russia.png',
  stats: {
    rating: 1234,
    competitions: 1222,
    rank: 2,
    wins: 123
  },
  badges: ['/static/img/badges/1.png', '/static/img/badges/2.png', '/static/img/badges/3.png', '/static/img/badges/4.png', '/static/img/badges/5.png']
}

FinalistsDetails.getInitialProps = async function () {
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
    finalistDetail
  }
}

export default FinalistsDetails

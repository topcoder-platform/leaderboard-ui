import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

const SponsorPage = (props) => {
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
            <div className='title'>SPONSORED BY</div>
          </div>
          <img className='sponsorImg' src={props.mainSponsor} />
          <div className='description'>{props.sponsorDescription}</div>
        </main>
        <Sponsors {...props} smallerSponsor hideMainSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
        smallerDesign
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
            overflow-y: auto;
            width: 100%;
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

          .sponsorImg {
            margin-top: 40px;
            margin-bottom: 20px;
          }

          .description {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 26px;
            font-weight: 500;
            letter-spacing: -0.18px;
            line-height: 42px;
            opacity: 0.5;
            text-align: left;
            white-space: pre-line;
            padding: 20px 40px;
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

SponsorPage.getInitialProps = async function ({ query }) {
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
    eventEndDateTime: data.fields.eventEndsIn,
    sponsorDescription: data.fields.sponsorDescription
  }
}

export default SponsorPage

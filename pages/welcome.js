import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

import Header from '../components/Header'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import { checkForMainSponsor } from '../common/helper'

const Home = (props) => (
  <div className='container'>
    <PageHead />
    <Header {...props} />
    <main className='main'>
      <div className='logo-wrapper'>
        <img className='logo' src={props.logo} alt='logo' />
        <div className='logoText'>
          <span style={{ color: props.primaryColor }}>{props.track}</span>
          &nbsp;
          <span className='round'>{props.round}</span>
        </div>
      </div>
    </main>
    <Sponsors {...props} showDivider />
    <style jsx>
      {`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: url("/static/img/background.png") no-repeat center center fixed; 
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }

        .main {
          flex-grow: 1;
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          min-height: 300px;
          overflow-x: hidden;
        }
        
        .logo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .logo {
          width: 335px;
          position: relative;
        }

        .logoText {
          font-family: Montserrat;
          font-size: 32px;
          font-weight: 800;
          line-height: 48px;
          color: #ffffff;
          text-transform: uppercase;
          position: relative;
          width: 600px;
          margin-top: 5px;
        }

        .round {
          font-weight: 300;
        }

      `}
    </style>
  </div>
)

Home.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const header = data.fields.header.fields

  const sponsor = data.fields.sponsor.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    mainSponsor,
    otherSponsors
  }
}

export default Home

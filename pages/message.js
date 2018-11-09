import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'

const Home = (props) => (
  <div className='container'>
    <PageHead />
    <Header {...props} />
    <main className='main'>
      <div className='message'>
        { props.message }
      </div>
    </main>
    <Sponsors {...props} />
    <Footer {...props} />
    <style jsx>
      {`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: auto;
          background: url("/static/img/backgroundWithArtwork.png") no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }

        .main {
          min-height: 200px;
          flex-grow: 1;
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        .message {
          color: #FFFFFF;
          font-family: Montserrat;
          font-size: 72px;
          font-weight: 800;
          margin-top: 125px;
          line-height: 113px;
          text-align: center;
          text-shadow: 0px 7px 15px rgba(0, 0, 0, 0.4000000059604645);
          text-transform: uppercase;
        }

        @media only screen and (min-width:1600px){
          .message{
            font-size: 94px;
            margin-top: 135px;
          }
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

  const footer = data.fields.footer.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    message: data.fields.message,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor: sponsor.primarySponsor.fields.file.url,
    otherSponsors
  }
}

export default Home

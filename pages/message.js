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

Home.getInitialProps = async function () {
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
    otherSponsors
  }
}

export default Home

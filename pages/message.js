import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import showdown from 'showdown'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'

const Home = (props) => (
  <div className='container'>
    <PageHead />
    <Header {...props} />
    <main className='main'>
      <img className='hexa' src='/static/img/largeHexa.png' />
      <img className='full-hexa' src='/static/img/hexagon.png' alt='hex' />
      <div
        className='message'
        dangerouslySetInnerHTML={{ __html: props.message }}
      />
    </main>
    <Sponsors {...props} />
    <Footer {...props} />
    <style jsx global>{`
      #__next {
        display: flex;
        min-height: 100%;
      }
    `}</style>
    <style jsx>
      {`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: auto;
          background: url("/static/img/plainBackground.png") no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          flex-shrink: 0;
        }

        .main {
          min-height: 200px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          background-image: linear-gradient(270deg, rgba(0, 78, 119, 0) 0%, #004165 51.72%, rgba(0, 40, 61, 0) 100%);
        }

        .hexa {
          position: absolute;
          top: -150px;
          width: 700px;
        }

        .full-hexa {
          position: absolute;
          height: 100%;
          max-height: 200px;
        }

        .message {
          margin: 50px 20px;
          color: #FFFFFF;
          font-family: Montserrat;
          text-shadow: 0px 7px 15px rgba(0, 0, 0, 0.4000000059604645);
        }

        @media only screen and (min-width:1600px){
          .message{
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

  const converter = new showdown.Converter({ tables: true })

  const html = converter.makeHtml(data.fields.html)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    message: html,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor: sponsor.primarySponsor.fields.file.url,
    otherSponsors
  }
}

export default Home

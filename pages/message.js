import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import showdown from 'showdown'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import { checkForMainSponsor } from '../common/helper'

const Message = (props) => (
  <div className='container'>
    <PageHead />
    <Header {...props} />
    <main className='main'>
      <div className='messageContainer' >
        <div
          className='message'
          dangerouslySetInnerHTML={{ __html: props.message }}
        />
      </div>
    </main>
    <Sponsors {...props} hideMainSponsor />
    <Footer {...props} />
    <style jsx>
      {`
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: auto;
          background: url("/static/img/background.png") no-repeat center center fixed;
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
        }

        .messageContainer {
          text-shadow: 0 7px 15px rgba(0, 0, 0, 0.4000000059604645);
          flex-grow: 1;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .message {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
          position: absolute;
          color: #FFFFFF;
          font-family: 'Montserrat', sans-serif;
          font-size: 4.5em;
          font-weight: 400;
          line-height: 46px;
          margin-top: 20px;
          letter-spacing: 1.4px;
          margin-left: 25px;
        }
      `}
    </style>
  </div>
)

Message.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  const header = data.fields.header.fields

  const sponsor = data.fields.sponsor.fields

  const footer = data.fields.footer.fields

  const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

  const converter = new showdown.Converter({ tables: true })

  const html = converter.makeHtml(data.fields.html)

  const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    eventEndDateTime: header.eventEndDateTime,
    message: html,
    tickerType: footer.tickerType.fields.file.url,
    tickerSeparator: footer.tickerSeparator.fields.file.url,
    tickerMessages: footer.tickerMessages,
    mainSponsor,
    otherSponsors
  }
}

export default Message

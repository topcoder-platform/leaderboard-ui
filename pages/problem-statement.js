import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'

const ProblemStatement = (props) => {
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
            <div className='title'>{props.problemTitle}</div>
          </div>
          <div className='description'>{props.problemDescription}</div>
        </main>
        <Sponsors {...props} smallerSponsor />
        <Footer {...props} />
      </div>
      <FinalistTable
        {...props}
        smallerDesign
      />
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

const problemDescription = `
The rules of NIM are as follows: There are several piles of stones. The players take alternating turns. In each turn, the current player selects one non-empty pile of stones and removes some stones from the pile. (The player must remove at least one stone. They can remove as many stones as they want, possibly all of them, but just from a single pile.) The game ends when all stones have been removed. The player who removed the last stone wins the game. Equivalently, the first player who is unable to make a valid move loses the game.

More formally, a position in the game is an ordered sequence of pile sizes and a move consists of decrementing one of those values. Note that {1,2,3} and {3,2,1} are considered different positions, and thus the move from {3,2,3} to {1,2,3} and the move from {3,2,3} to {3,2,1} are two different moves.`

ProblemStatement.getInitialProps = async function () {
  const { publicRuntimeConfig } = getConfig()

  const res = await fetch(`${publicRuntimeConfig.host}/content/CONTENTFUL_FINALISTS_ENTRY_ID`)

  const data = await res.json()

  const otherSponsors = data.fields.otherSponsors.map(s => s.fields.file.url)

  const finalists = data.fields.finalists

  for (let i = 0; i < finalists.length; i++) {
    finalists[i] = {
      ...finalists[i],
      testsPassed: 20,
      challenges: 2,
      points: 12
    }
    if (i > 7) {
      delete finalists[i].points
      finalists[i].status = 'awaiting submission'
    }
  }

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
    finalists,
    eventEndDateTime: '2018-11-04T18:49:20.000Z',
    problemTitle: 'ALICE AND BOB PLAYING A GAME OF TILES',
    problemDescription
  }
}

export default ProblemStatement

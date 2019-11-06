import React from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import FinalistTable from '../components/FinalistTable'

const LeaderboardLayout = (props) => {
  return (
    <div className='container'>
      <PageHead />
      <Header {...props} />
      <main className='main'>
        <div className="leaderboardTable">
          <FinalistTable
            {...props}
            largeColumns
          />
        </div>
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

          .leaderboardTable {
            margin: 57px 0 0 0;
          }
        `}
      </style>
    </div>
  )
}

class F2FLeaderboard extends React.Component {
  render () {
    return (
      <LeaderboardLayout
        {...this.props}
      />
    )
  }
}

F2FLeaderboard.getInitialProps = async function () {
  const data = await import('../static/json/leaderboard-f2f.json')

  const header = data.fields.header.fields
  const footer = data.fields.footer.fields

  return {
    logo: header.logo.fields.file.url,
    primaryColor: header.primaryColor,
    track: header.track,
    round: header.round,
    eventStartDateTime: header.eventDateTime,
    tickerMessages: footer.tickerMessages,
    finalists: data.leaderboard
  }
}

export default F2FLeaderboard

import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard } from '../common/helper'

const LeaderboardLayout = (props) => {
  return (
    <div className='container'>
      <PageHead />
      <Header {...props} />
      <main className='main'>
        <div className='leaderboardTable'>
          <FinalistTable
            {...props}
            largeColumns
            isF2f
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
  constructor (props) {
    super(props)

    this.polling = null
    this.state = {
      leaderboard: []
    }
    this.setupLeaderboard = this.setupLeaderboard.bind(this)
  }

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

    const data = await res.json()

    const header = data.fields.header.fields

    const footer = data.fields.footer.fields

    const finalists = data.fields.finalists.fields

    return {
      logo: header.logo.fields.file.url,
      primaryColor: header.primaryColor,
      track: header.track,
      round: header.round,
      eventEndDateTime: header.eventDateTime,
      challengeIds: data.fields.challengeIds,
      groupId: data.fields.groupId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      members: finalists.finalists
    }
  }

  componentDidMount () {
    this.setupLeaderboard()
  }

  setupLeaderboard () {
    const { publicRuntimeConfig } = getConfig()

    prepareLeaderboard(null, this.props.members, this.props.groupId, this.props.challengeIds)
      .then((leaderboard) => {
        this.setState({ leaderboard })
        // Poll after configured second
        this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
      })
      .catch((err) => {
        console.log('Failed to fetch leaderboard. Error details follow')
        console.log(err)
      })
  }

  componentWillUnmount () {
    clearTimeout(this.polling)
  }

  render () {
    return (
      <LeaderboardLayout
        {...this.props}
        finalists={this.state.leaderboard}
      />
    )
  }
}

export default F2FLeaderboard

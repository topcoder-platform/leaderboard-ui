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
            fullWidth
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
            margin: 0;
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
    this.animateLeaderboard = this.animateLeaderboard.bind(this)
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
      eventStartDateTime: header.eventDateTime,
      eventEndDateTime: header.eventEndDateTime,
      challengeIds: data.fields.challengeIds,
      groupId: data.fields.groupId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      members: finalists.finalists,
      animateReveal: query.animate === 'true',
      isDev: data.fields.isDevTrack,
      isF2f: data.fields.isF2fTrack
    }
  }

  componentDidMount () {
    this.setupLeaderboard()
  }

  setupLeaderboard () {
    prepareLeaderboard(null, this.props.members, this.props.groupId, this.props.challengeIds, this.props.isF2f)
      .then((leaderboard) => {
        if (this.props.animateReveal) {
          this.setState({ leaderboard })
          this.animateLeaderboard()
        } else {
          leaderboard.forEach(l => { l.reveal = true })
          this.setState({ leaderboard })
        }
      })
      .catch((err) => {
        console.log('Failed to fetch leaderboard. Error details follow')
        console.log(err)
      })
  }

  animateLeaderboard () {
    let revealed = false
    let leaderboard = this.state.leaderboard

    const { publicRuntimeConfig } = getConfig()

    for (let i = leaderboard.length - 1; i > -1; i--) {
      if (!leaderboard[i].reveal) {
        leaderboard[i].reveal = true
        revealed = true
        break
      }
    }

    if (!revealed) {
      clearTimeout(this.polling)
    } else {
      this.setState({ leaderboard })
      this.polling = setTimeout(this.animateLeaderboard, publicRuntimeConfig.leaderboardRevealDelay)
    }
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

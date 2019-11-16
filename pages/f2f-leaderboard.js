import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard } from '../common/helper'

function getMemberFinalScore (member) {
  const finalScores = JSON.parse(JSON.stringify(member.finalDetails || {}))

  const newMember = Object.assign({
    animationClass: 'animate flipInX'
  }, member, finalScores)

  newMember.points = Math.round(newMember.aggregateScore * 10000) / 10000

  return newMember
}

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
    this.finalLeaderboard = null
    this.state = {
      leaderboard: []
    }
    this.setupLeaderboard = this.setupLeaderboard.bind(this)
    this.animateLeaderboard = this.animateLeaderboard.bind(this)
    this.displayFinalScores = this.displayFinalScores.bind(this)
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
      challengeId: header.challengeId,
      challengeIds: data.fields.challengeIds,
      groupId: data.fields.groupId,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      members: finalists.finalists,
      isDev: data.fields.isDevTrack,
      isF2f: data.fields.isF2fTrack,
      isQa: data.fields.isQaTrack,
      isMM: data.fields.isMmTrack,
      showFinalScore: data.fields.showFinalScore
    }
  }

  componentDidMount () {
    this.setupLeaderboard()
  }

  setupLeaderboard () {
    const { publicRuntimeConfig } = getConfig()

    prepareLeaderboard(this.props.challengeId, this.props.members, this.props.groupId, this.props.challengeIds, this.props.isF2f)
      .then((leaderboard) => {
        if (this.props.isF2f) {
          leaderboard.sort((a, b) => (b.points - a.points))
          
          if (this.props.showFinalScore) {
            leaderboard.forEach(l => { l.reveal = false })
            this.setState({ leaderboard })
            this.animateLeaderboard()
          } else {
            leaderboard.forEach(l => { l.reveal = true })
            this.setState({ leaderboard })
            // Poll after configured second
            this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
          }
        } else {
          // Non f2f track will:
          // - have only 2 columns, 1 for points and 1 for tests
          // - have 2 types of scores, provisional and final

          console.log(leaderboard)
          // Check if all members have their final scores ready for animation
          const finalResultsAvailable = leaderboard.every(l => {
            let hasScore = false

            if (l.finalDetails) {
              if (l.finalDetails.aggregateScore > -1) {
                hasScore = true
              }
            }

            return hasScore
          })

          if (finalResultsAvailable && this.props.showFinalScore) {
            // All members have final scores ready AND
            // we have the go ahead to reveal it

            // Ensure the scores are sorted BEFORE we begin to animate
            leaderboard.sort((a, b) => (b.finalDetails.aggregateScore - a.finalDetails.aggregateScore))

            this.finalLeaderboard = JSON.parse(JSON.stringify(leaderboard))

            // First, take a break and build the excitement
            leaderboard = leaderboard.map((l, i) => {
              const member = {
                handle: i,
                status: 'Processing final scores...',
                statusAnimationClass: 'animate flash infinite',
                animationClass: 'hidden'
              }
              return member
            })

            this.setState({ leaderboard })

            // Show time !!
            this.polling = setTimeout(this.displayFinalScores, publicRuntimeConfig.processDevRevealDelay)
          } else {
            this.setState({ leaderboard })
            // Poll after configured second
            this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
          }
        }
      })
      .catch((err) => {
        console.log('Failed to fetch leaderboard. Error details follow')
        console.log(err)
      })
  }

  // For dev and qa track
  displayFinalScores () {
    const { publicRuntimeConfig } = getConfig()
    let leaderboard = []
    let noMoreToReveal = true

    // Reveal each member's score one by one
    for (let i = this.finalLeaderboard.length - 1; i >= 0; i--) {
      if (this.finalLeaderboard[i].revealed === true) {
        leaderboard.push(getMemberFinalScore(this.finalLeaderboard[i]))
        continue
      } else {
        this.finalLeaderboard[i].revealed = true
        leaderboard.push(getMemberFinalScore(this.finalLeaderboard[i]))
        break
      }
    }

    const leaderboardLength = leaderboard.length

    // Check if any more member scores need to be revealed
    for (let i = 0; i < this.finalLeaderboard.length - leaderboardLength; i++) {
      noMoreToReveal = false
      leaderboard.push({
        handle: i,
        status: 'Processing final scores...',
        statusAnimationClass: 'animate flash infinite',
        animationClass: 'hidden'
      })
    }

    leaderboard.reverse()

    this.setState({ leaderboard })

    if (!noMoreToReveal) {
      // We still have members to reveal. Invoke this function again
      this.polling = setTimeout(this.displayFinalScores, publicRuntimeConfig.leaderboardRevealDelay)
    }
  }

  // For f2f track
  animateLeaderboard () {
    let revealed = false
    let leaderboard = this.state.leaderboard

    const { publicRuntimeConfig } = getConfig()

    for (let i = leaderboard.length - 1; i > -1; i--) {
      if (!leaderboard[i].reveal) {
        leaderboard[i].reveal = true
        leaderboard[i].animationClass = 'animate flipInX'
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

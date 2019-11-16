import React from 'react'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Sponsors from '../components/Sponsors'
import FinalistTable from '../components/FinalistTable'
import { prepareLeaderboard, checkForMainSponsor } from '../common/helper'

function getMemberFinalScore (member) {
  const finalScores = JSON.parse(JSON.stringify(member.finalDetails || {}))

  const newMember = Object.assign({
    animationClass: 'animate flipInX'
  }, member, finalScores)

  newMember.points = Math.round(newMember.aggregateScore * 10000) / 10000

  return newMember
}

class ProblemStatement extends React.Component {
  constructor (props) {
    super(props)

    this.polling = null
    this.finalLeaderboard = null
    this.state = {
      leaderboard: []
    }
    this.setupLeaderboard = this.setupLeaderboard.bind(this)
    this.displayFinalScores = this.displayFinalScores.bind(this)
  }

  static async getInitialProps ({ query }) {
    const { publicRuntimeConfig } = getConfig()

    const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

    const data = await res.json()

    const header = data.fields.header.fields

    const sponsor = data.fields.sponsor.fields

    const footer = data.fields.footer.fields

    const finalists = data.fields.finalists.fields

    const otherSponsors = sponsor.secondarySponsors.map(s => s.fields.file.url)

    const mainSponsor = await checkForMainSponsor(sponsor.primarySponsor)

    return {
      logo: header.logo.fields.file.url,
      primaryColor: header.primaryColor,
      track: header.track,
      round: header.round,
      eventStartDateTime: header.eventDateTime,
      eventEndDateTime: header.eventEndDateTime,
      showScoreboard: header.showScoreboard,
      challengeId: header.challengeId,
      groupId: header.groupId,
      challengeIds: header.challengeIds,
      tickerType: footer.tickerType.fields.file.url,
      tickerSeparator: footer.tickerSeparator.fields.file.url,
      tickerMessages: footer.tickerMessages,
      mainSponsor,
      otherSponsors,
      members: finalists.finalists,
      problemTitle: data.fields.problemStatementTitle,
      problemDescription: data.fields.problemStatementDescription,
      isDev: data.fields.isDevTrack,
      isF2f: data.fields.isF2fTrack,
      isQa: data.fields.isQaTrack,
      showFinalScore: data.fields.showFinalScore
    }
  }

  componentDidMount () {
    this.setupLeaderboard()
  }

  setupLeaderboard () {
    const { publicRuntimeConfig } = getConfig()

    prepareLeaderboard(this.props.challengeId, this.props.members, this.props.groupId, this.props.challengeIds, this.props.isF2f, this.props.showFinalScore)
      .then((leaderboard) => {
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
          this.finalLeaderboard = JSON.parse(JSON.stringify(leaderboard))

          leaderboard = leaderboard.map(l => {
            const member = {
              handle: l.handle,
              profilePic: l.profilePic,
              countryFlag: l.countryFlag,
              status: 'Processing final scores...',
              statusAnimationClass: 'animate flash infinite'
            }
            return member
          })

          this.setState({ leaderboard })

          this.polling = setTimeout(this.displayFinalScores, publicRuntimeConfig.processDevRevealDelay)
        } else {
          this.setState({ leaderboard })
          // Poll after configured second
          this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
        }

        // if (!finalResultsAvailable) {
        //   this.setState({ leaderboard })
        //   // Poll after configured second
        //   this.polling = setTimeout(this.setupLeaderboard, publicRuntimeConfig.pollTimeInterval)
        // } else {
        //   this.finalLeaderboard = JSON.parse(JSON.stringify(leaderboard))

        //   leaderboard = leaderboard.map(l => {
        //     const member = {
        //       handle: l.handle,
        //       profilePic: l.profilePic,
        //       countryFlag: l.countryFlag,
        //       status: 'Processing final scores...',
        //       statusAnimationClass: 'animate flash infinite'
        //     }
        //     return member
        //   })

        //   this.setState({ leaderboard })

        //   this.polling = setTimeout(this.displayFinalScores, publicRuntimeConfig.processDevRevealDelay)
        // }
      })
      .catch((err) => {
        console.log('Failed to fetch leaderboard. Error details follow')
        console.log(err)
      })
  }

  displayFinalScores () {
    const { publicRuntimeConfig } = getConfig()
    let leaderboard = []
    let noMoreToReveal = true

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
      this.polling = setTimeout(this.displayFinalScores, publicRuntimeConfig.leaderboardRevealDelay)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.polling)
  }

  render () {
    return (
      <div className='container'>
        <div className='viewHolder'>
          <PageHead />
          <Header {...this.props} smallHeader />
          <main className='main'>
            <img className='hexa' src='/static/img/largeHexa.png' />
            <div className='message'>
              <img src='/static/img/hexagon.png' alt='hex' />
              <div className='sub-title'>Problem details</div>
              <div className='title'>{this.props.problemTitle}</div>
            </div>
            <div className='description'>{this.props.problemDescription}</div>
          </main>
          <div className='problemStatementSponsor'>
            <Sponsors {...this.props} smallerSponsor />
          </div>
          <Footer {...this.props} />
        </div>
        {this.props.showScoreboard && <FinalistTable
          {...this.props}
          finalists={this.state.leaderboard}
          // smallerDesign
          isMini
        />
        }
        <style jsx global>{`
          #__next {
            display: flex;
            min-height: 100%;
          }
        `}</style>
        <style jsx>
          {`
            .container {
              display: flex;
              background: url('/static/img/background.png') no-repeat center center fixed;
              -webkit-background-size: cover;
              -moz-background-size: cover;
              -o-background-size: cover;
              background-size: cover;
              overflow-y: auto;
              width: 100%;
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
              background-image: linear-gradient(rgba(0,78,119,0.1) 0%,rgba(0,18,101,0.1) 51.72%,rgba(0,40,61,0.2) 100%);
              margin-bottom: 10px;
              position: relative;
            }

            .main::before {
              content: "";
              width: 363.1px;
              background: rgba(112, 112, 112, 0.12);
              height: 2px;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
            }

            .problemStatementSponsor {
              padding: 20px 0;
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
              top: -9px;
            }

            .message .title {
              text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4000000059604645);
              color: #FFFFFF;
              font-family: Montserrat;
              font-size: 2.375em;
              font-weight: 400;
              line-height: 46px;
              text-align: center;
            }

            .message .sub-title {
              color: rgba(255, 255, 255, 0.6);
              font-family: Montserrat;
              font-size: 1.5em;
              font-weight: 400;
              text-align: center;
            }

            .description {
              color: #FFFFFF;
              font-family: Roboto;
              font-size: 1.625em;
              font-weight: 500;
              letter-spacing: -0.18px;
              line-height: 42px;
              opacity: 0.5;
              text-align: left;
              white-space: pre-line;
              padding: 20px 40px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default ProblemStatement

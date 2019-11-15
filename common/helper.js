import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'

const leadingZero = (number) => {
  if (number < 10) {
    return `0${number}`
  }

  if (number > 99) {
    return '99'
  }

  return number
}

const hexToName = (hexColor) => {
  switch (hexColor) {
    case '#FD7D00': return 'orange'
    case '#2598D5': return 'blue'
    case '#5CC900': return 'green'
  }
  return 'blue'
}

/**
 * Returns the leaderboard data
 * Pass either challengeId or groupId. If both passed, groupId is used
 * Pass groupChallengeIds too if passing groupId
 * @param {String} challengeId The challenge Id
 * @param {Array} finalists The list of known finalists
 * @param {String} groupId The group Id
 * @param {Array} groupChallengeIds The challenges in the group
 * @param {Boolean} isF2f Is the leaderboard for F2F track? If yes, multiplier is applied
 */
async function prepareLeaderboard (challengeId, finalists, groupId, groupChallengeIds, isF2f) {
  const { publicRuntimeConfig } = getConfig()
  const multiplier = [2, 3, 5]

  let res
  let leaderboard

  if (groupId) {
    res = await fetch(`${publicRuntimeConfig.host}/api/leaderboard/group/${groupId}`)
    leaderboard = await res.json()

    // Associate the member details (from contentful) with their score (from leaderboard api)
    // Don't lose the order in which the member appears in leaderboard variable - they are ranked in order already
    leaderboard = leaderboard.map(l => {
      // First associate the member in contentful with the member in the leaderboard api
      let member = finalists.find(f => {
        return f.handle === l.memberHandle
      })

      if (member) {
        let aggregateScore = 0
        // Next determine the member score details
        // Since it is a group, for each member we will have a maximum of n reviews and 1 final score
        // where n is the number of contests per group

        // Truncate score to up to 2 decimal points
        member.points = Math.round(l.finalAggregationScore * 10000) / 10000

        member.challenges = l.numberOfChallenges

        member.testsPassed = l.totalTestsPassed || 0
        member.totalTestCases = l.totalTests

        member.reviews = []

        // Now, for each member, determine the individual reviews
        // Use the provided list of challenge ids per group to organize
        // since a member may not have a review for a challenge (if they have no submitted)
        for (let i = 0; i < groupChallengeIds.length; i++) {
          let review = l.reviews.find(r => r.challengeId === groupChallengeIds[i])

          if (review) {
            // Member has a review for that challenge
            if (review.status !== 'queued') {
              let score

              if (isF2f) {
                score = Math.round(review.aggregateScore * multiplier[i] * 10000) / 10000
              } else {
                score = Math.round(review.aggregateScore * 10000) / 10000
              }
              member.reviews.push({
                score,
                testsPassed: review.testsPassed,
                totalTestCases: review.totalTestCases
              })

              aggregateScore = aggregateScore + (review.aggregateScore * multiplier[i])
            } else {
              // If a review is in queue, do not show any points or tests. Show the status
              member.reviews.push({ status: 'review queued' })
              // If a review is in queue, then the aggregate points will not be known
              member.points = '...'
            }
          } else {
            // Member does not have a review for that challenge
            member.reviews.push({})
          }
        }

        if (isF2f) {
          // multiplier points get applied for f2f track
          member.points = Math.round(aggregateScore * 10000) / 10000
        }
      } else {
        // Member exists in leaderboard api but not in contentful
        member = {}

        member.status = 'awaiting submission here'
        member.handle = l.handle
        member.country = l.country
        member.countryFlag = l.countryFlag
        member.profilePic = l.profilePic
      }

      return member
    })
  } else {
    res = await fetch(`${publicRuntimeConfig.host}/api/leaderboard/challenge/${challengeId}`)
    leaderboard = await res.json()

    // Associate the member details with their score
    // Don't lose the order in which the member appears in leaderboard variable - they are ranked in order already
    leaderboard = leaderboard.map(l => {
      let member = finalists.find(f => {
        return f.handle === l.handle
      })

      if (member) {
        member.scoreLevel = l.scoreLevel

        if (member.scoreLevel !== 'queued') {
          member.points = Math.round(l.aggregateScore * 10000) / 10000

          member.challenges = 1

          member.testsPassed = l.testsPassed || 0
          member.totalTestCases = l.totalTestCases
        } else {
          // We need to delete any irrelevant attributes otherwise react
          // will show the old values even when new review status is queued
          delete member.scoreLevel
          delete member.points
          delete member.testsPassed
          delete member.totalTestCases
          member.status = 'review queued'
        }
      } else {
        member = {}

        member.status = 'awaiting submission here'
        member.handle = l.handle
        member.country = l.country
        member.countryFlag = l.countryFlag
        member.profilePic = l.profilePic
      }

      return member
    })
  }

  // Fill up the remaining member details, which will not be present in leaderboard, if they have not submitted
  // In other words, member exists in contentful but not in leaderboard api
  for (let i = 0; i < finalists.length; i++) {
    const found = leaderboard.find(l => l.handle === finalists[i].handle)

    if (!found) {
      leaderboard.push({
        handle: finalists[i].handle,
        status: 'awaiting submission',
        country: finalists[i].country,
        countryFlag: finalists[i].countryFlag,
        profilePic: finalists[i].profilePic
      })
    }
  }

  return leaderboard
}

async function checkForMainSponsor (sponsor) {
  if (sponsor) {
    return sponsor.fields.file.url
  } else {
    return undefined
  }
}

function blobGen (min, max) {
  return Math.floor(Math.random() * max) + min
}

export { leadingZero, hexToName, prepareLeaderboard, checkForMainSponsor, blobGen }

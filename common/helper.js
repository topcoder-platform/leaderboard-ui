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

async function prepareLeaderboard (challengeId, finalists) {
  const { publicRuntimeConfig } = getConfig()

  let res
  let leaderboard

  res = await fetch(`${publicRuntimeConfig.host}/api/leaderboard/${challengeId}`)
  leaderboard = await res.json()

  // Associate the member details with their score
  // Don't lose the order in which the member appears in leaderboard variable - they are ranked in order already
  leaderboard = leaderboard.map(l => {
    let member = finalists.find(f => {
      return f.handle === l.handle
    })

    if (member) {
      member.points = l.aggregateScore

      member.challenges = 1

      member.testsPassed = l.testsPassed || 0
      member.totalTestCases = l.totalTestCases
    } else {
      member = {}

      member.status = 'awaiting submission here'
      member.handle = l.handle
    }

    return member
  })

  // Fill up the remaining member details, which will not be present in leaderboard, if they have not submitted
  for (let i = leaderboard.length; i < finalists.length; i++) {
    leaderboard.push({
      status: 'awaiting submission'
    })
  }

  console.log(leaderboard)

  return leaderboard
}

export { leadingZero, hexToName, prepareLeaderboard }

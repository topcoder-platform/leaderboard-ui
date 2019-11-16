module.exports = {
  publicRuntimeConfig: {
    host: process.env.HOST,
    pollTimeInterval: process.env.LEADERBOARD_POLL_TIME_INTERVAL || 1000,
    leaderboardRevealDelay: process.env.LEADERBOARD_REVEAL_DELAY || 2000,
    processDevRevealDelay: process.env.DEV_LEADERBOARD_REVEAL_DELAY || 5000
  }
}

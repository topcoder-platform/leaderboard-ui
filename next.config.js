module.exports = {
  publicRuntimeConfig: {
    host: process.env.HOST,
    pollTimeInterval: process.env.LEADERBOARD_POLL_TIME_INTERVAL || 1000
  }
}

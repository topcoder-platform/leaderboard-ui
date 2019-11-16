module.exports = {
  publicRuntimeConfig: {
    host: process.env.HOST,
    pollTimeInterval: process.env.LEADERBOARD_POLL_TIME_INTERVAL || 1000,
    leaderboardRevealDelay: process.env.LEADERBOARD_REVEAL_DELAY || 500,
    processDevRevealDelay: process.env.DEV_LEADERBOARD_REVEAL_DELAY || 7000,
    revealFinalScore: process.env.REVEAL_FINAL_SCORE ? Boolean(process.env.REVEAL_FINAL_SCORE) : false
  }
}

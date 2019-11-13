require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const contentful = require('contentful')
const request = require('superagent')
const cors = require('cors')
const healthCheck = require('topcoder-healthcheck-dropin')
var cookieParser = require('cookie-parser')
var session = require('express-session')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_SPACE_ENV || 'master'
})

const adminUser = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

const port = process.env.PORT

app.prepare()
  .then(() => {
    const server = express()

    server.use(cors())

    // Here we are configuring express to use body-parser as middle-ware.
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(cookieParser())
    server.use(session({ secret: 'secret-code', cookie: { maxAge: 6000 } }))

    server.use(healthCheck.middleware([() => true]))

    // Endpoint that loads the list of tracks
    server.get('/', async (req, res, next) => {
      if (!req.session.loggedIn) {
        return res.redirect('/login')
      }
      next()
    })

    // Endpoint for login page
    server.get('/login', async (req, res) => {
      app.render(req, res, '/login', {})
    })

    // Endpoint for logout page
    server.get('/logout', async (req, res) => {
      app.render(req, res, '/logout', {})
    })

    server.post('/logout', async (req, res) => {
      req.session.loggedIn = false
      req.session.save()
      res.end(JSON.stringify({
        result: 'success'
      }))
    })

    server.post('/login', async (req, res) => {
      var username = req.body.username
      var password = req.body.password
      console.log('totest adminUser', adminUser)
      console.log('totest username', username)
      console.log('totest password', password)
      if (
        username !== adminUser.username ||
        password !== adminUser.password ||
        !adminUser.username ||
        !adminUser.password) {
        res.end(JSON.stringify({
          result: 'false'
        }))
      } else {
        req.session.loggedIn = true
        req.session.save()
        res.end(JSON.stringify({
          result: 'success'
        }))
      }
    })

    // Endpoint that loads the list of tracks
    server.get('/track/:trackId', async (req, res) => {
      if (!req.session.loggedIn) {
        return res.redirect('/login')
      }

      const contentfulEntryId = req.params.trackId

      const actualPage = '/tracks'

      const queryParams = { contentfulEntryId }

      app.render(req, res, actualPage, queryParams)
    })

    // Endpoint that lists the pages in each track
    server.get('/page/:pageName/:entryId', async (req, res) => {
      if (!req.session.loggedIn) {
        return res.redirect('/login')
      }

      const contentfulEntryId = req.params.entryId

      const animate = req.query.animate

      const actualPage = `/${req.params.pageName}`

      const queryParams = { contentfulEntryId, animate }

      app.render(req, res, actualPage, queryParams)
    })

    // Endpoint that gets the content from contentful for a given entry id
    server.get('/contentful/:entryId', async (req, res) => {
      const data = await client.getEntry(req.params.entryId)

      res.send(data)
    })

    // Endpoint that gets the content from contentful for an entry id configured in environment variable
    // (meant to be used for the ROOT page, to get the root page contents)
    server.get('/content/:pageName', async (req, res) => {
      const pageName = req.params.pageName

      const data = await client.getEntry(process.env[pageName])

      res.send(data)
    })

    server.get('/api/leaderboard/challenge/:challengeId', async (req, res) => {
      const challengeId = req.params.challengeId

      const data = await request
        .get(process.env.LEADERBOARD_API_ENDPOINT)
        .query({ challengeId, perPage: 16 })

      res.send(data.body)
    })

    server.get('/api/leaderboard/group/:groupId', async (req, res) => {
      const groupId = req.params.groupId

      const data = await request
        .get(process.env.LEADERBOARD_API_ENDPOINT)
        .query({ groupId, perPage: 16 })

      res.send(data.body)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on ${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

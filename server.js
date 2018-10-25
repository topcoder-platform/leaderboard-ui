const express = require('express')
const next = require('next')
const contentful = require('contentful')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

const port = process.env.PORT

app.prepare()
  .then(() => {
    const server = express()

    server.get('/content/:pageName', async (req, res) => {
      const pageName = req.params.pageName

      const data = await client.getEntry(process.env[pageName])

      res.send(data)
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

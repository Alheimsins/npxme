const { readFileSync } = require('fs')
const md = require('markdown-it')()
const { send } = require('micro')
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const axios = require('axios')
const repackData = require('./lib/repack-data')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// Handlers
const getFrontpage = async (request, response) => {
  const readme = await readFileSync(`${__dirname}/README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}

const getCard = async (request, response) => {
  const { card } = request.params
  const url = `https://unpkg.com/${card}/bin/output`
  try {
    const { data } = await axios.get(url)
    response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    send(response, 200, repackData(data))
  } catch (error) {
    console.error(error)
    send(response, 404, `Could not find card for ${card}`)
  }
}

const getFavicon = async (request, response) => {
  send(response, 404, 'not found')
}

// ROUTES
router.get('/', getFrontpage)
router.get('/favicon.ico', getFavicon)
router.get('/:card', getCard)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}

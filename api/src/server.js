import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Ticketmaster API base URL
const TM_API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

// Ticketmaster API key
const TM_API_KEY = process.env.TM_API_KEY

// Endpoint to search attractions by a search term
app.get('/attractions', async (req, res) => {
  try {
    let searchTerm = 'Phish'
    if (typeof req.query.searchTerm === 'string') {
      searchTerm = req.query.searchTerm
    }

    const response = await axios.get(`${TM_API_BASE_URL}/attractions.json`, {
      params: {
        keyword: searchTerm,
        apikey: TM_API_KEY
      }
    })

    const matchingAttractions = response.data._embedded.attractions.map((attraction) => ({
      id: attraction.id,
      title: attraction.name,
      image: attraction.images.length > 0 ? attraction.images[0].url : ''
    }))

    res.json(matchingAttractions)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Endpoint to get details of an attraction including upcoming events
app.get('/attractions/:id', async (req, res) => {
  try {
    const attractionId = req.params.id
    const response = await axios.get(`${TM_API_BASE_URL}/attractions/${attractionId}.json`, {
      params: {
        apikey: TM_API_KEY,
        includeEvents: 'yes'
      }
    })

    const { name, images, externalLinks } = response.data
    const eventsResponse = await axios.get(`${TM_API_BASE_URL}/events.json`, {
      params: {
        apikey: TM_API_KEY,
        attractionId: attractionId
      }
    })

    const upcomingEvents =
      eventsResponse.data?._embedded?.events.length > 0
        ? eventsResponse.data._embedded.events.map((event) => ({
            name: event.name,
            image: event.images[0].url,
            venue: event._embedded.venues[0].name,
            city: event._embedded.venues[0].city.name,
            state: event._embedded.venues[0].state.stateCode,
            date: event.dates.start.localDate
          }))
        : []

    const attractionDetails = {
      name,
      image: images[0].url,
      externalLinks,
      upcomingEvents
    }

    res.json(attractionDetails)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

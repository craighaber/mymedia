import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {getMedia, getMediaEntry, deleteMediaEntry, getCategories, addMediaEntry, updateMediaEntry} from '../database.js'

dotenv.config()

const app = express()
app.use(cors(
    {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))
app.use(express.json()) //Allows express to automatically parse JSON strings to objects in request bodies

app.get('/media/:userId', async (req, res) => {
    const media = await getMedia(req.params.userId)
    res.send(media)
})

app.get('/media-entry/:id', async (req,res) => {
    const mediaEntry = await getMediaEntry(req.params.id);
    res.send(mediaEntry)
})

app.post('/media-entry', async (req, res) => {
    const {title, category, rating, review, userId} = req.body 
    await addMediaEntry(title, category, rating, review, userId)
    res.sendStatus(201)
    
})

app.put('/media-entry/:id', async (req, res) => {
    const {title, category, rating, review, notes} = req.body
    await updateMediaEntry(req.params.id, title, category, rating, review, notes)
    res.sendStatus(204)
})

app.delete('/media-entry/:id', async (req, res) => {
    await deleteMediaEntry(req.params.id)
    res.sendStatus(204);
})

app.get('/categories', async (req, res) => {
    const categories = await getCategories()
    await res.send(categories)
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Unexpected Server Error')
})

app.listen(process.env.NODE_PORT, () => {
    console.log("listening")
})
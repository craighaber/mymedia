import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {getMedia, getCategories, addMedia} from './database.js'

dotenv.config()

const app = express()
app.use(cors())
//Allows express to parse JSON request bodies
app.use(express.json()) 

app.get('/media/:uid', async (req, res) => {
    const media = await getMedia(req.params.uid)
    res.send(media)
})

app.post('/media', async (req, res, next) => {
    const {title, category, rating, review, uid} = req.body 
    try {
        await addMedia(title, category, rating, review, uid)
        res.sendStatus(201)
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.sendStatus(409)    
        }
        // When you call next(error) in your route handler or another middleware function,
        //Express skips the remaining non-error handling routing and middleware functions and proceeds to the next error handling middleware function. 
        next(error)
    }
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
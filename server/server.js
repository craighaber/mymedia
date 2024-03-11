import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {getMedia, getCategories, getNote, getNotes, createNote, addMedia} from './database.js'

dotenv.config()

const app = express()
app.use(cors())
//Allows express to parse JSON request bodies
app.use(express.json()) 

app.get('/media/:uid', async (req, res) => {
    const media = await getMedia(req.params.uid)
    res.send(media)
})

app.post('/media', async (req, res) => {
    const {title, category, rating, review, uid} = req.body 
    addMedia(title, category, rating, review, uid)
    res.sendStatus(201)
})

app.get('/categories', async (req, res) => {
    const categories = await getCategories()
    await res.send(categories)
})


// *********************************************************
// Functions for references. TODO: Delete
app.get('/notes', async (req, res)=> {   
    const notes = await getNotes()
    res.send(notes) 
})

app.get('/notes/:id', async (req, res)=> {   
    const id = req.params.id
    const note = await getNote(id)
    res.send(note) 
})

app.post('/notes', async (req, res)=> {   
    const {title, contents} = req.body
    const id = await createNote(title, contents) 
    res.status(201).send(id)
})

// *********************************************************

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Unexpected Server Error')
})

app.listen(process.env.NODE_PORT), () =>{
    console.log("listening")
}


import pgPromise from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config()



const pgp = pgPromise();
const connection = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 30 // Max number of simaltaneous connections
}

const db = pgp(connection)

export async function getMedia(userId){
    const rows = await db.manyOrNone('SELECT media.id, media.title, categories.category, media.rating, media.review, media.notes from media JOIN categories ON media.category_id = categories.id WHERE media.user_id = $1 ORDER BY  media.title', [userId])
    return rows
}

export async function getMediaEntry(id){
    const row = await db.oneOrNone('SELECT media.id, media.title, categories.category, media.rating, media.review, media.notes from media JOIN categories ON media.category_id = categories.id WHERE media.id = $1', [id])
    return row
}

export async function addMediaEntry(title, category, rating, review, userId){
    await db.none(
    `INSERT INTO media (title, category_id, rating, review, user_id) VALUES ($1, (SELECT id FROM categories WHERE category = $2), $3, $4, $5)`, 
    [title, category, rating, review, userId])
    
}

export async function updateMediaEntry(id, title, category, rating, review, notes){
    await db.none('UPDATE media SET title=$1, category_id=(SELECT id from categories WHERE category = $2), rating=$3, review=$4, notes=$5 WHERE id = $6',
    [title, category, rating, review, notes, id])
}

export async function deleteMediaEntry(id){
    await db.none('DELETE FROM media WHERE id = $1', [id])
}

export async function getCategories(){
    const rows =  await db.manyOrNone("SELECT category from categories")
    return rows.map(row => row.category)
}
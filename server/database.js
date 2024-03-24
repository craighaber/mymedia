import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getMedia(uid){
    const [rows] = await pool.query('SELECT media.title, categories.category, media.rating, media.review from media JOIN categories ON media.category_id = categories.id WHERE media.uid = ?', [uid])
    return rows
}

export async function addMedia(title, category, rating, review, uid){
        await pool.query(
        `INSERT INTO media (title, category_id, rating, review, uid) VALUES (?, (SELECT id FROM categories WHERE category = ?), ?, ?, ?)`, 
        [title, category, rating, review, uid])
    
}

export async function getCategories(){
    const [rows] = await pool.query("SELECT category from categories")
    return rows.map(row => row.category)
}
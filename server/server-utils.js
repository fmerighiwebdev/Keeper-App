import db from './server.js';
import axios from 'axios';

// Funzione che cerca un utente nel database tramite email
async function findUser(email) {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return results.rows[0];
}

async function findUserById(id) {
    const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return results.rows[0];
}

// Funzione che crea un utente nel database
async function createUser(email, username, password) {
    await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, password]);
}

async function createNote(title, content, user_id) {
    await db.query('INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3)', [title, content, user_id]);
}

async function getNotes(user_id) {
    const results = await db.query('SELECT * FROM notes WHERE user_id = $1', [user_id]);
    return results.rows;
}

async function deleteNote(id) {
    await db.query('DELETE FROM notes WHERE id = $1', [id]);
}

async function editNote(title, content, id) {
    await db.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3', [title, content, id]);
}   

export { findUser, findUserById, createUser, createNote, getNotes, deleteNote, editNote };
import db from './server.js';
import { jwtDecode } from 'jwt-decode';

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

export { findUser, findUserById, createUser };
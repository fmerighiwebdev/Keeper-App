import db from './server.js';

// Funzione che cerca un utente nel database
async function findUser(email) {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return results.rows[0];
}

// Funzione che crea un utente nel database
async function createUser(email, username, password) {
    await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, password]);
}

export { findUser, createUser };
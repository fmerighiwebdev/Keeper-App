import db from './server.js';

// Funzione che cerca un utente nel database tramite email
async function findUser(email) {
    const results = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return results.rows[0];
}

async function findUserById(id) {
    const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return results.rows[0];
}

async function createUser(email, username, password) {
    await db.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, password]);
}

async function createNote(title, content, user_id, category) {
    await db.query('INSERT INTO notes (title, content, user_id, category) VALUES ($1, $2, $3, $4)', [title, content, user_id, category]);
}

async function getNotes(user_id, category) {
    const results = await db.query('SELECT * FROM notes WHERE user_id = $1 AND category = $2', [user_id, category]);
    return results.rows;
}

async function deleteNote(id) {
    await db.query('DELETE FROM notes WHERE id = $1', [id]);
}

async function editNote(title, content, id) {
    await db.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3', [title, content, id]);
}   

export { findUser, findUserById, createUser, createNote, getNotes, deleteNote, editNote };
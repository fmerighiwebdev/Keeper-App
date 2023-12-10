import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import { findUser, createUser } from './utils.js';

// Definizione istanze
const app = express();
const port = process.env.port || 5000;
dotenv.config();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'keeper-app',
    port: 5432,
    password: process.env.DB_PASSWORD
});
export default db;

// Connessione al database
db.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack)
    } else {
        console.log('Connected to Keeper-App Database')
    }
});

// CORS 
const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.1.33:3000'],
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/api/login', (req, res) => {
    res.send('Login');
});

app.post('/api/signup', async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const userAlreadyExists = await findUser(email);

        if (!userAlreadyExists) {
            const hash = await bcrypt.hash(password, 10);
            await createUser(email, username, hash);
            return res.status(200).json({ message: 'User created successfully' });
        } else {
            return res.status(400).json({ error: 'User already exists' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
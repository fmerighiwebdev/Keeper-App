import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

const app = express();
const port = process.env.port || 5000;
dotenv.config();

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'keeper-app',
    port: 5432,
    password: process.env.DB_PASSWORD,
});

db.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack)
    } else {
        console.log('Connected to Keeper-App Database')
    }
});

const corsOptions = {
    origin: ['http://localhost:3001', 'http://192.168.1.33:3001'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post('/auth/login', (req, res) => {
    res.send('Login');
});

app.post('/auth/signup', (req, res) => {
    res.send('Signup');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
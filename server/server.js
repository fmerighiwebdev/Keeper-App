import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import jwt from 'jsonwebtoken';

import { findUser, findUserById, createUser } from './utils.js';

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
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Serializzazione e deserializzazione dell'utente
passport.serializeUser((user, done) => {
    console.log('Serializing user', user)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user', id)
    const user = await findUserById(id);
    done(null, user);
});

// Strategia di autenticazione locale
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    const user = await findUser(email);

    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
        return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
}));

// Routes

// Richiesta POST per aute
app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        // Genera un token di autorizzazione
        const expiryDate = "2h";
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: expiryDate });

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'User logged in successfully', user, token });
        });
    })(req, res, next);
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

app.post('/api/validateToken', (req, res) => {
    const token = req.body.token;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Token is valid', decodedToken });
    } catch (error) {
        return res.status(401).json({ error: 'Token is not valid' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
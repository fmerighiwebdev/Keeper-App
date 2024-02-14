import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
import session from 'express-session';
import jwt from 'jsonwebtoken';

import { findUser, findUserById, createUser, createNote, getNotes, deleteNote, editNote } from './server-utils.js';

// Definizione istanze
const app = express();
const port = process.env.PORT || 5000;
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
        console.error('Errore di connessione', err.stack)
    } else {
        console.log('Connesso al database Keeper-App')
    }
});

// CORS
const corsOptions = {
    origin: ['http://localhost:3000', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
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

app.use(logger);

// Serializzazione e deserializzazione dell'utente
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await findUserById(id);
    done(null, user);
});

// Strategie di autenticazione
passport.use("login", new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const user = await findUser(email);

        if (!user) {
            return done(null, false, { message: 'Utente non trovato' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return done(null, false, { message: 'Password errata' });
        }

        return done(null, user, { message: 'Utente autenticato con successo' });
    } catch (error) {
        return done(error, false, { message: 'Qualcosa è andato storto' });
    }
}));

passport.use(new JWTStrategy.Strategy({ 
    jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET 
}, async (jwtPayload, done) => {
    try {
        const user = await findUserById(jwtPayload.user.id);
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

// Routes

// Richiesta POST per il login
// Utilizza la strategia di autenticazione "login"
app.post('/api/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!user) {
            return res.status(400).json({ error: info.message });
        }
        req.logIn(user, (error) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return res.status(200).json({ message: info.message, user: user, token: token });
        });
    })(req, res, next);
});

// Richiesta POST per la registrazione
app.post('/api/signup', async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    if (!email || !username || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Compila tutti i campi' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email non valida' });
    }

    if (password.length < 4) {
        return res.status(400).json({ error: 'La password deve essere di almeno 4 caratteri' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Le password non corrispondono' });
    }

    try {
        const userAlreadyExists = await findUser(email);

        if (!userAlreadyExists) {
            const hash = await bcrypt.hash(password, 10);
            await createUser(email, username, hash);
            return res.status(200).json({ message: 'Utente creato con successo' });
        } else {
            return res.status(400).json({ error: 'Utente già esistente' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Qualcosa è andato storto' });
    }
});

// Richiesta POST per la creazione di una nota
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.post('/api/createNote', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, content, category } = req.body;

    try {
        await createNote(title, content, req.user.id, category);
        return res.status(200).json({ message: 'Nota creata con successo' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta GET per ottenere le note dell'utente
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/getNotes', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { category } = req.query;

    try {
        const notes = await getNotes(req.user.id, category);
        return res.status(200).json({ notes: notes });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta DELETE per eliminare una nota
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.delete('/api/deleteNote/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await deleteNote(req.params.id);
        return res.status(200).json({ message: 'Nota eliminata con successo' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta PUT per modificare una nota
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.put('/api/editNote/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, content } = req.body;

    try {
        await editNote(title, content, req.params.id);
        return res.status(200).json({ message: 'Nota modificata con successo' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta GET per ottenere i dati dell'utente
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ user: req.user });
});

// Richiesta GET per il logout
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    req.logout(error => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    res.status(200).json({ message: 'Utente disconnesso con successo' });
});

// Richiesta GET per la validazione del token
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/validateToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        res.status(200).json({ message: 'Token valido' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function logger(req, res, next) {
    console.log(`Richiesta ${req.method} per ${req.url}`);
    next();
}

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
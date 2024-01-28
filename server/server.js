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
        console.error('Connection error', err.stack)
    } else {
        console.log('Connected to Keeper-App Database')
    }
});

// CORS 
const corsOptions = {
    origin: ['http://localhost:3000', 'http://192.168.1.33:3000', 'http://192.168.56.1:3000' ,'*'],
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

// Strategie di autenticazione
passport.use("login", new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const user = await findUser(email);

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user, { message: 'User logged in successfully' });
    } catch (error) {
        return done(error, false, { message: 'Something went wrong' });
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

// Richiesta POST per la creazione di una nota
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.post('/api/createNote', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { title, content, type } = req.body;

    try {
        await createNote(title, content, req.user.id, type);
        return res.status(200).json({ message: 'Note created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta GET per ottenere le note dell'utente
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/getNotes', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { type } = req.query;

    try {
        const notes = await getNotes(req.user.id, type);
        return res.status(200).json({ notes: notes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

// Richiesta DELETE per eliminare una nota
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.delete('/api/deleteNote/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await deleteNote(req.params.id);
        return res.status(200).json({ message: 'Note deleted successfully' });
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
        return res.status(200).json({ message: 'Note edited successfully' });
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
    res.status(200).json({ message: 'User logged out successfully' });
});

// Richiesta GET per la validazione del token
// Utilizza la strategia di autenticazione "jwt" e richiede il token nell'header della richiesta
app.get('/api/validateToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`);
});
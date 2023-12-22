# Keeper-App (Full-Stack)

Web app che permette ad un utente di gestire note personali e promemoria.

App sviluppata grazie all'utilizzo delle seguenti tecnologie:

**FRONT-END**
- Viene utilizzato **React** come framework di sviluppo FRONT-END
- Per eseguire le richieste al server, viene utilizzato **Axios**
- Per dare uno stile unico all'app sono stati utilizzati:
  - **Bootstrap** --> framework di sviluppo front-end
  - **Animate.css** --> libreria che fornisce una serie di effetti e animazioni
  - **AOS (Animate on Scroll)** --> libreria che consente di animare elementi durante lo scroll della pagina
  - **Material UI** --> libreria di componenti UI React basata sul design system di Google
  - **CSS** --> ogni componente dell'app ha un foglio di stile personalizzato associato

**BACK-END**
- Vengono utilizzati **Node.js** e **NPM** per gestire lo sviluppo lato server, le dipendenze dell'app, i pacchetti da installare, ecc...
- Viene utilizzato **Express.js**, che assieme a Node.js, provvede alla creazione di un web server
- Il web server è collegato ad un database **PostgreSQL**
- E' stata implementata una logica di hashing delle password nel database tramite **bcrypt**
- Le "frasi segrete" necessarie in alcune parti di codice vengono salvate in un file .env (non presente nella repository) e gestite tramite la libreria **dotenv**
- L'autenticazione e le sessioni utente vengono gestite utilizzando **Passport.js** in combinazione con **JWT (JSON Web Token)**

Gli endpoint gestiti sono i seguenti:
- `/api/login` (POST) --> se le credenziali sono corrette, logga l'utente e crea un token JWT necessario per le autenticazioni successive
- `/api/signup` (POST) --> registra l'utente (se non esiste) all'interno del database
- `/api/logout` (GET) --> permette all'utente di eseguire il logout, terminando la sessione ___(necessita del token JWT nell'header della richiesta)___
- `/api/validateToken` (GET) --> controlla se il token JWT è valido, oppure se la sessione è scaduta ___(necessita del token JWT nell'header della richiesta)___
- `/api/user` (GET) --> restituisce l'utente attualmente autenticato nel sistema ___(necessita del token JWT nell'header della richiesta)___
- `/api/createNote` (POST) --> permette all'utente autenticato di creare una nota ___(necessita del token JWT nell'header della richiesta)___
- `/api/editNote/:id` (PUT) --> permette all'utente autenticato di modificare il titolo o il contenuto di una nota (identificata con id) ___(necessita del token JWT nell'header della richiesta)___
- `/api/deleteNote/:id` (DELETE) --> permette all'utente autenticato di eliminare una nota (identificata con id) ___(necessita del token JWT nell'header della richiesta)___
- `/api/getNotes` (GET) --> restituisce tutte le note salvate (da quell'utente) nel database ___(necessita del token JWT nell'header della richiesta)___

## Come avviare l'app

Dopo averlo scaricato, nella root del progetto, eseguire i seguenti comandi al terminale:

### `npm install (o npm i)`

Installa i pacchetti e le dipendenze necessarie per il corretto funzionamento della web app.

### `npm start`

Avvia l'applicazione (client). \
Essa è accessibile al seguente indirizzo [http://localhost:3000](http://localhost:3000). \
(Il numero di porta potrebbe cambiare se quest'ultima è occupata da un altro processo in esecuzione).

La pagina verrà aggiornata automaticamente ad ogni cambiamento effettuato.

### `nodemon server/server.js`

Avvia il server Express sulla porta 5000 (o in base al valore di process.env.PORT).

**N.B. Se il server non viene avviato, il client non può comunicare con esso tramite le richieste e di conseguenza l'app non funziona**

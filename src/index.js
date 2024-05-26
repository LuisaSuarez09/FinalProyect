/* -------------------------- Import dependencias ------------------------- */
import express from 'express';
import morgan from 'morgan';

import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';

/* ----------------------------- Initialization ----------------------------- */
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

/* ----------------------------- Settings: configuracion puerto y plantillas---------------------------- */
app.set('port', process.env.PORT || 3000)

app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

/* ------------------------------- Middleware: configuracion peticiones------------------------------- */
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req, res) => {
    res.json({"message": "Hola Mundo" })
})

/* ------------------------------ Public Files ------------------------------ */
app.use(express.static(join(__dirname, 'public')))

/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
});
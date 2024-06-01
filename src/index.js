/* -------------------------- Import dependencias ------------------------- */
import express from 'express';
import morgan from 'morgan';

import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import {engine} from 'express-handlebars';
import productosRoutes from './routes/productos.routes.js'
import preciosRoutes from './routes/precios.routes.js'
import nosotrosRoutes from './routes/nosotros.routes.js'

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
    res.render('index'); 
});


/* ----------------------------------- En este apartado de rutas se estan tomando los import de la ruta: routes tanto productos como precios para que se puedan usar en la aplicacion  ----------------------------------- */
app.use(productosRoutes);

app.use(preciosRoutes);

app.use(nosotrosRoutes);

/* ------------------------------ Public Files ------------------------------ */
app.use(express.static(join(__dirname, 'public')))

/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'))
});
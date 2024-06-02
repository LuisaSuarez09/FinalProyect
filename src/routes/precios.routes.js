import {Router} from 'express'
import pool from '../database.js'
import path from 'path'

const router = Router();

router.get('/addprecios', (req, res) => {
    res.render('precios/addprecios')
});

router.post('/addprecios', async (req, res) =>{
    try {
        const { nameplan, precioplan, timeplan, descripcion} = req.body
        const newPrecio = {
            nameplan, precioplan, timeplan, descripcion
        }
        await pool.query('INSERT INTO precios SET ?', [newPrecio]);
        res.redirect('/listprecios');

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/* --------------- Aqui se hace la peticion a la base de datos --------------- */
router.get('/listprecios', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM precios')
        res.render('precios/listprecios', {precios : result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/deleteprecios/:id', async(req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM precios WHERE id = ?', [id]);
        res.redirect('/listprecios');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/* --------------------------------- Editar --------------------------------- */
router.get('/editprecios/:id', async (req, res) => {
    try {
        const {id} = req.params
        const [precio] = await pool.query('SELECT * FROM precios WHERE id = ?', [id]);
        const precioEdit = precio[0]
        res.render('precios/editprecios', { precio : precioEdit });


    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/editprecios/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nameplan, precioplan, timeplan, descripcion} = req.body
        const editPrecio = {nameplan, precioplan, timeplan, descripcion}
        await pool.query('UPDATE precios SET ? WHERE id = ?', [editPrecio, id]);
        res.redirect('/listprecios');


    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

/* -------------------------- pagina de promociones ------------------------- */

router.get('/promociones', (req, res) => {
    res.render('precios/promociones')
});



export default router;


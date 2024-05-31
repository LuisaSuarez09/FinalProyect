import {Router} from 'express'
import pool from '../database.js'
import path from 'path'

const router = Router();

router.get('/listprecios', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM precios')
        res.render('precios/listprecios', {precios : result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;


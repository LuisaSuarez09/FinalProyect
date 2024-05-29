import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/addproductos', (req, res)=> {
    res.render('productos/addproductos')
});

//Manda la informacion de los name como informacion del request
router.post('/addproductos', async (req, res)=> {
    try {
        const { name, descripction} = req.body
        const newProducto = {
            name, descripction
        }
        await pool.query('INSERT INTO productos SET id = ?', [newProducto]);
        res.redirect('/listproductos');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Lista todos los datos
router.get('/listproductos', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/listproductos',{productos: result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});
//Para eliminar un dato
router.get('/deleteproductos/:id', async(req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.redirect('/listproductos');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


export default router;

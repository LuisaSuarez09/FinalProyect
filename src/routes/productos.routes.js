import {Router} from 'express'
import pool from '../database.js'

const router = Router();
//cuando vaya a la carpeta productos muestreme el archivo addproductos
router.get('/addproductos', (req, res)=> {
    res.render('productos/addproductos')
});

//Pide una peticion a la base de datos
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

//Envia la informacion para que la informacion vaya a la vista
router.get('/editproductos/:id', async (req, res)=> {
    try {
        const {id} = req.params
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        const productoEdit = producto[0]
        res.render('productos/editproductos',{producto: productoEdit})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Para poder actualizar la información del list
router.post('/editproductos/:id', async (req, res)=> {
    try {
        const {id} = req.params
        const {name, descripction} = req.body
        const editProducto = {
            name, 
            descripction
        }
        await pool.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);
        res.redirect('/listproductos')
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




export default router;

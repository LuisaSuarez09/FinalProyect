import {Router} from 'express'
const router = Router();

router.get('/nosotros', (req, res) => {
    res.render('general/nosotros')
});




export default router;
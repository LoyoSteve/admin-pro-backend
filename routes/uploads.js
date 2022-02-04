/*
    Ruta: /api/uploads
*/
const { Router } = require('express');
const { fileUploads, retornarImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

//middlewares
const expressFileUpload = require('express-fileupload');

//Inicializar
const router = Router();
router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT ,fileUploads);

router.get('/:tipo/:foto' ,retornarImagen);

module.exports = router;
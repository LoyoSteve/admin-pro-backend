/*
    Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitales');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/' ,getHospitales)

router.post('/', 
            [
                validarJWT,
                check('nombre', 'El nombre debe de venir').not().isEmpty(),
                validarCampos
            ], 
            createHospital)

router.put('/:id', 
            [
                validarJWT,
                check('nombre', 'Debes escribir el nuevo nombre').not().isEmpty()
            ],
            updateHospital)

router.delete('/:id',
            [
                validarJWT
            ],
            deleteHospital)

module.exports = router;
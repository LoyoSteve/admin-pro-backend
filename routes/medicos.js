/*
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/' ,getMedicos);

router.post('/', 
            [
                validarJWT,
                check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
                check('hospital', 'El id del hospital no es valido').isMongoId(),
                validarCampos
            ], 
            createMedico);

router.put('/:id', 
            [
                validarJWT,
                check('nombre', 'Se necesita el nombre del medico').not().isEmpty(),
                check('hospital', 'El id del hospital no es valido').isMongoId().not().isEmpty(),
                validarCampos
            ],
            updateMedico);

router.delete('/:id',
            [
                validarJWT
            ],
            deleteMedico);

module.exports = router;
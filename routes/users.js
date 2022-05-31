/*
    Ruta: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRoleOMismoUser } = require('../middlewares/validar-jwt');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const router = Router();

router.get('/', validarJWT ,getUsers)

router.post('/', 
            [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ], 
            createUser)

router.put('/:id', 
            [
                validarJWT,
                validarAdminRoleOMismoUser,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                check('role', 'El rol es obligatorio').not().isEmpty(),
                validarCampos
            ]
            ,updateUser)

router.delete('/:id',
            [
                validarJWT,
                validarAdminRole
            ],
            deleteUser)

module.exports = router;
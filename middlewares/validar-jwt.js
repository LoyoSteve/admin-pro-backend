const { response } = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require('../models/user');

const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Se necesita un token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    
}

const validarAdminRole = async (req, res = response, next) => {

    const uid = req.uid;

    try {
        
        const usuarioDB = await UserModel.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role != 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tienes permisos de administrador'
            });
        }

        next();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const validarAdminRoleOMismoUser = async (req, res = response, next) => {

    const uid = req.uid;
    const uidToModify = req.params.id;

    try {
        
        const usuarioDB = await UserModel.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === uidToModify){
            next();
            
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes permisos de administrador'
            });
        }


    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUser
}
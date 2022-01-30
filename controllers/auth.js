const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password} = req.body;

    try {
        
        //Verificar el email
        const UserDB = await UserModel.findOne({ email });
        if( !UserDB ){
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        //Verificar contraseña
        const verifyPassword = await bcrypt.compareSync( password, UserDB.password );
        if( !verifyPassword ){
            return res.status(404).json({
                ok: false,
                msg: "contraseña invalida"
            });
        }

        //Generar token - JWT
        const token = await generarJWT( UserDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}



module.exports = {
    login
}
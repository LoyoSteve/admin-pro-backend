const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGoogle = async (req, res = response) => {
    const googleToken = req.body.token;
    
    try {
    
        const { name, email, picture} = await googleVerify(googleToken);

        //obtener usuario
        const UserDB = await UserModel.findOne({ email});
        let usuario;

        if(!UserDB){
            //si no existe el usuario crea uno
            usuario = new UserModel({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true,
            });
        }else{
            //si exite actualiza informacion
            usuario = UserDB;
            usuario.google = true;
        }
        
        //guardar en la base de datos
        await usuario.save()

        //Generar token - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            token
        });
        
    } catch ( error ){
        res.status(401).json({
            ok: false,
            msg: "token incorrecto"
        });
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //regenerar token - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        uid,
        token
    });
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}
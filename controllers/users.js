//para permitir las ayudas usamos
const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    //const usuarios = await UserModel.find(); trae todos los usuarios

    //Obtenemos por query el numero de paginas a obtener
    const desde = Number(req.query.desde) || 0;

    //Filtra las propiedades solo devuelve el nombre, email, password e id
    // const usuarios = await UserModel.find({}, 'nombre email password')
    //                                 .skip( desde )
    //                                 .limit( 5 );

    // const total = await UserModel.count();

    const [usuarios, total] = await Promise.all([
        UserModel.find({}, '').skip( desde ).limit( 5 ), 

        UserModel.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
}

const createUser = async (req, res = response) => {
    const {password, email } = req.body;

    try {
        //Buscar el email y si lo encuentras entonces mandar el mensaje de error
        const UserDB = await UserModel.findOne({ email });
        if( UserDB ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe nn'
            });
        }

        const usuario = new UserModel(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar token - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: 'creando user',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        });
    }
}

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await UserModel.findById( uid );

        if( !userDB ){
            res.status(404).json({
                ok: false,
                msg: 'No se encontrro al usuario'
            });
        }

        //actualizar
        const {password, google, email, ...campos } = req.body;

        if ( userDB.email !== email){
            //actualizar correo, y hay que validar que no choque con otro
            const existEmail = await UserModel.findOne({ email });
            if ( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo le pertenece a otro usuario'
                })
            }
        }

        if ( !userDB.google ){
            campos.email = email;
        } else if (userDB.email != email){
            res.status(400).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su correo'
            });
        }
        const updateUser = await UserModel.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: updateUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {

        //Verificamos que el usuario exista
        const userDB = await UserModel.findById( uid );

        if( !userDB ){
            res.status(404).json({
                ok: false,
                msg: 'No se encontro al usuario'
            });
        }

        await UserModel.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
//para permitir las ayudas usamos
const { response } = require('express');

//Models
const UserModel = require('../models/user');
const HospitalModel = require('../models/hospital');
const MedicoModel = require('../models/medico');

const getTodo = async (req, res = response) => {

    //termino de busqueda
    const busqueda = req.params.busqueda;
    
    //para hacer que no busque exactamente el termino usamos una expresion regular
    //para buscar de forma insensible
    const regExp = new RegExp(busqueda, 'i');

    //find busca terminos
    const [usuarios, hospitales, medicos] = await Promise.all([
        UserModel.find({ nombre: regExp }),
        HospitalModel.find({nombre: regExp }),
        await MedicoModel.find({nombre: regExp })
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}

const getDocumentoColeccion = async (req, res = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regExp = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await MedicoModel.find({ nombre: regExp });
        break;

        case 'hospitales':
            data = await HospitalModel.find({ nombre: regExp });
        break;
    
        case 'usuarios':
            data = await UserModel.find({ nombre: regExp });
        break;

        default:
            return res.json({
                ok: true,
                msg: 'Solo puedes consultar medicos || hospitales || usuarios'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentoColeccion
}
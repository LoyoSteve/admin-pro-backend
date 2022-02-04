//para permitir las ayudas usamos
const { response } = require('express');

const HospitalsModel = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {

    //Filtra las propiedades solo devuelve el nombre, email, password e id
    const hospitales = await HospitalsModel.find()
                                            .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const createHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new HospitalsModel({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalCreated = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalCreated
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const updateHospital = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'update hospital ',
    });
}

const deleteHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete hospital ',
    });
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}
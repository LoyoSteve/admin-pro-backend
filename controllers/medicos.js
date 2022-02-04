//para permitir las ayudas usamos
const { response } = require('express');

const MedicoModel = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = response) => {

    //Filtra las propiedades solo devuelve el nombre, email, password e id
    const medicos = await MedicoModel.find()
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const createMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new MedicoModel({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoCreated = await medico.save();

        res.json({
            ok: true,
            medico: medicoCreated
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const updateMedico = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'update Medico ',
    });
}

const deleteMedico = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete Medico ',
    });
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}
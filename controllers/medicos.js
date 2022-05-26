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

    const uidMedico = req.params.id;
    const uidUser = req.uid;

    try {

        //buscar al medico
        const medicoDB = await MedicoModel.findById( uidMedico );
        
        if(!medicoDB){
            //si no existe
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado',
            });
        } 
        
        //si existe
        //actualizamo el nuevo medico
        const updateMedico = {
            ...req.body,
            usuario: uidUser
        }

        //guardamos en la base de datos
        const updatedMedico = await MedicoModel.findByIdAndUpdate( uidMedico, updateMedico, { new: true })

        res.json({
            ok: true,
            msg: 'update Medico',
            medico: updateMedico
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con del administrador',
        });
    }
}

const deleteMedico = async (req, res = response) => {

    const uidMedico = req.params.id;

    try {

        const medicoDB = await MedicoModel.findById( uidMedico );

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado ',
            });
        }

        await MedicoModel.findByIdAndDelete( uidMedico );

        res.json({
            ok: true,
            msg: 'Medico eliminado',
        });

    } catch (error) {

        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

module.exports = {
    getMedicos,
    createMedico,
    updateMedico,
    deleteMedico
}
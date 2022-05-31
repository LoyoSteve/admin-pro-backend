//para permitir las ayudas usamos
const { response } = require('express');

const HospitalsModel = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [hospitales, total] = await Promise.all([
        HospitalsModel.find({}, '').skip( desde ).limit(5),

        HospitalsModel.countDocuments()
    ]);

    res.json({
        ok: true,
        hospitales,
        total
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

    const hospitalUid = req.params.id;
    const userUid = req.uid;

    try {

        const hospitalDB = await HospitalsModel.findById( hospitalUid );

        if(!hospitalDB){
            //si no existe
            res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const changeHospital = {
            ...req.body,
            usuario: userUid
        }

        const hospitalActualizado = await HospitalsModel.findByIdAndUpdate( hospitalUid, changeHospital, { new: true } )

        res.json({
            ok: true,
            msg: 'hospital actualizado',
            hospital: hospitalActualizado
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

const deleteHospital = async (req, res = response) => {
    const hospitalUid = req.params.id;

    try {

        const hospitalDB = await HospitalsModel.findById( hospitalUid );

        if(!hospitalDB){
            //si no existe
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        await HospitalsModel.findByIdAndDelete( hospitalUid )

        res.json({
            ok: true,
            msg: 'hospital eliminado'
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        })
    }
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}
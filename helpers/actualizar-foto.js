const fs = require('fs');

const MedicoModel = require('../models/medico');
const HospitalModel = require('../models/hospital');
const UserModel = require('../models/user');

const borrarImagen = ( path ) => {
    if( fs.existsSync( path ) ){
        fs.unlinkSync( path );
    }
}
const actualizarImagen = async ( tipo, id, nombreFile ) => {
    
    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            //Obtenemos al medico
            const medico = await MedicoModel.findById(id);

            //Validar id
            if( !medico ){
                console.log('no es medico por id');
                return false
            }

            //validar que ya exista una iimagen
            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreFile;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            //Obtenemos al hospital
            const hospital = await HospitalModel.findById(id);

            //Validar id
            if( !hospital ){
                console.log('no es hospital por id');
                return false
            }

            //validar que ya exista una iimagen
            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreFile;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            //Obtenemos al hospital
            const usuario = await UserModel.findById(id);

            //Validar id
            if( !usuario ){
                console.log('no es usuario por id');
                return false
            }

            //validar que ya exista una iimagen
            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreFile;
            await usuario.save();
            return true;
        break;
    }
}

module.exports = {
    actualizarImagen
}
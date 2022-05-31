const path = require('path');
const fs = require('fs');

//para permitir las ayudas usamos
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-foto');

//subir imagen
const fileUploads = async (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const validTypes = [ 'hospitales', 'usuarios', 'medicos']

    //Validar tipo
    if( !validTypes.includes(tipo) ){
        return res.status(400).json({
            ok: true,
            msg: 'No es de tipo usuarios, hospitales o medicos'
        })
    }

    //validar que hay archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        })
    }
    
    //Procesar imagen
    const file = req.files.imagen;

    const nombreImagen = file.name.split('.'); //corta los puntos hola.png y pone cada cosa en un arreglo
    const extensionImagen = nombreImagen[nombreImagen.length -1];

    //Validar extension
    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif'];

    if( !extensionesValidas.includes(extensionImagen) ){
        return res.status(400).json({
            ok: true,
            msg: 'La imagen tiene una extensio incorrecta'
        });
    }

    //generar nombre del archivo
    const nombreFile = `${ uuidv4() }.${ extensionImagen }`;

    //crear path donde se guardara la imagen
    const path = `./uploads/${ tipo }/${ nombreFile }`;

    //Mover a carpeta
    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen( tipo, id, nombreFile );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreFile
        });
    });
}

const retornarImagen = async (req, res = response ) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    var pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //Validar que patImg sea valida
    if( !fs.existsSync( pathImg ) ){
        pathImg = path.join(__dirname, `../uploads/404.jpg`);
    }
    res.sendFile(pathImg);

}

module.exports = {
    fileUploads,
    retornarImagen
}
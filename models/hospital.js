const { Schema, model} = require('mongoose');

const hospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    //El segundo argumento es el nombre que tendra esta colleccion
}, { collection: 'hospitales' });

//Este metodo nos permite cambiar el nombre del _id a uid
hospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Hospital', hospitalSchema);
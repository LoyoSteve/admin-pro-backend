const { Schema, model} = require('mongoose');

const medicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
    //El segundo argumento es el nombre que tendra esta colleccion
});

//Este metodo nos permite cambiar el nombre del _id a uid
medicoSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Medico', medicoSchema);
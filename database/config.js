const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB online')
    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar db mongo')
    }
}

module.exports = {
    dbConection
}
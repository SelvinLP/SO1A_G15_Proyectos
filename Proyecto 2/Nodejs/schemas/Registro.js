const mongoose = require('../mongodb/coneccion'),
      Schema = mongoose.Schema;

const schemas = {

    RegistroSchema: new Schema({
        id: {type: Number},
        name: {type: String},
        location: {type: String},
        age: {type: Number},
        vaccine_type: {type: String},
        gender: {type: String},
        tipo: {type: String}
    })

};

module.exports = schemas;

const mongoose = require('../mongodb/coneccion'),
      Schema = mongoose.Schema;

const schemas = {

    RegistroSchema: new Schema({
        id: {type: Number},
        name: {type: String},
        location: {type: String},
        age: {type: Number},
        infectedtype: {type: String},
        state: {type: String},
        tipo: {type: String},
        region: {type: String}
    })

};

module.exports = schemas;

const mongoose = require('../mongodb/coneccion'),
RegistroSchema = require('../schemas/Registro').RegistroSchema;

const models = {

Registrodb: mongoose.model('RegistroTable', RegistroSchema)

};

module.exports = models;
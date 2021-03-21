const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SopesDB',{ useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
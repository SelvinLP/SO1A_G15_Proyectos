const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb/SopesDB',{ useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;

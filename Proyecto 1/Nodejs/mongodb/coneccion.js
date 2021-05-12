const mongoose = require('mongoose');

mongoose.connect("mongodb://sopes:12345@cluster0-shard-00-00.ngwpx.mongodb.net:27017,cluster0-shard-00-01.ngwpx.mongodb.net:27017,cluster0-shard-00-02.ngwpx.mongodb.net:27017/SopesDB?ssl=true&replicaSet=atlas-ias6u1-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;

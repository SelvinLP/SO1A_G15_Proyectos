const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

class Server {
    
    constructor(){
        this.app = express();
        this.port = 3000;
        this.mongodb = '';
        this.ram = ''

        var corsOptions = {
            origin: true,
            optionSuccessStatus: 200
        };

        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json({
            limit: '10mb',
            extended: true
        }));
        this.app.use(bodyParser.urlencoded({
            limit: '10mb',
            extended: true
        }))

        this.routes();
    }

    routes(){
        this.app.use(this.mongodb, require('../routes/mongodb'));
        this.app.use(this.ram, require('../routes/ram'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor nodeJS corriendo en puerto: ', this.port );
        } );
    }

}

module.exports = Server;

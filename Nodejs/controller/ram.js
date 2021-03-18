const { Response, Request } = require('express');
//Encriptadores
const { v4: uuidv4 } = require('uuid');
const md5 = require('blueimp-md5');

const get_ram = (req, res = Response) => {
    res.send({
        'message': 'get success',
        'data': "funciona get",
        'estado': '200'
    });
}


module.exports = {
    get_ram
}
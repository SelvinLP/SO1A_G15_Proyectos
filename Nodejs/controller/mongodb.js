const { Response, Request } = require('express');
//Encriptadores
const { v4: uuidv4 } = require('uuid');
const md5 = require('blueimp-md5');

const servicios = (req = Request, res = Response) => {
    let body = req.body;
    //Lo que recibio
    console.log(body);
    res.send({
        'message': 'get success',
        'data': body,
        'estado': '200'
    });
}


module.exports = {
    servicios
}
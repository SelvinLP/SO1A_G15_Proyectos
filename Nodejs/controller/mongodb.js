const { Response, Request } = require('express');

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
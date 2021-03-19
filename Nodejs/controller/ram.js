const { Response, Request } = require('express');
const fs = require('fs'); 

const get_pol = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();

    res.send({
        'data': data_ram
    });
}

const get_util = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();

    res.send({
        'uso': data_ram,
        'libre': '200'
    });
}

module.exports = {
    get_pol,
    get_util
}
const { Response, Request } = require('express');
const fs = require('fs'); 

const get_pol = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();
    const data_mod = JSON.parse(data_ram);

    //Y = Data en enteros %
    //X = Data en 
    res.send({
        'y': data_mod.ocupado,
        'label': ''
    });
}

const get_util = (req, res = Response) => {
    const data_ram = fs.readFileSync('/procs/ram-module', 'utf8').toString();

    //Data mandar la cantidad libre 
    res.send(
        [
            {
                'y': data_ram,
                'label': 'libre'
            },
            {
                'y': data_ram,
                'label': 'ocupado'
            }
        ]
    );
}

module.exports = {
    get_pol,
    get_util
}
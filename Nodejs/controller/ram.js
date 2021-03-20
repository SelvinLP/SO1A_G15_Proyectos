const { Response, Request } = require('express');
const fs = require('fs'); 

const get_pol = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();
    const data_mod = JSON.parse(data_ram);

    //Y = Data en enteros %
    let porc_ocupado = (data_mod.ocupado / data_mod.total) * 100;
    res.send({
        'y': porc_ocupado,
        'label': ''
    });
}

const get_util = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();
    const data_mod = JSON.parse(data_ram);

    //Data mandar la cantidad libre 
    let espacio_libre = data_mod.total - data_mod.ocupado;
    let porc_libre = (espacio_libre / data_mod.total) * 100;
    let porc_ocupado = (data_mod.ocupado / data_mod.total) * 100;
    res.send(
        [
            {
                'y': porc_libre,
                'label': 'libre'
            },
            {
                'y': porc_ocupado,
                'label': 'ocupado'
            }
        ]
    );
}

module.exports = {
    get_pol,
    get_util
}
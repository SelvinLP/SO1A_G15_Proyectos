const { Response, Request } = require('express');
const fs = require('fs'); 

const get_proc = (req, res = Response) => {
    const data_ram = fs.readFileSync('/elements/procs/ram-module', 'utf8').toString();
    const data_mod = JSON.parse(data_ram);
    console.log(data_mod)
    //Y = Data en enteros %
    res.send({
        "id": "asd"
    });

}

module.exports = {
    get_proc
}
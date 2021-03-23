const { Response, Request } = require('express');
const fs = require('fs'); 

const get_proc = (req, res = Response) => {
    const data_proc = fs.readFileSync('/elements/procs/proceso-module', 'utf8').toString();
   
    console.log(data_proc);
    //Y = Data en enteros %
    res.send({
        "id": "asd"
    });

}

module.exports = {
    get_proc
}

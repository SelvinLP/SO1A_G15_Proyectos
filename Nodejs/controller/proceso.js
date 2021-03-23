const { Response, Request } = require('express');
const fs = require('fs'); 

const get_proc = (req, res = Response) => {
    const data_proc = fs.readFileSync('/elements/procs/proceso-module', 'utf8').toString();
   
    let array_datos = [];
    let campo_tem = "";
    for(let i =0; i<data_proc.length; i++){
        campo_tem += ata_proc[i];
        if(data_proc[i] === "}"){
            let tem_json =JSON.parse(data_ram);
            //cambiar campos
            array_datos.push(tem_json);
            campo_tem = "";
        }
    }
    //Y = Data en enteros %
    console.log(array_datos)
    res.send(array_datos);

}

module.exports = {
    get_proc
}

const { Response, Request } = require('express');
//Encriptadores
const { v4: uuidv4 } = require('uuid');
const md5 = require('blueimp-md5');

const RegistroModel = require('../Modelosdb/registroModel').Registrodb;


const servicios = async (req = Request, res = Response) => {
    let body = req.body;
    //Lo que recibio

    const Registro = await RegistroModel.find()

    try{
        await RegistroModel.create({
            id: Registro.length,
            name: body.name,
            location: body.location,
            age: body.age,
            infectedtype: body.infectedtype,
            state: body.state,
            tipo: body.tipo,
            region: AsignarRegion(body.location)
        });  
        console.log("Agregado");
        res.send({
            'message': 'Agregado Con Exito',
        });
    }catch(error){
        console.log(error);
        res.send({
            'message': 'Error al Agregar',
        });
    }
    
    
    
}

const GetRegistro = async (req = Request, res = Response) =>{
    const Registro = await RegistroModel.find()
    console.log(Registro)
    res.send(Registro);
}

const GetRegiones = async (req = Request, res = Response) =>{
    const Registro = await RegistroModel.find({ }, 'id region').countDocuments()
    res.send(Registro);
}

function AsignarRegion(registro){
    let Region=""
    if(registro == "Quetzaltenango" || registro == "Retalhuleu" 
        || registro == "San Marcos" || registro == "Suchitepéquez"
        || registro == "Sololá"     || registro == "Totonicapán"){
        
            Region = "Región VI"
    }else if(registro == "Guatemala"){

        Region = "Región I"
    }else if(registro == "Huehuetenango" || registro=="Quiché"){

        Region = "Región VII"
    }else if(registro == "Chimaltenango" || registro=="Sacatepéquez"
        || registro == "Escuintla"){

        Region = "Región V"
    }else if(registro == "Alta Verapaz" || registro=="Baja Verapaz"){

        Region = "Región II"
    }else if(registro == "Chiquimula" || registro == "El Progreso"
        || registro == "Izabal"       || registro == "Zacapa"){

        Region = "Región III"
    }else if(registro == "Jutiapa" || registro=="Jalapa"
        || registro == "Santa Rosa"){

        Region = "Región IV"
    }else if(registro == "Petén"){

        Region = "Región VIII"
    }else{
        Region = "undefined"
    }
    return Region
}

module.exports = {
    servicios,
    GetRegistro,
    GetRegiones
}
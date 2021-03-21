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
    const Registro = await RegistroModel.find()
    let ArrayReturn = []
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región I"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región II"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región III"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región IV"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región V"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región VI"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región VII"));
    ArrayReturn.push(countRegiones(ArrayReturn.length,Registro,"Región VIII"));
    ArrayReturn = bublesort(ArrayReturn)
    res.send(ArrayReturn);
}

const GetDepartamentos = async (req = Request, res = Response)=>{
    const Registro = await RegistroModel.find()
    let arrayReturn = []
    arrayReturn.push(countDepartament(Registro,"Quetzaltenango"))
    arrayReturn.push(countDepartament(Registro,"Retalhuleu"))
    arrayReturn.push(countDepartament(Registro,"San Marcos"))
    arrayReturn.push(countDepartament(Registro,"Suchitepéquez"))
    arrayReturn.push(countDepartament(Registro,"Sololá"))
    arrayReturn.push(countDepartament(Registro,"Totonicapán"))
    arrayReturn.push(countDepartament(Registro,"Guatemala"))
    arrayReturn.push(countDepartament(Registro,"Huehuetenango"))
    arrayReturn.push(countDepartament(Registro,"Quiché"))
    arrayReturn.push(countDepartament(Registro,"Chimaltenango"))
    arrayReturn.push(countDepartament(Registro,"Sacatepéquez"))
    arrayReturn.push(countDepartament(Registro,"Escuintla"))
    arrayReturn.push(countDepartament(Registro,"Alta Verapaz"))
    arrayReturn.push(countDepartament(Registro,"Baja Verapaz"))
    arrayReturn.push(countDepartament(Registro,"Chiquimula"))
    arrayReturn.push(countDepartament(Registro,"El Progreso "))
    arrayReturn.push(countDepartament(Registro,"Izabal"))
    arrayReturn.push(countDepartament(Registro,"Zacapa"))
    arrayReturn.push(countDepartament(Registro,"Jutiapa"))
    arrayReturn.push(countDepartament(Registro,"Jalapa"))
    arrayReturn.push(countDepartament(Registro,"Santa Rosa"))
    arrayReturn.push(countDepartament(Registro,"Petén"))
    arrayReturn = bublesortDepartament(arrayReturn)
    arrayReturn.length = 5
    res.send(arrayReturn);
}

function countRegiones(idval,registros,Region){
    let contador=0
    for (let i = 0; i < registros.length; i++) {
        if(registros[i].region == Region){
            contador++
        }
    }
    return {id:idval,name:Region,infectednumber:contador}
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

function bublesort(inputArr){
    let len = inputArr.length;
    for(var i = 0; i < len; i++) {
        for(var j=0; j < len; j++) {
            if(inputArr[i].infectednumber > inputArr[j].infectednumber) {
                var temp = inputArr[i];
                inputArr[i] = inputArr[j];
                inputArr[j] = temp;        
            }
        }
    }
    return inputArr;
}
function bublesortDepartament(inputArr){
    let len = inputArr.length;
    for(var i = 0; i < len; i++) {
        for(var j=0; j < len; j++) {
            if(inputArr[i].y > inputArr[j].y) {
                var temp = inputArr[i];
                inputArr[i] = inputArr[j];
                inputArr[j] = temp;        
            }
        }
    }
    return inputArr;
}

function countDepartament(Regitros,Departament){
    let contador=0
    for (let i = 0; i < array.length; i++) {
        if(Regitros[i].location == Departament){
            contador++
        }
    }
    return {label:Departament,y:contador}
}

module.exports = {
    servicios,
    GetRegistro,
    GetRegiones
}
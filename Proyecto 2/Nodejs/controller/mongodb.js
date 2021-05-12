const { Response, Request } = require('express');
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
            vaccine_type: body.infectedtype,
	   gender:body.gender,
	    tipo: body.tipo
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
	const Registro = await RegistroModel.find().sort( { "id": -1 } )
    console.log(Registro)
    res.send(Registro);
}

const DeleteAnyRegistros = async (req = Request, res = Response) =>{
	const Delete = await RegistroModel.deleteMany()
	res.send({message:"Usuarios Eliminados"});
}

const GetRegiones = async (req = Request, res = Response) =>{
}

const GetDepartamentos = async (req = Request, res = Response)=>{
	//Get 5 ultimos
    const Registro = await RegistroModel.find().distinct('location')
    let arrReturn = []
    for(let i=0; i<Registro.length; i++){
    	const SubRegistros = await RegistroModel.find().where('location').equals(Registro[i]).sort({id:-1}).limit(5);
	arrReturn.push(SubRegistros)
    }
    console.log(arrReturn);
    res.send(arrReturn);
}

const GetStatePatients = async (req = Request, res = Response)=>{
}

const GetInfectedType = async (req = Request, res = Response)=>{
	//genero por pais 
    const agg=[
    {
    	$group:{
		  _id: {genero:'$gender',pais:'$location'},
		  cantidad:{$sum:1}
		}
    }
    ]
    const Registro = await RegistroModel.aggregate(agg)
    let arrRet = []
    let total = 0;
    for(let i=0;i<Registro.length;i++){
    	arrRet.push({genero:Registro[i]._id.genero,pais:Registro[i]._id.pais,cantidad:Registro[i].cantidad});
    }
    res.send(arrRet);
}

const getAgeRange = async (req = Request, res = Response)=>{
    
}

function AsignarRegion(registro){

}

module.exports = {
    servicios,
    GetRegistro,
    GetRegiones,
    GetDepartamentos,
    GetStatePatients,
    GetInfectedType,
    getAgeRange,
	DeleteAnyRegistros
}

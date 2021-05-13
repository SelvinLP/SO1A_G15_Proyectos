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
            vaccine_type: body.vaccine_type,
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
    let body = req.body;
    let arrReturn = []
    const SubRegistros = await RegistroModel.find().where('location').equals(body.location).sort({id:-1}).limit(5);
    console.log(SubRegistros);
    res.send(SubRegistros);
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
    let body = req.body;
    const Registro = await RegistroModel.aggregate(agg)
    let arrRet = []
    for(let i=0;i<Registro.length;i++){
    	if(body.location == Registro[i]._id.pais){
	   arrRet.push({genero:Registro[i]._id.genero,y:Registro[i].cantidad});
    	}
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

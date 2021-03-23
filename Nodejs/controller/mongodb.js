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
    let agg = [{
    	$group:{
		_id:{name:"$region"},
		infectednumber:{
			$sum:1
		}
    	}
    },
    {
    	$sort:{
    		'_id.name':-1
    	}
    }]
    let arrRet=[]
    const Registro = await RegistroModel.aggregate(agg)
    for(let i=0;i<Registro.length;i++){
    	arrRet.push({id:i,name:Registro[i]._id.name,infectednumber:Registro[i].infectednumber})
    }
    console.log(arrRet)
    res.send(arrRet)
}

const GetDepartamentos = async (req = Request, res = Response)=>{
    let agg = [{
    	$group:{
		_id:{label:"$location"},
		y:{
			$sum:1
		}
    	}
    },
    {
    	$sort:{
    		'y':-1
    	}
    },
    {
    	$limit:5
    }
    ]
    
    const Registro = await RegistroModel.aggregate(agg)
    let arrReturn = []
    for(let i = 0 ; i<Registro.length; i++){
    	arrReturn.push({label:Registro[i]._id.label,y:Registro[i].y});
    }
    console.log(arrReturn);
    res.send(arrReturn);
}

const GetStatePatients = async (req = Request, res = Response)=>{
    let agg=[
    {
    	$group:{
		_id:{label:"$state"},
		y:{
			$sum:1
		}
    	}
    },{
    	$match:{
    		$or:[
    			{'_id.label':"symptomatic"},
    			{'_id.label':"asymptomatic"}
    		]
    	}
    }
    ]
    const Registro = await RegistroModel.aggregate(agg)
    let arrRet=[]
    for(let i=0;i<Registro.length;i++){
    	arrRet.push({label:Registro[i]._id.label,y:Registro[i].y});
    }
    console.log(arrRet);
    res.send(arrRet);
}
const GetInfectedType = async (req = Request, res = Response)=>{
    const agg=[
    {
    	$group:{
    		_id:{label:'$infectedtype'},
    		y:{
			$sum:1
		}
    	}
    }
    ]
    const Registro = await RegistroModel.aggregate(agg)
    let arrRet = []
    for(let i=0;i<Registro.length;i++){
    	arrRet.push({label:Registro[i]._id.label,y:Registro[i].y});
    }
    console.log(arrRet);
    res.send(arrRet);
}

const getAgeRange = async (req = Request, res = Response)=>{
    const agg=[
    {
    	$group:{
    		_id:{age:'$age'},
    		Suma1:{
    			$sum:1
    		}
    	}
    }
    ]
    const Registro = await RegistroModel.aggregate(agg)
    let valores={Age1:0,Age2:0,Age3:0,Age4:0,Age5:0,Age6:0,Age7:0,Age8:0,Age9:0,Age10:0,Age11:0}
    for(let i=0;i<Registro.length;i++){
    	if(Registro[i]._id.age>=1 && Registro[i]._id.age<=10){
    	
    		valores.Age1=valores.Age1+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=11 && Registro[i]._id.age<=20){
    	
    		valores.Age2=valores.Age2+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=21 && Registro[i]._id.age<=30){
    	
    		valores.Age3=valores.Age3+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=31 && Registro[i]._id.age<=40){
    	
    		valores.Age4=valores.Age4+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=41 && Registro[i]._id.age<=50){
    	
    		valores.Age5=valores.Age5+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=51 && Registro[i]._id.age<=60){
    	
    		valores.Age6=valores.Age6+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=61 && Registro[i]._id.age<=70){
    	
    		valores.Age7=valores.Age7+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=71 && Registro[i]._id.age<=80){
    	
    		valores.Age8=valores.Age8+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=81 && Registro[i]._id.age<=90){
    	
    		valores.Age9=valores.Age9+Registro[i].Suma1
    		
    	}else if(Registro[i]._id.age>=91 && Registro[i]._id.age<=100){
    	
    		valores.Age10=valores.Age10+Registro[i].Suma1
    		
    	}else{
    		valores.Age11=valores.Age11+Registro[i].Suma1
    	}
    }
    let arrRet=[]
    arrRet.push({label:'1-10',y:valores.Age1});
    arrRet.push({label:'11-20',y:valores.Age2});
    arrRet.push({label:'21-30',y:valores.Age3});
    arrRet.push({label:'31-40',y:valores.Age4});
    arrRet.push({label:'41-50',y:valores.Age5});
    arrRet.push({label:'51-60',y:valores.Age6});
    arrRet.push({label:'61-70',y:valores.Age7});
    arrRet.push({label:'71-80',y:valores.Age8});
    arrRet.push({label:'81-90',y:valores.Age9});
    arrRet.push({label:'91-100',y:valores.Age10});
    arrRet.push({label:'>100',y:valores.Age11});
    console.log(arrRet);
    res.send(arrRet)
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
    GetRegiones,
    GetDepartamentos,
    GetStatePatients,
    GetInfectedType,
    getAgeRange
}

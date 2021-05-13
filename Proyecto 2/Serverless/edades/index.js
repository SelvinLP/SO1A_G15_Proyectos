'use strict';

exports.http = (request, response) => {
  //--------------------------------------------------


const redis = require('redis');
const client = redis.createClient({
    host: 'redis-18733.c1.us-central1-2.gce.cloud.redislabs.com',
    port: 18733,
    password: 'sopes12021'
});

client.on('error', err => {
    console.log('Error ' + err);
});

client.on('error', err => {
    console.log('Error ' + err);
});

client.get('foo', (err, reply) => {
        if (err) throw err;
        try{
        reply = reply.substring(0, reply.length - 1);
        var results = JSON.parse('['+reply+']'); 
        //---------------------consulta top1p paises
        
        
        const filteredCategories = [];

var cont =1, cero_diez=0,diez_veinte=0,veinte_treinta=0,treinta_cuarenta=0,cuarenta_cincuenta=0,
cincuenta_sesenta=0,sesenta_setenta=0,setenta_ochenta=0,ochenta_noventa=0,noventa_cien=0;
;
results.forEach(category => {

    if (!filteredCategories.find(cat => cat.location == category.location)) {
        const location = category.location ;
        cont = 1;
        
        if(category.age>=0&&category.age<10){
        cero_diez=1;
        }else if(category.age>=10&&category.age<20){
        diez_veinte=1;
        }else if(category.age>=20&&category.age<30){
        veinte_treinta=1;
        }else if(category.age>=30&&category.age<40){
        treinta_cuarenta=1;
        }else if(category.age>=40&&category.age<50){
        cuarenta_cincuenta=1;
        }else if(category.age>=50&&category.age<60){
        cincuenta_sesenta=1;
        }else if(category.age>=60&&category.age<70){
        sesenta_setenta=1;
        }else if(category.age>=70&&category.age<80){
        setenta_ochenta=1;
        }else if(category.age>=80&&category.age<90){
        ochenta_noventa=1;
        }else if(category.age>=90&&category.age<100){
        noventa_cien=1;
        }
        
        
        
        
        
        
        filteredCategories.push({location, cero_diez,diez_veinte,veinte_treinta,treinta_cuarenta,cuarenta_cincuenta,
cincuenta_sesenta,sesenta_setenta,setenta_ochenta,ochenta_noventa,noventa_cien});

cero_diez=0;
diez_veinte=0;
veinte_treinta=0;
treinta_cuarenta=0;
cuarenta_cincuenta=0;
cincuenta_sesenta=0;
sesenta_setenta=0;
setenta_ochenta=0;
ochenta_noventa=0;
noventa_cien=0;
         
    }else{
   
    var i=0;
    for(i=0;i<filteredCategories.length;i++){
     if(filteredCategories[i].location==category.location){
     
     if(category.age>=0&&category.age<10){
      
        filteredCategories[i].cero_diez++;
        }else if(category.age>=10&&category.age<20){
        filteredCategories[i].diez_veinte=filteredCategories[i].diez_veinte+1;
        }else if(category.age>=20&&category.age<30){
        filteredCategories[i].veinte_treinta=filteredCategories[i].veinte_treinta+1;
        }else if(category.age>=30&&category.age<40){
        filteredCategories[i].treinta_cuarenta=filteredCategories[i].treinta_cuarenta+1;
        }else if(category.age>=40&&category.age<50){
        filteredCategories[i].cuarenta_cincuenta=filteredCategories[i].cuarenta_cincuenta+1;
        }else if(category.age>=50&&category.age<60){
        filteredCategories[i].cincuenta_sesenta= filteredCategories[i].cincuenta_sesenta+1;
        }else if(category.age>=60&&category.age<70){
        filteredCategories[i].sesenta_setenta=filteredCategories[i].sesenta_setenta+1;
        }else if(category.age>=70&&category.age<80){
        filteredCategories[i].setenta_ochenta=filteredCategories[i].setenta_ochenta+1;
        }else if(category.age>=80&&category.age<90){
        filteredCategories[i].ochenta_noventa=filteredCategories[i].ochenta_novent+1;
        }else if(category.age>=90&&category.age<100){
        filteredCategories[i].noventa_cien=filteredCategories[i].noventa_cien+1;
        }
        
     
     
    
    i=filteredCategories.length
    }
    }
    }
    
});

                 
        
       response.status(200).send(filteredCategories);
       console.log(filteredCategories);
       // console.log(results);
        }catch(error){
        response.status(200).send([]);      
        }
        
    });
    
//------------------------------------------------------
};

exports.event = (event, callback) => {
  callback();
};





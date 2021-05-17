'use strict';

exports.http = (request, response) => {
 
//--------------------------------------------------
try{
 response.set('Access-Control-Allow-Origin','*');
 }catch(error){
 }

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

var cont =1;
results.forEach(category => {

    if (!filteredCategories.find(cat => cat.location == category.location)) {
        const location = category.location ;
     
        cont = 1;
        filteredCategories.push({location, cont});
         
    }else{
   
    var i=0;
    for(i=0;i<filteredCategories.length;i++){
     if(filteredCategories[i].location==category.location){
    filteredCategories[i].cont = filteredCategories[i].cont+1
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
    
     client.quit();
    
//------------------------------------------------------
};

exports.event = (event, callback) => {
  callback();
};

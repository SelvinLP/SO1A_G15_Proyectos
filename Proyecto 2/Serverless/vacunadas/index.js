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

var cont =1;
results.forEach(category => {

    if (!filteredCategories.find(cat => cat.location == category.location)) {
        const location = category.location ;
        filteredCategories.push({location, cont});
        cont=1;
    }else{
    cont = cont+1;
    }
    
});

   var n, i, k, aux;
    n = filteredCategories.length;
  
    // Algoritmo de burbuja
    for (k = 1; k < n; k++) {
        for (i = 0; i < (n - k); i++) {
            if (filteredCategories[i].cont > filteredCategories[i + 1].cont) {
                aux = filteredCategories[i];
                filteredCategories[i] = filteredCategories[i + 1];
                filteredCategories[i + 1] = aux;
            }
        }
    }
       
        
               
        
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

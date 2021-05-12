'use strict';

exports.http = (request, response) => {
const redis = require('redis');
const client = redis.createClient({
    host: 'redis-18733.c1.us-central1-2.gce.cloud.redislabs.com',
    port: 18733,
    password: 'sopes12021'
});

client.on('error', err => {
    console.log('Error ' + err);
});

client.get('foo', (err, reply) => {
        if (err) throw err;
        reply = reply.substring(0, reply.length - 1);
        var results = JSON.parse('['+reply+']'); 
        response.status(200).send(results);
        console.log(results);
    });
  
};

exports.event = (event, callback) => {
  callback();
};




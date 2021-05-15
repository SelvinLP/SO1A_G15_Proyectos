import redis

r = redis.Redis(
host='redis-18733.c1.us-central1-2.gce.cloud.redislabs.com',
port=18733,
password='sopes12021')


r.append('foo','{"name":"Nikolaos Breeder","location":"Brazil","gender":"Female","age":45,"vaccine_type":"Bitwolf"},'+
'{"name":"Lucius Bolderstone","location":"China","gender":"Male","age":72,"vaccine_type":"Cardify"},'+
'{"name":"Emlen Loveridge","location":"Luxembourg","gender":"Bigender","age":48,"vaccine_type":"Andalax"},'+
'{"name":"Moyra Stubbes","location":"Philippines","gender":"Male","age":45,"vaccine_type":"Flowdesk"},'+
'{"name":"Mathilde Cardnell","location":"China","gender":"Female","age":85,"vaccine_type":"Voyatouch"},'+
'{"name":"Maryl Ellam","location":"Czech Republic","gender":"Agender","age":72,"vaccine_type":"Namfix"},'+
'{"name":"Sergio Dirand","location":"France","gender":"Agender","age":40,"vaccine_type":"Andalax"},'+
'{"name":"Sileas Biggs","location":"Madagascar","gender":"Agender","age":13,"vaccine_type":"Zamit"},'+
'{"name":"Catherine Connow","location":"China","gender":"Genderfluid","age":62,"vaccine_type":"Konklux"},'+
'{"name":"Freddy Shepland","location":"Costa Rica","gender":"Genderqueer","age":44,"vaccine_type":"Kanlam"},'+
'{"name":"Izaak Melin","location":"Czech Republic","gender":"Male","age":68,"vaccine_type":"Konklab"},'+
'{"name":"Candice Briar","location":"Ireland","gender":"Polygender","age":56,"vaccine_type":"Subin"},'+
'{"name":"Perla Moffet","location":"China","gender":"Female","age":27,"vaccine_type":"Solarbreeze"},'+
'{"name":"Ramonda Dunkersley","location":"Thailand","gender":"Genderqueer","age":79,"vaccine_type":"Mat Lam Tam"},'+
'{"name":"Brandy Northleigh","location":"United States","gender":"Genderqueer","age":40,"vaccine_type":"Cardguard"},'+
'{"name":"Milzie Arnholdt","location":"Morocco","gender":"Bigender","age":43,"vaccine_type":"Ventosanzap"},'+
'{"name":"Mariellen Ivanilov","location":"China","gender":"Female","age":18,"vaccine_type":"Sonair"},'+
'{"name":"Angus Clempton","location":"China","gender":"Female","age":75,"vaccine_type":"Prodder"},'+
'{"name":"Harald Dumbelton","location":"Finland","gender":"Female","age":29,"vaccine_type":"Konklux"},'+
'{"name":"Anthony Mowlam","location":"Russia","gender":"Male","age":88,"vaccine_type":"Opela"},'+
'{"name":"Gracia Bardill","location":"China","gender":"Agender","age":40,"vaccine_type":"Sonair"},'+
'{"name":"Davon Lancastle","location":"Indonesia","gender":"Agender","age":59,"vaccine_type":"Stim"},'+
'{"name":"Ingra Finlater","location":"Faroe Islands","gender":"Male","age":37,"vaccine_type":"Tres-Zap"},'+
'{"name":"Fabiano Everley","location":"France","gender":"Agender","age":37,"vaccine_type":"Duobam"},'+
'{"name":"Hanny Eldridge","location":"Comoros","gender":"Agender","age":27,"vaccine_type":"Y-Solowarm"},'+
'{"name":"Graig Mixture","location":"United Kingdom","gender":"Bigender","age":18,"vaccine_type":"Cookley"},'+
'{"name":"Del ODee","location":"Sweden","gender":"Male","age":66,"vaccine_type":"Viva"},'+
'{"name":"Martainn Aldis","location":"France","gender":"Bigender","age":74,"vaccine_type":"Zathin"},'+
'{"name":"Bernardo Whiting","location":"Philippines","gender":"Bigender","age":80,"vaccine_type":"Konklab"},')
#r.delete('foo')
res = r.get('foo')
print(res)


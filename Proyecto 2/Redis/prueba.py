import redis

r = redis.Redis(
host='redis-18733.c1.us-central1-2.gce.cloud.redislabs.com',
port=18733,
password='sopes12021')


r.append('foo',"hola;")
#r.delete('foo')
res = r.get('foo')
print(res)


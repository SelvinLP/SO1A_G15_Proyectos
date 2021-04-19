import json
from random import random, randrange
from sys import getsizeof
from locust import HttpUser, task, between

class Leer_data():
    def __init__(self):
        self.array = []
        
    def get_random(self):
        length = len(self.array)
        
        if (length > 0):
            random_index = randrange(0, length - 1) if length > 1 else 0
            return self.array.pop(random_index)
        else:
            print ("Ya no hay datos en el archivo")
            return None
    
    # Cargar el archivo de datos json
    def cargar_data(self):
        print ("Cargando datos")
        try:
            with open("traffic.json", 'r') as data_file:
                self.array = json.loads(data_file.read())
            print (f'Datos cargados Correctamente, {len(self.array)} datos -> {getsizeof(self.array)} bytes.')
        except Exception as e:
            print (f'No se pudieron cargar los datos {e}')


class Locus_Traffic(HttpUser):
    wait_time = between(0.1, 1.3)
    # Unica Lectura de archivos
    lectura = Leer_data()
    lectura.cargar_data()

    def on_start(self):
        print ("Iniciando el envio de tráfico")

    @task
    def Post_msg(self):
        random_data = self.lectura.get_random()
        
        if (random_data is not None):
            data_to_send = json.dumps(random_data)
            print(data_to_send)

            self.client.post("/", json = random_data)
        else:
            print("Ya no hay datos disponibles")
            self.stop(True) 

    @task
    def GetMessages(self):      
        self.client.get("/")  

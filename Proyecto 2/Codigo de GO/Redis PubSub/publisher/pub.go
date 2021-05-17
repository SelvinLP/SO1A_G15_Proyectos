// Importar go get -u cloud.google.com/go/pubsub
package main

import (
	// Ayuda a escribir en la respuesta
	"context"
	"encoding/json"
	"fmt" // Imprimir en consola
	"log"
	"math/rand"
	"net/http" // El paquete HTTP
	"os"
	"strconv"

	"cloud.google.com/go/pubsub"
	"github.com/garyburd/redigo/redis"
)

func publish(msg string) error {
	//PUB SUB
	projectID := "proyecto2sopes-311923"
	topicID := "mensaje_so1"
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "llave.json")
	ctx := context.Background()

	//REDIS
	conn, err := redis.Dial("tcp",
		"redis-19848.c259.us-central1-2.gce.cloud.redislabs.com:19848",
		redis.DialPassword("4h0Ksf0Yfskpt5ZNzR7bd8Vc8OuKgBXs"))

	//PARTE DE REDIS
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close()
	//Generar key
	var llave_redis = rand.Intn(30)
	var keyredis = strconv.Itoa(llave_redis)
	if _, err = conn.Do("SET", keyredis, msg); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Envio Correcto a Redis con id: %v", llave_redis)

	//Creacion del cliente pub sub
	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		fmt.Println("Error al crear el cliente")
		fmt.Println("pubsub.NewClient: %v", err)
		return err
	}

	t := client.Topic(topicID)
	result := t.Publish(ctx, &pubsub.Message{Data: []byte(keyredis)})
	id, err := result.Get(ctx)
	if err != nil {
		fmt.Println("Error al mandar el mensaje")
		fmt.Println(err)
		return err
	}
	fmt.Println("Published a message Pub sub; msg ID: %v\n", id)

	return nil
}

// Servidor HTTP
func http_server(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	switch r.Method {

	case "POST":
		//Agregar header
		w.Header().Set("Content-Type", "application/json")

		//Parsing body
		var body map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			fmt.Println("error")
			return
		}
		data, err := json.Marshal(body)
		newData := string(data)
		log.Printf("Sent %s", newData)

		//Publicacion del mensaje
		publish(newData)

		//Regreso de estado
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(newData))

	default:
		fmt.Fprintf(w, "Metodo %s no soportado \n", r.Method)
		return
	}
}

func main() {

	http.HandleFunc("/", http_server)
	print("Servidor levantado en el puerto 3001")
	//Si hay error se apaga
	if err := http.ListenAndServe(":3001", nil); err != nil {
		log.Fatal(err)
	}
}
